[cmdletbinding()]
param (
    [string]$testassembly,
    [string]$registerOption,
    [string]$generateReport,
	[string]$coverageFilter,
	[string]$tfsUser,
	[string]$tfsPwd
)

$ocToolPath = "dist\OpenCover.4.6.519\tools"
$nuToolPath = "dist\NUnit.ConsoleRunner.3.2.1\tools"
$rgToolPath = "dist\ReportGenerator.2.4.5.0\tools"
$restHelperPath = "dist\RestHelper"

Write-Host "Entering script RunOpenCover.ps1 with Current User: '$(whoami)'"
Write-Host "testassembly = $testassembly"
Write-Host "registerOption = $registerOption"
Write-Host "generateReport = $generateReport"
Write-Host "coverageFilter = $coverageFilter"

#Write-Host "Environment: "
#get-ChildItem env: | Foreach-object {Write-Host $_.Name = $_.Value}
#Write-Host "Context: "
#$distributedTaskContext.psobject.properties |  where {$_.name -like '*'} | Foreach-object {Write-Host $_.Name = $_.Value}


$outputPath = $env:COMMON_TESTRESULTSDIRECTORY
if(!(Test-Path -Path $outputPath )){
    New-Item -ItemType directory -Path $outputPath
}

Write-Host "Generate project file for Nunit Call from parameter '$testassembly'"
if ($testassembly.Contains("*") -Or $testassembly.Contains("?"))
{
    Write-Host "Calling Find-Files with pattern: $testassembly;-:**\packages\**"
    [string[]] $testAssemblyFiles = @(Find-Files -SearchPattern "$testassembly;-:**\packages\**" -RootFolder $env:BUILD_SOURCESDIRECTORY)
}
else
{
    Write-Host "No Pattern found in solution parameter."
    [string[]] $testAssemblyFiles = ,"$env:BUILD_SOURCESDIRECTORY\$testassembly"
}

$nunitprojectroot = ""
$nunitproject = "<NUnitProject>
  <Settings activeconfig=""Debug""/>
  <Config name=""Debug"">"
  
$filelist = ""
  
foreach ($testfile in $testAssemblyFiles) {
	if (!$nunitprojectroot) {
		$nunitprojectroot = split-path $testfile
	}
	$nunitproject = $nunitproject +  "<assembly path=""$testfile""/>"	 
	$filelist = $filelist + """""$testfile"""" "
}
$nunitproject = $nunitproject + "
  </Config>
</NUnitProject>"

#Write-Host "Generating nunit project file at $nunitprojectroot with content: $nunitproject"
#$nunitproject | Out-File $nunitprojectroot\project.nunit

$cmd = ".\${ocToolPath}\OpenCover.Console.exe"
$arg1 = "-target:"".\$nuToolPath\nunit3-console.exe"""
$arg2 = "-targetargs:""$filelist --work=$outputPath --result=junit-results.xml;transform=.\dist\nunit3-junit.xslt"""
$arg3 = "-filter:""$coverageFilter"""
$arg4 = "-register:$registerOption"
$arg5 = "-coverbytest:*"
$arg6 = "-output:""$outputPath\CodeCoverageResult.xml"""

Write-Host "Executing:'& $cmd $arg1 $arg2 $arg3 $arg4 $arg5 $arg6' "
& $cmd $arg1 $arg2 $arg3 $arg4 $arg5 $arg6 

if ($generateReport -eq "true") {
	$cmd = ".\${rgToolPath}\ReportGenerator.exe"
	$arg1 = "-reports:""$outputPath\CodeCoverageResult.xml"""
	$arg2 = "-targetdir:""$outputPath\CoverageReport"""

	Write-Host "Executing:'& $cmd $arg1 $arg2'"
	& $cmd $arg1 $arg2 
}

Publish-BuildArtifact "OpenCoverResult" $outputPath

#the result file (from XSLT in Nunit call) is not UTF8 encoded :-( -> we have to do this here in en extra step!
Get-Content $outputPath\junit-results.xml | Set-Content -Encoding utf8 $outputPath\junit-results-utf8.xml

$testResult = Resolve-Path "$outputPath\junit-results-utf8.xml"
$RunTitle = "OpenCover_TestRun_$env:BUILD_BUILDNUMBER"
Publish-TestResults -TestRunner "JUnit" -TestResultsFiles $testResult -MergeResults $true -Context $distributedTaskContext -PublishRunLevelAttachments $true -RunTitle $RunTitle

$cmd = ".\${restHelperPath}\TFSRestTool.exe"
$arg1 = "$env:SYSTEM_TEAMFOUNDATIONSERVERURI$env:SYSTEM_TEAMPROJECTID/"
$arg2 = "$env:BUILD_BUILDNUMBER"
$arg3 = "$RunTitle"
$arg4 = "$tfsUser"
$arg5 = "$tfsPwd"
$arg6 = "$outputPath\CodeCoverageResult.xml"

Write-Host "Executing:'& $cmd $arg1 $arg2 $arg3 $arg4 $arg5 $arg6' "
& $cmd $arg1 $arg2 $arg3 $arg4 $arg5 $arg6 

Write-Host "RunOpenCover.ps1 finished."

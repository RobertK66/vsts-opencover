echo Build.Bat called. All extensions are build with typescript and tfx tools....
if "%1"=="" goto blank
cd %1%/BuildResultsEnhancer
goto start
:blank
cd BuildResultsEnhancer
:start
echo Building BuildResultsEnhancer
call bower install
call typings install
set errorlevel=
call tsc 
if %errorlevel% neq 0 exit /b %errorlevel%
cd ..
echo Building RunOpenCoverTask
xcopy /S /I .\packages\NUnit.ConsoleRunner.3.4.1  .\RunNunitWithOpenCover\dist\NUnit.ConsoleRunner.3.4.1
xcopy /S /I .\packages\NUnit.Extension.NUnitProjectLoader.3.4.1 .\RunNunitWithOpenCover\dist\NUnit.Extension.NUnitProjectLoader.3.4.1
xcopy /S /I .\packages\OpenCover.4.6.519\tools  .\RunNunitWithOpenCover\dist\OpenCover.4.6.519\tools
xcopy /S /I /Exclude:xcopy1.excl .\packages\ReportGenerator.2.4.5.0  .\RunNunitWithOpenCover\dist\ReportGenerator.2.4.5.0 
xcopy .\RunNunitWithOpenCover\nunit3-junit.xslt .\RunNunitWithOpenCover\dist\
xcopy /S /I .\TFSRestTool\bin\Debug .\RunNunitWithOpenCover\dist\RestHelper

tfx extension create --manifest-globs vss-extension.json --output-path ./bin

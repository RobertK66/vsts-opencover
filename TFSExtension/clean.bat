if "%1"=="" goto start
cd %1
:start
echo Clean.bat called. removing all dependencies and temp folder...
rd /S /Q bin 
rd /S /Q RunNunitWithOpenCover\dist
rd /S /Q BuildResultsEnhancer\dist
rd /S /Q BuildResultsEnhancer\typings
rd /S /Q BuildResultsEnhancer\bower_components



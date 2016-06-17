## How to build from sources
### Pre-requesits

The toolchain for building this Extensions consists of <br>
*  Visual Studio 2015 Solution Build
	* used to resolve nuget packages (nunit3-consolerunner, opencover, reportgenerator)
	* build the "TFSRestTool" commandline .exe which is needed as part of the custom build step.
* 'node' - 'bower' - 'typings' - 'typescript' - 'tfx-cli'
	* a. [Node.js](https://nodejs.org) 
	* b. [Bower](http://bower.io/) (`npm install -g bower`) 
	* c. Typings (`npm install -g typings`) (manages TypeScript declare files) 
	* d. TypeScript 1.7 or higher (`npm install -g typescript`) 
	* e. [Team Foundation command line interface](https://github.com/Microsoft/tfs-cli)(`npm install -g tfx-cli`) 

* The versions used for building 0.0.2 are: 
	* Vs2015-Update2 (including TypeScript tools for Visual Studio  1.8.29.0)
	* node v4.4.4
	* npm 3.9.0
	* bower 1.7.9
	* typings 0.8.1
	* tfx 0.3.20

### Building 

Clean & Build the solution from within VS. This does build the TFSRestTool Project and triggers the build.bat located 
in the solution root folder. If everything is ok the .vsxi output is genertated in <solution>/bin.






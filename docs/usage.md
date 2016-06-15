## How to use it ...

See this instructions how to upload the .vsix file to yout Team Foundation Server.
https://www.visualstudio.com/en-us/docs/marketplace/get-tfs-extensions?href=%22#upload

Find and use the build step "Runs Nunit Test with OpenCover" in under section "Test".

You have to provide TFS user credential for accessing the REST - API of your TFS.
(I hope to get rid of this, once I manage to switch from powershell to node build step in future version...)

If nunit consolenrunner found and executed tests within your specified Testassambly coverage results should be seen on the build result page, and the Report is attached to the build if the output option was set.




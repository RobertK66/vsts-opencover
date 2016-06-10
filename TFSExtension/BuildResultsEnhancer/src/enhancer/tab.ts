/// <reference path='../../typings/main.d.ts' />

import Controls = require("VSS/Controls");
import TFS_BuildContracts = require("TFS/Build/Contracts");
import TFS_BuildContractsExt = require("TFS/Build/ExtensionContracts");


import MyCommon = require("enhancer/common");

//import VSS_Service = require("VSS/Service");
//import VSS_VSS = require("VSS/VSS");
//import VSS_FileContainerServices = require("VSS/FileContainer/Services");
//import VSS_FileContainerClient = require("VSS/FileContainer/RestClient");
//import VSS_AtefactServices = require("VSS/Artifacts/Constants");
    


//import TFSBuildClient = require("TFS/Build/RestClient");
//import TFS_CoreContracts = require("TFS/Core/Contracts");
//import TFSCoreClient = require("TFS/Core/RestClient");
//import TFS_DtContracts = require("TFS/DistributedTask/Contracts");
//import TFSDtClient = require("TFS/DistributedTask/TaskRestClient");
//import TFSDtAgentClient = require("TFS/DistributedTask/TaskAgentRestClient");
//import TFS_VC_Contracts = require("TFS/VersionControl/Contracts");
//import TFS_VC_Controls = require("TFS/VersionControl/Controls");
//import TFSGitClient = require("TFS/VersionControl/GitRestClient");
//import TFS_VC_Services = require("TFS/VersionControl/Services");
//import TFSVcCLient = require("TFS/VersionControl/TfvcRestClient");
//import TFS_VC_UIContracts = require("TFS/VersionControl/UIContracts");
//import TFSWitBatchClient = require("TFS/WorkItemTracking/BatchRestClient");
//import TFS_WIT_Contracts = require("TFS/WorkItemTracking/Contracts");
//import TFS_WIT_ExtContracts = require("TFS/WorkItemTracking/ExtensionContracts");
//import TFS_WIT_ProcContracts = require("TFS/WorkItemTracking/ProcessContracts");
//import TFS_WIT_ProcDefContracts = require("TFS/WorkItemTracking/ProcessDefinitionsContracts");
//import TFSWitProcDefClient = require("TFS/WorkItemTracking/ProcessDefinitionsRestClient");
//import TFSWitProcClient = require("TFS/WorkItemTracking/ProcessRestClient");
//import TFS_WIT_ProcTemplContracts = require("TFS/WorkItemTracking/ProcessTemplateContracts");
//import TFSWitProcTemplClient = require("TFS/WorkItemTracking/ProcessTemplateRestClient");
//import TFSWitClient = require("TFS/WorkItemTracking/RestClient");
//import TFS_WIT_Services = require("TFS/WorkItemTracking/Services");
//import TFS_WIT_UIContracts = require("TFS/WorkItemTracking/UIContracts");
//import TFS_Work_Contracts = require("TFS/Work/Contracts");
//import TFSWorkClient = require("TFS/Work/RestClient");

//import VFS_UtilsFile = require("VSS/Utils/File");
//import VFS_RichEditor = require("VSS/Controls/RichEditor");
/* other modules
     "VSS/Accounts/Contracts" {
	 "VSS/Accounts/RestClient" {
	 "VSS/Adapters/Knockout" {
	 "VSS/Ajax" {
	 "VSS/Artifacts/Constants" {
	 "VSS/Artifacts/Services" {
	 "VSS/Authentication/Contracts" {
	 "VSS/Authentication/RestClient" {
	 "VSS/Authentication/Services" {
	 "VSS/Bundling" {
	 "VSS/Commerce/Contracts" {
	 "VSS/Commerce/RestClient" {
	 "VSS/Common/Constants/Platform" {
	 "VSS/Common/Contracts/FormInput" {
	 "VSS/Common/Contracts/Platform" {
	 "VSS/Common/Contracts/System" {
	 "VSS/Common/Contracts/System.Data" {
	 "VSS/Compatibility" {
	 "VSS/Context" {
	 "VSS/Contributions/Contracts" {
	 "VSS/Contributions/Controls" {
	 "VSS/Contributions/RestClient" {
	 "VSS/Contributions/Services" {
	 "VSS/Controls" {
	 "VSS/Controls/AjaxPanel" {
	 "VSS/Controls/CheckboxList" {
	 "VSS/Controls/Combos" {
	 "VSS/Controls/Dialogs" {
	 "VSS/Controls/EditableGrid" {
	 "VSS/Controls/ExternalHub" {
	 "VSS/Controls/FileInput" {
	 "VSS/Controls/Filters" {
	 "VSS/Controls/FormInput" {
	 "VSS/Controls/Grids" {
	 "VSS/Controls/Histogram" {
	 "VSS/Controls/Hubs" {
	 "VSS/Controls/KeyboardShortcuts" {
	 "VSS/Controls/Menus" {
	 "VSS/Controls/Navigation" {
	 "VSS/Controls/Notifications" {
	 "VSS/Controls/Panels" {
	 "VSS/Controls/PerfBar" {
	 "VSS/Controls/PopupContent" {
	 "VSS/Controls/RichEditor" {
	 "VSS/Controls/Search" {
	 "VSS/Controls/Splitter" {
	 "VSS/Controls/StatusIndicator" {
	 "VSS/Controls/TabContent" {
	 "VSS/Controls/TreeView" {
	 "VSS/Controls/Validation" {
	 "VSS/Controls/Virtualization" {
	 "VSS/DelegatedAuthorization/Contracts" {
	 "VSS/DelegatedAuthorization/RestClient" {
	 "VSS/Diag" {
	 "VSS/Diag/Services" {
	 "VSS/Error" {
	 "VSS/Events/Action" {
	 "VSS/Events/Document" {
	 "VSS/Events/Handlers" {
	 "VSS/Events/Services" {
	 "VSS/ExtensionManagement/Contracts" {
	 "VSS/ExtensionManagement/RestClient" {
	 "VSS/FeatureAvailability/Contracts" {
	 "VSS/FeatureAvailability/RestClient" {
	 "VSS/FeatureAvailability/Services" {
	 "VSS/FileContainer/Contracts" {
	 "VSS/FileContainer/RestClient" {
	 "VSS/FileContainer/Services" {
	 "VSS/Gallery/Contracts" {
	 "VSS/Gallery/RestClient" {
	 "VSS/Identities/Contracts" {
	 "VSS/Identities/Mru/Contracts" {
	 "VSS/Identities/Mru/RestClient" {
	 "VSS/Identities/Picker/Cache" {
	 "VSS/Identities/Picker/Constants" {
	 "VSS/Identities/Picker/Controls" {
	 "VSS/Identities/Picker/RestClient" {
	 "VSS/Identities/Picker/Services" {
	 "VSS/Identities/RestClient" {
	 "VSS/Licensing/Contracts" {
	 "VSS/Locations" {
	 "VSS/Locations/Contracts" {
	 "VSS/Locations/RestClient" {
	 "VSS/Navigation/Services" {
	 "VSS/Operations/Contracts" {
	 "VSS/Operations/RestClient" {
	 "VSS/Organization/CollectionRestClient" {
	 "VSS/Organization/Contracts" {
	 "VSS/Organization/OrganizationRestClient" {
	 "VSS/Performance" {
	 "VSS/Profile/Contracts" {
	 "VSS/Profile/Metrics" {
	 "VSS/Profile/RestClient" {
	 "VSS/SDK/Services/Dialogs" {
	 "VSS/SDK/Services/ExtensionData" {
	 "VSS/SDK/Services/Navigation" {
	 "VSS/Search" {
	 "VSS/SecurityRoles/Contracts" {
	 "VSS/SecurityRoles/RestClient" {
	 "VSS/Security/Contracts" {
	 "VSS/Security/RestClient" {
	 "VSS/Serialization" {
	 "VSS/Service" {
	 "VSS/Settings" {
	 "VSS/Telemetry/Contracts" {
	 "VSS/Telemetry/RestClient" {
	 "VSS/Telemetry/Services" {
	 "VSS/Utils/Array" {
	 "VSS/Utils/Clipboard" {
	 "VSS/Utils/Core" {
	 "VSS/Utils/Culture" {
	 "VSS/Utils/Date" {
	 "VSS/Utils/File" {
	 "VSS/Utils/Html" {
	 "VSS/Utils/Number" {
	 "VSS/Utils/String" {
	 "VSS/Utils/UI" {
	 "VSS/Utils/Url" {
	 "VSS/VSS" {
	 "VSS/WebApi/Constants" {
	 "VSS/WebApi/Contracts" {
	 "VSS/WebApi/RestClient" {
*/

export class InfoTab extends Controls.BaseControl {	
	constructor() {
        super();
	}
		
	public initialize(): void {
        super.initialize();

		// Get configuration that's shared between extension and the extension host
        var sharedConfig: TFS_BuildContractsExt.IBuildResultsViewExtensionConfig = VSS.getConfiguration();
        
 		if(sharedConfig) {
			// register your extension with host through callback
			sharedConfig.onBuildChanged((build: TFS_BuildContracts.Build) => {
                this._initBuildInfo(build);	

                var ctra = new MyCommon.CustomTestRunAttachment(build);
                ctra.getTestRunsAsync((ab) => {
                    var openCoverResult = new MyCommon.OpenCoverResult(ab);

                    var inf: string = "";
                    inf += "Sequence Coverage: " + openCoverResult.sequenceCoverage + "%"
                        + " (" + openCoverResult.visitedSequencePoints
                        + "/" + openCoverResult.sequencePoints + ")\n";
                    inf += "Branch Coverage:   " + openCoverResult.branchCoverage + "%"
                        + " (" + openCoverResult.visitedBranchPoints
                        + "/" + openCoverResult.branchPoints + ")\n\n"
                    
                    inf += "Min Cyclomatic Complexity: " + openCoverResult.minCyclomaticComplexity + "\n";
                    inf += "Max Cyclomatic Complexity: " + openCoverResult.maxCyclomaticComplexity + "\n";
                    inf += "Classes visited/monitored: " + openCoverResult.visitedClasses
                        + "/" + openCoverResult.classes + "\n";
                    inf += "Methods visited/monitored: " + openCoverResult.visitedMethods
                        + "/" + openCoverResult.methods + "\n";

                    $('#roberts-info-container').text(inf);
                });
			});
		}		
	}
	
    private _initBuildInfo(build: TFS_BuildContracts.Build) {
		
	}
}

InfoTab.enhance(InfoTab, $(".build-info"), {});

// Notify the parent frame that the host has been loaded
VSS.notifyLoadSucceeded();

	
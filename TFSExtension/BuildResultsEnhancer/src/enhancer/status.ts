/// <reference path='../../typings/main.d.ts' />

import Controls = require("VSS/Controls");
import TFS_Build_Contracts = require("TFS/Build/Contracts");
import TFS_Build_Extension_Contracts = require("TFS/Build/ExtensionContracts");

// Die eigenen imports sind als ts/js im selben Verzeichnis.
import MyCommon = require("enhancer/common");

export class StatusSection extends Controls.BaseControl {	
	constructor() {
		super();
	}
		
	public initialize(): void {
        super.initialize();
        
    
		// Get configuration that's shared between extension and the extension host
        var sharedConfig: TFS_Build_Extension_Contracts.IBuildResultsViewExtensionConfig = VSS.getConfiguration();
        
		if(sharedConfig) {
			// register your extension with host through callback
			sharedConfig.onBuildChanged((build: TFS_Build_Contracts.Build) => {
                var ctra = new MyCommon.CustomTestRunAttachment(build);
                ctra.getTestRunsAsync((ab) => {
                    var ocr = new MyCommon.OpenCoverResult(ab);

                    var sc = Number(ocr.sequenceCoverage) * 255 / 100;
                    var bc = Number(ocr.branchCoverage) * 255 / 100;



                    $("#robert-cov-seq").text(ocr.sequenceCoverage + "%").css("background-color", this.rgbToHex(255 - sc, sc, 0));
                    $("#robert-cov-bra").text(ocr.branchCoverage + "%").css("background-color", this.rgbToHex(255 - bc,bc, 0));
                });

			});
		}		
    }

    private componentToHex(c :number) :string {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    private rgbToHex(r :number, g: number, b : number) :string {
        return "#" + this.componentToHex(Math.floor(r)) + this.componentToHex(Math.floor(g)) + this.componentToHex(Math.floor(b));
    }

}

StatusSection.enhance(StatusSection, $(".build-status"), {});

// Notify the parent frame that the host has been loaded
VSS.notifyLoadSucceeded();

	
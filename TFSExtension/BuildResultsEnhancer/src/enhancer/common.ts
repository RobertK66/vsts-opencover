/// <reference path='../../typings/main.d.ts' />

import TFS_BuildContracts = require("TFS/Build/Contracts");
import TFSTestMgmtClient = require("TFS/TestManagement/RestClient");
import TFS_TestMgmtContracts = require("TFS/TestManagement/Contracts");

export class OpenCoverResult extends Object {
    private resdoc: XMLDocument;
    public sequenceCoverage: string;
    public visitedSequencePoints: string;
    public sequencePoints: string;
    public branchCoverage: string;
    public visitedBranchPoints: string;
    public branchPoints: string;
    public minCyclomaticComplexity: string;
    public maxCyclomaticComplexity: string;
    public visitedClasses: string;
    public classes: string;
    public visitedMethods: string;
    public methods: string;

    constructor(buffer: ArrayBuffer) {
        super();

        var cont = String.fromCharCode.apply(null, new Uint8Array(buffer));
        this.resdoc = $.parseXML(cont);
        var $xml = $(this.resdoc);
        this.sequenceCoverage = $xml.find("Summary").attr("sequenceCoverage");
        this.visitedSequencePoints = $xml.find("Summary").attr("visitedSequencePoints");
        this.sequencePoints = $xml.find("Summary").attr("numSequencePoints");

        this.branchCoverage = $xml.find("Summary").attr("branchCoverage");
        this.visitedBranchPoints = $xml.find("Summary").attr("visitedBranchPoints");
        this.branchPoints = $xml.find("Summary").attr("numBranchPoints");

        this.minCyclomaticComplexity = $xml.find("Summary").attr("minCyclomaticComplexity");
        this.maxCyclomaticComplexity = $xml.find("Summary").attr("maxCyclomaticComplexity");
        this.visitedClasses = $xml.find("Summary").attr("visitedClasses");
        this.visitedMethods = $xml.find("Summary").attr("visitedMethods");
        this.classes = $xml.find("Summary").attr("numClasses");
        this.methods = $xml.find("Summary").attr("numMethods");
    }

    public doSomethingElse(): string {
        return "Hallo It's me. An Object Child";
    }



}


export class CustomTestRunAttachment extends Object {
    private tagPrefix: string = "traid_";
    private build: TFS_BuildContracts.Build;
    private testrunAttachmentId: any;

    constructor(build: TFS_BuildContracts.Build) {
        super();
        this.build = build;
        $.each(build.tags, (ix, tag) => {
            if (tag.indexOf(this.tagPrefix) == 0) {
                this.testrunAttachmentId = tag.substr(6); // There should only be one testrunAttachment with an Tag pointing to it...
            }
        });
    }

    public getTestRunsAsync(callback: any): void {
        var testrunid;
        var tc = TFSTestMgmtClient.getClient();


        tc.getTestRuns(this.build.project.id, this.build.uri).then((tr) => {
            $.each(tr, (ix, tr) => {
                if (tr.name.indexOf("OpenCover_TestRun_") >= 0) {
                    testrunid = tr.id;
                    return false;   // We take the first one as we only provide a single result .....
                }
            });
            tc.getTestRunAttachmentContent(this.build.project.id, testrunid, this.testrunAttachmentId).then((ab) => {
                callback(ab);
            });
        });
    }

}




	
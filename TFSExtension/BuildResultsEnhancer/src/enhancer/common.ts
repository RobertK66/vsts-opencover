/// <reference path='../../typings/index.d.ts' />

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
    public $trackedModules: JQuery;

    constructor(buffer: ArrayBuffer) {
        super();

       // var cont = String.fromCharCode.apply(null, new Uint8Array(buffer));
        var cont = this.Uint8ToString(new Uint8Array(buffer));
        this.resdoc = $.parseXML(cont);
        var $xml = $(this.resdoc);
        var $Summary = $xml.find("Summary");
        this.sequenceCoverage = $Summary.attr("sequenceCoverage");
        this.visitedSequencePoints = $Summary.attr("visitedSequencePoints");
        this.sequencePoints = $Summary.attr("numSequencePoints");

        this.branchCoverage = $Summary.attr("branchCoverage");
        this.visitedBranchPoints = $Summary.attr("visitedBranchPoints");
        this.branchPoints = $Summary.attr("numBranchPoints");

        this.minCyclomaticComplexity = $Summary.attr("minCyclomaticComplexity");
        this.maxCyclomaticComplexity = $Summary.attr("maxCyclomaticComplexity");
        this.visitedClasses = $Summary.attr("visitedClasses");
        this.visitedMethods = $Summary.attr("visitedMethods");
        this.classes = $Summary.attr("numClasses");
        this.methods = $Summary.attr("numMethods");

        this.$trackedModules = $xml.find("Module").not("[skippedDueTo]");
    }

    public Uint8ToString(u8a: Uint8Array) :string {
        var CHUNK_SZ = 0x8000;
        var c = [];
        for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
            c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
        }
        return c.join("");
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

    public getTestRunsAttachment(callback: (buffer: ArrayBuffer)=>void): void {
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




	
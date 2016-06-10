using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using RestSharp;

namespace TFSRestTool {
    internal class TfsRestHelper {
        private string[] args;
        private string baseUri;
        private string buildNumber;
        private string testRunName;
        private string agentUser;
        private string agentPwd;
        private string resultPath;
        private const string apiVersion = "api-version=2.2-preview";


        public TfsRestHelper(string[] args) {
            this.args = args;
            if(args.Count() >= 6) {
                baseUri = args[0];
                buildNumber = args[1];
                testRunName = args[2];
                agentUser = args[3];
                agentPwd = args[4];
                resultPath = args[5];
            }
        }

        internal void PublishResultAttachment() {
            RestClient client = new RestClient(baseUri);
            // First we have to query the correct testRun by name
            RestRequest request = new RestRequest("_apis/test/runs/query?$top=20&" + apiVersion, Method.POST);
            request.Credentials = new NetworkCredential(agentUser, agentPwd);
            request.RequestFormat = RestSharp.DataFormat.Json;
            request.AddBody(new { query = $"Select * From TestRun where Title='{testRunName}'" });

            string testRunId = String.Empty;
            IRestResponse<Dictionary<string, object>> response = client.Execute<Dictionary<string, object>>(request);
            if(response.StatusCode == HttpStatusCode.OK) {
                if(response.Data.Count > 0) {
                    var runs = (JsonArray)response.Data["value"];
                    var firstRun = (Dictionary<string,object>)runs[0];
                    testRunId = firstRun["id"].ToString();
                }
            }

            if(!String.IsNullOrEmpty(testRunId)) {
                // Then We Upload the Result file as Testrun Attachment
                String resultStream = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes("kein result file gefunden...."));
                try {
                    Byte[] bytes = File.ReadAllBytes(resultPath);
                    resultStream = Convert.ToBase64String(bytes);
                } catch(Exception) { }

               // client = new RestClient(baseUri);
                request = new RestRequest($"_apis/test/runs/{testRunId}/attachments/?" + apiVersion, Method.POST);
                request.Credentials = new NetworkCredential(agentUser, agentPwd);
                request.RequestFormat = RestSharp.DataFormat.Json;
                //request.AddParameter("Application/Json", attachmentJsonText, ParameterType.RequestBody);
                request.AddBody(new {
                    stream = resultStream,
                    fileName = "TheResult.Xml",
                    comment = "OpenCover upload",
                    attachmentType = "GeneralAttachment"
                });

                string attachmentId = String.Empty;
                response = client.Execute<Dictionary<string, object>>(request);
                if(response.StatusCode == HttpStatusCode.OK) {
                    if(response.Data.Count > 0) {
                        attachmentId = response.Data["id"].ToString();
                    }
                }

                if (!String.IsNullOrEmpty(attachmentId)) {
                    string myTag = $"traid_{attachmentId}";

                    // Finally we tag the build to have a clue to get the Attachment in Web UI Scripts....
                    request = new RestRequest($"_apis/build/builds/{buildNumber}/tags/{myTag}?" + apiVersion, Method.PUT);
                    request.Credentials = new NetworkCredential(agentUser, agentPwd);
                    response = client.Execute<Dictionary<string, object>>(request);
                    if(response.StatusCode == HttpStatusCode.OK) {

                    }

                }
            }

        }


    }
}
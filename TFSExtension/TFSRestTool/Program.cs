using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace TFSRestTool {
    class Program {
        static void Main(string[] args) {
            if(args.Count() > 0) {
                var trh = new TfsRestHelper(args);
                trh.PublishResultAttachment();
            } else {
                Console.WriteLine("This Console Project exists to trigger solution build using VisualStudio.");
                Console.WriteLine("The build of the TFS Extension vsxi file is triggered by calling build.bat in soultion root.");
                Console.WriteLine("Toolchain 'node.js' - 'bower' - 'typings' - 'typescript'(tsc) must be installed and be globally available.");
                Console.WriteLine("When successfull the result .vsxi can be found in <Solution>/bin. ");
                Console.WriteLine();
                Console.WriteLine("Additionaly - if called with parameters - this CommandLine exe is now used as REST-Helper for the powershell build step.");
                Console.WriteLine("Its a workaround until I find a better way to load result infos to the server.");

                Console.ReadLine();
            }
        }
    }
}

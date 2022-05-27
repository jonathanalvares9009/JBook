import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("--p, --port <number>", "Port to listen on", "4005")
  .action((filename = "notebook.js", option: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(parseInt(option.port), path.basename(filename), dir);
  });

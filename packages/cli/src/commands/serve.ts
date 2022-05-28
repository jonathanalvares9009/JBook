import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("--p, --port <number>", "Port to listen on", "4005")
  .action(async (filename = "notebook.js", option: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(option.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `Opened ${filename} for editing. Navigate to http://localhost:${option.port} to edit.`
      );
    } catch (e: any) {
      if (e.code === "EADDRINUSE") {
        console.error(
          `Port ${option.port} is already in use. Please choose another port.`
        );
      } else {
        console.error(e);
      }
      process.exit(1);
    }
  });

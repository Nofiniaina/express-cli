import { Command } from "commander";
import path from "node:path";
import fs from "node:fs";
import { folders } from "../lib/folders.js";
import { exec } from "node:child_process";
import { createFile } from "../lib/createFile.js";

export const newCommand = new Command("new")
  .description("Create a new express js project")
  .argument("<name>")
  .option("--lang <language>", "Project language type: JS/TS", "js")
  .option("--pkg <package>", "Project package manager used: npm/pnpm", "npm")
  .action(async (name: string, options) => {

    let projectPath = path.join(process.cwd(), name);
    try {
      if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);

        folders.forEach((folder) => {
          fs.mkdirSync(path.join(projectPath, folder));
        });

        let initCommand = `cd ${projectPath}`;
        switch (options.pkg) {
          case "npm":
            initCommand += ` && npm init -y && npm pkg set type="module"`;
            break;

          case "pnpm":
            initCommand += ` && pnpm init && pnpm pkg set type="module"`;
            break;

          default:
            break;
        }

        exec(initCommand, (error, _stdout, stderr) => {
          if (error) {
            console.error("Initializing error : ", error.message);
          }

          if (stderr) {
            console.error(stderr);
          }
        });

        await createFile(path.join(projectPath, "src"), ["index.js"]);
        await createFile(projectPath, [".gitignore", ".env"]);
      }
    } catch (error) {
      console.error("Project folder already exists !!");
    }
  })
  ;



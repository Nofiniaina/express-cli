import { program } from "commander";
import fs from "node:fs";
import * as fsPromises from "fs/promises";
import { exec } from "node:child_process";
import { error } from "node:console";
import { stderr, stdout } from "node:process";

const folders = [
    "src",
    "src/config",
    "src/routes",
    "src/controllers",
    "src/middlewares",
    "src/models",
];
program
    .command("init")
    .description("Initialize a new express js project")
    .action(async() => {
       exec('npm init -y', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
       });

       folders.forEach((folder) => {
            try {
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder);
                }
            } catch (error) {
                console.error(error);
            }
       });

        try {
            var indexContent = "const express = require('express');\n";
            indexContent += "const cors = require('cors');\n";
            indexContent += "const dotenv = require('dotenv');\n";
            indexContent += "\n\n";
            indexContent += "dotenv.config();";
            indexContent += "\n\n";
            indexContent += "const app = express();";
            await fsPromises.writeFile('src/index.js', indexContent);

            await fsPromises.writeFile('src/.env', "");

            await fsPromises.writeFile('.gitignore', "");

            await fsPromises.writeFile('src/.gitignore', "");

            await fsPromises.writeFile('src/README.md', "");
        } catch (error) {
            console.error(error);
        }

        exec('npm i express dotenv cors bcrypt', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
       });
    })
;
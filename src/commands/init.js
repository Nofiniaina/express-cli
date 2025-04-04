import { program } from "commander";
import fs from "node:fs";
import * as fsPromises from "fs/promises";
import executeNpm from "../lib/execute_npm.js";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
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

        executeNpm('init', '-y', '');

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
            const indexContent = await fsPromises.readFile(
                join(__dirname, '../lib/index_template.js'), 'utf-8'
            );
            await fsPromises.writeFile('src/index.js', indexContent);

            await fsPromises.writeFile('src/.env', "");

            await fsPromises.writeFile('.gitignore', "");

            await fsPromises.writeFile('src/.gitignore', "");

            await fsPromises.writeFile('src/README.md', "");
        } catch (error) {
            console.error(error);
        }

        executeNpm('i', '', [
            'express',
            'dotenv',
            'cors',
            'bcrypt'
        ]);
    })
;
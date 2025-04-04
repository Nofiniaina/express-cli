import { program } from "commander";
import inquirer from "inquirer";
import fs from "node:fs";
import * as fsPromises from "fs/promises";
import executeNpm from "../lib/execute_npm.js";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// program
//     .command("database")
//     .description("Database commands")
// ;

program
    .command("database:install")
    .description("Install database")
    .action(async() => {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "database",
                    message: "Select a database",
                    choices: [
                        { name: "MongoDB", value: "mongoose" },
                        { name: "MySQL", value: "mysql2" },
                    ]
                }
            ])
            .then(async (answers) => {
                let args = "";
                if(answers.database === "mysql2") {
                    args += "-D";
                }
                executeNpm('i', args, answers.database);
                let port = answers.database === "mongoose" ? 27017 : 3306;
                
                try {
                    await fsPromises.writeFile("src/.env", `DB_PORT=${port} \nHOSTNAME=localhost \nDB_USER=root \nDB_PASSWORD= \nDB_NAME= \nPORT=3000`);
                
                    if(answers.database === "mongoose") {
                        const content = await fsPromises.readFile(
                            join(__dirname, "../lib/database/mongodb.js"), "utf-8"
                        );
                        await fsPromises.writeFile("src/config/database.js", content);
                    } else {
                        const content = await fsPromises.readFile(
                            join(__dirname, "../lib/database/mysql.js"), "utf-8"
                        );
                        await fsPromises.writeFile("src/config/database.js", content);
                    }
                } catch (error) {
                    console.error(error);
                }
                
            })
    })
;


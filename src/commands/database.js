import { program } from "commander";
import inquirer from "inquirer";
import fs from "node:fs";
import * as fsPromises from "fs/promises";
import executeNpm from "../lib/execute_npm.js";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import insertText from "../lib/insert_text.js";
import changeText from "../lib/change_text.js";

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
                    await fsPromises.writeFile("src/.env", `DB_PORT=${port} \nHOSTNAME=localhost \nDB_USER=root \nDB_PASSWORD= \nDB_NAME= \nPORT=3000 \nDATABASE=${answers.database} `);
                
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

                    if(answers.database === "mongoose"){
                        const filePath = "src/index.js";
                        insertText(filePath, 
                            "const database = require('./config/database');", 
                            "const dotenv = require('dotenv');"
                        );
                        insertText(filePath,
                            "\ndatabase.connectDB();",
                            "app.use(express.json());"
                        );
                    }
                } catch (error) {
                    console.error(error);
                }
            })
    })
;

program
    .command("database:make")
    .description("Generate a database action")
    .arguments("<type> <name>", "Name of the database action")
    .action(async(type, name) => {
        if(type === "model"){
            if(!name) {
                console.error("Please provide a name for the model");
                return;
            }

            try {
                const fileName = name[0].toLowerCase() + name.slice(1);
                const content = await fsPromises.readFile(
                    join(__dirname, "../lib/database/model/model_mongodb.js"), "utf-8"
                );
                await fsPromises.writeFile("src/models/" + fileName + "Model" + ".js", content);
                const filePath = "src/models/" + fileName + "Model" + ".js";
                changeText(filePath, "schema", name);
                changeText(filePath, "Model", name);
            } catch (error) {
                console.error(error);
            }
        } else if(type === "controller"){
            if(!name) {
                console.error("Please provide a name for the controller");
                return;
            }

            try {
                const fileName = name[0].toLowerCase() + name.slice(1);
                await fsPromises.writeFile("src/controllers/" + fileName + "Controller" + ".js", "");
            } catch (error) {
                console.error(error);
            }
        } else if(type === "route"){
            if(!name) {
                console.error("Please provide a name for the route");
                return;
            }

            try {
                const fileName = name[0].toLowerCase() + name.slice(1);
                await fsPromises.writeFile("src/routes/" + fileName + "Route" + ".js", "");
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error("Invalid type. Please use model, controller or route.");
        }
    })
;

program
    .command("database:mvc ")
    .description("Generate a model, controller and route")
    .arguments("<name>", "Name of the model, controller and route")
    .action(async(name) => {
        if(!name) {
            console.error("Please provide a name for the model, controller and route");
            return;
        }

        try {
            const fileName = name[0].toLowerCase() + name.slice(1);
            await fsPromises.writeFile("src/models/" + fileName + "Model" + ".js", "");
            await fsPromises.writeFile("src/controllers/" + fileName + "Controller" + ".js", "");
            await fsPromises.writeFile("src/routes/" + fileName + "Route" + ".js", "");
        } catch (error) {
            console.error(error);
        }
    })
;
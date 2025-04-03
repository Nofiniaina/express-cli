import { program } from "commander";
import inquirer from "inquirer";
import { exec } from "node:child_process";
import fs from "node:fs";

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
            .then((answers) => {
                var npmCommand = "npm i ";
                if(answers.database === "mysql2") {
                    npmCommand += "-D";
                }
                exec(`${npmCommand} ${answers.database}`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }

                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return;
                    }
                });

                fs.writeFileSync("src/config/database.js", `const ${answers.database} = require('${answers.database}');\n`);
                fs.writeFileSync("src/.env", "PORT=3000\n");
            })
    })
;


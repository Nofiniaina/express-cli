#!/usr/bin/env node

import { program } from "commander";

program
    .version("1.0.0")
    .description("A basic CLI tool for managing your express applications")
    .option("-n, --name <type>", "Add your name")
    .action((options) => {
        console.log(`Hello, ${options.name}!`);
    })
;

program.parse(process.argv);
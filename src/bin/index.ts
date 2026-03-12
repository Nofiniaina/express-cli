#!/usr/bin/env node

import { Command } from "commander";
import { newCommand } from "../commands/new.js";
const program = new Command();

program
  .name("express-cli")
  .description("A simple cli to automate express js project needs")
  .version("1.0.0");

program.addCommand(newCommand);

program.parse(process.argv);

#!/usr/bin/env node

import { program } from "commander";

import "../src/commands/init.js";
import "../src/commands/database.js";

program.parse(process.argv);
#!/usr/bin/env node

import { program } from "commander";

import "../src/commands/init.js";

program.parse(process.argv);
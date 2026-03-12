import { Command } from "commander";

export const newCommand = new Command("new")
  .description("Create a new express js project")
  .argument("<name>")
  .action((name) => {
    console.log(`Created ${name} project`);
  });


#!/usr/bin/env node
import { readFile } from 'fs/promises';

import { executeNewProjectCommand } from "./commands.new.js";
import { executeHelpCommand } from "./commands.help.js";

const args = process.argv.slice(2);

const packageJson = JSON.parse(
    await readFile(
        new URL("../package.json", import.meta.url)
    )
);

console.info(`🧪 Reagenz CLI ${packageJson.version}`);

switch (args[0]) {
    case "new":
        executeNewProjectCommand();
        break;

    case "help":
    default:
        executeHelpCommand();
        break;
}
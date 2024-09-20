#!/usr/bin/env node
import path from "path";

import { copyFolder } from "./copyFolder.js";

const args = process.argv.slice(2);

const templateDirectory = path.join(import.meta.dirname, "../template-project");
const currentDirectory = process.cwd();

console.log("Reagenz CLI");

if (args[0] === 'new') {
    console.log("Copying template project...");
    console.log(`Source: ${templateDirectory}; Destination: ${currentDirectory}`);
    
    try {
        copyFolder(templateDirectory, currentDirectory);
    }
    catch (error) {
        console.error("Error copying template: ", error);
    }

    console.log("Done.");
    console.log("You can now execute npm i and then npm start.");
}
else {
  console.log("Usage: npx reagenz new");
}
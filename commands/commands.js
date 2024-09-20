#!/usr/bin/env node
import path from "path";

import { copyFolder } from "./copyFolder.js";
import { executeExternalCommand } from "./executeExternalCommand.js";
import { createLoggingTimeStamp } from "./createLoggingTimeStamp.js";

const args = process.argv.slice(2);

const templateDirectory = path.join(import.meta.dirname, "../template-project");
const currentDirectory = process.cwd();

console.log("🧪 Reagenz CLI");

if (args[0] === 'new') {
    try {
        console.log(createLoggingTimeStamp() + `📁 Copying project from ${templateDirectory} to ${currentDirectory}`);

        await copyFolder(templateDirectory, currentDirectory);
    }
    catch (error) {
        console.error(createLoggingTimeStamp() + "❌ Error copying template: ", error);

        process.exit(1);
    }

    try {
        console.log(createLoggingTimeStamp() + `📦 Executing npm install...`);

        await executeExternalCommand("npm install");
    }
    catch (error) {
        console.error(createLoggingTimeStamp() + "❌ Error running npm install: ", error);

        process.exit(1);
    }

    console.log(createLoggingTimeStamp() + "🎉 Done! You can now run npm start");
}
else {
    console.log("Usage: npx reagenz new");
}
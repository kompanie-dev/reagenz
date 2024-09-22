import path from "path";

import { copyFolder } from "./utilities/copyFolder.js";
import { executeExternalCommand } from "./utilities/executeExternalCommand.js";
import { createLoggingTimeStamp } from "./utilities/createLoggingTimeStamp.js";

export const executeNewProjectCommand = async () => {
    const templateDirectory = path.join(import.meta.dirname, "../template-project");
    const currentDirectory = process.cwd();

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
};
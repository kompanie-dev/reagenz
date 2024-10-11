import path from "path";
import { fileURLToPath } from "url";

import { copyFolder } from "./utilities/copyFolder.js";
import { createLoggingTimeStamp } from "./utilities/createLoggingTimeStamp.js";
import { executeExternalCommand } from "./utilities/executeExternalCommand.js";

const copyTemplateProject = async (templateDirectory, destinationDirectory) => {
	try {
		console.info(`${createLoggingTimeStamp()}: 📁 Copying project from ${templateDirectory} to ${destinationDirectory}`);

		await copyFolder(templateDirectory, destinationDirectory);
	}
	catch (error) {
		console.error(`${createLoggingTimeStamp()}: ❌ Error copying template: `, error);

		process.exit(1);
	}
};

const executeNpmInstall = async () => {
	try {
		console.info(`${createLoggingTimeStamp()}: 📦 Executing npm install...`);

		await executeExternalCommand("npm install");
	}
	catch (error) {
		console.error(`${createLoggingTimeStamp()}: ❌ Error running npm install: `, error);

		process.exit(1);
	}
};

export const executeNewProjectCommand = async () => {
	const filename = fileURLToPath(import.meta.url);
	const directoryName = path.dirname(filename);

	const templateDirectory = path.join(directoryName, "../template-project");
	const currentDirectory = process.cwd();

	await copyTemplateProject(templateDirectory, currentDirectory);
	await executeNpmInstall();

	console.info(`${createLoggingTimeStamp()}: 🎉 Done! You can now run npm start`);
};

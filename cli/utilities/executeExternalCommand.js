import { exec } from "child_process";

export const executeExternalCommand = (command) =>
	new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(`Error executing ${command}: ${error}`);
				reject(error);
				return;
			}

			if (stderr) {
				console.error(`${command} warnings or errors: ${stderr}`);
			}

			resolve();
		});
	});

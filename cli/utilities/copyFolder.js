import fs from "fs";
import path from "path";

export const copyFile = (sourceFile, destFile) =>
	new Promise((resolve, reject) => {
		const readStream = fs.createReadStream(sourceFile);
		const writeStream = fs.createWriteStream(destFile);

		readStream.pipe(writeStream);

		readStream.on("error", reject);
		writeStream.on("error", reject);
		writeStream.on("finish", resolve);
	});

export const copyFolder = async (sourceFolder, destinationFolder) => {
	if (!fs.existsSync(destinationFolder)) {
		fs.mkdirSync(destinationFolder, { recursive: true });
	}

	const items = fs.readdirSync(sourceFolder);

	for (const item of items) {
		const sourceItem = path.join(sourceFolder, item);
		const destinationItem = path.join(destinationFolder, item);

		const stat = fs.statSync(sourceItem);

		if (stat.isFile()) {
			await copyFile(sourceItem, destinationItem);
		}
		else if (stat.isDirectory()) {
			await copyFolder(sourceItem, destinationItem);
		}
	}
};

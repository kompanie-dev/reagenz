export const executeHelpCommand = () => {
	console.info(`
Usage: npx reagenz [command]

Commands:
  help                    Shows this help menu.
  new                     Creates a new project in the current directory
  version                 Returns the installed version of Reagenz

For more information visit: https://github.com/kompanie-dev/reagenz
`);
};

/**
 * Helps setting up and starting Reagenz applications.
 */
export declare class App {
	/**
	 * Initializes and starts a new Reagenz application.
	 * This method sets up the components, injects dependencies into them
	 * and attaches the main application component to a specified container.
	 *
	 * @param appConfig The configuration object for the application.
	 */
	static start(appConfig: {
		mainComponent: CustomElementConstructor;
		container: HTMLElement;
		components: CustomElementConstructor[];
		dependencies: Record<string, any>;
		webComponents?: Record<string, CustomElementConstructor>;
	}): void;
}

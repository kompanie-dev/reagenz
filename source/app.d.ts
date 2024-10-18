/**
 * Helps setting up and starting Reagenz applications.
 */
export declare class App {
	/**
	 * Creates and starts a new Reagenz application.
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

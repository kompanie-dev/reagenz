/**
 * Helps setting up and starting Reagenz applications.
 */
export class App {
	/**
	 * Initializes and starts a new Reagenz application.
	 * This method sets up the components, injects dependencies into them
	 * and attaches the main application component to a specified container.
	 *
	 * @param {Object} appConfig Configuration object for the Reagenz application.
	 * @param {CustomElementConstructor} appConfig.mainComponent The main component of the application that will be rendered in the container.
	 * @param {HTMLElement} appConfig.container The HTML element that will serve as the container for the main application component.
	 * @param {HTMLElement[]} appConfig.components A list of additional components that may require dependency injection or other setup.
	 * @param {Object} appConfig.dependencies A collection of key-value pairs representing the dependencies required by the application and its components.
	 *
	 * @returns {void}
	 */
	static start({ mainComponent, container, components, dependencies }) {
		App.#injectDependencies(dependencies, components);

		container.setAttribute("framework", "@kompanie/reagenz@12.0.0");
		container.append(new mainComponent());
	}

	/**
	 * Injects the given dependency object into the prototype of all supplied classes.
	 * The dependencies will be available in the class as dependencies property.
	 *
	 * @param {Object} dependencies An object containing all dependencies that should be available in the classes.
	 * @param {Object[]} classes An array of classes in which the dependencies should get injected.
	 *
	 * @returns {void}
	 */
	static #injectDependencies(dependencies, classes) {
		for (const receiverClass of classes) {
			receiverClass.prototype.dependencies = dependencies;
		}
	}
}

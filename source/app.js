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
	 * @param {Object} [appConfig.webComponents={}] An optional object that defines custom web components used within the application.
	 *
	 * @returns {void}
	 */
	static start({ mainComponent, container, components, dependencies, webComponents = {} }) {
		App.#defineWebComponents(webComponents);
		App.#injectDependencies(dependencies, components);
		App.#attach(mainComponent, container);
	}

	/**
	 * Starts the application by taking the main component, adding a version info and adding it to the specified container element.
	 *
	 * @param {CustomElementConstructor} mainComponent The main component of the application.
	 * @param {HTMLElement} container The container element to which the main component gets attached to.
	 *
	 * @returns {void}
	 */
	static #attach(mainComponent, container) {
		const mainInstance = new mainComponent();
		mainInstance.setAttribute("framework", "@kompanie/reagenz@9.0.2");
		container.append(mainInstance);
	}

	/**
	 * Registers custom Web Components in the browser's CustomElementRegistry.
	 * This method iterates through the provided `componentConfig` object and registers each component with a corresponding tag name.
	 * If a component has already been registered, it will be skipped to avoid redefinition errors.
	 *
	 * @param {Object.<string, CustomElementConstructor>} componentConfig An object mapping custom element tag names to their respective component classes.
	 *
	 * @returns {void}
	 */
	static #defineWebComponents(componentConfig) {
		Object
			.entries(componentConfig)
			.forEach(([tagName, componentClass]) => {
				customElements.get(tagName) ?? customElements.define(tagName, componentClass);
			});
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
			receiverClass.prototype.dependencies = new Proxy(dependencies, {
				get(dependencyContainer, propertyName, ...args) {
					if (!(propertyName in dependencyContainer) && propertyName !== "store") {
						throw new Error(`Tried to access dependency '${String(propertyName)}', which is not injected`);
					}

					return Reflect.get(dependencyContainer, propertyName, ...args);
				}
			});
		}
	}
}

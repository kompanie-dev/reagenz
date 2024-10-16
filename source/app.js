/**
 * Helps setting up and starting Reagenz applications.
 */
export class App {
	/**
	 * Creates and starts a new Reagenz application.
	 * @param {{
	 * mainComponent: HTMLElement
	 * container: HTMLElement
	 * components: HTMLElement[]
	 * dependencies: object
	 * webComponents: object
	 * }} appConfig
	 */
	static start({ mainComponent, container, components, dependencies, webComponents = {} }) {
		App.#defineWebComponents(webComponents);
		App.#injectDependencies(dependencies, components);
		App.#attach(mainComponent, container);
	}

	/**
	 * Starts the application by taking the main component, adding a version info and adding it to the specified container element.
	 * @param {HTMLElement} mainComponent The main component of the application.
	 * @param {HTMLElement} container The container element to which the main component gets attached to.
	 */
	static #attach(mainComponent, container) {
		const mainInstance = new mainComponent();
		mainInstance.setAttribute("framework", "@kompanie/reagenz@9.0.0");
		container.append(mainInstance);
	}

	/**
	 * Registers Web Components in the CustomElementRegistry of the browser using an object and skips already registered ones.
	 * @param {Object} componentConfig An object containing keys and the component class ({ "test-element": TestElementComponent, ... }).
	 */
	static #defineWebComponents(componentConfig) {
		Object
			.entries(componentConfig)
			.filter(([tagName]) => customElements.get(tagName) === undefined)
			.forEach(([tagName, componentClass]) =>
				customElements.define(tagName, componentClass)
			);
	}

	/**
	 * Injects the given dependency object into the prototype of all supplied classes.
	 * The dependencies will be available in the class as dependencies property.
	 * @param {Object} dependencies An object containing all dependencies that should be available in the classes.
	 * @param {Object[]} classes An array of classes in which the dependencies should get injected.
	 */
	static #injectDependencies(dependencies, classes) {
		for (const receiverClass of classes) {
			Object.assign(receiverClass.prototype.dependencies, dependencies);
		}
	}
}

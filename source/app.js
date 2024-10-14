/**
 * Helps setting up and starting Reagenz applications.
 */
export class App {
	/**
	 * Creates and starts a new Reagenz application.
	 * @param {{
	 * root: HTMLElement
	 * container: HTMLElement
	 * components: HTMLElement[]
	 * dependencies: object
	 * webComponents: object
	 * }} appConfig
	 */
	static create({ root, container, components, dependencies, webComponents = {} }) {
		App.#defineWebComponents(webComponents);
		App.#injectDependencies(dependencies, components);
		App.#attach(root, container);
	}

	/**
	 * Starts the application by attaching the root component to the specified container element and adding a version info to the root.
	 * @param {HTMLElement} root The root component of the application.
	 * @param {HTMLElement} container The container element to which the main component gets attached to.
	 */
	static #attach(root, container) {
		const rootInstance = new root();
		rootInstance.setAttribute("framework", "@kompanie/reagenz@8.1.0");
		container.append(rootInstance);
	}

	/**
	 * Registers Web Components in the CustomElementRegistry of the browser using an object and skips already registered ones.
	 * @param {Object} componentConfig An object containing keys and the component class ({ "test-element": TestElementComponent, ... }).
	 */
	static #defineWebComponents(componentConfig) {
		Object.entries(componentConfig)
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

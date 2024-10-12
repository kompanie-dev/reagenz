/**
 * Represents the base class for all Reagenz components.
 * All Reagenz components are Web Components.
 */
export declare class Component extends HTMLElement {
	/**
	 * Creates a new instance of the Component.
	 * @param selectors An object containing the selectors of the Component { selectorValue: selectorFunction }.
	 */
	constructor(selectors?: Record<string, Function>);

	/**
	 * Defines the component and under which tag name it should be available.
	 * @param tagName The name of the element, how it should be available in HTML. Needs to comply to the Web Components standard.
	 * @param componentClass The class of the component.
	 */
	static define(tagName: string, componentClass: typeof Component): void;

	/**
	 * The default callback function when Web Components get added to the DOM.
	 */
	connectedCallback(): void;

	/**
	 * The default callback function when Web Components get removed from the DOM.
	 */
	disconnectedCallback(): void;

	/**
	 * Dispatches the action in the injected store.
	 * A shorthand for this.dependencies.store.dispatch.
	 * @param action The Action object which should be dispatched
	 */
	dispatch(action: Record<string, any>): void;

	/**
	 * Loads the value from the given attribute and tries to convert it to a boolean value.
	 * @param attributeName The attribute name where the data should be taken from.
	 * @returns true if the value is "true", false if the value is "false", or null if the value cannot be converted.
	 */
	getBoolAttribute(attributeName: string): boolean | null;

	/**
	 * Loads the value from the given attribute and tries to convert it to a number.
	 * @param attributeName The attribute name where the data should be taken from.
	 * @returns A number if the conversion was successful, or null if the value can't be converted.
	 */
	getNumberAttribute(attributeName: string): number | null;

	/**
	 * Loads the value from the given attribute and tries to convert it to a JavaScript object.
	 * @param attributeName The attribute name where the data should be taken from.
	 * @returns A JavaScript object if the conversion was successful, or null if the value can't be converted.
	 */
	getJsonAttribute(attributeName: string): Record<string, any> | null;

	/**
	 * Connects all attributes starting with "$" to functions of the parent component.
	 * @param component The parent component which contains the functions that get connected.
	 */
	#addEventAttributeBindings(component: HTMLElement): void;

	/**
	 * Iterates through all the child elements of the given element recursively,
	 * excluding the children of registered Web Components.
	 * @param element The element of which the child elements should get iterated through.
	 * @param callback The callback function which gets executed for each child element.
	 */
	#iterateChildElementsRecursively(element: HTMLElement, callback: (child: HTMLElement) => void): void;

	/**
	 * Executes the render() function with the supplied selectorData,
	 * updates the component's innerHTML property with the resulting HTML,
	 * and updates #currentSelectorData to the supplied selectorData.
	 * @param selectorData An object containing results of the selector execution which should be used for the render function.
	 */
	#updateDOM(selectorData: Record<string, any>): void;

	/**
	 * Executes the selectors of the component and compares it to the previous result.
	 * If changes are detected, an update of the innerHTML property is triggered.
	 */
	#updateDOMIfChangesDetected(): void;

	// Properties (using Proxy)
	dependencies: {
		store?: {
			dispatch(action: Record<string, any>): void;
			subscribe(callback: () => void): () => void;
			executeSelectors(selectors: Record<string, Function>): Record<string, any>;
		};
		[key: string]: any;
	};

	// Optional lifecycle methods to be implemented in subclasses
	onConnect?(): void;
	onDisconnect?(): void;

	// Optional rendering-related methods to be implemented in subclasses
	styles?(): string;
	render(selectorData: Record<string, any>): string;
}

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
	static define(tagName: string, componentClass: Component): void;

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
	 * Loads the value from the given attribute and tries to convert it to an array.
	 * @param attributeName The attribute name where the data should be taken from.
	 * @returns An array if the conversion was successful. If the value can't be converted or the attribute does not exist, null.
	 */
	getArrayAttribute(attributeName: string): Array | null;

	/**
	 * Loads the value from the given attribute and tries to convert it to a boolean value.
	 * @param attributeName The attribute name where the data should be taken from.
	 * @returns true if the value is "true", false if the value is "false", or null if the value cannot be converted.
	 */
	getBooleanAttribute(attributeName: string): boolean | null;

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
	getObjectAttribute(attributeName: string): Record<string, any> | null;

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

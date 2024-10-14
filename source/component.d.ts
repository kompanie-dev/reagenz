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

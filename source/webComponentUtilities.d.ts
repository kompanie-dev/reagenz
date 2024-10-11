/**
 * A utility class for standard (non-Reagenz) Web Components.
 */
export declare class WebComponentUtilities {
	/**
	 * Registers Web Components in the CustomElementRegistry of the browser using an object and skips already registered ones.
	 * @param componentConfig An object containing keys and the component class (e.g., { "test-element": TestElementComponent, ... }).
	 */
	static defineComponents(componentConfig: {
		[tagName: string]: CustomElementConstructor;
	}): void;
}

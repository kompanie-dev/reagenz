/**
 * A utility class for standard (non-Reagenz) Web Components.
 */
export class WebComponentUtilities {
    /**
     * Registers Web Components in the CustomElementRegistry of the browser using an object and skips already registered ones.
     * @param {Object} componentConfig An object containing keys and the component class ({ "test-element": TestElementComponent, ... }).
     */
    static defineComponents(componentConfig) {
        Object
            .entries(componentConfig)
            .filter(([tagName]) => customElements.get(tagName) === undefined)
            .forEach(([tagName, componentClass]) => customElements.define(tagName, componentClass));
    }
}
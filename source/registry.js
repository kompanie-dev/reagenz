/**
 * A helper class for registering Web Components.
 */
export class Registry {
    /**
     * Registers Web Components using an object and skips already registered ones.
     * @param {Object} componentConfig An object containing keys and the component class ({ "test-element": TestElementComponent, ... }).
     */
    static registerWebComponents(componentConfig) {
        Object
            .entries(componentConfig)
            .filter(([tagName]) => customElements.get(tagName) === undefined)
            .forEach(([tagName, componentClass]) => customElements.define(tagName, componentClass));
    }
}
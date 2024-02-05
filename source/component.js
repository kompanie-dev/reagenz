/**
 * Represents the base class for all Reagenz components.
 * All Reagenz components are Web Components.
 */
export class Component extends HTMLElement {
    store = this.dependencies?.store;

    #currentSelectorData;
    #selectors;
    #unsubscribeCallback;

    /**
     * Creates a new instance of the Component.
     * @param {?Object} componentConfig An object containing the configuration of the Component { eventNames: ["click"], selectors: { selectorValue: selectorFunction } }.
     */
    constructor(componentConfig) {
        super();

        this.#selectors = componentConfig?.selectors ?? {};
        this.#unsubscribeCallback = this.store?.subscribe(() => this.#updateDOMIfChangesDetected());

        this.#updateDOMIfChangesDetected();
    }

    /**
     * Defines the component and under which tag name it should be available.
     * @param {string} tagName The name of the element, how it should be available in HTML. Needs to comply to the Web Components standard.
     * @param {Class} componentClass The class of the component.
     */
    static define(tagName, componentClass) {
        componentClass.prototype.dependencies = new Proxy({}, {
            get: function(dependencyContainer, propertyName) {
                if (!(propertyName in dependencyContainer) && propertyName !== "store") {
                    console.warn(`${tagName} is accessing the undefined dependency '${propertyName}'. Did you inject it using Reagenz.injectDependencies()?`);
                }

                return Reflect.get(...arguments);
            }
        });

        if (customElements.get(tagName) === undefined) {
            customElements.define(tagName, componentClass);
        }
    }

    /**
     * The default callback function when web components get added to the DOM.
     */
    connectedCallback() {
        this.onConnect?.();
    }

    /**
     * The default callback function when web components get removed from the DOM.
     */
    disconnectedCallback() {
        this.#unsubscribeCallback?.();

        this.onDisconnect?.();
    }

    /**
     * Loads the value from the given attribute and tries to convert it to a boolean value.
     * @param {string} attributeName The attribute name where the data should be taken from.
     * @returns {?boolean} true, when the value is "true", false when the value is "false". If the value can't be converted or the attribute does not exist, null.
     */
    getBoolAttribute(attributeName) {
        const value = this.getAttribute(attributeName);

        if (value === "true") {
            return true;
        }
        if (value === "false") {
            return false;
        }

        return null;
    }

    /**
     * Loads the value from the given attribute and tries to convert it to a float value.
     * @param {string} attributeName The attribute name where the data should be taken from.
     * @returns {?number} A float if the conversion was successful. If the value can't be converted or the attribute does not exist, null.
     */
    getFloatAttribute(attributeName) {
        const value = this.getAttribute(attributeName);
        const parsedValue = Number.parseFloat(value);

        return Number.isNaN(parsedValue) ? null : parsedValue;
    }

    /**
     * Loads the value from the given attribute and tries to convert it to an integer value.
     * @param {string} attributeName The attribute name where the data should be taken from.
     * @returns {?number} An integer if the conversion was successful. If the value can't be converted or the attribute does not exist, null.
     */
    getIntAttribute(attributeName) {
        const value = this.getAttribute(attributeName);
        const parsedValue = Number.parseInt(value, 10);

        return Number.isNaN(parsedValue) ? null : parsedValue;
    }
    
    /**
     * Loads the value from the given attribute and tries to convert it to a JavaScript object.
     * @param {string} attributeName The attribute name where the data should be taken from.
     * @returns {?Object} A JavaScript object if the conversion was successful. If the value can't be converted or the attribute does not exist, null.
     */
    getJsonAttribute(attributeName) {
        const value = this.getAttribute(attributeName);
        
        try {
            return JSON.parse(value);
        }
        catch {
            return null;
        }
    }

    /**
    * Connects event attributes like $click of a child element to the functions of the parent component.
    * In the following example, the button's $click attribute would be mapped to the component's function "functionA":
    * <button $click="functionA">Test</button>.
    * @param {HTMLElement} component The parent component which contains the functions that get connected.
    * @param {HTMLElement} element The child element of which the attributes should get connected.
    * @param {string} attributeName The name of the attribute which contains the function name ($click etc.).
    * @param {string} attributeValue The name of the function which the event should get connected to.
    */
    #addEventAttributeBinding(component, element, attributeName, attributeValue) {
        const eventName = attributeName.substring(1);
        const functionName = attributeValue;
        
        if (component[functionName] !== undefined) {
            element.addEventListener(eventName, (event) => component[functionName](event));
            return;
        }

        if (functionName !== null) {
            console.warn(`${component.tagName.toLowerCase()} defined a non-existent $${eventName} handler called '${functionName}'`);
        }
    }

    /**
     * Executes all the selector functions contained within the object and returns the result.
     * @param {Object} selectorObject An object containing selector functions as properties ({ selectorA: selectorFunction, ... }).
     * @param {?Store} store The instance of Store which should be used to execute the selectors against.
     * @returns {Object} An object containing the same property names, filled with the selector execution results.
     */
    #executeSelectors(selectorObject, store) {
        const executionResults =
            Object
                .entries(selectorObject)
                .map(([propertyName, selectorFunction]) => [propertyName, store?.select(selectorFunction)]);

        return Object.fromEntries(executionResults);
    }

    /**
     * Determines if two selector data objects are equal.
     * @param {Object} objectA The selector data object which should be compared.
     * @param {Object} objectB The selector data object which should be compared against.
     * @returns {boolean} true, if the selector data objects contain the same data, otherwise false.
     */
    #isSelectorDataEqual(objectA, objectB) {
        if (objectA === objectB) {
            return true;
        }

        if (typeof objectA !== "object" || typeof objectB !== "object" || objectA === null || objectB === null || objectA.length !== objectB.length) {
            return false;
        }
    
        const propertyNamesA = Object.keys(objectA);
        const propertyNamesB = Object.keys(objectB);
    
        for (const propertyName of propertyNamesA) {
            if (!propertyNamesB.includes(propertyName) || !this.#isSelectorDataEqual(objectA[propertyName], objectB[propertyName])) {
                return false;
            }
        }
    
        return true;
    }

    /**
     * Iterates through all the child elements of the given element recursively,
     * excluding the children of registered Web Components.
     * @param {HTMLElement} element The element of which the child elements should get iterated through.
     * @param {Function} callback The callback function which gets executed for each child element.
     */
    #iterateChildElementsRecursively(element, callback) {
        for (const childNode of element.children) {
            callback(childNode);
    
            if (customElements.get(childNode.tagName.toLowerCase()) === undefined) {
                this.#iterateChildElementsRecursively(childNode, callback);
            }
        }
    }

    /**
     * Executes the render() function with the supplied selectorData,
     * updates the components innerHTML property with the resulting HTML
     * and updates #currentSelectorData to the supplied selectorData.
     * @param {Object} selectorData An object containing results of the selector execution which should be used for the render function.
     */
    #updateDOM(selectorData) {
        this.innerHTML =
            (this.styles ? `<style>${this.styles()}</style>` : "") +
            this.render(selectorData);

        this.#currentSelectorData = selectorData;
        
        this.#iterateChildElementsRecursively(this, (childNode) => {
            for (const attribute of childNode.attributes) {
                if (attribute.name.startsWith("$") === true) {
                    this.#addEventAttributeBinding(this, childNode, attribute.name, attribute.value);
                }
            }
        });
    }

    /**
     * Executes the selectors of the component and compares it to the previous result.
     * If changes are detected, an update of the innerHTML property is triggered.
     */
    #updateDOMIfChangesDetected() {
        const newSelectorData = this.#executeSelectors?.(this.#selectors, this.store);

        if (this.#isSelectorDataEqual(this.#currentSelectorData, newSelectorData) === false) {
            this.#updateDOM(newSelectorData);
        }
    }
}
/**
 * Represents the base class for all Reagenz components.
 * All Reagenz components are Web Components.
 */
export class Component extends HTMLElement {
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
        this.#unsubscribeCallback = this.dependencies.store?.subscribe(() => this.#updateDOMIfChangesDetected());

        this.#updateDOMIfChangesDetected();
    }

    /**
     * Defines the component and under which tag name it should be available.
     * @param {string} tagName The name of the element, how it should be available in HTML. Needs to comply to the Web Components standard.
     * @param {Class} componentClass The class of the component.
     */
    static define(tagName, componentClass) {
        if (customElements.get(tagName) === undefined) {
            customElements.define(tagName, componentClass);
        }

        componentClass.prototype.dependencies = new Proxy({}, {
            get: function(dependencyContainer, propertyName) {
                if (!(propertyName in dependencyContainer) && propertyName !== "store") {
                    console.warn(`${tagName} is accessing the undefined dependency '${propertyName}'. Did you inject it using Injector.injectDependencies()?`);
                }

                return Reflect.get(...arguments);
            }
        });
    }

    /**
     * The default callback function when Web Components get added to the DOM.
     */
    connectedCallback() {
        this.onConnect?.();
    }

    /**
     * The default callback function when Web Components get removed from the DOM.
     */
    disconnectedCallback() {
        this.#unsubscribeCallback?.();

        this.onDisconnect?.();
    }

    /**
     * Dispatches the action in the injected store.
     * A shorthand for this.dependencies.store.dispatch.
     * @param {Object} action The Action object which should be dispatched
     */
    dispatch(action) {
        if (this.dependencies.store === undefined) {
            throw new Error(`No store was injected into ${this.tagName.toLowerCase()}, so the action ${action?.type} could not be dispatched. Did you inject the store using Injector.injectDependencies()?`);
        }

        this.dependencies.store.dispatch(action);
    }

    /**
     * Loads the value from the given attribute and tries to convert it to a boolean value.
     * @param {string} attributeName The attribute name where the data should be taken from.
     * @returns {?boolean} true, when the value is "true", false when the value is "false". If the value can't be converted or the attribute does not exist, null.
     */
    getBoolAttribute(attributeName) {
        const attributeValue = this.getAttribute(attributeName);

        if (attributeValue === "true") {
            return true;
        }
        if (attributeValue === "false") {
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
        const attributeValue = this.getAttribute(attributeName);
        const parsedValue = Number.parseFloat(attributeValue);

        return Number.isNaN(parsedValue) ? null : parsedValue;
    }

    /**
     * Loads the value from the given attribute and tries to convert it to an integer value.
     * @param {string} attributeName The attribute name where the data should be taken from.
     * @returns {?number} An integer if the conversion was successful. If the value can't be converted or the attribute does not exist, null.
     */
    getIntAttribute(attributeName) {
        const attributeValue = this.getAttribute(attributeName);
        const parsedValue = Number.parseInt(attributeValue, 10);

        return Number.isNaN(parsedValue) ? null : parsedValue;
    }
    
    /**
     * Loads the value from the given attribute and tries to convert it to a JavaScript object.
     * @param {string} attributeName The attribute name where the data should be taken from.
     * @returns {?Object} A JavaScript object if the conversion was successful. If the value can't be converted or the attribute does not exist, null.
     */
    getJsonAttribute(attributeName) {
        const attributeValue = this.getAttribute(attributeName);
        
        try {
            return JSON.parse(attributeValue);
        }
        catch {
            return null;
        }
    }

    /**
    * Connects event attributes like $click of a child element to the functions of the parent component.
    * In the following example, the button's $click attribute would be mapped to the component's function "functionA":
    * <button $click="functionA">Test</button>.
    * Only attribute names starting with $ will be handled.
    * @param {HTMLElement} component The parent component which contains the functions that get connected.
    * @param {HTMLElement} element The child element of which the attributes should get connected.
    * @param {string} eventName The name of the attribute which contains the function name ($click etc.).
    * @param {string} functionName The name of the function which the event should get connected to.
    */
    #addEventAttributeBinding(component, element, eventName, functionName) {
        if (eventName.startsWith("$") === false) {
            return;
        }

        if (eventName.startsWith("$") && typeof component[functionName] === "function") {
            element.addEventListener(eventName.substring(1), (event) => component[functionName](event));
        }
        else {
            console.warn(`${component.tagName.toLowerCase()} defined a ${eventName} handler called '${functionName}' which does not exist or isn't a function`);
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
     * Determines if two objects are deep equal.
     * @param {Object} objectA The object which should be compared.
     * @param {Object} objectB The object which should be compared against.
     * @returns {boolean} true, if both objects are the same or contain the same data, otherwise false.
     */
    #isDeepEqual(objectA, objectB) {
        if (objectA === objectB) {
            return true;
        }

        if (typeof objectA !== "object" || typeof objectB !== "object" || objectA === null || objectB === null || objectA.length !== objectB.length) {
            return false;
        }
    
        const propertyNamesA = Object.keys(objectA);
        const propertyNamesB = Object.keys(objectB);
    
        if (propertyNamesA.length !== propertyNamesB.length) {
                return false;
        }
    
        return propertyNamesA.every(
            propertyName => this.#isDeepEqual(objectA[propertyName], objectB[propertyName])
        );
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
                    this.#addEventAttributeBinding(this, childNode, attribute.name, attribute.value);
            }
        });
    }

    /**
     * Executes the selectors of the component and compares it to the previous result.
     * If changes are detected, an update of the innerHTML property is triggered.
     */
    #updateDOMIfChangesDetected() {
        const newSelectorData = this.#executeSelectors?.(this.#selectors, this.dependencies.store);

        if (this.#isDeepEqual(this.#currentSelectorData, newSelectorData) === false) {
            this.#updateDOM(newSelectorData);
        }
    }
}
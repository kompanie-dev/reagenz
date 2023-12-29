/**
 * Represents the base class for all Reagenz components.
 * All Reagenz components are Web Components.
 */
export class Component extends HTMLElement {
    store = this.dependencies?.store;

    #eventNames;
    #currentSelectorData = null;
    #selectors;
    #unsubscribeCallback;

    /**
     * Creates a new instance of the Component.
     * @param {?Object} componentConfig An object containing the configuration of the Component { eventNames: ["click"], selectors: { selectorValue: selectorFunction } }.
     */
    constructor(componentConfig) {
        super();

        this.#eventNames = componentConfig?.eventNames ?? DEFAULT_EVENT_NAMES;
        this.#selectors = componentConfig?.selectors ?? {};
        this.#unsubscribeCallback = this.store?.subscribe(() => this.#updateDOMIfChangesDetected());

        this.#updateDOMIfChangesDetected();
        this.#addComponentEventCallbacks(this, this.#eventNames);
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
     * @returns true, when the value is "true", false when the value is "false". If the value can't be converted or the attribute does not exist, null.
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
     * @returns A float if the conversion was successful. If the value can't be converted or the attribute does not exist, null.
     */
    getFloatAttribute(attributeName) {
        const value = this.getAttribute(attributeName);
        const parsedValue = Number.parseFloat(value);

        return Number.isNaN(parsedValue) ? null : parsedValue;
    }

    /**
     * Loads the value from the given attribute and tries to convert it to an integer value.
     * @param {string} attributeName The attribute name where the data should be taken from.
     * @returns An integer if the conversion was successful. If the value can't be converted or the attribute does not exist, null.
     */
    getIntAttribute(attributeName) {
        const value = this.getAttribute(attributeName);
        const parsedValue = Number.parseInt(value, 10);

        return Number.isNaN(parsedValue) ? null : parsedValue;
    }
    
    /**
     * Loads the value from the given attribute and tries to convert it to a JavaScript object.
     * @param {string} attributeName The attribute name where the data should be taken from.
     * @returns A JavaScript object if the conversion was successful. If the value can't be converted or the attribute does not exist, null.
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
     * In this instance, the button's $click attribute would be mapped to the component's function "functionA"
     * <button $click="functionA">Test</button>.
     * @param {HTMLElement} component The parent component which contains the functions that get connected.
     * @param {HTMLElement} element The child element of which the attributes should get connected.
     * @param {string[]} eventNames An array containing all the event names which should get connected.
     */
    #addChildElementEventCallbacks(component, element, eventNames) {
        for (const eventName of eventNames) {
            const attributeName = "$" + eventName;
            const functionName = element.getAttribute(attributeName);

            if (functionName !== null && component[functionName] === undefined) {
                console.warn(`Component ${component.tagName.toLowerCase()} defined a non-existent ${attributeName} handler called '${functionName}'`);
                continue;
            }

            if (component[functionName] !== undefined) {
                element.addEventListener(eventName, (event) => component[functionName](event));
            }
        }
    }

    /**
     * Connects the given event attributes specified in the eventNames to the specified component functions.
     * @param {HTMLElement} component The component which the event listeners should get attached to.
     * @param {string[]} eventNames A string array containing the event names which should be listened to.
     */
    #addComponentEventCallbacks(component, eventNames) {
        for (const eventName of eventNames) {
            const functionName = "$" + eventName;

            if (component[functionName] !== undefined) {
                component.addEventListener(eventName, (event) => component[functionName](event));
            }
        }
    }

    /**
     * Executes all the selector functions contained within the object and returns the result.
     * @param {Object} selectorObject An object containing selector functions as properties ({ selectorA: selectorFunction, ... }).
     * @param {?Store} store The instance of Store which should be used to execute the selectors against.
     * @returns An object containing the same property names, filled with the selector execution results.
     */
    #executeSelectors(selectorObject, store) {
        const selectorExecutionResult = {};

        Object
            .entries(selectorObject)
            .forEach(
                ([key, value]) => selectorExecutionResult[key] = store?.select(value)
            );
        
        return selectorExecutionResult;
    }

    /**
     * Determines if two objects are deep equal.
     * @param {Object} objectA An object which should be compared.
     * @param {Object} objectB The object which should be compared against.
     * @returns true, if the objects are deep equal, otherwise false.
     */
    #isObjectDeepEqual(objectA, objectB) {
        if (objectA === objectB) {
            return true;
        }
    
        if (typeof objectA !== "object" || typeof objectB !== "object" || objectA === null || objectB === null) {
            return false;
        }
    
        const keysA = Object.keys(objectA);
        const keysB = Object.keys(objectB);
    
        if (keysA.length !== keysB.length) {
            return false;
        }
    
        for (const key of keysA) {
            if (!keysB.includes(key) || !this.#isObjectDeepEqual(objectA[key], objectB[key])) {
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
        const style = this.styles ? `<style>${this.styles}</style>` : "";
        this.innerHTML = style + this.render(selectorData);

        this.#currentSelectorData = selectorData;
        
        this.#iterateChildElementsRecursively(
            this,
            (childNode) => this.#addChildElementEventCallbacks(this, childNode, this.#eventNames)
        );
    }

    /**
     * Executes the selectors of the component and compares it to the previous result.
     * If changes are detected, an update of the innerHTML property is triggered.
     */
    #updateDOMIfChangesDetected() {
        const newSelectorData = this.#executeSelectors?.(this.#selectors, this.store);
        const hasSelectorDataChanged = this.#isObjectDeepEqual(this.#currentSelectorData, newSelectorData) === false;

        if (hasSelectorDataChanged === true) {
            this.#updateDOM(newSelectorData);
        }
    }
}

/**
 * A string array containing all event names that are handled by the Component class by default.
 */
export const DEFAULT_EVENT_NAMES = ["blur", "change", "click", "focus", "input", "keydown", "keyup", "mousedown", "mouseup"];
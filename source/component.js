import { ObjectComparator } from "./objectComparator.js";

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
	 *
	 * @param {?Function[]} selectors An array containing the selector functions that should be used for change detection and rendering.
	 */
	constructor(selectors = []) {
		super();

		this.#selectors = selectors;

		if (this.dependencies.store === undefined && this.#selectors.length !== 0) {
			throw new Error(`${this.tagName.toLowerCase()}: Tried to use selectors without injecting a store`);
		}
	}

	/**
	 * Defines the component and the tag name it should use.
	 *
	 * @param {string} tagName The name of the element, how it should be available in HTML. Needs to comply to the Web Components standard.
	 * @param {CustomElementConstructor} componentClass The class of the component.
	 *
	 * @returns {void}
	 */
	static define(tagName, componentClass) {
		if (customElements.get(tagName) !== undefined) {
			return;
		}

		customElements.define(tagName, componentClass);

		componentClass.prototype.dependencies = new Proxy({}, {
			get(dependencyContainer, propertyName, ...args) {
				if (!(propertyName in dependencyContainer) && propertyName !== "store") {
					throw new Error(`${tagName}: Tried to access dependency '${String(propertyName)}', which is not injected`);
				}

				return Reflect.get(dependencyContainer, propertyName, ...args);
			}
		});
	}

	/**
	 * The default callback function when Web Components get added to the DOM.
	 *
	 * @returns {void}
	 */
	connectedCallback() {
		this.#unsubscribeCallback = this.dependencies.store?.subscribe(() => this.#updateDOMIfChangesDetected());

		this.#updateDOMIfChangesDetected();

		this.onConnect?.();
	}

	/**
	 * The default callback function when Web Components get removed from the DOM.
	 *
	 * @returns {void}
	 */
	disconnectedCallback() {
		this.#unsubscribeCallback?.();

		this.onDisconnect?.();
	}

	/**
	 * Dispatches the action in the injected store.
	 * A shorthand for this.dependencies.store.dispatch.
	 *
	 * @param {Object} action The Action object which should be dispatched
	 *
	 * @returns {void}
	 */
	dispatch(action) {
		if (this.dependencies.store === undefined) {
			throw new Error(`${this.tagName.toLowerCase()}: Actions can't be dispatched without an injected store`);
		}

		this.dependencies.store.dispatch(action);
	}

	/**
	 * Loads the value from the given attribute and tries to convert it to an array.
	 *
	 * @param {string} attributeName The attribute name where the data should be taken from.
	 *
	 * @returns {?Array.<Object>} An array if the conversion was successful. If the value can't be converted or the attribute does not exist, null.
	 */
	getArrayAttribute(attributeName) {
		return this.getTypedAttribute(attributeName, "array");
	}

	/**
	 * Loads the value from the given attribute and tries to convert it to a boolean value.
	 *
	 * @param {string} attributeName The attribute name where the data should be taken from.
	 *
	 * @returns {?boolean} true, when the value is "true", false when the value is "false". If the value can't be converted or the attribute does not exist, null.
	 */
	getBooleanAttribute(attributeName) {
		return this.getTypedAttribute(attributeName, "boolean");
	}

	/**
	 * Loads the value from the given attribute and tries to convert it to a number.
	 *
	 * @param attributeName The attribute name where the data should be taken from.
	 *
	 * @returns A number if the conversion was successful, or null if the value can't be converted.
	 */
	getNumberAttribute(attributeName) {
		return this.getTypedAttribute(attributeName, "number");
	}

	/**
	 * Loads the value from the given attribute and tries to convert it to a JavaScript object.
	 *
	 * @param {string} attributeName The attribute name where the data should be taken from.
	 *
	 * @returns {?Object} A JavaScript object if the conversion was successful. If the value can't be converted or the attribute does not exist, null.
	 */
	getObjectAttribute(attributeName) {
		return this.getTypedAttribute(attributeName, "object");
	}

	/**
	 * Loads the value of the given attribute and tries to convert it.
	 * If the conversion succeeds, the converted value is returned.
	 * If the attribute does not exist or can't be converted into the right type, null is returned.
	 *
	 * @param {string} attributeName The name of the attribute where the value should be retrieved from.
	 * @param {"array" | "boolean" | "number" | "object" | "string"} destinationType The destination type of the value.
	 *
	 * @returns {*} The attribute value converted into the right type, otherwise null
	 */
	getTypedAttribute(attributeName, destinationType) {
		try {
			const attributeValue = this.getAttribute(attributeName);
			const parsedValue = JSON.parse(attributeValue);

			if (parsedValue?.constructor.name.toLowerCase() === destinationType) {
				return parsedValue;
			}
		} catch { /*eslint no-empty: "off"*/ }

		return null;
	}

	/**
	* Connects all attributes starting with "$" to functions of the parent component.
	* In this example the button's click event would execute "functionA" on the Reagenz component:
	* <button $click="functionA">Test</button>.

	* @param {HTMLElement} component The parent component which contains the functions that get connected.
	*
	* @returns {void}
	*/
	#addEventAttributeBindings(component) {
		this.#iterateChildElementsRecursively(this, (childNode) => {
			for (const attribute of childNode.attributes) {
				const eventName = attribute.name;
				const functionName = attribute.value;

				if (eventName.startsWith("$") === false) {
					continue;
				}

				if (typeof component[functionName] === "function") {
					childNode.addEventListener(eventName.substring(1), (event) => component[functionName](event));
				}
				else {
					console.warn(`${component.tagName.toLowerCase()}: ${eventName} handler '${functionName}' doesn't exist or is not a function`);
				}
			}
		});
	}

	/**
	 * Iterates through all the child elements of the given element recursively,
	 * excluding the children of Web Components.
	 *
	 * @param {Element} element The element of which the child elements should get iterated through.
	 * @param {Function} callback The callback function which gets executed for each child element.
	 *
	 * @returns {void}
	 */
	#iterateChildElementsRecursively(element, callback) {
		for (const childNode of element.children) {
			callback(childNode);

			if (childNode.tagName.includes("-") === false) {
				this.#iterateChildElementsRecursively(childNode, callback);
			}
		}
	}

	/**
	 * Executes the render() function with the supplied selectorData,
	 * updates the components innerHTML property with the resulting HTML
	 * and updates #currentSelectorData to the supplied selectorData.
	 *
	 * @param {Object} selectorData An object containing results of the selector execution which should be used for the render function.
	 *
	 * @returns {void}
	 */
	#updateDOM(selectorData) {
		this.innerHTML =
			(this.styles ? `<style>${this.styles()}</style>` : "") +
			this.render(selectorData);

		this.#currentSelectorData = selectorData;

		this.#addEventAttributeBindings(this);
	}

	/**
	 * Executes the selectors of the component and compares it to the previous result.
	 * If changes are detected, an update of the innerHTML property is triggered.
	 *
	 * @returns {void}
	 */
	#updateDOMIfChangesDetected() {
		const newSelectorData = this.dependencies.store?.executeSelectors(this.#selectors) ?? [];

		if (ObjectComparator.checkDeepEquality(this.#currentSelectorData, newSelectorData) === false) {
			this.#updateDOM(newSelectorData);
		}
	}
}

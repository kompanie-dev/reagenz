import { ObjectComparator } from "./objectComparator.js";

/**
 * Represents the base class for all Reagenz components.
 * All Reagenz components are Web Components.
 */
export class Component extends HTMLElement {
	#unsubscribeCallback;

	/**
	 * The default callback function when Web Components get added to the DOM.
	 *
	 * @returns {void}
	 */
	connectedCallback() {
		this.#unsubscribeCallback = this.dependencies?.store?.subscribe(() => this.#updateDOM());

		this.#updateDOM(true);

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
	 *
	 * @param {{ type: string, [key: string]: * }} action The Action object which should be dispatched
	 *
	 * @returns {void}
	 */
	dispatch(action) {
		this.dependencies.store.dispatch(action);
	}

	/**
	 * Connects all attributes starting with "$" to functions of the component.
	 * In this example the button's click event would execute "functionA" on the Reagenz component:
	 * <button $click="functionA">Test</button>.

	 * @param {Element} element The element which contains the attributes that should get connected.
	 *
	 * @returns {void}
	 */
	#bindEventAttributes(component, element) {
		for (const childNode of element.children) {
			for (const attribute of childNode.attributes) {
				const eventName = attribute.name;
				const functionName = attribute.value;

				if (!eventName.startsWith("$")) {
					continue;
				}

				if (typeof component[functionName] === "function") {
					childNode.addEventListener(eventName.substring(1), (event) => component[functionName](event));

					continue;
				}

				console.warn(`${component.tagName.toLowerCase()}: ${eventName} handler ${functionName} doesn't exist or is not a function`);
			}

			if (!childNode.tagName.includes("-")) {
				component.#bindEventAttributes(component, childNode);
			}
		}
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
	#getTypedAttribute(attributeName, destinationType) {
		try {
			const attributeValue = this.getAttribute(attributeName);

			if (destinationType === "string") {
				return attributeValue;
			}

			const parsedValue = JSON.parse(attributeValue);

			if (parsedValue?.constructor.name.toLowerCase() === destinationType) {
				return parsedValue;
			}
		} catch { /*eslint no-empty: "off"*/ }

		return null;
	}

	/**
	 * Parses the attributes specified in the attributeTypes property and tries to convert them to the given type.
	 * If the conversion fails, null is used as value.
	 *
	 * @returns An object with the same property names as attributeTypes, but with the converted data.
	 */
	#parseAttributes() {
		return Object.fromEntries(
			Object
				.entries(this.attributeTypes ?? {})
				.map(
					([attributeName, attributeType]) => [attributeName, this.#getTypedAttribute(attributeName, attributeType.name.toLowerCase())]
				));
	}

	/**
	 * Executes the render() function with the selector data,
	 * updates the components innerHTML property with the resulting HTML
	 * and updates #currentSelectorData to the supplied selectorData.
	 *
	 * @param {boolean} force If true, change detection is skipped and the innerHTML is rendered.
	 *
	 * @returns {void}
	 */
	#updateDOM(force = false) {
		const newSelectorData = this.dependencies?.store?.executeSelectors(this.selectors ?? {});

		if (!force && ObjectComparator.checkDeepEquality(this.selectorData, newSelectorData)) {
			return;
		}

		this.attributeData = this.#parseAttributes();
		this.selectorData = newSelectorData;

		this.innerHTML =
			(this.styles ? `<style>${this.styles}</style>` : "") +
			this.render();

		this.#bindEventAttributes(this, this);
	}
}

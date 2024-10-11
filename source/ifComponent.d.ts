import { Component } from "./component.js";

/**
 * Renders the innerHTML of the component if the condition attribute is "true".
 */
export declare class IfComponent extends Component {
	/**
	 * Renders the component's innerHTML based on the condition attribute.
	 * @returns The innerHTML of the component if the condition is true, otherwise an empty string.
	 */
	render(): string;
}

declare global {
	interface HTMLElementTagNameMap {
		"x-if": IfComponent;
	}
}

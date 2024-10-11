import { Component } from "./component.js";

/**
 * Reads the stringified array contained inside the array attribute of the component
 * and uses its values and index to render the innerHTML of the component for each item of the array.
 * To get the current index of the loop use the @index() placeholder.
 * For accessing the data of the array use @item().
 * If you need to access certain properties of the array element use @item(item.propertyA.propertyB).
 */
export declare class ForComponent extends Component {
	/**
	 * Renders the component's innerHTML based on the array attribute.
	 * @returns The rendered HTML for each item in the array.
	 */
	render(): string;
}

declare global {
	interface HTMLElementTagNameMap {
		"x-for": ForComponent;
	}
}

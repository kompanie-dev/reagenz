import { Component } from "./component.js";
import { HtmlEscaper } from "./htmlEscaper.js";

/**
 * Reads the stringified array contained inside the array attribute of the component
 * and uses it's values and index to render the innerHTML of the component for each item of the array.
 * To get the current index of the loop use the @index() placeholder.
 * For accessing the data of the array use @item().
 * If you need to access certain properties of the array element use @item(item.propertyA.propertyB).
 */
export class ForComponent extends Component {
	attributeTypes = { array: Array };

	render() {
		const { array } = this.useAttributes();

		return array
			.map((element, index) =>
				this.innerHTML.replace(/@index\(\)|@item\((.*?)\)/gu, (match, propertyName) => {
					if (match === "@index()") {
						return index.toString();
					}

					let propertyValue = element;

					if (propertyName) {
						propertyValue = propertyName
							.split(".")
							.reduce((accumulator, currentProperty) => accumulator?.[currentProperty], element);
					}

					return propertyValue === null || propertyValue === undefined
						? ""
						: HtmlEscaper.escapeString(propertyValue.toString());
				})
			)
			.join("");
	}
}

customElements.define("x-for", ForComponent);

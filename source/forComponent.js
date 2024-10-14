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
	render() {
		return this
			.getTypedAttribute("array", "array")
			.map((element, index) =>
				this.innerHTML
					.replaceAll("@index()", index)
					.replaceAll(/@item\((.*?)\)/gu,
						(_, propertyName) => {
							if (propertyName === "") {
								return HtmlEscaper.escapeString(element.toString());
							}

							const propertyValue = propertyName
								.split(".")
								.reduce(
									(accumulator, currentProperty) => (accumulator?.[currentProperty] === undefined) ? undefined : accumulator[currentProperty], element
								);

							return (propertyValue === null || propertyValue === undefined) ?
								propertyValue :
								HtmlEscaper.escapeString(propertyValue.toString());
						}
					)
			)
			.join("");
	}
}

Component.define("x-for", ForComponent);

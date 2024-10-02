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
            .getJsonAttribute("array")
            .map((element, index) =>
                this.innerHTML
                    .replaceAll("@index()", index)
                    .replaceAll(/@item\((.*?)\)/gv, (_, propertyName) => this.getItemValue(element, propertyName))
            )
            .join("");
    }

    /**
     * Takes an object, tries to access the specified property (for instance obj.propertyA.propertyB) and escapes the value if the data is of type string.
     * If the given object is already a boolean, number or string, execution is skipped and the object will be returned as-is.
     * If the desired property does not exist, undefined will be returned.
     * @param {any} obj The object, of which the value should be extracted.
     * @param {string} propertiesString The names of the properties of which the value should be extracted (example: obj.propertyA.propertyB). 
     * @returns {any} The value of the specified property of the object.
     */
    getItemValue(obj, propertiesString) {
        if (typeof obj === "string") {
            return HtmlEscaper.escapeString(obj);
        }
        if (typeof obj !== "object" || obj === null) {
            return obj;
        }

        const propertyValue = propertiesString
            .split(".")
            .reduce(
                (result, propertyName) => result?.[propertyName], obj
            );

        return typeof propertyValue === "string" ?
            HtmlEscaper.escapeString(propertyValue) :
            propertyValue;
    }
}

Component.define("x-for", ForComponent);
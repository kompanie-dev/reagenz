import { Component } from "./component.js";

export class ForComponent extends Component {
    render() {
        return this
            .getJsonAttribute("array")
            .map((element, index) => this.innerHTML
                .replaceAll("@index()", index)
                .replace(/@element\((.*?)\)/g, (_, propertyName) =>
                    this.getProperty(element, propertyName))
            )
            .join("");
    }

    getProperty(obj, propertiesString) {
        if (typeof obj === "number" || typeof obj === "string" || typeof obj === "boolean") {
            return obj;
        }

        const properties = propertiesString.split(".");
        let result = obj;
        
        for (let i = 0; i < properties.length; i++) {
            if (result.hasOwnProperty(properties[i]) === false) {
                return undefined;
            }

            result = result[properties[i]];
        }
        
        return result;
    }
}

Component.define("x-for", ForComponent);
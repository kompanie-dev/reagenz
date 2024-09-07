import { Component } from "./component.js";

/**
 * Renders the innerHTML of the component if the condition attribute is "true".
 */
export class IfComponent extends Component {
    render() {
        const conditionResult = this.getBoolAttribute("condition");

        return (conditionResult === true) ? this.innerHTML : "";
    }
}

Component.define("x-if", IfComponent);
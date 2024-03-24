import { Component } from "./component.js";

export class IfComponent extends Component {
    render() {
        const conditionResult = this.getBoolAttribute("condition");

        return (conditionResult === true) ? this.innerHTML : "";
    }
}

Component.define("x-if", IfComponent);
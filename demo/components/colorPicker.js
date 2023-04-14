import { Component } from "../../index.js";

export class ColorPicker extends Component {
    change(event) {
        this.setState("color", event.target.value);
    }

    render() {
        return /*html*/`
            <input type="color" value="${this.getState("color")}">
        `;
    }
}
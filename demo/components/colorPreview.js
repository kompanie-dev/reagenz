import { Component } from "../../index.js";

export class ColorPreview extends Component {
    render() {
        return /*html*/`
            <span style="color: ${this.getState("color")}">Color Preview</span>
        `;
    }
}
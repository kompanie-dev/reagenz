import { Component } from "../../index.js";

export class TextInputReadonly extends Component {
    render() {
        return /*html*/`
            <input type="text" value="${this.getState("text")}" readonly>
        `;
    }
}
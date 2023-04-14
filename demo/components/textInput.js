import { Component } from "../../index.js";

export class TextInput extends Component {
    get renderIfStateChangeOrigin() {
        return false;
    }

    input() {
        this.setState("text", this.children[0].value); 
    }

    render() {
        return /*html*/`
            <input type="text" value="${this.getState("text")}">
        `;
    }
}
import { Component } from "../../index.js";

export class Accordion extends Component {
    click() {
        const newText = this.getAttribute("state") === "open" ? "close" : "open";

        this.setAttribute("state", newText);
    }

    render() {
        return /*html*/`
            <button>${this.getAttribute("state")}</button>
        `;
    }
}
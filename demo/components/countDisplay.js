import { Component } from "../../index.js";

export class CountDisplay extends Component {
    render() {
        return /*html*/`
            <h3>Current Count: ${this.getState("count")}</h3>
        `;
    }
}
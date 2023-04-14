import { Component } from "../../index.js";

export class TransformationDisplay extends Component {
    render() {
        return /*html*/`
            <h3>
                <span style="color:#f00">${this.getState("position").x} | ${this.getState("position").y}</span>
                <span style="color:#0f0">${this.getState("rotation").x} | ${this.getState("rotation").y}</span>
                <span style="color:#00f">${this.getState("scale").x} | ${this.getState("scale").y}</span>
            </h3>
        `;
    }
}
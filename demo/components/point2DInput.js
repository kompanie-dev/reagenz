import { Component } from "../../index.js";

export class Point2DInput extends Component {
    get renderIfStateChangeOrigin() {
        return false;
    }

    get stateName() {
        return this.getAttribute("stateName");
    }

    change() {
        const inputs = this.querySelectorAll("input");

        this.setState(
            this.stateName,
            {
                x: inputs[0].value,
                y: inputs[1].value
            }
        );
    }

    render() {
        const state = this.getState(this.stateName);

        return /*html*/`
            <div>
                X: <input type="number" value="${state.x}">
                Y: <input type="number" value="${state.y}">
            </div>
        `;
    }
}
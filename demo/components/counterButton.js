import { Component } from "../../index.js";

export class CounterButton extends Component {
    get text() {
        return this.getAttribute("modifier") === "-1" ?
            `Decrease to ${this.getState("count") - 1}` :
            `Increase to ${this.getState("count") + 1}`;
    }
    
    click() {
        const attribute = this.getAttribute("modifier");
        const newCount = this.getState("count") + Number.parseInt(attribute);
        
        this.setState("count", newCount);
    }

    render() {
        return /*html*/`
            <button>${this.text}</button>
        `;
    }
}
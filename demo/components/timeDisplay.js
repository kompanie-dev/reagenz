import { Component } from "../../index.js";
import { TimeService } from "../services/timeService.js";

export class TimeDisplay extends Component {
    #intervalID;
    #timeService = new TimeService();

    connectedCallback() {
        this.#intervalID = setInterval(
            () => {
                const time = this.#timeService.formatDate(new Date());
                
                this.setState("time", time);
            },
            1000
        );

        super.connectedCallback();
    }

    disconnectedCallback() {
        clearInterval(this.#intervalID);
    }

    render() {
        return /*html*/`
            <h3>${this.getState("time")}</h3>
        `;
    }
}
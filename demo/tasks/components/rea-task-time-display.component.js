import { Component } from "../../../index.js";
import { setTime } from "../store/rea-task.actions.js";
import { getTime } from "../store/rea-task.selectors.js";

export class ReaTaskTimeDisplayComponent extends Component {
    #intervalID;

    constructor() {
        super({
            selectors: {
                time: getTime
            }
        });
    }

    render({ time }) {
        return /*html*/`
            <span>${this.formatDate(new Date(time))}</span>
        `;
    }

    onConnect() {
        this.#intervalID = setInterval(
            () => this.store.dispatch(setTime(new Date().getTime())),
            1000
        );
    }

    onDisconnect() {
        clearInterval(this.#intervalID);
    }

    formatDate(date) {
        const padLeft = number => `${number}`.padStart(2, "0");
    
        const formattedString =
            `${padLeft(date.getHours())}:` +
            `${padLeft(date.getMinutes())}:` +
            `${padLeft(date.getSeconds())} ` +
            `${padLeft(date.getDate())}.` +
            `${padLeft(date.getMonth() + 1)}.` +
            `${padLeft(date.getFullYear())}`;
    
        return formattedString;
    }
}

Component.define("rea-task-time-display", ReaTaskTimeDisplayComponent);
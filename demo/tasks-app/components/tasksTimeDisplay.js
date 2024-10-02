import { Component } from "@kompanie/reagenz";
import { setTime } from "../store/tasks.actions.js";
import { getTime } from "../store/tasks.selectors.js";

export class TasksTimeDisplay extends Component {
    #intervalID;

    constructor() {
        super({
            time: getTime
        });
    }

    render({ time }) {
        return /*html*/`
            <span>${this.formatDate(new Date(time))}</span>
        `;
    }

    onConnect() {
        this.#intervalID = setInterval(
            () => this.dispatch(setTime(new Date().getTime())),
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

Component.define("tasks-time-display", TasksTimeDisplay);
import { Component, forEach } from "@kompanie/reagenz";
import { addTask, saveEntriesRequest } from "../store/tasks.actions.js";
import { getIsLoading, searchEntries } from "../store/tasks.selectors.js";

export class TasksTaskList extends Component {
    constructor() {
        super({
            selectors: {
                isLoading: getIsLoading,
                entries: searchEntries
            }
        });
    }

    render({ entries, isLoading }) {
        return isLoading ?
            /*html*/`<loading-icon></loading-icon>` : "" +
            forEach(entries, entry =>
                /*html*/`<tasks-task-item done="${entry.done}" task-id="${entry.id}">${entry.text}</tasks-task-item>`
            ) +
            /*html*/`<div class="margin-top-small">
                <input type="text" class="input" $keydown="keydownTaskInputEvent" maxlength="25" ${ isLoading ? "disabled": "" } placeholder="Text" value="" autofocus>
                <button class="button" $click="clickAddTaskEvent" ${ isLoading ? "disabled": "" }>Add</button>
            </div>`;
    }

    clickAddTaskEvent() {
        const taskId = crypto.randomUUID();
        const taskText = this.querySelector("input[type=text]").value.trim();

        if (taskText === "") {
            return;
        }

        this.dispatch(addTask(taskId, taskText));
        this.dispatch(saveEntriesRequest());

        this.querySelector("input[type=text]").value = "";
        this.querySelector("input[type=text]").focus();
    }

    keydownTaskInputEvent(event) {
        if (event.key === "Enter") {
            this.clickAddTaskEvent();
        }
    }
}

Component.define("tasks-task-list", TasksTaskList);
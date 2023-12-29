import { Component, forEach } from "../../../index.js";
import { addTask, saveEntriesRequest } from "../store/rea-task.actions.js";
import { getIsLoading, searchEntries } from "../store/rea-task.selectors.js";

export class ReaTaskTaskListComponent extends Component {
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
                /*html*/`<rea-task-task-item done="${entry.done}" task-id="${entry.id}">${entry.text}</rea-task-task-item>`
            ) +
            /*html*/`<div class="margin-top-small">
                <input type="text" class="input" $keydown="keydownTaskInputEvent" $blur="blurTaskInputEvent" maxlength="25" ${ isLoading ? "disabled": "" } placeholder="Text" value="" autofocus>
                <button class="button" $click="clickAddTaskEvent" ${ isLoading ? "disabled": "" }>Add</button>
            </div>`;
    }

    blurTaskInputEvent() {
        this.querySelector("input[type=text]").focus();
    }

    clickAddTaskEvent() {
        const taskId = crypto.randomUUID();
        const taskText = this.querySelector("input[type=text]").value.trim();

        if (taskText === "") {
            return;
        }

        this.store.dispatch(addTask(taskId, taskText));
        this.store.dispatch(saveEntriesRequest());

        this.querySelector("input[type=text]").focus();
    }

    keydownTaskInputEvent(event) {
        if (event.key === "Enter") {
            this.clickAddTaskEvent();
        }
    }
}
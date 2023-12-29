import { Component } from "../../../index.js";
import { removeTask, saveEntriesRequest, updateTask } from "../store/rea-task.actions.js";

export class ReaTaskTaskItemComponent extends Component {
    render() {
        const id = this.getAttribute("task-id");
        const isDone = this.getBoolAttribute("done");

        return /*html*/`
            <div>
                <input type="checkbox" $click="clickDoneCheckboxEvent" ${ isDone ? "checked" : "" }>
                <span>${this.innerHTML}</span>
                <button class="margin-left-xsmall task-item-button" $click="clickRemoveTaskEvent">❌</button>
                <a href="#/tasks/${id}" class="a margin-left-xsmall task-item-button">ℹ️</a>
            </div>
        `;
    }

    get styles() {
        return /*css*/`
            rea-task-task-item div span {
                display: inline-block;
                width: 170px;
            }

            .task-item-button {
                border: none;
                background: #000;
                border-radius: 50%;
            }
              
            .task-item-button:hover {
                background: #ccc;
            }
        `;
    }

    clickDoneCheckboxEvent() {
        const id = this.getAttribute("task-id");
        const done = this.querySelector("input").checked;
        const text = this.querySelector("span").textContent;

        this.store.dispatch(updateTask(id, done, text));
        this.store.dispatch(saveEntriesRequest());
    }

    clickRemoveTaskEvent() {
        const id = this.getAttribute("task-id");

        this.store.dispatch(removeTask(id));
        this.store.dispatch(saveEntriesRequest());
    }
}
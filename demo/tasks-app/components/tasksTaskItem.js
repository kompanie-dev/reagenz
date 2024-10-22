import { Component } from "@kompanie/reagenz";
import { removeTask, saveEntriesRequest, updateTaskDone } from "../store/tasks.actions.js";

export class TasksTaskItem extends Component {
	render() {
		const id = this.getAttribute("task-id");
		const isDone = this.getBooleanAttribute("done");

		return /*html*/`
            <div>
                <input type="checkbox" $click="clickDoneCheckboxEvent" ${isDone ? "checked" : ""}>
                <span>${this.innerHTML}</span>
                <button class="margin-left-xsmall task-item-button" $click="clickRemoveTaskEvent">❌</button>
                <a href="#/tasks/${id}" class="a margin-left-xsmall task-item-button">ℹ️</a>
            </div>
        `;
	}

	styles = /*css*/`
		tasks-task-item div span {
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

	clickDoneCheckboxEvent() {
		const id = this.getAttribute("task-id");
		const done = this.querySelector("input").checked;

		this.dispatch(updateTaskDone(id, done));
		this.dispatch(saveEntriesRequest());
	}

	clickRemoveTaskEvent() {
		const id = this.getAttribute("task-id");

		this.dispatch(removeTask(id));
		this.dispatch(saveEntriesRequest());
	}
}

customElements.define("tasks-task-item", TasksTaskItem);

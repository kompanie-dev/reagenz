import { Component } from "@kompanie/reagenz";
import { removeTask, saveEntriesRequest, updateTaskDone } from "../store/tasks.actions.js";

export class TasksTaskItem extends Component {
	attributeTypes = {
		taskId: String,
		done: Boolean
	};

	styles = /*css*/`
		tasks-task-item {
			span {
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
		}
	`;

	render() {
		const { taskId, done } = this.attributeData;

		return /*html*/`
			<div>
				<input type="checkbox" $click="clickDoneCheckboxEvent" ${done ? "checked" : ""}>
				<span>${this.innerHTML}</span>
				<button class="margin-left-xsmall task-item-button" $click="clickRemoveTaskEvent">❌</button>
				<a href="#/tasks/${taskId}" class="a margin-left-xsmall task-item-button">ℹ️</a>
			</div>
		`;
	}

	clickDoneCheckboxEvent() {
		const { taskId } = this.attributeData;
		const done = this.querySelector("input").checked;

		this.dispatch(updateTaskDone(taskId, done));
		this.dispatch(saveEntriesRequest());
	}

	clickRemoveTaskEvent() {
		const { taskId } = this.attributeData;

		this.dispatch(removeTask(taskId));
		this.dispatch(saveEntriesRequest());
	}
}

customElements.define("tasks-task-item", TasksTaskItem);

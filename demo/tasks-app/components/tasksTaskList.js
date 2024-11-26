import { Component } from "@kompanie/reagenz";
import { addTask, saveEntriesRequest } from "../store/tasks.actions.js";
import { getIsLoading, searchEntries } from "../store/tasks.selectors.js";

export class TasksTaskList extends Component {
	selectors = {
		entries: searchEntries,
		isLoading: getIsLoading
	};

	render() {
		const { entries, isLoading } = this.selectorData;

		return /*html*/`
			<x-if condition="${isLoading === true}">
				<loading-icon></loading-icon>
			</x-if>

			<x-for array='${JSON.stringify(entries)}'>
				<tasks-task-item done="@item(done)" taskId="@item(id)">@item(text)</tasks-task-item>
			</x-for>

			<div class="margin-top-small">
				<input type="text" class="input" $keydown="keydownTaskInputEvent" maxlength="25" ${isLoading ? "disabled" : ""} placeholder="Text" value="" autofocus>
				<button class="button" $click="clickAddTaskEvent" ${isLoading ? "disabled" : ""}>Add</button>
			</div>
		`;
	}

	clickAddTaskEvent() {
		/** @type {HTMLInputElement} */
		const oldTextInput = this.querySelector("input[type=text]");
		const taskText = oldTextInput.value.trim();
		const taskId = crypto.randomUUID();

		if (taskText === "") {
			return;
		}

		this.dispatch(addTask(taskId, taskText));
		this.dispatch(saveEntriesRequest());

		/** @type {HTMLInputElement} */
		const newTextInput = this.querySelector("input[type=text]");
		newTextInput.value = "";
		newTextInput.focus();
	}

	keydownTaskInputEvent(event) {
		if (event.key === "Enter") {
			this.clickAddTaskEvent();
		}
	}
}

customElements.define("tasks-task-list", TasksTaskList);

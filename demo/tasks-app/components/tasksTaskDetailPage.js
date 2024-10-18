import { Component } from "@kompanie/reagenz";
import { getSelectedEntryData, getSelectedEntryId } from "../store/tasks.selectors.js";

export class TasksTaskDetailPage extends Component {
	constructor() {
		super([getSelectedEntryData, getSelectedEntryId]);
	}

	render([selectedEntryData, selectedEntryId]) {
		if (selectedEntryData === undefined) {
			return /*html*/`
                <h1>Loading details for Task ID ${selectedEntryId}</h1>
                <loading-icon></loading-icon>`;
		}

		return /*html*/`
            <h1>Task Details</h1>
            <div>
                <h2>ID</h2>
                <div>${selectedEntryId}</div>

                <h2>Text</h2>
                <div>${selectedEntryData.text}</div>

                <h2>Done</h2>
                <div>${selectedEntryData.done}</div>

                <div class="margin-top-small">
                    <a href="#" class="a button">Back to the task list</a>
                </div>
            </div>`;
	}
}

Component.define("tasks-task-detail-page", TasksTaskDetailPage);

import { Component, Modal } from "@kompanie/reagenz";
import { TasksAboutDialog } from "./tasksAboutDialog.js";

export class TasksAboutPage extends Component {
	render() {
		return /*html*/`
			<h1>About Tasks Demo App</h1>

			<div $click="notExistingClickFunction">
				Welcome to the simple Tasks App!
			</div>

			<div class="margin-top-small">
				<button $click="showRequiredDialog" class="button">Show Required About Dialog</button>
				<button $click="showNotRequiredDialog" class="button">Show Not Required About Dialog</button>

				<a href="#" class="a button">Back to home</a>
			</div>`;
	}

	showNotRequiredDialog() {
		const { logger } = this.dependencies;

		Modal.show(TasksAboutDialog, (result) => {
			logger.log("Modal Result", result);
		}, true);
	}

	showRequiredDialog() {
		const { logger } = this.dependencies;

		Modal.show(TasksAboutDialog, (result) => {
			logger.log("Modal Result", result);
		}, false);
	}
}

customElements.define("tasks-about-page", TasksAboutPage);

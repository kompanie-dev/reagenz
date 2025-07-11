import { Component, Modal } from "@kompanie/reagenz";
import { TasksAboutDialog } from "./tasksAboutDialog.js";

export class TasksAboutPage extends Component {
	render() {
		return /*html*/`
			<h1>About</h1>

			<div>
				Welcome to the Reagenz demo app!
			</div>

			<div class="margin-top-small">
				<button $click="showAboutDialog" class="button">Show About Dialog</button>

				<a href="#" class="a button">Back to home</a>
			</div>`;
	}

	showAboutDialog() {
		const { logger } = this.dependencies;
		const isClosable = true;

		const closeFunction = Modal.show(TasksAboutDialog, (result) => {
			logger.log("Modal Result", result);
		}, isClosable);

		logger.log("If you call this function, the modal gets closed", closeFunction);
	}
}

customElements.define("tasks-about-page", TasksAboutPage);

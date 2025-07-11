import { Component } from "@kompanie/reagenz";

export class TasksAboutDialog extends Component {
	header = "About";

	render() {
		return /*html*/`
            <div>This app was made with ❤️ and Reagenz!</div>

            <div class="margin-top-small">
                <button type="submit" value="submit" class="button">OK</button>
            </div>`;
	}
}

customElements.define("tasks-about-dialog", TasksAboutDialog);

import { Component } from "@kompanie/reagenz";
import { loadEntriesRequest, updateRoute } from "../store/tasks.actions.js";
import { getRoute } from "../store/tasks.selectors.js";

export class TasksMain extends Component {
	selectors = { route: getRoute };

	render() {
		const { route } = this.selectorData;

		switch (route) {
			case "#/about":
				return /*html*/`<tasks-about-page></tasks-about-page>`;

			
			default:
			case "#/tasks":
				return /*html*/`<tasks-task-list-page></tasks-task-list-page>`;
		}
	}

	onConnect() {
		if (location.hash === "") {
			location.hash = "#/";
		}

		window.addEventListener(
			"popstate",
			() => this.dispatch(updateRoute(location.hash))
		);

		this.dispatch(loadEntriesRequest());
		this.dispatch(updateRoute(location.hash));
	}
}

customElements.define("tasks-main", TasksMain);

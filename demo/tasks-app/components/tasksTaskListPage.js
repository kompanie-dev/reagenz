import { Component } from "@kompanie/reagenz";

export class TasksTaskListPage extends Component {
    render() {
        return /*html*/`
            <div class="text-align-center">
				<h1>Tasks</h1>

				<tasks-time-display></tasks-time-display>

				<a href="#/about" class="a">ℹ️</a>

				<div class="margin-top-small">
					<tasks-search-bar></tasks-search-bar>
				</div>
            </div>
            
            <div class="margin-top-small">
                <tasks-task-list></tasks-task-list>
            </div>`;
    }
}

customElements.define("tasks-task-list-page", TasksTaskListPage);

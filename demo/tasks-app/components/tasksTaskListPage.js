import { Component } from "../../../index.js";

export class TasksTaskListPage extends Component {
    render() {
        return /*html*/`
            <div class="width-100">
                <tasks-search-bar class="width-100"></tasks-search-bar>

                <tasks-time-display></tasks-time-display>

                <a href="#/about" class="a">ℹ️</a>
            </div>

            <hr/>
            
            <h1>Tasks App</h1>
            <tasks-task-list></tasks-task-list>`;
    }
}

Component.define("tasks-task-list-page", TasksTaskListPage);
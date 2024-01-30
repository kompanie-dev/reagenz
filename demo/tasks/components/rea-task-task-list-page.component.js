import { Component } from "../../../index.js";

export class ReaTaskTaskListPageComponent extends Component {
    render() {
        return /*html*/`
            <div class="width-100">
                <rea-task-search-bar class="width-100"></rea-task-search-bar>

                <rea-task-time-display></rea-task-time-display>

                <a href="/#/about" class="a">ℹ️</a>
            </div>

            <hr/>
            
            <h1>Tasks App</h1>
            <rea-task-task-list></rea-task-task-list>`;
    }
}

Component.define("rea-task-task-list-page", ReaTaskTaskListPageComponent);
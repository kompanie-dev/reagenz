import { Component } from "@kompanie/reagenz";
import { loadEntriesRequest, updateRoute } from "../store/tasks.actions.js";
import { getRoute } from "../store/tasks.selectors.js";

export class TasksMain extends Component {
    constructor() {
        super({
            route: getRoute
        });
    }

    render({ route }) {
        if (route === "" || route === "#/") {
            return /*html*/`<tasks-task-list-page></tasks-task-list-page>`;
        }

        if (route === "#/about") {
            return /*html*/`<tasks-about-page></tasks-about-page>`;
        }

        if (route.startsWith("#/tasks/") === true) {
            const taskId = route.replace("#/tasks/", "");

            return /*html*/`<tasks-task-detail-page task-id="${taskId}"></tasks-task-detail-page>`;
        }

        return /*html*/`<h1>Not Found</h1>`;
    }

    onConnect() {
        this.dispatch(loadEntriesRequest());
        this.dispatch(updateRoute(location.hash));
    }
}

Component.define("tasks-main", TasksMain);
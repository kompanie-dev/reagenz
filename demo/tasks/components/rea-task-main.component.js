import { Component } from "../../../index.js";
import { loadEntriesRequest, updateRoute } from "../store/rea-task.actions.js";
import { getRoute } from "../store/rea-task.selectors.js";

export class ReaTaskMainComponent extends Component {
    constructor() {
        super({
            selectors: {
                route: getRoute
            }
        });
    }

    render({ route }) {
        if (route === "" || route === "#/") {
            return /*html*/`<rea-task-task-list-page></rea-task-task-list-page>`;
        }

        if (route === "#/about") {
            return /*html*/`<rea-task-about-page></rea-task-about-page>`;
        }

        if (route.startsWith("#/tasks/") === true) {
            const taskId = route.replace("#/tasks/", "");

            return /*html*/`<rea-task-task-detail-page task-id="${taskId}"></rea-task-task-detail-page>`;
        }

        return /*html*/`<h1>Not Found</h1>`;
    }

    onConnect() {
        this.store.dispatch(loadEntriesRequest());
        this.store.dispatch(updateRoute(location.hash));
    }
}
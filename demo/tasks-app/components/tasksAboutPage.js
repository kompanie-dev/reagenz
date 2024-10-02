import { Component, Dialog } from "@kompanie/reagenz";
import { TasksAboutDialog } from "./tasksAboutDialog.js";

export class TasksAboutPage extends Component {
    #logger = this.dependencies.logger;

    constructor() {
        super();

        this.dependencies.notExistingDependency;
    }

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
        const dialog = new Dialog(TasksAboutDialog);

        dialog.show((result) => {
            this.#logger.log("Dialog Result", result);
        }, true);
    }

    showRequiredDialog() {
        const dialog = new Dialog(TasksAboutDialog);

        dialog.show((result) => {
            this.#logger.log("Dialog Result", result);
        }, false);
    }
}

Component.define("tasks-about-page", TasksAboutPage);
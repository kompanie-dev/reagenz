import { Component, Dialog } from "@kompanie/reagenz";
import { TasksAboutDialog } from "./tasksAboutDialog.js";

export class TasksAboutPage extends Component {
    #logger = this.dependencies.notExistingDependency;

    render() {
        return /*html*/`
            <h1>About Tasks Demo App</h1>

            <div $click="notExistingClickFunction">
                Welcome to the simple Tasks App!
            </div>

            <div class="margin-top-small">
                <button $click="showDialog" class="button">Show Example About Dialog</button>
                <a href="#" class="a button">Back to home</a>
            </div>`;
    }

    showDialog() {
        const dialog = new Dialog(TasksAboutDialog);

        dialog.show((result) => {
            console.log("Dialog Result", result);
        });
    }
}

Component.define("tasks-about-page", TasksAboutPage);
import { Component } from "@kompanie/reagenz";

export class TasksAboutPage extends Component {
    #logger = this.dependencies.notExistingDependency;

    render() {
        return /*html*/`
            <h1>About Tasks Demo App</h1>
            <div $click="notExistingClickFunction">
                Welcome to the simple Tasks App!
            </div>
            <div class="margin-top-small">
                <a href="#" class="a button">Back to home</a>
            </div>`;
    }
}

Component.define("tasks-about-page", TasksAboutPage);
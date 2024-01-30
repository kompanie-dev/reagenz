import { Component } from "../../../index.js";

export class ReaTaskAboutPageComponent extends Component {
    #logger = this.dependencies.notExistingDependency;

    render() {
        return /*html*/`
            <h1>About My Tasks App</h1>
            <div $click="notExistingClickFunction">
                Welcome to the simple Tasks App!
            </div>
            <div class="margin-top-small">
                <a href="/#" class="a button">Back to home</a>
            </div>`;
    }
}

Component.define("rea-task-about-page", ReaTaskAboutPageComponent);
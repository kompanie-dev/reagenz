import { Component } from "../../../index.js";

export class ReaTaskAboutPageComponent extends Component {
    #logger = this.dependencies.logger;

    render() {
        return /*html*/`
            <h1>About My Tasks App</h1>
            <div>
                Welcome to the simple Tasks App!
            </div>
            <div class="margin-top-small">
                <a href="/#" class="a button">Back to home</a>
            </div>`;
    }

    $click() {
        this.#logger.log('Easter Egg 🥚');
    }
}
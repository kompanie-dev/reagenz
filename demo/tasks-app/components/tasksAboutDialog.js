import { Component } from "@kompanie/reagenz";

export class TasksAboutDialog extends Component {
    render() {
        // tasks-dialog-wrapper contains the form that gets submitted, the close button and stylings

        return /*html*/`
            <tasks-dialog-wrapper dialog-title="About this app">
                <div>This app was made with ❤️ and Reagenz!</div>

                <input type="text" name="my-input" value="My value" class="input">

                <button type="submit" value="ok" class="button margin-top-small" autofocus>OK</button>
            </tasks-dialog-wrapper>`;
    }
}

Component.define("tasks-about-dialog", TasksAboutDialog);
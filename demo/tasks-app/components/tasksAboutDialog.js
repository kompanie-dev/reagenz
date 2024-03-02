import { Component } from "@kompanie/reagenz";

export class TasksAboutDialog extends Component {
    render() {
        return /*html*/`
            <template dialog-part="title">About Reagenz</template>

            <div>This app was made with ❤️ and Reagenz!</div>

            <input type="text" name="my-input" maxlength="2" value="My value" class="input">

            <button type="submit" value="ok" class="button margin-top-small" autofocus>OK</button>`;
    }
}

Component.define("tasks-about-dialog", TasksAboutDialog);
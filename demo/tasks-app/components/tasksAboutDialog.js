import { Component } from "@kompanie/reagenz";

export class TasksAboutDialog extends Component {
    render() {
        return /*html*/`
            <template dialog-part="title">About Reagenz</template>

            <div>This app was made with ❤️ and Reagenz!</div>
            <div class="margin-top-small">The following input should have 3-5 characters:</div>

            <div class="margin-top-small">
                <input type="text" name="username" class="input" minlength="3" maxlength="5" value="test">

                <button type="submit" value="submit" class="button">OK</button>
                <button type="button" class="button" $click="resetInput">Reset</button>
            </div>`;
    }

    resetInput() {
        this.querySelector("[name='username']").value = "test";
    }
}

Component.define("tasks-about-dialog", TasksAboutDialog);
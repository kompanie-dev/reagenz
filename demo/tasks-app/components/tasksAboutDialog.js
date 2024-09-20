import { Component } from "@kompanie/reagenz";

export class TasksAboutDialog extends Component {
    render() {
        return /*html*/`
            <template dialog-part="title">About Reagenz</template>

            <div>This app was made with ❤️ and Reagenz!</div>
            <div class="margin-top-small">The following input should have 3-5 characters and start with R:</div>

            <div class="margin-top-small">
                <input type="text" name="username" class="input" minlength="3" maxlength="5" value="Rtest">

                <button type="submit" value="submit" class="button">OK</button>
                <button type="button" class="button" $click="resetInput">Reset</button>
            </div>`;
    }

    resetInput() {
        this.querySelector("[name='username']").value = "Rtest";
    }

    validate() {
        return this.querySelector("[name='username']").value.startsWith("R");
    }
}

Component.define("tasks-about-dialog", TasksAboutDialog);
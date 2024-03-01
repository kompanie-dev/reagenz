import { Component } from "@kompanie/reagenz";

export class TasksDialogWrapper extends Component {
    render() {
        return /*html*/`
            <form method="dialog">
                <b>
                    <button type="submit" value="cancel" class="dialog-button">✖</button>
                    ${this.getAttribute("dialog-title") ?? ""}
                </b>
                <div class="margin-top-small">
                    ${this.innerHTML}
                </div>
            </form>`;
    }
}

Component.define("tasks-dialog-wrapper", TasksDialogWrapper);
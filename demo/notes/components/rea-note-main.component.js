import { Component } from "../../../index.js";
import { getNotes } from "../store/rea-note.selector.js";
import { loadNotesRequest, saveNotesRequest } from "../store/rea-note.actions.js";

export class ReaNoteMainComponent extends Component {
    constructor() {
        super({
            selectors: {
                notes: getNotes
            }
        });
    }

    render({ notes }) {
        return /*html*/`
            <div class="padding-right-xsmall">
                <h1>Notes App</h1>
                <textarea class="textarea width-100" $input="inputNotesValueEvent" rows="32">${notes}</textarea>
                <example-web-component></example-web-component>
            </div>
        `;
    }

    inputNotesValueEvent(event) {
        this.store.dispatch(saveNotesRequest(event.target.value));
    }

    onConnect() {
        this.store.dispatch(loadNotesRequest());
    }
}
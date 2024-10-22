import { Component } from "@kompanie/reagenz";
import { getNotes } from "../store/notes.selector.js";
import { loadNotesRequest, saveNotesRequest } from "../store/notes.actions.js";

export class NotesMain extends Component {
	constructor() {
		super([getNotes]);
	}

	render([notes]) {
		return /*html*/`
            <div class="padding-right-xsmall">
                <h1>Notes App</h1>
                <textarea class="textarea width-100" $input="inputNotesValueEvent" rows="32">${notes}</textarea>
                <example-web-component></example-web-component>
            </div>
        `;
	}

	inputNotesValueEvent(event) {
		this.dispatch(saveNotesRequest(event.target.value));
	}

	onConnect() {
		this.dispatch(loadNotesRequest());
	}
}

customElements.define("notes-main", NotesMain);

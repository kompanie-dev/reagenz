import { Component } from "../../../index.js";
import { setSearchValue } from "../store/rea-task.actions.js";

export class ReaTaskSearchBarComponent extends Component {
    render() {
        return /*html*/`
            <input type="text" class="input" $input="inputSearchValueEvent" placeholder="Search...">
        `;
    }

    inputSearchValueEvent(event) {
        this.store.dispatch(setSearchValue(event.target.value));
    }
}
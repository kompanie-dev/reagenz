import { Component } from "@kompanie/reagenz";
import { setSearchValue } from "../store/tasks.actions.js";

export class TasksSearchBar extends Component {
    render() {
        return /*html*/`
            <input type="text" class="input" $input="inputSearchValueEvent" placeholder="Search...">
        `;
    }

    inputSearchValueEvent(event) {
        this.dispatch(setSearchValue(event.target.value));
    }
}

Component.define("tasks-search-bar", TasksSearchBar);
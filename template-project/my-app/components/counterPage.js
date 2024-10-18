import { Component } from "@kompanie/reagenz";
import { getCount } from "../store/myapp.selector.js";
import { increaseCounter, loadCountRequest, saveCountRequest } from "../store/myapp.actions.js";

export class CounterPage extends Component {
	constructor() {
		super([getCount]);
	}

	render([count]) {
		return /*html*/`
            <div>
                <h1>Welcome to my Counter App!</h1>
                <div>
                    ${count}
                </div>
                <button $click="increaseCounter">+</button>
                <button $click="decreaseCounter">-</button>
            </div>
        `;
	}

	increaseCounter() {
		this.dispatch(increaseCounter(1));
		this.dispatch(saveCountRequest());
	}

	decreaseCounter() {
		this.dispatch(increaseCounter(-1));
		this.dispatch(saveCountRequest());
	}

	onConnect() {
		this.dispatch(loadCountRequest());
	}
}

Component.define("counter-page", CounterPage);

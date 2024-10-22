import { Component } from "@kompanie/reagenz";
import { getRoute } from "../store/myapp.selector.js";
import { loadCountRequest, updateRoute } from "../store/myapp.actions.js";

export class AppRoot extends Component {
	constructor() {
		this.dispatch(loadCountRequest());
	}

	selectors = [getRoute];

	render([route]) {
		return /*html*/`
            <div>
                <div>
                    <a href="#!about">About</a>
                    <a href="">Counter</a>
                </div>

                <x-if condition="${route === "#!about"}">
                    <about-page></about-page>
                </x-if>

                <x-if condition="${route === ""}">
                    <counter-page></counter-page>
                </x-if>
            </div>
        `;
	}

	onConnect() {
		window.addEventListener("popstate", () => {
			this.dispatch(updateRoute(location.hash));
		});
	}
}

customElements.define("app-root", AppRoot);

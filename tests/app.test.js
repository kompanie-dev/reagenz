import { Assert } from "../node_modules/@kompanie/assert/index.js";
import { App, Component } from "../index.js";

class MainComponent extends Component {
	render() {
		return `<div id="appTestContent">Test Content</div>`;
	}
}

export class AppTests {
	afterAll() {
		document.querySelector("main-component").remove();
	}

	start_shouldSetupTheApp() {
		customElements.define("main-component", MainComponent);

		App.start({
			mainComponent: MainComponent,
			container: document.body,
			components: [MainComponent],
			dependencies: {}
		});

		const mainComponent = document.querySelector("main-component");
		const appTestContent = document.body.querySelector("#appTestContent");

		Assert.isNotUndefinedOrNull(document.body.getAttribute("framework"));
		Assert.include(mainComponent.innerHTML, "<div id=\"appTestContent\">Test Content</div>");
		Assert.isNotUndefinedOrNull(appTestContent);
	}
}

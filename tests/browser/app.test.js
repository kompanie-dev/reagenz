import { assert, expect, describe, it } from "vitest";
import { App } from "../../source/app.js";
import { Component } from "../../source/component.js";

class MainComponent extends Component {
	render() {
		return `<div>Test Content</div>`;
	}
}

customElements.define("main-component", MainComponent);

describe("App", () => {
	it("start() should set up the app correctly", () => {
		App.start({
			mainComponent: MainComponent,
			container: document.body,
			components: [MainComponent],
			dependencies: {}
		});

		const mainComponent = document.querySelector("main-component");

		expect(document.body).toHaveAttribute("framework");
		expect(mainComponent)
			.toContainHTML("<div>Test Content</div>")
			.toBeInTheDocument();
	});
});

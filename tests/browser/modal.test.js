import { expect, describe, it } from "vitest";
import { Component } from "../../source/component.js";
import { Modal } from "../../source/modal.js";

class TestDialog extends Component {
	header = "My test header";

	render() {
		return `<div>Test content</div>`;
	}
}

customElements.define("test-dialog", TestDialog);

describe("Modal", () => {
	it("Should show the dialog", () => {
		Modal.show(TestDialog, () => {}, true);
		const element = document.body.querySelector("dialog");

		expect(element)
			.toBeInTheDocument()
			.toContainHTML("My test header")
			.toContainHTML("<div>Test content</div>");
	});
});

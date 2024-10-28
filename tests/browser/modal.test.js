import { expect, describe, it } from "vitest";
import { Component } from "../../source/component.js";
import { Modal } from "../../source/modal.js";

class TestDialog extends Component {
	header = "My test header";

	render() {
		return /*html*/`<div>Test content</div>`;
	}
}

customElements.define("test-dialog", TestDialog);

describe("Modal", () => {
	it("show() with isClosable=true should show the dialog with close button", () => {
		Modal.show(TestDialog, () => {}, true);
		const element = document.body.querySelector("dialog");

		expect(element)
			.toBeInTheDocument()
			.toContainHTML(`<button type="submit" value="cancel" class="reagenz-dialog-close-button"`)
			.toContainHTML("My test header")
			.toContainHTML("<div>Test content</div>");
	});
});

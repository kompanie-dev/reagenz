import { Assert } from "../node_modules/@kompanie/assert/index.js";
import { Component } from "../source/component.js";
import { Modal } from "../source/modal.js";

class TestDialog extends Component {
	header = "My test header";

	render() {
		return /*html*/`<div>Test content</div>`;
	}
}

customElements.define("test-dialog", TestDialog);

export class ModalTests {
	afterEach() {
		document.body.querySelector("dialog").remove();
	}

	showWithIsClosableIsFalse_shouldShowModalWithoutCloseButton() {
		Modal.show(TestDialog, () => {}, false);
		const dialogElement = document.body.querySelector("dialog");
		const dialogCloseButton = document.body.querySelector(".reagenz-dialog-close-button");

		Assert.isNotUndefinedOrNull(dialogElement);
		Assert.isUndefinedOrNull(dialogCloseButton);
	}

	showWithIsClosableIsTrue_shouldShowModalWithCloseButton() {
		Modal.show(TestDialog, () => {}, true);
		const dialogElement = document.body.querySelector("dialog");
		const dialogCloseButton = document.body.querySelector(".reagenz-dialog-close-button");

		Assert.isNotUndefinedOrNull(dialogElement);
		Assert.isNotUndefinedOrNull(dialogCloseButton);
	}
}
/**
 * This class is used for creating and showing modals using the HTML <dialog> element.
 */
export class Dialog {
	#dialogElement;

	/**
	 * Closes the dialog.
	 *
	 * @param {?string} returnValue The return value of the dialog. "cancel" by default.
	 *
	 * @returns {void}
	 */
	close(returnValue = "cancel") {
		this.#dialogElement.close(returnValue);
	}

	/**
	 * Opens the dialog using an HTML <dialog> element and executes the given callback when the dialog closes.
	 *
	 * @param {CustomElementConstructor} dialogComponentClass A Reagenz or web component which contains the content of the modal.
	 * @param {Function} callback The function which should get executed when the dialog closes.
	 * @param {?boolean} isClosable If true, the dialog can be closed by clicking the backdrop or close button. Enabled by default.
	 *
	 * @returns {void}
	 */
	show(dialogComponentClass, callback, isClosable = true) {
		const dialogComponentInstance = new dialogComponentClass();

		document.body.insertAdjacentHTML("beforeend", /*html*/`
			<dialog class="reagenz-dialog">
				<form method="dialog">
					<div class="reagenz-dialog-header">
						${isClosable ? /*html*/`<button type="submit" value="cancel" class="reagenz-dialog-close-button">✖</button>` : ""}
						<span class="reagenz-dialog-title">${dialogComponentInstance.header}</span>
					</div>

					<div class="reagenz-dialog-content"></div>
				</form>
			</dialog>`);

		this.#dialogElement = document.querySelector("dialog");

		this.#dialogElement
			.querySelector(".reagenz-dialog-content")
			.append(dialogComponentInstance);

		this.#addEventHandlers(this.#dialogElement, isClosable, callback, dialogComponentInstance);

		this.#dialogElement.showModal();
	}

	/**
	 * Adds event handlers for click, close, keydown and submit events.
	 *
	 * @param {HTMLDialogElement} dialogElement The dialog element which the handlers get attached to.
	 * @param {boolean} isClosable true, if the dialog can be cancelled, otherwise false.
	 * @param {?Function} callback The function which should be called when the dialog closes.
	 * @param {HTMLElement} dialogComponentInstance The instance of the Reagenz component which represents the content of the dialog.
	 *
	 * @returns {void}
	 */
	#addEventHandlers(dialogElement, isClosable, callback, dialogComponentInstance) {
		dialogElement.addEventListener("click", (event) => {
			if (isClosable && (event.target === dialogElement || event.target.value === "cancel")) {
				dialogElement.close("cancel");
			}
		});

		dialogElement.addEventListener("close", (event) => {
			/** @type {HTMLFormElement} */
			const formElement = dialogElement.querySelector("[method='dialog']");

			const formData = new FormData(formElement);

			dialogElement.remove();

			callback?.({
				formData,
				returnValue: event.target.returnValue
			});
		});

		dialogElement.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && isClosable) {
				dialogElement.close("cancel");
			}
			else if (!isClosable) {
				event.preventDefault();
			}
		});

		dialogElement.addEventListener("submit", (event) => {
			if (event.target.returnValue !== "cancel" && dialogComponentInstance.validate?.() === false) {
				event.preventDefault();
			}
		});
	}
}

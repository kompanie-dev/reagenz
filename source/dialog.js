/**
 * This class is used for creating and showing modals using the HTML <dialog> element.
 */
export class Dialog {
	/**
	 * Opens the dialog using an HTML <dialog> element and executes the given callback when the dialog closes.
	 *
	 * @param {CustomElementConstructor} dialogComponentClass A Reagenz or web component which contains the content of the modal.
	 * @param {Function} callback The function which should get executed when the dialog closes.
	 * @param {?boolean} isClosable If true, the dialog can be closed by clicking the backdrop or close button. Enabled by default.
	 *
	 * @returns {Function} A function to close the dialog.
	 */
	static show(dialogComponentClass, callback, isClosable = true) {
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

		const dialogElement = document.body.lastChild;

		dialogElement
			.querySelector(".reagenz-dialog-content")
			.append(dialogComponentInstance);

		this.#addEventHandlers(dialogElement, isClosable, callback, dialogComponentInstance);

		dialogElement.showModal();

		return (returnValue = "cancel") => {
			dialogElement.close(returnValue);
		};
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
	static #addEventHandlers(dialogElement, isClosable, callback, dialogComponentInstance) {
		dialogElement.addEventListener("click", (event) => {
			if (isClosable && (event.target === dialogElement || event.target.value === "cancel")) {
				dialogElement.close("cancel");
			}
		});

		dialogElement.addEventListener("close", (event) => {
			dialogElement.remove();

			callback?.({
				formData: new FormData(dialogElement.firstElementChild),
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

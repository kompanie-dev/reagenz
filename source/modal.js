/**
 * This class is used for creating and showing modals using the HTML <dialog> element.
 */
export class Modal {
	/**
	 * Opens the modal using an HTML <dialog> element and executes the given callback when the modal closes.
	 *
	 * @param {CustomElementConstructor} modalComponentClass A Reagenz or web component which contains the content of the modal.
	 * @param {Function} callback The function which should get executed when the modal closes.
	 * @param {?boolean} isClosable If true, the modal can be closed by clicking the backdrop or close button. Enabled by default.
	 *
	 * @returns {Function} A function to close the modal.
	 */
	static show(modalComponentClass, callback, isClosable = true) {
		const modalComponentInstance = new modalComponentClass();

		document.body.insertAdjacentHTML("beforeend", /*html*/`
			<dialog class="reagenz-dialog">
				<form method="dialog">
					<div class="reagenz-dialog-header">
						${isClosable ? /*html*/`<button type="submit" value="cancel" class="reagenz-dialog-close-button">✖</button>` : ""}
						<span class="reagenz-dialog-title">${modalComponentInstance.header}</span>
					</div>

					<div class="reagenz-dialog-content"></div>
				</form>
			</dialog>`);

		const dialogElement = document.body.lastChild;

		dialogElement
			.querySelector(".reagenz-dialog-content")
			.append(modalComponentInstance);

		this.#addEventHandlers(dialogElement, isClosable, callback, modalComponentInstance);

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
	 * @param {HTMLElement} modalComponentInstance The instance of the Reagenz component which represents the content of the modal.
	 *
	 * @returns {void}
	 */
	static #addEventHandlers(dialogElement, isClosable, callback, modalComponentInstance) {
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
			if (event.target.returnValue !== "cancel" && modalComponentInstance.validate?.() === false) {
				event.preventDefault();
			}
		});
	}
}

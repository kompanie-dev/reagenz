export class Modal {
	static show(modalComponentClass, callback, isClosable = true) {
		const modalComponentInstance = new modalComponentClass();

		document.body.insertAdjacentHTML("beforeend",`
			<dialog class="reagenz-dialog">
				<form method="dialog">
					<div class="reagenz-dialog-header">
						${isClosable ? `<button type="submit" value="cancel" class="reagenz-dialog-close-button">✖</button>` : ""}
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

	static #addEventHandlers(dialogElement, isClosable, callback, modalComponentInstance) {
		dialogElement.addEventListener("click", (event) => {
			if (isClosable === true && (event.target === dialogElement || event.target.value === "cancel")) {
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
			if (event.key === "Escape" && isClosable === true) {
				dialogElement.close("cancel");
			}
			else if (isClosable === false) {
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
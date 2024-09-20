/**
 * This class is used for creating and showing modals using the HTML <dialog> element.
 */
export class Dialog {
    #dialogComponentClass;
    #dialogElement;

    /**
     * Creates a new instance of Dialog.
     * @param {HTMLElement} componentClass A Reagenz or web component which contains the content of the modal.
     */
    constructor(componentClass) {
        this.#dialogComponentClass = componentClass;
    }

    /**
     * Closes the dialog.
     * @param {?string} returnValue The return value of the dialog. "cancel" by default.
     */
    close(returnValue = "cancel") {
        this.#dialogElement.close(returnValue);
    }

    /**
     * Opens the dialog using an HTML <dialog> element and executes the given callback when the dialog closes.
     * @param {Function} callback The function which should get executed when the dialog closes.
     * @param {?boolean} isClosable If true, the dialog can be closed by clicking the backdrop. Enabled by default.
     */
    show(callback, isClosable = true) {
        const dialogComponentInstance = new this.#dialogComponentClass();
        const title = dialogComponentInstance.querySelector("[dialog-part='title']").content.textContent;

        this.#dialogElement = document.createElement('dialog');
        this.#dialogElement.className = "reagenz-dialog";
        this.#dialogElement.innerHTML = /*html*/`
            <form method="dialog">
                <div class="reagenz-dialog-header">
                    ${ isClosable ? /*html*/`<button type='submit' value='cancel' class='reagenz-dialog-close-button'>✖</button>` : "" }
                    <span class="reagenz-dialog-title">${title}</span>
                </div>

                <div class="reagenz-dialog-content"></div>
            </form>`;

        this.#dialogElement
            .querySelector(".reagenz-dialog-content")
            .append(dialogComponentInstance);

        this.#dialogElement.addEventListener("click", (event) => {
            if (isClosable === true && (event.target === this.#dialogElement || event.target.value === "cancel")) {
                this.#dialogElement.close("cancel");
            }
        });

        this.#dialogElement.addEventListener("keydown", (event) => {
            if (event.key !== "Escape") {
                return;
            }

            if (isClosable === true) {
                this.#dialogElement.close("cancel");
            }
            else {
                event.preventDefault();
            }
        });

        this.#dialogElement.addEventListener("close", (event) => {
            const formElement = this.#dialogElement.querySelector("[method='dialog']");
            const formData = formElement === null ? null : new FormData(formElement);

            this.#dialogElement.remove();

            callback?.({
                formData,
                returnValue: event.target.returnValue
            });
        });

        document.body.append(this.#dialogElement);

        this.#dialogElement.showModal();
    }
}
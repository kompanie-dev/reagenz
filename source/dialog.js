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
        if (this.#dialogElement?.open === true) {
            return;
        }

        const dialogComponentInstance = new this.#dialogComponentClass();
        this.#dialogElement = document.createElement("dialog");
        this.#dialogElement.append(dialogComponentInstance);

        if (isClosable === true) {
            this.#dialogElement.addEventListener("click", (event) => {
                if (event.target === this.#dialogElement) {
                    this.#dialogElement.close("cancel");
                }
            });
        }

        this.#dialogElement.addEventListener("close", (event) => {
            this.#dialogElement.remove();

            const formElement = this.#dialogElement.querySelector("[method='dialog']");
            const formData = formElement === null ? null : new FormData(formElement);

            callback?.({
                formData,
                result: event.target.returnValue
            });
        });

        document.body.append(this.#dialogElement);

        this.#dialogElement.showModal();
    }
}
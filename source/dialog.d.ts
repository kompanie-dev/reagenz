/**
 * This class is used for creating and showing modals using the HTML <dialog> element.
 */
export declare class Dialog {
	/**
	 * Closes the dialog.
	 *
	 * @param returnValue The return value of the dialog. "cancel" by default.
	 */
	close(returnValue?: string): void;

	/**
	 * Opens the dialog using an HTML <dialog> element and executes the given callback when the dialog closes.
	 *
	 * @param dialogComponentClass A Reagenz or web component which contains the content of the modal.
	 * @param callback The function which should get executed when the dialog closes.
	 * @param isClosable If true, the dialog can be closed by clicking the backdrop. Enabled by default.
	 */
	show(
		dialogComponentClass: CustomElementConstructor,
		callback: (data: { formData: FormData; returnValue: string }) => void,
		isClosable?: boolean
	): void;
}

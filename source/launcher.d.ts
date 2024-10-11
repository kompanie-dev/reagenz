/**
 * Contains helper functions for starting a Reagenz app.
 */
export declare class Launcher {
	/**
	 * Starts the application by attaching the main component (appComponent) to the specified container element (appContainerElement) and adding a version info to the appComponent.
	 * @param appComponentClass The main/root component of the application.
	 * @param appContainerElement The container element to which the main component gets attached to.
	 */
	static startApp(
		appComponentClass: { new(): HTMLElement },
		appContainerElement: HTMLElement
	): void;
}

import "./ifComponent.js";
import "./forComponent.js";

/**
 * Contains helper functions for starting a Reagenz app.
 */
export class Launcher {
    /**
     * Starts the application by attaching the main component (appComponent) to the specified container element (appContainerElement) and adding a version info to the appComponent.
     * @param {Object} appComponentClass The main/root component of the application.
     * @param {HTMLElement} appContainerElement The container element to which the main component gets attached to.
     */
    static startApp(appComponentClass, appContainerElement) {
        const appComponent = new appComponentClass();
        appComponent.setAttribute("framework", "@kompanie/reagenz@5.1.0");
        appContainerElement.append(appComponent);
    }
}
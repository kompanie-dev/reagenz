/**
 * Contains helper functions for setting up a Reagenz app.
 */
export class Reagenz {
    /**
     * Injects the given dependency object into the prototype of all supplied classes.
     * The dependencies will be available in the class as dependencies property.
     * @param {Object} dependencies An object containing all dependencies that should be available in the classes.
     * @param {Object[]} classes An array of classes in which the dependencies should get injected.
     */
    static injectDependencies(dependencies, classes) {
        classes.forEach(
            receiverClass => Object.assign(receiverClass.prototype.dependencies, dependencies)
        );
    }

    /**
     * Registers web components using an object and skips already registered ones.
     * @param {Object} componentConfig An object containing keys and the component class ({ "test-element": TestElementComponent, ... }).
     */
    static registerWebComponents(componentConfig) {
        Object
            .entries(componentConfig)
            .filter(([tagName]) => customElements.get(tagName) === undefined)
            .forEach(([tagName, componentClass]) => customElements.define(tagName, componentClass));
    }

    /**
     * Starts the application by attaching the main component (appComponent) to the specified container element (appContainerElement) and adding a version info to the appComponent.
     * @param {Object} appComponentClass The main/root component of the application.
     * @param {HTMLElement} appContainerElement The container element to which the main component gets attached to.
     */
    static startApp(appComponentClass, appContainerElement) {
        const appComponent = new appComponentClass();
        appComponent.setAttribute("framework", "@kompanie/reagenz@3.0.0");
        appContainerElement.append(appComponent);
    }
}
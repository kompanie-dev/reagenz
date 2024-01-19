/**
 * Contains helper functions for setting up a Reagenz app.
 */
export class Reagenz {
    /**
     * Takes the name of a component class and converts it to a matching tag name.
     * So for instance MyTestComponent becomes my-test.
     * @param {string} className The name of the component class.
     * @returns The tag name of the component class.
     */
    static classNameToHtmlTag(className) {
        let result = "";

        for (let i = 0; i < className.length; i++) {
            const char = className[i];
        
            if (char === char.toUpperCase() && i > 0) {
                result += "-";
            }
        
            result += char.toLowerCase();
        }

        const lastComponentWordIndex = result.lastIndexOf("-component");

        if (lastComponentWordIndex === -1) {
            return result;
        }
        
        return result.substring(0, lastComponentWordIndex);
    }

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
     * Registers Reagenz components using an object, skipping already registered ones.
     * The tag name of the Component will be generated automatically
     * using the classNameToHtmlTag function of this class.
     * @param {Class[]} reagenzComponents An array containing component classes.
     */
    static registerReagenzComponents(reagenzComponents) {
        for (let componentClass of reagenzComponents) {
            const tagName = Reagenz.classNameToHtmlTag(componentClass.name);

            componentClass.prototype.dependencies = new Proxy({}, {
                get: function(dependencyContainer, propertyName) {
                    if (!(propertyName in dependencyContainer) && propertyName !== "store") {
                        console.warn(`${tagName} is accessing the undefined dependency '${propertyName}'. Did you inject it using Reagenz.injectDependencies()?`);
                    }
    
                    return Reflect.get(...arguments);
                }
            });

            if (customElements.get(tagName) === undefined) {
                customElements.define(tagName, componentClass);
            }
        }
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
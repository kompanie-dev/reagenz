/**
 * A helper class for injecting dependencies into prototypes.
 */
export class Injector {
    /**
     * Injects the given dependency object into the prototype of all supplied classes.
     * The dependencies will be available in the class as dependencies property.
     * @param {Object} dependencies An object containing all dependencies that should be available in the classes.
     * @param {Object[]} classes An array of classes in which the dependencies should get injected.
     */
    static injectDependencies(dependencies, classes) {
        for (let receiverClass of classes) {
            Object.assign(receiverClass.prototype.dependencies, dependencies);
        }
    }
}
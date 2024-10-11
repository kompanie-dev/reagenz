/**
 * A helper class for injecting dependencies into prototypes.
 */
export declare class Injector {
	/**
	 * Injects the given dependency object into the prototype of all supplied classes.
	 * The dependencies will be available in the class as the `dependencies` property.
	 * @param dependencies An object containing all dependencies that should be available in the classes.
	 * @param classes An array of classes in which the dependencies should get injected.
	 */
	static injectDependencies(
		dependencies: { [key: string]: any },
		classes: Array<{ prototype: { dependencies: any } }>
	): void;
}

/**
 * A store, which can dispatch actions, select data from the state and subscribe to changes.
 */
export declare class Store {
	/**
	 * The full state object of the Store.
	 */
	public state: object;

	/**
	 * Creates a new instance of the Store.
	 *
	 * @param reducer A function which updates the state depending on the input state and action.
	 * @param initialState An object defining the initial state of the Store.
	 * @param middlewares An array of functions responsible for handling async logic.
	 */
	constructor(
		reducer: Function,
		initialState: object,
		middlewares?: Function[]
	);

	/**
	 * Dispatches the given action, executes registered middlewares, updates the state and notifies subscribers.
	 *
	 * @param action An Action object, containing a type property and additional data.
	 */
	dispatch(action: { type: string; [key: string]: any }): void;

	/**
	 * Executes all the selector functions contained within the object and returns the result.
	 *
	 * @param selectors An array containing selector functions.
	 *
	 * @returns An array containing the results of the selector function executions.
	 */
	executeSelectors(
		selectorObject: Record<string, Function>
	): Record<string, any>;

	/**
	 * Executes the given selector function against the current state and returns the escaped result.
	 *
	 * @param selector The selector function which should be executed.
	 *
	 * @returns The result of the selector function, with all properties escaped.
	 */
	select(selector: Function): any;

	/**
	 * Executes the given selector function against the current state and returns the unescaped result.
	 *
	 * @param selector The selector function which should be executed.
	 *
	 * @returns The result of the selector function, with all properties unescaped.
	 */
	insecureSelect(selector: Function): any;

	/**
	 * Add the given listener function to the list of subscribers and execute the listener each time an action gets dispatched.
	 *
	 * @param listenerCallback A function which gets called whenever an action is dispatched.
	 *
	 * @returns An unsubscribe function which removes the listener function from the subscribed functions when executed.
	 */
	subscribe(listenerCallback: Function): () => void;
}

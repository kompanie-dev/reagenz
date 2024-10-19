import { HtmlEscaper } from "./htmlEscaper.js";

/**
 * A store, which can dispatch actions, select data from the state and subscribe to changes.
 */
export class Store {
	#listeners = [];
	#middlewares;
	#reducer;

	/**
	 * Creates a new instance of the Store.
	 *
	 * @param {Function} reducer A function which updates the state depending on the input state and action.
	 * @param {Object} initialState An object defining the initial state of the Store.
	 * @param {?Function[]} middlewares An array of functions responsible for handling async logic.
	 */
	constructor(reducer, initialState, middlewares = []) {
		this.state = initialState;
		this.#reducer = reducer;
		this.#middlewares = middlewares;
	}

	/**
	 * Dispatches the given action, executes registered middlewares, updates the state and notifies subscribers.
	 *
	 * @param {{ type: string, [key: string]: * }} action An Action object, containing a type property and additional data.
	 *
	 * @returns {void}
	 */
	dispatch(action) {
		this.#middlewares.reduceRight(
			(next, middleware) => () => middleware(this, next, action),
			() => { this.state = this.#reducer(action, this.state); }
		)();

		this.#listeners.forEach(listener => listener());
	}

	/**
	 * Executes all the selector functions contained within the object and returns the result.
	 *
	 * @param {Function[]} selectors An array containing selector functions.
	 *
	 * @returns {*[]} An array containing the results of the selector function executions.
	 */
	executeSelectors(selectors) {
		return selectors.map((selectorFunction) => this.select(selectorFunction));
	}

	/**
	 * Executes the given selector function against the current state and returns the escaped result.
	 *
	 * @param {Function} selector The selector function which should be executed.
	 *
	 * @returns {*} The result of the selector function, with all properties escaped.
	 */
	select(selector) {
		return HtmlEscaper.escapeObject(selector(this.state));
	}

	/**
	 * Executes the given selector function against the current state and returns the unescaped result.
	 *
	 * @param {Function} selector The selector function which should be executed.
	 *
	 * @returns {*} The result of the selector function, with all properties escaped.
	 */
	insecureSelect(selector) {
		return selector(this.state);
	}

	/**
	 * Add the given listener function to the list of subscribers and execute the listener each time an action is dispatched.
	 *
	 * @param {Function} listenerCallback A function which gets called whenever an action get's dispatched.
	 *
	 * @returns {Function} An unsubscribe function which removes the listener function from the subscribed functions when executed.
	 */
	subscribe(listenerCallback) {
		this.#listeners.push(listenerCallback);

		return () => {
			this.#listeners = this.#listeners.filter(listener => listener !== listenerCallback);
		};
	}
}

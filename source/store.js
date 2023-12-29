/**
 * Represents a store, which can dispatch actions, select data from the state and subscribe to changes.
 */
export class Store {
    #listeners = [];
    #middlewares;
    #reducer;

    /**
     * Creates a new instance of the Store.
     * @param {Function} reducer A function which updates the state depending on the input state and action.  
     * @param {Object} initialState An object defining the initial state of the Store. 
     * @param {Function[]} middlewares An array of functions responsible for handling async logic. 
     */
    constructor(reducer, initialState, middlewares = []) {
        this.state = initialState;
        this.#reducer = reducer;
        this.#middlewares = middlewares;
    }

    /**
     * Dispatches the given action, executes registered middlewares, updates the state and notifies subscribers.
     * @param {Object} action An Action object, containing a type property and additional data.
     */
    dispatch(action) {
        for (let i = 0; i !== this.#middlewares.length; i++) {
            const currentMiddleware = this.#middlewares[i];
            const nextMiddleware = this.#middlewares[i + 1] ?? new Function();

            currentMiddleware(this)(nextMiddleware)(action);
        }

        this.state = this.#reducer(this.state, action);

        this.#listeners.forEach(listener => listener());
    }

    /**
     * Executes the give selector function against the current state and returns the result.
     * @param {Function} selector The selector function which should be executed.
     * @param  {...any} parameters The parameters which should be passed to the selector function.
     * @returns {any} The result of the selector function
     */
    select(selector, ...parameters) {
        return selector(this.state, ...parameters);
    }

    /**
     * Add the given listener function to the list of subscribers and execute the listener each time an action is dispatched.
     * @param {Function} listener A function which gets called whenever an action get's dispatched.
     * @returns {Function} An unsubscribe function which removes the listener function from the subscribed functions when executed.
     */
    subscribe(listener) {
        this.#listeners.push(listener);

        return () => this.#listeners = this.#listeners.filter(l => l !== listener);
    }
}
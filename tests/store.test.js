import { Assert } from "../node_modules/@kompanie/assert/index.js";
import { Store } from "../index.js";

export class StoreTests {
	constructor_shouldAssignTheInitialState() {
		const expectedState = { count: 0, data: "Test" };
		const testReducer = () => { };

		const testStore = new Store(testReducer, expectedState, []);

		Assert.deepEqual(testStore.state, expectedState);
	}

	dispatch_shouldExecuteTheActionAndModifyTheState() {
		const initialState = {
			entries: ["Apple", "Peach"]
		};
		const testReducer = (action, state = initialState) => {
			state.entries = [...state.entries, action.text];

			return state;
		};
		const testStore = new Store(testReducer, initialState, []);
		const expected = ["Apple", "Peach", "Orange"];
		const testAction = { type: "Test", text: "Orange" };

		testStore.dispatch(testAction);

		Assert.deepEqual(testStore.state.entries, expected);
	}

	dispatch_shouldExecuteTheActionAndMiddlewaresAndModifyTheState() {
		const initialState = {
			entries: ["Apple", "Peach"]
		};
		const testReducer = (action, state = initialState) => {
			state.entries = [...state.entries, action.text];

			return state;
		};
		const middlewareA = (store, next) => {
			// Never directly modify the state outside tests!
			store.state.entries.push("Lemon");
			next();
		};
		const middlewareB = (store, next) => {
			// Never directly modify the state outside tests!
			store.state.entries.push("Raspberry");
			next();
		};
		const testStore = new Store(testReducer, initialState, [middlewareA, middlewareB]);
		const expected = ["Apple", "Peach", "Lemon", "Raspberry", "Orange"];
		const testAction = { type: "Test", text: "Orange" };

		testStore.dispatch(testAction);

		Assert.deepEqual(testStore.state.entries, expected);
	}

	dispatch_shouldExecuteTheActionAndModifyTheStateAndSkipTheSecondMiddlewareAndReducerCall() {
		const initialState = {
			entries: ["Apple", "Peach"]
		};
		const testReducer = (action, state = initialState) => {
			state.entries = [...state.entries, action.text];

			return state;
		};
		const middlewareA = (store) => {
			// Never directly modify the state outside tests!
			store.state.entries.push("Lemon");
		};
		const middlewareB = (store, next) => {
			// Never directly modify the state outside tests!
			store.state.entries.push("Raspberry");
			next();
		};
		const testStore = new Store(testReducer, initialState, [middlewareA, middlewareB]);
		const expected = ["Apple", "Peach", "Lemon"];
		const testAction = { type: "Test", text: "Orange" };

		testStore.dispatch(testAction);

		Assert.deepEqual(testStore.state.entries, expected);
	}

	dispatch_shouldExecuteTheActionAndNotifyAllSubscribersInTheCorrectOrder() {
		const receivedSubscriberData = [];
		const initialState = {};
		const testReducer = (action, state = initialState) => state;
		const testStore = new Store(testReducer, initialState, []);
		const expected = ["Lemon", "Raspberry"];

		testStore.subscribe(() => {
			receivedSubscriberData.push("Lemon");
		});
		testStore.subscribe(() => {
			receivedSubscriberData.push("Raspberry");
		});
		testStore.dispatch({});

		Assert.deepEqual(receivedSubscriberData, expected);
	}

	executeSelectors_shouldExecuteSelectorFunctionAndAssignTheResult() {
		const initialState = { entries: ["Apple", "Orange", "Peach"], searchTerm: "p" };
		const testReducer = () => { };
		const testStore = new Store(testReducer, initialState, []);
		const searchEntries = (state) => state.entries.filter(item => item.toLowerCase().includes(state.searchTerm.toLowerCase()));
		const selectorObject = {
			entries: searchEntries
		};
		const expected = {
			entries: ["Apple", "Peach"]
		};

		const actual = testStore.executeSelectors(selectorObject);

		Assert.deepEqual(actual, expected);
	}

	insecureSelect_shouldExecuteTheSelectorFunctionAndReturnTheUnescapedResultingData() {
		const initialState = { entries: ["<h1>Apple</h1>", "<h1>Orange</h1>", "<h1>Peach</h1>"], searchTerm: "p" };
		const testReducer = () => { };
		const testStore = new Store(testReducer, initialState, []);
		const searchEntries = (state) => state.entries.filter(item => item.toLowerCase().includes(state.searchTerm.toLowerCase()));
		const expected = ["<h1>Apple</h1>", "<h1>Peach</h1>"];

		const actual = testStore.insecureSelect(searchEntries);

		Assert.deepEqual(actual, expected);
	}

	select_shouldExecuteTheSelectorFunctionAndReturnTheEscapedResultingData() {
		const initialState = { entries: ["<h1>Apple</h1>", "<h1>Orange</h1>", "<h1>Peach</h1>"], searchTerm: "p" };
		const testReducer = () => { };
		const testStore = new Store(testReducer, initialState, []);
		const searchEntries = (state) => state.entries.filter(item => item.toLowerCase().includes(state.searchTerm.toLowerCase()));
		const expected = ["&lt;h1&gt;Apple&lt;/h1&gt;", "&lt;h1&gt;Peach&lt;/h1&gt;"];

		const actual = testStore.select(searchEntries);

		Assert.deepEqual(actual, expected);
	}

	unsubscribe_shouldUnsubscribeTheCorrectSubscribe() {
		const receivedSubscriberData = [];
		const initialState = {};
		const testReducer = (action, state = initialState) => state;
		const testStore = new Store(testReducer, initialState, []);
		const expected = ["Lemon", "Apple"];

		testStore.subscribe(() => {
			receivedSubscriberData.push("Lemon");
		});
		const unsubscribeFunction = testStore.subscribe(() => {
			receivedSubscriberData.push("Raspberry");
		});
		testStore.subscribe(() => {
			receivedSubscriberData.push("Apple");
		});

		unsubscribeFunction();
		testStore.dispatch({});

		Assert.deepEqual(receivedSubscriberData, expected);
	}
}
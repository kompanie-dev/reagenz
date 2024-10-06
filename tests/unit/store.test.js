import { assert, describe, it } from "vitest";
import { Store } from "../../source/store.js";

describe("Store.constructor()", () => {
	it("Should correctly assign the initial state", () => {
		const expectedState = { count: 0, data: "Test" };
		const testReducer = () => { };

		const testStore = new Store(testReducer, expectedState, []);

		assert.deepEqual(testStore.state, expectedState);
	});
});

describe("Store.executeSelectors()", () => {
	it("Should correctly execute the selector function and assign the resulting data", () => {
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

		assert.deepEqual(actual, expected);
	});
});


describe("Store.select()", () => {
	it("Should correctly execute the selector function and return the escaped resulting data", () => {
		const initialState = { entries: ["<h1>Apple</h1>", "<h1>Orange</h1>", "<h1>Peach</h1>"], searchTerm: "p" };
		const testReducer = () => { };
		const testStore = new Store(testReducer, initialState, []);
		const searchEntries = (state) => state.entries.filter(item => item.toLowerCase().includes(state.searchTerm.toLowerCase()));
		const expected = ["&lt;h1&gt;Apple&lt;/h1&gt;", "&lt;h1&gt;Peach&lt;/h1&gt;"];

		const actual = testStore.select(searchEntries);

		assert.deepEqual(actual, expected);
	});
});

describe("Store.insecureSelect()", () => {
	it("Should correctly execute the selector function and return the unescaped resulting data", () => {
		const initialState = { entries: ["<h1>Apple</h1>", "<h1>Orange</h1>", "<h1>Peach</h1>"], searchTerm: "p" };
		const testReducer = () => { };
		const testStore = new Store(testReducer, initialState, []);
		const searchEntries = (state) => state.entries.filter(item => item.toLowerCase().includes(state.searchTerm.toLowerCase()));
		const expected = ["<h1>Apple</h1>", "<h1>Peach</h1>"];

		const actual = testStore.insecureSelect(searchEntries);

		assert.deepEqual(actual, expected);
	});
});


describe("Store.dispatch()", () => {
	it("Should correctly execute the action and modify the state", () => {
		const initialState = {
			entries: ["Apple", "Peach"]
		};
		const testReducer = (action, state = initialState) => {
			state.entries = [...state.entries, action.text ];

			return state;
		};
		const testStore = new Store(testReducer, initialState, []);
		const expected = ["Apple", "Peach", "Orange"];
		const testAction = { type: "Test", text: "Orange" };

		testStore.dispatch(testAction);

		assert.deepEqual(testStore.state.entries, expected);
	});

	it("Should correctly execute the action, modify the state and execute middleware", () => {
		const initialState = {
			entries: ["Apple", "Peach"]
		};
		const testReducer = (action, state = initialState) => {
			state.entries = [...state.entries, action.text ];

			return state;
		};
		const middlewareA = (store, next, action) => {
			store.state.entries.push("Lemon"); // Never directly modify the state outside tests!
			next();
		};
		const middlewareB = (store, next, action) => {
			store.state.entries.push("Raspberry"); // Never directly modify the state outside tests!
			next();
		};
		const testStore = new Store(testReducer, initialState, [middlewareA, middlewareB]);
		const expected = ["Apple", "Peach", "Lemon", "Raspberry", "Orange"];
		const testAction = { type: "Test", text: "Orange" };

		testStore.dispatch(testAction);

		assert.deepEqual(testStore.state.entries, expected);
	});

	it("Should correctly execute the action, modify the state and skip the second middleware and reducer call", () => {
		const initialState = {
			entries: ["Apple", "Peach"]
		};
		const testReducer = (action, state = initialState) => {
			state.entries = [...state.entries, action.text ];

			return state;
		};
		const middlewareA = (store, next, action) => {
			store.state.entries.push("Lemon"); // Never directly modify the state outside tests!
		};
		const middlewareB = (store, next, action) => {
			store.state.entries.push("Raspberry"); // Never directly modify the state outside tests!
			next();
		};
		const testStore = new Store(testReducer, initialState, [middlewareA, middlewareB]);
		const expected = ["Apple", "Peach", "Lemon"];
		const testAction = { type: "Test", text: "Orange" };

		testStore.dispatch(testAction);

		assert.deepEqual(testStore.state.entries, expected);
	});
});

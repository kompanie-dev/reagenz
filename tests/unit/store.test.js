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
	it("Should correctly execute selector function and assign the resulting data", () => {
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

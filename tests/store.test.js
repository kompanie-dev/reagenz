import { assert, describe, it } from "vitest";
import { Store } from "../source/store.js";

describe("Store.constructor()", () => {
	it("Should correctly assign the initial state", () => {
		const expectedState = { count: 0, data: "Test" };
		const testReducer = () => { };
		const testMiddlewareA = (store, next) => {
			next();
		};
		const testMiddlewareB = (store, next) => {
			next();
		};

		const testStore = new Store(testReducer, expectedState, [testMiddlewareA, testMiddlewareB]);

		assert.deepEqual(testStore.state, expectedState);
	});
});

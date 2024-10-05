import { assert, describe, it } from "vitest";
import { ObjectComparator } from "../../source/objectComparator.js";

describe("ObjectComparator.checkDeepEquality()", () => {
	it("Should return true for same bool inputs", () => {
		const actual = ObjectComparator.checkDeepEquality(false, false);

		assert.isTrue(actual);
	});

	it("Should return false for differing bool inputs", () => {
		const actual = ObjectComparator.checkDeepEquality(true, false);

		assert.isFalse(actual);
	});

	it("Should return true for the same strings", () => {
		const actual = ObjectComparator.checkDeepEquality("TestA", "TestA");

		assert.isTrue(actual);
	});

	it("Should return false for two different strings", () => {
		const actual = ObjectComparator.checkDeepEquality("TestA", "TestB");

		assert.isFalse(actual);
	});

	it("Should return true for the same numbers", () => {
		const actual = ObjectComparator.checkDeepEquality(7, 7);

		assert.isTrue(actual);
	});

	it("Should return false for two different numbers", () => {
		const actual = ObjectComparator.checkDeepEquality(3, 7);

		assert.isFalse(actual);
	});

	it("Should return true for two nulls", () => {
		const actual = ObjectComparator.checkDeepEquality(null, null);

		assert.isTrue(actual);
	});

	it("Should return true for two undefined", () => {
		const actual = ObjectComparator.checkDeepEquality(undefined, undefined);

		assert.isTrue(actual);
	});

	it("Should return false for null and undefined", () => {
		const actual = ObjectComparator.checkDeepEquality(null, undefined);

		assert.isFalse(actual);
	});

	it("Should return true for two empty objects", () => {
		const actual = ObjectComparator.checkDeepEquality({}, {});

		assert.isTrue(actual);
	});

	it("Should return true for two objects with same properties", () => {
		const objectA = { testA: "A", testB: "B" };
		const objectB = { testA: "A", testB: "B" };

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		assert.isTrue(actual);
	});

	it("Should return false for two objects with different properties", () => {
		const objectA = { testA: "A", testB: "B" };
		const objectB = { testA: "A", testC: "B" };

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		assert.isFalse(actual);
	});

	it("Should return true for two objects with same nested properties", () => {
		const objectA = { testA: 0, testB: { nested: 0 } };
		const objectB = { testA: 0, testB: { nested: 0 } };

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		assert.isTrue(actual);
	});

	it("Should return false for two objects with different nested properties", () => {
		const objectA = { testA: 0, testB: { nested: 0 } };
		const objectB = { testA: 0, testB: { nested: 1 } };

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		assert.isFalse(actual);
	});

	it("Should return false for two objects with one missing a nested property", () => {
		const objectA = { testA: 0, testB: { nestedA: 0, nestedB: 7 } };
		const objectB = { testA: 0, testB: { nestedA: 0 } };

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		assert.isFalse(actual);
	});

	it("Should return true for two empty arrays", () => {
		const actual = ObjectComparator.checkDeepEquality([], []);

		assert.isTrue(actual);
	});

	it("Should return true for two identical number arrays", () => {
		const arrayA = [1, 2, 3];
		const arrayB = [1, 2, 3];

		const actual = ObjectComparator.checkDeepEquality(arrayA, arrayB);

		assert.isTrue(actual);
	});

	it("Should return false for two different number arrays", () => {
		const arrayA = [1, 2, 3];
		const arrayB = [1, 2, 4];

		const actual = ObjectComparator.checkDeepEquality(arrayA, arrayB);

		assert.isFalse(actual);
	});

	it("Should return true for two identical mixed arrays", () => {
		const arrayA = [1, "test", { testA: { testB: "XYz" } }];
		const arrayB = [1, "test", { testA: { testB: "XYz" } }];

		const actual = ObjectComparator.checkDeepEquality(arrayA, arrayB);

		assert.isTrue(actual);
	});

	it("Should return false for two different mixed arrays", () => {
		const arrayA = [1, "test", { testA: { testB: "XYz" } }];
		const arrayB = [1, "test", { testA: { testB: "ABC" } }];

		const actual = ObjectComparator.checkDeepEquality(arrayA, arrayB);

		assert.isFalse(actual);
	});


	it("Should return false for two different mixed big objects containing nulls", () => {
		const objectA = {
			name: "Test Object",
			id: 123,
			isActive: null,
			details: {
				createdAt: new Date("2023-10-04T12:00:00Z"),
				updatedAt: new Date("2024-01-01T08:00:00Z"),
				tags: ["tag1", "tag2", { name: "special", active: false }],
				metadata: {
					description: "This is a nested description",
					views: 100,
					likes: 50,
					options: [
						{ key: "option1", value: "val1" },
						{ key: "option2", value: "val2" }
					]
				}
			},
			nestedArray: [
				[1, 2, 3],
				[{ a: 10, b: 20 }, { c: 30, d: [40, 50, 60] }],
				"simple string",
				null
			],
			references: {
				key1: { ref: "value1", status: true },
				key2: { ref: "value2", status: false, subRef: { count: 5 } }
			},
			someNullValue: null,
			numberArray: [1, 2, 3, 4, 5],
			extraInfo: {
				emptyArray: [],
				emptyObject: {}
			}
		};

		const objectB = {
			name: "Test Object",
			id: 123,
			isActive: true,
			details: {
				createdAt: new Date("2023-10-04T12:00:00Z"),
				updatedAt: new Date("2024-01-01T08:00:00Z"),
				tags: ["tag1", "tag2", { name: "special", active: false }],
				metadata: {
					description: "This is a nested description",
					views: 100,
					likes: 50,
					options: [
						{ key: "option1", value: "val1" },
						{ key: "option2", value: "val2" }
					]
				}
			},
			nestedArray: [
				[1, 2, 3],
				[{ a: 10, b: 20 }, { c: 30, d: [40, 50, 60] }],
				"simple string",
				null
			],
			references: {
				key1: { ref: "value1", status: true },
				key2: { ref: "value2", status: false, subRef: { count: 5 } }
			},
			someNullValue: null,
			numberArray: [1, 2, 3, 4, 5],
			extraInfo: {
				emptyArray: [],
				emptyObject: {}
			}
		};

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		assert.isFalse(actual);
	});

	it("Should return true for two identical mixed big objects containing nulls", () => {
		const objectA = {
			name: "Test Object",
			id: 123,
			isActive: true,
			details: {
				createdAt: new Date("2023-10-04T12:00:00Z"),
				updatedAt: new Date("2024-01-01T08:00:00Z"),
				tags: ["tag1", "tag2", { name: "special", active: false }],
				metadata: {
					description: "This is a nested description",
					views: 100,
					likes: 50,
					options: [
						{ key: "option1", value: "val1" },
						{ key: "option2", value: "val2" }
					]
				}
			},
			nestedArray: [
				[1, 2, 3],
				[{ a: 10, b: 20 }, { c: 30, d: [40, 50, 60] }],
				"simple string",
				null
			],
			references: {
				key1: { ref: "value1", status: true },
				key2: { ref: "value2", status: false, subRef: { count: 5 } }
			},
			someNullValue: null,
			numberArray: [1, 2, 3, 4, 5],
			extraInfo: {
				emptyArray: [],
				emptyObject: {}
			}
		};

		const objectB = {
			name: "Test Object",
			id: 123,
			isActive: true,
			details: {
				createdAt: new Date("2023-10-04T12:00:00Z"),
				updatedAt: new Date("2024-01-01T08:00:00Z"),
				tags: ["tag1", "tag2", { name: "special", active: false }],
				metadata: {
					description: "This is a nested description",
					views: 100,
					likes: 50,
					options: [
						{ key: "option1", value: "val1" },
						{ key: "option2", value: "val2" }
					]
				}
			},
			nestedArray: [
				[1, 2, 3],
				[{ a: 10, b: 20 }, { c: 30, d: [40, 50, 60] }],
				"simple string",
				null
			],
			references: {
				key1: { ref: "value1", status: true },
				key2: { ref: "value2", status: false, subRef: { count: 5 } }
			},
			someNullValue: null,
			numberArray: [1, 2, 3, 4, 5],
			extraInfo: {
				emptyArray: [],
				emptyObject: {}
			}
		};

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		assert.isTrue(actual);
	});
});

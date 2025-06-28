import { Assert } from "../node_modules/@kompanie/assert/index.js";
import { ObjectComparator } from "../index.js";

export class ObjectComparatorTests {
	checkDeepEquality_sameBooleans_shouldReturnTrue() {
		const actual = ObjectComparator.checkDeepEquality(false, false);

		Assert.equal(actual, true);
	}

	checkDeepEquality_differentBooleans_shouldReturnFalse() {
		const actual = ObjectComparator.checkDeepEquality(true, false);

		Assert.equal(actual, false);
	}

	checkDeepEquality_sameStrings_shouldReturnTrue() {
		const actual = ObjectComparator.checkDeepEquality("TestA", "TestA");

		Assert.equal(actual, true);
	}

	checkDeepEquality_differentStrings_shouldReturnFalse() {
		const actual = ObjectComparator.checkDeepEquality("TestA", "TestB");

		Assert.equal(actual, false);
	}

	checkDeepEquality_sameNumbers_shouldReturnTrue() {
		const actual = ObjectComparator.checkDeepEquality(7, 7);

		Assert.equal(actual, true);
	}

	checkDeepEquality_differentNumbers_shouldReturnFalse() {
		const actual = ObjectComparator.checkDeepEquality(3, 7);

		Assert.equal(actual, false);
	}

	checkDeepEquality_nulls_shouldReturnTrue() {
		const actual = ObjectComparator.checkDeepEquality(null, null);

		Assert.equal(actual, true);
	}

	checkDeepEquality_undefineds_shouldReturnTrue() {
		const actual = ObjectComparator.checkDeepEquality(undefined, undefined);

		Assert.equal(actual, true);
	}

	checkDeepEquality_nullAndUndefined_shouldReturnFalse() {
		const actual = ObjectComparator.checkDeepEquality(null, undefined);

		Assert.equal(actual, false);
	}

	checkDeepEquality_emptyObjects_shouldReturnTrue() {
		const actual = ObjectComparator.checkDeepEquality({}, {});

		Assert.equal(actual, true);
	}

	checkDeepEquality_objectsWithSameProperties_shouldReturnTrue() {
		const objectA = { testA: "A", testB: "B" };
		const objectB = { testA: "A", testB: "B" };

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);
		
		Assert.equal(actual, true);
	}

	checkDeepEquality_objectsWithDifferentProperties_shouldReturnFalse() {
		const objectA = { testA: "A", testB: "B" };
		const objectB = { testA: "A", testC: "B" };

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		Assert.equal(actual, false);
	}

	checkDeepEquality_objectsWithSameNestedObjects_shouldReturnTrue() {
		const objectA = { testA: 0, testB: { nested: 0 } };
		const objectB = { testA: 0, testB: { nested: 0 } };

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		Assert.equal(actual, true);
	}

	checkDeepEquality_objectsWithDifferentNestedObjects_shouldReturnFalse() {
		const objectA = { testA: 0, testB: { nested: 0 } };
		const objectB = { testA: 0, testB: { nested: 1 } };

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		Assert.equal(actual, false);
	}

	checkDeepEquality_sameObjectsWithOneMissingProperty_shouldReturnFalse() {
		const objectA = { testA: 0, testB: { nestedA: 0, nestedB: 7 } };
		const objectB = { testA: 0, testB: { nestedA: 0 } };

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		Assert.equal(actual, false);
	}

	checkDeepEquality_samePropertiesWithDifferentOrder_shouldReturnTrue() {
		const objectA = { testA: 0, testB: 5 };
		const objectB = { testB: 5, testA: 0 };

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		Assert.equal(actual, true);
	}

	checkDeepEquality_emptyArrays_shouldReturnTrue() {
		const actual = ObjectComparator.checkDeepEquality([], []);

		Assert.equal(actual, true);
	}

	checkDeepEquality_identicalNumberArrays_shouldReturnTrue() {
		const objectA = [1, 2, 3];
		const objectB = [1, 2, 3];

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		Assert.equal(actual, true);
	}

	checkDeepEquality_differentNumberArrays_shouldReturnFalse() {
		const objectA = [1, 2, 3];
		const objectB = [1, 2, 4];

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		Assert.equal(actual, false);
	}

	checkDeepEquality_identicalMixedTypeArrays_shouldReturnTrue() {
		const objectA = [1, "test", { testA: { testB: "XYz" } }];
		const objectB = [1, "test", { testA: { testB: "XYz" } }];

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		Assert.equal(actual, true);
	}

	checkDeepEquality_differentMixedArrays_shouldReturnFalse() {
		const objectA = [1, "test", { testA: { testB: "XYz" } }];
		const objectB = [1, "test", { testA: { testB: "ABC" } }];

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);

		Assert.equal(actual, false);
	}

	checkDeepEquality_sameBigObjectsSame_shouldReturnTrue() {
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
		Assert.equal(actual, true);
	}

	checkDeepEquality_differentBigObjects_shouldReturnFalse() {
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

		objectB.isActive = true;

		const actual = ObjectComparator.checkDeepEquality(objectA, objectB);
		Assert.equal(actual, false);
	}
}
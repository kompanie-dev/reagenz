import { assert, describe, it } from "vitest";
import { HtmlEscaper } from "../../source/htmlEscaper.js";

describe("HtmlEscaper.escapeString()", () => {
	it("Should escape HTML tags (<, >)", () => {
		const expected = "&lt;h1&gt;Test&lt;/h1&gt;";

		const actual = HtmlEscaper.escapeString(`<h1>Test</h1>`);

		assert.equal(actual, expected);
	});

	it("Should escape quotes (\", ')", () => {
		const expected = "&lt;test-component value=&quot;&#39;&quot;&gt;&lt;/test-component&gt;";

		const actual = HtmlEscaper.escapeString(`<test-component value="'"></test-component>`);

		assert.equal(actual, expected);
	});

	it("Should escape '&'", () => {
		const expected = "&lt;a href=&quot;?page=test&amp;folder=root&quot;&gt;";

		const actual = HtmlEscaper.escapeString(`<a href="?page=test&folder=root">`);

		assert.equal(actual, expected);
	});

	it("Should ignore other characters", () => {
		const expected = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?.,:;#+-=%{}()[]$*|";

		const actual = HtmlEscaper.escapeString(expected);

		assert.equal(actual, expected);
	});
});

describe("HtmlEscaper.escapeObject()", () => {
	it("Should escape string properties with escapable characters", () => {
		const testObject = {
			testArray: [1, 2, 3],
			testBool: true,
			testNull: null,
			testNumber: 123,
			testObject: {
				propertyA: 1,
				propertyB: true,
				propertyC: [],
				propertyD: "<h1>Test</h1>"
			},
			testString: "Nothing to escape here"
		};

		const expected = {
			testArray: [1, 2, 3],
			testBool: true,
			testNull: null,
			testNumber: 123,
			testObject: {
				propertyA: 1,
				propertyB: true,
				propertyC: [],
				propertyD: "&lt;h1&gt;Test&lt;/h1&gt;"
			},
			testString: "Nothing to escape here"
		};

		const actual = HtmlEscaper.escapeObject(testObject);

		assert.deepEqual(actual, expected);
	});

	it("Should ignore objects without properties to escape", () => {
		const expected = {
			testArray: [1, 2, 3],
			testBool: true,
			testNull: null,
			testNumber: 123,
			testObject: {
				propertyA: 1,
				propertyB: true,
				propertyC: []
			}
		};

		const actual = HtmlEscaper.escapeObject(expected);

		assert.deepEqual(actual, expected);
	});

	it("Should return the boolean as-is when input is a boolean", () => {
		const actual = HtmlEscaper.escapeObject(true);

		assert.isTrue(actual);
	});

	it("Should return null when input is null", () => {
		const actual = HtmlEscaper.escapeObject(null);

		assert.isNull(actual);
	});

	it("Should return the number as-is when input is a number", () => {
		const actual = HtmlEscaper.escapeObject(123);

		assert.deepEqual(actual, 123);
	});

	it("Should return the string as-is when input is a string without special characters", () => {
		const actual = HtmlEscaper.escapeObject("Hello World");

		assert.deepEqual(actual, "Hello World");
	});

	it("Should return undefined when input is undefined", () => {
		const actual = HtmlEscaper.escapeObject(undefined);

		assert.isUndefined(actual);
	});

	it("Should return the empty object as-is when input is an empty object", () => {
		const actual = HtmlEscaper.escapeObject({});

		assert.deepEqual(actual, {});
	});
});

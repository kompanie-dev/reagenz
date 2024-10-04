import { assert, describe, it } from "vitest";
import { HtmlEscaper } from "../source/htmlEscaper.js";

describe("HtmlEscaper.escapeString()", () => {
	it("Should escape HTML tags (<, >)", () => {
		const expected = "&lt;h1&gt;Test&lt;/h1&gt;";

		const actual = HtmlEscaper.escapeString(`<h1>Test</h1>`);

		assert.equal(actual, expected);
	});

	it("Should escape quotes (\", ')", () => {
		const expected = "&lt;test-component value=&quot;&#039;&quot;&gt;&lt;/test-component&gt;";

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
});

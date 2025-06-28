import { Assert } from "../node_modules/@kompanie/assert/index.js";
import { HtmlEscaper } from "../index.js";

export class HtmlEscaperTests {
	escapeString_shouldEscapeHtmlTags() {
		const expected = "&lt;h1&gt;Test&lt;/h1&gt;";

		const actual = HtmlEscaper.escapeString(`<h1>Test</h1>`);

		Assert.equal(actual, expected);
	}

	escapeString_shouldEscapeQuotes() {
		const expected = "&lt;test-component value=&quot;&#39;&quot;&gt;&lt;/test-component&gt;";

		const actual = HtmlEscaper.escapeString(`<test-component value="'"></test-component>`);

		Assert.equal(actual, expected);
	}

	escapeString_shouldEscapeAmpersand() {
		const expected = "&lt;a href=&quot;?page=test&amp;folder=root&quot;&gt;";

		const actual = HtmlEscaper.escapeString(`<a href="?page=test&folder=root">`);

		Assert.equal(actual, expected);
	}

	escapeString_shouldIgnoreOtherCharacters() {
		const expected = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?.,:;#+-=%{}()[]$*|";

		const actual = HtmlEscaper.escapeString(expected);

		Assert.equal(actual, expected);
	}

	escapeObject_shouldEscapeStringPropertiesWithEscapeableCharacters() {
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

		Assert.deepEqual(actual, expected);
	}

	escapeObject_shouldIgnoreObjectsWithoutPropertiesToEscape() {
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

		Assert.deepEqual(actual, expected);
	}

	escapeObject_shouldReturnBooleanAsIsWhenInputIsBoolean() {
		const actual = HtmlEscaper.escapeObject(true);

		Assert.equal(actual, true);
	}

	escapeObject_shouldReturnNullWhenInputIsNull() {
		const actual = HtmlEscaper.escapeObject(null);

		Assert.equal(actual, null);
	}

	escapeObject_shouldReturnNumberAsIsWhenInputIsNumber() {
		const actual = HtmlEscaper.escapeObject(123);

		Assert.deepEqual(actual, 123);
	}

	escapeObject_shouldReturnStringAsIsWhenNoSpecialCharactersArePresent() {
		const actual = HtmlEscaper.escapeObject("Hello World");

		Assert.deepEqual(actual, "Hello World");
	}

	escapeObject_shouldReturnUndefinedWhenInputIsUndefined() {
		const actual = HtmlEscaper.escapeObject(undefined);

		Assert.equal(actual, undefined);
	}

	escapeObject_shouldReturnEmptyObjectWhenInputIsEmptyObject() {
		const actual = HtmlEscaper.escapeObject({});

		Assert.deepEqual(actual, {});
	}
}
/**
 * Contains functions to escape HTML in strings and objects.
 */
export class HtmlEscaper {
	/**
	 * Iterates all properties and sub-objects of the given object and escapes all string properties.
	 *
	 * @param {*} unsafeObject The object with potentially unescaped HTML in string properties.
	 *
	 * @returns {*} A new object with all string properties escaped.
	 */
	static escapeObject(unsafeObject) {
		if (typeof unsafeObject === "string") {
			return HtmlEscaper.escapeString(unsafeObject);
		}

		if (Array.isArray(unsafeObject)) {
			return unsafeObject.map(item => HtmlEscaper.escapeObject(item));
		}

		if (unsafeObject === null || typeof unsafeObject !== "object") {
			return unsafeObject;
		}

		return Object.fromEntries(
			Object
				.entries(unsafeObject)
				.map(
					([key, value]) => [key, HtmlEscaper.escapeObject(value)]
				)
		);
	}

	/**
	 * A map which contains all unsafe HTML characters and their entities.
	 */
	static entityMap = {
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;",
		"&": "&amp;"
	};

	/**
	 * Escapes the unsafe characters of HTML (&, <, >, ", ') in the supplied string.
	 *
	 * @param {string} unsafeString The unescaped HTML string.
	 *
	 * @returns {string} The escaped string.
	 */
	static escapeString(unsafeString) {
		return unsafeString.replace(/[<>'"&]/gu, (char) => HtmlEscaper.entityMap[char]);
	}
}

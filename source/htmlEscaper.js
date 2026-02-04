export class HtmlEscaper {
	static escapeObject(unsafeObject) {
		if (typeof unsafeObject === "string") {
			return HtmlEscaper.escapeString(unsafeObject);
		}

		if (Array.isArray(unsafeObject)) {
			return unsafeObject.map(HtmlEscaper.escapeObject);
		}

		if (unsafeObject !== null && typeof unsafeObject === "object") {
			return Object.fromEntries(
				Object
					.entries(unsafeObject)
					.map(
						([key, value]) => [key, HtmlEscaper.escapeObject(value)]
					));
		}

		return unsafeObject;
	}

	static escapeString(unsafeString) {
		const entityMap = {
			"<": "&lt;",
			">": "&gt;",
			"\"": "&quot;",
			"'": "&#39;",
			"&": "&amp;"
		};

		return unsafeString.replace(/[<>'"&]/gu, (char) => entityMap[char]);
	}
}
/**
 * Contains functions to escape HTML in strings and objects.
 */
export class HtmlEscaper {
    /**
     * Iterates all properties and sub-objects of the given object and escapes all string properties.
     * @param {Object} unsafeObject The object with potentially unescaped HTML in string properties.
     * @returns A new object with all string properties escaped.
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

        const escapedObject = {};

        for (const key in unsafeObject) {
            if (Object.prototype.hasOwnProperty.call(unsafeObject, key)) {
                escapedObject[key] = HtmlEscaper.escapeObject(unsafeObject[key]);
            }
        }

        return escapedObject;
    }

    /**
     * Escapes the unsafe characters of HTML (&, <, >, ", ') in the supplied string.
     * @param {string} unsafeString The unescaped HTML string.
     * @returns The escaped string.
     */
    static escapeString(unsafeString) {
        return unsafeString
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }
}
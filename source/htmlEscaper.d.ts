/**
 * Contains functions to escape HTML in strings and objects.
 */
export declare class HtmlEscaper {
	/**
	 * Iterates all properties and sub-objects of the given object and escapes all string properties.
	 *
	 * @param unsafeObject The object with potentially unescaped HTML in string properties.
	 *
	 * @returns A new object with all string properties escaped.
	 */
	static escapeObject(unsafeObject: any): any;

	/**
	 * A map which contains all unsafe HTML characters and their entities.
	 */
	static entityMap: { [key: string]: string };

	/**
	 * Escapes the unsafe characters of HTML (&, <, >, ", ') in the supplied string.
	 *
	 * @param unsafeString The unescaped HTML string.
	 *
	 * @returns The escaped string.
	 */
	static escapeString(unsafeString: string): string;
}

/**
 * Contains functions to compare objects.
 */
export declare class ObjectComparator {
	/**
	 * Determines if two objects are deep equal.
	 * @param objectA The object which should be compared.
	 * @param objectB The object which should be compared against.
	 * @returns true if both objects are the same or contain the same data, otherwise false.
	 */
	static checkDeepEquality(objectA: any, objectB: any): boolean;
}

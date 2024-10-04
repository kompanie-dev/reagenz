/**
 * Contains functions to compare objects.
 */
export class ObjectComparator {
	/**
	 * Determines if two objects are deep equal.
	 * @param {Object} objectA The object which should be compared.
	 * @param {Object} objectB The object which should be compared against.
	 * @returns {boolean} true, if both objects are the same or contain the same data, otherwise false.
	 */
    static checkDeepEquality(objectA, objectB) {
		if (objectA === objectB) {
			return true;
		}

		if (typeof objectA !== "object" || typeof objectB !== "object" || objectA === null || objectB === null) {
			return false;
		}

		const propertyNamesA = Object.keys(objectA);
		const propertyNamesB = Object.keys(objectB);

		if (propertyNamesA.length !== propertyNamesB.length) {
			return false;
		}

		return propertyNamesA.every(
			propertyName => this.checkDeepEquality(objectA[propertyName], objectB[propertyName])
		);
	}
}

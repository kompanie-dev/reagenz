/**
 * Iterates through the given array and generates an HTML string using the supplied function.
 * @param {Object} collection An object like Array or Map which should be iterated through.
 * @param {Function} htmlFunction A function which generates the HTML for each element in the array.
 * @returns A string which contains the complete HTML for each element in the array.
 */
export const forEach = (collection, htmlFunction) => {
    if (collection instanceof Map) {
        return Array
            .from(collection)
            .map(([key, value]) => htmlFunction(value, key))
            .join("");
    }
    if (Array.isArray(collection)) {
        return collection
            .map(htmlFunction)
            .join("");
    }

    throw new Error("The supplied collection is not iterable");
};
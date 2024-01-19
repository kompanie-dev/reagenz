/**
 * Iterates through the given array and generates an HTML string using the supplied function.
 * @param {Array} array The array which should be iterated through.
 * @param {Function} htmlFunction A function which generates the HTML for each element in the array.
 * @returns A string which contains the complete HTML for each element in the array.
 */
export const forEach = (array, htmlFunction) => array.map(htmlFunction).join("");
import "../source/forComponent.js";
import { Assert } from "../node_modules/@kompanie/assert/index.js";

export class ForComponentTests {
	afterEach() {
		document.querySelector("x-for").remove();
	}

	flatArray_shouldIterateArrayAndReplaceIndexAndItemPlaceholders() {
		document.body.insertAdjacentHTML("afterend", /*html*/`
			<x-for array='[3, "X", 7]'>
				<div>@index() @item()</div>
			</x-for>
		`);

		const forElement = document.querySelector("x-for");

		Assert.equal(forElement.innerHTML.includes("0 3"), true);
		Assert.equal(forElement.innerHTML.includes("1 X"), true);
		Assert.equal(forElement.innerHTML.includes("2 7"), true);
	}

	complexArray_shouldIterateArrayAndReplaceItemPropertyPlaceholders() {
		document.body.insertAdjacentHTML("afterend", /*html*/`
			<x-for array='[{"a": {"b": "xyz"}}, {"a": {"b": "7"}}, 5]'>
				<div>@item(a.b)</div>
			</x-for>
		`);

		const forElement = document.querySelector("x-for");
		console.log(forElement.innerHTML)

		Assert.equal(forElement.innerHTML.includes("xyz"), true);
		Assert.equal(forElement.innerHTML.includes("7"), true);
		Assert.equal(forElement.innerHTML.includes("5"), false);
	}
}

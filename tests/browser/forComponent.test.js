import { expect, describe, it } from "vitest";
import "../../source/forComponent.js";

describe("ForComponent", () => {
	it("Should iterate array and successfully replace @index() and @item()", () => {
		document.body.insertAdjacentHTML("afterend", /*html*/`
			<x-for array='[3, "X", 7]'>
				<div>@index() @item()</div>
			</x-for>
		`);

	  const element = document.querySelector("x-for");

	  expect(element)
			.toContainHTML("0 3")
			.toContainHTML("1 X")
			.toContainHTML("2 7");
	});

	it("Should iterate array and successfully replace @item(property)", () => {
		document.body.insertAdjacentHTML("afterend", /*html*/`
			<x-for array='[{"a": {"b": "xyz"}}, 7]'>
				<div>@item(a.b)</div>
			</x-for>
		`);

	  const element = document.querySelector("x-for");

	  expect(element)
			.toContainHTML("xyz")
			.toContainHTML("7");
	});
});

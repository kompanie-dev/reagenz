import { expect, describe, it } from "vitest";
import "../../source/ifComponent.js";

describe("IfComponent", () => {
	it("Should show innerHTML if condition is true", () => {
		document.body.insertAdjacentHTML("afterend", `
			<x-if condition="true">
				<div>Visible</div>
			</x-for>
		`);

	  const element = document.querySelector("x-if");

	  expect(element).toContainHTML("<div>Visible</div>");
	});

	it("Should hide innerHTML if condition is false", () => {
		document.body.insertAdjacentHTML("afterend", `
			<x-if condition="false">
				<div>Visible</div>
			</x-for>
		`);

	  const element = document.querySelector("x-if");

	  expect(element).toBeEmptyDOMElement();
	});
});

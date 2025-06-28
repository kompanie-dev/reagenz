import { Assert } from "../node_modules/@kompanie/assert/index.js";
import "../source/ifComponent.js";

export class IfComponentTests {
	afterEach() {
		document.querySelector("x-if").remove();
	}

	conditionTrue_shouldShowContent() {
		document.body.insertAdjacentHTML("afterend", /*html*/`
			<x-if condition="true">
				<div>Visible</div>
			</x-for>
		`);

	  	const element = document.querySelector("x-if");

		Assert.notEqual(element.children[0], undefined);
	}

	conditionFalse_shouldHideContent() {
		document.body.insertAdjacentHTML("afterend", /*html*/`
			<x-if condition="false">
				<div>Visible</div>
			</x-for>
		`);

		const element = document.querySelector("x-if");

		Assert.equal(element.children[0], undefined);
	}
}

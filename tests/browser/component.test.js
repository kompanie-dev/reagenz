import { assert, expect, describe, it } from "vitest";
import { Component } from "../../source/component.js";

class AttributeTestComponent extends Component {
	attributeTypes = {
		testArray: Array,
		testBoolean: Boolean,
		testNumber: Number,
		testObject: Object,
		testString: String
	};

	render() {
		const { testArray, testBoolean, testNumber, testObject, testString } = this.useAttributes();

		return `<div>${testArray.length}/${testBoolean}/${testNumber}/${testObject.prop}/${testString}</div>`;
	}
}

customElements.define("attribute-test-component", AttributeTestComponent);

describe("Component", () => {
	it("useAttributes() should convert and return attributes correctly", () => {
		document.body.insertAdjacentHTML("afterend", /*html*/`
			<attribute-test-component
				testArray="[7]"
				testBoolean="true"
				testNumber="5"
				testObject='{\"prop\": \"abc\"}'
				testString="Hello">
			</attribute-test-component>
		`);

		const element = document.querySelector("attribute-test-component");

		assert.equal(element.innerHTML, "<div>1/true/5/abc/Hello</div>");
	});
});

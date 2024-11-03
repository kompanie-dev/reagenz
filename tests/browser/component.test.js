import { assert, describe, it } from "vitest";
import { Component } from "../../source/component.js";

describe("Component", () => {
	it("useAttributes() should convert and return attributes correctly", () => {
		class AttributeTestComponent extends Component {
			attributeTypes = {
				testArray: Array,
				testArrayWrongType: Array,
				testBoolean: Boolean,
				testBooleanWrongType: Boolean,
				testNumber: Number,
				testNumberWrongType: Number,
				testObject: Object,
				testObjectWrongType: Object,
				testString: String
			};

			render() {
				const { testArray, testArrayWrongType, testBoolean, testBooleanWrongType, testNumber, testNumberWrongType, testObject, testObjectWrongType, testString } = this.useAttributes();

				return `<div>${testArray[0]}/${testArrayWrongType}/${testBoolean}/${testBooleanWrongType}/${testNumber}/${testNumberWrongType}/${testObject.prop}/${testObjectWrongType}/${testString}</div>`;
			}
		}

		customElements.define("attribute-test-component", AttributeTestComponent);

		document.body.insertAdjacentHTML("afterend", /*html*/`
			<attribute-test-component
				testArray="[7]"
				testArrayWrongType="XYZ"
				testBoolean="true"
				testBooleanWrongType="5"
				testNumber="5"
				testNumberWrongType="abc"
				testObject='{"prop": "abc"}'
				testObjectWrongType="[]"
				testString="Hello">
			</attribute-test-component>
		`);

		const element = document.querySelector("attribute-test-component");

		assert.equal(element.innerHTML, "<div>7/null/true/null/5/null/abc/null/Hello</div>");
	});

	it("useDependencies() should return dependencies correctly", () => {
		class DependencyTestComponent extends Component {
			render() {
				const { testDependency } = this.useDependencies();

				return `<div>${testDependency.value}</div>`;
			}
		}

		customElements.define("dependency-test-component", DependencyTestComponent);

		DependencyTestComponent.prototype.dependencies = { testDependency: { value: "success" } };
		document.body.insertAdjacentHTML("afterend", /*html*/`
			<dependency-test-component></dependency-test-component>
		`);

		const element = document.querySelector("dependency-test-component");

		assert.equal(element.innerHTML, "<div>success</div>");
	});

	it("Event attributes should be correctly bound", () => {
		class EventAttributeTestComponent extends Component {
			render() {
				return /*html*/`<button $click="clickEventHandler">Click</button>`;
			}

			clickEventHandler() {
				this.clicked = true;
			}
		}

		customElements.define("event-attribute-test-component", EventAttributeTestComponent);

		document.body.insertAdjacentHTML("afterend", /*html*/`
			<event-attribute-test-component></event-attribute-test-component>
		`);

		document.querySelector("event-attribute-test-component button").click();
		const element = document.querySelector("event-attribute-test-component");

		assert.equal(element.clicked, true);
	});
});

import { Assert } from "../node_modules/@kompanie/assert/index.js";
import { Component } from "../source/component.js";
import { Store } from "../source/store.js";

export class ComponentTests {
	afterAll() {
		const customElements = document.querySelectorAll("attribute-test-component, callback-test-component, dependency-test-component, dispatch-test-component, event-attribute-test-component, event-attribute-error-test-component, selector-test-component");

		for (const customElement of customElements) {
			customElement.remove();
		}
	}

	attributeData_shouldConvertAndReturnAttributes() {
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
				const { testArray, testArrayWrongType, testBoolean, testBooleanWrongType, testNumber, testNumberWrongType, testObject, testObjectWrongType, testString } = this.attributeData;

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

		Assert.equal(element.innerHTML, "<div>7/null/true/null/5/null/abc/null/Hello</div>");
	}

	dependenciesProperty_shouldReturnDependencies() {
		class DependencyTestComponent extends Component {
			render() {
				const { testDependency } = this.dependencies;

				return `<div>${testDependency.value}</div>`;
			}
		}

		customElements.define("dependency-test-component", DependencyTestComponent);

		DependencyTestComponent.prototype.dependencies = { testDependency: { value: "success" } };
		document.body.insertAdjacentHTML("afterend", /*html*/`
			<dependency-test-component></dependency-test-component>
		`);

		const element = document.querySelector("dependency-test-component");

		Assert.equal(element.innerHTML, "<div>success</div>");
	}

	eventAttributes_shouldBeBound() {
		class EventAttributeTestComponent extends Component {
			render() {
				return /*html*/`<button propA="test" propB="test" $click="clickEventHandler">Click</button>`;
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

		Assert.equal(element.clicked, true);
	}

	eventAttributes_whichDontExist_logWarningToConsole() {
		class EventAttributeErrorTestComponent extends Component {
			render() {
				return /*html*/`<button propA="test" propB="test" $click="notExistingFunction">Click</button>`;
			}
		}

		let mockCalled = false;
		const originalConsoleWarn = console.warn;
		console.warn = () => { mockCalled = true; };

		customElements.define("event-attribute-error-test-component", EventAttributeErrorTestComponent);

		document.body.insertAdjacentHTML("afterend", /*html*/`
			<event-attribute-error-test-component></event-attribute-error-test-component>
		`);

		Assert.equal(mockCalled, true);

		console.warn = originalConsoleWarn;
	}

	selectors_shouldReturnCorrectResult() {
		class SelectorTestComponent extends Component {
			selectors = { testSelectorValue: () => "Selector Result" };

			render() {
				const { testSelectorValue } = this.selectorData;

				return /*html*/`<span>${testSelectorValue}</span>`;
			}
		}

		customElements.define("selector-test-component", SelectorTestComponent);

		SelectorTestComponent.prototype.dependencies = { store: new Store(state => state, {}) };

		document.body.insertAdjacentHTML("afterend", /*html*/`
			<selector-test-component></selector-test-component>
		`);

		const element = document.querySelector("selector-test-component");

		Assert.equal(element.innerHTML, "<span>Selector Result</span>");
	}

	onConnectAndOnDisconnect_shouldBeExecuted() {
		let onConnectCallbackExecuted = false;
		let onDisconnectCallbackExecuted = false;

		class CallbackTestComponent extends Component {
			render() {
				return /*html*/`<span>Test</span>`;
			}

			onConnect() {
				onConnectCallbackExecuted = true;
			}

			onDisconnect() {
				onDisconnectCallbackExecuted = true;
			}
		}

		customElements.define("callback-test-component", CallbackTestComponent);

		document.body.insertAdjacentHTML("afterend", /*html*/`
			<callback-test-component></callback-test-component>
		`);

		document.querySelector("callback-test-component").remove();

		Assert.equal(onConnectCallbackExecuted, true);
		Assert.equal(onDisconnectCallbackExecuted, true);
	}

	dispatch_shouldExecuteAction() {
		let actionDispatched = false;

		class DispatchTestComponent extends Component {
			render() {
				return /*html*/`<button $click="testDispatch">Dispatch</button>`;
			}

			testDispatch() {
				this.dispatch({ type: "TEST_ACTION" });
			}
		}

		customElements.define("dispatch-test-component", DispatchTestComponent);

		DispatchTestComponent.prototype.dependencies = {
			store: {
				dispatch: () => { actionDispatched = true; },
				subscribe: () => { },
				executeSelectors: () => { }
			}
		};

		document.body.insertAdjacentHTML("afterend", /*html*/`
			<dispatch-test-component></dispatch-test-component>
		`);

		document.querySelector("dispatch-test-component button").click();

		Assert.equal(actionDispatched, true);
	}
}
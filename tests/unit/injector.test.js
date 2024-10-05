import { assert, describe, it } from "vitest";
import { Injector } from "../../source/injector.js";

describe("Injector.injectDependencies()", () => {
	it("Should inject dependencies into the prototype", () => {
		const expected = {
			dependencyA: { test: "A" },
			dependencyB: { test: "B" }
		};

		const TestComponent = class { };
		TestComponent.prototype.dependencies = {};

		Injector.injectDependencies(expected, [TestComponent]);

		assert.deepEqual(TestComponent.prototype.dependencies, expected);
	});

	it("Should inject dependencies into the prototype without removing already existing ones", () => {
		const expected = {
			dependencyA: { test: "A" },
			dependencyB: { test: "B" },
			dependencyC: { test: "C" }
		};

		const dependencies = {
			dependencyA: { test: "A" },
			dependencyB: { test: "B" }
		};

		const TestComponent = class { };
		TestComponent.prototype.dependencies = { dependencyC: { test: "C" } };

		Injector.injectDependencies(dependencies, [TestComponent]);

		assert.deepEqual(TestComponent.prototype.dependencies, expected);
	});

	it("Should inject dependencies into multiple prototypes without removing already existing ones", () => {
		const expectedComponentA = {
			dependencyA: { test: "A" },
			dependencyB: { test: "B" },
			dependencyC: { test: "C" }
		};
		const expectedComponentB = {
			dependencyA: { test: "A" },
			dependencyB: { test: "B" },
			dependencyD: { test: "D" }
		};

		const sharedDependencies = {
			dependencyA: { test: "A" },
			dependencyB: { test: "B" }
		};

		const TestComponentA = class { };
		const TestComponentB = class { };
		TestComponentA.prototype.dependencies = { dependencyC: { test: "C" } };
		TestComponentB.prototype.dependencies = { dependencyD: { test: "D" } };

		Injector.injectDependencies(sharedDependencies, [TestComponentA, TestComponentB]);

		assert.deepEqual(TestComponentA.prototype.dependencies, expectedComponentA);
		assert.deepEqual(TestComponentB.prototype.dependencies, expectedComponentB);
	});
});

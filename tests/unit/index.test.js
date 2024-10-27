import { assert, describe, it } from "vitest";
import { App, Component, ForComponent, HtmlEscaper, IfComponent, Modal, ObjectComparator, Store } from "../../index.js";

describe("index.js", () => {
	it("Should export all Reagenz classes", () => {
		assert.isDefined(App);
		assert.isDefined(Component);
		assert.isDefined(ForComponent);
		assert.isDefined(HtmlEscaper);
		assert.isDefined(IfComponent);
		assert.isDefined(Modal);
		assert.isDefined(ObjectComparator);
		assert.isDefined(Store);
	});
});

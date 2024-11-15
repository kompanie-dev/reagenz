import { assert, describe, it } from "vitest";
import { App, Component, ForComponent, HtmlEscaper, IfComponent, Modal, ObjectComparator, Store } from "../../index.js";

describe("index.js", () => {
	it("Should export all Reagenz classes", () => {
		assert.notEqual(App, undefined);
		assert.notEqual(Component, undefined);
		assert.notEqual(ForComponent, undefined);
		assert.notEqual(HtmlEscaper, undefined);
		assert.notEqual(IfComponent, undefined);
		assert.notEqual(Modal, undefined);
		assert.notEqual(ObjectComparator, undefined);
		assert.notEqual(Store, undefined);
	});
});

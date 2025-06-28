import { Assert } from "../node_modules/@kompanie/assert/index.js";
import { App, Component, ForComponent, HtmlEscaper, IfComponent, Modal, ObjectComparator, Store } from "../index.js";

export class IndexTests {
	indexJs_shouldExportAllClasses() {
		Assert.notEqual(App, undefined);
		Assert.notEqual(Component, undefined);
		Assert.notEqual(ForComponent, undefined);
		Assert.notEqual(HtmlEscaper, undefined);
		Assert.notEqual(IfComponent, undefined);
		Assert.notEqual(Modal, undefined);
		Assert.notEqual(ObjectComparator, undefined);
		Assert.notEqual(Store, undefined);
	}
}

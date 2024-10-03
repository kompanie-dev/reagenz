export class ExampleWebComponent extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: "open" });
		const template = document.createElement("template");
		template.innerHTML = `
			<style>
				:host {
					display: block;
					font-family: "Comic Sans MS", "Comic Sans", cursive;
				}
			</style>
			<p>I am a non-Reagenz Web Component!</p>
		`;
		shadowRoot.appendChild(template.content.cloneNode(true));
	}
}

import { Globals } from "./globals.js";

export class Component extends HTMLElement {
    #subscribedStates = [];
    
    constructor() {
        super();

        this.#updateDOM();
        this.#addEventListeners();
        this.#observeAttributeChanges();
    }

    get #stateClass() {
        return Globals.states[this.getAttribute(this.#stateClassAttributeName)];
    }

    get #stateClassAttributeName() {
        return "stateClass";
    }

    #addEventListeners() {
        const events = ["change", "click", "input", "mousedown", "mouseup"];

        for (const eventName of events) {
            this.addEventListener(eventName, this[eventName]);
        }
    }

    #guardAgainstEmptyClassAttribute() {
        if (this.getAttribute(this.#stateClassAttributeName) === null) {
            throw Error(`Component '${this.localName}' has no attribute '${this.#stateClassAttributeName}' but tries to access a state`);
        }
    }

    #observeAttributeChanges() {
        const observer = new MutationObserver(() => this.#updateDOM());

        observer.observe(this, { attributes: true });
    }

    #updateDOM() {
        this.innerHTML = this.render();
    }

    get renderIfStateChangeOrigin() {
        return true;
    }

    connectedCallback() {
        this.#stateClass?.addSubscriber(this);
    }

    disconnectedCallback() {
        this.#stateClass?.removeSubscriber(this);
    }

    getState(stateName) {
        if (this.#subscribedStates.includes(stateName) === false) {
            this.#subscribedStates.push(stateName);
        }

        this.#guardAgainstEmptyClassAttribute();

        return this.#stateClass[stateName];
    }

    setState(stateName, value) {
        this.#guardAgainstEmptyClassAttribute();

        this.#stateClass.set(stateName, value, this);
    }

    renderIfAffected(stateName, senderComponent) {
        if (this.#subscribedStates.includes(stateName) === false) {
            return;
        }

        if (this !== senderComponent || this === senderComponent && this.renderIfStateChangeOrigin === true) {
            this.#updateDOM();
        }
    }
}
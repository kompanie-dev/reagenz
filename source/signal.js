import { HtmlEscaper } from "./htmlEscaper.js";

export class Signal {
  #subscribers = new Set();
  #unsafeValue;
  #value;

  constructor(value) {
    this.set(value);
  }

  get() {
    return this.#value;
  }

  getUnsafe() {
    return this.#unsafeValue;
  }

  set(value) {
    this.#unsafeValue = value;
    this.#value = HtmlEscaper.escapeObject(value);

    for (const callback of this.#subscribers) {
      callback(value);
    }
  }

  subscribe(callback) {
    this.#subscribers.add(callback);
  }

  unsubscribe(callback) {
    this.#subscribers.delete(callback);
  }
}

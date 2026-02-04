import { Signal } from "../../../../index.js";

const STORAGE_KEY = "counter-value";

export class CounterStore {
    #initialized = false;

  constructor() {
    this.count = new Signal(0);
    this.loading = new Signal(true);
    this.saving = new Signal(false);
  }

  loadCount() {
    if (this.#initialized) return;
    this.#initialized = true;

    // Fake network load
    // Use fetch in real apps
    this.loading.set(true);

    setTimeout(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const value = raw != null ? JSON.parse(raw) : 0;
        this.count.set(Number.isFinite(value) ? value : 0);
      }
      catch {
        this.count.set(0);
      }
      finally {
        this.loading.set(false);
      }
    }, 350);
  }

  increment() {
    const next = (this.count.getUnsafe() ?? 0) + 1;
    this.count.set(next);
    this.#save(next);
  }

  decrement() {
    const next = (this.count.getUnsafe() ?? 0) - 1;
    this.count.set(next);
    this.#save(next);
  }

  #save(value) {
    // Fake network save+
    // Use fetch in real apps
    this.saving.set(true);

    setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      }
      finally {
        this.saving.set(false);
      }
    }, 300);
  }
}

import { Signal } from "../signal.js";

export class StateModule {
  static #componentRenderScheduled = new WeakMap();
  static #componentSubscriptions = new WeakMap();

  run({ component }) {
    if (component.state === undefined) {
      return;
    }

    this.dispose(component);

    const signals = this.#collectSignalsFromComponentState(component.state);

    this.#bindRerenderToSignalChanges(component, signals);
  }

  dispose(component) {
    const componentSubscriptions = StateModule.#componentSubscriptions.get(component);

    if (componentSubscriptions === undefined) {
      return;
    }

    for (const { signal, callback } of componentSubscriptions) {
      signal.unsubscribe(callback);
    }

    StateModule.#componentSubscriptions.delete(component);
    StateModule.#componentRenderScheduled.delete(component);
  }

  #bindRerenderToSignalChanges(component, signals) {
    const subscriptions = [];

    for (const signal of signals) {
      const callback = () => this.#scheduleRerender(component);
      signal.subscribe(callback);
      subscriptions.push({ signal, callback });
    }

    StateModule.#componentSubscriptions.set(component, subscriptions);
  }

  #collectSignalsFromComponentState(componentState) {
    const signals = [];
    const stateValues = Object.values(componentState);

    for (const value of stateValues) {
      if (value instanceof Signal) {
        signals.push(value);
      }
    }

    return signals;
  }

  #scheduleRerender(component) {
    const scheduled = StateModule.#componentRenderScheduled.get(component);

    if (scheduled === true) {
      return;
    }

    StateModule.#componentRenderScheduled.set(component, true);

    queueMicrotask(() => {
      StateModule.#componentRenderScheduled.set(component, false);

      if (component.isConnected === false) {
        return;
      }

      component.runModules();
    });
  }
}

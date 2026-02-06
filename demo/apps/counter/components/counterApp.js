import { Component, css, html } from "../../../../index.js";
import { counterStore } from "../state/state.js";
import { Modal } from "../../../../source/modal.js";
import { CounterModal } from "./counterModal.js";

export class CounterApp extends Component {
  state = {
    count: counterStore.count,
    loading: counterStore.loading,
    saving: counterStore.saving,
  };

  styles = css`
    .app {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
      margin: 40px auto;
      max-width: 720px;
      padding: 24px;
    }

    .header {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    h1 {
      font-size: 24px;
      margin: 0;
    }

    .counter {
      align-items: center;
      display: grid;
      gap: 12px;
      grid-template-columns: auto 1fr auto;
    }

    .value {
      background: #121212;
      border: 1px solid var(--border);
      border-radius: 8px;
      font-size: 28px;
      padding: 12px 16px;
      text-align: center;
    }

    button {
      background: var(--accent);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: #fff;
      cursor: pointer;
      font-size: 18px;
      padding: 10px 14px;
      min-width: 44px;
    }

    .dec {
      background: var(--accent-2);
    }

    .info {
      background: #333;
      border: 1px solid var(--border);
      
      color: var(--muted);
      cursor: pointer;
      font-size: 14px;
      height: 32px;
      width: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }

    .status {
      color: var(--muted);
      display: inline-flex;
      font-size: 13px;
      gap: 10px;
      margin-top: 12px;
    }
  `;

  connectedCallback() {
    super.connectedCallback?.();
    
    counterStore.loadCount();
  }

  render() {
    const loading = this.state.loading.get();
    const saving = this.state.saving.get();
    const value = this.state.count.get();
    return html`
      <div class="app">
        <div class="header">
          <h1>Counter</h1>
          <button class="info" @click="${this.showInfo}">i</button>
        </div>

        <div class="counter">
          <button class="dec" @click="${this.decrement}">−</button>
          <div class="value">${loading ? "…" : value}</div>
          <button class="inc" @click="${this.increment}">+</button>
        </div>

        <div class="status">
          ${loading ? "Loading value…" : ""}
          ${saving && !loading ? "Saving…" : ""}
        </div>
      </div>
    `;
  }

  increment() {
    counterStore.increment();
  }

  decrement() {
    counterStore.decrement();
  }

  showInfo() {
    Modal.show(CounterModal);
  }
}

customElements.define("counter-app", CounterApp);

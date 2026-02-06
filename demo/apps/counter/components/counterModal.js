import { Component, html, css } from "../../../../index.js";

export class CounterModal extends Component {
  header = "Counter"

  styles = css`
    counter-modal {
        .content {
            padding: 12px 0;
            font-size: 15px;
        }

        .actions {
            margin-top: 12px;
            display: flex;
            justify-content: flex-end;
            gap: 8px;
        }

        button {
            background: var(--accent);
            border: 1px solid var(--border);
            border-radius: 8px;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            padding: 8px 12px;
        }
    }
  `;

  render() {
    return html`
      <div class="content">
        <div>Counter incremented.</div>

        <div class="actions">
          <button type="submit" value="ok">OK</button>
        </div>
      </div>
    `;
  }
}

customElements.define("counter-modal", CounterModal);

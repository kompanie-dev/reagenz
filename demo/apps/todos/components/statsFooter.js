import { Component, css, html } from "../../../../index.js";
import { todoStore } from "../state/state.js";

export class StatsFooter extends Component {
  state = {
    todos: todoStore.todos,
  };

  styles = css`
    .stats {ich 
      align-items: center;
      background: #141414;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: var(--muted);
      display: inline-flex;
      font-size: 13px;
      gap: 10px;
      padding: 6px 10px;
    }

    .pill {
      color: var(--text);
    }
  `;

  render() {
    const todos = this.state.todos.get();
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const remaining = total - completed;

    return html`
      <div class="stats">
        <span class="pill">Total: ${total}</span>
        <span>Completed: ${completed}</span>
        <span>Remaining: ${remaining}</span>
      </div>
    `;
  }
}

customElements.define("stats-footer", StatsFooter);

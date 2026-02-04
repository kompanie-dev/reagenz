import { Component, css, html } from "../../../../index.js";

export class TodoItem extends Component {
  styles = css`
    .actions {
      align-items: center;
      display: flex;
      gap: 8px;
    }

    .done {
      color: var(--muted);
      text-decoration: line-through;
    }

    .item {
      align-items: center;
      background: #141414;
      border: 1px solid var(--border);
      border-radius: 10px;
      display: flex;
      gap: 12px;
      padding: 10px 12px;
    }

    .text {
      flex: 1 1 auto;
    }

    button.delete {
      background: var(--accent-2);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: #fff;
      cursor: pointer;
      padding: 8px 10px;
    }
  `;

  render() {
    const todo = this.todo;

    return html`
      <div class="item">
        <input type="checkbox" ${todo.completed ? "checked" : ""} @change="${this.onToggle}" />
        <div class="text ${todo.completed ? "done" : ""}">${todo.text}</div>
        <div class="actions">
          <button class="delete" @click="${this.onDelete}">Delete</button>
        </div>
      </div>
    `;
  }

  onDelete() {
    this.dispatchEvent(new CustomEvent("delete", { bubbles: true }));
  }

  onToggle() {
    this.dispatchEvent(new CustomEvent("toggle", { bubbles: true }));
  }
}

customElements.define("todo-item", TodoItem);

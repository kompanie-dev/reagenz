import { Component, css, html } from "../../../../index.js";
import { todoStore } from "../state/state.js";

export class AddTodoForm extends Component {
  styles = css`
    form {
      align-items: center;
      display: flex;
      gap: 8px;
    }

    input[type="text"] {
      background: #121212;
      border-radius: 8px;
      border: 1px solid var(--border);
      color: var(--text);
      flex: 1 1 auto;
      outline: none;
      padding: 10px 12px;
    }

    input[type="text"]::placeholder {
      color: var(--muted);
    }

    button {
      background: var(--accent);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: #fff;
      cursor: pointer;
      padding: 10px 14px;
    }
  `;

  render() {
    return html`
      <form @submit="${this.submit}">
        <input type="text" placeholder="Add a todo..." />
        <button type="submit">Add</button>
      </form>
    `;
  }

  submit(event) {
    event.preventDefault();
    const input = this.querySelector('input[type="text"]');
    const text = input.value.trim();

    if (text.length === 0) {
      return;
    }

    todoStore.addTodo(text);
    input.value = "";
  }
}

customElements.define("add-todo-form", AddTodoForm);

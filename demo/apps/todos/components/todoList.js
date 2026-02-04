import { Component, css, html } from "../../../../index.js";
import { todoStore } from "../state/state.js";

export class TodoList extends Component {
  state = {
    todos: todoStore.todos,
    search: todoStore.search,
  };

  styles = css`
    .empty {
      color: var(--muted);
      padding: 8px 0;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  `;

  render() {
    const query = this.state.search.get().toLowerCase();
    const filtered = this.state.todos.get().filter((t) =>
      t.text.toLowerCase().includes(query)
    );

    return html`
      <template if="${filtered.length === 0}">
        <template if="${query.length === 0}">
          <div class="empty">No todos yet. Add one above!</div>
        </template>

        <template if="${query.length !== 0}">
          <div class="empty">No todos found containing "${query}"</div>
        </template>
      </template>

      <ul>
        <template for="${filtered}" as="todo">
          <li>
            <todo-item .todo="@todo" @toggle="${this.onToggle}" @delete="${this.onDelete}"></todo-item>
          </li>
        </template>
      </ul>
    `;
  }

  onToggle(event) {
    const id = event?.target?.todo?.id;

    if (id !== undefined) {
      todoStore.toggleTodo(id);
    }
  }

  onDelete(event) {
    const id = event?.target?.todo?.id;

    if (id !== undefined) {
      todoStore.removeTodo(id);
    }
  }
}

customElements.define("todo-list", TodoList);

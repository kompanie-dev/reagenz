import { Component, css, html } from "../../../../index.js";
import { todoStore } from "../state/state.js";

export class TodoApp extends Component {
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
      gap: 12px;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    h1 {
      font-size: 24px;
      margin: 0;
    }

    .row {
      display: grid;
      gap: 10px;
      grid-template-columns: 1fr auto;
    }

    .list {
      margin-top: 16px;
    }

    .divider {
      border-top: 1px solid var(--border);
      margin: 16px 0;
    }
  `;

  render() {
    return html`
      <div class="app">
        <div class="header">
          <h1>Todos</h1>
          <stats-footer></stats-footer>
        </div>

        <div class="row">
          <add-todo-form></add-todo-form>
          <search-bar></search-bar>
        </div>

        <div class="divider"></div>

        <div class="list">
          <todo-list .todos="${todoStore.todos.get()}" .search="${todoStore.search.get()}"></todo-list>
        </div>
      </div>
    `;
  }
}

customElements.define("todo-app", TodoApp);

import { Component, css, html } from "../../../../index.js";
import { todoStore } from "../state/state.js";

export class SearchBar extends Component {
  styles = css`
    .search {
      align-items: center;
      display: flex;
    }

    input[type="search"] {
      border: 1px solid var(--border);
      border-radius: 8px;
      background: #121212;
      color: var(--text);
      outline: none;
      padding: 10px 12px;
      width: 220px;
    }

    input[type="search"]::placeholder {
      color: var(--muted);
    }
  `;

  render() {
    return html`
      <div class="search">
        <input type="search" placeholder="Search" @input="${this.onInput}" />
      </div>
    `;
  }

  onInput(event) {
    const value = event?.target?.value ?? "";

    todoStore.setSearch(value);
  }
}

customElements.define("search-bar", SearchBar);

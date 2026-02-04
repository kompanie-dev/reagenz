import { Signal } from "../../../../index.js";

export class TodoStore {
  constructor() {
    this.nextId = 1;
    this.search = new Signal("");
    this.todos = new Signal([]);
  }

  addTodo(text) {
    const todo = { id: this.nextId++, text, completed: false };

    this.todos.set([todo, ...this.todos.getUnsafe()]);
  }

  removeTodo(id) {
    const updated = this.todos.getUnsafe().filter(todo => todo.id !== id);

    this.todos.set(updated);
  }

  toggleTodo(id) {
    const updated = this.todos.getUnsafe().map(todo => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));

    this.todos.set(updated);
  }

  setSearch(query) {
    this.search.set(query);
  }
}

import { App } from "../../../index.js";

import { AddTodoForm } from "./components/addTodoForm.js";
import { SearchBar } from "./components/searchBar.js";
import { StatsFooter } from "./components/statsFooter.js";
import { TodoApp } from "./components/todoApp.js";
import { TodoItem } from "./components/todoItem.js";
import { TodoList } from "./components/todoList.js";

App.start({
  mainComponent: TodoApp,
  containerElement: document.getElementById("app-todos"),
  components: [AddTodoForm, SearchBar, StatsFooter, TodoApp, TodoItem, TodoList]
});

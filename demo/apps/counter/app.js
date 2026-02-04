import { App } from "../../../index.js";

import { CounterApp } from "./components/counterApp.js";

App.start({
  mainComponent: CounterApp,
  containerElement: document.getElementById("app-counter"),
  components: [CounterApp]
});

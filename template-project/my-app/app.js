import { App, Store } from "@kompanie/reagenz";

import { myAppNetworkMiddleware } from "./store/myapp.middlewares.network.js";
import { myAppInitialState, myAppReducer } from "./store/myapp.reducer.js";

import { AppRoot } from "./components/appRoot.js";
import { CounterPage } from "./components/counterPage.js";
import "./components/aboutPage.js";

App.start({
	mainComponent: AppRoot,
	container: document.getElementById("my-app-container"),
	components: [
		AppRoot,
		CounterPage
	],
	dependencies: {
		logger: console,
		store: new Store(myAppReducer, myAppInitialState, [myAppNetworkMiddleware])
	},
	webComponents: {
		// "example-web-component": ExampleWebComponent
	}
});

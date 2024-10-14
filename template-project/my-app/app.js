import { App, Store } from "@kompanie/reagenz";

import { myAppNetworkMiddleware } from "./store/myapp.middlewares.network.js";
import { myAppInitialState, myAppReducer } from "./store/myapp.reducer.js";

import { AppRoot } from "./components/appRoot.js";
import { CounterPage } from "./components/counterPage.js";
import "./components/aboutPage.js";

App.create({
	root: AppRoot,
	container: document.getElementById("my-app-container"),
	component: 	[
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

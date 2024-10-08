import { Injector, Launcher, Store } from "@kompanie/reagenz";

import { myAppNetworkMiddleware } from "./store/myapp.middlewares.network.js";
import { myAppInitialState, myAppReducer } from "./store/myapp.reducer.js";

import { AppRoot } from "./components/appRoot.js";
import { CounterPage } from "./components/counterPage.js";
import "./components/aboutPage.js";

// Registers non-Reagenz Web Components
/*
WebComponentUtilities.defineComponents({
	"example-web-component": ExampleWebComponent
});
*/

// Configures the dependency injection of the notes application
// You don't need to add components here that don't use any dependencies
Injector.injectDependencies(
	{
		logger: console,
		store: new Store(myAppReducer, myAppInitialState, [myAppNetworkMiddleware])
	},
	[
		AppRoot,
		CounterPage
	]
);

// Adds the main component to the DOM and starts the application.
Launcher.startApp(
	AppRoot,
	document.getElementById("my-app-container")
);

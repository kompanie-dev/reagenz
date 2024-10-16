import { App, Store } from "@kompanie/reagenz";

import { notesNetworkMiddleware } from "./store/notes.middlewares.network.js";
import { notesInitialState, notesReducer } from "./store/notes.reducer.js";
import { loggingMiddleware } from "../shared/middlewares/loggingMiddleware.js";

import { NotesMain } from "./components/notesMain.js";

import { ExampleWebComponent } from "./webComponents/exampleWebComponent.js";

App.start({
	mainComponent: NotesMain,
	container: document.getElementById("note-app-container"),
	components: [
		NotesMain
	],
	dependencies: {
		logger: console,
		store: new Store(notesReducer, notesInitialState, [loggingMiddleware, notesNetworkMiddleware])
	},
	webComponents: { "example-web-component": ExampleWebComponent },
});

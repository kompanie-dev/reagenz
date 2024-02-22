import { Injector, Launcher, Registry, Store } from "../../index.js";

import { notesNetworkMiddleware } from "./store/notes.middlewares.network.js";
import { reaNoteReducer, reaNoteInitialState } from "./store/notes.reducer.js";
import { loggingMiddleware } from "../shared/middlewares/loggingMiddleware.js";

import { NotesMain } from "./components/notesMain.js";

import { ExampleWebComponent } from "./webComponents/exampleWebComponent.js";

// Registers a non-Reagenz Web Component
Registry.registerWebComponents({
    "example-web-component": ExampleWebComponent
});

// Configures the dependency injection of the notes application
// You don't need to add components here that don't use any dependencies
Injector.injectDependencies(
    {
        logger: console,
        store: new Store(reaNoteReducer, reaNoteInitialState, [loggingMiddleware, notesNetworkMiddleware])
    },
    [NotesMain]
);

// Adds the main component to the DOM and starts the application.
Launcher.startApp(
    NotesMain,
    document.getElementById("note-app-container")
);
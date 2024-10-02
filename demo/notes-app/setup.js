import { Injector, Launcher, Store, WebComponentUtilities } from "@kompanie/reagenz";

import { notesNetworkMiddleware } from "./store/notes.middlewares.network.js";
import { notesInitialState, notesReducer } from "./store/notes.reducer.js";
import { loggingMiddleware } from "../shared/middlewares/loggingMiddleware.js";

import { NotesMain } from "./components/notesMain.js";

import { ExampleWebComponent } from "./webComponents/exampleWebComponent.js";

// Registers a non-Reagenz Web Component
WebComponentUtilities.defineComponents({
    "example-web-component": ExampleWebComponent
});

// Configures the dependency injection of the notes application
// You don't need to add components here that don't use any dependencies
Injector.injectDependencies(
    {
        logger: console,
        store: new Store(notesReducer, notesInitialState, [loggingMiddleware, notesNetworkMiddleware])
    },
    [NotesMain]
);

// Adds the main component to the DOM and starts the application.
Launcher.startApp(
    NotesMain,
    document.getElementById("note-app-container")
);
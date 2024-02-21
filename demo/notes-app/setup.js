import { Injector, Launcher, Registry, Store } from "../../index.js";

import { reaNoteNetworkMiddleware } from "./store/rea-note.middlewares.network.js";
import { reaNoteReducer, reaNoteInitialState } from "./store/rea-note.reducer.js";
import { reaNoteLoggingMiddleware } from "./store/rea-note.middlewares.logging.js";

import { ReaNoteMainComponent } from "./components/rea-note-main.component.js";

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
        store: new Store(reaNoteReducer, reaNoteInitialState, [reaNoteLoggingMiddleware, reaNoteNetworkMiddleware])
    },
    [ReaNoteMainComponent]
);

// Adds the main component to the DOM and starts the application.
Launcher.startApp(
    ReaNoteMainComponent,
    document.getElementById("note-app-container")
);
import { Reagenz } from "../../index.js";

import { ReaNoteMainComponent } from "./components/rea-note-main.component.js";
import { reaNoteStore } from "./store/rea-note.store.js";

import { ExampleWebComponent } from "./webComponents/exampleWebComponent.js";

// Registers a non-Reagenz Web Component
Reagenz.registerWebComponents({
    "example-web-component": ExampleWebComponent
});

// Configures the dependency injection of the notes application
// You don't need to add components here that don't use any dependencies
Reagenz.injectDependencies(
    {
        logger: console,
        store: reaNoteStore
    },
    [ReaNoteMainComponent]
);

// Adds the main component to the DOM and starts the application.
Reagenz.startApp(
    ReaNoteMainComponent,
    document.getElementById("note-app-container")
);
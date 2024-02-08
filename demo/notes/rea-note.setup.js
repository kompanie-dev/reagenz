import { Injector, Launcher, Registry } from "../../index.js";

import { ReaNoteMainComponent } from "./components/rea-note-main.component.js";
import { reaNoteStore } from "./store/rea-note.store.js";

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
        store: reaNoteStore
    },
    [ReaNoteMainComponent]
);

// Adds the main component to the DOM and starts the application.
Launcher.startApp(
    ReaNoteMainComponent,
    document.getElementById("note-app-container")
);
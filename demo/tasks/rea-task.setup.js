import { Injector, Launcher, Store } from "../../index.js";

import "../shared/components/loadingIconComponent.js";

import "./components/rea-task-task-list-page.component.js";
import { ReaTaskAboutPageComponent } from "./components/rea-task-about-page.component.js";
import { ReaTaskMainComponent } from "./components/rea-task-main.component.js";
import { ReaTaskSearchBarComponent } from "./components/rea-task-search-bar.component.js";
import { ReaTaskTaskDetailPageComponent } from "./components/rea-task-task-detail-page.component.js";
import { ReaTaskTaskItemComponent } from "./components/rea-task-task-item.component.js";
import { ReaTaskTaskListComponent } from "./components/rea-task-task-list.component.js";
import { ReaTaskTimeDisplayComponent } from "./components/rea-task-time-display.component.js";

import { updateRoute } from "./store/rea-task.actions.js";

import { reaTaskLoggingMiddleware } from "./store/rea-task.middlewares.logging.js";
import { reaTaskNetworkMiddleware } from "./store/rea-task.middlewares.network.js";
import { reaTaskReducer, reaTaskInitialState } from "./store/rea-task.reducer.js";

const reaTaskStore = new Store(reaTaskReducer, reaTaskInitialState, [reaTaskLoggingMiddleware, reaTaskNetworkMiddleware]);

if (location.hash === "") {
    location.hash = "#/";
}

window.addEventListener(
    "popstate",
    () => reaTaskStore.dispatch(updateRoute(location.hash))
);

// Configures the dependency injection of the tasks application
// You don't need to add components here that don't use any dependencies
// As you can see ReaTaskTaskListPageComponent and the shared LoadingIconComponent is not listed here
Injector.injectDependencies(
    {
        logger: console,
        store: reaTaskStore
    },
    [
        ReaTaskAboutPageComponent,
        ReaTaskMainComponent,
        ReaTaskSearchBarComponent,
        ReaTaskTaskDetailPageComponent,
        ReaTaskTaskItemComponent,
        ReaTaskTaskListComponent,
        ReaTaskTimeDisplayComponent
    ]
);

// Adds the main component to the DOM and starts the application.
Launcher.startApp(
    ReaTaskMainComponent,
    document.getElementById("task-app-container")
);
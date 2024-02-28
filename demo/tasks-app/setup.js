import { Injector, Launcher, Store } from "@kompanie/reagenz";

import "../shared/components/loadingIconComponent.js";

import "./components/tasksTaskListPage.js";
import { TasksAboutPage } from "./components/tasksAboutPage.js";
import { TasksMain } from "./components/tasksMain.js";
import { TasksSearchBar } from "./components/tasksSearchBar.js";
import { TasksTaskDetailPage } from "./components/tasksTaskDetailPage.js";
import { TasksTaskItem } from "./components/tasksTaskItem.js";
import { TasksTaskList } from "./components/tasksTaskList.js";
import { TasksTimeDisplay } from "./components/tasksTimeDisplay.js";

import { updateRoute } from "./store/tasks.actions.js";

import { tasksNetworkMiddleware } from "./store/tasks.middlewares.network.js";
import { tasksReducer, tasksInitialState } from "./store/tasks.reducer.js";
import { loggingMiddleware } from "../shared/middlewares/loggingMiddleware.js";

const reaTaskStore = new Store(tasksReducer, tasksInitialState, [loggingMiddleware, tasksNetworkMiddleware]);

if (location.hash === "") {
    location.hash = "#/";
}

window.addEventListener(
    "popstate",
    () => reaTaskStore.dispatch(updateRoute(location.hash))
);

// Configures the dependency injection of the tasks application
// You don't need to add components here that don't use any dependencies
// As you can see TasksTaskListPageComponent and the shared LoadingIconComponent is not listed here
Injector.injectDependencies(
    {
        logger: console,
        store: reaTaskStore
    },
    [
        TasksAboutPage,
        TasksMain,
        TasksSearchBar,
        TasksTaskDetailPage,
        TasksTaskItem,
        TasksTaskList,
        TasksTimeDisplay
    ]
);

// Adds the main component to the DOM and starts the application.
Launcher.startApp(
    TasksMain,
    document.getElementById("task-app-container")
);
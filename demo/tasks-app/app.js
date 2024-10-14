import { App, Store } from "@kompanie/reagenz";

import "../shared/components/loadingIconComponent.js";

import "./components/tasksAboutDialog.js";
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
import { tasksInitialState, tasksReducer } from "./store/tasks.reducer.js";
import { loggingMiddleware } from "../shared/middlewares/loggingMiddleware.js";

if (location.hash === "") {
	location.hash = "#/";
}

const reaTaskStore = new Store(tasksReducer, tasksInitialState, [
	loggingMiddleware,
	tasksNetworkMiddleware,
]);

window.addEventListener(
	"popstate",
	() => reaTaskStore.dispatch(updateRoute(location.hash))
);

App.create({
	root: TasksMain,
	container: document.getElementById("task-app-container"),
	components: [
		TasksAboutPage,
		TasksMain,
		TasksSearchBar,
		TasksTaskDetailPage,
		TasksTaskItem,
		TasksTaskList,
		TasksTimeDisplay
	],
	dependencies: {
		logger: console,
		store: reaTaskStore
	}
});

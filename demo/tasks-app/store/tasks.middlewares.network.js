import { loadEntriesSuccess, saveEntriesSuccess } from "./tasks.actions.js";

export const tasksNetworkMiddleware = (store, next, action) => {
	switch (action.type) {
		case "TASK_LOAD_ENTRIES_REQUEST":
			// setTimeout is used here to simulate network latency.
			// You don't need this in a real app.
			setTimeout(
				() => {
					const entryJson = localStorage.getItem("task_entries");
					const entries = JSON.parse(entryJson) ?? [];

					store.dispatch(loadEntriesSuccess(entries));
				}, 1000);
			break;

		case "TASK_SAVE_ENTRIES_REQUEST":
			// setTimeout is used here to simulate network latency.
			// You don't need this in a real app.
			setTimeout(
				() => {
					const entriesString = JSON.stringify(store.state.entries);
					localStorage.setItem("task_entries", entriesString);

					store.dispatch(saveEntriesSuccess());
				},
				1000);
			break;

		// No Default
	}

	next();
};

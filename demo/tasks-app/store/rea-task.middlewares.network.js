import { loadEntriesSuccess, saveEntriesSuccess } from "./rea-task.actions.js";

export const reaTaskNetworkMiddleware = (store, next, action) => {
    switch (action.type) {
        case "TASK_LOAD_ENTRIES_REQUEST": {
                setTimeout(
                    () => {
                        const entryJson = localStorage.getItem("task_entries");
                        const entries = JSON.parse(entryJson) ?? [];

                        store.dispatch(loadEntriesSuccess(entries));
                    }, 1000);
            }
            break;

        case "TASK_SAVE_ENTRIES_REQUEST": {
                setTimeout(
                    () => {
                        const entriesString = JSON.stringify(store.state.entries);
                        localStorage.setItem("task_entries", entriesString);

                        store.dispatch(saveEntriesSuccess());
                    },
                    1000);
            }
            break;
    }

    return next();
};
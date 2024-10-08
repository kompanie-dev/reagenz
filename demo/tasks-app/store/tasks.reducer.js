export const tasksInitialState = {
	entries: [],
	isLoading: true,
	route: "",
	searchValue: "",
	selectedEntryId: 0,
	time: new Date().getTime()
};

export function tasksReducer(action, state = tasksInitialState) {
	switch (action.type) {
		case "ROUTE_UPDATE": {
			const selectedEntryId = action.route.replace("#/tasks/", "");

			return { ...state, route: action.route, selectedEntryId };
		}

		case "TASK_ADD":
			return { ...state, entries: [...state.entries, { done: false, id: action.id, text: action.text }] };

		case "TASK_REMOVE": {
			const entries = [...state.entries];
			const indexToRemove = state.entries.findIndex(entry => entry.id === action.id);
			entries.splice(indexToRemove, 1);

			return { ...state, entries };
		}

		case "TASK_UPDATE_DONE": {
			const entries = [...state.entries];
			const indexToUpdate = state.entries.findIndex(entry => entry.id === action.id);
			entries[indexToUpdate].done = action.done;

			return { ...state, entries };
		}

		case "TASK_LOAD_ENTRIES_REQUEST":
			return { ...state, isLoading: true };

		case "TASK_LOAD_ENTRIES_SUCCESS":
			return { ...state, entries: action.entries, isLoading: false };

		case "TASK_SET_ENTRIES":
			return { ...state, entries: action.entries };

		case "TASK_SET_LOADING":
			return { ...state, isLoading: action.isLoading };

		case "TASK_SET_SEARCHVALUE":
			return { ...state, searchValue: action.searchValue };

		case "TASK_SET_TIME":
			return { ...state, time: action.time };

		default:
			return state;
	}
}

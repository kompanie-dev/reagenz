export const notesInitialState = {
	notes: ""
};

export function notesReducer(action, state = notesInitialState) {
	switch (action.type) {
		case "NOTE_UPDATE": {
			return { ...state, notes: action.notes };
		}

		case "NOTE_LOAD_SUCCESS": {
			return { ...state, notes: action.notes };
		}

		default:
			return state;
	}
}

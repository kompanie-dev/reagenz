export const reaNoteInitialState = {
    notes: ""
};

export function reaNoteReducer(state = reaNoteInitialState, action) {
    switch (action.type) {
        case "NOTE_UPDATE": {
            return { ...state, notes: action.notes };
        }

        case "NOTE_LOAD_SUCCESS": {
            return { ...state, notes: action.notes };
        }
    }

    return state;
}
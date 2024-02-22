import { loadNotesSuccess, saveNotesSuccess } from "./notes.actions.js";

export const notesNetworkMiddleware = (store, next, action) => {
    switch (action.type) {
        case "NOTE_LOAD_REQUEST": {
                setTimeout(
                    () => {
                        const notes = localStorage.getItem("notes");

                        store.dispatch(loadNotesSuccess(notes));
                    }, 100);
            }
            break;

        case "NOTE_SAVE_REQUEST": {
                setTimeout(
                    () => {
                        localStorage.setItem("notes", action.notes);

                        store.dispatch(saveNotesSuccess());
                    },
                    100);
            }
            break;
    }

    next();
};
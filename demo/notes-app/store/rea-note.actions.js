export const updateNote = (text) => ({ type: "NOTE_UPDATE", text });



export const loadNotesRequest = () => ({ type: "NOTE_LOAD_REQUEST" });

export const loadNotesSuccess = (notes) => ({ type: "NOTE_LOAD_SUCCESS", notes });



export const saveNotesRequest = (notes) => ({ type: "NOTE_SAVE_REQUEST", notes });

export const saveNotesSuccess = () => ({ type: "NOTE_SAVE_SUCCESS" });
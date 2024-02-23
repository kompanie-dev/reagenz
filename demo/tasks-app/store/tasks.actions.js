export const addTask = (id, text) => ({ type: "TASK_ADD", id, text });

export const removeTask = (id) => ({ type: "TASK_REMOVE", id });

export const updateTaskDone = (id, done) => ({ type: "TASK_UPDATE_DONE", id, done });



export const setEntries = (entries) => ({ type: "TASK_SET_ENTRIES", entries });

export const setLoading = (isLoading) => ({ type: "TASK_SET_LOADING", isLoading });

export const setSearchValue = (searchValue) => ({ type: "TASK_SET_SEARCHVALUE", searchValue });

export const setTime = (time) => ({ type: "TASK_SET_TIME", time });



export const loadEntriesRequest = () => ({ type: "TASK_LOAD_ENTRIES_REQUEST" });

export const loadEntriesFailure = (error) => ({ type: "TASK_LOAD_ENTRIES_FAIL", error });

export const loadEntriesSuccess = (entries) => ({ type: "TASK_LOAD_ENTRIES_SUCCESS", entries });



export const saveEntriesRequest = (entries) => ({ type: "TASK_SAVE_ENTRIES_REQUEST", entries });

export const saveEntriesFailure = (error) => ({ type: "TASK_SAVE_ENTRIES_FAIL", error });

export const saveEntriesSuccess = () => ({ type: "TASK_SAVE_ENTRIES_SUCCESS" });



export const updateRoute = (route) => ({ type: "ROUTE_UPDATE", route });
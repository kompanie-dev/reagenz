import { loadCountSuccess, saveCountSuccess } from "./myapp.actions.js";

export const myAppNetworkMiddleware = (store, next, action) => {
    switch (action.type) {
        case "COUNT_LOAD_REQUEST": {
                setTimeout(
                    () => {
                        const storageItem = localStorage.getItem("count") ?? 0;
                        const count = Number.parseInt(storageItem);

                        store.dispatch(loadCountSuccess(count));
                    }, 100);
            }
            break;

        case "COUNT_SAVE_REQUEST": {
                setTimeout(
                    () => {
                        localStorage.setItem("count", store.state.count);

                        store.dispatch(saveCountSuccess());
                    },
                    100);
            }
            break;
    }

    next();
};
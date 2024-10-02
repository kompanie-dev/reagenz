import { environment } from "../../environment.js";

export const loggingMiddleware = (store, next, action) => {
    if (environment.enableActionLogging === true) {
        console.info(action);
    }

    next();
};
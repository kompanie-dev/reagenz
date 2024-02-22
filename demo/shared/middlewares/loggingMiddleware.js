import { environment } from "../../environment.js";

export const loggingMiddleware = (store, next, action) => {
    if (environment.enableActionLogging === true) {
        console.log(action);
    }

    next();
};
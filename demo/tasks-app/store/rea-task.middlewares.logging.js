import { environment } from "../../environment.js";

export const reaTaskLoggingMiddleware = (store, next, action) => {
    if (environment.enableActionLogging === true) {
        console.log(action);
    }

    next();
};
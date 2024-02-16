import { environment } from "../../environment.js";

export const reaNoteLoggingMiddleware = (store, next, action) => {
    if (environment.enableActionLogging === true) {
        console.log(action);
    }

    return next();
};
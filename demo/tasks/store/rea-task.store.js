import { Store } from "../../../index.js";
import { reaTaskLoggingMiddleware } from "./rea-task.middlewares.logging.js";
import { reaTaskNetworkMiddleware } from "./rea-task.middlewares.network.js";
import { reaTaskReducer, reaTaskInitialState } from "./rea-task.reducer.js";

export const reaTaskStore = new Store(reaTaskReducer, reaTaskInitialState, [reaTaskLoggingMiddleware, reaTaskNetworkMiddleware]);
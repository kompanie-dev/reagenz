import { Store } from "../../../index.js";
import { reaTaskNetworkMiddleware } from "./rea-task.middlewares.network.js";
import { reaTaskReducer, reaTaskInitialState } from "./rea-task.reducer.js";

export const reaTaskStore = new Store(reaTaskReducer, reaTaskInitialState, [reaTaskNetworkMiddleware]);
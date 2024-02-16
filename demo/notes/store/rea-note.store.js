import { Store } from "../../../index.js";
import { reaNoteNetworkMiddleware } from "./rea-note.middlewares.network.js";
import { reaNoteReducer, reaNoteInitialState } from "./rea-note.reducer.js";
import { reaNoteLoggingMiddleware } from "./rea-note.middlewares.logging.js";

export const reaNoteStore = new Store(reaNoteReducer, reaNoteInitialState, [reaNoteLoggingMiddleware, reaNoteNetworkMiddleware]);
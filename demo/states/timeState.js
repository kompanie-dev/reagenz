import { ApplicationState } from "../../index.js";

export class TimeState extends ApplicationState {
    constructor(store) {
        super(store);
    }

    time = "NOW";
}
import { ApplicationState } from "../../index.js";

export class CounterState extends ApplicationState {
    constructor(store) {
        super(store);
    }

    count = 0;
}
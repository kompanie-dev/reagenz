import { ApplicationState } from "../../index.js";

export class ColorState extends ApplicationState {
    constructor(store) {
        super(store);
    }

    color = "#ff0000";
}
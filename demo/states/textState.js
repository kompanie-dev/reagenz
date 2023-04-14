import { ApplicationState } from "../../index.js";

export class TextState extends ApplicationState {
    constructor(store) {
        super(store);
    }

    text = "my text";
}
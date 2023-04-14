import { ApplicationState } from "../../index.js";

export class TransformationState extends ApplicationState {
    constructor(store) {
        super(store);
    }

    position = { x: 1, y: 2 };
    rotation = { x: 1, y: 2 };
    scale = { x: 1, y: 2 };
}
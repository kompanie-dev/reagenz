import { Globals } from "./globals.js";

export class Reagenz {
    static registerComponents(...componentDefinitions) {
        for (const definition of componentDefinitions) {
            customElements.define(definition[0], definition[1]);
        }
    }

    static async startApp(appComponentClass, states, loadStore = true) {
        for (const state of states) {
            if (loadStore === true) {
                await state.load();
            }
            
            Globals.states[state.constructor.name] = state;
        }

        const appComponent = new appComponentClass();
        document.body = document.createElement("body");
        document.body.append(appComponent);
    }
}
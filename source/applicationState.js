export class ApplicationState {
    #store;
    #subscribedComponents = [];

    constructor(store) {
        this.#store = store;
    }

    async load() {
        const loadedObject = await this.#store.load() ?? {};
        const objectKeys = Object.keys(loadedObject);

        for (const key of objectKeys) {
            this[key] = loadedObject[key];
        }
    }

    async save() {
        this.#store.save(this);
    }

    addSubscriber(component) {
        this.#subscribedComponents.push(component);
    }

    removeSubscriber(component) {
        const index = this.#subscribedComponents.indexOf(component);

        if (index === -1) {
            return;
        }

        this.#subscribedComponents.splice(index, 1);
    }

    set(stateName, value, senderComponent) {
        if (this[stateName] === value) {
            return;
        }
        
        this[stateName] = value;
        this.save();

        for (const component of this.#subscribedComponents) {
            component.renderIfAffected(stateName, senderComponent);
        }
    }
}
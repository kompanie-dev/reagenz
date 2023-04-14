export class LocalStorageStore {
    #keyName;

    constructor(keyName) {
        this.#keyName = keyName;
    }

    async load() {
        const json = localStorage.getItem(this.#keyName);

        return JSON.parse(json);
    }

    async save(json) {
        const jsonString = JSON.stringify(json);

        localStorage.setItem(this.#keyName, jsonString);
    }
}
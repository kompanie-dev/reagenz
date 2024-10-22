# Reagenz Store Documentation

Reagenz uses a store based system for it's state management.
Each application has it's own store, which contains functions for updating and selecting the state and the state object itself.

![Store flow](./assets/StoreFlow.drawio.svg)

## Actions

Actions are functions that create an object which defines what should be done.
It needs at least a `type` property.
An action creating a new task entry inside a TODO app could look like this:

```js
export const addTask = (text) => ({ type: "TASK_ADD", text });
```

Components and services use these actions to tell the store what should be done.

```js
import { Component } from "@kompanie/reagenz";
import { addTask } from "../store/test.actions.js";

export class MainPage extends Component {
    render([count]) {
        return /*html*/`
            <input type="text">
            <button $click="clickCallback">Add task</button>
        `;
    }

    clickCallback() {
        const taskText = this.querySelector("input").value;

        this.dispatch(addTask(taskText));
    }
}
```

## Store

The store is the center piece of the state management.
It contains the state object, takes the Action objects and passes them to the middlewares and reducers.
All Reagenz components subscribe to the store automatically and wait for actions getting dispatched.
Once an action got dispatched and the reducer is finished, all components get notified.

## Reducer

A reducer is responsible for updating the state object.
It has to do it in a predictable and repeatable way.
That means if the state and the dispatched action are the same, the resulting new state should also be the same.
This makes state management very easy to test.

This very simple example of a reducer shows how when `TASK_ADD` is executed in the reducer,
a new copy of the state is created and the new entry get's added.
If the action type doesn't get handled by the reducer, the state needs to be returned as-is.
There are actions that will only be handled by middlewares and not the reducer.

```js
export const initialState = {
    entries: []
};

export function reducer(action, state = initialState) {
    switch (action.type) {
        case "TASK_ADD":
            return { ...state, entries: [...state.entries, { text: action.text }] };

        default:
            return state;
    }
}
```

## Middlewares

So if a reducer needs to return the same state if the state and action are the same, how can a store system deal with unpredictable and changing data?
That's what middlewares are for.
Middlewares are great for networking or other calls which can fail or change each time they execute.

The following example shows a simplified network loading and saving example.
As you can see it listens to the action types `TASK_LOAD_ENTRIES_REQUEST` and `TASK_SAVE_ENTRIES_REQUEST`.
Depending on if the requests succeded or failed, different actions get dispatched.

If for whatever reason you want to stop the execution of the middleware chain and the reducer, you can skip calling next().

If you wanted to complete this you would need to listen to the success and failure action types in the reducer.

```js
import { loadEntriesFail, loadEntriesSuccess, saveEntriesFail, saveEntriesSuccess } from "./example.actions.js";

export const tasksNetworkMiddleware = (store, next, action) => {
    switch (action.type) {
        case "TASK_LOAD_ENTRIES_REQUEST":
            try {
                // Do your networking stuff
                store.dispatch(loadEntriesSuccess(entries));
            }
            catch {
                // It failed, let's inform the reducer about this
                store.dispatch(loadEntriesFail());
            }
            break;

        case "TASK_SAVE_ENTRIES_REQUEST":
            try {
                // Do your networking stuff
                store.dispatch(saveEntriesSuccess());
            }
            catch {
                // It failed, let's inform the reducer about this
                store.dispatch(saveEntriesFail());
            }
            break;
    }

    next();
};

```

## Selectors

Now we can update the state and communicate with services.
How do you get data from the store?
Selectors are used for retrieving data from the store.

While it seems complicated at first to use extra functions for this instead of accessing the state directly, there are some benefits:

* Abstraction: Your component doesn't need to know the exact structure of the state anymore
* Performance: Since the change detection of Reagenz is comparing JavaScript objects, smaller objects = faster comparisons
* Re-using the same data without copying it

The following two selectors show how the same data (entries in this case) can be used to cover different use cases.

```js
export const getEntries = (state) => state.entries;

export const searchEntries = (state) => state.entries.filter(item => item.text.toLowerCase().includes(state.searchValue.toLowerCase()));
```

If you want to access the selector data in your component, you first have to define them in the constructor.
After that they will be available in the render function as destructered array.

```js
import { Component } from "@kompanie/reagenz";
import { searchEntries } from "../store/tasks.selectors.js";

export class TaskList extends Component {
    constructor() {
        super([searchEntries]);
    }

    render([entries]) {
        return /*html*/`
            <x-for array='${JSON.stringify(entries)}'>
                <div>@item(text)</div>
            </x-for>
        `;
    }
}

customElements.define("task-list", TaskList);
```

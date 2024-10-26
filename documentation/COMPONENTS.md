# Reagenz Documentation

## Table of contents

- [Reagenz Documentation](#reagenz-documentation)
	- [Table of contents](#table-of-contents)
	- [Setting up an application](#setting-up-an-application)
		- [HTML](#html)
		- [app.js](#appjs)
	- [Styling](#styling)
	- [Attribute helper functions](#attribute-helper-functions)
	- [Event system](#event-system)
	- [Dependency Injection](#dependency-injection)
	- [Templating](#templating)
		- [x-if: Conditional rendering](#x-if-conditional-rendering)
		- [x-for: Iterating arrays](#x-for-iterating-arrays)
	- [Dialog System](#dialog-system)
	- [State Management (Store)](#state-management-store)
		- [Actions](#actions)
		- [Store](#store)
		- [Reducer](#reducer)
		- [Middlewares](#middlewares)
		- [Selectors](#selectors)
			- [Change detection](#change-detection)
		- [Store access](#store-access)

## Setting up an application

### HTML

Every Reagenz app should have its own JavaScript file setting up the application.
Usually you want to name it `app.js`.
This file is the one which gets added to the HTML.

```html
<script src="./my-app-name/app.js" type="module"></script>
```

### app.js

In the app.js file you can configure your entry point, the HTML element where your app should be attached to, your dependencies and your components.

```js
import "./components/myExampleComponent.js";
import { App, Store } from "@kompanie/reagenz";
import { MainPage } from "./components/mainPage.js";
import { ExampleWebComponent } from "./webComponents/exampleWebComponent.js";

App.start({
    // The main entry component of your app
    mainComponent: MainPage,

    // The container element to which your main component gets attached to
    container: document.getElementById("my-app-container"),

    // Add all components which should get dependencies injected here
    // Components which don't access dependencies can be imported like myExampleComponent.js in this example
    components: [
        MainPage
    ],

    // The dependencies which get injected into the components
    // They are available as this.dependencies.dependencyName
    dependencies: {
        logger: console,
        store: new Store(myReducer, myInitialState, [myMiddlewareA, myMiddlewareB])
    },

    // Add non-Reagenz web components this way
    webComponents: { "example-web-component": ExampleWebComponent }
});
```

## Styling

Reagenz is fully compatible with popular CSS frameworks which work by adding classes to HTML elements.
Sometimes you might want to apply CSS only for one component though.
Reagenz has a `styles` property for CSS.
All CSS which is assigned to the styles property gets added in a styles tag inside the innerHTML of the component.
This also means that you could write CSS rules that affect other components.
To prevent this it's recommended to scope the CSS by adding the component tag name around the CSS rules.

```js
import { Component } from "@kompanie/reagenz";

export class MainPage extends Component {
    styles = /*css*/`
        main-page {
            div {
                color: red;
            }
        }
    `;

    render() {
        return /*html*/`
            <div>Hello World!</div>
        `;
    }
}

customElements.define("main-page", MainPage);
```

## Attribute helper functions

Every Reagenz component has access to attribute helper functions.
Those were made to be similar to the [getAttribute function](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) which every HTML element has by default.
This also means that every helper function returns `null` if the attribute does not exist or can not be converted into the respective data type, instead of throwing an error.
These helper functions are useful for accessing the attributes of the component in the `render` function.

`getArrayAttribute(attributeName)`

`getBoolAttribute(attributeName)`

`getNumberAttribute(attributeName)`

`getObjectAttribute(attributeName)`


## Event system

Since attaching event handlers using attributes like `onclick` is messy if you want to use it in Web Components and `addAddEventListener` is annoying, Reagenz has a small custom event system.

If we take our component from before we can handle the `click` event by using the `$click` attribute.
The `$click` attribute specifies the name of the function which should be executed on the component.
If you want to handle the `change` event, you can use `$change="..."`, etc.
Every event supported by [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) can be bound by using the $-prefix.

Reagenz will also warn you if you are trying to connect an event attribute to a non-existing function, like the `$input` attribute does in the example below.

```js
import { Component } from "@kompanie/reagenz";

export class MainPage extends Component {
    render() {
        return /*html*/`
            <button $click="clickCallback" $input="nonExistingFunction">Click me</button>
        `;
    }

    clickCallback(event) {
        console.log("Button got clicked", event);
    }
}

customElements.define("main-page", MainPage);
```

`onConnect` and `onDisconnect` are executed when the component gets added to or removed from the DOM, just like the functions included in the Web Components standard called `connectedCallback()` and `disconnectedCallback()`.

The main advantage in using the Reagenz functions is that you don't need to call `super.connectedCallback()` and `super.disconnectedCallback()` manually.
If you forget these super calls in `connectedCallback()` and `disconnectedCallback()` the Reagenz component system can break and cause memory leaks.

```js
import { Component } from "@kompanie/reagenz";
import { getCount } from "../store/test.selector.js";

export class MainPage extends Component {
    render() {
        return /*html*/`
            <button $click="clickCallback" $input="nonExistingFunction">Click me</button>
        `;
    }

    clickCallback(event) {
        console.log("Button got clicked", event);
    }

    onConnect() {
        console.log("Component got added");
    }

    onDisconnect() {
        console.log("Component got removed");
    }
}

customElements.define("main-page", MainPage);
```

## Dependency Injection

To access the dependencies you injected before, you can execute `useDependencies()` in the component.
In this example a click would cause a console.log execution, since the logger dependency in the `Setting up an application` sets the `logger` dependency to the browsers native `console`.

If you would want to replace the logger with something else, the only thing you would need to change is the `logger` property in the `app.js`.

```js
import { Component } from "@kompanie/reagenz";

export class MainPage extends Component {
    render() {
        return /*html*/`
            <button $click="clickCallback">Add Log</button>`;
    }

    clickCallback() {
        const { logger } = this.useDependencies();

        logger.log("Hello dependency injection");
    }
}

customElements.define("main-page", MainPage);
```

If you forget to inject a dependency and you are trying to access it, Reagenz will throw an Error.

## Templating

### x-if: Conditional rendering

Most apps require some kind of templating to hide or show content based on the value of a variable.
In Reagenz this is done via the `x-if` helper component.

```js
import { Component } from "@kompanie/reagenz";
import { getIsLoading } from "../store/test.selectors.js";

export class LoadingSpinner extends Component {
    render([isLoading]) {
        return /*html*/`<div>
            <x-if condition="${ isLoading === true }">
                <h1>This block is visible while isLoading is true</h1>
            </x-if>
        </div>`;
    }
}

customElements.define("loading-spinner", LoadingSpinner);
```

### x-for: Iterating arrays

Since a lot of components are iterating through arrays and convert the data into HTML, Reagenz has a helper component called `x-for`.

It supports three types of placeholders:

* `@index()`: The index of the current iteration
* `@item()`: Tries to render the array item as-is
* `@item(obj.propA.propB)`: Tries to access the object properties specified

```js
import { Component } from "@kompanie/reagenz";

export class ListView extends Component {
    render() {
		const entries = ["A", "B", "C"];

        return /*html*/`<div>
            <x-for array='${JSON.stringify(entries)}'>
				<div>@index() @item()</div>
            </x-for>
        </div>`;
    }
}

customElements.define("list-view", ListView);
```

## Dialog System

Reagenz has a built-in modal system.
It allows you to open Reagenz components inside an [HTML dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog), validate the modal component and return the result as a Form in the callback of the modal.

The following example shows a component with form validation in the input and special validation in it's `validate()` function.
The title of the modal is set via the header property.

```js
// Example Dialog component:
export class AboutDialog extends Component {
    header = "About Reagenz";

    render() {
        return /*html*/`
            <div class="margin-top-small">The following input should have 3-5 characters and start with R:</div>

            <input type="text" name="username" class="input" minlength="3" maxlength="5" value="Rtest">

            <button type="submit" value="submit" class="button">OK</button>`;
    }

    // true, if the state of the modal is valid, otherwise false
    // If the validate function is omitted, the component is always valid
    validate() {
        return this.querySelector("[name='username']").value.startsWith("R");
    }
}

customElements.define("about-dialog", AboutDialog);
```

To open the component as modal you need to import the `Modal` class and instantiate it with the component you want to use as modal content.
After that call the `.show()` function, where you specifiy if a modal is closable and the callback that gets executed when the modal is cancelled or submitted.
If `isClosable` is set to `false`, it's not possible to cancel the modal, can only be submitted if the `validate()` function returns `true` and the form inside the component is in a valid state.

If you want to close the modal externally, use the function returned by the `.show()` function.

```js
import { Modal } from "@kompanie/reagenz";

const isClosable = true;
const modalCloseFunction = Modal.show(AboutModal, (result) => {
    console.log("Modal Result", result);
}, isClosable);
```

Keep in mind that the form validation is based on the HTML standard, with all it's advantages and drawbacks.

You can read more about [Client-side form validation on MDN](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation).

## State Management (Store)

Reagenz uses a store based system for it's state management similar to the one found in `Redux`.
Each application has it's own store, which contains functions for updating and selecting the state and the state object itself.

![Store flow](./assets/StoreFlow.drawio.svg)

### Actions

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
	render() {
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

### Store

The store is the center piece of the state management.
It contains the state object, takes the action objects and passes them to the middlewares and reducers.
All Reagenz components subscribe to the store automatically and wait for actions getting dispatched.
Once an action got dispatched and the reducer is finished, all components get notified.

### Reducer

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

### Middlewares

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

### Selectors

Now we can update the state and communicate with services.
How do you get data from the store?
Selectors are used for retrieving data from the store.

While it seems complicated at first to use extra functions for this instead of accessing the state directly, there are some benefits:

* Abstraction: Your component doesn't need to know the exact structure of the state anymore
* Performance: Since the change detection of Reagenz is comparing JavaScript objects, smaller objects = faster comparisons
* Re-using the same data without copying it

The following two selectors show how the same data (entries in this case) can be used to cover different use cases.

```js
export const selectAllEntries = (state) => state.entries;

export const selectFilteredEntries = (state) => state.entries.filter(item => item.text.toLowerCase().includes(state.searchValue.toLowerCase()));
```

If you want to access the selector data in your component, you first have to define them in the constructor.
After that they will be available in the render function as destructered array.

```js
import { Component } from "@kompanie/reagenz";
import { selectFilteredEntries } from "../store/tasks.selectors.js";

export class TaskList extends Component {
	selectors = [selectFilteredEntries];

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

#### Change detection

Selector functions are also responsible for the change detection in Reagenz.
Every time an action is dispatched in the Store, all connected components execute their selector functions and check if the result changed.
If the result differs, the entire component gets re-rendered.
This simple change detection is quite effective and predictable as long as you keep your components at a reasonable size.
Also be sure to only include selectors in the constructor that you are actually using in the `render` function.
Otherwise the component does unnecessary selector executions and might even re-render.

### Store access

Every component has access to the store via the `dependencies.store` property.
If you only use selectors in the `render()` function and only dispatch actions using the Reagenz `dispatch()` function, you don't need to access the store directly at all.

Keep in mind that you need to inject a store if you want to use selectors or dispatch actions in your component.
Reagenz will throw an error if you try to dispatch an action without injecting a store.

```js
import { Component } from "@kompanie/reagenz";
import { countUp } from "../store/test.actions.js";

export class MainPage extends Component {
    selectors = [getCount];

    render([count]) {
        return /*html*/`
            <div>${count}</div>
            <button $click="clickCallback" $input="nonExistingFunction">Count up</button>
        `;
    }

    clickCallback() {
        this.dispatch(countUp());
    }
}

customElements.define("main-page", MainPage);
```

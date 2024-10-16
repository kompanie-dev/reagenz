# Reagenz Component System Documentation

## Setting up an application

### HTML

Every Reagenz app should have its own JavaScript file setting up the application.
Usually you want to name it something like `my-app-name.setup.js`.
This file is the one which gets added to the HTML.

```html
<script src="./my-app-name/setup.js" type="module"></script>
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
	webComponents: { "example-web-component": ExampleWebComponent },
});
```

### Setting up Dependency Injection

You need to specifiy dependencies for dependency injection.
You should at least specify a store.
Then you need to inject this dependencies into every component which should be able to access the store or any other dependency.
The dependencies will be available as a property called `dependencies` in the components, as seen in an example later in this documentation.

```js
Injector.injectDependencies(
    {
        logger: console,
        store: testStore
    },
    [MyMainPage]
);
```

### Starting the application

After setting up your components and the dependency injection, you can start your app using the `Launcher.startApp()` function.

```js
Launcher.startApp(
    MyMainPage,
    document.getElementById("my-app-container")
);
```

Since Reagenz components are internally Web Components, you could also attach them directly in your HTML like this:

```html
<body>
    <my-main></my-main>
</body>
```

This is however not recommended for a few reasons:

* Unnecessary split between configuring and starting the app
* You need to be more careful with the correct order of executing things

## Attribute helper function

Every Reagenz component has access to `getTypedAttribute(attributeName, destinationType)`.
It was made to be similar to the [getAttribute function](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) which every HTML element has by default.
This also means that it returns `null` if the attribute does not exist or can not be converted into the respective data type, instead of throwing an error.
This helper function is useful for accessing the attributes of the component in the `render` function.

## Selectors

The main way of retrieving data in smart components is through selector functions, similar to the ones found in `Redux`.

In the following test component you can see a selector function called `getCount`, which gets executed in the background by the Reagenz component system.
The value is then available in the `render` function as `count`, as specified in the constructor.
The `render` function then can access its data directly.

```js
import { Component } from "@kompanie/reagenz";
import { getCount } from "../store/test.selector.js";

export class MyMainPage extends Component {
    constructor() {
        super({
            count: getCount
        });
    }

    render({ count }) {
        return /*html*/`
            <div>${count}</div>
        `;
    }
}
```

## Change detection

Selector functions are also responsible for the change detection in Reagenz.
Every time an action is dispatched in the Store, all connected components execute their selector functions and check if the result changed.
If the result differs, the entire component gets re-rendered.
This simple change detection is quite effective and predictable as long as you keep your components at a reasonable size.
Also be sure to only include selectors in the constructor that you are actually using in the `render` function.
Otherwise the component does unnecessary selector executions and might even re-render.

## Event system

Since attaching event handlers using attributes like `onclick` is messy if you want to use it in Web Components and `addAddEventListener` is annoying, Reagenz has a small custom event system.

If we take our component from before we can handle the `click` event by using the `$click` attribute.
The `$click` attribute specifies the name of the function which should be executed on the component.
If you want to handle the `change` event, you can use `$change="..."`, etc.
Every event supported by [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) can be bound by using the $-prefix.

Reagenz will also warn you if you are trying to connect an event attribute to a non-existing function, like the `$input` attribute does in the example below.

```js
import { Component } from "@kompanie/reagenz";
import { getCount } from "../store/test.selector.js";

export class MyMainPage extends Component {
    constructor() {
        super({
            count: getCount
        });
    }

    render({ count }) {
        return /*html*/`
            <div $click="clickCallback" $input="nonExistingFunction">${count}</div>
        `;
    }

    clickCallback(event) {
        console.log("Button got clicked", event);
    }
}
```

`onConnect` and `onDisconnect` are executed when the component gets added to or removed from the DOM, just like the functions included in the Web Components standard called `connectedCallback()` and `disconnectedCallback()`.

The main advantage in using the Reagenz functions is that you don't need to call `super.connectedCallback()` and `super.disconnectedCallback()` manually.
If you forget this super calls in  `connectedCallback()` and `disconnectedCallback()` the Reagenz component system can break and cause memory leaks.

```js
export class MyAboutButton extends Component {
    render() {
        return /*html*/`
            <button $click="clickCallback">Open about dialog</button>
        `;
    }

    clickCallback(event) {
        console.log("Button got clicked", event);
        alert("About my app");
    }

    onConnect() {
        console.log("Component got added");
    }

    onDisconnect() {
        console.log("Component got removed");
    }
}
```

## Store access

Every component has access to the store via the `dependencies.store` property.
If you only use selectors in the `render()` function and only dispatch actions using the Reagenz `dispatch()` function, you don't need to access the store directly at all.
While every component has this property, it is fine to not use selectors and stores at all and create a dumb component.
It's also possible to use standard Web Components as dumb components and manage the store selectors and actions in a parent Reagenz component.
Keep in mind that you need to inject a store if you want to use selectors or dispatch actions in your component.
Reagenz will throw an error if you try to dispatch an action without injecting a store.

```js
import { Component } from "@kompanie/reagenz";
import { countUp } from "../store/test.actions.js";

export class MyMainPage extends Component {
    clickCallback() {
        this.dispatch(countUp());
    }
}
```

## Dependency injection in components

To access the dependencies you injected before, you can use the `dependencies` property in the component.
In this example a click would cause a console.log execution, since the logger dependency in the `Setting up Dependency Injection` sets the `logger` dependency to the browsers native `console`.

If you would want to replace the logger with something else, the only thing you would need to change is the `logger` property in the `app.js`.

```js
import { Component } from "@kompanie/reagenz";

export class TasksAboutPage extends Component {
    #logger = this.dependencies.logger;

    render() {
        return /*html*/`
            <button $click="clickCallback">Add Log</button>`;
    }

    clickCallback() {
        this.#logger.log("Hello dependency injection");
    }
}
```

If you forget to inject a dependency and you are trying to access it, Reagenz will log a warning and tell you how to do so.

## if conditions

Most apps require some kind of templating to hide or show content based on the value of a variable.
In Reagenz this is done via the `x-if` helper component.

```js
import { Component } from "@kompanie/reagenz";
import { getEntries } from "../store/test.selectors.js";

export class MyLoadingSpinner extends Component {
    constructor() {
        super({
            isLoading: getIsLoading
        });
    }

    render({ isLoading }) {
        return /*html*/`<div>
            <x-if condition="${ isLoading === true }">
                <h1>This block is visible while isLoading is true</h1>
            </x-if>
        </div>`;
    }
}
```

## Looping HTML elements

Since a lot of components are iterating through arrays and convert the data into HTML, Reagenz has a helper component called `x-for`.

```js
import { Component } from "@kompanie/reagenz";
import { getEntries } from "../store/test.selectors.js";

export class MyListView extends Component {
    constructor() {
        super({
            entries: getEntries
        });
    }

    render({ entries }) {
        return /*html*/`<div>
            <x-for array='${JSON.stringify(entries)}'>
                <tasks-task-item done="@item(done)" task-id="@item(id)">@index(): @item(text)</tasks-task-item>
            </x-for>
        </div>`;
    }
}
```

## Dialog System

Reagenz has a built-in dialog system.
It allows you to open Reagenz components inside an [HTML dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog), validate the dialog component and return the result as a Form in the callback of the dialog.

The following example shows a component with form validation in the input and special validation in it's `validate()` function.
The title of the dialog is set via `<template dialog-part="title">About Reagenz</template>`.

```js
// Example Dialog component:
export class AboutDialog extends Component {
    render() {
        return /*html*/`
            <template dialog-part="title">About Reagenz</template>

            <div class="margin-top-small">The following input should have 3-5 characters and start with R:</div>

            <input type="text" name="username" class="input" minlength="3" maxlength="5" value="Rtest">

            <button type="submit" value="submit" class="button">OK</button>`;
    }

    // true, if the state of the dialog is valid, otherwise false
    // If the validate function is omitted, the component is always valid
    validate() {
        return this.querySelector("[name='username']").value.startsWith("R");
    }
}
```

To open the component as dialog you need to import the `Dialog` class and instantiate it with the component you want to use as dialog content.
After that call the `.show()` function, where you specifiy if a dialog is closable and the callback that gets executed when the dialog is cancelled or submitted.
If `isClosable` is set to `false`, it's not possible to cancel the dialog, can only be submitted if the `validate()` function returns `true` and the form inside the component is in a valid state.

```js
import { Dialog } from "@kompanie/reagenz";

const isClosable = true;
const dialog = new Dialog(AboutDialog);

dialog.show((result) => {
    console.log("Dialog Result", result);
}, isClosable);
```

Keep in mind that the form validation is based on the HTML standard, with all it's advantages and drawbacks.

You can read more about [Client-side form validation on MDN](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation).

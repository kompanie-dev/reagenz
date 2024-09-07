# Reagenz Documentation

## Setting up an application

### HTML

Every Reagenz app should have its own JavaScript file setting up the application.
Usually you want to name it something like `my-app-name.setup.js`.
This file is the one which gets added to the HTML.

```html
<script src="./my-app-name/setup.js" type="module"></script>
```

### Registering Reagenz Components
After creating and linking the file you need to register your Reagenz Components in your `setup.js`.
First of all make sure that all components call `Component.define` in their class.

```js
Component.define("my-main-page", MyMainPage);
```

You have two options to import the component.
If you are not injecting any dependencies into your component you can import the component the following way:
```js
import "./components/myMainPage.js";
```

If you need dependency injection you need to access the class directly.
You can use the following way to import the component:
```js
import { MyMainPage } from "./components/myMainPage.js";
```

### Registering Web Components

Web Components are registered using `Registry.registerWebComponents()`.
The function is checking if a Web Component with the specified name is not added yet and then calls `customElements.define()`.

You can also use your own logic for registering standard Web Components.
Just keep in mind:
* You need to register them before using them
* If you have multiple apps using the same Web Component you should register them in every `setup.js` file
    * That means you also have to take care that your component get's only added once, since `customElements.define()` throws an error otherwise

```js
// Registers a non-Reagenz Web Component
// In this example it will be available as 'example-web-component' in HTML
Registry.registerWebComponents({
    "example-web-component": ExampleWebComponent
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

## Attribute helper functions
Every Reagenz component has access to attribute helper functions.
Those were made to be similar to the [getAttribute function](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) which every HTML element has by default.
This also means that every helper function returns `null` if the attribute does not exist or can not be converted into the respective data type, instead of throwing an error.
These helper function are useful for accessing the attributes of the component in the `render` function.

`getBoolAttribute(attributeName)`

`getFloatAttribute(attributeName)`

`getIntAttribute(attributeName)`

`getJsonAttribute(attributeName)`

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
            selectors: {
                count: getCount
            }
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
            selectors: {
                count: getCount
            }
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
In this example a click would cause a console.log execution, since the `Injector.injectDependencies` call in the `Setting up Dependency Injection` sets the `logger` dependency to the browsers native `console`.

If you would want to replace the logger with something else, the only thing you would need to change is the `logger` property of the `injectDependencies` call.
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
            selectors: {
                entries: getIsLoading
            }
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
            selectors: {
                entries: getEntries
            }
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
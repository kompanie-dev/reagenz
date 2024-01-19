# Reagenz Documentation

## Setting up an application

### HTML

Every Reagenz app should have it's own JavaScript file setting up the application.
Usually you want to name it something like `my-app-name.setup.js`.
This file is the one which gets added to the HTML.

```html
<script src="./my-app-name/my-app-name.setup.js" type="module"></script>
```

### Registering Components

After creating and linking the file you need to register your components.
There are two functions for registering Web Components:
* `registerReagenzComponents` is used for Reagenz-based Web Components only
* `registerWebComponents` is used for standard Web Components

`registerReagenzComponents` is converting the component's class name from something like `MyMainComponent` to `my-main` automatically, checks if a Web Component with this name is not added yet and then calls `customElements.define()`.
If you want to know how the names are generated, take a look at `Reagenz.classNameToHtmlTag()`.

`registerWebComponents` is checking if a Web Component with the specified name is not added yet and then calls `customElements.define()`.
If you have your own logic for registering standard Web Components, that's completly fine too.
Just don't forget to register them in some way before using them.


```js
// Registers a non-Reagenz Web Component
// In this example it will be available as 'example-web-component' in HTML
Reagenz.registerWebComponents({
    "example-web-component": ExampleWebComponent
});

// Registers a Reagenz Web Component
// In this example it will be available as my-main in HTML
Reagenz.registerReagenzComponents([
    MyMainComponent
]);
```

### Setting up Dependency Injection

You need to specifiy dependencies for dependency injection.
You should at least specify a store.
Then you need to inject this dependencies into every component which should be able to access the store or any other dependency.
The dependencies will be available as a property called `dependencies` in the components, as seen in an example later in this documentation.

```js
Reagenz.injectDependencies(
    {
        logger: console,
        store: testStore
    },
    [MyMainComponent]
);
```

### Starting the application

After setting up your components and the dependency injection, you can start your app using the `Reagenz.startApp()` function.

```js
Reagenz.startApp(
    MyMainComponent,
    document.getElementById("my-app-container")
);
```
Since Reagenz components are internally Web Components, you can also attach them directly in your HTML like this:

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
The `render` function then can access it's data directly.

```js
import { Component } from "@kompanie/reagenz";
import { getCount } from "../store/test.selector.js";

export class MyMainComponent extends Component {
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
Otherwise the component might re-render unnecessarily.

## Event system
Since attaching event handlers using attributes like `onclick` is messy if you want to use it in Web Components and `addAddEventListener` is annoying, Reagenz has a small custom event system.
By default the following events are handled, but can be extended via the component configuration mentioned later:
* `blur`
* `change`
* `click`
* `focus`
* `input`
* `keydown`
* `keyup`
* `mousedown`
* `mouseup`

If we take our component from before we can handle the `click` by using the `$click` attribute.
The `$click` attribute specifies the name of the function which should be executed on the component.
If you want to handle the `change` event, you can use `$change="..."`, etc.

```js
import { Component } from "@kompanie/reagenz";
import { getCount } from "../store/test.selector.js";

export class MyMainComponent extends Component {
    constructor() {
        super({
            selectors: {
                count: getCount
            }
        });
    }

    render({ count }) {
        return /*html*/`
            <div $click="clickCallback">${count}</div>
        `;
    }

    clickCallback(event) {
        console.log("Button got clicked", event);
    }
}
```

If you want Reagenz to handle other events than the defaule ones, you can specify them in the component configuration in the constructor.
Note that this replaces the list with the specified one.
In the following example `MyDragComponent` would only react to `drag` events by default but not `click` etc.
If you want to also use the default event names, you can add them via `DEFAULT_EVENT_NAMES`.

```js
import { Component, DEFAULT_EVENT_NAMES } from "@kompanie/reagenz";

export class MyDragComponent extends Component {
    constructor() {
        super({
            eventNames: ["drag", ...DEFAULT_EVENT_NAMES]
        });
    }
}
```

The event system also adds global shorthand functions to Reagenz components.
By default, the same events are handled as mentioned above.
This makes it possible to react to events that affect the whole component.

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
Every component has access to the store via it's `store` property.
While every component has this property, it's fine to not use selectors and stores at all and create a dumb component.
It's also possible to use standard Web Components as dumb components and manage the store selectors and actions in a parent Reagenz component.
Keep in mind that you need to inject a store if you want to use selectors or dispatch actions in your component.

```js
import { Component } from "@kompanie/reagenz";
import { countUp } from "../store/test.actions.js";

export class MyMainComponent extends Component {
    clickCallback() {
        this.store.dispatch(countUp());
    }
}
```

## Dependency injection in components
To access the dependencies you injected before, you can use the `dependencies` property in the component.
In this example a click would cause a console.log execution, since the `Reagenz.injectDependencies` call in the `Setting up Dependency Injection` sets the `logger` dependency to the browsers native `console`.

If you would want to replace the logger with something else, the only thing you would need to change is the `logger` property of the `injectDependencies` call.
```js
import { Component } from "@kompanie/reagenz";

export class ReaTaskAboutPageComponent extends Component {
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

## Looping HTML elements
Since a lot of components are iterating through arrays and convert the data into HTML, Reagenz has a helper function called `forEach`.

```js
import { Component, forEach } from "@kompanie/reagenz";
import { getEntries } from "../store/test.selectors.js";

export class MyListComponent extends Component {
    constructor() {
        super({
            selectors: {
                entries: getEntries
            }
        });
    }

    render({ entries }) {
        return `<div>` +
            forEach(entries, entry => /*html*/`<my-item item-id="${entry.id}">${entry.text}</my-item>`) +
            `</div>`;
    }
}
```
If you also need the index of the looping function you can access it via the second parameter.

```js
forEach(entries, (entry, index) => /*html*/`<my-item item-id="${entry.id}">${index}</my-item>`);
```
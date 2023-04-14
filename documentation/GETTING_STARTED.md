# Getting started with Reagenz

It's recommended to execute `npm install` and then use `npm start` to run the demo project.
There you can play around and see changes in real time.
This guide will use the demo project as a baseline.

## Basic structure

The first part of every web application is `index.html`.
There you usually set your title and viewport and add a link to your CSS.
This is all optional though.
In this file you only need to add a script tag linking to your `appConfig.js`.
```html
<!DOCTYPE html>
<title>Reagenz Test App</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="style.css">
<script src="appConfig.js" type="module"></script>
```

## appConfig.js

The `appConfig.js` is responsible for registering components and configuring the startup of the application.
You need to register your components the following way:

```js
Reagenz.registerComponents(
    ["main-component", MainComponent],
    ["hello-world", HelloWorldComponent],
    ["mycomponent", MyComponent] // this will fail, "mycomponent" has no '-'
);
```

The string specifies under which name the component will be accessible in the HTML (`<main-component></main-component>` in this example) and the second parameter specifies the class that defines the component.
This is just syntactic sugar for [customElements.define](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define).
It's important that the name of the component contains a '-', otherwise the registration will fail.
This is a limitation of the Web Components API.
Aside from that it is also necessary that your components extend the Component class, otherwise you don't have access to all the good stuff that reagenz offers.

After registering all your components it's time to call the startup routine.
The startApp function returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which resolves when all states are loaded (if loadStore === true) and the app is ready.
You can have an infinite amount of separate state classes.

```js
Reagenz.startApp(
    MainComponent, // The main component of the app
    [
        new MyState( // The state class we want to use. Multiple state classes are possible
            new LocalStorageStore("myState") // A class responsible for storing the appState
        )
    ],
    true // Defines if the state should be loaded automatically
);
```

## Components

Now it's time to define some components!
Since Reagenz components are slightly extended Web Components (and therefore HTML elements) you don't need to compile or build them.
They are written in plain JavaScript and use the ES6 module syntax.
The html comment before the template string is only required if you want to use an ES6 string formatter plugin in your IDE.

At first we will define our main component.
It will automatically be rendered and added to the body by `Reagenz.startApp()`.
As you can see its possible to use standard HTML elements like `<h1>` or our custom components like `<hello-world>` in our components.

```js
import { Component } from "@kompanie/reagenz";

export class MainComponent extends Component {
    render() {
        return /*html*/`
            <h1>Hello World!</h1>
            <hello-world personName="Bob"></hello-world>
        `;
    }
}
```

Now we define our `HelloWorldComponent`.
It accesses it's `personName` attribute to render it into the `<h1>` element.
If you change the attribute of a reagenz component, the component get's re-rendered automatically.

```js
import { Component } from "@kompanie/reagenz";

export class HelloWorldComponent extends Component {
    render() {
        return /*html*/`<h1>Hello ${this.getAttribute('personName')}!</h1>`;
    }
}
```

You can also use global states in your components.
Reagenz components automatically re-render once one of their HTML attributes change or a state they use (usually the one's in `render()`) gets changed.
The following component re-renders as soon as another component updates the `personName` state.

```js
import { Component } from "@kompanie/reagenz";

export class HelloWorldComponent extends Component {
    render() {
        return /*html*/`<h1>Hello ${this.getState('personName')}!</h1>`;
    }
}
```

Before you can access the state you also need to define a state class.
To access the state class you also need to add stateClass="MyState" to the `<hello-world>` component.
The stateClass attribute specifies which of the state classes you specified at the `Reagenz.startApp()` call you want to access.

```js
import { ApplicationState } from "@kompanie/reagenz";

export class MyState extends ApplicationState {
    constructor(store) {
        super(store); // If you want to save your state you need to pass the store instance to the super constructor
    }

    // Properties can be accessed via this.getState() in components
    // that have stateClass="MyState" defined
    personName = "Bobby";
}

```

You can use shorthand functions for `change`, `click` and `input` events to trigger functionality.
In the following component a click logs a message into the developer tools of the browser.

```js
import { Component } from "@kompanie/reagenz";

export class CounterButton extends Component {
    click() {
        console.log("I got clicked");
    }

    render() {
        return /*html*/`<button>Click Me!</button>`;
    }
}
```

To prevent input components from losing focus while you type in them you can use the `renderIfStateChangeOrigin` property.
If you set it to false, the component won't re-render as long as it's the origin of the state update.
You should only use this on components containing `input` or `textarea` elements, since it can cause weird usability for other elements.
Remember, this disables re-rendering the component that's "focused", which you don't want for `button` elements etc.

```js
import { Component } from "@kompanie/reagenz";

export class TextInput extends Component {
    get renderIfStateChangeOrigin() {
        return false;
    }

    input() {
        this.setState("text", this.children[0].value); 
    }

    render() {
        return /*html*/`<input type="text" value="${this.getState("text")}">`;
    }
}
```

For more advanced examples you can start the demo project and play around with the source code.
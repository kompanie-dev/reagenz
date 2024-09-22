# Reagenz 🧪

Reagenz is an opinionated [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) based frontend library written in JavaScript.

It has the following features:

* Extremly compact
* Doesn't require any compilation or transpilation
    * When structured correctly you can even copy paste your projects source into a web server and it will work
* Doesn't reinvent the wheel
    * Uses as much of the Web Components standard as possible
    * Every Reagenz component is also a Web Component
    * Fully compatible with non-Reagenz Web Components
* No external dependencies
* Very easy to understand source code
* Uses a compact, fully-functional Redux-like store
* Easy to understand change detection based on selectors
* Simple dependency injection system
* Event system for attributes and component functions like `$click`, `$change` etc.
* Helper functions like `getBoolAttribute`, `getFloatAttribute`, `getIntAttribute` and `getJsonAttribute`
* No [Virtual DOM](https://en.wikipedia.org/wiki/Virtual_DOM)

## Usage
At first you need to install the package using the following command:
```
npm i @kompanie/reagenz
```

Reagenz uses ES6 class syntax.
You can see a simple counter component in the example.
If you want to see Reagenz in action take a look at the demo project.
If you want to learn more about the features you can read the [documentation](DOCUMENTATION.md).

```js
import { Component } from "@kompanie/reagenz";
import { countUp } from "../store/counter/actions.js";
import { getCount } from "../store/counter/selectors.js";

export class MyCountComponent extends Component {
    constructor() {
        super({
            // The selectors you want to use in your component
            selectors: {
                count: getCount
            }
        });
    }

    // This function gets executed by the $click attribute seen in render()
    // It only fires for the element with the $click attribute
    // You can also connect other events with $change, $input etc.
    buttonClickEvent() {
        this.dispatch(countUp(1));
    }

    // This function generates the innerHTML of the component.
    // In this case it also accesses the count selector specified in the constructor.
    render({ count }) {
        return /*html*/`
            <div>Current value: ${count}</div>
            <button $click="buttonClickEvent">Increase</button>`;
    }
}
```

## Structure
The repository consists of two folders:
* `demo`: A demo project containing two apps to play around with
    * `notes`: A note app
    * `shared`: Components shared between the apps
    * `tasks`: A ToDo app
* `source`: The source code of the Reagenz library

## Limitations
* Reagenz currently re-renders the whole component even if only a small part of its DOM is affected
    * This is usually fine as long as your components are at a reasonable size
* Reagenz has no idea of the hierarchy of the components that need to be re-rendered
    * It's possible that child-components get re-rendered first, just to be trashed because their parent get's re-rendered
* It's not possible to update a state property and use it in the same component
    * This example would cause focus issues if `updateSearchValue` updated `searchValue` while you type in the input: `<input type="text" value="${searchValue}" $input="updateSearchValue">`
* No complete separation of apps
    * It's not possible to have different components with the same tag in two or more apps
    * Multiple instances of the same app are not possible
* No out of the box TypeScript support

## Getting Started
Execute `npm install` and then use `npm start` to run the demo project.

The site will be available at [localhost:8000/demo/](http://localhost:8000/demo/).

You should use an ES6 template string formatter to better see the HTML used in the render function of components.
If you use Visual Studio Code you can use [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html).

## Setting up your own project
If you want to start a completly fresh Reagenz project with only the basic structure set up do the following:
* run `npx reagenz new`
* run `npm start`

You can now start developing your own Reagenz project.
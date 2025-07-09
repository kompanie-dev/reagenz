# Reagenz 🧪

Reagenz is an opinionated [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) based frontend library written in JavaScript.

It has the following features:

* Extremley compact
* Buildless: No need for a bundler, compiler, or transpiler
* Fully compatible with standard Web Components
* No external dependencies
* Very easy to understand source code
* Uses a compact, fully-functional Redux-like store
* Easy to understand change detection based on selectors
* Simple dependency injection system
* Attribute event system for attributes like `$click`, `$change` etc.
* Typed attributes
* No [Virtual DOM](https://en.wikipedia.org/wiki/Virtual_DOM)
* Documentation via JSDoc, which can be used with TypeScript

## Usage

First, install the package with the following command:

```console
npm i @kompanie/reagenz
```

Reagenz uses ES6 class syntax.
You can see a simple counter component in the example.
To see buildless Reagenz applications in action take a look at the [demo project](https://kompanie-dev.github.io/reagenz/demo/#/).
If you want to learn more about the features you can read the [Reagenz documentation](documentation/DOCUMENTATION.md).

```js
import { Component } from "@kompanie/reagenz";
import { countUp } from "../store/counter/actions.js";
import { getCount } from "../store/counter/selectors.js";

export class MyCounter extends Component {
    // The selectors you want to use inside your render function
    // If values of the selectors change, the entire component re-renders
    selectors = { count: getCount };

    styles = /*css*/`
        my-counter {
            div {
                color: red;
            }
        }
    `;

    // This function generates the innerHTML of the component.
    // In this case it also accesses the count selector specified in the selectors property.
    render() {
        const { count } = this.selectorData;

        return /*html*/`
            <div>Current value: ${count}</div>
            <button $click="buttonClickEvent">Increase</button>`;
    }

    // This function gets executed by the $click attribute seen in render()
    // It only fires for the element with the $click attribute
    // You can also connect other events with $change, $input etc.
    buttonClickEvent() {
        this.dispatch(countUp(1));
    }
}

customElements.define("my-counter", MyCounter);
```

## Structure

The repository consists of the following folders:

* `cli`: The source for the command line interface `npx reagenz`
* `demo`: A demo project containing two apps to play around with
    * `notes`: A note app
    * `shared`: Components shared between the apps
    * `tasks`: A ToDo app
* `documentation`: Documentation including assets
* `source`: The source code of the Reagenz library
* `template-project`: The project that gets used for `npx reagenz new`
* `tests`: Unit, browser and performance tests

## Limitations

### Performance

The performance of Reagenz is usually great if you keep the following things in mind:

* **Component re-renders**: Reagenz re-renders the whole component if any selected state changes.
* **Child re-renders**: Child components might be re-rendered unnecessarily if they use the same selectors as the parent.
* **Lazy loading**: All components are loaded at once unless you implement lazy loading manually.

### Other

* It's not possible to have two or more apps using the same tag name for different components
* It's not possible to update a state property and use it in the same component
	* This example would cause focus issues if `updateSearchValue` updated `searchValue` while you type in the input: `<input type="text" value="${searchValue}" $input="updateSearchValue">`

## Getting Started

To run the demo project or tests locally:

```console
npm install
npm start
```

Then open [localhost:8000/demo](http://localhost:8000/demo) for the demo app or [localhost:8000/tests](http://localhost:8000/tests) for the tests.

To improve developer experience when writing HTML inside template strings, consider installing ES6 template string formatter to better see the HTML used in the render function of components.
If you use Visual Studio Code you can use [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html).

If you want to update Reagenz you can check out [CHANGELOG.md](documentation/CHANGELOG.md) to see what changed between releases.

## Setting up your own project

If you want to start a completley fresh Reagenz project with only the basic structure set up do the following:

```console
npx reagenz new
npm start
```

You can now start developing your own Reagenz project.
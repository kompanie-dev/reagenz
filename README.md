# Reagenz 🧪

Reagenz is an opinionated [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) based frontend library written in JavaScript.

It has the following features:

* Extremly compact
* Buildless: Doesn't require any compilation or transpilation
* Fully compatible with standard Web Components
* No external dependencies
* Very easy to understand source code
* Uses a compact, fully-functional Redux-like store
* Easy to understand change detection based on selectors
* Simple dependency injection system
* Attribute event system for attributes like `$click`, `$change` etc.
* Typed attributes
* No [Virtual DOM](https://en.wikipedia.org/wiki/Virtual_DOM)
* TypeScript support (Beta)

## Usage

At first you need to install the package using the following command:

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
        const { count } = this.useSelectorData();

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
* `template-project`: The project that get's used for `npx reagenz new`
* `tests`: Unit, browser and performance tests

## Limitations

### Performance

The performance of Reagenz is usually great if you keep the following things in mind:

* Reagenz re-renders the whole component even if only a small part of its DOM is affected
	* Keep your components at a reasonable size to prevent unnecessary re-rendering of elements
* It's possible that child-components get re-rendered first, just to be trashed because their parent get's re-rendered
	* This can be prevented by not having the same selectors in child and parent components
* All apps and components will load at once if you don't implement lazy loading yourself

### Other

* It's not possible to have two ore more apps using the same tag name for different components
* It's not possible to update a state property and use it in the same component
	* This example would cause focus issues if `updateSearchValue` updated `searchValue` while you type in the input: `<input type="text" value="${searchValue}" $input="updateSearchValue">`

## Getting Started

Execute `npm install` and then use `npm start` to run the demo project locally.

The site will be available at [localhost:8000/](http://localhost:8000/).

You should use an ES6 template string formatter to better see the HTML used in the render function of components.
If you use Visual Studio Code you can use [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html).

If you want to update Reagenz you can check out [CHANGELOG.md](documentation/CHANGELOG.md) to see what changed between releases.

## Setting up your own project

If you want to start a completly fresh Reagenz project with only the basic structure set up do the following:

* run `npx reagenz new`
* run `npm start`

You can now start developing your own Reagenz project.

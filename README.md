# Reagenz

Reagenz is a component-based front-end library written in JavaScript.
It has a small footprint and only re-renders components that changed.
It tries to stay as close to the already existing [Web Components standard](https://developer.mozilla.org/en-US/docs/Web/Web_Components) as possible, but adds an easy to use state system.

## Usage

Reagenz uses ES6 class syntax.
You can see a simple counter component in the example.
For more details go to the [Getting Started markdown](documentation/GETTING_STARTED.md).

```js
import { Component } from "@kompanie/reagenz";

export class CountComponent extends Component {
    click() {
        const currentCount = this.getState('count');
        this.setState('count', currentCount + 1);
    }

    render() {
        return /*html*/`<button>Count: ${this.getState('count')}</button>`;
    }
}
```

## Structure

The repository consists of two folders:
* demo: Contains a test app to play around with
    * components: Contains component definition classes
    * services: Your typical service classes
    * states: State classes which can be accessed by the components
    * appConfig.js: Contains the component registration, state and store configuration and the startup routine
* source: The actual Reagenz library

## Limitations

Reagenz tries to be as small and easy to understand as possible.
For this reason it has no [virtual DOM](https://en.wikipedia.org/wiki/Virtual_DOM).
This comes at a cost: the lack of some performance optimizations.
These limitations should not be too problematic as long as you keep your components small.
The following limitations are known:
* Reagenz currently re-renders the whole component even if only a small part of it's DOM is affected
* Reagenz has no idea of the hierarchy of the components that need to be re-rendered
    * So it's possible that child-components get re-rendered first, just to be trashed because their parent get's re-rendered

## Getting Started

Execute `npm install` and then use `npm start` to run the demo project.

The site will be available at [localhost:5000](http://localhost:5000).

You should use an ES6 template string formatter to better see the HTML used in the render functions of components.
If you use Visual Studio Code you can use [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html).
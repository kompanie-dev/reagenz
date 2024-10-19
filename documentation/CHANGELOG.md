# Reagenz Changelog

## 9.0.0 (?)

* Update dependencies
* Added option for minified builds
* Changed selectors from objects to arrays
* Improved JSDoc and TypeScript typings
* Improved error handling
* Added helper functions with getTypedAttribute() and getArrayAttribute()
* Renamed getBoolAttribute() to getBooleanAttribute()
* Replace Injector, Launcher and WebComponentUtilities with App class

## 8.1.0 (2024-10-13)

* Simplified check for Web Components in event attribute handler
* Updated TypeScript definitions
* Updated template project dependencies

## 8.0.0 (2024-10-12)

* Replace getIntAttribute and getFloatAttribute with getNumberAttribute

## 7.0.1 (2024-10-11)

* Fix npx reagenz new

## 7.0.0 (2024-10-11)

* Updated dependencies
* Added .editorconfig to template source code
* Added eslint to template and source code
* Added tests to source code
* Added markdownlint to source code
* Added TypeScript definitions
* Fix x-for not escaping @item() values
* Component: remove componentConfig parent object
* Many smaller refactorings and cleanups

## v6.1.0 (2024-09-22)

* Changed import to export for ForComponent and IfComponent

## v6.0.0 (2024-09-22)

* Updated dependencies
* Added npx reagenz help
* Added npx reagenz new
* Added Dialog validate() function support
* Improved Dialog CSS class names and added new CSS classes
* Improved Dialog and TaskListPage styling in demo project
* Simplified ifComponent, Dialog, Injector and other classes
* Renamed x-for's @element placeholder with @item
* Renamed Registry to WebComponentUtilities
* Simplified forComponent and ifComponent import

## v5.1.0 (2024-05-04)

* Updated dependencies
* Added template project for new projects
* Removed parcel folders from .gitignore

## v5.0.0 (2024-03-24)

* Updated dependencies
* Marked Reagenz as sideeffect free
* Added x-for and x-if components
* Refactored and fixed dialog system

## v4.0.0 (2024-03-01)

* Updated dependencies
* Added automatic HTML Escaping select function
* Added insecureSelect for selecting data without escaping
* Added environment variables to demo project
* Merged *.store.js files into *.setup.js files
* Simplified store and component names
* Replaced index.js with @kompanie/reagenz in demo project
* Added dialog system

## v3.0.0 (2024-02-15)

* Revert "Added Map support to forEach function"
* Added warnings for accessing undefined dependencies
* Demo: Fixed focus issues on Chrome
* Removed Component event shorthands
* Changed from style to style()
* Simplfied functions
* Added JSDoc return types
* Replaced auto tag-generation with manual tag names to fix minifier compatibility
* Added Auto-detection of $-event attributes in Components
* Added check to component registration if custom elements are already defined before overriding the dependencies
* Added dispatch to component
* Removed currying from middlewares
* Splitted Reagenz class into Injector, Launcher and Registry
* Replaced parcel with vite
* Fixed middlewares

## v2.1.0 (2024-01-06)

* Updated dependencies
* Added Map support to forEach function

## v2.0.0 (2023-12-29)

* Complete rewrite of Reagenz
* Store-based state

## v1.2.1 (2023-06-11)

* Updated parcel
* Added dev mode

## v1.2.0 (2023-05-14)

* Added mousedown and mouseup events to Component

## v1.1.0 (2023-05-12)

* Added repository to package.json
* Added reagenz-version attribute to body
* Changed local port to 8000 since macOS uses port 5000 internally

## v1.0.2 (2023-04-28)

* Whitelisted source folder

## v1.0.1 (2023-04-14)

* Added license to package.json

## v1.0.0 (2023-04-14)

* Initial version

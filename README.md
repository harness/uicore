This repository contains implementation of [Next Generation UI Architecture](https://docs.google.com/document/d/1oe_cHcDyYhwjJ6QZqyOIlpUWGgYyeCIBfUOdElg2rBg/edit#heading=h.41cp29fl3vvn). Plus its documentation acts as live integrated playground.

## Local development

`yarn start`

Then navigate to `http://localhost:3000` to see the integrated documentation.

## Build

`yarn build`

## Setup

All third-parties are defined as peer dependencies and not bundled into build output. Consumers of this lib need to add by themselves.

This project relies heavily on Blueprint. When using this project as a dependency in your project, you'll need to import Blueprint and its CSS.

```js
// Import in a .js(x)/.ts(x) file
import '@blueprintjs/core/lib/css/blueprint.css'
import 'ui-platform/dist/index.css'
```

```css
/* Import from a .css file  */
@import '@blueprintjs/core/lib/css/blueprint.css';
@import 'ui-platform';
```

App also must import [Nunito](https://fonts.google.com/specimen/Nunito?selection.family=Nunito) font by itself. This font is currently used as Harness standard font.

## TODO

- Minimizing CSS in release build (`yarn build`)

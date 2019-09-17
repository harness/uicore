## TBD

_Note_: All third-parties are defined as Peer Dependencies. Consumers of this lib needs to add by themselves.

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

App must import [Nunito](https://fonts.google.com/specimen/Nunito?selection.family=Nunito) font by itself.

## TODO

- Minimizing CSS in release build (`yarn build`)
- Script to generate icons/index.ts from list of icons in icons folder instead of manually.

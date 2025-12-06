---
title: Import Maps
---

With ESM Scripts, you can use Import Maps to control how module specifiers are resolved in your project. Import Maps allow you to define aliases or remap module paths so you can write cleaner and more flexible imports, especially when working with shared libraries or internal tools.

For example, instead of writing:

```js
import config from '../../../utils/config.js';
```

You can use an import map to simplify this to:

```js
import config from 'utils/config.js';
```

## Create an Import Map

In the Settings Panel find the "Import Map" section. Click "Create Default" and the editor will create a new Import Map in the asset registry and assign it to the project.

Open the file in the code editor. If you want to map a module like "/utils/math.mjs" to "math", update the import map with the following;

```json
{
  "imports": {
    "math": "./utils/math.mjs"
  }
}
```

Now in your code you can call `import x from "math"` and it will resolve to your module.

:::tip

You can also use Import Maps as shorthand for npm packages. For example, add `"tweenjs": "https://esm.sh/tween.js"` which will resolve to tween.js on a CDN.

:::

## Things to know

- Import Maps only apply to ESM Builds. Classic Scripts on their own don't support them.
- The paths you define in the map must match files that exist in your project or point to valid external URLs.
- Only one import map can be active at a time.
- If you're using external modules (e.g. from a CDN), ensure they are ESM-compatible and CORS-accessible.

## When to use Import Maps

- To avoid brittle relative paths in large projects.
- To create clean, alias-based paths for shared utilities.
- To reference third-party external modules without installing them locally.

Using import maps helps keep your codebase organized and easier to maintain, especially as your project grows.

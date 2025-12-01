---
title: Getting Started
---

Before you begin, make sure you have [Node.js](https://nodejs.org/) 18 or later installed.

## Installing from NPM

PlayCanvas Web Components is available as a package on [NPM](https://www.npmjs.com/package/@playcanvas/web-components).
You can install it (and the PlayCanvas Engine) as follows:

```bash
npm install playcanvas @playcanvas/web-components --save-dev
```

Next, in your HTML file, you will need an import map because the Web Components need to be able to find the PlayCanvas Engine (which is an external dependency):

```html
<script type="importmap">
    {
        "imports": {
            "playcanvas": "/node_modules/playcanvas/build/playcanvas.mjs"
        }
    }
</script>
```

You can then import the Web Components as follows:

```html
<script type="module" src="/node_modules/@playcanvas/web-components/dist/pwc.mjs"></script>
```

You can now incorporate any of the PlayCanvas Web Components elements into your HTML!

## Using a CDN

Instead of loading the library from a local package, you can instead opt to load it from a CDN (such as jsDelivr). In this case, you would update the import map:

```html
<script type="importmap">
    {
        "imports": {
            "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas@latest/build/playcanvas.mjs"
        }
    }
</script>
```

And the components would now be imported as follows:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.mjs"></script>
```

:::note[Versioning]

The snippets above use `@latest` for convenience. For production deployments, pin to a specific version to ensure deterministic builds (for example: `playcanvas@2.x.y` and `@playcanvas/web-components@x.y.z`). See the release notes for the latest stable versions: [PlayCanvas Engine releases](https://github.com/playcanvas/engine/releases) and [Web Components releases](https://github.com/playcanvas/web-components/releases).

:::

## Boilerplate HTML

Let's see how this looks in a minimal boilerplate HTML file:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>My PlayCanvas Web Components App</title>
        <script type="importmap">
            {
                "imports": {
                    "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas@latest/build/playcanvas.mjs"
                }
            }
        </script>
        <script type="module" src="https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.mjs"></script>
        <style>
            body {
                margin: 0;
                overflow: hidden;
            }
        </style>
    </head>
    <body>
        <!-- Your PlayCanvas Web Components elements go here -->
    </body>
</html>
```

You are now ready to start using the PlayCanvas Web Components to build a 3D scene!

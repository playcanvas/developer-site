---
title: Getting Started
description: "Load PlayCanvas Web Components from a CDN or install from npm, set up the import map, and render your first 3D scene in the browser."
---

You can be rendering 3D in the browser inside a minute — no installs and no build step required. Load PlayCanvas Web Components straight from a CDN, or install the npm package if you are integrating them into an existing project.

## Installation

Whichever route you choose, your HTML file needs an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) because the Web Components need to be able to find the PlayCanvas Engine (which is an external dependency). Mapping `@playcanvas/web-components` as well lets your own module scripts import the library's JavaScript API (such as `whenReady`).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="cdn">
<TabItem value="cdn" label="CDN (no install)">

Load both the engine and the components from a CDN such as jsDelivr, using `pwc.min.mjs` — the minified build, less than half the size of `pwc.mjs`:

```html
<script type="importmap">
    {
        "imports": {
            "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas@latest/build/playcanvas.mjs",
            "@playcanvas/web-components": "https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.min.mjs"
        }
    }
</script>
```

You can then import the Web Components as follows:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.min.mjs"></script>
```

:::note[Versioning]

The snippets above use `@latest` for convenience. For production deployments, pin to a specific version to ensure deterministic builds (for example: `playcanvas@2.x.y` and `@playcanvas/web-components@x.y.z`). See the release notes for the latest stable versions: [PlayCanvas Engine releases](https://github.com/playcanvas/engine/releases) and [Web Components releases](https://github.com/playcanvas/web-components/releases).

:::

</TabItem>
<TabItem value="npm" label="npm">

Make sure you have [Node.js](https://nodejs.org/) 18 or later installed. PlayCanvas Web Components is available as a package on [npm](https://www.npmjs.com/package/@playcanvas/web-components). You can install it (and the PlayCanvas Engine) as follows:

```bash
npm install playcanvas @playcanvas/web-components
```

Point the import map at the installed packages:

```html
<script type="importmap">
    {
        "imports": {
            "playcanvas": "/node_modules/playcanvas/build/playcanvas.mjs",
            "@playcanvas/web-components": "/node_modules/@playcanvas/web-components/dist/pwc.mjs"
        }
    }
</script>
```

You can then import the Web Components as follows:

```html
<script type="module" src="/node_modules/@playcanvas/web-components/dist/pwc.mjs"></script>
```

These paths assume your site is served from the project root, so that `/node_modules/...` resolves. Adjust them to match your dev server or bundler setup.

</TabItem>
</Tabs>

## Your First Page

Here is a complete page that renders a lit sphere — the "hello, world" of 3D. It uses the CDN setup, so there is nothing to install:

```html title="index.html" {24-36}
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>My PlayCanvas Web Components App</title>
        <script type="importmap">
            {
                "imports": {
                    "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas@latest/build/playcanvas.mjs",
                    "@playcanvas/web-components": "https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.min.mjs"
                }
            }
        </script>
        <script type="module" src="https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.min.mjs"></script>
        <style>
            body {
                margin: 0;
                overflow: hidden;
            }
        </style>
    </head>
    <body>
        <pc-app>
            <pc-scene>
                <pc-entity name="camera" position="0 0 3">
                    <pc-camera></pc-camera>
                </pc-entity>
                <pc-entity name="light" rotation="45 45 0">
                    <pc-light></pc-light>
                </pc-entity>
                <pc-entity name="ball">
                    <pc-render type="sphere"></pc-render>
                </pc-entity>
            </pc-scene>
        </pc-app>
    </body>
</html>
```

Save this as `index.html` and open it in your browser. You should see:

![A white sphere lit by a directional light](/img/user-manual/web-components/hello-sphere.jpg)

:::note

Using the npm install instead? Swap the import map and script tag for the `/node_modules/...` versions shown in the npm tab above.

:::

You can also experiment with this scene right here — it's live on CodePen:

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="JoPvXjO" title="A lit sphere built with PlayCanvas Web Components" />

## Editor Support

The package ships a [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest), which editors use to offer tag and attribute completions, valid attribute values and hover documentation when authoring HTML.

**VS Code** — add the following to your workspace `.vscode/settings.json`:

```json
{
  "html.customData": [
    "./node_modules/@playcanvas/web-components/dist/vscode.html-custom-data.json"
  ]
}
```

**JetBrains IDEs** (WebStorm, IntelliJ IDEA) — no setup required. The IDE discovers the bundled `web-types.json` automatically.

**Other tooling** — the manifest itself is at `@playcanvas/web-components/dist/custom-elements.json` and is declared in the package's `customElements` field, which is how tools such as `lit-analyzer` and Storybook locate it.

## Next Steps

- Continue to [Building a Scene](building-a-scene.md) to build up a scene element by element — and go further, with materials, shadows and a ground plane.
- Skim the [Tag Reference](tags/index.md) to see every element you can declare.
- Browse the [Examples](https://playcanvas.github.io/web-components/examples/) to see what the components can do.

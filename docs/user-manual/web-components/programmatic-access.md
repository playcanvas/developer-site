---
title: Programmatic Access
description: "Drive the engine from JavaScript: await element initialization with whenReady, access engine objects like AppBase and Entity, and target specific apps."
---

PlayCanvas Web Components let you build rich 3D scenes with nothing but HTML. Sooner or later, though, you may want to reach into the running app from JavaScript: tweaking scene settings, firing events or reacting to UI that lives outside the 3D canvas. This page shows you how to do that safely.

## Element Readiness

Elements like `<pc-app>` initialize asynchronously. Behind the scenes, the app has to create a graphics device, preload assets and build the entity hierarchy before its underlying engine objects exist. If your script queries an element as soon as the page loads, the engine object you are after (such as the app's [`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html)) may not have been created yet.

The `whenReady` function is the easiest way to wait for the right moment. First, extend your import map so the browser can resolve the package by name:

```html {5}
<script type="importmap">
    {
        "imports": {
            "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas@latest/build/playcanvas.mjs",
            "@playcanvas/web-components": "https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.mjs"
        }
    }
</script>
```

Then import it and await the element you need:

```html
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const { app } = await whenReady('pc-app'); // app is the engine's AppBase
    app.scene.exposure = 0.5;
</script>
```

`whenReady` resolves with the element once its engine object has been created. If the element is already initialized by the time you call it, it resolves immediately. There is no need to wait for `DOMContentLoaded` or listen for events.

## Reaching Engine Objects

`whenReady` accepts a tag name, any CSS selector or a direct element reference, so it works for every asynchronously initializing element — not just `<pc-app>`:

```javascript
const { scene } = await whenReady('pc-scene');
const camera = (await whenReady('pc-camera')).component;
const { entity } = await whenReady('pc-entity[name="player"]');
```

Each element exposes its engine counterpart through a property:

| Element | Property | Engine Type |
| --- | --- | --- |
| [`<pc-app>`](./tags/pc-app.md) | `app` | [`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html) |
| [`<pc-entity>`](./tags/pc-entity.md) | `entity` | [`Entity`](https://api.playcanvas.com/engine/classes/Entity.html) |
| [`<pc-scene>`](./tags/pc-scene.md) | `scene` | [`Scene`](https://api.playcanvas.com/engine/classes/Scene.html) |
| Component tags (`<pc-camera>`, `<pc-light>`, ...) | `component` | The corresponding [`Component`](https://api.playcanvas.com/engine/classes/Component.html) |

These properties are typed non-null: once the element is ready, its engine object is guaranteed to exist.

## Targeting a Specific App

Most pages contain a single `<pc-app>`, and `whenReady('pc-app')` finds it (the first one in document order). If your page hosts several apps, pass a selector to pick one:

```javascript
const left = await whenReady('#left');
const right = await whenReady('#right');
```

## Waiting on an Element You Already Hold

`whenReady` also accepts an element reference directly, which is handy when you already hold one — for example, an element you just created:

```javascript
const appElement = document.createElement('pc-app');
document.body.appendChild(appElement);

const { app } = await whenReady(appElement);
```

(Under the hood, every asynchronously initializing element has a `ready()` method that returns a promise resolving with the element itself — `whenReady` is a convenience wrapper around it.)

## TypeScript

The package registers all of its tags with TypeScript's `HTMLElementTagNameMap`, so element queries are fully typed: `document.querySelector('pc-app')` is an `AppElement | null`, and `whenReady('pc-camera')` resolves a `CameraComponentElement`. Passing the tag of an element that does not initialize asynchronously (such as `pc-module`) is a compile-time error.

## When to Use Scripts Instead

`whenReady` is ideal for page-level glue: connecting DOM UI to the app, tweaking settings, firing events. For substantial or reusable behavior — anything with an update loop or per-entity logic — write a script and attach it with `<pc-script>` instead. Scripts receive a fully initialized entity, so no readiness check is ever needed. See [Adding Behavior with Scripts](scripting.md).

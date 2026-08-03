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
            "@playcanvas/web-components": "https://cdn.jsdelivr.net/npm/@playcanvas/web-components@latest/dist/pwc.min.mjs"
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

`whenReady` rejects rather than waiting in three cases: the string is not a valid CSS selector, no element in the document matches it, or the matched element does not initialize asynchronously (`<pc-material>` or `<pc-module>`). A selector is evaluated once — after the document finishes parsing, if called while it is still loading — so it finds elements present in the markup, not elements added later. To wait on a dynamically created element, pass the element reference itself (see [below](#waiting-on-an-element-you-already-hold)).

:::note[Misplaced Elements]

The promise never settles if the element cannot finish initializing — for example, a `<pc-script>` that is not a direct child of `<pc-scripts>`. A component element outside a `<pc-entity>` is the exception: it still becomes ready, but its `component` is `null`. Either way, a misplaced element logs a console warning naming the parent it requires.

:::

## Reaching Engine Objects

`whenReady` accepts a tag name, any CSS selector or a direct element reference, so it works for every asynchronously initializing element — not just `<pc-app>`:

```javascript
const { scene } = await whenReady('pc-scene');
const camera = (await whenReady('pc-camera')).component;
const { entity } = await whenReady('pc-entity[name="player"]');
```

Readiness is per element: an entity element becomes ready when its `Entity` exists, which is *before* its child component elements have initialized. To reach a component, await the component element itself — as the `pc-camera` line above does — rather than awaiting the entity and reading the component off it.

Each element exposes its engine counterpart through a property:

| Element | Property | Engine Type |
| --- | --- | --- |
| [`<pc-app>`](./tags/pc-app.md) | `app` | [`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html) |
| [`<pc-entity>`](./tags/pc-entity.md) | `entity` | [`Entity`](https://api.playcanvas.com/engine/classes/Entity.html) |
| [`<pc-scene>`](./tags/pc-scene.md) | `scene` | [`Scene`](https://api.playcanvas.com/engine/classes/Scene.html) |
| Component tags (`<pc-camera>`, `<pc-light>`, ...) | `component` | The corresponding [`Component`](https://api.playcanvas.com/engine/classes/Component.html) |

These accessors are typed nullable: they return `null` before the element is ready and after it is torn down. Awaiting readiness first is what guarantees a non-null result. The exception is [`<pc-model>`](./tags/pc-model.md), which currently becomes ready before its GLB has loaded — its `entity` remains `null` until the model instantiates.

Every asynchronously initializing element also exposes `closestApp` and `closestEntity` getters, returning its nearest `<pc-app>` or `<pc-entity>` *ancestor* element (or `null` if there is none) — handy when you hold a component element and need its owning entity or app.

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

## The `ready` Event

Alongside the promise API, every asynchronously initializing element dispatches a `ready` event at the moment its engine object is created. The event bubbles and is composed, so a single listener on `document` observes every element as it comes up:

```javascript
document.addEventListener('ready', (event) => {
    console.log(`${event.target.tagName.toLowerCase()} is ready`);
});
```

Use whichever fits the job: `whenReady` *awaits a specific element* and resolves even if that element became ready long ago, while the `ready` event *reacts to elements as they initialize* — including elements added to the page after load, which `whenReady`'s selector form cannot see. The event fires once per element, so attach the listener before the elements you care about initialize; an element that became ready earlier will not fire it again.

## Assets, Materials and Modules

Resources declared in markup have their own JavaScript routes. [`<pc-asset>`](./tags/pc-asset.md) and [`<pc-material>`](./tags/pc-material.md) expose static lookups that resolve an `id` to the engine object:

```javascript
import { AssetElement, MaterialElement } from '@playcanvas/web-components';

const asset = AssetElement.get('car');        // the engine Asset declared by <pc-asset id="car">
const material = MaterialElement.get('gold'); // the material declared by <pc-material id="gold">
```

`AssetElement.get` returns the registered [`Asset`](https://api.playcanvas.com/engine/classes/Asset.html), which may not have finished loading yet — check `asset.loaded`, or subscribe to its `load` event, before using `asset.resource`.

[`<pc-module>`](./tags/pc-module.md) does not initialize asynchronously, so it cannot be awaited with `whenReady`. Instead, it exposes `getLoadPromise()`, which resolves once the WebAssembly module is ready:

```javascript
await document.querySelector('pc-module[name="Ammo"]').getLoadPromise();
```

## TypeScript

The package registers all of its tags with TypeScript's `HTMLElementTagNameMap`, so element queries are fully typed: `document.querySelector('pc-app')` is an `AppElement | null`, and `whenReady('pc-camera')` resolves a `CameraComponentElement`. Passing the tag of an element that does not initialize asynchronously (`pc-material` or `pc-module`) is a compile-time error.

## When to Use Scripts Instead

`whenReady` is ideal for page-level glue: connecting DOM UI to the app, tweaking settings, firing events. For substantial or reusable behavior — anything with an update loop or per-entity logic — write a script and attach it with `<pc-script>` instead. Scripts receive a fully initialized entity, so no readiness check is ever needed. See [Adding Behavior with Scripts](scripting.md).

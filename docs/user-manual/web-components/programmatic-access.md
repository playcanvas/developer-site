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

`whenReady` rejects rather than waiting in three cases: the string is not a valid CSS selector, no element in the document matches it, or the matched element does not initialize asynchronously (`<pc-material>` is the only such element). A selector is evaluated once — after the document finishes parsing, if called while it is still loading — so it finds elements present in the markup, not elements added later. To wait on a dynamically created element, pass the element reference itself (see [below](#waiting-on-an-element-you-already-hold)).

:::note[Elements That Never Become Ready]

The promise never settles if the element cannot finish initializing — for example, a `<pc-script-instance>` that is not a direct child of `<pc-script>`, a [`<pc-node>`](./tags/pc-node.md) that cannot resolve its `name`, a [`<pc-wasm>`](./tags/pc-wasm.md) without a `name`, or an [`<pc-app>`](./tags/pc-app.md) that could not create a graphics device, where a fallback UI should hang off the element's [`error` event](./tags/pc-app.md#events) instead. A component element with no `<pc-entity>`, `<pc-model>` or `<pc-node>` above it is the exception: it still becomes ready, but its `component` is `null`. In every case, the element reports what went wrong in the console.

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
| [`<pc-model>`](./tags/pc-model.md) | `entity` | The host [`Entity`](https://api.playcanvas.com/engine/classes/Entity.html) the element creates and fronts |
| [`<pc-model>`](./tags/pc-model.md) | `contentEntity` | The [`Entity`](https://api.playcanvas.com/engine/classes/Entity.html) rooting the instantiated hierarchy, beneath the host |
| [`<pc-node>`](./tags/pc-node.md) | `entity` | The [`Entity`](https://api.playcanvas.com/engine/classes/Entity.html) it bound inside that hierarchy |
| [`<pc-scene>`](./tags/pc-scene.md) | `scene` | [`Scene`](https://api.playcanvas.com/engine/classes/Scene.html) |
| [`<pc-script-instance>`](./tags/pc-script-instance.md) | `script` | [`Script`](https://api.playcanvas.com/engine/classes/Script.html) |
| [`<pc-sound-slot>`](./tags/pc-sound-slot.md) | `soundSlot` | [`SoundSlot`](https://api.playcanvas.com/engine/classes/SoundSlot.html) |
| Component tags (`<pc-camera>`, `<pc-light>`, ...) | `component` | The corresponding [`Component`](https://api.playcanvas.com/engine/classes/Component.html) |

These accessors are typed nullable: they return `null` before the element is ready and after it is torn down. Awaiting readiness first is what guarantees a non-null result. [`<pc-model>`](./tags/pc-model.md)'s `contentEntity` is the exception that stays nullable: readiness there means the `asset` selection settled, which includes a failed load and no asset at all, so check `contentEntity` (or listen for the element's `error` event) if the file might not arrive. Its host `entity` is non-null from boot either way.

Every asynchronously initializing element also exposes `closestApp` and `closestEntity` getters, returning its nearest `<pc-app>` *ancestor* element, or its nearest entity-fronting ancestor — a `<pc-entity>`, a `<pc-model>` or a `<pc-node>` — or `null` if there is none. Handy when you hold a component element and need its owning entity or app.

A `<pc-model>`'s `contentEntity` roots a whole instantiated hierarchy, and reading that hierarchy is the other thing you will want from one. Its `hierarchy()` method returns a plain-data snapshot of the instantiated tree — the node names, paths and match indices a [`<pc-node>`](./tags/pc-node.md) binds against, plus the material assignments its `material-overrides` mapping selects — and `String()` of the result prints it as a tree. See [Inspecting the Hierarchy](./tags/pc-model.md#inspecting-the-hierarchy).

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

Use whichever fits the job: `whenReady` *awaits a specific element* and resolves even if that element became ready long ago, while the `ready` event *reacts to elements as they initialize* — including elements added to the page after load, which `whenReady`'s selector form cannot see. The event fires once per readiness cycle, so attach the listener before the elements you care about initialize — an element that became ready earlier will not fire it again. An element that is torn down and re-initialized (removed and re-inserted, say, or a `<pc-node>` rebinding after its model reloads) starts a new cycle and fires the event again; `<pc-wasm>`, whose readiness never resets, is the exception.

## Assets, Materials and Modules

Resources declared in markup have their own JavaScript routes. [`<pc-asset>`](./tags/pc-asset.md) and [`<pc-material>`](./tags/pc-material.md) expose static lookups that resolve an `id` to the engine object:

```javascript
import { AssetElement, MaterialElement } from '@playcanvas/web-components';

const asset = AssetElement.get('car');        // the engine Asset declared by <pc-asset id="car">
const material = MaterialElement.get('gold'); // the material declared by <pc-material id="gold">
```

`AssetElement.get` returns the registered [`Asset`](https://api.playcanvas.com/engine/classes/Asset.html), which may not have finished loading yet — check `asset.loaded`, or subscribe to its `load` event, before using `asset.resource`.

[`<pc-wasm>`](./tags/pc-wasm.md) initializes asynchronously like the elements above — it becomes ready once its module has loaded, so `whenReady('pc-wasm')` awaits the load. You will rarely need it: `<pc-app>` waits for every `<pc-wasm>` declared beneath it before it creates its graphics device, so an app that is ready is an app whose modules have loaded. Awaiting the app is how you wait for Ammo:

```javascript
const { app } = await whenReady('pc-app'); // every <pc-wasm> has loaded by now
```

One caveat sets `<pc-wasm>` apart: its readiness is sticky. WebAssembly modules configure engine-global state that never unloads, so removing and re-inserting the element neither resets its readiness nor loads the module again — see [Readiness](./tags/pc-wasm.md#readiness).

## TypeScript

The package registers all of its tags with TypeScript's `HTMLElementTagNameMap`, so element queries are fully typed: `document.querySelector('pc-app')` is an `AppElement | null`, and `whenReady('pc-camera')` resolves a `CameraComponentElement`. Passing the tag of an element that does not initialize asynchronously (`pc-material` is the only one) is a compile-time error.

## When to Use Scripts Instead

`whenReady` is ideal for page-level glue: connecting DOM UI to the app, tweaking settings, firing events. For substantial or reusable behavior — anything with an update loop or per-entity logic — write a script and attach it with `<pc-script-instance>` instead. Scripts receive a fully initialized entity, so no readiness check is ever needed. See [Adding Behavior with Scripts](scripting.md).

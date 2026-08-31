---
title: Reusable Scenes with Templates
description: "Declare a pc-* subtree once in a native HTML template, then clone it into as many live instances as you need: the prefab pattern, step by step."
---

Scenes repeat structure all the time: crates to spawn, projectiles to fire, rows to add to a list. Rather than authoring every copy by hand — or assembling each one element-by-element from JavaScript — declare the subtree once inside a native HTML [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template) element and clone it on demand. The browser keeps template content inert, and the Web Components lifecycle turns each clone into a live engine hierarchy the moment it is appended to the page. There is no dedicated prefab API to learn: the platform primitive *is* the API.

## Declaring a Template

A template holds ordinary `pc-*` markup:

```html
<template id="crate-template">
    <pc-entity name="crate">
        <pc-render type="box" material="crate"></pc-render>
        <pc-collision></pc-collision>
        <pc-rigid-body type="dynamic"></pc-rigid-body>
    </pc-entity>
</template>
```

Content inside a `<template>` never initializes: no entity is created, no component attaches, nothing renders. The markup only comes to life when a clone of it is appended somewhere beneath a [`<pc-app>`](tags/pc-app.md) — under the [`<pc-scene>`](tags/pc-scene.md), or under any entity in it. The template element itself can sit anywhere in the document; right after the `</pc-app>` it serves is a good convention.

## One Root Owns the Instance

Give a template exactly one top-level element — a [`<pc-entity>`](tags/pc-entity.md) for a subtree you compose yourself, or a [`<pc-model>`](tags/pc-model.md) for a prefab built around a loaded asset. That root plays three roles at once:

* **The instance's handle.** It is the element you keep to configure, await and eventually remove the instance.
* **The lifecycle owner.** Removing the root tears down the entire engine hierarchy it created — one call disposes of the whole instance.
* **The name-resolution scope.** Bare-name [entity references](attributes.md#entity-references) inside the clone resolve within their nearest enclosing entity-fronting element before looking anywhere else, so a single root keeps every internal reference inside the instance.

A template with several top-level elements still renders, but then no single element owns the instance, and references in one subtree can no longer reach the others without going through the document. One root, always.

:::note[A pc-node Root Is a Special Case]

A template rooted in a [`<pc-node>`](tags/pc-node.md) is an *attachment* template, not a free-standing prefab. A `<pc-node>` binds a node that already exists inside a loaded model, so its clones must be appended beneath the owning [`<pc-model>`](tags/pc-model.md) — anywhere else, the element warns, never binds, and its `ready()` never settles. Teardown differs to match: the model owns the node, so removing the clone reverts the node to its authored state and destroys only what the clone added beneath it.

:::

## Creating an Instance

The whole pattern is six steps, and their order matters:

```javascript
const template = document.getElementById('crate-template');
const scene = document.querySelector('pc-scene');

// 1. Clone the template's content
const clone = template.content.cloneNode(true);

// 2. Capture the root now - appending will empty the fragment
const crate = clone.querySelector('pc-entity');

// 3. Configure the instance while it is still disconnected
crate.setAttribute('position', '0 5 0');

// 4. Append the fragment once - the lifecycle builds the engine hierarchy
scene.appendChild(clone);

// 5. Await the specific elements you are about to use
await Promise.all([crate, crate.querySelector('pc-rigid-body')].map((el) => el.ready()));

// 6. Later: remove the root to dispose of the whole instance
crate.remove();
```

Step 2 is the one that trips people up. `template.content` is a [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment), and so is its clone — a container that hands its children to the new parent when appended and comes back empty. Query the fragment for the root element *before* appending, and keep that element; after step 4, the fragment has nothing left in it.

Configuring in step 3 — position, rotation, script attributes, anything — happens while the clone is disconnected, so the attributes are simply the initial state the instance boots with. No half-configured instance ever exists in the scene, and no engine object is created only to be immediately reconfigured.

## Names Are Clone-Local

Wire references *inside* a template with bare names:

```html
<template id="pendulum-template">
    <pc-entity name="pendulum">
        <pc-entity name="anchor">
            <pc-collision half-extents="0.05 0.05 0.05"></pc-collision>
            <pc-rigid-body type="static"></pc-rigid-body>
        </pc-entity>
        <pc-entity name="bob" position="0 -1.5 0">
            <pc-render type="sphere"></pc-render>
            <pc-collision type="sphere" radius="0.5"></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>
        <!-- Bare names resolve inside this clone before anywhere else -->
        <pc-joint type="ball" entity-a="anchor" entity-b="bob"></pc-joint>
    </pc-entity>
</template>
```

A bare reference is an entity name, resolved [nearest-first](attributes.md#names-resolve-nearest-first): the joint searches its nearest enclosing entity-fronting element, then each outer one — reaching the `pendulum` root before the lookup could ever leave the clone. Every instance therefore wires to its *own* `anchor` and `bob`: clone this template ten times and you get ten independent pendulums, even though all ten use the same names. Script [`entity:` attributes](scripting.md#type-prefixes) (for example `target="entity:bob"`) scope the same way.

## `id`s Are Document-Global

Everything addressed by `id` ignores clone boundaries:

* [Entity references beginning with `#`](attributes.md#hash-references-are-document-wide) select across the whole document.
* `asset` attributes and `asset:` prefixes name a [`<pc-asset>`](tags/pc-asset.md) by its document-wide `id`.
* `material` attributes name a [`<pc-material>`](tags/pc-material.md) by its document-wide `id`.

That global reach is exactly right for shared resources: the crate template above references `material="crate"` declared once outside the template, and every clone shares that one material. It is exactly wrong for per-instance structure — so avoid `id` attributes on elements *inside* a template. Cloning duplicates them, and with duplicate `id`s in the document, a `#` reference (like `getElementById`) finds whichever copy comes first, which is rarely the one you meant. If instances genuinely need `id`s, assign a unique one to each instance after cloning.

## Readiness Is Per Element

Appending a clone starts asynchronous initialization, and readiness is tracked [per element](programmatic-access.md#reaching-engine-objects): the root becoming ready means its `Entity` exists — not that its descendant components do. Await the specific elements you are about to touch:

```javascript
const body = crate.querySelector('pc-rigid-body');
await body.ready();
body.component.applyImpulse(0, 0, -10); // the component exists now
```

Every asynchronously initializing element has a `ready()` method returning a promise that resolves with the element ([`whenReady(element)`](programmatic-access.md#waiting-on-an-element-you-already-hold) is the same thing for a reference you hold), and `Promise.all` awaits several at once. Resist the temptation to wait a frame with `requestAnimationFrame` instead: with asset loads or WASM modules in flight, "one frame later" is a race that readiness promises settle deterministically.

## Removing an Instance

Removing the cloned root disposes of the instance — the element lifecycle destroys the engine hierarchy it created, exactly as if the markup had been deleted:

```javascript
crate.remove();
```

Removal can race initialization: a wave of enemies cleared while the last one is still loading, a list emptied mid-append. Removing a clone that has not finished initializing is safe — teardown runs through the same lifecycle — but note that a removed element's `ready()` promise [never settles](programmatic-access.md#element-readiness). Code awaiting readiness must not assume the await will complete: race it against your own teardown signal, then check the element is still connected before using it:

```javascript
await Promise.race([
    Promise.all(parts.map((part) => part.ready())),
    teardown // a promise you resolve when discarding in-flight instances
]);
if (!crate.isConnected) return; // removed while initializing - nothing to do
```

## Example

Every crate is a clone of the one `<template>` after the app — spawned, configured while disconnected, appended, awaited, and hurled with an impulse the moment its rigid body exists. Click a settled crate to remove it. Try raising the impulse, or giving the crate `restitution="0.8"` so it bounces:

```html live-example
<pc-app>
    <pc-wasm name="Ammo" glue="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.js" wasm="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.wasm" fallback="https://developer.playcanvas.com/assets/modules/ammo/ammo.js"></pc-wasm>
    <!-- Materials are document-global - every clone shares this one -->
    <pc-material id="crate" diffuse="#c98a4b"></pc-material>
    <pc-material id="floor" diffuse="#3a3f4b"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="0 5 12" rotation="-18 0 0">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows normal-offset-bias="0.05" shadow-bias="0.2"></pc-light>
        </pc-entity>
        <pc-entity name="ground" position="0 -0.5 0" scale="14 1 14">
            <pc-render type="box" material="floor"></pc-render>
            <pc-collision half-extents="7 0.5 7"></pc-collision>
            <pc-rigid-body type="static"></pc-rigid-body>
        </pc-entity>
    </pc-scene>
</pc-app>
<!-- The prefab: one entity-fronting root owning the whole instance -->
<template id="crate-template">
    <pc-entity name="crate">
        <pc-render type="box" material="crate"></pc-render>
        <pc-collision></pc-collision>
        <pc-rigid-body type="dynamic" friction="0.6"></pc-rigid-body>
    </pc-entity>
</template>
<div class="controls">
    <button id="spawn">Spawn crate</button>
    <button id="clear">Clear</button>
</div>
<style>
    .controls {
        position: absolute;
        top: 12px;
        left: 12px;
        display: flex;
        gap: 8px;
    }
</style>
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const template = document.getElementById('crate-template');
    const scene = await whenReady('pc-scene');

    async function spawn() {
        // Clone, and capture the root before appending empties the fragment
        const clone = template.content.cloneNode(true);
        const crate = clone.querySelector('pc-entity');

        // Configure this instance while it is still disconnected
        crate.setAttribute('position', `${(Math.random() - 0.5) * 4} 6 ${(Math.random() - 0.5) * 4}`);
        crate.setAttribute('rotation', `${Math.random() * 360} ${Math.random() * 360} ${Math.random() * 360}`);

        // Append once - the lifecycle builds the engine hierarchy
        scene.appendChild(clone);

        // Await the element we are about to use, not a frame count
        const body = crate.querySelector('pc-rigid-body');
        await body.ready();

        // The component exists now - hurl the crate sideways
        body.component.applyImpulse((Math.random() - 0.5) * 4, 0, (Math.random() - 0.5) * 4);

        // Removing the root disposes of the whole instance
        crate.addEventListener('click', () => crate.remove());
    }

    document.getElementById('spawn').onclick = spawn;
    document.getElementById('clear').onclick = () => {
        scene.querySelectorAll('[name="crate"]').forEach((crate) => crate.remove());
    };

    for (let i = 0; i < 3; i++) spawn();
</script>
```

## Templates in the Examples

Several of the library's examples are built on this pattern, in increasing order of ambition:

* [Physics Cluster](https://playcanvas.github.io/web-components/examples/physics-cluster.html) — the minimal case: forty spheres cloned from one template into a gravity well.
* [UI Layout](https://playcanvas.github.io/web-components/examples/ui-layout.html) — tiles cloned into a [`<pc-layout-group>`](tags/pc-layout-group.md), which lays out each new arrival automatically.
* [Scroll View](https://playcanvas.github.io/web-components/examples/scroll-view.html) — list entries cloned into scrollable content and removed by their own buttons.
* [AR Wiener Storm](https://playcanvas.github.io/web-components/examples/ar-wiener-storm.html) — the full treatment: a jointed, physics-driven [`<pc-model>`](tags/pc-model.md) prefab whose bare-name references wire each clone internally, with readiness raced against teardown.

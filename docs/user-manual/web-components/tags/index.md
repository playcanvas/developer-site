---
title: Tag Reference
description: "Every PlayCanvas Web Component tag grouped by role, the document structure they form, and a link to each element's attributes, events and placement rules."
---

Every PlayCanvas Web Component tag is listed here, grouped by role, with the document structure they form and a reference page for each one.

## How the Tags Fit Together

Every document has the same shape. [`<pc-app>`](pc-app) holds the resources and one [`<pc-scene>`](pc-scene); the scene holds entities; an entity holds one of each component tag it needs, plus child entities:

```html
<pc-app>
    <!-- Resources are declared once and referenced by id -->
    <pc-asset id="sky" src="sky.webp"></pc-asset>
    <pc-asset id="robot" src="robot.glb"></pc-asset>
    <pc-material id="gold" diffuse="#d4af37" metalness="1"></pc-material>
    <pc-wasm name="Ammo" glue="ammo.js" wasm="ammo.wasm"></pc-wasm>
    <pc-scene>
        <pc-sky asset="sky"></pc-sky>
        <!-- An entity takes one of each component tag, and nests entities and models -->
        <pc-entity name="camera" position="0 2 6">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-entity name="crate" position="0 3 0">
            <pc-render type="box" material="gold"></pc-render>
            <pc-collision></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>
        <!-- A model is an entity that instantiates a GLB; a node binds to a node inside it -->
        <pc-model asset="robot">
            <pc-anim clip="idle">
                <pc-anim-clip name="idle"></pc-anim-clip>
            </pc-anim>
            <pc-node name="head">
                <pc-light type="spot"></pc-light>
            </pc-node>
        </pc-model>
    </pc-scene>
</pc-app>
```

Three tags front an engine entity, and a component tag can sit inside any of them: [`<pc-entity>`](pc-entity), [`<pc-model>`](pc-model) and [`<pc-node>`](pc-node). A component placed inside a model attaches to that model's host entity, and one placed inside a node attaches to the bound node — both take the same component children an entity does.

Each tag's page states the parent it requires. A misplaced element logs a console warning naming the parents it would accept, so keep the console open while authoring.

## Tags by Role

### Structure

The five tags that form the document: the application, its scene, and the three that front an entity.

| Tag | Description |
| --- | --- |
| [`<pc-app>`](pc-app) | Defines the root element of an application: its graphics device, and the resources and scene it holds. |
| [`<pc-scene>`](pc-scene) | Defines the scene, with the fog, exposure and gravity that apply to everything inside it. |
| [`<pc-entity>`](pc-entity) | Defines an entity: a named transform that hosts component tags and child entities. |
| [`<pc-model>`](pc-model) | Defines an entity that instantiates a 3D model from a GLB file. |
| [`<pc-node>`](pc-node) | Binds to a node inside a loaded model to override it. |

### Resources

Direct children of `<pc-app>`, declared once and referenced by `id` from the tags that use them.

| Tag | Description |
| --- | --- |
| [`<pc-asset>`](pc-asset) | Defines an asset to be loaded by your application. |
| [`<pc-material>`](pc-material) | Defines a material that render components can reference. |
| [`<pc-wasm>`](pc-wasm) | Defines a WebAssembly module, such as the Ammo physics engine. |

### Rendering

| Tag | Description |
| --- | --- |
| [`<pc-camera>`](pc-camera) | Defines a camera that is used to render the scene. |
| [`<pc-light>`](pc-light) | Defines a directional, omni or spot light, with optional shadows. |
| [`<pc-render>`](pc-render) | Defines a render component that draws a primitive shape with a material. |
| [`<pc-gsplat>`](pc-gsplat) | Defines a gsplat component that renders 3D Gaussian Splats. |
| [`<pc-particle-system>`](pc-particle-system) | Defines a particle system driven by a JSON configuration asset. |
| [`<pc-sky>`](pc-sky) | Defines an image-based skybox. |

### Animation

| Tag | Description |
| --- | --- |
| [`<pc-anim>`](pc-anim) | Defines an animation component that plays animation clips. |
| [`<pc-anim-clip>`](pc-anim-clip) | Defines a single clip assigned to an animation component. |

### Physics

Physics needs the Ammo module, declared with [`<pc-wasm>`](pc-wasm).

| Tag | Description |
| --- | --- |
| [`<pc-collision>`](pc-collision) | Defines a collision component used by triggers and rigid bodies. |
| [`<pc-rigid-body>`](pc-rigid-body) | Defines a static, dynamic or kinematic rigid body. |
| [`<pc-joint>`](pc-joint) | Defines a physics joint constraining two rigid bodies. |

### User Interface

A [`<pc-screen>`](pc-screen) hosts a tree of entities that each carry a [`<pc-element>`](pc-element); the other tags refine how those elements behave.

| Tag | Description |
| --- | --- |
| [`<pc-screen>`](pc-screen) | Defines a screen component that can render element components. |
| [`<pc-element>`](pc-element) | Defines a text, image or group user interface element. |
| [`<pc-button>`](pc-button) | Defines a button component with hover, pressed and inactive states. |
| [`<pc-layout-group>`](pc-layout-group) | Defines a layout group that arranges child elements in rows or columns. |
| [`<pc-layout-child>`](pc-layout-child) | Defines per-child sizing rules within a layout group. |
| [`<pc-scroll-view>`](pc-scroll-view) | Defines a scrollable viewport over a content entity. |
| [`<pc-scrollbar>`](pc-scrollbar) | Defines a draggable scrollbar that drives a scroll view. |

### Audio

| Tag | Description |
| --- | --- |
| [`<pc-sound>`](pc-sound) | Defines a sound component that holds sound slots. |
| [`<pc-sound-slot>`](pc-sound-slot) | Defines a single sound assigned to a sound component. |
| [`<pc-audio-listener>`](pc-audio-listener) | Defines the point from which positional sound is heard. |

### Scripting

| Tag | Description |
| --- | --- |
| [`<pc-script>`](pc-script) | Defines a script component that hosts script instances. |
| [`<pc-script-instance>`](pc-script-instance) | Defines a single script assigned to a script component. |

## Shared Conventions

The attributes of every tag share the same value conventions: an absent (or removed) attribute means the engine default applies, and an invalid value logs a console warning and falls back to the default. The *Type* column of each attribute table names how a value is written — Boolean, Number, Enum, Vector, Color, String, or a reference to an asset, a material or an entity — and [Attributes](../attributes.md) defines every one of those types.

:::note[A component tag spells the engine component it adds]

Drop the `pc-` prefix, drop the hyphens, and you have the engine's component id: `<pc-layout-group>` adds `entity.layoutgroup`, `<pc-rigid-body>` adds `entity.rigidbody`, `<pc-audio-listener>` adds `entity.audiolistener`. The rule holds in both directions for every component tag on this page, so neither spelling has to be memorized. The engine's ids run their words together only because they are JavaScript property names, which cannot carry a hyphen — an HTML tag can.

:::

A repeatable child takes its parent's tag as a prefix: [`<pc-anim-clip>`](pc-anim-clip) inside [`<pc-anim>`](pc-anim), [`<pc-sound-slot>`](pc-sound-slot) inside [`<pc-sound>`](pc-sound), [`<pc-script-instance>`](pc-script-instance) inside [`<pc-script>`](pc-script).

Every tag except [`<pc-material>`](pc-material) initializes asynchronously and fires a `ready` event once it has — see [The `ready` Event](../programmatic-access.md#the-ready-event) for the timing, and for the `whenReady()` helper that wraps it. The Events section on a tag's page lists only the events specific to that tag.

## All Tags A–Z {#all-tags-a-z}

[`<pc-anim>`](pc-anim) · [`<pc-anim-clip>`](pc-anim-clip) · [`<pc-app>`](pc-app) · [`<pc-asset>`](pc-asset) · [`<pc-audio-listener>`](pc-audio-listener) · [`<pc-button>`](pc-button) · [`<pc-camera>`](pc-camera) · [`<pc-collision>`](pc-collision) · [`<pc-element>`](pc-element) · [`<pc-entity>`](pc-entity) · [`<pc-gsplat>`](pc-gsplat) · [`<pc-joint>`](pc-joint) · [`<pc-layout-child>`](pc-layout-child) · [`<pc-layout-group>`](pc-layout-group) · [`<pc-light>`](pc-light) · [`<pc-material>`](pc-material) · [`<pc-model>`](pc-model) · [`<pc-node>`](pc-node) · [`<pc-particle-system>`](pc-particle-system) · [`<pc-render>`](pc-render) · [`<pc-rigid-body>`](pc-rigid-body) · [`<pc-scene>`](pc-scene) · [`<pc-screen>`](pc-screen) · [`<pc-script>`](pc-script) · [`<pc-script-instance>`](pc-script-instance) · [`<pc-scrollbar>`](pc-scrollbar) · [`<pc-scroll-view>`](pc-scroll-view) · [`<pc-sky>`](pc-sky) · [`<pc-sound>`](pc-sound) · [`<pc-sound-slot>`](pc-sound-slot) · [`<pc-wasm>`](pc-wasm)

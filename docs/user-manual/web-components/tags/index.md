---
title: Tag Reference
description: "Alphabetical index of PlayCanvas Web Component tags with short summaries linking to full attribute and usage documentation for each element."
---

Here is a complete list of the tags that are available in PlayCanvas Web Components.

The attributes of every tag share the same value conventions: an absent (or removed) attribute means the engine default applies, and an invalid value logs a console warning and falls back to the default. See [Attributes](../attributes.md) for how booleans, numbers, enums, vectors and colors are written.

Tags also have placement rules — each tag's page notes the parent it requires. A misplaced element logs a console warning naming the parents it would accept, so keep the console open while authoring.

Three tags front an engine entity, and a component tag can sit inside any of them: [`<pc-entity>`](pc-entity), [`<pc-model>`](pc-model) and [`<pc-node>`](pc-node). So a component placed inside a model attaches to that model, and one placed inside a node attaches to the node — both take the same component children an entity does.

:::note[A component tag spells the engine component it adds]

Drop the `pc-` prefix, drop the hyphens, and you have the engine's component id: `<pc-layout-group>` adds `entity.layoutgroup`, `<pc-rigid-body>` adds `entity.rigidbody`, `<pc-audio-listener>` adds `entity.audiolistener`. The rule holds in both directions for every component tag below, so neither spelling has to be memorized. The engine's ids run their words together only because they are JavaScript property names, which cannot carry a hyphen — an HTML tag can.

:::

A repeatable child takes its parent's tag as a prefix: [`<pc-anim-clip>`](pc-anim-clip) inside [`<pc-anim>`](pc-anim), [`<pc-sound-slot>`](pc-sound-slot) inside [`<pc-sound>`](pc-sound), [`<pc-script-instance>`](pc-script-instance) inside [`<pc-script>`](pc-script).

Every tag except [`<pc-material>`](pc-material) initializes asynchronously and fires a `ready` event once it has — see [The `ready` Event](../programmatic-access.md#the-ready-event) for the timing, and for the `whenReady()` helper that wraps it. The Events section on a tag's page lists only the events specific to that tag.

| Tag | Description |
| --- | --- |
| [`<pc-anim>`](pc-anim) | Defines an animation component that plays animation clips. |
| [`<pc-anim-clip>`](pc-anim-clip) | Defines a single clip assigned to an animation component. |
| [`<pc-app>`](pc-app) | Defines the root element of your application. |
| [`<pc-asset>`](pc-asset) | Defines an asset to be loaded by your application. |
| [`<pc-audio-listener>`](pc-audio-listener) | Defines an audio listener component. |
| [`<pc-button>`](pc-button) | Defines a button component. |
| [`<pc-camera>`](pc-camera) | Defines a camera that is used to render the scene. |
| [`<pc-collision>`](pc-collision) | Defines a collision component used by triggers and rigid bodies. |
| [`<pc-element>`](pc-element) | Defines a text, image or group user interface element. |
| [`<pc-entity>`](pc-entity) | Defines an entity. |
| [`<pc-gsplat>`](pc-gsplat) | Defines a gsplat component that renders 3D Gaussian Splats. |
| [`<pc-joint>`](pc-joint) | Defines a physics joint constraining two rigid bodies. |
| [`<pc-layout-child>`](pc-layout-child) | Defines a layout child component. |
| [`<pc-layout-group>`](pc-layout-group) | Defines a layout group component. |
| [`<pc-light>`](pc-light) | Defines a light component. |
| [`<pc-material>`](pc-material) | Defines a material that render components can reference. |
| [`<pc-model>`](pc-model) | Defines an entity that instantiates a 3D model from a GLB file. |
| [`<pc-node>`](pc-node) | Binds to a node inside a loaded model to override it. |
| [`<pc-particle-system>`](pc-particle-system) | Defines a particle system component. |
| [`<pc-render>`](pc-render) | Defines a render component. |
| [`<pc-rigid-body>`](pc-rigid-body) | Defines a rigid body component. |
| [`<pc-scene>`](pc-scene) | Defines a scene. |
| [`<pc-screen>`](pc-screen) | Defines a screen component that can render element components. |
| [`<pc-script>`](pc-script) | Defines a script component. |
| [`<pc-script-instance>`](pc-script-instance) | Defines a single script assigned to a script component. |
| [`<pc-scrollbar>`](pc-scrollbar) | Defines a scrollbar component. |
| [`<pc-scroll-view>`](pc-scroll-view) | Defines a scroll view component. |
| [`<pc-sky>`](pc-sky) | Defines an image-based skybox. |
| [`<pc-sound>`](pc-sound) | Defines a sound component. |
| [`<pc-sound-slot>`](pc-sound-slot) | Defines a single sound assigned to a sound component. |
| [`<pc-wasm>`](pc-wasm) | Defines a WebAssembly module. |

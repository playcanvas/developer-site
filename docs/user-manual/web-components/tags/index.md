---
title: Tag Reference
description: "Alphabetical index of PlayCanvas Web Component tags with short summaries linking to full attribute and usage documentation for each element."
---

Here is a complete list of the tags that are available in PlayCanvas Web Components.

The attributes of every tag share the same value conventions: an absent (or removed) attribute means the engine default applies, and an invalid value logs a console warning and falls back to the default. See [Attributes](../attributes.md) for how booleans, numbers, enums, vectors and colors are written.

Tags also have placement rules — each tag's page notes the parent it requires. A misplaced element logs a console warning naming the required parent, so keep the console open while authoring. The component tags accept one further parent beyond the [`<pc-entity>`](pc-entity) their pages name: a [`<pc-node>`](pc-node), which fronts a node inside a model loaded by [`<pc-model>`](pc-model) and takes the same component children an entity does.

| Tag | Description |
| --- | --- |
| [`<pc-app>`](pc-app) | Defines the root element of your application. |
| [`<pc-asset>`](pc-asset) | Defines an asset to be loaded by your application. |
| [`<pc-button>`](pc-button) | Defines a button component. |
| [`<pc-camera>`](pc-camera) | Defines a camera that is used to render the scene. |
| [`<pc-collision>`](pc-collision) | Defines a collision component used by triggers and rigid bodies. |
| [`<pc-element>`](pc-element) | Defines a text, image or group user interface element. |
| [`<pc-entity>`](pc-entity) | Defines an entity. |
| [`<pc-gsplat>`](pc-gsplat) | Defines a gsplat component that renders 3D Gaussian Splats. |
| [`<pc-joint>`](pc-joint) | Defines a physics joint constraining two rigid bodies. |
| [`<pc-layoutchild>`](pc-layoutchild) | Defines a layout child component. |
| [`<pc-layoutgroup>`](pc-layoutgroup) | Defines a layout group component. |
| [`<pc-light>`](pc-light) | Defines a light component. |
| [`<pc-listener>`](pc-listener) | Defines a listener component. |
| [`<pc-material>`](pc-material) | Defines a material that render components can reference. |
| [`<pc-model>`](pc-model) | Defines an entity that instantiates a 3D model from a GLB file. |
| [`<pc-module>`](pc-module) | Defines a WebAssembly module. |
| [`<pc-node>`](pc-node) | Binds to a node inside a loaded model to override it. |
| [`<pc-particles>`](pc-particles) | Defines a particle system component. |
| [`<pc-render>`](pc-render) | Defines a render component. |
| [`<pc-rigidbody>`](pc-rigidbody) | Defines a rigidbody component. |
| [`<pc-scene>`](pc-scene) | Defines a scene. |
| [`<pc-screen>`](pc-screen) | Defines a screen component that can render element components. |
| [`<pc-script>`](pc-script) | Defines a single script assigned to a script component. |
| [`<pc-scripts>`](pc-scripts) | Defines a script component. |
| [`<pc-scrollbar>`](pc-scrollbar) | Defines a scrollbar component. |
| [`<pc-scrollview>`](pc-scrollview) | Defines a scroll view component. |
| [`<pc-sky>`](pc-sky) | Defines an image-based skybox. |
| [`<pc-sound>`](pc-sound) | Defines a single sound assigned to a sound component. |
| [`<pc-sounds>`](pc-sounds) | Defines a sound component. |

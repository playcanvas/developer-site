# Tag Reference

Every PlayCanvas Web Component tag is listed here, grouped by role, with the document structure they form and a reference page for each one.

## How the Tags Fit Together

Every document has the same shape. [`<pc-app>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md) holds the resources and one [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md); the scene holds entities; an entity holds one of each component tag it needs, plus child entities:

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

Three tags front an engine entity, and a component tag can sit inside any of them: [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md), [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) and [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md). A component placed inside a model attaches to that model's host entity, and one placed inside a node attaches to the bound node — both take the same component children an entity does.

Each tag's page states the parent it requires. A misplaced element logs a console warning naming the parents it would accept, so keep the console open while authoring.

## Tags by Role

### Structure

The five tags that form the document: the application, its scene, and the three that front an entity.

| Tag | Description |
| --- | --- |
| [`<pc-app>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md) | Defines the root element of an application: its graphics device, and the resources and scene it holds. |
| [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md) | Defines the scene, with the fog, exposure and gravity that apply to everything inside it. |
| [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md) | Defines an entity: a named transform that hosts component tags and child entities. |
| [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) | Defines an entity that instantiates a 3D model from a GLB file. |
| [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md) | Binds to a node inside a loaded model to override it. |

### Resources

Direct children of `<pc-app>`, declared once and referenced by `id` from the tags that use them.

| Tag | Description |
| --- | --- |
| [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) | Defines an asset to be loaded by your application. |
| [`<pc-material>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-material.md) | Defines a material that render components can reference. |
| [`<pc-wasm>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-wasm.md) | Defines a WebAssembly module, such as the Ammo physics engine. |

### Rendering

| Tag | Description |
| --- | --- |
| [`<pc-camera>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-camera.md) | Defines a camera that is used to render the scene. |
| [`<pc-light>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-light.md) | Defines a directional, omni or spot light, with optional shadows. |
| [`<pc-render>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-render.md) | Defines a render component that draws a primitive shape with a material. |
| [`<pc-gsplat>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-gsplat.md) | Defines a gsplat component that renders 3D Gaussian Splats. |
| [`<pc-particle-system>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-particle-system.md) | Defines a particle system driven by a JSON configuration asset. |
| [`<pc-sky>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sky.md) | Defines an image-based skybox. |

### Animation

| Tag | Description |
| --- | --- |
| [`<pc-anim>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-anim.md) | Defines an animation component that plays animation clips. |
| [`<pc-anim-clip>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-anim-clip.md) | Defines a single clip assigned to an animation component. |

### Physics

Physics needs the Ammo module, declared with [`<pc-wasm>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-wasm.md).

| Tag | Description |
| --- | --- |
| [`<pc-collision>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-collision.md) | Defines a collision component used by triggers and rigid bodies. |
| [`<pc-rigid-body>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-rigid-body.md) | Defines a static, dynamic or kinematic rigid body. |
| [`<pc-joint>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-joint.md) | Defines a physics joint constraining two rigid bodies. |

### User Interface

A [`<pc-screen>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-screen.md) hosts a tree of entities that each carry a [`<pc-element>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-element.md); the other tags refine how those elements behave.

| Tag | Description |
| --- | --- |
| [`<pc-screen>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-screen.md) | Defines a screen component that can render element components. |
| [`<pc-element>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-element.md) | Defines a text, image or group user interface element. |
| [`<pc-button>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-button.md) | Defines a button component with hover, pressed and inactive states. |
| [`<pc-layout-group>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-layout-group.md) | Defines a layout group that arranges child elements in rows or columns. |
| [`<pc-layout-child>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-layout-child.md) | Defines per-child sizing rules within a layout group. |
| [`<pc-scroll-view>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scroll-view.md) | Defines a scrollable viewport over a content entity. |
| [`<pc-scrollbar>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scrollbar.md) | Defines a draggable scrollbar that drives a scroll view. |

### Audio

| Tag | Description |
| --- | --- |
| [`<pc-sound>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound.md) | Defines a sound component that holds sound slots. |
| [`<pc-sound-slot>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound-slot.md) | Defines a single sound assigned to a sound component. |
| [`<pc-audio-listener>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-audio-listener.md) | Defines the point from which positional sound is heard. |

### Scripting

| Tag | Description |
| --- | --- |
| [`<pc-script>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-script.md) | Defines a script component that hosts script instances. |
| [`<pc-script-instance>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-script-instance.md) | Defines a single script assigned to a script component. |

## Shared Conventions

The attributes of every tag share the same value conventions: an absent (or removed) attribute means the engine default applies, and an invalid value logs a console warning and falls back to the default. The *Type* column of each attribute table names how a value is written — Boolean, Number, Enum, Vector, Color, String, or a reference to an asset, a material or an entity — and [Attributes](https://developer.playcanvas.com/user-manual/web-components/attributes.md) defines every one of those types.

:::note[A component tag spells the engine component it adds]

Drop the `pc-` prefix, drop the hyphens, and you have the engine's component id: `<pc-layout-group>` adds `entity.layoutgroup`, `<pc-rigid-body>` adds `entity.rigidbody`, `<pc-audio-listener>` adds `entity.audiolistener`. The rule holds in both directions for every component tag on this page, so neither spelling has to be memorized. The engine's ids run their words together only because they are JavaScript property names, which cannot carry a hyphen — an HTML tag can.

:::

A repeatable child takes its parent's tag as a prefix: [`<pc-anim-clip>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-anim-clip.md) inside [`<pc-anim>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-anim.md), [`<pc-sound-slot>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound-slot.md) inside [`<pc-sound>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound.md), [`<pc-script-instance>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-script-instance.md) inside [`<pc-script>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-script.md).

Every tag except [`<pc-material>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-material.md) initializes asynchronously and fires a `ready` event once it has — see [The `ready` Event](https://developer.playcanvas.com/user-manual/web-components/programmatic-access.md#the-ready-event) for the timing, and for the `whenReady()` helper that wraps it. The Events section on a tag's page lists only the events specific to that tag.

## All Tags A–Z

[`<pc-anim>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-anim.md) · [`<pc-anim-clip>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-anim-clip.md) · [`<pc-app>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md) · [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) · [`<pc-audio-listener>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-audio-listener.md) · [`<pc-button>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-button.md) · [`<pc-camera>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-camera.md) · [`<pc-collision>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-collision.md) · [`<pc-element>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-element.md) · [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md) · [`<pc-gsplat>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-gsplat.md) · [`<pc-joint>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-joint.md) · [`<pc-layout-child>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-layout-child.md) · [`<pc-layout-group>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-layout-group.md) · [`<pc-light>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-light.md) · [`<pc-material>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-material.md) · [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) · [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md) · [`<pc-particle-system>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-particle-system.md) · [`<pc-render>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-render.md) · [`<pc-rigid-body>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-rigid-body.md) · [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md) · [`<pc-screen>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-screen.md) · [`<pc-script>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-script.md) · [`<pc-script-instance>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-script-instance.md) · [`<pc-scrollbar>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scrollbar.md) · [`<pc-scroll-view>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scroll-view.md) · [`<pc-sky>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sky.md) · [`<pc-sound>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound.md) · [`<pc-sound-slot>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound-slot.md) · [`<pc-wasm>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-wasm.md)

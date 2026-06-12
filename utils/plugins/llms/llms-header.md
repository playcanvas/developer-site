# PlayCanvas Developer Documentation

> PlayCanvas is an open-source WebGL/WebGPU 3D engine for building games, configurators, and interactive 3D experiences that run in any browser. It can be used via the browser-based PlayCanvas Editor, as a standalone engine from npm/CDN, through React components, or through Web Components.

This file is a structured overview of the PlayCanvas developer documentation.
Complete documentation content: {{BASE_URL}}/llms-full.txt
Full API reference: https://api.playcanvas.com

Base URL: {{BASE_URL}}
Engine Version: {{ENGINE_VERSION}}
Total Documents: {{TOTAL_DOCS}}
Generated: {{DATE}}

## Instructions for Large Language Models

When generating PlayCanvas code, follow these guidelines:

### 1. Identify Which of the Four Workflows the User Is In

PlayCanvas is used in four distinct ways. Do not mix patterns between them:

1. **PlayCanvas Editor** (browser-based editor at https://playcanvas.com): gameplay code is written as scripts attached to entities. See {{BASE_URL}}/user-manual/editor/
2. **Engine only** (code-first): `npm install playcanvas` or load from a CDN, then build the scene programmatically. See {{BASE_URL}}/user-manual/engine/
3. **React**: `npm install @playcanvas/react playcanvas` for declarative scenes in JSX. See {{BASE_URL}}/user-manual/react/
4. **Web Components**: `npm install playcanvas @playcanvas/web-components` for declarative scenes in plain HTML. See {{BASE_URL}}/user-manual/web-components/

### 2. Editor Scripting: ESM Scripts vs Classic Scripts

There are two script formats. ESM scripts are the modern, recommended format. Never blend the two syntaxes in one file.

WRONG - mixing classic and ESM patterns:

```javascript
import { Script } from 'playcanvas';

export class Rotate extends Script {
    // WRONG: classic-style attribute declaration does not exist on ESM scripts
    static attributes = { speed: { type: 'number', default: 10 } };

    initialize() {
        // WRONG: classic 'attr:' change events are NOT supported by ESM scripts
        this.on('attr:speed', () => {});
    }
}
```

CORRECT - ESM script (file extension MUST be `.mjs` for the Editor to recognize it):

```javascript
import { Script } from 'playcanvas';

export class Rotate extends Script {
    static scriptName = 'rotate';

    /** @attribute */
    speed = 10;

    initialize() {
        // setup
    }

    update(dt) {
        this.entity.rotate(0, this.speed * dt, 0);
    }
}
```

CORRECT - classic script (legacy but fully supported, plain `.js` files):

```javascript
var Rotate = pc.createScript('rotate');

Rotate.attributes.add('speed', { type: 'number', default: 10 });

Rotate.prototype.initialize = function () {
    // setup
};

Rotate.prototype.update = function (dt) {
    this.entity.rotate(0, this.speed * dt, 0);
};
```

Key rules:

- ESM scripts require the `.mjs` file extension and a `static scriptName` property.
- ESM script attributes are class fields tagged with a `/** @attribute */` JSDoc comment, not `attributes.add()`.
- ESM scripts do not support classic `attr:[name]` change events.

### 3. Engine-Only Usage (npm or CDN)

CORRECT - ES Modules with an import map (no build step):

```html
<script type="importmap">
    {
        "imports": {
            "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas/+esm"
        }
    }
</script>
<script type="module">
    import * as pc from 'playcanvas';

    // create graphics device, app, entities...
</script>
```

Or with a bundler: `npm install playcanvas` then `import * as pc from 'playcanvas'`.

### 4. React Usage

```jsx
import { Application, Entity } from '@playcanvas/react';
import { Camera, Light, Render } from '@playcanvas/react/components';

const App = () => (
    <Application>
        <Entity name="camera" position={[4, 1, 4]}>
            <Camera />
        </Entity>
        <Entity name="light" rotation={[45, 45, 0]}>
            <Light type="directional" />
        </Entity>
        <Entity name="ball">
            <Render type="sphere" />
        </Entity>
    </Application>
);
```

Hooks (e.g. `useModel`, `useEnvAtlas`) are imported from `@playcanvas/react/hooks`.

### 5. Web Components Usage

```html
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 3">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 45 0">
            <pc-light type="directional"></pc-light>
        </pc-entity>
        <pc-entity name="ball">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

Custom scripts attach to an entity via a `<pc-scripts>` element wrapping one `<pc-script>` element per script.

### 6. Versions

If the metadata at the top of this file includes an Engine Version line, generate code against that release. PlayCanvas Engine 2.x is the current major version; prefer current API names from https://api.playcanvas.com/engine/ over deprecated 1.x-era patterns.

## Recommended Entry Points

- [Getting Started]({{BASE_URL}}/user-manual/getting-started/): Learn the platform, make a first project, and find your workflow.
- [PlayCanvas Editor]({{BASE_URL}}/user-manual/editor/): The collaborative browser-based editor for building scenes, assets, and games.
- [PlayCanvas Engine]({{BASE_URL}}/user-manual/engine/): Using the open-source engine standalone from npm or a CDN.
- [PlayCanvas React]({{BASE_URL}}/user-manual/react/): Declarative 3D scenes with @playcanvas/react components and hooks.
- [Web Components]({{BASE_URL}}/user-manual/web-components/): Declarative 3D scenes in plain HTML with @playcanvas/web-components.
- [Scripting]({{BASE_URL}}/user-manual/scripting/): Script lifecycle, attributes, events, and the ESM vs classic script formats.
- [Gaussian Splatting]({{BASE_URL}}/user-manual/gaussian-splatting/): Rendering 3D Gaussian splats, formats, and building splat applications.
- [Graphics]({{BASE_URL}}/user-manual/graphics/): Cameras, lighting, materials, shaders, and post effects.
- [Physics]({{BASE_URL}}/user-manual/physics/): Rigid bodies, collision, triggers, and forces with the ammo.js integration.
- [XR (VR/AR)]({{BASE_URL}}/user-manual/xr/): WebXR-based virtual and augmented reality.

## Essential API

The full API reference lives at https://api.playcanvas.com. Engine classes follow the pattern `https://api.playcanvas.com/engine/classes/<ClassName>.html`.

### Application & Scene

- [AppBase](https://api.playcanvas.com/engine/classes/AppBase.html): Base application class - manages the update loop, component systems, and asset registry.
- [Application](https://api.playcanvas.com/engine/classes/Application.html): Convenience application class for engine-only (standalone) projects.
- [Entity](https://api.playcanvas.com/engine/classes/Entity.html): Scene-graph node that components attach to; provides transform methods.
- [Scene](https://api.playcanvas.com/engine/classes/Scene.html): Scene-level rendering settings such as skybox, fog, and ambient light.

### Scripting

- [Script](https://api.playcanvas.com/engine/classes/Script.html): Base class for ESM scripts with initialize/update lifecycle methods.
- [ScriptComponent](https://api.playcanvas.com/engine/classes/ScriptComponent.html): Manages the scripts attached to an entity.

### Components

- [CameraComponent](https://api.playcanvas.com/engine/classes/CameraComponent.html): Renders the scene from the entity's viewpoint.
- [LightComponent](https://api.playcanvas.com/engine/classes/LightComponent.html): Directional, omni, or spot light source.
- [RenderComponent](https://api.playcanvas.com/engine/classes/RenderComponent.html): Renders meshes, including primitive shapes and imported models.
- [CollisionComponent](https://api.playcanvas.com/engine/classes/CollisionComponent.html): Collision volume for physics and trigger events.
- [RigidBodyComponent](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html): Static, dynamic, or kinematic physics body.
- [AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html): Animation state graph playback and blending.
- [ScreenComponent](https://api.playcanvas.com/engine/classes/ScreenComponent.html): Root of a 2D screen-space or world-space UI hierarchy.
- [ElementComponent](https://api.playcanvas.com/engine/classes/ElementComponent.html): UI image, text, or group element.
- [SoundComponent](https://api.playcanvas.com/engine/classes/SoundComponent.html): Positional and non-positional audio playback.
- [GSplatComponent](https://api.playcanvas.com/engine/classes/GSplatComponent.html): Renders 3D Gaussian splats.

### Graphics & Assets

- [StandardMaterial](https://api.playcanvas.com/engine/classes/StandardMaterial.html): The default PBR material with diffuse, metalness, gloss, and emissive channels.
- [Texture](https://api.playcanvas.com/engine/classes/Texture.html): GPU texture resource.
- [GraphicsDevice](https://api.playcanvas.com/engine/classes/GraphicsDevice.html): WebGL/WebGPU rendering interface.
- [Asset](https://api.playcanvas.com/engine/classes/Asset.html): A reference to a loadable resource such as a model, texture, or audio file.
- [AssetRegistry](https://api.playcanvas.com/engine/classes/AssetRegistry.html): Loads and looks up assets at runtime (available as app.assets).

### Math

- [Vec3](https://api.playcanvas.com/engine/classes/Vec3.html): 3-dimensional vector.
- [Quat](https://api.playcanvas.com/engine/classes/Quat.html): Quaternion rotation.
- [Color](https://api.playcanvas.com/engine/classes/Color.html): RGBA color.

### Input

- [Keyboard](https://api.playcanvas.com/engine/classes/Keyboard.html): Keyboard input (available as app.keyboard).
- [Mouse](https://api.playcanvas.com/engine/classes/Mouse.html): Mouse input (available as app.mouse).

### Other API References

- [Engine API](https://api.playcanvas.com/engine/): Full engine reference - rendering, physics, animation, sound, XR.
- [Editor API](https://api.playcanvas.com/editor/): Scripting the PlayCanvas Editor itself.
- [Web Components API](https://api.playcanvas.com/web-components/): Custom element reference.
- [PCUI](https://api.playcanvas.com/pcui/) / [PCUI Graph](https://api.playcanvas.com/pcui-graph/): UI component library for tools and node-based editors.
- [Observer](https://api.playcanvas.com/observer/): Reactive data observation and binding.
- [SplatTransform](https://api.playcanvas.com/splat-transform/): Library and CLI for converting and editing Gaussian splats.

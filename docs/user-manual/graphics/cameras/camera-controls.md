---
title: Camera Controls
description: Add orbit, fly, and pan navigation to any camera with the engine's ready-made camera-controls script, with mouse, touch, and gamepad support.
---

:::ai

* **[Engine Development](/user-manual/ai/developing-with-engine/):** Add orbit, fly, and pan navigation to any camera with the engine's ready-made camera-controls script, with mouse, touch, and gamepad support; launch the application, capture the rendered result, and check the console for shader or rendering errors.
* **[VS Code Extension](/user-manual/ai/vscode-extension/):** Edit and review the camera scripts used by “Camera Controls” locally in Pull/Push mode.
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Configure the open project for Camera Controls so the result satisfies this requirement: add orbit, fly, and pan navigation to any camera with the engine's ready-made camera-controls script, with mouse, touch, and gamepad support; launch the scene, capture the rendered result, and check the console for shader or rendering errors.

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Most applications need some way for the user to move the camera. Rather than writing this from scratch, you can use the `CameraControls` script that ships with the engine at [`scripts/esm/camera-controls.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/camera-controls.mjs). It provides production-quality navigation with a single script:

* **Orbit** — left mouse drag rotates around a focus point, right mouse drag pans, and the mouse wheel zooms.
* **Fly** — WASD keys move the camera freely while the mouse looks around.
* **Touch and gamepad** — multi-touch gestures and gamepad input are supported out of the box.

Attach the script to a camera entity:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// Load the script (here from the CDN; you can also bundle it with your app)
const asset = new pc.Asset('camera-controls', 'script', {
    url: 'https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs'
});
app.assets.add(asset);
app.assets.load(asset);

asset.ready(() => {
    // Attach it to the camera entity
    camera.addComponent('script');
    camera.script.create('cameraControls', {
        properties: {
            focusPoint: new pc.Vec3(0, 1, 0)
        }
    });
});
```

If you build your app with a bundler, you can import the script class directly instead:

```javascript
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';

camera.addComponent('script');
camera.script.create(CameraControls);
```

</TabItem>
<TabItem value="editor" label="Editor">

Add `camera-controls.mjs` to your project as a script asset (copy it from the [engine repository](https://github.com/playcanvas/engine/blob/main/scripts/esm/camera-controls.mjs)). Then select your camera entity, add a [Script Component](/user-manual/editor/scenes/components/script) and add the **cameraControls** script to it. The script's attributes can then be tuned in the Inspector.

</TabItem>
<TabItem value="react" label="React">

```jsx
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';
import { Script } from '@playcanvas/react/components';

<Entity name="camera" position={[0, 1, 4]}>
  <Camera />
  <Script script={CameraControls} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-app>
  <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs"></pc-asset>
  <pc-scene>
    <pc-entity name="camera" position="0 1 4">
      <pc-camera></pc-camera>
      <pc-scripts>
        <pc-script name="cameraControls"></pc-script>
      </pc-scripts>
    </pc-entity>
  </pc-scene>
</pc-app>
```

</TabItem>
</Tabs>

## Configuration {#configuration}

The script exposes a rich set of attributes. The most commonly used are:

| Attribute | Default | Description |
| --- | --- | --- |
| `enableOrbit` | `true` | Enable orbit controls |
| `enableFly` | `true` | Enable fly controls |
| `enablePan` | `true` | Enable panning |
| `focusPoint` | `[0, 0, 0]` | The point the camera orbits around |
| `rotateSpeed` | `0.2` | Rotation sensitivity |
| `moveSpeed` | `10` | Fly movement speed (with `moveFastSpeed` and `moveSlowSpeed` variants) |
| `zoomSpeed` | `0.001` | Zoom sensitivity |
| `pitchRange` | `[-360, 360]` | Limits for the camera's pitch angle in degrees |
| `zoomRange` | `[0.01, 0]` | Min/max zoom distance (a max of 0 means unlimited) |

Damping attributes (`rotateDamping`, `moveDamping`, `zoomDamping`, `focusDamping`, all defaulting to `0.98`) control how smoothly motion eases out — 0 stops instantly. To create a pure orbit camera, disable fly; for a pure fly camera, disable orbit.

## Examples {#examples}

See the script in action in the engine examples:

<EngineExample id="camera/orbit" title="Orbit Camera" />

<EngineExample id="camera/fly" title="Fly Camera" />

<EngineExample id="camera/multi" title="Multi Camera" />

For building your own custom camera logic instead, the [Orbit Camera tutorial](/tutorials/orbit-camera) walks through a complete implementation.

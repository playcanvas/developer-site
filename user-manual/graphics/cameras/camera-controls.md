# Camera Controls

Most applications need some way for the user to move the camera. Rather than writing this from scratch, you can use the `CameraControls` script that ships with the engine at [`scripts/esm/camera-controls.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/camera-controls.mjs). It provides production-quality navigation with a single script:

* **Orbit** — left mouse drag rotates around a focus point, right mouse drag pans, and the mouse wheel zooms.
* **Fly** — WASD keys move the camera freely while the mouse looks around.
* **Touch and gamepad** — multi-touch gestures and gamepad input are supported out of the box.

Attach the script to a camera entity:

**Engine**

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

**Editor**

Add `camera-controls.mjs` to your project as a script asset (copy it from the [engine repository](https://github.com/playcanvas/engine/blob/main/scripts/esm/camera-controls.mjs)). Then select your camera entity, add a [Script Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/script.md) and add the **cameraControls** script to it. The script's attributes can then be tuned in the Inspector.

**React**

```jsx
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';
import { Script } from '@playcanvas/react/components';

<Entity name="camera" position={[0, 1, 4]}>
  <Camera />
  <Script script={CameraControls} />
</Entity>
```

**Web Components**

```html
<pc-app>
  <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs"></pc-asset>
  <pc-scene>
    <pc-entity name="camera" position="0 1 4">
      <pc-camera></pc-camera>
      <pc-script>
        <pc-script-instance name="cameraControls"></pc-script-instance>
      </pc-script>
    </pc-entity>
  </pc-scene>
</pc-app>
```

## Configuration

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

## Examples

See the script in action in the engine examples:

[Live example: Orbit Camera](https://playcanvas.com/examples/#/camera/orbit) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/camera/orbit.example.mjs))

[Live example: Fly Camera](https://playcanvas.com/examples/#/camera/fly) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/camera/fly.example.mjs))

[Live example: Multi Camera](https://playcanvas.com/examples/#/camera/multi) ([source](https://github.com/playcanvas/engine/blob/main/examples/src/examples/camera/multi.example.mjs))

For building your own custom camera logic instead, the [Orbit Camera tutorial](https://developer.playcanvas.com/tutorials/orbit-camera) walks through a complete implementation.

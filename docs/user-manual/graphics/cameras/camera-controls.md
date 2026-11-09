---
title: Camera Controls
description: Add orbit, fly, and pan navigation to any camera with the engine's ready-made camera-controls script, with mouse, touch, and gamepad support.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Most applications need some way for the user to move the camera. Rather than writing this from scratch, you can use the `CameraControls` script that ships with the engine at [`scripts/esm/camera-controls.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/camera-controls.mjs). It provides production-quality navigation with a single script:

* **Orbit** — left mouse drag rotates around a focus point, middle mouse drag pans, and the mouse wheel zooms.
* **Fly** — WASD keys move the camera freely, and dragging with the right mouse button looks around.
* **Touch and gamepad** — multi-touch gestures and gamepad input are supported out of the box.

Attach the script to a camera entity:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// Load the script (here from the CDN; you can also bundle it with your app)
const asset = new Asset('camera-controls', 'script', {
    url: 'https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs'
});
app.assets.add(asset);
app.assets.load(asset);

asset.ready(() => {
    // Attach it to the camera entity
    camera.addComponent('script');
    camera.script.create('cameraControls', {
        properties: {
            focusPoint: new Vec3(0, 1, 0)
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
      <pc-script>
        <pc-script-instance name="cameraControls"></pc-script-instance>
      </pc-script>
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
| `leftButton` | `orbit` | The action of the left mouse button, see [Mouse Buttons](#mouse-buttons) |
| `middleButton` | `pan` | The action of the middle mouse button |
| `rightButton` | `look` | The action of the right mouse button |
| `groundPan` | `false` | Pan across the ground instead of the plane of the view, see [Dragging the ground like a map](#ground-pan) |

Damping attributes (`rotateDamping`, `moveDamping`, `zoomDamping`, `focusDamping`, all defaulting to `0.98`) control how smoothly motion eases out — 0 stops instantly. To create a pure orbit camera, disable fly; for a pure fly camera, disable orbit.

## Mouse Buttons {#mouse-buttons}

The `leftButton`, `middleButton` and `rightButton` attributes set what each mouse button does:

| Action | Description |
| --- | --- |
| `orbit` | Turns the view around the focus point. With shift held, it pans instead. |
| `pan` | Pans the view. |
| `look` | Turns the view in place, as when flying with the keys. It orbits instead when `enableFly` is off. |
| `none` | Ignores the button, leaving it to your application. |

By default the left button orbits, the middle button pans and the right button looks. In the Editor, the attributes are dropdowns in the Inspector. For example, to look with the left button and orbit with the right:

```javascript
camera.script.create(CameraControls, {
    properties: {
        leftButton: 'look',
        rightButton: 'orbit'
    }
});
```

A drag follows the button that started it. Pressing a second button during a drag changes nothing, because browsers do not report it as a new press.

### Reserving a button for your application {#reserving-a-button}

A button set to `none` is ignored entirely, both its presses and the drags that follow, so your application can use it, for example to paint or to select. The other buttons and the mouse wheel keep navigating:

```javascript
camera.script.create(CameraControls, {
    properties: {
        rightButton: 'none'
    }
});

app.mouse.on(EVENT_MOUSEDOWN, (event) => {
    if (event.button === MOUSEBUTTON_RIGHT) {
        // start painting
    }
});
```

The [Paint example](https://playcanvas.github.io/#/gaussian-splatting/paint) works this way.

### Dragging the ground like a map {#ground-pan}

By default, panning moves the camera across the plane of the view. With `groundPan` enabled, a drag instead holds the point of the ground under the cursor, as when dragging a map, and the camera keeps its height. The ground is the horizontal plane at the height of the `focusPoint`, so place the focus point at ground level. Panning with two touches moves across the ground too. To drag the map with the left button and orbit with the others:

```javascript
camera.script.create(CameraControls, {
    properties: {
        leftButton: 'pan',
        middleButton: 'orbit',
        rightButton: 'orbit',
        groundPan: true,
        focusPoint: new Vec3(0, 0, 0)
    }
});
```

## Examples {#examples}

See the script in action in the engine examples:

<EngineExample id="camera/orbit" title="Orbit Camera" />

<EngineExample id="camera/fly" title="Fly Camera" />

<EngineExample id="camera/multi" title="Multi Camera" />

For building your own custom camera logic instead, the [Orbit Camera tutorial](/tutorials/orbit-camera) walks through a complete implementation.

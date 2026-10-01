---
title: Controllers
description: "XR controllers in PlayCanvas: the grip pose and attaching objects to a controller, drawing controller models with the XrControllers script, reading buttons, triggers and thumbsticks from the gamepad, haptic pulses, and controller velocity."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Handheld controllers are [input sources](/user-manual/xr/input-sources/) with more to offer than a ray: a pose you can draw a model at, buttons, triggers and thumbsticks, vibration, and a velocity for throwing things. This page covers each, and the `XrControllers` script that draws the controllers for you.

![Two Meta Quest Touch Plus controller models, with the grip pose of each shown as red, green and blue axes](/img/user-manual/xr/controllers/controllers.webp)

<EngineExample id="xr/vr-controllers" title="VR Controllers" />

## Grip Pose {#grip-pose}

An input source you can hold, such as a controller, has a *grip pose*: the position and rotation of the user's closed hand around it. `inputSource.grip` is `true` once the device reports one. Its position and rotation in world space are `inputSource.getPosition()` and `inputSource.getRotation()`, which return `null` without one:

```javascript
// Keep a torch in the user's right hand
app.on('update', () => {
    for (const inputSource of app.xr.input.inputSources) {
        if (inputSource.handedness === pc.XRHAND_RIGHT && inputSource.grip) {
            torch.setPosition(inputSource.getPosition());
            torch.setRotation(inputSource.getRotation());
        }
    }
});
```

The grip pose's origin is at the center of the user's curled fingers. Its negative Z axis points along the handle, toward the thumb, and its positive Y axis points roughly along the user's arm. Model held objects to match, or add them as children of an entity that follows the grip, with an offset.

`inputSource.getLocalPosition()` and `inputSource.getLocalRotation()` return the same pose relative to the [camera rig](/user-manual/xr/sessions/#the-camera-and-its-rig). Like the ray, the four methods return vectors and quaternions that the input source reuses, so copy them to keep them.

Tracked hands have no grip pose: use the joints of the [hand](/user-manual/xr/hand-tracking/) instead.

## Controller Models {#controller-models}

The `XrControllers` script draws a model of each controller and hand that the device tracks, and moves it with the controller or with the joints of the hand. When an input source is added, it looks its profiles up, in order, in the [WebXR input profiles](https://github.com/immersive-web/webxr-input-profiles) asset repository, and loads the model of the first one it finds for that hand. When the input source is removed, or the session ends, it destroys the model.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

Add it to the camera rig, or any other entity. Your application needs the script and render component systems, and the container and texture resource handlers:

```javascript
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';

rig.addComponent('script');
rig.script.create(XrControllers);
```

</TabItem>
<TabItem value="editor" label="Editor">

Add `xr-controllers.mjs`, from the `scripts/esm/xr` folder of the [engine repository](https://github.com/playcanvas/engine/tree/main/scripts/esm/xr), to your project as a script asset. Then add **xrControllers** to the Script component of the camera rig, or of any other entity.

</TabItem>
<TabItem value="react" label="React">

```jsx
import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';

<Entity name="rig">
  {/* the camera ... */}
  <Script script={XrControllers} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

With `xr-controllers.mjs` declared in a [`<pc-asset>`](/user-manual/web-components/tags/pc-asset/):

```html
<pc-entity name="rig">
    <!-- the camera ... -->
    <pc-script>
        <pc-script-instance name="xrControllers"></pc-script-instance>
    </pc-script>
</pc-entity>
```

</TabItem>
</Tabs>

By default, the script loads the profiles and models from the jsDelivr CDN. To serve them yourself, for example to work offline, copy the `dist/profiles` folder of the [`@webxr-input-profiles/assets`](https://www.npmjs.com/package/@webxr-input-profiles/assets) npm package to your server, and set the script's `basePath` attribute to its URL.

The script fires two application events. `xr:controller:add` passes the input source and the entity of its model, once the model has loaded, and `xr:controller:remove` passes the input source. Use them to add things to a controller's model, or to hide just that model:

```javascript
app.on('xr:controller:add', (inputSource, entity) => {
    console.log(`Drawing a model for the ${inputSource.handedness} ${inputSource.hand ? 'hand' : 'controller'}`);
});
```

To hide every model, for example while the user holds a tool that replaces the controller, set the script's `visible` property to `false`. To draw models of your own, leave the script out, and load and move your models in your own `add`, `remove` and `update` handlers, as the [grip pose](#grip-pose) example moves the torch.

## Buttons and Thumbsticks {#buttons-and-thumbsticks}

`inputSource.gamepad` is a [`Gamepad`](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad) object with the state of the controller's buttons, triggers and thumbsticks, or `null` when the input source has none. Its `mapping` is `'xr-standard'`, which fixes the meaning of the first entries:

| Index | `buttons` | `axes` |
| --- | --- | --- |
| 0 | Trigger, the select button | Touchpad X |
| 1 | Grip, the squeeze button | Touchpad Y |
| 2 | Touchpad press | Thumbstick X, from -1 (left) to 1 (right) |
| 3 | Thumbstick press | Thumbstick Y, from -1 (forward) to 1 (back) |

Inputs the controller doesn't have are placeholders that are never pressed and read 0, and they are left out at the end of the arrays, so check the length or use optional chaining, as below. Further buttons are listed in the controller's profile. On Meta Quest Touch controllers, buttons 4 and 5 are A and B on the right controller, and X and Y on the left one. Each button has a `pressed` state, a `touched` state, and a `value` from 0 to 1 for analog triggers.

The browser updates the gamepad every frame, and sends no events for buttons other than select and squeeze. Read it in `update`, and compare with the previous frame to find presses:

```javascript
const wasPressed = new Map();

app.on('update', () => {
    for (const inputSource of app.xr.input.inputSources) {
        const gamepad = inputSource.gamepad;
        if (!gamepad) continue;

        // A on the right Touch controller, X on the left one
        const pressed = gamepad.buttons[4]?.pressed ?? false;
        if (pressed && !wasPressed.get(inputSource)) {
            console.log(`Pressed the face button on the ${inputSource.handedness} controller`);
        }
        wasPressed.set(inputSource, pressed);

        // The thumbstick, with a dead zone around its center
        const x = gamepad.axes[2] ?? 0;
        const y = gamepad.axes[3] ?? 0;
        if (Math.hypot(x, y) > 0.2) {
            console.log(`Thumbstick at ${x.toFixed(2)}, ${y.toFixed(2)}`);
        }
    }
});
```

Tracked hands can have a gamepad too. On Meta Quest, a hand's button 0 is its pinch. Test the buttons you use, rather than taking a gamepad to mean a controller.

## Haptics {#haptics}

Controllers that can vibrate have haptic actuators on their gamepad. A pulse takes an intensity, typically from 0 to 1, and a duration in milliseconds:

```javascript
app.xr.input.on('select', (inputSource) => {
    inputSource.gamepad?.hapticActuators?.[0]?.pulse(0.6, 50);
});
```

Not every device and browser supports haptics, so test for the actuator before you use it, as above.

## Velocity {#velocity}

`inputSource.getLinearVelocity()` returns the velocity of an input source with a grip pose, in meters per second, or `null` until it is known. Where the device reports a velocity, the engine uses it, and otherwise it estimates one from the change in position over recent frames. Use it to throw what the user lets go of. See [Throwing](/user-manual/xr/pointing-and-grabbing/#throwing).

The velocity is relative to the camera rig, so it doesn't include the rig's own motion. From engine 2.23 it is in world space. Before that, it was in the rig's space, which is the same as world space while the rig is unrotated.

## See Also

- [Input Sources](/user-manual/xr/input-sources/) - Rays, select and squeeze, handedness and profiles
- [Hand Tracking](/user-manual/xr/hand-tracking/) - Tracked hands and their joints
- [Pointing and Grabbing](/user-manual/xr/pointing-and-grabbing/) - Grabbing, carrying and throwing objects
- [WebXR Tracked Controllers](/tutorials/webxr-tracked-controllers/) and [WebXR Controller/Hand Models](/tutorials/webxr-controllerhand-models/) - Tutorials with Editor projects

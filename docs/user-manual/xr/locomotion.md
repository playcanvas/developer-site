---
title: Locomotion
description: "Moving users through XR scenes in PlayCanvas: teleporting and turning the camera rig yourself, the XrNavigation script for teleporting, smooth movement and snap or smooth turning, landing teleports on physics geometry, the XrManipulation script for grabbing the world with both hands, and keeping movement comfortable."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Users can walk only as far as their room allows. To take them further, move the [camera rig](/user-manual/xr/sessions/#the-camera-and-its-rig), the camera's parent: the headset keeps moving the camera within the rig, and the rig carries the camera through the scene. This page covers moving the rig yourself, the engine's `XrNavigation` script that does it with controllers and hands, and the `XrManipulation` script that moves the world toward the user instead.

![A teleport arc from a controller lands in a ring on the floor, ahead of the user](/img/user-manual/xr/locomotion/teleport.webp)

## Moving the Rig {#moving-the-rig}

Translate the rig to move the user, and rotate it about the vertical axis to turn them. Two details keep this natural:

- The user's head is rarely at the rig's origin, since they move around their room. To teleport them to a point, move the rig so that their head, not the rig's origin, ends up above it.
- To turn the user in place, rotate the rig around their head, rather than around its origin.

```javascript
// Teleport the user so that their head is above a point on the floor
const teleport = (point) => {
    const head = camera.getPosition();
    const origin = rig.getPosition();
    rig.setPosition(point.x - (head.x - origin.x), point.y, point.z - (head.z - origin.z));
};

// Turn the user around their head, by an angle in degrees
const offset = new pc.Vec3();
const turn = (degrees) => {
    offset.copy(camera.getLocalPosition());
    rig.translateLocal(offset);
    rig.rotateLocal(0, degrees, 0);
    rig.translateLocal(offset.mulScalar(-1));
};
```

These assume a `local-floor` session, in which the rig's origin is on the floor, and a rig without scale. Controllers and hands move with the rig, as their poses and rays are reported through it.

## XrNavigation {#xr-navigation}

The `XrNavigation` script gives users several ways to move, all at once, so that they can use the ones they prefer:

| Input | Action |
| --- | --- |
| Hold select (the trigger, or a pinch), aim, and release | Teleport. An arc shows where the user will land, in the valid color when they can |
| Left thumbstick | Move smoothly, in the direction the user faces |
| Right thumbstick, left or right | Turn: 45° per flick by default, or smoothly |
| Right thumbstick, up or down | Rise or sink 0.5 meters per flick, or 2 meters while the right grip is held |

Thumbsticks need controllers. With hands, users teleport by pinching.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

Add the script to the camera rig, whose child the camera is:

```javascript
import { XrNavigation } from 'playcanvas/scripts/esm/xr/xr-navigation.mjs';

rig.script.create(XrNavigation, {
    properties: {
        turnMode: 'smooth',
        movementSpeed: 2
    }
});
```

</TabItem>
<TabItem value="editor" label="Editor">

Add `xr-navigation.mjs`, from the `scripts/esm/xr` folder of the [engine repository](https://github.com/playcanvas/engine/tree/main/scripts/esm/xr), to your project as a script asset. Then add **xrNavigation** to the Script component of the camera rig, and set its attributes in the inspector.

</TabItem>
<TabItem value="react" label="React">

```jsx
import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';
import { XrNavigation } from 'playcanvas/scripts/esm/xr/xr-navigation.mjs';

<Entity name="rig">
  {/* the camera ... */}
  <Script script={XrNavigation} turnMode="smooth" movementSpeed={2} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

With `xr-navigation.mjs` declared in a [`<pc-asset>`](/user-manual/web-components/tags/pc-asset/):

```html
<pc-entity name="rig">
    <!-- the camera ... -->
    <pc-script>
        <pc-script-instance name="xrNavigation" turn-mode="smooth" movement-speed="2"></pc-script-instance>
    </pc-script>
</pc-entity>
```

</TabItem>
</Tabs>

Its main attributes:

| Attribute | Default | Description |
| --- | --- | --- |
| `enableTeleport` | `true` | Teleport with select |
| `enableMove` | `true` | Move with the left thumbstick, and turn with the right one |
| `movementSpeed` | 1.5 | The speed of smooth movement, in meters per second |
| `turnMode` | `'snap'` | `'snap'` to turn in steps, `'smooth'` to turn continuously, or `'none'` |
| `rotateSpeed` | 45 | The angle of each snap turn, in degrees |
| `smoothTurnSpeed` | 90 | The speed of smooth turning, in degrees per second |
| `enableSnapVertical` | `true` | Rise and sink with the right thumbstick |
| `maxTeleportDistance` | 10 | The furthest a teleport can go, in meters |
| `groundHeight` | 0 | The height of the flat ground that teleports land on |
| `teleportArcSpeed` | 8 | How far the arc reaches. A higher speed throws it further |
| `validTeleportColor`, `invalidTeleportColor` | Cyan, red | The colors of the arc where the user can and can't land |

The script also has attributes for the thumbstick thresholds, and the size and detail of the arc and its landing ring.

### Landing on Your Geometry {#landing-on-your-geometry}

By default, teleports land on a flat plane at `groundHeight`. For uneven ground, stairs or platforms, assign the script's `castRay` function. It receives the start and end of each segment of the arc, in world space, and returns the point the segment hits, or `null`. With [physics](/user-manual/physics/), cast the segment into the physics world:

```javascript
const navigation = rig.script.xrNavigation;
const from = new pc.Vec3();
const lastEnd = new pc.Vec3();
let blocked = false;

navigation.castRay = (start, end) => {
    // Each segment starts where the last one ended, so a new arc starts somewhere else
    if (!start.equals(lastEnd)) blocked = false;
    lastEnd.copy(end);
    if (blocked) return null;

    // Cast from 5 cm before the segment, as a ray that starts just above a surface can miss it
    from.sub2(start, end).normalize().mulScalar(0.05).add(start);
    const result = app.systems.rigidbody.raycastFirst(from, end);
    if (!result) return null;

    // Land only on surfaces that face up, such as floors and steps
    if (result.normal.y > 0.7) return result.point;

    // Anything else, such as a wall, blocks the rest of the arc
    blocked = true;
    return null;
};
```

`castRay` replaces the plane entirely. The script calls it for the segments of an arc in turn, from the hand outward, and the arc lands at the first point it returns, if that is within `maxTeleportDistance`. A segment for which it returns `null` doesn't stop the arc, so returning `null` for a wall would let the arc carry on through it and land behind it. The function above remembers that the arc has met a wall, and returns `null` for the rest of that arc, so the user can't teleport there. To land on some objects only, filter the ray cast by [collision group or tag](/user-manual/physics/ray-casting/#filtering-ray-casts). `castRay` is a function rather than an attribute, so assign it from code in the Editor, React and Web Components too.

### Teleporting and UI {#teleporting-and-ui}

The script teleports whenever a select ends with the arc on valid ground, including a select that clicks a button or a menu item. Turn teleporting off while users interact with UI. The `XrMenu` script fires `xr:menu:active` when its menu opens and closes:

```javascript
app.on('xr:menu:active', (active) => {
    rig.script.xrNavigation.enableTeleport = !active;
});
```

## Moving the World {#moving-the-world}

The `XrManipulation` script moves the scene rather than the user. Users squeeze both grips, or make fists with both hands, to grab the world, and then:

- Move both hands the same way to drag it, in any direction.
- Swing their hands around each other to turn it about the vertical axis.
- Move their hands apart or closer together to scale it up or down.

It moves a target entity, under which you put the content to manipulate. The camera rig doesn't change, so controllers, hands and menus keep their real-world size. This suits dioramas, maps and models that users inspect from all sides.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
import { XrManipulation } from 'playcanvas/scripts/esm/xr/xr-manipulation.mjs';

// The content to manipulate goes under a root of its own
const worldRoot = new pc.Entity('world root');
app.root.addChild(worldRoot);
worldRoot.addChild(model);

rig.script.create(XrManipulation, {
    properties: {
        target: worldRoot,
        minScale: 0.5,
        maxScale: 4
    }
});
```

</TabItem>
<TabItem value="editor" label="Editor">

Add `xr-manipulation.mjs` from the [engine repository](https://github.com/playcanvas/engine/tree/main/scripts/esm/xr) to your project as a script asset. Put the content to manipulate under an entity of its own, add **xrManipulation** to the Script component of the camera rig, and drag that entity onto its **Target** attribute.

</TabItem>
<TabItem value="react" label="React">

Pass the target entity once it exists. `<Entity ref>` gives you the engine entity:

```jsx
import { useState } from 'react';
import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';
import { XrManipulation } from 'playcanvas/scripts/esm/xr/xr-manipulation.mjs';

function Scene() {
  const [worldRoot, setWorldRoot] = useState(null);
  return (
    <>
      <Entity name="world root" ref={setWorldRoot}>
        {/* the content to manipulate ... */}
      </Entity>
      <Entity name="rig">
        {/* the camera ... */}
        {worldRoot && <Script script={XrManipulation} target={worldRoot} minScale={0.5} maxScale={4} />}
      </Entity>
    </>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

With `xr-manipulation.mjs` declared in a [`<pc-asset>`](/user-manual/web-components/tags/pc-asset/), reference the target entity by name:

```html
<pc-entity name="world root">
    <!-- the content to manipulate ... -->
</pc-entity>
<pc-entity name="rig">
    <!-- the camera ... -->
    <pc-script>
        <pc-script-instance name="xrManipulation" target="entity:world root" min-scale="0.5" max-scale="4"></pc-script-instance>
    </pc-script>
</pc-entity>
```

</TabItem>
</Tabs>

| Attribute | Default | Description |
| --- | --- | --- |
| `target` | | The entity to move, turn and scale |
| `enableTranslate`, `enableRotate`, `enableScale` | `true` | Which gestures are on |
| `minScale`, `maxScale` | 0.2, 5 | The range of scale, relative to the target's scale when the script starts |
| `scalePivot` | `'feet'` | `'feet'` keeps what is on the floor on the floor as the world scales, for scenes the user stands in. `'hands'` scales about the point between the hands, for tabletop models |
| `scaleThreshold` | 0.15 | How far the hands must move apart or together, as a fraction of their distance, before scaling starts |
| `resetEvent` | `'xr:manipulation:reset'` | The application event that puts the target back as it was |

The target keeps its new transform when the session ends. Fire the reset event, for example from a menu item, to restore it. The script fires `xr:manipulation:active` with `true` and `false` as grabs start and end, and ignores grabs while an `XrMenu` is open.

`XrNavigation`'s teleport plane stays where it is as the world moves, so assign its [`castRay`](#landing-on-your-geometry) if users can move the world up and down. Avoid putting rigid bodies under the target: primitive collision shapes ignore its scale, and mesh shapes are rebuilt each time it changes.

## Comfort {#comfort}

Movement that the user sees but doesn't feel can make them sick. Some guidelines:

- **Prefer teleporting and snap turns.** They involve no visible motion, and suit most people. Offer smooth movement and turning as options rather than defaults. `XrNavigation` moves smoothly with the left thumbstick unless `enableMove` is `false`, and turns smoothly only when `turnMode` is `'smooth'`.
- **Move only when the user asks.** Never move or turn the rig on your own, for example to follow a cutscene. Fade to black, move, and fade back instead.
- **Keep speeds constant.** Acceleration is more uncomfortable than speed. Start and stop smooth movement at once, at a moderate speed such as the default of 1.5 meters per second.
- **Keep the horizon level.** Turn the rig only about the vertical axis.
- **Keep the frame rate up.** Dropped frames make any motion worse. See [Performance](/user-manual/xr/optimizing-webxr/).

## See Also

- [Sessions](/user-manual/xr/sessions/#the-camera-and-its-rig) - The camera rig, and reference spaces
- [Pointing and Grabbing](/user-manual/xr/pointing-and-grabbing/) - Grabbing objects rather than the world
- [UI in XR](/user-manual/user-interface/xr/) - Menus that coexist with teleporting
- [WebXR VR Lab](/tutorials/webxr-vr-lab/) - Tutorial with teleporting in an Editor project

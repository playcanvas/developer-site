---
title: <pc-joint>
description: "Reference for the pc-joint element: constrain two rigid bodies together with a fixed, ball, hinge, slider or 6dof physics joint, with limits, motors, springs and a break impulse."
---

The `<pc-joint>` tag constrains two rigid bodies to each other — a hinged door, a swinging chain, a sliding drawer, a rope that snaps under load.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-model>`](../pc-model) or a [`<pc-node>`](../pc-node).
* Both constrained entities need a [`<pc-rigid-body>`](../pc-rigid-body), and physics needs the `Ammo` module — see [`<pc-wasm>`](../pc-wasm).

:::

The entity holding the joint **is not itself constrained**. Its world transform defines the *joint frame*: the anchor point the constraint operates about, and the axes it operates along. The frame's local X axis is the primary axis — a hinge rotates about it, a slider translates along it, and a ball joint twists about it. The bodies being constrained are named by `entity-a` and `entity-b`.

So a joint is a third entity positioned where the pivot belongs, pointing the way the motion should go:

```html
<pc-entity name="hinge-anchor" position="0 2 0">
    <pc-collision half-extents="0.25 0.25 0.25"></pc-collision>
    <pc-rigid-body></pc-rigid-body>
</pc-entity>
<pc-entity name="hinge-arm" position="1 2 0">
    <pc-collision half-extents="1 0.1 0.1"></pc-collision>
    <pc-rigid-body type="dynamic"></pc-rigid-body>
</pc-entity>

<!-- The joint sits at the pivot, not on either body -->
<pc-entity name="hinge" position="0 2 0" rotation="0 90 0">
    <pc-joint type="hinge" entity-a="#hinge-arm" entity-b="#hinge-anchor"
              enable-limits limits="-100 100"></pc-joint>
</pc-entity>
```

Leaving `entity-b` empty constrains `entity-a` to a fixed point in world space, which is how you pin something to nothing. Parenting the joint entity to `entity-a` at the pivot is a common arrangement, and keeps the pivot with the part it belongs to.

:::warning[Alpha]

The engine's joint component is in alpha, so its behavior and API may change. Expect this element to follow it.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `angular-damping` | Vector3 | `"1 1 1"` | Spring damping per angular axis. Used by `6dof` |
| `angular-equilibrium` | Vector3 | `"0 0 0"` | Rest angle of the angular springs. Used by `6dof` |
| `angular-limits-x` | Vector2 | `"0 0"` | Rotation limits about the frame's X axis, as "min max" in degrees. Used by `6dof` |
| `angular-limits-y` | Vector2 | `"0 0"` | Rotation limits about the frame's Y axis, as "min max" in degrees. Used by `6dof` |
| `angular-limits-z` | Vector2 | `"0 0"` | Rotation limits about the frame's Z axis, as "min max" in degrees. Used by `6dof` |
| `angular-motion-x` | Enum | `"locked"` | Rotational freedom about the frame's X axis: `"locked"` \| `"limited"` \| `"free"`. Used by `6dof` |
| `angular-motion-y` | Enum | `"locked"` | Rotational freedom about the frame's Y axis: `"locked"` \| `"limited"` \| `"free"`. Used by `6dof` |
| `angular-motion-z` | Enum | `"locked"` | Rotational freedom about the frame's Z axis: `"locked"` \| `"limited"` \| `"free"`. Used by `6dof` |
| `angular-stiffness` | Vector3 | `"0 0 0"` | Spring stiffness per angular axis. Used by `6dof` |
| `break-impulse` | Number | never breaks | Impulse above which the constraint breaks. Omit for a joint that holds whatever happens |
| `enable-collision` | Boolean | `"false"` | Whether the two constrained bodies collide with each other |
| `enable-limits` | Boolean | `"false"` | Whether the joint's limits are enforced. Limit attributes do nothing until this is set |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `entity-a` | [Entity Reference](../attributes.md#entity-references) | - | Reference to the [`<pc-entity>`](../pc-entity) providing the first body. Needs a [`<pc-rigid-body>`](../pc-rigid-body) |
| `entity-b` | [Entity Reference](../attributes.md#entity-references) | - | Reference to the [`<pc-entity>`](../pc-entity) providing the second body. Leave empty to constrain `entity-a` to a fixed point in world space |
| `limits` | Vector2 | `"-45 45"` | Rotation or travel limits about the primary axis, as "min max" — degrees for `hinge`, units for `slider` |
| `linear-damping` | Vector3 | `"1 1 1"` | Spring damping per linear axis. Used by `6dof` |
| `linear-equilibrium` | Vector3 | `"0 0 0"` | Rest point of the linear springs. Used by `6dof` |
| `linear-limits-x` | Vector2 | `"0 0"` | Translation limits along the frame's X axis, as "min max". Used by `6dof` |
| `linear-limits-y` | Vector2 | `"0 0"` | Translation limits along the frame's Y axis, as "min max". Used by `6dof` |
| `linear-limits-z` | Vector2 | `"0 0"` | Translation limits along the frame's Z axis, as "min max". Used by `6dof` |
| `linear-motion-x` | Enum | `"locked"` | Linear freedom along the frame's X axis: `"locked"` \| `"limited"` \| `"free"`. Used by `6dof` |
| `linear-motion-y` | Enum | `"locked"` | Linear freedom along the frame's Y axis: `"locked"` \| `"limited"` \| `"free"`. Used by `6dof` |
| `linear-motion-z` | Enum | `"locked"` | Linear freedom along the frame's Z axis: `"locked"` \| `"limited"` \| `"free"`. Used by `6dof` |
| `linear-stiffness` | Vector3 | `"0 0 0"` | Spring stiffness per linear axis. Used by `6dof` |
| `max-motor-force` | Number | `"0"` | Maximum torque or force the motor can apply. Leave at 0 for no motor. Used by `hinge` and `slider` |
| `motor-speed` | Number | `"0"` | Target speed of the motor. Used by `hinge` and `slider` |
| `swing-limit-y` | Number | `"45"` | Maximum swing about the frame's Y axis, in degrees. Used by `ball` |
| `swing-limit-z` | Number | `"45"` | Maximum swing about the frame's Z axis, in degrees. Used by `ball` |
| `twist-limit` | Number | `"20"` | Maximum twist about the primary axis, in degrees. Used by `ball` |
| `type` | Enum | `"fixed"` | The kind of constraint: `"fixed"` \| `"ball"` \| `"hinge"` \| `"slider"` \| `"6dof"` |

</div>

## Joint Types

`type` decides which of the attributes above matter. Most of the table is `6dof` machinery that the four simpler types ignore, so start from the type you want and read only its row:

| Type | Constrains | Attributes it uses |
| --- | --- | --- |
| `fixed` | Rigidly locks the bodies together | — |
| `ball` | Ball and socket: free rotation about the anchor, with optional swing and twist limits | `swing-limit-y`, `swing-limit-z`, `twist-limit` |
| `hinge` | Rotation about the frame's X axis, with optional limits and motor | `limits`, `max-motor-force`, `motor-speed` |
| `slider` | Translation along the frame's X axis, with optional limits and motor | `limits`, `max-motor-force`, `motor-speed` |
| `6dof` | Each linear and angular axis independently locked, limited or free, with optional springs | the `linear-*` and `angular-*` families |

Every type also honours `entity-a`, `entity-b`, `enable-collision` and `break-impulse`.

Limits are opt-in twice over: they need `enable-limits` *and* a limit value. A `hinge` with `limits="-100 100"` and no `enable-limits` swings freely.

## Frames and Limits

Two things about limits catch people out, and neither is guessable from the attribute table.

**Limits are measured from the starting pose, not from the joint entity.** The two joint frames coincide at the moment the constraint is created, so every degree of freedom reads zero there. `limits="0 110"` on a hinge therefore means "from wherever this body started, up to 110 degrees", not "between 0 and 110 degrees of some absolute angle". The same is true of the `*-equilibrium` rest values.

**The frames are captured once.** They are taken when the constraint is created — typically when the component is enabled and both bodies are in the simulation — so moving the joint entity afterwards changes nothing. Re-capture from the current transforms with `refreshFrames()` on the underlying component. Entity scale is ignored throughout, matching how rigid bodies behave.

On signs: linear degrees of freedom are positive when `entity-b` (or the world anchor, when `entity-b` is empty) moves along the frame's positive axes relative to `entity-a`. Angular ones measure the other way round — positive when `entity-a` rotates counter-clockwise about the frame's axes relative to `entity-b`, viewed from each axis's positive end. When a limit turns out to be inverted, that pairing is usually why.

For a `6dof` joint, each axis starts `"locked"`, so a joint with nothing else set behaves like a `fixed` one. Open the axes you want with `linear-motion-*` and `angular-motion-*`, then bound the `"limited"` ones with the matching `linear-limits-*` or `angular-limits-*`.

## Events

Listen to this event using [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

| Event | Description |
| --- | --- |
| `break` | Fired when the impulse on the joint exceeds `break-impulse` and the constraint breaks. |

Unlike most element events here, `break` bubbles and is composed, so one listener on an ancestor can watch every joint in a scene:

```javascript
document.addEventListener('break', (event) => {
    console.log(`${event.target.getAttribute('entity-a')} came loose`);
});
```

A broken joint stops constraining its bodies, and nothing re-arms it on its own. Any of these bring it back: calling `refreshFrames()` on the underlying component, toggling the component's `enabled`, or changing `type`, `entity-a` or `entity-b`.

```javascript
const joint = document.querySelector('pc-joint');
joint.component.refreshFrames(); // re-armed, frames re-captured from the current transforms
```

## Example

A motor-driven hinge spinning a blade about a static hub. The joint entity sits at the pivot, rotated `"0 90 0"` so its local X axis — the hinge axis — points at the camera. Try a different `motor-speed` (negative reverses it), or add `enable-limits limits="-60 60"` and watch the motor stall against the stop:

```html live-example
<pc-app>
    <pc-wasm name="Ammo" glue="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.js" wasm="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.wasm" fallback="https://developer.playcanvas.com/assets/modules/ammo/ammo.js"></pc-wasm>
    <pc-scene>
        <pc-entity name="camera" position="0 2 6">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light></pc-light>
        </pc-entity>

        <!-- Static hub -->
        <pc-entity id="hub" position="0 2 0" rotation="90 0 0" scale="0.5 0.3 0.5">
            <pc-render type="cylinder"></pc-render>
            <pc-collision type="cylinder" radius="0.25" height="0.3"></pc-collision>
            <pc-rigid-body></pc-rigid-body>
        </pc-entity>

        <!-- Dynamic blade -->
        <pc-entity id="blade" position="0 2 0" scale="4 0.3 0.2">
            <pc-render type="box"></pc-render>
            <pc-collision half-extents="2 0.15 0.1"></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>

        <!-- The joint sits at the pivot; its frame's X axis is the hinge axis -->
        <pc-entity name="hinge" position="0 2 0" rotation="0 90 0">
            <pc-joint type="hinge" entity-a="#blade" entity-b="#hub"
                      motor-speed="90" max-motor-force="1000"></pc-joint>
        </pc-entity>
    </pc-scene>
</pc-app>
```

The [Physics Joints example](https://playcanvas.github.io/web-components/examples/physics-joints.html) builds one of each type, including a fixed joint that snaps under a dropped weight.

## JavaScript Interface

You can programmatically create and manipulate `<pc-joint>` elements using the [JointComponentElement API](https://api.playcanvas.com/web-components/classes/JointComponentElement.html).

The `component` property is the engine [JointComponent](https://api.playcanvas.com/engine/classes/JointComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

`entity-a` and `entity-b` resolve when they are set, so an entity created later is not picked up on its own — set the attribute again once it exists:

```javascript
const joint = document.querySelector('pc-joint');
joint.entityA = '#link-3'; // re-resolves now
```

Both accept the same reference forms as other entity-valued attributes — an entity `name` (resolved against the nearest enclosing entity first), or a document-wide `#` selector. See [Entity References](../attributes.md#entity-references).

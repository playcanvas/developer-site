---
title: <pc-rigid-body>
description: "Reference for the pc-rigid-body element: rigid body type, mass, friction, restitution, and integration with collision components."
---

The `<pc-rigid-body>` tag makes an entity a rigid body in the physics simulation: a `static` one that never moves, a `dynamic` one that gravity and collisions move, or a `kinematic` one that you move yourself.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-model>`](../pc-model) or a [`<pc-node>`](../pc-node).
* The entity also needs a [`<pc-collision>`](../pc-collision), which gives the body its shape.
* The ammo.js WebAssembly module must be loaded via a [`<pc-wasm>`](../pc-wasm) tag.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `angular-damping` | Number | `"0"` | Angular velocity damping factor |
| `angular-factor` | Vector3 | `"1 1 1"` | Angular movement constraints as "X Y Z" values |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `friction` | Number | `"0.5"` | Surface friction coefficient |
| `gravity-scale` | Number | `"1"` | Multiplier on the scene's [`gravity`](../pc-scene) for this body: `"1"` falls normally, `"0"` ignores gravity and a negative value rises. Applies to `dynamic` bodies only |
| `linear-damping` | Number | `"0"` | Linear velocity damping factor |
| `linear-factor` | Vector3 | `"1 1 1"` | Linear movement constraints as "X Y Z" values |
| `mass` | Number | `"1"` | Mass of the rigidbody in kilograms |
| `restitution` | Number | `"0"` | Bounce/elasticity coefficient (0-1). A collision's bounce is the product of both bodies' restitution, so a body only bounces off another that has some too |
| `rolling-friction` | Number | `"0"` | Rolling resistance coefficient |
| `type` | Enum | `"static"` | Physics body type: `"static"` \| `"kinematic"` \| `"dynamic"` |

</div>

## Example

Dynamic bodies falling onto a static ground. A collision's bounce is the product of the two bodies' `restitution`, so the ground has `restitution="1"` and the sphere, with `"0.9"`, keeps most of its speed. Try giving the boxes some bounce too, or setting the ground's `restitution` to 0 to stop every bounce:

```html live-example
<pc-app>
    <pc-wasm name="Ammo" glue="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.js" wasm="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.wasm" fallback="https://developer.playcanvas.com/assets/modules/ammo/ammo.js"></pc-wasm>
    <pc-scene>
        <pc-entity name="camera" position="0 2 8">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows normal-offset-bias="0.05" shadow-bias="0.2"></pc-light>
        </pc-entity>
        <pc-entity name="box-1" position="-1.5 4 0" rotation="30 10 40">
            <pc-render type="box"></pc-render>
            <pc-collision></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>
        <pc-entity name="box-2" position="0 6 0" rotation="10 40 20">
            <pc-render type="box"></pc-render>
            <pc-collision></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>
        <pc-entity name="ball" position="1.5 5 0">
            <pc-render type="sphere"></pc-render>
            <pc-collision type="sphere"></pc-collision>
            <pc-rigid-body type="dynamic" restitution="0.9"></pc-rigid-body>
        </pc-entity>
        <pc-entity name="ground" position="0 -0.5 0" scale="12 1 12">
            <pc-render type="box"></pc-render>
            <pc-collision half-extents="6 0.5 6"></pc-collision>
            <pc-rigid-body type="static" restitution="1"></pc-rigid-body>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-rigid-body>` elements using the [RigidBodyComponentElement API](https://api.playcanvas.com/web-components/classes/RigidBodyComponentElement.html).

The `component` property is the engine [RigidBodyComponent](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-collision>`](../pc-collision) — the shape the body collides with; every rigid body needs one
* [`<pc-joint>`](../pc-joint) — constrains two bodies together
* [`<pc-wasm>`](../pc-wasm) — loads the Ammo module physics needs
* [`<pc-scene>`](../pc-scene) — gravity

Examples: [Basic Physics](https://playcanvas.github.io/web-components/examples/#basic-physics.html), [Physics Cluster](https://playcanvas.github.io/web-components/examples/#physics-cluster.html), [Ragdoll](https://playcanvas.github.io/web-components/examples/#ragdoll.html) and [Vehicle Physics](https://playcanvas.github.io/web-components/examples/#vehicle-physics.html).

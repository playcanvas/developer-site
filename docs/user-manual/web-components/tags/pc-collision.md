---
title: <pc-collision>
description: "Reference for the pc-collision element: box, sphere, capsule, cone, cylinder, and mesh collision shapes to pair with rigid bodies."
---

The `<pc-collision>` tag gives an entity a collision shape. Paired with a [`<pc-rigid-body>`](../pc-rigid-body), the shape takes part in the physics simulation; on its own, it is a trigger volume that reports what enters it.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-model>`](../pc-model) or a [`<pc-node>`](../pc-node).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `angular-offset` | Vector3 | `"0 0 0"` | Rotation of the collision shape relative to the entity, as "X Y Z" Euler angles in degrees |
| `axis` | Number | `"1"` | Axis for cylinder, capsule and cone shapes (0=X, 1=Y, 2=Z) |
| `convex-hull` | Boolean | `"false"` | Whether to use a convex hull for mesh collision |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `half-extents` | Vector3 | `"0.5 0.5 0.5"` | Half-extents for box collision as "X Y Z" values |
| `height` | Number | `"2"` | Height for cylinder, capsule and cone collision shapes |
| `linear-offset` | Vector3 | `"0 0 0"` | Position of the collision shape relative to the entity as "X Y Z" values |
| `radius` | Number | `"0.5"` | Radius for sphere, cylinder, capsule and cone collision shapes |
| `type` | Enum | `"box"` | Collision shape: `"box"` \| `"capsule"` \| `"compound"` \| `"cone"` \| `"cylinder"` \| `"mesh"` \| `"sphere"`. A `compound` shape combines the collision shapes of the entity's descendants into one |

</div>

The primitive shapes — every type but `mesh` — ignore the entity's scale, so size them with `half-extents`, `radius` and `height` rather than `scale`. The primitives do not line up with the defaults everywhere, either: a `<pc-render>` cylinder or cone is 1 unit tall, while a collision cylinder or cone defaults to a `height` of 2.

## Mesh Colliders

A mesh collider needs geometry, and there is no attribute to supply it — so `type="mesh"` takes it from the render component the entity was loaded with, giving you a collider that matches the visible mesh. That makes it a tool for a [`<pc-node>`](../pc-node) bound inside a loaded GLB:

```html
<pc-model asset="car">
    <pc-node name="Body">
        <pc-collision type="mesh"></pc-collision>
        <pc-rigid-body type="static"></pc-rigid-body>
    </pc-node>
</pc-model>
```

An exact triangle mesh only works on a `static` body. For a body that moves, set `convex-hull` to collide against the mesh's convex hull instead.

The geometry is resolved each time the component applies, so a `<pc-node>` that retargets or rebinds picks up the new node's mesh.

The render component has to be backed by a render asset, which a [`<pc-render>`](../pc-render) primitive is not: a `<pc-render type="box">` has no asset to collide against, so give a primitive the matching primitive shape instead. An entity without a suitable render component logs a console warning and its collider has no shape.

## Example

Each collision shape matches its rendered shape: a sphere, a capsule and a box tumbling onto static ground. Try changing the sphere's `radius` — the visual mesh stays the same, but it collides differently:

```html live-example
<pc-app>
    <!-- Physics requires the ammo.js WebAssembly module -->
    <pc-wasm name="Ammo" glue="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.js" wasm="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.wasm" fallback="https://developer.playcanvas.com/assets/modules/ammo/ammo.js"></pc-wasm>
    <pc-scene>
        <pc-entity name="camera" position="0 2 8">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows normal-offset-bias="0.05" shadow-bias="0.2"></pc-light>
        </pc-entity>
        <pc-entity name="ball" position="-1.5 4 0">
            <pc-render type="sphere"></pc-render>
            <pc-collision type="sphere" radius="0.5"></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>
        <pc-entity name="pill" position="0 5 0" rotation="0 0 70">
            <pc-render type="capsule"></pc-render>
            <pc-collision type="capsule" radius="0.5" height="2"></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>
        <pc-entity name="crate" position="1.5 6 0" rotation="20 30 40">
            <pc-render type="box"></pc-render>
            <pc-collision type="box" half-extents="0.5 0.5 0.5"></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>
        <pc-entity name="ground" position="0 -0.5 0" scale="12 1 12">
            <pc-render type="box"></pc-render>
            <pc-collision half-extents="6 0.5 6"></pc-collision>
            <pc-rigid-body type="static"></pc-rigid-body>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-collision>` elements using the [CollisionComponentElement API](https://api.playcanvas.com/web-components/classes/CollisionComponentElement.html).

The `component` property is the engine [CollisionComponent](https://api.playcanvas.com/engine/classes/CollisionComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-rigid-body>`](../pc-rigid-body) — makes a collision shape take part in physics
* [`<pc-joint>`](../pc-joint) — constrains two bodies that have collision shapes
* [`<pc-wasm>`](../pc-wasm) — loads the Ammo module physics needs

Examples: [Basic Physics](https://playcanvas.github.io/web-components/examples/#basic-physics.html), [Physics Cluster](https://playcanvas.github.io/web-components/examples/#physics-cluster.html) and [Ragdoll](https://playcanvas.github.io/web-components/examples/#ragdoll.html).

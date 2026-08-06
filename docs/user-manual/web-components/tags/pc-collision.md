---
title: <pc-collision>
description: "Reference for the pc-collision element: box, sphere, capsule, cone, cylinder, and mesh collision shapes to pair with rigid bodies."
---

The `<pc-collision>` tag is used to define a collision component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `angular-offset` | Vector3 | `"0 0 0"` | Rotation of the collision shape relative to the entity, as "X Y Z" Euler angles in degrees |
| `axis` | Number | `"1"` | Axis for cylinder/capsule shapes (0=X, 1=Y, 2=Z) |
| `convex-hull` | Boolean | `"false"` | Whether to use a convex hull for mesh collision |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `half-extents` | Vector3 | `"0.5 0.5 0.5"` | Half-extents for box collision as "X Y Z" values |
| `height` | Number | `"2"` | Height for cylinder/capsule collision shapes |
| `linear-offset` | Vector3 | `"0 0 0"` | Position of the collision shape relative to the entity as "X Y Z" values |
| `radius` | Number | `"0.5"` | Radius for sphere/cylinder/capsule collision shapes |
| `type` | Enum | `"box"` | Collision shape: `"box"` \| `"capsule"` \| `"compound"` \| `"cone"` \| `"cylinder"` \| `"mesh"` \| `"sphere"` |

</div>

## Mesh Colliders

A mesh collider needs geometry, and there is no attribute to supply it — so `type="mesh"` takes it from the entity's own [`<pc-render>`](../pc-render) component, giving you a collider that matches the visible mesh. That is what a mesh collider on a model node usually means, and it is what makes `type="mesh"` useful on a [`<pc-node>`](../pc-node) bound inside a loaded GLB:

```html
<pc-model asset="car">
    <pc-node name="Body">
        <pc-collision type="mesh"></pc-collision>
    </pc-node>
</pc-model>
```

The geometry is resolved each time the component applies, so a `<pc-node>` that retargets or rebinds picks up the new node's mesh.

The render component has to be backed by a render asset, which the primitive types are not: a `<pc-render type="box">` has no asset to collide against. An entity without a suitable render component logs a console warning and its collider has no shape.

## Example

```html
<pc-app>
    <!-- Physics requires the ammo.js WebAssembly module -->
    <pc-module name="Ammo" glue="modules/ammo/ammo.wasm.js" wasm="modules/ammo/ammo.wasm.wasm" fallback="modules/ammo/ammo.js"></pc-module>
    <pc-scene>
        <!-- static 1x1x1 box -->
        <pc-entity>
            <pc-render type="box"></pc-render>
            <pc-collision></pc-collision>
            <pc-rigidbody></pc-rigidbody>
        </pc-entity>

        <!-- dynamic sphere with radius 0.5 -->
        <pc-entity position="0 4 0">
            <pc-render type="sphere"></pc-render>
            <pc-collision type="sphere"></pc-collision>
            <pc-rigidbody type="dynamic"></pc-rigidbody>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-collision>` elements using the [CollisionComponentElement API](https://api.playcanvas.com/web-components/classes/CollisionComponentElement.html).

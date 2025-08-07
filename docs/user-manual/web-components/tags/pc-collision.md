---
title: <pc-collision>
---

The `<pc-collision>` tag is used to define a collision component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `axis` | Number | `"1"` | Axis for cylinder/capsule shapes (0=X, 1=Y, 2=Z) |
| `convex-hull` | Flag | - | Whether to use a convex hull for mesh collision |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `half-extents` | Vector3 | `"0.5 0.5 0.5"` | Half-extents for box collision as "X Y Z" values |
| `height` | Number | `"2"` | Height for cylinder/capsule collision shapes |
| `radius` | Number | `"0.5"` | Radius for sphere/cylinder/capsule collision shapes |
| `type` | Enum | `"box"` | Collision shape: `"box"` \| `"capsule"` \| `"cone"` \| `"cylinder"` \| `"sphere"` |

</div>

## Example

```html
<!-- static 1x1x1 box -->
<pc-entity>
    <pc-render type="box"></pc-render>
    <pc-collision></pc-collision>
    <pc-rigidbody></pc-rigidbody>
</pc-entity>

<!-- dynamic sphere with radius 0.5 -->
<pc-entity>
    <pc-render type="sphere"></pc-render>
    <pc-collision type="sphere"></pc-collision>
    <pc-rigidbody type="dynamic"></pc-rigidbody>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-collision>` elements using the [CollisionComponentElement API](https://api.playcanvas.com/web-components/classes/CollisionComponentElement.html).

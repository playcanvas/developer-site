---
title: <pc-collision>
---

The `<pc-collision>` tag is used to define a collision component.

:::note

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="nowrap-first-col">

| Attribute | Description |
| --- | --- |
| `axis` | The axis of the collision component. If not specified, `1` is used (Y-axis). |
| `convex-hull` | Valueless attribute. If present, the collision component uses a convex hull. |
| `enabled` | Enabled state of the collision component. If not specified, `true` is used. |
| `half-extents` | The half-extents of the collision component. Specified as a space-separated list of X, Y, and Z values. If not specified, `0.5 0.5 0.5` is used. |
| `height` | The height of the collision component. If not specified, `2` is used. |
| `radius` | The radius of the collision component. If not specified, `0.5` is used. |
| `type` | The type of collision component. Can be `box`, `capsule`, `cone`, `cylinder` or `sphere`. If not specified, `box` is used. |

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

You can programmatically create and manipulate `<pc-collision>` elements using the [CollisionComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.CollisionComponentElement.html).

---
title: <pc-model>
---

The `<pc-model>` tag is used to define an entity that instantiates a 3D model from a GLB file.

:::note[Usage]

* It must be a direct child of a [`<pc-scene>`](../pc-scene) or a [`<pc-entity>`](../pc-entity).

:::

## Attributes

All attributes of [`<pc-entity>`](../pc-entity) are also available.

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | String | - | Container asset ID (must reference a `container` type asset) |

</div>

## Example

```html
<pc-asset src="assets/car.glb" id="car"></pc-asset>
<pc-scene>
    <pc-model asset="car"></pc-model>
</pc-scene>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-model>` elements using the [ModelElement API](https://api.playcanvas.com/web-components/classes/ModelElement.html).

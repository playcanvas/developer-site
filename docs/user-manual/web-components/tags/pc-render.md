---
title: <pc-render>
description: "Reference for the pc-render element: render primitive shapes (box, sphere, capsule, cone, cylinder, plane) with a material and shadow settings."
---

The `<pc-render>` tag is used to define a render component that renders a 3D primitive.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `cast-shadows` | Boolean | `"true"` | Whether the component casts shadows |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `material` | String | - | `id` of a [`<pc-material>`](../pc-material) to render the primitive with. If omitted, a default material is used |
| `receive-shadows` | Boolean | `"true"` | Whether the component receives shadows |
| `type` | Enum | `"box"` | Primitive shape to render: `"box"` \| `"capsule"` \| `"cone"` \| `"cylinder"` \| `"plane"` \| `"sphere"` |

</div>

:::tip

To render a 3D model from a glTF/GLB file, use [`<pc-model>`](../pc-model) instead.

:::

## Example

All six primitive shapes. Try changing any `type`, or add `material` once you have defined a [`<pc-material>`](../pc-material):

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 1.5 6" rotation="-10 0 0">
            <pc-camera clear-color="#2a2d36"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows normal-offset-bias="0.05" shadow-bias="0.2" intensity="1.5"></pc-light>
        </pc-entity>
        <pc-entity name="box" position="-2.5 0.5 0">
            <pc-render type="box"></pc-render>
        </pc-entity>
        <pc-entity name="sphere" position="-1 0.5 0">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
        <pc-entity name="capsule" position="0.25 1 0">
            <pc-render type="capsule"></pc-render>
        </pc-entity>
        <pc-entity name="cone" position="1.5 0.5 0">
            <pc-render type="cone"></pc-render>
        </pc-entity>
        <pc-entity name="cylinder" position="2.75 0.5 0">
            <pc-render type="cylinder"></pc-render>
        </pc-entity>
        <pc-entity name="ground" scale="10 10 10">
            <pc-render type="plane"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-render>` elements using the [RenderComponentElement API](https://api.playcanvas.com/web-components/classes/RenderComponentElement.html).

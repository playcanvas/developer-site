# <pc-render>

The `<pc-render>` tag is used to define a render component that renders a 3D primitive.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md), a [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) or a [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md).

:::

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `cast-shadows` | Boolean | `"true"` | Whether the component casts shadows |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `material` | [Material ID](https://developer.playcanvas.com/user-manual/web-components/attributes.md#asset-and-material-ids) | - | `id` of a [`<pc-material>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-material.md) to render the primitive with. If omitted, a default material is used |
| `receive-shadows` | Boolean | `"true"` | Whether the component receives shadows |
| `shadow-cascade-mask` | String | `"0 1 2 3"` | Which [shadow cascades](https://developer.playcanvas.com/user-manual/web-components/tags/pc-light.md#shadow-cascades) of directional lights the component casts into, as space-separated cascade indices from 0 (nearest the camera) to 3: `"0 1"` casts into the two nearest cascades only, and an empty value casts into none. Needs `cast-shadows` |
| `type` | Enum | `"box"` | Primitive shape to render: `"box"` \| `"capsule"` \| `"cone"` \| `"cylinder"` \| `"plane"` \| `"sphere"` |

:::tip

To render a 3D model from a glTF/GLB file, use [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) instead.

:::

## Example

All six primitive shapes. Try changing any `type`, or add `material` once you have defined a [`<pc-material>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-material.md):

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

The `component` property is the engine [RenderComponent](https://api.playcanvas.com/engine/classes/RenderComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-material>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-material.md) — the material a primitive is drawn with
* [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) — renders a GLB instead of a primitive
* [`<pc-light>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-light.md) — lights and shadows the primitive
* [`<pc-collision>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-collision.md) — a matching physics shape

Examples: [Basic Shapes](https://playcanvas.github.io/web-components/examples/basic-shapes.html), [Falling Blocks](https://playcanvas.github.io/web-components/examples/falling-blocks.html) and [Physics Joints](https://playcanvas.github.io/web-components/examples/physics-joints.html).

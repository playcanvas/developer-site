---
title: <pc-render>
description: "Reference for the pc-render element: primitive or mesh rendering, materials, layers, and cast or receive shadow settings on entities."
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

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="NPKMrLy" title="<pc-render> example" />

## JavaScript Interface

You can programmatically create and manipulate `<pc-render>` elements using the [RenderComponentElement API](https://api.playcanvas.com/web-components/classes/RenderComponentElement.html).

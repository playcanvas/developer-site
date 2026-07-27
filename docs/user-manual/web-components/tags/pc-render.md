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
| `receive-shadows` | Boolean | `"true"` | Whether the component receives shadows |
| `type` | Enum | `"asset"` | Primitive shape to render: `"box"` \| `"capsule"` \| `"cone"` \| `"cylinder"` \| `"plane"` \| `"sphere"`. The default, `"asset"`, renders a render asset instead of a primitive |

</div>

## Example

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="NPKMrLy" title="<pc-render> example" />

## JavaScript Interface

You can programmatically create and manipulate `<pc-render>` elements using the [RenderComponentElement API](https://api.playcanvas.com/web-components/classes/RenderComponentElement.html).

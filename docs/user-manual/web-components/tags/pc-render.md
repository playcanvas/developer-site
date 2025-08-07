---
title: <pc-render>
---

The `<pc-render>` tag is used to define a render component that renders a 3D primitive.

:::note

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

| Attribute | Description |
| --- | --- |
| `cast-shadows` | Valueless attribute. If present, the render component casts shadows. |
| `enabled` | Enabled state of the component. If not specified, `true` is used. |
| `receive-shadows` | Valueless attribute. If present, the render component receives shadows. |
| `type` | The type of render component. Can be `box`, `capsule`, `cone`, `cylinder`, `plane` or `sphere`. |

## Example

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="NPKMrLy" title="<pc-render> example" />

## JavaScript Interface

You can programmatically create and manipulate `<pc-render>` elements using the [RenderComponentElement API](https://api.playcanvas.com/web-components/classes/RenderComponentElement.html).

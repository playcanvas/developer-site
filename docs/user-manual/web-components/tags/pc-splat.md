---
title: <pc-splat>
---

The `<pc-splat>` tag is used to define a splat component for rendering 3D Gaussian Splats.

When rendering splat-based scenes, it is recommended to set `antialias` and `high-resolution` on your [`<pc-app>`](../pc-app) tag to `false` for best performance.

:::note

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

| Attribute | Description |
| --- | --- |
| `asset` | A string that should match the `id` of a [`<pc-asset>`](../pc-asset) tag that has a type of `gsplat`. |
| `cast-shadows` | Valueless attribute. If present, the splat component casts shadows. |
| `enabled` | Enabled state of the component. If not specified, `true` is used. |

## Example

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="MYgGZax" title="<pc-splat> example" />

## JavaScript Interface

You can programmatically create and manipulate `<pc-splat>` elements using the [SplatComponentElement API](https://api.playcanvas.com/web-components/classes/SplatComponentElement.html).

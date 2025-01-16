---
title: <pc-splat>
---

The `<pc-splat>` tag is used to define a splat component for rendering 3D Gaussian Splats.

When rendering splat-based scenes, it is recommended to set `antialias` and `high-resolution` on your [`<pc-app>`](pc-app.md) tag to `false` for best performance.

:::note

* It must be a direct child of a [`<pc-entity>`](pc-entity.md).

:::

## Attributes

| 属性 (Attribute) | 説明 |
| --- | --- |
| `asset` | A string that should match the `id` of a [`<pc-asset>`](pc-asset.md) tag that has a type of `gsplat`. |
| `enabled` | Enabled state of the splat component. If not specified, `true` is used. |

## 例

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="MYgGZax" title="<pc-splat> example" />

## JavaScript Interface

You can programmatically create and manipulate `<pc-splat>` elements using the [SplatComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.SplatComponentElement.html).

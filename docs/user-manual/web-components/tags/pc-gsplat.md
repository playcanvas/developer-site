---
title: <pc-gsplat>
description: "Reference for the pc-gsplat element: render Gaussian splat assets with attributes for the splat data source, shadows, and LOD tuning."
---

The `<pc-gsplat>` tag is used to define a gsplat component for rendering 3D Gaussian Splats.

When rendering splat-based scenes, it is recommended to set `antialias` and `high-resolution` on your [`<pc-app>`](../pc-app) tag to `false` for best performance.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | String | - | Gaussian splat asset ID (must reference a `gsplat` type asset) |
| `cast-shadows` | Flag | - | Whether the gsplat component casts shadows |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `lod-base-distance` | Number | `"5"` | Distance for the first LOD transition (LOD 0 to LOD 1). Splats closer than this use the highest-quality LOD. Minimum `0.1`. Only affects assets that contain LOD levels. |
| `lod-multiplier` | Number | `"3"` | Multiplier between successive LOD distance thresholds, forming a geometric progression. Higher values switch to coarser LODs sooner. Minimum `1.2`. Only affects assets that contain LOD levels. |

</div>

## Example

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="MYgGZax" title="<pc-gsplat> example" />

## JavaScript Interface

You can programmatically create and manipulate `<pc-gsplat>` elements using the [GSplatComponentElement API](https://api.playcanvas.com/web-components/classes/GSplatComponentElement.html).

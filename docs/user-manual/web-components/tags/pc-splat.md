---
title: <pc-splat>
description: "Reference for the pc-splat element: render Gaussian splat assets with attributes for splat data sources, quality, and scene integration."
---

The `<pc-splat>` tag is used to define a splat component for rendering 3D Gaussian Splats.

When rendering splat-based scenes, it is recommended to set `antialias` and `high-resolution` on your [`<pc-app>`](../pc-app) tag to `false` for best performance.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | String | - | Gaussian splat asset ID (must reference a `gsplat` type asset) |
| `cast-shadows` | Flag | - | Whether the splat component casts shadows |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `unified` | Flag | - | Enables global sorting and Streamed SOG support for the splat. Can only be set when the component is disabled. |

</div>

## Example

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="MYgGZax" title="<pc-splat> example" />

## JavaScript Interface

You can programmatically create and manipulate `<pc-splat>` elements using the [SplatComponentElement API](https://api.playcanvas.com/web-components/classes/SplatComponentElement.html).

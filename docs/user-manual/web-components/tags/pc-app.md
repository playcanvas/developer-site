---
title: <pc-app>
description: "Reference for the pc-app element: initializes the PlayCanvas Application, graphics options, and root container for scenes and entities."
---

The `<pc-app>` tag is the root element for your PlayCanvas application. It is used to initialize the PlayCanvas application and provide a container for your scene.

:::note[Usage]

* It must be a descendant of the document's `body` element.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `alpha` | Boolean | `"true"` | Whether the application allocates an alpha channel in the frame buffer |
| `antialias` | Boolean | `"true"` | Whether the application uses anti-aliasing |
| `backend` | Enum | `"webgpu"` | Graphics engine backend: `"webgpu"` \| `"webgl2"` \| `"null"`. WebGPU falls back to WebGL 2 in browsers where it is unavailable — set `"webgl2"` to force WebGL 2 |
| `depth` | Boolean | `"true"` | Whether the application allocates a depth buffer |
| `high-resolution` | Boolean | `"true"` | Whether to render using physical resolution or CSS resolution |
| `stencil` | Boolean | `"true"` | Whether the application allocates a stencil buffer |

</div>

## Example

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="JoPvXjO" title="<pc-app> example" />

## JavaScript Interface

You can programmatically create and manipulate `<pc-app>` elements using the [AppElement API](https://api.playcanvas.com/web-components/classes/AppElement.html).

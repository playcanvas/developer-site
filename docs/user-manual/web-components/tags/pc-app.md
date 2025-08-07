---
title: <pc-app>
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
| `backend` | Enum | `"webgl2"` | Graphics engine backend: `"webgpu"` \| `"webgl2"` \| `"null"` |
| `depth` | Boolean | `"true"` | Whether the application allocates a depth buffer |
| `high-resolution` | Boolean | `"true"` | Whether to render using physical resolution or CSS resolution |
| `stencil` | Boolean | `"true"` | Whether the application allocates a stencil buffer |

</div>

## Example

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="JoPvXjO" title="<pc-app> example" />

## JavaScript Interface

You can programmatically create and manipulate `<pc-app>` elements using the [AppElement API](https://api.playcanvas.com/web-components/classes/AppElement.html).

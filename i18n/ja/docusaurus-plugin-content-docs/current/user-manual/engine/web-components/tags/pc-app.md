---
title: <pc-app>
---

The `<pc-app>` tag is the root element for your PlayCanvas application. It is used to initialize the PlayCanvas application and provide a container for your scene.

:::note

* It must be a descendant of the document's `body` element.

:::

## Attributes

<div className="nowrap-first-col">

| Attribute | Description |
| --- | --- |
| `alpha` | Boolean attribute. Determines whether the application allocates an alpha channel in the frame buffer. Defaults to `true`. |
| `antialias` | Boolean attribute. Determines whether the application uses anti-aliasing. Defaults to `true`. |
| `depth` | Boolean attribute. Determines whether the application allocates a depth buffer. Defaults to `true`. |
| `high-resolution` | Boolean attribute. Determines whether the application renders using physical resolution or CSS resolution. Defaults to `true`. |
| `stencil` | Boolean attribute. Determines whether the application allocates a stencil buffer. Defaults to `true`. |

</div>

## Example

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="JoPvXjO" title="<pc-app> example" />

## JavaScript Interface

You can programmatically create and manipulate `<pc-app>` elements using the [AppElement API](https://api.playcanvas.com/classes/EngineWebComponents.AppElement.html).

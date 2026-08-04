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
| `alpha` | Boolean | `"true"` | Whether the application allocates an alpha channel in the frame buffer, which is what lets the page show through wherever the scene has not drawn |
| `antialias` | Boolean | `"true"` | Whether the application uses anti-aliasing |
| `backend` | Enum | `"webgpu"` | Graphics engine backend: `"webgpu"` \| `"webgl2"` \| `"null"`. WebGPU falls back to WebGL 2 in browsers where it is unavailable — set `"webgl2"` to force WebGL 2. `"null"` selects a renderer that draws nothing, and exists for headless testing |
| `depth-buffer` | Boolean | `"true"` | Whether the application allocates a depth buffer |
| `loading-bar` | Boolean | `"true"` | Whether the application shows its built-in loading bar while it boots and preloads its assets |
| `max-pixel-ratio` | Number | uncapped | The highest pixel ratio the application renders at. The canvas is sized by the smaller of this value and the display's own device pixel ratio, so `"1"` renders at CSS resolution and `"2"` keeps a dense display sharp without paying for every one of its pixels |
| `stencil-buffer` | Boolean | `"true"` | Whether the application allocates a stencil buffer |

</div>

:::note[When these are read]

Every attribute above except `max-pixel-ratio` and `loading-bar` is read once, when the element is
inserted into the document and creates its graphics device. Changing one afterwards updates the
element's property but has no effect on the running application, and logs a warning saying so — to
apply a new value, remove the element and re-insert it.

:::

## Loading bar

While the application boots and preloads its assets, `<pc-app>` shows a loading bar along the top of
the element. Set `loading-bar="false"` to suppress it, or theme it with these CSS custom properties:

| Property | Description |
| --- | --- |
| `--pc-loading-bar-color` | The color of the filled portion of the bar |
| `--pc-loading-bar-background` | The color of the unfilled track behind it |
| `--pc-loading-bar-height` | The height of the bar |

To build a loading screen of your own instead, suppress the bar and drive it from the element's
`progress` event and `loadProgress` property.

## Example

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="JoPvXjO" title="<pc-app> example" />

## JavaScript Interface

You can programmatically create and manipulate `<pc-app>` elements using the [AppElement API](https://api.playcanvas.com/web-components/classes/AppElement.html).

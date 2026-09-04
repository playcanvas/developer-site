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

## Sizing

The element is sized like a replaced element such as `<video>` or `<img>`: a block-level box that
your page's CSS controls, defaulting to the canvas's intrinsic size of 300×150 pixels. The
application's canvas always fills the element, and the drawing buffer resolution follows the
element's size live (capped by `max-pixel-ratio`) — whatever resizes the element, be it a splitter
drag, a flex reflow or a CSS animation, the rendered scene tracks it.

Fullscreen is not built-in behavior; a full-viewport app is ordinary CSS:

```css
pc-app {
    width: 100%;
    height: 100vh;  /* fallback for browsers without dynamic viewport units */
    height: 100dvh;
}
```

Equally, the element can be embedded at any size — in a card, a split pane or a grid cell — and
several apps can coexist on one page.

:::note[Use explicit dimensions]

Size the element with explicit `width` and `height`. The library's default styles supply explicit
dimensions, and in CSS box resolution those beat inset stretching — so `position: fixed; inset: 0`
alone does **not** stretch the element. (The defaults are declared with
[`:where()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) at zero specificity, so any
page rule — however plain — overrides them.)

:::

The one time the element's size does not drive the drawing buffer is while an XR session is
presenting — the session owns the buffer for its duration.

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

## Events

Listen to these events using [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) or by assigning an event listener to the `oneventname` property of this interface.

| Event | Description |
| --- | --- |
| `progress` | A [`ProgressEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent) fired while the application preloads its assets. `loaded` and `total` are asset counts rather than bytes, and an asset that fails to load still counts as loaded. It fires at least once per boot, and the final event always has `loaded` equal to `total`. |
| `error` | An [`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent) fired when the application cannot boot because no graphics device could be created — WebGL disabled, say, or a blocklisted GPU. `message` names the backends that were requested and `error` carries the underlying failure. |

Neither event bubbles, so listen on the element itself.

An element that fired `error` never becomes ready and its `app` property stays `null` — in
particular, `whenReady('pc-app')` never settles (see
[Programmatic Access](../programmatic-access.md)). A page that wants a fallback UI should listen
for the event rather than await readiness:

```javascript
document.querySelector('pc-app').addEventListener('error', (event) => {
    // Neither WebGPU nor WebGL 2 is available — show static content instead
    document.getElementById('fallback').hidden = false;
});
```

Removing the element and re-inserting it retries the boot with its current attributes.

## Example

A complete application: a camera, a light and a sphere. Try setting `antialias="false"` or `max-pixel-ratio="1"` on the `<pc-app>` tag:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 3">
            <pc-camera clear-color="#8099e6"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 45 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="ball">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-app>` elements using the [AppElement API](https://api.playcanvas.com/web-components/classes/AppElement.html).

The `app` property is the running engine [AppBase](https://api.playcanvas.com/engine/classes/AppBase.html) — `null` until the element is ready — which gives you the scene, the asset registry and the render loop; `elementFromEntity()` maps an engine entity back to the element that fronts it.

## See Also

* [`<pc-scene>`](../pc-scene) — the one scene an app renders
* [`<pc-asset>`](../pc-asset) — resources the app preloads before the scene starts
* [`<pc-wasm>`](../pc-wasm) — modules such as physics that the app loads before it boots
* [Programmatic Access](../programmatic-access.md) — waiting for `ready` and reaching `app` from JavaScript

Examples: [Spinning Cube](https://playcanvas.github.io/web-components/examples/spinning-cube.html) and [Basic Shapes](https://playcanvas.github.io/web-components/examples/basic-shapes.html).

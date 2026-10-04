# <pc-app>

The `<pc-app>` tag is the root element for your PlayCanvas application. It is used to initialize the PlayCanvas application and provide a container for your scene.

:::note[Usage]

* It must be a descendant of the document's `body` element.

:::

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `alpha` | Boolean | `"true"` | Whether the application allocates an alpha channel in the frame buffer, which is what lets the page show through wherever the scene has not drawn |
| `antialias` | Boolean | `"true"` | Whether the application uses anti-aliasing |
| `area-light-luts` | [Asset ID](https://developer.playcanvas.com/user-manual/web-components/attributes.md#asset-and-material-ids) | - | ID of a [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) holding the area light lookup tables as JSON. Loading it switches area lights on for the whole application, so [`<pc-light>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-light.md) elements with a `rect`, `disk` or `sphere` `shape` render as intended; clearing it switches them off again. Applies immediately — see [Area Lights](https://developer.playcanvas.com/user-manual/web-components/tags/pc-light.md#area-lights) |
| `backend` | Enum | `"webgpu"` | Graphics engine backend: `"webgpu"` \| `"webgl2"` \| `"null"`. WebGPU falls back to WebGL 2 in browsers where it is unavailable — set `"webgl2"` to force WebGL 2. `"null"` selects a renderer that draws nothing, and exists for headless testing |
| `depth-buffer` | Boolean | `"true"` | Whether the application allocates a depth buffer |
| `devtools` | Boolean | `"true"` | Whether the application announces itself to developer tools, such as the PlayCanvas Inspector browser extension, so they can find and inspect it. Set `"false"` to keep a production page from announcing itself. This is an opt-out, not a protection: code on the page can still reach the application, through the element's `app` property for one. Of the engine 2.23.0 builds, only the debug build announces: its release, profiler and minified builds never do, whatever this is set to |
| `loading-bar` | Boolean | `"true"` | Whether the application shows its built-in loading bar while it boots and preloads its assets |
| `max-pixel-ratio` | Number | uncapped | The highest pixel ratio the application renders at, above 0. The canvas is sized by the smaller of this value and the display's own device pixel ratio, so `"1"` renders at CSS resolution and `"2"` keeps a dense display sharp without paying for every one of its pixels |
| `physics-time-scale` | Number | `"1"` | Scale on the time the physics simulation advances by each frame, applied on top of `time-scale`: below 1 is slow motion, above 1 speeds it up, and `"0"` pauses physics while the rest of the application keeps running — for a pause menu, say, that must stay interactive while the world stands still |
| `picking` | Enum | `"auto"` | When the application picks the scene under the pointer to dispatch [pointer events](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md#events) on entity elements: `"auto"` \| `"always"` \| `"none"`. `auto` picks for an event type only while a listener for it is registered on an entity element or on [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md); `always` picks for every pointer event, which listeners the application cannot see need, such as one on the document or a framework's delegated handler like React's `onPointerMove`; `none` never picks, so entities receive no pointer events. Picking renders the scene again, which is why `auto` is the default. See [When Events Are Dispatched](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md#when-events-are-dispatched) |
| `stencil-buffer` | Boolean | `"true"` | Whether the application allocates a stencil buffer |
| `time-scale` | Number | `"1"` | Scale on the time the application advances by each frame. Scripts, animation and physics all advance by the scaled time, so below 1 is slow motion, above 1 speeds it up, and `"0"` pauses all three together while the scene keeps rendering. To slow down or pause physics alone, use `physics-time-scale` |
| `with-credentials` | Boolean | `"false"` | Whether asset requests send credentials (cookies and HTTP authentication) to other origins, which the asset server must allow through CORS. The engine keeps this setting in an HTTP client shared by the whole page, so it applies to every `<pc-app>` on the page: an app that boots with it switches it on for all of them, and a later change on any app sets it for all of them |

:::note[When these are read]

`alpha`, `antialias`, `backend`, `depth-buffer` and `stencil-buffer` configure the graphics device,
and `devtools` the application, so they are read once, when the element is inserted into the
document and boots the application. Changing one afterwards updates the element's property but has
no effect on the running application, and logs a warning saying so — to apply a new value, remove
the element and re-insert it.

Every other attribute is live, applying to the running application as soon as it changes, except
that `loading-bar` can only remove the bar (see [Loading bar](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md#loading-bar)). The two time scales
are in place before any script's `initialize()` runs.

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

The buffer follows the display as well as the element. Moving the window to a screen of another
pixel density, or zooming the page, changes the device pixel ratio without necessarily resizing the
element, so the application re-evaluates its pixel ratio and resizes the buffer to match. The ratio
in effect — the smaller of `max-pixel-ratio` and the display's own — is what
`app.graphicsDevice.maxPixelRatio` holds, while the element's `maxPixelRatio` property reports the
cap. Code that manages render quality can assign `app.graphicsDevice.maxPixelRatio` itself: a
display change then keeps that ratio and only resizes the buffer, until `max-pixel-ratio` is set
again and takes the device back.

The one time the element's size does not drive the drawing buffer is while an XR session is
presenting — the session owns the buffer for its duration.

## Loading bar

While the application boots and preloads its assets, `<pc-app>` shows a loading bar along the top of
the element. Set `loading-bar="false"` to suppress it (set after boot, it removes the bar at once;
setting it back to `"true"` has no effect until the element is re-inserted), or theme it with these
CSS custom properties:

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
| `error` | An [`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent) fired when the application cannot boot because no graphics device could be created — WebGL disabled, say, or a blocklisted GPU. `message` names the backends that were requested and `error` carries the underlying failure. See [below](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md#handling-a-failed-boot) for how to catch it. |

Neither event bubbles, so listen on the element itself.

### Handling a Failed Boot

An element that fired `error` never becomes ready and its `app` property stays `null` — in
particular, `whenReady('pc-app')` never settles (see
[Programmatic Access](https://developer.playcanvas.com/user-manual/web-components/programmatic-access.md)). A page that wants a fallback UI should listen
for the event rather than await readiness. Set the handler as an inline attribute: a failure can be
reported as soon as the library starts, before a module script of your own gets to run, so a
listener added from one can miss it. An attribute is in place from the moment the element is
parsed:

```html
<pc-app onerror="document.getElementById('fallback').hidden = false">
```

The event covers a device that cannot be created at all. With the default `backend`, a browser
that offers WebGPU tries it first and falls back to WebGL 2, and if both fail that way, the engine
currently leaves the element waiting without firing `error`. A fallback that must always appear
can also time out: show it if the element has not become ready after a few seconds.

Removing the element and re-inserting it retries the boot with its current attributes.

The [pointer events](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md#events) dispatched on entities bubble up through `<pc-app>` too, alongside the canvas's own native pointer events. `event.isTrusted` tells the two apart: it is `true` for the browser's native events and `false` for dispatched ones. Whether entity events are dispatched at all is up to `picking` — see [When Events Are Dispatched](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md#when-events-are-dispatched).

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

* [`<pc-scene>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scene.md) — the one scene an app renders
* [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) — resources the app preloads before the scene starts
* [`<pc-wasm>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-wasm.md) — modules such as physics that the app loads before it boots
* [Programmatic Access](https://developer.playcanvas.com/user-manual/web-components/programmatic-access.md) — waiting for `ready` and reaching `app` from JavaScript

Examples: [Spinning Cube](https://playcanvas.github.io/web-components/examples/#spinning-cube.html) and [Basic Shapes](https://playcanvas.github.io/web-components/examples/#basic-shapes.html).

---
title: Viewer API
description: "Create SuperSplat Viewer instances inside your own web app with createViewer, then control loading, playback, the camera, annotations, fullscreen and XR from code, restyle or replace the UI, and tear viewers down cleanly."
---

`createViewer` creates a [SuperSplat Viewer](/user-manual/supersplat/viewer/) inside an element of your own page and returns a handle for controlling it. Use it when your web app owns the page: to mount and unmount viewers in a component, run several on one page, drive the viewer from your own controls, or replace its UI. For a page that only shows one splat, the [prebuilt viewer or `renderViewerHtml`](/user-manual/supersplat/viewer/embedding) is simpler.

The package's [API reference](https://github.com/playcanvas/supersplat-viewer/blob/main/docs/api.md) has further detail.

## Creating a viewer

Install the package and the PlayCanvas Engine, which the `/viewer` entry uses as a peer dependency (version 2.24.1 or later), so your copy of the engine is the one it runs on:

```bash
npm install @playcanvas/supersplat-viewer playcanvas
```

```ts
import { createViewer } from '@playcanvas/supersplat-viewer/viewer';
import '@playcanvas/supersplat-viewer/viewer.css';

const viewer = await createViewer({
    container: document.getElementById('viewer'),   // you size it; the viewer fills it
    settings: './settings.json',                    // a URL, a settings object, or a promise of one
    contentUrl: './scene.sog',
    posterUrl: './poster.jpg'                       // optional
});
```

The viewer builds its own canvas, UI and icons inside the container, so **the container needs a size**: an element with no height renders nothing.

`createViewer` resolves once the graphics device exists and loading has started, not when the scene is visible. Wait for `loaded` before calling the camera, playback and annotation commands:

```ts
viewer.events.on('progress:changed', (progress) => console.log(`${progress}%`));
viewer.events.on('loaded:changed', () => console.log('first frame rendered'));
```

## Options

| Option | Description |
|--------|-------------|
| `container` | The element the viewer builds itself in. Required. |
| `settings` | The [Experience Settings](/user-manual/supersplat/studio/experience-settings): a URL, an object in any supported version, or a promise of one. Required. |
| `contentUrl` | The splat to load. Required. Any [supported format](/user-manual/supersplat/viewer/embedding#supported-content); a `data:` URI works too. |
| `contentFilename` | A name for the content, such as `scene.sog`. The format is chosen from the name's extension, so set this when `contentUrl` has no usable name, such as a `data:` URI. |
| `posterUrl` / `poster` | An image shown, blurred, while the splat loads, as a URL or an already-created `HTMLImageElement`. |
| `skyboxUrl` | An equirectangular skybox image. |
| `collisionUrl` | Collision data for walk mode: a `.glb` mesh, or voxel data. |
| `contents` | A `fetch` of `contentUrl` already in flight, so the download can start before the viewer's code arrives. |
| `zstdDecoderUrl` | Where to load the version 4 `.spz` decoder from. See [Decoder files](#decoder-files). |

The remaining options are the programmatic form of the [URL parameters](/user-manual/supersplat/viewer/embedding#url-parameters), with the same names, except:

- `renderer: 'webgl'` forces WebGL, like `webgl`. The default is `'webgpu'`, which falls back to WebGL where WebGPU isn't available.
- `ui: false` leaves out the built-in UI, like `noui`. See [Replacing the UI](#replacing-the-ui).
- `exposeGlobals: true` publishes the viewer's `window.app`, `window.captureFrame` and similar hooks. Leave it off when a page has more than one viewer.

`createViewer` doesn't read the page's URL: pass every option yourself.

## The viewer handle

| Member | Purpose |
|--------|---------|
| `state` | The viewer's [observable state](#state). |
| `events` | Fires `<key>:changed` with `(value, previous)` for every key of `state`. |
| `annotations` | The scene's annotations in settings order, read-only. |
| `captureFrame(options?)` | Renders a still offscreen, supersampled, and resolves to `{ width, height, data }` with `data` in base64. Options: `time`, `width` (default 480), `height`, `supersample` (default 2). |
| `seek(time)` | Seeks the animation, in seconds, keeping its pause state. |
| `frameScene()` | Frames the whole scene in orbit mode. |
| `resetCamera()` | In fly or walk mode, returns to where that mode was entered; otherwise restores the starting view in orbit mode. |
| `toggleWalk()` | Enters walk mode, or returns to the previous mode. Does nothing unless `state.walkAllowed`. |
| `selectAnnotation(index)` | Selects an annotation by zero-based index and moves the camera to it; `null` clears the selection without moving the camera. |
| `setMoveInput(x, z)` | Holds camera-relative movement in fly or walk mode, for a custom joystick: positive `x` is right, positive `z` forward, each from -1 to 1. Send `(0, 0)` to stop. |
| `requestFullscreen()` / `exitFullscreen()` | Enters or leaves fullscreen for this viewer. |
| `startXR(mode)` / `endXR()` | Starts an immersive session, with `mode` `'ar'` or `'vr'`, or ends it. |
| `destroy()` | Releases the engine application, the graphics context, every listener and the viewer's elements. Safe to call more than once, and before loading finishes. |
| `app` | The underlying PlayCanvas application, for anything this API doesn't cover. |

The camera, playback, annotation and movement commands throw before `state.loaded` and after `destroy()`. The fullscreen and XR commands return promises; call the ones that enter fullscreen or a session from a user gesture, such as a click, and handle their rejections.

## State {#state}

Write a writable key and the change takes effect at once; the built-in UI follows it. The read-only keys report what the viewer found or is doing.

| Key | Writable | Description |
|-----|----------|-------------|
| `loaded` | | True once the first complete frame has rendered. |
| `progress` | | Loading progress, 0 to 100. |
| `cameraMode` | ✓ | `'orbit'`, `'fly'`, `'walk'` or `'anim'` (the camera animation). |
| `walkAllowed` | | Whether walk mode is available: collision data and a scene at least 5 m across. |
| `hasCollision` | | Whether collision data has loaded. |
| `hasCollisionOverlay` | | Whether the collision can be drawn as an overlay. |
| `collisionOverlayEnabled` | ✓ | Draws the collision overlay. |
| `hasAnimation` | | Whether there's a camera animation to play. |
| `animationPaused` | ✓ | Whether playback is paused. |
| `animationTime` / `animationDuration` | | The playhead and length, in seconds. |
| `selectedAnnotation` | | The selected annotation's index, or `null`. Use `selectAnnotation()` to change it. |
| `showAnnotations` | ✓ | Shows the built-in hotspots. Saved. |
| `quality` | ✓ | The [Quality](/user-manual/supersplat/viewer/controls#quality) position: `'performance'`, `'default'`, `'high'` or `'max'`. Saved. |
| `qualityAvailable` | | The positions this device can hold. |
| `performanceMode` | ✓ | [Performance Mode](/user-manual/supersplat/viewer/controls#performance-mode). Saved. |
| `gamingControls` | ✓ | [Gaming Controls](/user-manual/supersplat/viewer/controls#gaming-controls). Saved. |
| `iceCream` | ✓ | [Ice-cream mode](/user-manual/supersplat/viewer/xr#ice-cream-mode) in XR. Saved. |
| `inputMode` | | `'desktop'` or `'touch'`: what the visitor last used. |
| `controlsHidden` | ✓ | Hides the built-in controls. The viewer also sets it when idle. |
| `inputEnabled` | ✓ | Whether this viewer takes keyboard and gamepad input. |
| `isFullscreen` | | Whether this viewer is fullscreen. |
| `hasAR` / `hasVR` | | Whether an AR or VR session can start, now or after reloading with WebGL. |
| `canStartAR` / `canStartVR` | | Whether one can start on the current renderer. |
| `xrMode` | | `'ar'`, `'vr'` or `null`. |

Collision data arrives after the scene appears, so `walkAllowed` and `hasCollision` can change after `loaded`: watch their change events rather than reading them once.

### Saved preferences

`quality`, `performanceMode`, `gamingControls`, `showAnnotations` and `iceCream` are read from and saved to the browser's local storage, under keys shared by every viewer on your site's origin. A new viewer reads the saved values; viewers already on the page keep their own. The built-in UI also remembers whether its controls panel is open. If storage is blocked, the viewer works with defaults.

## Controlling the viewer

The built-in controls use the same commands as your code, so the two stay in step. Wait for `loaded` first:

```ts
const whenLoaded = (callback: () => void) => {
    if (viewer.state.loaded) callback();
    else viewer.events.once('loaded:changed', callback);
};
```

### Playback

```ts
// stop at three seconds
whenLoaded(() => {
    viewer.state.animationPaused = true;
    viewer.seek(3);
});

// resume, from any camera mode
viewer.state.cameraMode = 'anim';
viewer.state.animationPaused = false;
```

`seek()` wraps repeating tracks and clamps the others to their duration.

### The camera

Set `state.cameraMode` to switch between orbit, fly and animation. Check `state.walkAllowed` before walk mode, or call `toggleWalk()`, which also returns to the previous mode. `frameScene()` and `resetCamera()` start a camera move and return at once.

For custom directional controls, select fly or walk mode, then hold movement with `setMoveInput()` until the control is released:

```ts
viewer.state.cameraMode = 'fly';
viewer.setMoveInput(0, 1);    // forward

// on release, pointercancel or unmount:
viewer.setMoveInput(0, 0);
```

### Annotations

```ts
viewer.events.on('selectedAnnotation:changed', (index) => {
    const annotation = index === null ? null : viewer.annotations[index];
    console.log(annotation?.title);
});

whenLoaded(() => {
    if (viewer.annotations.length) viewer.selectAnnotation(0);
});
```

Selecting an annotation switches to orbit mode and moves the camera to the annotation's view without changing the animation's pause state. `state.showAnnotations` hides the built-in hotspots without clearing the selection.

### Fullscreen and XR {#fullscreen-and-xr}

```ts
fullscreenButton.addEventListener('click', () => {
    viewer.requestFullscreen().catch(showError);
});
vrButton.addEventListener('click', () => {
    viewer.startXR('vr').catch(showError);
});
viewer.events.on('xrMode:changed', updateControls);
```

Check `state.canStartAR` and `state.canStartVR`, and subscribe to their change events, since the capability checks can finish after creation. `startXR()` rejects when the current renderer can't host the session; it never reloads the page.

The built-in **WebGL Required** dialog reloads the page with `?webgl` added. If your page creates the viewer and keeps the built-in UI, read that parameter and pass `renderer: 'webgl'`. See [Viewing in VR and AR](/user-manual/supersplat/viewer/xr) for what visitors can do in a session.

## Restyling

The colors the built-in UI uses are CSS custom properties on the viewer's root element, so you can retheme it without replacing anything:

```css
#viewer .sse-viewer {
    --sse-accent: #09f;     /* highlights, active toggles, the timeline */
    --sse-bkg: #204;        /* panels; translucent surfaces derive from it */
    --sse-text-light: #fff;
}
```

The full set is `--sse-text`, `--sse-text-light`, `--sse-text-dark`, `--sse-text-darkest`, `--sse-accent`, `--sse-grip`, `--sse-bkg`, `--sse-bkg-dark`, `--sse-bkg-darkest` and `--sse-bkg-light`. The viewer's other class names aren't part of the API and change between releases.

## Replacing the UI {#replacing-the-ui}

Pass `ui: false` to create only the canvas. Camera input on the canvas, keyboard and gamepad input, and saved preferences keep working; the toolbar, panels, poster, loading bar, annotation hotspots and navigator are left out. Build your own controls on the handle and its state. The touch joystick, the fullscreen button and the WebGL Required dialog are part of the UI you're replacing, so those become yours too: `setMoveInput()` supports a replacement joystick. Replacing only part of the built-in UI isn't supported.

The [custom UI example](https://github.com/playcanvas/supersplat-viewer/blob/main/src/dev/custom-ui.html) in the viewer's repository drives loading, playback, camera modes, movement, annotations, preferences, fullscreen and XR through the handle alone.

## Several viewers on a page

Each viewer owns its own elements and its own engine application, and nothing is published to `window` unless you set `exposeGlobals`. Keyboard and gamepad input can't be routed by where the pointer is, so clear `state.inputEnabled` on the viewers that should ignore it, and while your own form fields have focus.

Always call `destroy()` on a viewer you no longer need. Browsers cap live WebGL contexts at around 16, so a component that mounts and unmounts viewers without destroying them stops rendering.

## Decoder files {#decoder-files}

Version 4 `.spz` files, on their own or as chunks of an `.lcc2` scene, need a WebAssembly decoder, `zstd-decoder.wasm`, which ships beside the viewer's bundle and is fetched only when such content loads. A bundler that handles `new URL(…, import.meta.url)` emits it with your bundle; otherwise serve it beside the bundle as `application/wasm`, or point `zstdDecoderUrl` at it. The decoder is loaded from a `blob:` URL, so a Content-Security-Policy must allow `blob:` scripts.

## See also

- [Embedding the Viewer](/user-manual/supersplat/viewer/embedding) — the npm package, URL parameters and `renderViewerHtml`
- [Viewer Controls](/user-manual/supersplat/viewer/controls) — the built-in UI the handle drives
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — the settings JSON and the helpers for generating it

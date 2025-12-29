---
title: XR Support
---

PlayCanvas Web Components make it easy to add Virtual Reality (VR) and Augmented Reality (AR) support to your applications.

## Basic Setup

To enable XR support, you'll need:

1. XR-specific scripts (provided by the [Engine NPM package](https://www.npmjs.com/package/playcanvas)).
2. A camera entity with the appropriate scripts attached.
3. UI for entering/exiting XR (WebXR requires a user gesture to start a session).
4. A secure context — serve your page over HTTPS (or `http://localhost` during development).

### XR Scripts

Specify the following scripts using [`<pc-asset>`](../tags/pc-asset) elements:

```html
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr-controllers.mjs"></pc-asset>
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr-navigation.mjs"></pc-asset>
```

Or, when using a CDN:

```html
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr-controllers.mjs"></pc-asset>
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr-navigation.mjs"></pc-asset>
```

:::note[CDN and import maps]

When loading XR scripts from a CDN, make sure your page’s import map also points the `playcanvas` module to the same CDN source and version as shown in the [Getting Started guide](getting-started.md). For production, consider pinning specific versions instead of `@latest`.

:::

* [`xr-controllers.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr-controllers.mjs) - Dynamically downloads and renders XR controller models (GLBs) for any detected XR controllers (including hands).
* [`xr-navigation.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr-navigation.mjs) - Implements basic teleportation navigation (via point and select actions).

### Camera Setup

The XR scripts require the scene's camera to be set up as follows:

```html
<!-- Camera (with XR support) -->
<pc-entity name="camera root">
    <pc-entity name="camera">
        <pc-camera></pc-camera>
    </pc-entity>
    <pc-scripts>
        <pc-script name="xrControllers"></pc-script>
        <pc-script name="xrNavigation"></pc-script>
    </pc-scripts>
</pc-entity>
```

### UI for Entering/Exiting XR

Finally, you'll need to add some UI controls to allow the user to enter and exit XR mode. This is a WebXR-specific requirement, where a user gesture is required to activate an XR session. Let's create two simple buttons to trigger either an AR or VR session.

```html
<button id="enterAR">Enter AR</button>
<button id="enterVR">Enter VR</button>
```

Let's add event listeners to the buttons to trigger an XR session when the user clicks them.

```javascript
document.addEventListener('DOMContentLoaded', async () => {
    const appElement = await document.querySelector('pc-app').ready();
    const app = appElement.app;
    const xr = app.xr;
    const camera = app.root.findComponent('camera');

    document.getElementById('enterAR').addEventListener('click', () => {
        xr.start(camera, 'immersive-ar', 'local-floor')
    });

    document.getElementById('enterVR').addEventListener('click', () => {
        xr.start(camera, 'immersive-vr', 'local-floor')
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && xr.active) {
            xr.end();
        }
    });
});
```

Most of the [Web Component examples](https://playcanvas.github.io/web-components/examples/) have integrated support for XR. Consult their source code to see how it's done.

## Next Steps

The PlayCanvas Engine has comprehensive XR support, with a wide range of features and options. For more information, see the [XR documentation](/user-manual/xr).

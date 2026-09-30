# XR Support

PlayCanvas Web Components make it easy to add Virtual Reality (VR) and Augmented Reality (AR) support to your applications.

## Basic Setup

To enable XR support, you'll need:

1. A `<pc-app>` rendering with WebGL 2 (see below).
2. XR-specific scripts (provided by the [Engine NPM package](https://www.npmjs.com/package/playcanvas)).
3. A camera rig with the XR scripts attached.
4. UI for entering XR (WebXR requires a user gesture to start a session).
5. A secure context — serve your page over HTTPS (or `http://localhost` during development).

`<pc-app>` renders with WebGPU by default, but the engine can only host an XR session on WebGPU where the browser exposes `XRGPUBinding`, the bridge between WebXR and WebGPU. Where it does not (Chrome, for one, at the time of writing), the engine reports XR as unavailable. So give any page that offers XR a WebGL 2 backend:

```html
<pc-app backend="webgl2">
```

A page embedded in an `<iframe>` also needs the frame to allow it, with `allow="xr-spatial-tracking"`. Without that, the browser hides XR from the page.

### XR Scripts

The engine ships a set of XR scripts in its `scripts/esm/xr` folder. Specify them using [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) elements:

```html
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-controllers.mjs"></pc-asset>
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-menu.mjs"></pc-asset>
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-navigation.mjs"></pc-asset>
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-session.mjs"></pc-asset>
```

These paths assume your site is served from the project root without a bundler, as in the npm setup in [Getting Started](https://developer.playcanvas.com/user-manual/web-components/getting-started.md). A bundler does not ship `node_modules`, so with one, copy the scripts to wherever your build serves static files, or load them from a CDN:

```html
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-controllers.mjs"></pc-asset>
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-menu.mjs"></pc-asset>
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-navigation.mjs"></pc-asset>
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-session.mjs"></pc-asset>
```

:::note[CDN and import maps]

When loading XR scripts from a CDN, make sure your page's import map also points the `playcanvas` module to the same CDN source and version as shown in the [Getting Started guide](https://developer.playcanvas.com/user-manual/web-components/getting-started.md). For production, consider pinning specific versions instead of `@latest`.

:::

* [`xr-session.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-session.mjs) - Manages the WebXR session lifecycle: starts an AR or VR session in response to app events (`ar:start` and `vr:start` by default), ends it on `xr:end` or the Escape key, and handles camera rig transforms, AR transparency and cleanup automatically.
* [`xr-controllers.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-controllers.mjs) - Dynamically downloads and renders XR controller models (GLBs) for any detected XR controllers (including hands).
* [`xr-navigation.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-navigation.mjs) - Moves the rig around: teleporting by pointing and selecting, smooth movement on the left thumbstick, and snap or smooth turning and snap vertical movement on the right. Teleports land on a flat plane at the script's `ground-height` (0 by default), unless your code assigns its `castRay` to pick the ground itself.
* [`xr-menu.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-menu.mjs) - Shows an in-headset menu (via a palm-up gesture with hand tracking, or a controller button) whose items fire app events — ideal for an "Exit XR" button.

The folder has a fifth script, [`xr-manipulation.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-manipulation.mjs), which lets the user grab the scene with both hands to drag, turn and scale it. It works on a target entity that holds the scene's content, rather than on the rig.

### Camera Setup

The XR scripts should be attached to a *parent* of the camera entity — `xrSession` moves the rig's root while the headset drives the camera itself:

```html
<!-- Camera (with XR support) -->
<pc-entity name="camera root">
    <pc-entity name="camera" position="0 1.7 5">
        <pc-camera></pc-camera>
    </pc-entity>
    <pc-script>
        <pc-script-instance name="xrControllers"></pc-script-instance>
        <pc-script-instance name="xrMenu" attributes='{
            "menuItems": [{"label": "Exit XR", "eventName": "xr:end"}],
            "fontAsset": "asset:arial-font"
        }'></pc-script-instance>
        <pc-script-instance name="xrNavigation"></pc-script-instance>
        <pc-script-instance name="xrSession"></pc-script-instance>
    </pc-script>
</pc-entity>
```

:::note

`xrMenu` renders text, so it needs a `font` type [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) declared alongside your other assets. The [examples](https://github.com/playcanvas/web-components/tree/main/examples) use `arial.json`:

```html
<pc-asset src="assets/fonts/arial.json" type="font" id="arial-font"></pc-asset>
```

A font asset is the JSON file plus a PNG of the same name beside it, `arial.png` here, so copy both into your project. `xrMenu` is configured through the `attributes` JSON (rather than per-property attributes) because `menuItems` is a nested array — see [Adding Behavior with Scripts](https://developer.playcanvas.com/user-manual/web-components/scripting.md).

:::

### UI for Entering XR

Finally, you'll need some UI to allow the user to enter XR mode. This is a WebXR-specific requirement, where a user gesture is required to activate an XR session. Let's create two simple buttons:

```html
<button id="enterAR">Enter AR</button>
<button id="enterVR">Enter VR</button>
```

With `xrSession` on the camera rig, the buttons only need to fire the app events it listens for:

```javascript
import { whenReady } from '@playcanvas/web-components';

const { app } = await whenReady('pc-app');

document.getElementById('enterAR').addEventListener('click', () => app.fire('ar:start'));
document.getElementById('enterVR').addEventListener('click', () => app.fire('vr:start'));
```

:::note

This snippet imports `whenReady` by package name, which requires `@playcanvas/web-components` to be listed in your page's import map. See [Programmatic Access](https://developer.playcanvas.com/user-manual/web-components/programmatic-access.md) for details.

:::

The event names are script attributes of `xrSession` (`start-ar-event`, `start-vr-event` and `end-event`), so you can rename them if they clash with events of your own. Ending a session needs no extra code: `xrSession` ends it when the `xr:end` event fires (the "Exit XR" menu item above) or when the user presses Escape.

You can also show each button only while the device supports its session type. The engine checks support asynchronously after the app starts, and again whenever a device is connected or disconnected, so set the buttons from its current answer and follow its `available` event:

```javascript
import { XRTYPE_AR, XRTYPE_VR } from 'playcanvas';

// Continuing the module above, where app is the running application
const buttons = {
    [XRTYPE_AR]: document.getElementById('enterAR'),
    [XRTYPE_VR]: document.getElementById('enterVR')
};

for (const [type, button] of Object.entries(buttons)) {
    button.hidden = !app.xr.isAvailable(type);
}

app.xr.on('available', (type, available) => {
    if (buttons[type]) {
        buttons[type].hidden = !available;
    }
});
```

### The Camera Element API

For minimal cases, [`<pc-camera>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-camera.md)'s element API can start and end XR sessions directly — no scripts required. Call `startXr` from the click handler itself, since WebXR only starts a session in response to a user gesture:

```javascript
import { whenReady } from '@playcanvas/web-components';

const camera = await whenReady('pc-camera');

document.getElementById('enter-vr').addEventListener('click', () => {
    camera.startXr('immersive-vr', 'local-floor');
});

// ...and later, to leave the session:
camera.endXr();
```

`startXr(type, space)` takes the session type (`'immersive-ar'` or `'immersive-vr'`) and a reference space (`'viewer'`, `'local'`, `'local-floor'`, `'bounded-floor'` or `'unbounded'`).

Availability is reported per mode, by `arAvailable` and `vrAvailable`. The two are independent — a device can offer either without the other, and an Android phone with ARCore commonly offers AR and no VR — so gate each control on the mode it starts. Both read the engine's current answer, which is still `false` for a moment after the app starts, so update your controls whenever the engine's answer changes:

```javascript
const { app } = await whenReady('pc-app');

const updateButtons = () => {
    document.getElementById('enter-vr').hidden = !camera.vrAvailable;
    document.getElementById('enter-ar').hidden = !camera.arAvailable;
};

updateButtons();
app.xr.on('available', updateButtons);
```

`startXr` is gated the same way and does nothing when the mode being asked for is unavailable, so a button that slips through does not fail loudly. Note that the `xrSession` script also manages the camera rig transforms, AR transparency and session cleanup for you — prefer it for full experiences, and the element API for quick tests and simple viewers. For AR through the element API, that part is yours: give the camera a transparent `clear-color="0 0 0 0"`, and remove any `<pc-sky>`, so that the real world shows through.

Many of the [Web Component examples](https://playcanvas.github.io/web-components/examples/) support XR, among them [Basic Shapes](https://playcanvas.github.io/web-components/examples/#basic-shapes.html), [GLB Loader](https://playcanvas.github.io/web-components/examples/#glb-loader.html) and [Shadow Cascades](https://playcanvas.github.io/web-components/examples/#shadow-cascades.html). Their source code shows the camera rig in place.

## Next Steps

The PlayCanvas Engine has comprehensive XR support, with a wide range of features and options. For more information, see the [XR documentation](https://developer.playcanvas.com/user-manual/xr.md).

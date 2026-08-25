---
title: XR Support
description: "WebXR setup for Web Components: load the engine's XR scripts, build a camera rig with xrSession, and start sessions by firing app events."
---

PlayCanvas Web Components make it easy to add Virtual Reality (VR) and Augmented Reality (AR) support to your applications.

## Basic Setup

To enable XR support, you'll need:

1. XR-specific scripts (provided by the [Engine NPM package](https://www.npmjs.com/package/playcanvas)).
2. A camera rig with the XR scripts attached.
3. UI for entering XR (WebXR requires a user gesture to start a session).
4. A secure context — serve your page over HTTPS (or `http://localhost` during development).

### XR Scripts

The engine ships a set of XR scripts in its `scripts/esm/xr` folder. Specify them using [`<pc-asset>`](tags/pc-asset.md) elements:

```html
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-controllers.mjs"></pc-asset>
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-menu.mjs"></pc-asset>
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-navigation.mjs"></pc-asset>
<pc-asset src="/node_modules/playcanvas/scripts/esm/xr/xr-session.mjs"></pc-asset>
```

Or, when using a CDN:

```html
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-controllers.mjs"></pc-asset>
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-menu.mjs"></pc-asset>
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-navigation.mjs"></pc-asset>
<pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@latest/scripts/esm/xr/xr-session.mjs"></pc-asset>
```

:::note[CDN and import maps]

When loading XR scripts from a CDN, make sure your page's import map also points the `playcanvas` module to the same CDN source and version as shown in the [Getting Started guide](getting-started.md). For production, consider pinning specific versions instead of `@latest`.

:::

* [`xr-session.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-session.mjs) - Manages the WebXR session lifecycle: starts an AR or VR session in response to app events (`ar:start` and `vr:start` by default), ends it on `xr:end` or the Escape key, and handles camera rig transforms, AR transparency and cleanup automatically.
* [`xr-controllers.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-controllers.mjs) - Dynamically downloads and renders XR controller models (GLBs) for any detected XR controllers (including hands).
* [`xr-navigation.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-navigation.mjs) - Implements basic teleportation navigation (via point and select actions).
* [`xr-menu.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-menu.mjs) - Shows an in-headset menu (via a palm-up gesture with hand tracking, or a controller button) whose items fire app events — ideal for an "Exit XR" button.

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

`xrMenu` renders text, so it needs a `font` type [`<pc-asset>`](tags/pc-asset.md) declared alongside your other assets — the [examples](https://github.com/playcanvas/web-components/tree/main/examples) use `arial.json`:

```html
<pc-asset src="assets/fonts/arial.json" type="font" id="arial-font"></pc-asset>
```

It is configured through the `attributes` JSON (rather than per-property attributes) because `menuItems` is a nested array — see [Adding Behavior with Scripts](scripting.md).

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

The event names are script attributes of `xrSession` (`start-ar-event`, `start-vr-event` and `end-event`), so you can rename them if they clash with events of your own. Ending a session needs no extra code: `xrSession` ends it when the `xr:end` event fires (the "Exit XR" menu item above) or when the user presses Escape.

You can also show each button only when the device supports that session type:

```javascript
import { XRTYPE_AR, XRTYPE_VR } from 'playcanvas';

const arButton = document.getElementById('enterAR');
arButton.style.display = app.xr.isAvailable(XRTYPE_AR) ? 'block' : 'none';

app.xr.on('available', (type, available) => {
    if (type === XRTYPE_AR) {
        arButton.style.display = available ? 'block' : 'none';
    }
});
```

:::note

This snippet imports `whenReady` by package name, which requires `@playcanvas/web-components` to be listed in your page's import map. See [Programmatic Access](programmatic-access.md) for details.

:::

### The Camera Element API

For minimal cases, [`<pc-camera>`](tags/pc-camera.md)'s element API can start and end XR sessions directly — no scripts required:

```javascript
import { whenReady } from '@playcanvas/web-components';

const camera = await whenReady('pc-camera');

if (camera.vrAvailable) {
    camera.startXr('immersive-vr', 'local-floor');
}

// ...and later, to leave the session:
camera.endXr();
```

`startXr(type, space)` takes the session type (`'immersive-ar'` or `'immersive-vr'`) and a reference space (`'viewer'`, `'local'`, `'local-floor'`, `'bounded-floor'` or `'unbounded'`).

Availability is reported per mode, by `arAvailable` and `vrAvailable`. The two are independent — a device can offer either without the other, and an Android phone with ARCore commonly offers AR and no VR — so gate each control on the mode it starts:

```javascript
document.getElementById('enter-vr').hidden = !camera.vrAvailable;
document.getElementById('enter-ar').hidden = !camera.arAvailable;
```

`startXr` is gated the same way and does nothing when the mode being asked for is unavailable, so a button that slips through does not fail loudly. Note that the `xrSession` script also manages the camera rig transforms, AR transparency and session cleanup for you — prefer it for full experiences, and the element API for quick tests and simple viewers.

Most of the [Web Component examples](https://playcanvas.github.io/web-components/examples/) have integrated support for XR. Consult their source code to see how it's done.

## Next Steps

The PlayCanvas Engine has comprehensive XR support, with a wide range of features and options. For more information, see the [XR documentation](/user-manual/xr).

---
title: Sessions
description: "WebXR sessions in PlayCanvas: VR and AR session types, checking availability, starting and ending sessions, reference spaces for seated, standing and room-scale experiences, requesting features, the camera and its rig, and what changes while a session runs."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A session is the time during which the device shows your scene. It starts when your application asks for it in response to a user action, and ends when your application or the user ends it. This page covers the choices you make when you start one, what the engine does to the camera while it runs, and how to clean up when it ends.

## Session Types {#session-types}

| Type | Constant | What the user sees |
| --- | --- | --- |
| VR | `pc.XRTYPE_VR` (`'immersive-vr'`) | Only your scene. The device's display shows nothing of the real world |
| AR | `pc.XRTYPE_AR` (`'immersive-ar'`) | Your scene over the real world, through a headset's passthrough cameras or see-through display, or a phone's camera |

Many headsets offer both. Phones offer AR. See [Platforms](/user-manual/xr/platforms/), and [AR](/user-manual/xr/ar/) for what AR adds.

## Checking Availability {#checking-availability}

Two checks tell you what the device can do:

- `app.xr.supported` is `true` when the browser implements WebXR at all.
- `app.xr.isAvailable(type)` is `true` when a session of that type can start now.

The engine asks the browser which session types are available after the application starts, and again whenever an XR device is connected or disconnected. The answer arrives a moment after the application starts, so `isAvailable()` returns `false` until then. Read it once, and follow the `available` event for changes:

```javascript
const updateButtons = () => {
    vrButton.hidden = !app.xr.isAvailable(pc.XRTYPE_VR);
    arButton.hidden = !app.xr.isAvailable(pc.XRTYPE_AR);
};
updateButtons();
app.xr.on('available', updateButtons);

// Or for one session type
app.xr.on(`available:${pc.XRTYPE_AR}`, (available) => {
    arButton.hidden = !available;
});
```

A type is reported as unavailable when the graphics device can't present it, which is the case for WebGPU on browsers without the WebXR/WebGPU binding, and when the page is in an `<iframe>` without `allow="xr-spatial-tracking"`. To decide between WebGPU and WebGL 2 before you create the device, use the static `pc.XrManager.isDeviceSupported(deviceType, type)`, as [Getting Started](/user-manual/xr/using-webxr/#setting-up) does.

## Starting a Session {#starting-a-session}

Start a session from the camera that should render it, with a session type and a [reference space](#reference-spaces):

```javascript
button.addEventListener('click', () => {
    camera.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR, {
        callback: (err) => {
            if (err) {
                console.error(`Couldn't start VR: ${err.message}`);
            }
        }
    });
});
```

`app.xr.start(camera.camera, type, space, options)` does the same. Call either from the handler of a user action, such as a click, a tap or a key press. The browser refuses a session requested any other way.

Starting is asynchronous. When the session is running, the callback receives `null` and `app.xr` fires `start`:

```javascript
app.xr.on('start', () => {
    console.log(`Started a session of type ${app.xr.type} in ${app.xr.spaceType} space`);
});
```

The callback receives an error instead when:

- The session type is not available. The message is `XR is not available`.
- A session is already running, or already being started. Calling `startXr()` twice, as a double click on a button can, is harmless.
- The browser refuses the session, for example because it wasn't started by a user action, the user declined a permission prompt, or the device doesn't support the reference space. `app.xr` also fires `error` with the same error.

With the [`XrSession`](/user-manual/xr/using-webxr/#your-first-vr-scene) script on the camera rig, fire its events instead. They take an optional reference space, which defaults to `local-floor`:

```javascript
app.fire('vr:start');
app.fire('ar:start', pc.XRSPACE_LOCAL);
```

## Reference Spaces {#reference-spaces}

A reference space decides where the origin of the tracked space is, and so where the camera is when the session starts. The camera's local position is the user's head position in this space.

| Space | Constant | Origin | Use for |
| --- | --- | --- | --- |
| Local floor | `pc.XRSPACE_LOCALFLOOR` | On the floor, below where the user starts. The floor is at a height of 0 | Standing and room-scale VR, and most AR. The usual choice |
| Local | `pc.XRSPACE_LOCAL` | At the user's head, where they start | Seated experiences, such as a cockpit or a 360° video, where the floor doesn't matter |
| Bounded floor | `pc.XRSPACE_BOUNDEDFLOOR` | On the floor, in a play area the user has set up | Room-scale VR that should stay within the user's boundary |
| Unbounded | `pc.XRSPACE_UNBOUNDED` | Near the user, where they start | AR that the user walks through, over distances larger than a room |
| Viewer | `pc.XRSPACE_VIEWER` | At the user's head, moving with it | Rarely useful for a session: the camera never moves |

The reference space is a required feature: if the device can't provide it, the session doesn't start, and the callback receives the browser's error. Every immersive session supports `local`, and most support `local-floor`. If you use `bounded-floor` or `unbounded`, handle the error, for example by offering the user a session in `local-floor` instead.

With `local`, the head starts at a height of 0, so raise the camera rig to the eye height you want in the scene. `XrSession` puts the rig on the floor when a session starts, so do it in a `start` handler that runs after the script's:

```javascript
app.xr.on('start', () => {
    if (app.xr.spaceType === pc.XRSPACE_LOCAL) {
        rig.translate(0, 1.2, 0); // a seated eye height
    }
});
```

## Session Features {#session-features}

Some WebXR features are requested for every session. Others are requested only when you ask for them in the options of `startXr()`:

| Option | Feature | Sessions | Page |
| --- | --- | --- | --- |
| *(always)* | Hand tracking | VR, AR | [Hand Tracking](/user-manual/xr/hand-tracking/) |
| *(always)* | Hit testing and light estimation | AR | [Hit Testing](/user-manual/xr/ar/hit-testing/), [Light Estimation](/user-manual/xr/ar/light-estimation/) |
| *(always, once `app.xr.domOverlay.root` is set)* | DOM overlay | AR | [DOM Overlay](/user-manual/xr/ar/dom-overlay/) |
| `anchors: true` | Anchors | AR | [Anchors](/user-manual/xr/ar/anchors/) |
| `planeDetection: true` | Plane detection | AR | [Plane Detection](/user-manual/xr/ar/plane-detection/) |
| `meshDetection: true` | Mesh detection | AR | [Mesh Detection](/user-manual/xr/ar/mesh-detection/) |
| `depthSensing: { usagePreference, dataFormatPreference }` | Depth sensing | AR | [Depth Sensing](/user-manual/xr/ar/depth-sensing/) |
| `cameraColor: true` | Camera access | AR | [Camera Access](/user-manual/xr/ar/camera-color/) |
| `imageTracking: true` | Image tracking | AR | [Image Tracking](/user-manual/xr/ar/image-tracking/) |
| `framebufferScaleFactor` | The resolution of the session | VR, AR | [Performance](/user-manual/xr/optimizing-webxr/#resolution) |
| `optionalFeatures` | Other WebXR features, by name | VR, AR | [Other WebXR Features](#other-webxr-features) |

All of these are optional features: a session starts without the ones the device doesn't support or the user doesn't allow. Each part of `app.xr` has a `supported` property, which says whether the browser implements the feature, and an `available` property, which says whether the running session has it. Check `available` after the session starts:

```javascript
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    anchors: true,
    planeDetection: true
});

app.xr.on('start', () => {
    if (!app.xr.planeDetection.available) {
        // Fall back, for example to hit testing
    }
});
```

Some features become available a moment after the session starts, and fire their own `available` event when they do.

`XrSession` starts sessions without options. To request features, start the session yourself, as above. The script still adjusts the rig, and makes the camera see-through in AR, for every session that starts:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
button.addEventListener('click', () => {
    camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, { planeDetection: true });
});
```

</TabItem>
<TabItem value="editor" label="Editor">

A script that adds an **Enter AR** button, and starts the session from it, on the entity with the camera:

```javascript
import { Script, XRSPACE_LOCALFLOOR, XRTYPE_AR } from 'playcanvas';

export class EnterAr extends Script {
    static scriptName = 'enterAr';

    initialize() {
        const button = document.createElement('button');
        button.textContent = 'Enter AR';
        document.body.appendChild(button);

        button.addEventListener('click', () => {
            this.entity.camera.startXr(XRTYPE_AR, XRSPACE_LOCALFLOOR, { planeDetection: true });
        });

        this.once('destroy', () => button.remove());
    }
}
```

</TabItem>
<TabItem value="react" label="React">

```jsx
import { XRSPACE_LOCALFLOOR, XRTYPE_AR } from 'playcanvas';
import { useApp } from '@playcanvas/react/hooks';

function EnterArButton() {
  const app = useApp();
  const start = () => {
    const camera = app.root.findByName('camera').camera;
    camera.startXr(XRTYPE_AR, XRSPACE_LOCALFLOOR, { planeDetection: true });
  };
  return <button onClick={start}>Enter AR</button>;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

The `startXr()` method of the `<pc-camera>` element takes no options, so call the engine component's method. The element's `component` property is the engine's camera component:

```javascript
import { XRSPACE_LOCALFLOOR, XRTYPE_AR } from 'playcanvas';
import { whenReady } from '@playcanvas/web-components';

const cameraElement = await whenReady('pc-camera');

button.addEventListener('click', () => {
    cameraElement.component.startXr(XRTYPE_AR, XRSPACE_LOCALFLOOR, { planeDetection: true });
});
```

</TabItem>
</Tabs>

## The Camera and Its Rig {#the-camera-and-its-rig}

While a session runs, the engine moves the camera every frame to the pose of the user's head in the reference space. It sets the camera entity's *local* position and rotation, so the camera's parent decides where that tracked space is in the scene. This parent is the camera rig:

![A camera rig seen from outside: an orange ring on the floor, away from the scene's origin, carries the square of the tracked space, and the user's head and controllers move within it](/img/user-manual/xr/sessions/camera-rig.webp)

- **Moving the rig moves the user.** Translate, rotate or scale the rig to teleport the user, turn them, or make them a giant. See [Locomotion](/user-manual/xr/locomotion/).
- **Don't move the camera itself.** Anything you set on the camera's transform is overwritten in the next frame. Scripts such as the engine's `CameraControls` stand down while a session runs.
- **Input sources are reported in world space.** The poses and rays of controllers and hands go through the rig's transform, so they line up with the camera wherever the rig is.
- **AR features are reported in tracking space.** The poses of hit test results, anchors, planes, meshes and tracked images are relative to the rig. When the rig is at the origin, unrotated and unscaled, that is the same as world space. Otherwise, add the entities that follow them as children of the rig. See [AR](/user-manual/xr/ar/#the-real-world-and-the-rig).

The camera's properties follow the device during a session. Its field of view and aspect ratio are the device's, and the camera reports them, so code that reads `camera.camera.fov` gets the value in use. Its near and far clip planes are passed to the device when the session starts, and the device uses them. From engine 2.23, changes to them during a session apply from the next frame. When the session ends, the camera reports its own values again.

The camera's position and rotation are not restored when a session ends: the camera keeps the last pose of the head. `XrSession` saves the transforms of the rig and the camera when a session starts and restores them when it ends. Without the script, do the same in `start` and `end` handlers.

## During a Session {#during-a-session}

The engine updates its view of the session every frame, before your scripts update, so input sources, AR features and the camera are current in `update`. A frame in which the device can't report the head's pose, for example while tracking is lost, is skipped: nothing updates or renders. While a session runs:

- `app.xr.active` is `true`, and `app.xr.type`, `app.xr.spaceType` and `app.xr.camera` describe it.
- The application renders at the device's frame rate, rather than the display's. See [Frame Rate](/user-manual/xr/optimizing-webxr/#frame-rate).
- The page's canvas is not updated. Its size, and the resolution of the graphics device, are the size of the session's framebuffer.
- `app.xr.on('update', (frame) => {})` receives the WebXR [`XRFrame`](https://developer.mozilla.org/en-US/docs/Web/API/XRFrame) every frame, for use with WebXR APIs directly.

The browser can hide your scene or take focus from it, for example while the device's system menu is open. `app.xr` fires `visibility:change` with the new state, which is also `app.xr.session.visibilityState`:

| State | Meaning |
| --- | --- |
| `'visible'` | Your scene is shown and has input |
| `'visible-blurred'` | Your scene is shown, but something else, such as a system menu, has input. Input sources may not update, and the frame rate may drop |
| `'hidden'` | Your scene is not shown, and no frames are rendered |

Pause your game while the state is not `'visible'`:

```javascript
app.xr.on('visibility:change', (state) => {
    app.timeScale = state === 'visible' ? 1 : 0;
});
```

## Ending a Session {#ending-a-session}

End a session from code with `app.xr.end()`, or `camera.camera.endXr()`. The user can also end it at any time, with the browser's or the device's own controls. Either way, `app.xr` fires `end`:

```javascript
app.xr.on('end', () => {
    // Back to the page
});
```

While the `end` handlers run, `app.xr.active` is still `true`, and `app.xr.type` and `app.xr.spaceType` still describe the session that ended. From engine 2.23, `app.xr.camera` does too. They are reset once all the handlers have run. The engine's own handlers run before yours, so by the time yours run, the input sources have been removed, firing their `remove` events, and so have the hit test sources, anchors, planes and meshes of an AR session.

When the session has ended, the application renders to the page's canvas again.

## Other WebXR Features {#other-webxr-features}

WebXR has modules that the engine doesn't wrap, such as layers and body tracking. Request one with `optionalFeatures`, and use it through the session and its frames:

```javascript
camera.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR, {
    optionalFeatures: ['layers']
});

app.xr.on('start', () => {
    if (app.xr.session.enabledFeatures?.includes('layers')) {
        // Use the WebXR Layers API through app.xr.session
    }
});
```

`app.xr.session` is the WebXR [`XRSession`](https://developer.mozilla.org/en-US/docs/Web/API/XRSession), and the `update` event passes each `XRFrame`. Not every browser lists `enabledFeatures`, so feature-detect what you use as well. Code that uses these APIs depends on the browser, and is not covered by the engine's compatibility promises.

## See Also

- [Getting Started](/user-manual/xr/using-webxr/) - Setting up XR, and a first VR scene
- [Locomotion](/user-manual/xr/locomotion/) - Moving the camera rig
- [Performance](/user-manual/xr/optimizing-webxr/) - Resolution, foveation and frame rate
- [XrManager](https://api.playcanvas.com/engine/classes/XrManager.html) - The API reference for `app.xr`

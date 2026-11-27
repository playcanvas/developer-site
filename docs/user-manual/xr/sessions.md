---
title: Sessions
description: "XR sessions in PlayCanvas: VR and AR session types, checking availability, starting a session from a user action with options and features, reference spaces, the camera and its rig, tracking space, visibility, ending a session and using WebXR directly."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An XR session is the time during which the user's headset or phone shows your application immersively. The application's XR manager, `app.xr`, starts and ends sessions, and while one runs it drives a camera from the user's head and reports the user's input. This page covers the life of a session and the spaces it works in. [Getting Started](/user-manual/xr/using-webxr/) shows a complete application to try them in.

## Session Types {#session-types}

| Type | Constant | What the user sees |
| --- | --- | --- |
| VR | `XRTYPE_VR` (`'immersive-vr'`) | Only your scene, which replaces the world around them |
| AR | `XRTYPE_AR` (`'immersive-ar'`) | Your scene over the real world, seen through a headset's passthrough cameras, its transparent displays or a phone's camera |

Some devices offer both. A headset such as a Meta Quest offers VR and AR, an Android phone usually offers only AR, and a desktop browser offers VR while a PC VR headset is connected. See [Platforms](/user-manual/xr/platforms/). The [AR](/user-manual/xr/ar/) section covers what only AR sessions do.

## Checking Availability {#checking-availability}

`app.xr.supported` is `true` when the browser has WebXR at all. Whether a session type can start right now is a separate question, which `app.xr.isAvailable(type)` answers. The engine asks the browser when the application starts, and again whenever a device is connected or disconnected. The browser answers asynchronously, so `isAvailable` returns `false` for a moment after the application starts. Follow its `available` event to keep a button up to date:

```javascript
const updateButtons = () => {
    vrButton.hidden = !app.xr.isAvailable(XRTYPE_VR);
    arButton.hidden = !app.xr.isAvailable(XRTYPE_AR);
};

app.xr.on('available', updateButtons);
updateButtons();
```

The handler of `available` is passed the session type and its availability. The `available:immersive-vr` and `available:immersive-ar` events fire for one type only, and are passed the availability alone.

A browser can only report a session type as available if the page is in a secure context and, in an iframe, is allowed `xr-spatial-tracking`. The engine also reports VR and AR as unavailable on a WebGPU device in a browser that can't present WebGPU to a headset. See [Requirements](/user-manual/xr/using-webxr/#requirements).

## Starting a Session {#starting-a-session}

Start a session on a camera, from the handler of a user action such as a click. The browser refuses a session that is requested at any other time:

```javascript
button.addEventListener('click', () => {
    camera.camera.startXr(XRTYPE_VR, XRSPACE_LOCALFLOOR, {
        callback: (err) => {
            if (err) {
                console.error(`VR failed to start: ${err.message}`);
            }
        }
    });
});
```

`startXr(type, spaceType, options)` on the [camera component](https://api.playcanvas.com/engine/classes/CameraComponent.html#startxr) does the same as `app.xr.start(camera.camera, type, spaceType, options)`. The second argument is the [reference space](#reference-spaces). Starting takes a moment, as the browser may ask the user for permission first. Once the session is running, the callback is called with `null` and `app.xr` fires `start`:

```javascript
app.xr.on('start', () => {
    console.log(`Started an ${app.xr.type} session in ${app.xr.spaceType} space`);
});
```

If it can't start, the callback is passed an `Error`. These are the errors you can expect:

| Error | Cause |
| --- | --- |
| `XR is not available` | The session type isn't [available](#checking-availability) |
| `XR session is already started` or `XR session is already starting` | Only one session can run at a time |
| A `SecurityError` from the browser | The request wasn't made from a user action |
| A `NotSupportedError` from the browser | The device can't run the session type with its reference space, or the user declined to allow it |

The first two are only reported to the callback. Errors from the browser are also fired as the `error` event of `app.xr`.

### With the XrSession Script {#with-the-xrsession-script}

The engine's [`XrSession`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-session.mjs) script, on the camera's parent, starts sessions for you when the application fires an event. Any code can then start or end a session without a reference to the camera:

```javascript
app.fire('vr:start');                 // a VR session in local-floor space
app.fire('ar:start', XRSPACE_LOCAL);  // an AR session in local space
app.fire('xr:end');                   // end the session
```

The event names are attributes of the script: `startVrEvent`, `startArEvent` and `endEvent`. It also ends the session when the user presses <kbd>Esc</kbd> on a keyboard, moves the [rig](#the-camera-and-its-rig) to the camera when a session starts, and makes the camera transparent in AR.

`XrSession` starts sessions without [options](#options-and-features). To ask for features such as plane detection or anchors, start the session yourself, as above. `XrSession` still moves the rig and handles AR for every session that starts on its camera, however it was started.

### Options and Features {#options-and-features}

WebXR keeps most of its abilities, such as hand tracking or detecting the planes of a room, in optional features that a session has to ask for when it starts. The engine asks for the ones that the options you pass need:

| Option | Session types | What it asks for |
| --- | --- | --- |
| `anchors` | AR | [Anchors](/user-manual/xr/ar/anchors/) |
| `cameraColor` | AR | [Camera access](/user-manual/xr/ar/camera-color/) |
| `depthSensing` | AR | [Depth sensing](/user-manual/xr/ar/depth-sensing/), with the usage and data format you prefer: `{ usagePreference, dataFormatPreference }` |
| `imageTracking` | AR | [Image tracking](/user-manual/xr/ar/image-tracking/) of the images added to `app.xr.imageTracking` |
| `meshDetection` | AR | [Mesh detection](/user-manual/xr/ar/mesh-detection/) |
| `planeDetection` | AR | [Plane detection](/user-manual/xr/ar/plane-detection/) |
| `optionalFeatures` | Both | An array of other WebXR feature names, passed to the browser as they are |
| `framebufferScaleFactor` | Both | The resolution of the session, relative to the device's recommended resolution. See [Performance](/user-manual/xr/optimizing-webxr/#resolution) |
| `callback` | Both | A function called when the session has started or failed to start |

Every session also asks for [hand tracking](/user-manual/xr/hand-tracking/), and every AR session for [hit testing](/user-manual/xr/ar/hit-testing/) and [light estimation](/user-manual/xr/ar/light-estimation/). An AR session asks for a [DOM overlay](/user-manual/xr/ar/dom-overlay/) when `app.xr.domOverlay.root` is set.

All of these are optional: a session starts without the features the device doesn't have. Check each one once the session has started, for example with `app.xr.planeDetection.available`. Only the reference space is required, and a session fails to start without it.

```javascript
camera.camera.startXr(XRTYPE_AR, XRSPACE_LOCALFLOOR, {
    planeDetection: true,
    anchors: true,
    callback: (err) => {
        if (err) return;
        if (!app.xr.planeDetection.available) {
            // fall back to placing content without planes
        }
    }
});
```

## Reference Spaces {#reference-spaces}

Poses in a session, of the head, the controllers and anything the device tracks, are given relative to a **reference space**: an origin and axes that the device fixes in the room. The reference space you start a session with decides where that origin is, and how far the user is expected to move.

![Three reference spaces seen from the side: local, with its origin at the user's head; local-floor, with its origin on the floor below the user; and bounded-floor, with its origin on the floor inside a boundary](/img/user-manual/xr/sessions/reference-spaces.webp)

| Space | Constant | Origin | Use it for |
| --- | --- | --- | --- |
| Local floor | `XRSPACE_LOCALFLOOR` | On the floor, near where the user stood when the session started | Most experiences, standing or seated. The floor is at y = 0, so the scene's floor lines up with the room's |
| Local | `XRSPACE_LOCAL` | At the user's head when the session started | Seated experiences, such as a cockpit or a cinema seat, where the height of the floor doesn't matter |
| Bounded floor | `XRSPACE_BOUNDEDFLOOR` | On the floor, within a boundary the user set up | Room-scale experiences in which the user walks around inside the boundary |
| Unbounded | `XRSPACE_UNBOUNDED` | Near where the user was when the session started | AR experiences in which the user walks far, such as around a building |
| Viewer | `XRSPACE_VIEWER` | At the user's head, moving with it | Rarely a session's space: everything would stay fixed to the user's view |

Use `local-floor` unless you need another. Every immersive session supports `local`, and nearly every device supports `local-floor`. `bounded-floor` and `unbounded` are only on some devices, and a session that asks for a space the device doesn't support fails to start.

In `local-floor`, a user who stands up or sits down moves up and down in the scene, just as they do in the room. In `local`, the scene doesn't know where the floor is, so content at y = 0 is at the height of the user's head. Seated experiences sometimes start in `local` and raise or lower the [rig](#the-camera-and-its-rig) to put the user's head where they want it.

## The Camera and Its Rig {#the-camera-and-its-rig}

While a session runs, the engine moves the session's camera. Every frame, it sets the camera entity's **local** position and rotation to the pose of the user's head in the reference space. The camera's parent, the **rig**, therefore sits at the origin of the reference space: the space's floor, in `local-floor`, is at the rig's position, and its axes are the rig's axes.

![A camera rig seen from outside: the rig's axes on the floor, and the headset and controllers above it, with the camera's position relative to the rig](/img/user-manual/xr/sessions/camera-rig.webp)

That gives you two ways to move the user's view, which add together:

- **The user moves their head.** The camera moves relative to the rig. Your code can read the camera's position and rotation, but anything it sets on them is overwritten.
- **Your code moves the rig.** The user moves through the scene, as they do when they teleport or walk with a thumbstick. Moving the rig also moves the controllers and hands, which the engine reports relative to it. See [Input Sources](/user-manual/xr/input-sources/).

Give the camera a parent entity, even if it never moves. If the camera is a child of the scene's root, the reference space's origin is at the scene's origin.

The engine also takes over the camera's projection. It sets the camera's field of view and aspect ratio from the headset's displays, renders one view for each eye from a position offset from the camera's, and ignores the camera's own projection settings. It does use the camera's near and far clip distances, and applies changes to them during the session. Keep the near clip small, such as 0.01 to 0.1, as users can bring controllers and their hands close to their eyes.

`XrSession` moves the rig when a session starts, so that the user starts where the camera was. It puts the rig on the ground (y = 0) below the camera, facing the way the camera faces across the ground. When the session ends, it puts the rig and the camera back where they were. Without `XrSession`, nothing restores them: the camera keeps the last pose of the user's head.

### Tracking Space {#tracking-space}

The rig's local space is the session's **tracking space**. The engine gives most poses in world space, by applying the rig's transform to them. The camera's position and rotation, the poses and rays of [input sources](/user-manual/xr/input-sources/) and the joints of [hands](/user-manual/xr/hand-tracking/) all follow the rig as it moves.

What an AR session detects in the real world is the exception. [Hit test](/user-manual/xr/ar/hit-testing/) results, [anchors](/user-manual/xr/ar/anchors/), [planes](/user-manual/xr/ar/plane-detection/), [meshes](/user-manual/xr/ar/mesh-detection/) and [tracked images](/user-manual/xr/ar/image-tracking/) are given in tracking space. Their positions match the world only while the rig is at the scene's origin, unrotated. Add the entities that show them as children of the rig, and set their **local** position and rotation, so that they stay on the real surfaces as the rig moves.

## During a Session {#during-a-session}

While a session runs, `app.xr.active` is `true`, and these properties of `app.xr` describe it:

| Property | Value |
| --- | --- |
| `type` | The session type: `'immersive-vr'` or `'immersive-ar'` |
| `spaceType` | The reference space, such as `'local-floor'` |
| `camera` | The camera's entity |
| `session` | The browser's [`XRSession`](https://developer.mozilla.org/docs/Web/API/XRSession) object |

The headset drives the frame loop while a session runs. Frames come at the headset's refresh rate, often 72, 90 or 120 frames per second, rather than the monitor's, and the page's own `requestAnimationFrame` callbacks may stop. Use the application's `update` event rather than your own timers. `app.xr` also fires `update` every frame, after it has updated the camera and input, with the session's [`XRFrame`](https://developer.mozilla.org/docs/Web/API/XRFrame).

### Visibility {#visibility}

The device can hide your application, or show it behind its own interface, without ending the session. That happens when the user opens the system menu, takes the headset off, or answers a permission prompt. `app.xr` fires `visibility:change` with the new state:

| State | Meaning |
| --- | --- |
| `'visible'` | The application is shown and receives input |
| `'visible-blurred'` | The application is shown, perhaps dimmed or behind the device's interface, but receives no input. Frames may come less often |
| `'hidden'` | The application isn't shown, and no frames are rendered |

Pause anything that depends on the user, such as a game's timer, unless the application is visible and receives input:

```javascript
app.xr.on('visibility:change', (state) => {
    app.timeScale = state === 'visible' ? 1 : 0;
});
```

## Ending a Session {#ending-a-session}

End a session from code with `app.xr.end()` or the camera's `endXr()`. Both take an optional callback, called once the session has ended. The user can also end a session at any time with the device's own controls, so always listen for the `end` event rather than only ending sessions yourself:

```javascript
app.xr.on('end', () => {
    // Show the page's own interface again
});
```

While the `end` handlers run, `app.xr.active` is still `true`, and `app.xr.camera`, `type` and `spaceType` still describe the session that is ending, so a handler can tell whether a VR or an AR session ended. They are reset once all the handlers have run. So don't check `app.xr.active` in an `end` handler to decide whether a session is running.

## Using WebXR Directly {#using-webxr-directly}

The engine covers the parts of WebXR that most applications use. For the rest, use the browser's objects directly. Ask for the features you need with `optionalFeatures`, and use `app.xr.session` once the session has started.

For example, a room-scale application can draw the boundary of a `bounded-floor` session. The boundary is a polygon of points on the floor, relative to the space's origin, which is at the rig:

```javascript
app.xr.on('start', async () => {
    if (app.xr.spaceType !== XRSPACE_BOUNDEDFLOOR) return;

    const space = await app.xr.session.requestReferenceSpace('bounded-floor');
    for (const point of space.boundsGeometry) {
        // point.x and point.z are in meters, on the floor of the tracking space
    }
});
```

Read poses from the `XRFrame` that the `update` event of `app.xr` passes, relative to a reference space that you request from the session.

## See Also

- [Getting Started](/user-manual/xr/using-webxr/) - Setting up XR on each surface, and a first VR scene
- [Input Sources](/user-manual/xr/input-sources/) - Controllers, hands, screen taps and their rays
- [AR](/user-manual/xr/ar/) - Sessions that show your scene over the real world
- [XrManager](https://api.playcanvas.com/engine/classes/XrManager.html) and [CameraComponent#startXr](https://api.playcanvas.com/engine/classes/CameraComponent.html#startxr) - Reference for starting and managing sessions
- [WebXR Device API](https://immersive-web.github.io/webxr/) - The specification of sessions, reference spaces and features

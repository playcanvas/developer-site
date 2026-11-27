---
title: Troubleshooting
description: "Causes and fixes for common XR problems in PlayCanvas: sessions that are unavailable or fail to start, a camera at the wrong height or position, missing controllers, black AR backgrounds, misplaced AR content, blurry or juddering views."
---

Find the problem you see, then check its causes in order.

## Starting a Session {#starting-a-session}

| Problem | Cause | Fix |
| --- | --- | --- |
| VR or AR is never available, and the button to enter it never shows | The page isn't in a secure context | Serve it over HTTPS, or from `localhost`. See [Testing on a Device](/user-manual/xr/testing/#testing-on-a-device) |
| | The page is in an iframe that doesn't allow XR | Add `allow="xr-spatial-tracking"` to the `<iframe>`. In debug builds, the engine logs a warning when it skips checking availability for this reason |
| | The graphics device uses WebGPU, in a browser that can't present WebGPU to a headset | Use WebGL 2. See [Choosing a Graphics Device](/user-manual/xr/using-webxr/#choosing-a-graphics-device) |
| | The device doesn't support the session type, such as AR on an Apple Vision Pro | See [Platforms](/user-manual/xr/platforms/) |
| | The code checked `isAvailable` once, as the application started | The answer arrives asynchronously. Follow the `available` event. See [Checking Availability](/user-manual/xr/sessions/#checking-availability) |
| | The application has no XR manager, so `app.xr` is `null` | Add `options.xr = XrManager` to the `AppOptions` of an application created with `AppBase` |
| The session doesn't start when the button is selected | The session was requested outside the handler of a user action, such as after an `await` or from a timer | Call `startXr`, or fire the event that starts the session, in the click handler itself |
| | It asks for a reference space that the device doesn't support, such as `bounded-floor` | Start with `local-floor`. Pass a callback to `startXr` to see the error. See [Reference Spaces](/user-manual/xr/sessions/#reference-spaces) |
| | A session is already running or starting | Only one session can run at a time. The callback is passed `XR session is already started` or `XR session is already starting` |
| A feature such as plane detection is unavailable during the session | The session was started without the option that asks for it | Pass the option to `startXr`. The `XrSession` script starts sessions without options. See [Options and Features](/user-manual/xr/sessions/#options-and-features) |
| | The device or the user didn't grant it | Check `app.xr.session.enabledFeatures`, and see [Platforms](/user-manual/xr/platforms/) |

## In the Session {#in-the-session}

| Problem | Cause | Fix |
| --- | --- | --- |
| Setting the camera's position or rotation has no effect | The headset sets the camera's local position and rotation every frame | Move the camera's parent, the rig. See [The Camera and Its Rig](/user-manual/xr/sessions/#the-camera-and-its-rig) |
| The user is too high, too low or inside the floor | The session uses `local` space, whose origin is at the user's head | Use `local-floor`, whose origin is on the floor |
| | The rig isn't on the floor of the scene | Put the rig at the height of the floor. The `XrSession` script puts it at y = 0 when a session starts |
| The user starts in a different place, or facing another way, from the page's view | The `XrSession` script moves the rig below the camera, facing where it faces | Place and turn the camera, before the session starts, where the user should start |
| The camera doesn't return to where it was after a session | Nothing restores it, unless the `XrSession` script is on the rig | Add `XrSession`, or save and restore the camera and rig yourself in `start` and `end` handlers |
| No controllers or hands are drawn | Nothing draws them: the engine reports their poses, but doesn't draw models | Add the `XrControllers` script to the rig. See [Getting Started](/user-manual/xr/using-webxr/#your-first-vr-scene) |
| | `XrControllers` can't download the models | It loads them from a CDN, so the device needs internet access. Set its `basePath` attribute to host the models yourself |
| Controllers are drawn in the wrong place | Their models aren't children of the rig, and are placed with local poses | Use world positions and rotations, `getPosition()` and `getRotation()`, or add the models under the rig. See [Tracking Space](/user-manual/xr/sessions/#tracking-space) |
| Objects disappear when brought close to the eyes | The camera's near clip distance is too large | Set `nearClip` to between 0.01 and 0.1 |
| The button that enters XR stays hidden after a session ends | Its `end` handler checks `app.xr.active`, which is still `true` while `end` handlers run | Show the button in the `end` handler without checking `active`, as [Getting Started](/user-manual/xr/using-webxr/#your-first-vr-scene) does. See [Ending a Session](/user-manual/xr/sessions/#ending-a-session) |
| The application keeps running behind the system menu | It doesn't react to the session's visibility | Pause it on the `visibility:change` event. See [Visibility](/user-manual/xr/sessions/#visibility) |

## In AR {#in-ar}

| Problem | Cause | Fix |
| --- | --- | --- |
| The background is black or a color, not the real world | The camera clears to an opaque color, or a skybox is drawn | Give the camera a transparent clear color, `new Color(0, 0, 0, 0)`, and hide the skybox layer. The `XrSession` script does both during AR sessions |
| Content placed on hit test results, planes or anchors is in the wrong place, or drifts as the user moves | These poses are in tracking space, and the rig has moved away from the scene's origin | Add the content as a child of the rig, and set its local position and rotation. See [Tracking Space](/user-manual/xr/sessions/#tracking-space) |

## Performance {#performance}

| Problem | Cause | Fix |
| --- | --- | --- |
| The view is blurry, or text is hard to read | The session renders below the device's recommended resolution | Set `maxPixelRatio` to `window.devicePixelRatio`. See [Resolution](/user-manual/xr/optimizing-webxr/#resolution) |
| The view judders or smears as the user looks around | Frames take longer than the headset's frame time | See [Performance](/user-manual/xr/optimizing-webxr/), and lower the [frame rate](/user-manual/xr/optimizing-webxr/#frame-rate) or the resolution |
| Fixed foveation has no effect | The graphics device uses anti-aliasing with WebGL | Create the device with `antialias: false`. See [Fixed Foveation](/user-manual/xr/optimizing-webxr/#fixed-foveation) |

## See Also

- [Testing and Debugging](/user-manual/xr/testing/) - Emulators, devices and remote debugging
- [Sessions](/user-manual/xr/sessions/) - The session lifecycle, reference spaces and the camera rig
- [Troubleshooting](/user-manual/user-interface/troubleshooting/) in the User Interface section - For panels and buttons that don't respond in XR

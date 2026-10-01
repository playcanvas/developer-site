---
title: Troubleshooting
description: "Common problems with WebXR applications made with PlayCanvas, from Enter VR buttons that never appear and sessions that fail to start to black AR views, misplaced content, unresponsive UI and low frame rates, with their causes and fixes."
---

Most problems below link to the page that explains them in full.

## Starting Sessions {#starting-sessions}

| Problem | Cause | Fix |
| --- | --- | --- |
| The Enter VR or AR button never appears | The page isn't a secure context | Serve it over HTTPS, or from `localhost`. See [Testing and Debugging](/user-manual/xr/testing/#on-a-device) |
| | The page is in an `<iframe>` without permission | Add `allow="xr-spatial-tracking"` to the `<iframe>` |
| | The graphics device is WebGPU, and the browser has no WebXR/WebGPU binding | Use WebGL 2. See [Getting Started](/user-manual/xr/using-webxr/#setting-up) |
| | Availability was read once, before the engine had checked | Follow the `available` event. See [Sessions](/user-manual/xr/sessions/#checking-availability) |
| | The device or browser doesn't support the session type | See [Platforms](/user-manual/xr/platforms/) |
| `startXr()` fails, or does nothing | It wasn't called from the handler of a user action | Call it from a click, tap or key press handler, or fire `XrSession`'s event from one |
| | The device doesn't support the reference space | Use `local-floor` or `local`. See [Reference Spaces](/user-manual/xr/sessions/#reference-spaces) |
| A feature such as plane detection is never available | It wasn't requested, or the device doesn't offer it | Request it in the options of `startXr()`, and check `available`. See [Session Features](/user-manual/xr/sessions/#session-features) |
| | `XrSession` started the session, which passes no options | Start sessions that need features yourself. `XrSession` still adjusts the rig |
| Light estimation never becomes available | Estimation wasn't started | Call `app.xr.lightEstimation.start()` once the AR session has started. See [Light Estimation](/user-manual/xr/ar/light-estimation/) |

## What the User Sees {#what-the-user-sees}

| Problem | Cause | Fix |
| --- | --- | --- |
| AR shows a solid color or the skybox instead of the real world | The camera doesn't clear to transparent, or the skybox draws | Use `XrSession`, or clear to `(0, 0, 0, 0)` and disable the skybox layer. See [AR](/user-manual/xr/ar/#starting-an-ar-session) |
| The user is in the floor, or floating | `local` space starts the head at a height of 0, or the rig is raised in `local-floor` space, which already includes the user's height | Use `local-floor` with the rig on the floor, or raise the rig for `local` only. See [Reference Spaces](/user-manual/xr/sessions/#reference-spaces) |
| The user starts facing the wrong way | The rig, or the camera's heading before the session, faces away | `XrSession` turns the rig to the camera's heading. Before engine 2.23, it was wrong for headings beyond 90°. See [Your First VR Scene](/user-manual/xr/using-webxr/#your-first-vr-scene) |
| The camera doesn't move with the headset, or jitters | Code, such as a camera controller, moves the camera during the session | Move the camera rig, not the camera. See [The Camera and Its Rig](/user-manual/xr/sessions/#the-camera-and-its-rig) |
| After a session, the page shows the scene from a different place | The camera keeps the last pose of the head | Restore the camera's transform in an `end` handler, or use `XrSession`. See [The Camera and Its Rig](/user-manual/xr/sessions/#the-camera-and-its-rig) |
| AR content is offset from the real world | Content follows hit tests, anchors, planes or meshes, but isn't under the rig, which has moved | Add it as children of the rig, and set local transforms. See [AR](/user-manual/xr/ar/#the-real-world-and-the-rig) |
| Text in the scene is hard to read | It is too small or too far away for the headset's resolution | See [UI in XR](/user-manual/user-interface/xr/#building-a-panel) |

## Input {#input}

| Problem | Cause | Fix |
| --- | --- | --- |
| Code for two controllers breaks | Controllers become hands, and Apple Vision Pro sends transient input | Handle `add` and `remove`, and look at what each input source has. See [Input Sources](/user-manual/xr/input-sources/#hands-controllers-and-transient-input) |
| A pose or ray changes after you stored it | The input source reuses the vectors it returns | Copy them. See [Pointing](/user-manual/xr/input-sources/#pointing) |
| Objects placed at hit test results all move to the latest one | The position and rotation are reused for every result | Copy them. See [Hit Test Sources](/user-manual/xr/ar/hit-testing/#hit-test-sources) |
| Controllers get no hit test results | Hit tests from input sources apply to transient input, such as taps | Hit test from the viewer, or test against planes and meshes. See [Hit Tests from Taps](/user-manual/xr/ar/hit-testing/#hit-tests-from-taps) |
| UI doesn't respond to controllers | The application has no `ElementInput`, or the elements don't use input | See [UI in XR](/user-manual/user-interface/xr/#pointing-and-selecting) |
| Selecting a menu item also teleports | `XrNavigation` teleports at the end of every select | Turn teleporting off while menus are open. See [Teleporting and UI](/user-manual/xr/locomotion/#teleporting-and-ui) |
| Teleports land on walls, pass through them, or fall through floors | `castRay` accepts any surface, lets the arc carry on past a wall, or casts rays that start just above a surface | See [Landing on Your Geometry](/user-manual/xr/locomotion/#landing-on-your-geometry) |
| `XrNavigation` or `XrControllers` ignores the controllers | The script was created during a session, after the controllers were added | Create the scripts before the session starts |
| Hand gestures do nothing | The device keeps the gesture, or tracking was lost | See [Hand Tracking](/user-manual/xr/hand-tracking/#tracking) |
| Taps on HTML in AR also select in the scene | Taps on DOM Overlay are selects too | Cancel `beforexrselect`. See [DOM Overlay](/user-manual/xr/ar/dom-overlay/#taps-on-the-overlay) |

## Performance {#performance}

| Problem | Cause | Fix |
| --- | --- | --- |
| The frame rate is low, or the world stutters as the head moves | The scene costs too much to render twice at XR resolutions | See [Performance](/user-manual/xr/optimizing-webxr/) |
| AR on a phone looks blurry | The graphics device's pixel ratio is below the display's | Raise `maxPixelRatio`. See [Resolution](/user-manual/xr/optimizing-webxr/#resolution) |
| Fixed foveation does nothing | The graphics device uses anti-aliasing | Create it without. See [Fixed Foveation](/user-manual/xr/optimizing-webxr/#fixed-foveation) |
| The application stops when a session ends | Before engine 2.23, an `end` or `remove` handler that throws an error stops the application. In those versions, `app.xr.camera` is `null` in `end` handlers, and a removed plane's or mesh's `label`, `points`, `vertices` and `indices` throw | Update to engine 2.23, or don't read them in those handlers. See [Ending a Session](/user-manual/xr/sessions/#ending-a-session) |

## See Also

- [Testing and Debugging](/user-manual/xr/testing/) - Emulators and remote debugging
- [UI Troubleshooting](/user-manual/user-interface/troubleshooting/) - Problems with interfaces

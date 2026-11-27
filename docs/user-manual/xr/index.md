---
title: XR
description: "Overview of VR and AR in PlayCanvas with WebXR: how immersive sessions, the camera rig, stereo views and XR input work, the engine's XR scripts, the features available in VR and AR, and a map of this section."
---

XR, or extended reality, covers virtual reality (VR), in which a headset replaces the world around the user with your scene, and augmented reality (AR), in which your scene appears in the real world. PlayCanvas applications run in XR through WebXR, the web's API for immersive devices, in the browsers of headsets such as the Meta Quest and Apple Vision Pro, of Android phones, and of computers with a PC VR headset. There's nothing to install: the user opens a web page and selects a button to enter XR.

![The view inside a VR headset, one image for each eye: colored shapes over a grid floor, and two controllers pointing laser rays at them](/img/user-manual/xr/index/hero.webp)

XR works the same way whichever way you build: in the Editor, directly against the engine, in [PlayCanvas React](/user-manual/react/) and in [Web Components](/user-manual/web-components/). Each page in this section explains a concept once, and shows how to apply it on each of those surfaces where they differ.

## How XR Works {#how-xr-works}

An XR application starts as an ordinary web page, which renders to a canvas. Then:

- **The user enters a session.** A button on the page asks the browser for an immersive session, VR or AR, and the device takes over the display. When the user leaves the session, the page is shown again. See [Sessions](/user-manual/xr/sessions/).
- **The headset drives a camera.** Every frame, the engine moves the session's camera to the pose of the user's head, relative to the camera's parent entity, its **rig**. To move the user through the scene, move the rig. See [The Camera and Its Rig](/user-manual/xr/sessions/#the-camera-and-its-rig).
- **The scene is rendered once for each eye.** A headset shows each eye its own image, from a position a few centimeters from the other's, which gives the scene depth. The engine renders both from the one camera. A phone in AR shows a single view.
- **Controllers and hands are input sources.** Each has a ray that points into the scene, and a primary action such as pulling a trigger or pinching. See [Input Sources](/user-manual/xr/input-sources/).
- **In AR, the real world shows through.** The camera clears to transparent instead of a color, and the device composites your scene over its view of the room. AR sessions can also find surfaces in the room and place content on them. See [AR](/user-manual/xr/ar/).

## Building Blocks {#building-blocks}

The engine's XR manager does the work of a session, and a set of scripts that ship with the engine add the usual behavior of an XR application on top of it:

| Building block | Role |
| --- | --- |
| [`XrManager`](https://api.playcanvas.com/engine/classes/XrManager.html) (`app.xr`) | Checks which session types are available, starts and ends sessions, drives the camera, and gives access to input and every XR feature |
| [`CameraComponent#startXr`](https://api.playcanvas.com/engine/classes/CameraComponent.html#startxr) and `endXr` | Start and end a session on a camera |
| [`XrSession`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-session.mjs) script | Starts and ends sessions in response to application events, places the rig when a session starts, and makes the camera transparent in AR. See [Sessions](/user-manual/xr/sessions/#with-the-xrsession-script) |
| [`XrControllers`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-controllers.mjs) script | Draws a model of each controller and hand. See [Getting Started](/user-manual/xr/using-webxr/#your-first-vr-scene) |
| [`XrNavigation`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-navigation.mjs) script | Moves the user by teleporting and with the thumbsticks |
| [`XrMenu`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-menu.mjs) script | A menu on the user's hand or controller. See [UI in XR](/user-manual/user-interface/xr/#xr-menus) |
| [`XrManipulation`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-manipulation.mjs) script | Lets the user grab the scene with both hands to move, turn and scale it |

The scripts are in the `playcanvas` package on npm, under `scripts/esm/xr/`, and in the engine's [GitHub repository](https://github.com/playcanvas/engine/tree/main/scripts/esm/xr). [Getting Started](/user-manual/xr/using-webxr/) adds them to an application on each surface.

## Features {#features}

What a session can do depends on the device and its browser. Each feature is a part of `app.xr` with its own page. Check that a feature is available once a session has started, and give the user a way to carry on without it. See [Platforms](/user-manual/xr/platforms/) for the features of each device.

| Feature | VR | AR | What it does |
| --- | --- | --- | --- |
| [Input Sources](/user-manual/xr/input-sources/) | ✅ | ✅ | Controllers, hands, gaze and screen taps, with their rays and buttons |
| [Hand Tracking](/user-manual/xr/hand-tracking/) | ✅ | ✅ | The position of each joint of the user's hands |
| [Hit Testing](/user-manual/xr/ar/hit-testing/) | | ✅ | Casts a ray at the real world, to place content on its surfaces |
| [Anchors](/user-manual/xr/ar/anchors/) | | ✅ | Keeps content in place in the real world as the device's understanding of the room improves, and between sessions |
| [Plane Detection](/user-manual/xr/ar/plane-detection/) | | ✅ | Floors, walls, tables and other flat surfaces in the room |
| [Mesh Detection](/user-manual/xr/ar/mesh-detection/) | | ✅ | The shape of the room and its furniture, as meshes |
| [Depth Sensing](/user-manual/xr/ar/depth-sensing/) | | ✅ | The distance to the real world at each pixel, to hide content behind real objects |
| [Light Estimation](/user-manual/xr/ar/light-estimation/) | | ✅ | The direction, color and intensity of the room's light |
| [Camera Access](/user-manual/xr/ar/camera-color/) | | ✅ | The image from the device's camera, as a texture |
| [Image Tracking](/user-manual/xr/ar/image-tracking/) | | ✅ | The position of printed images that you provide |
| [DOM Overlay](/user-manual/xr/ar/dom-overlay/) | | ✅ | HTML shown over AR on a phone |

The engine also gives access to the device's frame rate and fixed foveation. See [Performance](/user-manual/xr/optimizing-webxr/). For WebXR features that the engine doesn't cover, see [Using WebXR Directly](/user-manual/xr/sessions/#using-webxr-directly).

## In This Section {#in-this-section}

- [Getting Started](/user-manual/xr/using-webxr/) - Setting up XR on each surface, and a first VR scene.
- [Sessions](/user-manual/xr/sessions/) - Session types, starting and ending sessions, features, reference spaces and the camera rig.
- [Input Sources](/user-manual/xr/input-sources/) - Controllers, hands, gaze and screen taps.
- [Hand Tracking](/user-manual/xr/hand-tracking/) - The joints of the user's hands.
- [AR](/user-manual/xr/ar/) - Hit testing, anchors, plane and mesh detection, depth sensing and more.
- [Performance](/user-manual/xr/optimizing-webxr/) - Resolution, frame rate, foveation and keeping each frame on time.
- [Testing and Debugging](/user-manual/xr/testing/) - Emulating a headset in a desktop browser, and testing on devices.
- [Platforms](/user-manual/xr/platforms/) - Devices and browsers, and the features of each.
- [Troubleshooting](/user-manual/xr/troubleshooting/) - Common problems and their causes.

## See Also

- [WebXR Hello World](/tutorials/webxr-hello-world/) and the other [WebXR tutorials](/tutorials/?q=webxr) - Tutorials that build XR applications in the Editor
- [UI in XR](/user-manual/user-interface/xr/) - Panels, pointing and menus in immersive sessions
- [XR Support](/user-manual/web-components/xr/) and [XR in PlayCanvas React](/user-manual/react/guide/xr/) - XR on the Web Components and React surfaces
- [XR examples](https://playcanvas.com/examples/#/xr/vr-basic) - The engine's XR examples

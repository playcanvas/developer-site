---
title: XR
description: "Overview of XR in PlayCanvas: immersive VR and AR with WebXR, how a session takes over the camera, the building blocks on every authoring surface, the features you can use, and a map of this section."
---

XR covers virtual reality (VR), which replaces what the user sees with your scene, and augmented reality (AR), which places your scene in the real world. PlayCanvas applications run them in the browser with [WebXR](https://immersive-web.github.io/webxr/), on headsets such as Meta Quest and Apple Vision Pro, on Android phones, and on PC VR headsets. Users reach them from a link, with nothing to install.

![A VR scene as a headset's two eyes see it: two controllers point their rays at floating boxes and a sphere above a grid floor](/img/user-manual/xr/index/hero.webp)

## How XR Works {#how-xr-works}

An application shows its scene on the page like any other, until the user asks to enter VR or AR. That starts a WebXR session, which hands the display to the device:

- **The device tracks the user's head.** Every frame, the engine moves the camera to the head's pose. It sets the camera entity's local position and rotation, so the camera moves inside its parent entity, the *camera rig*. Moving the rig moves the user through the scene.
- **The scene is drawn once per view.** A headset has a view for each eye, and a phone has one. The engine renders them all from the camera, with the field of view and resolution the device asks for.
- **Controllers, hands and taps become input sources.** Each has a ray to point with, and actions such as select and squeeze.
- **In AR, the real world shows through.** The camera clears to transparent, and AR features such as hit testing and plane detection describe the user's surroundings.

Browsers start a session only in response to a user action, such as a click on an **Enter VR** button. The session ends when your application ends it or the user leaves it, and the page shows the scene again.

## Building Blocks {#building-blocks}

The [XR manager](https://api.playcanvas.com/engine/classes/XrManager.html), `app.xr`, checks which kinds of session the device supports, starts and ends sessions, and gives access to input sources and AR features. A session renders from a [camera component](https://api.playcanvas.com/engine/classes/CameraComponent.html), whose `startXr()` and `endXr()` methods start and end it.

The engine also ships scripts, in the `scripts/esm/xr` folder of its npm package, that do the common jobs:

| Script | What it does | Page |
| --- | --- | --- |
| `XrSession` | Starts and ends sessions in response to application events and the Escape key, places the camera rig, and makes the camera see-through in AR | [Getting Started](/user-manual/xr/using-webxr/) |
| `XrControllers` | Draws a model of each controller and hand that the device tracks | [Controllers](/user-manual/xr/controllers/#controller-models) |
| `XrNavigation` | Teleports, moves and turns the camera rig with controllers and hands | [Locomotion](/user-manual/xr/locomotion/) |
| `XrManipulation` | Lets the user grab the scene with both hands to move, turn and scale it | [Locomotion](/user-manual/xr/locomotion/#moving-the-world) |
| `XrMenu` | Shows a menu on the user's palm or controller, or in front of them | [UI in XR](/user-manual/user-interface/xr/#xr-menus) |

The XR manager and the scripts are the same whichever way you build: in the Editor, directly against the engine, in [PlayCanvas React](/user-manual/react/guide/xr/) and in [Web Components](/user-manual/web-components/xr/). [Getting Started](/user-manual/xr/using-webxr/) sets XR up on each of them, and the rest of this section explains a concept once and then shows how to apply it.

## Features {#features}

What a session can do depends on the device and the browser. The engine requests some features for every session, and others when you ask for them as you start one. Each part of `app.xr` reports whether the session got its feature:

| Feature | What it gives you | Sessions | Page |
| --- | --- | --- | --- |
| Input sources | Controllers, hands, gaze and screen taps, with rays, selects and squeezes | VR, AR | [Input Sources](/user-manual/xr/input-sources/) |
| Controllers | Controller poses, buttons, thumbsticks, haptics and velocity | VR, AR | [Controllers](/user-manual/xr/controllers/) |
| Hand tracking | The pose of 25 joints in each hand | VR, AR | [Hand Tracking](/user-manual/xr/hand-tracking/) |
| Hit testing | Where a ray meets a real-world surface | AR | [Hit Testing](/user-manual/xr/ar/hit-testing/) |
| Anchors | Points that stay fixed to the real world, optionally from one session to the next | AR | [Anchors](/user-manual/xr/ar/anchors/) |
| Plane detection | Flat surfaces such as floors, walls and tables | AR | [Plane Detection](/user-manual/xr/ar/plane-detection/) |
| Mesh detection | Triangle meshes of the room and the objects in it | AR | [Mesh Detection](/user-manual/xr/ar/mesh-detection/) |
| Depth sensing | The distance to the real world at each pixel | AR | [Depth Sensing](/user-manual/xr/ar/depth-sensing/) |
| Light estimation | The direction, color and intensity of real-world light | AR | [Light Estimation](/user-manual/xr/ar/light-estimation/) |
| Camera access | The image from the device's camera, as a texture | AR | [Camera Access](/user-manual/xr/ar/camera-color/) |
| Image tracking | The pose of printed images in the real world | AR | [Image Tracking](/user-manual/xr/ar/image-tracking/) |
| DOM overlay | HTML and CSS over handheld AR | AR | [DOM Overlay](/user-manual/xr/ar/dom-overlay/) |

[Platforms](/user-manual/xr/platforms/) lists what each device and browser supports. WebXR modules that the engine does not wrap, such as layers, can still be requested and used directly. See [Sessions](/user-manual/xr/sessions/#other-webxr-features).

## In This Section {#in-this-section}

- [Getting Started](/user-manual/xr/using-webxr/) - Requirements, setting up XR on each surface, and a first VR scene.
- [Sessions](/user-manual/xr/sessions/) - Session types, reference spaces, features, the camera rig, and starting and ending sessions.
- **Input**
  - [Input Sources](/user-manual/xr/input-sources/) - Controllers, hands, gaze and taps: rays, selects and squeezes.
  - [Controllers](/user-manual/xr/controllers/) - Controller models, poses, buttons, thumbsticks, haptics and velocity.
  - [Hand Tracking](/user-manual/xr/hand-tracking/) - Joints, fingers, hand models and gestures.
  - [Pointing and Grabbing](/user-manual/xr/pointing-and-grabbing/) - Picking, grabbing and throwing objects, and pressing with a finger.
- [Locomotion](/user-manual/xr/locomotion/) - Teleporting, moving and turning, moving the world, and comfort.
- **AR**
  - [AR](/user-manual/xr/ar/) - Starting AR sessions, the real world and the camera rig, and handheld and headset AR.
  - [Hit Testing](/user-manual/xr/ar/hit-testing/) - Finding real-world surfaces along a ray, and placing objects on them.
  - [Anchors](/user-manual/xr/ar/anchors/) - Keeping objects in place in the real world, within and across sessions.
  - [Plane Detection](/user-manual/xr/ar/plane-detection/) - Floors, walls, tables and other flat surfaces.
  - [Mesh Detection](/user-manual/xr/ar/mesh-detection/) - Meshes of the room and the objects in it.
  - [Depth Sensing](/user-manual/xr/ar/depth-sensing/) - The distance to real-world surfaces at each pixel.
  - [Light Estimation](/user-manual/xr/ar/light-estimation/) - Lighting virtual objects like the room around them.
  - [Camera Access](/user-manual/xr/ar/camera-color/) - The image from the device's camera.
  - [Image Tracking](/user-manual/xr/ar/image-tracking/) - Following printed images.
  - [DOM Overlay](/user-manual/xr/ar/dom-overlay/) - HTML interfaces over handheld AR.
  - [Third-Party Frameworks](/user-manual/xr/ar/third-party-frameworks/) - AR on browsers without WebXR.
- [Performance](/user-manual/xr/optimizing-webxr/) - Resolution, foveation, frame rate and rendering cost.
- [Testing and Debugging](/user-manual/xr/testing/) - Emulators, running on devices and debugging remotely.
- [Platforms](/user-manual/xr/platforms/) - Devices and browsers, and the features each supports.
- [Troubleshooting](/user-manual/xr/troubleshooting/) - Common problems and their causes.

Interfaces in XR are covered in the User Interface section, in [UI in XR](/user-manual/user-interface/xr/).

## See Also

- [UI in XR](/user-manual/user-interface/xr/) - Panels, pointing and selecting, hands and the `XrMenu` script
- [XR in PlayCanvas React](/user-manual/react/guide/xr/) - The React guide to XR
- [XR Support in Web Components](/user-manual/web-components/xr/) - The Web Components guide to XR
- [WebXR Hello World](/tutorials/webxr-hello-world/), [WebXR VR Lab](/tutorials/webxr-vr-lab/) and the other WebXR tutorials - Editor projects to explore
- [XrManager](https://api.playcanvas.com/engine/classes/XrManager.html) - The API reference for `app.xr`

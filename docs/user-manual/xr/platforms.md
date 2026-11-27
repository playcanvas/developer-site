---
title: Platforms
description: "Which headsets, phones and browsers run PlayCanvas XR applications through WebXR: VR and AR support, hand tracking, the AR features of each device, WebXR with WebGPU, and devices without WebXR."
---

A PlayCanvas XR application runs wherever the browser supports WebXR. Which session types and [features](/user-manual/xr/#features) it gets depends on the device and its browser, and browsers add features often. This page lists the main platforms, as their makers document them in November 2026. Always check availability in your code, as described in [Sessions](/user-manual/xr/sessions/#checking-availability), rather than relying on a list.

## Devices and Browsers {#devices-and-browsers}

| Platform | Browser | VR | AR | Hands |
| --- | --- | --- | --- | --- |
| Meta Quest 3, 3S, 2 and Pro | Meta Quest Browser | ✅ | ✅ | ✅ |
| Apple Vision Pro | Safari | ✅ | ❌ | ✅ |
| Android XR headsets, such as the Samsung Galaxy XR | Chrome | ✅ | ✅ | ✅ |
| Android phones and tablets with Google Play Services for AR | Chrome | ✅ | ✅ | ❌ |
| PC VR headsets, through an OpenXR runtime such as SteamVR or Meta Quest Link | Chrome and Edge on Windows | ✅ | ❌ | ✅ |
| Pico 4 Ultra | Pico Browser | ✅ | ✅ | ✅ |
| Magic Leap 2 | Magic Leap's browser | ✅ | ✅ | ✅ |

On an Apple Vision Pro, the user's main input is gaze and pinch: they look at something and pinch to select it. Each pinch is a short-lived input source with a ray along their gaze. On an Android phone, VR is the split-screen view for phone holders such as Google Cardboard, and AR input is taps on the screen. See [Input Sources](/user-manual/xr/input-sources/).

Magic Leap has discontinued the Magic Leap 2. Its support ends with 2027, and Magic Leap says the devices will keep working after that.

## AR Features {#ar-features}

The AR features that each platform's maker documents:

| Feature | Meta Quest | Android XR | Android phones |
| --- | --- | --- | --- |
| [Hit Testing](/user-manual/xr/ar/hit-testing/) | ✅ | ✅ | ✅ |
| [Anchors](/user-manual/xr/ar/anchors/) | ✅ | ✅ | ✅ |
| [Persistent anchors](/user-manual/xr/ar/anchors/#persistence) | ✅ | ❌ | ❌ |
| [Plane Detection](/user-manual/xr/ar/plane-detection/) | ✅ | ✅ | ✅ |
| [Mesh Detection](/user-manual/xr/ar/mesh-detection/) | Quest 3 and 3S | Behind a flag | ❌ |
| [Depth Sensing](/user-manual/xr/ar/depth-sensing/) | Quest 3 and 3S | ✅ | ✅ |
| [Light Estimation](/user-manual/xr/ar/light-estimation/) | | ✅ | ✅ |
| [Camera Access](/user-manual/xr/ar/camera-color/) | ❌ | | ✅ |
| [DOM Overlay](/user-manual/xr/ar/dom-overlay/) | | | ✅ |
| [Image Tracking](/user-manual/xr/ar/image-tracking/) | | | Behind a flag |

An empty cell is a feature that the platform's maker doesn't document. A page on a Meta Quest can't read the headset's camera images through WebXR.

Pico documents hit testing, anchors and plane detection for PICO OS 6, its next system software, which the Pico 4 Ultra doesn't run. Magic Leap documents hit testing, plane detection and camera access for the Magic Leap 2.

## WebXR with WebGPU {#webxr-with-webgpu}

An application whose graphics device uses WebGPU can only start a session in a browser that supports WebXR with WebGPU:

| Browser | WebXR with WebGPU |
| --- | --- |
| Meta Quest Browser | From version 156 |
| Safari on Apple Vision Pro | From Safari 26.2 |
| Chrome on Windows and Android | Behind the `webxr-webgpu-binding` flag |

Everywhere else, use WebGL 2. See [Choosing a Graphics Device](/user-manual/xr/using-webxr/#choosing-a-graphics-device).

## Without WebXR {#without-webxr}

Safari and every other browser on iPhone and iPad have no WebXR, so PlayCanvas applications can't start VR or AR sessions there. For AR on iOS, see the [AR](/user-manual/xr/ar/) section. Safari on the Mac and Firefox have no WebXR either.

A page should still work on these devices: hide the button that enters XR, as the example in [Getting Started](/user-manual/xr/using-webxr/#your-first-vr-scene) does, and offer the scene on the screen instead.

## See Also

- [Testing and Debugging](/user-manual/xr/testing/) - Testing on devices, and without one
- [Can I use WebXR](https://caniuse.com/webxr) - Browser support for the WebXR Device API
- [Meta Quest Browser](https://developers.meta.com/horizon/documentation/web/), [Android XR](https://developer.android.com/develop/xr/develop-with-webxr), [Apple WebKit](https://webkit.org/blog/) and [Google ARCore](https://developers.google.com/ar/develop/webxr/requirements) - Each maker's WebXR documentation and release notes

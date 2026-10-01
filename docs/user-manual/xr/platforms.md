---
title: Platforms
description: "Where WebXR applications made with PlayCanvas run: headsets, phones and PC VR, their browsers, VR and AR support, input and AR features, graphics backends, and detecting features at runtime."
---

WebXR runs in the browsers of most headsets, in Chrome on Android phones, and in desktop browsers with PC VR headsets. What each offers differs, and changes with every browser release, so detect features at runtime, as the pages of this section show, rather than by device.

## Devices and Browsers {#devices-and-browsers}

| Platform | Browser | VR | AR | Input |
| --- | --- | :-: | :-: | --- |
| Meta Quest | Meta Quest Browser | ✅ | ✅ | Controllers, hands |
| Android XR headsets | Chrome | ✅ | ✅ | Hands, controllers |
| Apple Vision Pro | Safari, from visionOS 2 | ✅ | ❌ | Gaze and pinch, hands |
| Android phones | Chrome, on [ARCore devices](https://developers.google.com/ar/devices) | | ✅ | Screen taps |
| PC VR headsets | Chrome and Edge on Windows | ✅ | ❌ | Controllers |
| iPhone and iPad | Safari | ❌ | ❌ | |

Phones are for AR, and headsets for VR and AR. Other headsets, such as those from Pico, support WebXR in their own browsers too. For AR on iPhone and iPad, see [Third-Party Frameworks](/user-manual/xr/ar/third-party-frameworks/).

## Features {#features}

The AR features available on each platform, as their vendors document them:

| Feature | Meta Quest | Android XR | Android phones |
| --- | :-: | :-: | :-: |
| [Hit testing](/user-manual/xr/ar/hit-testing/) | ✅ | ✅ | ✅ |
| [Anchors](/user-manual/xr/ar/anchors/) | ✅ | ✅ | ✅ |
| [Persistent anchors](/user-manual/xr/ar/anchors/#persistence) | ✅ | | |
| [Plane detection](/user-manual/xr/ar/plane-detection/) | ✅ | | Behind a flag |
| [Mesh detection](/user-manual/xr/ar/mesh-detection/) | ✅ | | |
| [Depth sensing](/user-manual/xr/ar/depth-sensing/) | ✅ | ✅ | ✅ |
| [Light estimation](/user-manual/xr/ar/light-estimation/) | | ✅ | ✅ |
| [Camera access](/user-manual/xr/ar/camera-color/) | | | ✅ |
| [Image tracking](/user-manual/xr/ar/image-tracking/) | | | Behind a flag |
| [DOM overlay](/user-manual/xr/ar/dom-overlay/) | | | ✅ |

[Hand tracking](/user-manual/xr/hand-tracking/) is available on Meta Quest, Android XR and Apple Vision Pro. On Apple Vision Pro, the user is asked for permission when the session starts, and a pinch arrives as a separate gaze-and-pinch input source. See [Input Sources](/user-manual/xr/input-sources/#hands-controllers-and-transient-input).

Some notes on particular devices:

- **Meta Quest** shows the room in color through passthrough on Quest 3, 3S and Pro, and in grayscale on Quest 2. Planes and meshes come from the room the user has set up, and the device reserves some hand gestures, such as a pinch with the palm facing the user, for its system menu. A site can persist up to 8 anchors.
- **Android XR** headsets use the user's hands as their main input, and report depth for each eye.
- **Android phones** need Google Play Services for AR. Plane detection and image tracking are experimental in Chrome, behind the `chrome://flags/#webxr-incubations` flag.

## Graphics Backends {#graphics-backends}

Every WebXR browser presents XR from WebGL 2. Presenting from WebGPU needs the browser's WebXR/WebGPU binding, `XRGPUBinding`. Safari on visionOS supports WebXR with WebGPU from Safari 26.2, and Chrome has it behind flags. Where a browser doesn't have it, the engine reports XR as unavailable on a WebGPU device. Choose the backend with `pc.XrManager.isDeviceSupported()` before you create the device, as [Getting Started](/user-manual/xr/using-webxr/#setting-up) shows.

## Detecting Features {#detecting-features}

- `app.xr.supported` says whether the browser has WebXR, and `app.xr.isAvailable()` whether a session type can start. See [Sessions](/user-manual/xr/sessions/#checking-availability).
- The `supported` property of each part of `app.xr` says whether the browser implements a feature, and its `available` property whether the running session has it. See [Session Features](/user-manual/xr/sessions/#session-features).
- Input sources come and go, and differ by device. Handle each one by what it has. See [Input Sources](/user-manual/xr/input-sources/#hands-controllers-and-transient-input).

## See Also

- [Testing and Debugging](/user-manual/xr/testing/) - Running and debugging on devices, and emulating them
- [Develop for the web on Android XR](https://developer.android.com/develop/xr/web) - Google's guide to WebXR on Android XR
- [WebXR on Meta Quest](https://developers.meta.com/horizon/documentation/web/webxr-overview) - Meta's guide to WebXR in the Meta Quest Browser
- [Can I use WebXR](https://caniuse.com/webxr) - Browser support for the WebXR Device API

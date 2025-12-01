---
title: XR
---

![VR View](/img/user-manual/xr/vr-view.png)

PlayCanvas lets you create [AR](/user-manual/xr/ar/) (Augmented Reality) and [VR](/user-manual/xr/vr/) (Virtual Reality) applications for a variety of devices based on the new WebXR API, as well as through external integrations.

## Capabilities

Through extensions, WebXR is ever growing and various platforms are constantly implementing new and existing WebXR Modules. The PlayCanvas Engine provides access to these modules in the form of integrations, so they are easier to work with and work nicely with PlayCanvas' systems.

You can check a [list of currently supported modules](/user-manual/xr/capabilities/).

## Platforms

WebXR is a new API and it is being rolled out gradually to all major platforms. Up-to-date support can be checked on [caniuse.com](https://caniuse.com/webxr).

Additionally, support can be achieved with the [WebXR Polyfill](https://github.com/immersive-web/webxr-polyfill).

On **mobile**, WebXR works on Android with VR and AR session types.

On **HMDs**, such as Meta Quest, WebXR is well-supported for VR and AR session types. Apple Vision Pro currently supports VR session types when enabled in Safari settings.

On **desktop**, WebXR currently works in Chrome and Edge, and devices are linked through various native APIs, such as SteamVR, OpenXR, and others. This covers the majority of desktop-based VR devices and allows devices such as Meta Quest to be used via Steam Link.

## Testing WebXR without an XR Device

You do not need to have XR hardware to start developing with WebXR. You can install the [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) Chrome extension which emulates the WebXR API. It allows you to simulate various head-mounted displays and controllers via the browser's Dev Tools.

:::danger

Do not use the [WebXR API Emulator](https://chromewebstore.google.com/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje) Chrome extension. It is not compatible with PlayCanvas. PlayCanvas applications will throw an exception if it is active.

:::

## Getting Started with WebXR

To start an XR session, support and availability should be checked first. Then, on a user interaction, a session can be started:

```javascript
button.element.on('click', () => {
    // check if XR is supported and VR is available
    if (app.xr.supported && app.xr.isAvailable(pc.XRTYPE_VR)) {
        // start VR session providing a camera component
        app.xr.start(entity.camera, pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR);
    }
});
```

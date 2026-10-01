---
title: Third-Party Frameworks
description: "AR in browsers without WebXR, such as Safari on iPhone, with PlayCanvas: JavaScript tracking frameworks, Zappar's Universal AR for PlayCanvas, and the status of 8th Wall, now open source after its hosted platform closed."
---

WebXR AR is not available in every browser. Safari on iPhone and iPad doesn't support it, for one. Third-party frameworks bring AR to those browsers by tracking the camera image in JavaScript and WebAssembly, and drive a PlayCanvas camera from what they track. They also offer kinds of tracking that WebXR doesn't, such as faces.

These frameworks are separate products, with their own licenses and terms. They replace the engine's XR support rather than add to it: a framework runs its own camera and tracking, and none of the `app.xr` features apply.

## Zappar Universal AR {#zappar-universal-ar}

[Zappar's Universal AR for PlayCanvas](https://zap.works/universal-ar/playcanvas/) tracks images, faces and the world around the user (instant world tracking), in Safari on iOS 11.3 and later, Chrome for Android, and most other mobile browsers. It works in the Editor: fork Zappar's [starter project](https://playcanvas.com/user/zappar), and drag one of its tracking templates into your scene. See Zappar's [documentation](https://docs.zap.works/universal-ar/playcanvas/) to get started.

Publishing a Universal AR project needs a ZapWorks plan. Zappar's [licensing](https://docs.zap.works/universal-ar/general/licensing/) and [pricing](https://zap.works/pricing/) pages describe the terms.

## 8th Wall {#8th-wall}

8th Wall's hosted platform closed to developers on 28 February 2026. Projects published on it keep running until 28 February 2027, and can no longer be edited. Its tracking is now available at [8thwall.org](https://8thwall.org/), free of charge: the framework is open source under the MIT license, and the world tracking engine is a binary under its own license. Its documentation describes a PlayCanvas integration, through the `XR8.PlayCanvas` API and the starter projects on [8th Wall's PlayCanvas account](https://playcanvas.com/user/the8thwall), which were built for the hosted platform. Check the open-source project's [documentation](https://8thwall.org/docs/engine) for its current state before you start a new project with it.

## See Also

- [AR](/user-manual/xr/ar/) - WebXR AR with the engine
- [Platforms](/user-manual/xr/platforms/) - Which browsers offer WebXR AR

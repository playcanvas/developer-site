---
title: Camera Access
description: "AR camera access in PlayCanvas: requesting the camera image in an AR session, checking that the session has it, the color texture of each view, and using the camera image in materials and effects."
---

Camera access gives your application the image the device's camera sees, as a texture, every frame. Use it for effects that work on the real world, such as reflections of the room on virtual objects, glass that refracts the scene behind it, or image processing.

<EngineExample id="xr/ar-camera-color" title="AR Camera Color" />

## Requesting Camera Access {#requesting-camera-access}

Ask for camera access when you start an AR session. The browser asks the user's permission to use the camera:

```javascript
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    cameraColor: true
});
```

`app.xr.views.supportedColor` is `true` when the browser can give the image to the engine's graphics device, and `app.xr.views.availableColor` is `true` once a session has camera access. Camera access is mostly offered by phones. Meta Quest Browser doesn't support it, although pages can read the headset's cameras as ordinary video with [`getUserMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia), which isn't aligned with the views.

## The Camera Texture {#the-camera-texture}

The session's views appear during its first frames, rather than when it starts. Each view's `textureColor` is the camera image for that view, updated every frame, or `null` without camera access. On a phone, there is one view:

```javascript
app.xr.views.on('add', (view) => {
    if (!view.textureColor) return;

    // Show the camera image on a material
    material.emissiveMap = view.textureColor;
    material.update();
});
```

The texture is the size of the camera image, in RGB, and lines up with the view: the pixel at a point in the texture is what the camera sees at the same point of the view. The engine destroys a view's texture when the session ends, so stop using it then:

```javascript
app.xr.on('end', () => {
    material.emissiveMap = null;
    material.update();
});
```

Copying the camera image costs time every frame, so request camera access only when you use it.

## See Also

- [Depth Sensing](/user-manual/xr/ar/depth-sensing/) - The distance to the real world at each pixel
- [AR](/user-manual/xr/ar/) - Starting AR sessions and requesting features
- [XrView](https://api.playcanvas.com/engine/classes/XrView.html) - The API reference for views

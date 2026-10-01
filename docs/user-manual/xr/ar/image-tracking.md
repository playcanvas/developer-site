---
title: Image Tracking
description: "AR image tracking in PlayCanvas: providing reference images and their real-world widths before a session, checking which images can be tracked, following the pose of tracked images, handling lost tracking, and choosing images that track well."
---

Image tracking follows printed images in the real world, such as a poster, a product's packaging or a card, and gives you each one's position and rotation. Attach content to an image to bring it to life.

Image tracking is an experimental WebXR module. Chrome on Android implements it, behind the `chrome://flags/#webxr-incubations` flag, so it suits prototypes and installations where you control the device, rather than public applications.

## Adding Images {#adding-images}

Add the images to track before the session starts, with the width of each in the real world, in meters. Images can be any image the browser can decode, as an `HTMLImageElement`, an `ImageBitmap`, a canvas or a `Blob`:

```javascript
const image = new Image();
image.src = 'poster.jpg';
await image.decode();

// A poster 40 cm wide
const poster = app.xr.imageTracking.add(image, 0.4);
```

`add()` returns an [`XrTrackedImage`](https://api.playcanvas.com/engine/classes/XrTrackedImage.html), or `null` if the browser doesn't support image tracking or a session is running. `app.xr.imageTracking.remove()` removes an image, also only between sessions. Then request image tracking when you start an AR session:

```javascript
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    imageTracking: true
});
```

## Trackable Images {#trackable-images}

When the session starts, the device examines each image. `app.xr.imageTracking.available` becomes `true` once it has, and each image's `trackable` property says whether the device can track it. An image can be untrackable if it is too small, has too few features, or is too uniform. If the device can't process the images at all, `app.xr.imageTracking` fires `error`:

```javascript
app.xr.imageTracking.on('error', (err) => {
    console.warn(`Image tracking failed: ${err.message}`);
});
```

Images track best when they:

- Are at least 300 × 300 pixels. Larger images don't track better, and take longer to load.
- Have plenty of detail and contrast, and no large plain areas or repeating patterns.
- Match the printed image closely. Color doesn't matter, so grayscale images load faster.
- Have the right width: the device uses it to work out how far away the image is.

## Following Images {#following-images}

An image fires `tracked` when the device starts tracking it, and `untracked` when it stops, and its `tracking` is `true` in between. Its `getPosition()` and `getRotation()` return the pose of its center in [tracking space](/user-manual/xr/ar/#the-real-world-and-the-rig). Follow it every frame while it is tracked:

```javascript
// A model standing on the poster, as a child of the camera rig
const model = new pc.Entity('model');
model.addComponent('render', { type: 'box' });
model.setLocalScale(0.1, 0.1, 0.1);
model.enabled = false;
rig.addChild(model);

poster.on('tracked', () => {
    model.enabled = true;
});
poster.on('untracked', () => {
    model.enabled = false;
});

app.on('update', () => {
    if (poster.tracking) {
        model.setLocalPosition(poster.getPosition());
        model.setLocalRotation(poster.getRotation());
    }
});
```

While the camera can't see an image, the device may keep reporting it where it last saw it, assuming it hasn't moved. Its `emulated` property is then `true`. Keep content on an emulated image if the image is fixed, such as a poster, and hide it if the image can be moved, such as a card.

## See Also

- [AR](/user-manual/xr/ar/) - Starting AR sessions, and placing content relative to the camera rig
- [WebXR: AR Image Tracking](/tutorials/webxr-ar-image-tracking/) - Tutorial with an Editor project
- [XrImageTracking](https://api.playcanvas.com/engine/classes/XrImageTracking.html) - The API reference for `app.xr.imageTracking`

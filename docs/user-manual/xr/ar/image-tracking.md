---
title: Image Tracking
---

Image Tracking provides the ability to track real-world images using the provided image samples and their estimated size. The underlying CV system will estimate image position and orientation and tracking status.

## Support

You can check if image tracking is supported by the system:

```javascript
if (app.xr.imageTracking.supported) {
    // image tracking are supported
}

app.xr.on('start', () => {
    if (app.xr.imageTracking.available) {
        // image tracking is supported and available
        // it can still be false if images were not provided
    }
});
```

## Images

Images are provided **before the session starts** with their real-world width (in meters). Images can be in any web-friendly format and should match real-world images as closely as possible.

**The resolution** should be at least 300x300 pixels. High resolution does **not** improve tracking performance and/or reliability.

**The color** is irrelevant, so for download size optimization, grayscale images are preferred.

**Repeating patterns** or too many geometric features will reduce tracking reliability.

## Add/Remove Tracked Images

You can modify the list of tracked images only when the XR session is not running.

Adding an image to the tracking list:

```javascript
// image that is 20cm wide (0.2m)
const trackedImage = app.xr.imageTracking.add(image, 0.2);
```

Removing a tracked image:

```javascript
app.xr.imageTracking.remove(trackedImage);
```

And you can access a list of tracked images like so:

```javascript
const trackedImages = app.xr.imageTracking.images;
for (let i = 0; i < trackedImages.length; i++) {
    const trackedImage = trackedImages[i];
}
```

## Position & Rotation

A tracked image's position and rotation (in world-space) are updated automatically and you can access the most recent information like so:

```javascript
const position = trackedImage.getPosition();
const rotation = trackedImage.getRotation();
```

## Reliability

Image Tracking is implemented using Computer Vision techniques that are running over the camera feed, which is subject to noise, unstable illumination, view angle, occlusion, motion blur, and more aspects of reality. The underlying system provides some details about its tracking state.

Check if the image is trackable in the first place:

```javascript
if (!trackedImage.trackable) {
    // it could be too small, or the underlying system is unable to parse the image
}
```

When a session starts, if the underlying system is unable to use some images, the relevant error messages will be passed:

```javascript
app.xr.imageTracking.on('error', (err) => {
    console.warn(err.message);
});
```

## Tracking State

You can check if an image is actively tracked right now:

```javascript
if (trackedImage.tracking) {
    // actively tracked
}
```

When tracking becomes unavailable, an image's position and rotation will be emulated, assuming that the real-world image has not been moved:

```javascript
if (trackedImage.emulated) {
    // position and rotation is emulated
    // based on previously known tracking information
}
```

It is possible to subscribe to events to know when an image becomes tracked or loses active tracking:

```javascript
trackedImage.on('tracked', () => {
    // image is now actively tracked
});

trackedImage.on('untracked', () => {
    // image is no longed actively tracked
});
```

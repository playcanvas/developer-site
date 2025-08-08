---
title: Using WebXR in PlayCanvas
---

## Support

Browser support for WebXR is not (yet) universal. It can be checked as follows:

```javascript
if (app.xr.supported) {
    // WebXR is supported
}
```

## Starting an XR Session

To start XR session, you can use method on the Camera Component or [XrManager][2] on the Application. To start an XR session, you need to provide CameraComponent and provide the type of XR session, reference space, and optional object with additional arguments:

```javascript
app.xr.start(entity.camera, pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR);
```

It is an asynchronous operation and is only possible to start on a user interaction, such as a button click, mouse click, or touch:

```javascript
button.on('click', () => {
    // start XR session
});
```

To know when a session is started, you can subscribe to the `start` event:

```javascript
app.xr.on('start', () => {
    // XR session has started
});
```

Session type or reference space might not be available on a particular platform, so it will fail to start the session, providing an error in a callback and firing the `error` event on XrManager:

```javascript
entity.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_UNBOUNDED, {
    callback: (err) => {
        if (err) {
            // failed to start session
        }
    }
});
```

## Ending an XR Session

Exiting XR can be triggered in various ways. You can trigger an exit of XR from code:

```javascript
app.xr.end();
```

Also, the user might exit XR via some external process like the back button in the browser. [XrManager][2] will fire events associated with the session `end`:

```javascript
app.xr.on('end', () => {
    // XR session has ended
});
```

## Session Types

Each platform can support different types of sessions. These are:

- **VR** (Virtual Reality) - Provides some level of viewer tracking and it provides exclusive access to XR Device. This means that the application will be rendered onto a device's frame buffer and not the HTML canvas element.
- **AR** (Augmented Reality) - This type of session provides exclusive access to the XR Device and content is meant to be blended with the real-world environment. In this mode, the camera's clear color should be transparent.

The availability of a session type can change during an application's lifetime, based on devices being plugged in or features on devices being enabled. To check if a session type is available do:

```javascript
if (app.xr.isAvailable(pc.XRTYPE_VR)) {
    // VR is available
}
```

You can subscribe to availability change events too:

```javascript
app.xr.on('available', (type, available) => {
    console.log('XR session', type, 'type is now', available ? 'available' : 'unavailable');
});

// or specific session type
app.xr.on('available:' + pc.XRTYPE_VR, (available) => {
    console.log('XR session VR type is now', available ? 'available' : 'unavailable');
});
```

## Camera Position and Orientation

When you are presenting in XR, the position and orientation of the camera are overwritten by data from the XR session. If you want to implement additional movement and rotation of the camera, you should add a parent entity to your camera and apply your manipulations to that entity.

![Camera Offset](/img/user-manual/xr/using-webxr/camera-offset.jpg)

Position, orientation and rays of different XR objects: input sources, tracked meshes, tracked planes, tracked images, and others, are provided in world space.

## Why can't I enable XR mode automatically?

Entering WebXR is required by browsers to be triggered by a *user action*. That means that it must be in response to a key press, a mouse click or a touch event. For that reason, there is no way to enter XR immediately on loading a page.

[2]: https://api.playcanvas.com/engine/classes/XrManager.html

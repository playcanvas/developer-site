---
title: Input Sources
sidebar_position: 5
---

An [XrInputSource][1] represents an input mechanism that allows the user to interact with a virtual world. Those include but are not limited to handheld controllers, optically tracked hands, gaze-based input methods, and touch screens. However, an input source is not explicitly associated with traditional gamepads, mice or keyboards.

## Accessing Input Sources

A list of input sources is available on the [XrInput][2] manager which is created by the [XrManager][3]:

```javascript
const inputSources = app.xr.input.inputSources;
for (let i = 0; i < inputSources.length; i++) {
    // iterate through available input sources
}
```

Input sources can be added and removed dynamically. This can be done by connecting physical devices or by switching input devices by the underlying platform, and some input sources are transient - and have a lifespan only during their primary action (e.g. touch screen tap in an AR session on mobile). You can subscribe to `add` and `remove` events:

```javascript
app.xr.input.on('add', function (inputSource) {
    // input source been added

    inputSource.once('remove', function () {
        // know when input source has been removed
    });
});
```

## Primary Action (select)

Each input source can have a primary action `select`. For controllers, it is a primary button/trigger. For the touch-screen, it is a tap. For hands, it is a pinch of thumb and index fingers. There are also `selectstart` and `selectend` events which you can subscribe to as follows:

```javascript
inputSource.on('select', function () {
    // primary action
});
```

Or through the input manager:

```javascript
app.xr.input.on('select', function (inputSource) {
    // primary action
});
```

## Ray

Each input source has a ray which has an origin where it points from and a direction in which it is pointing. A ray is transformed into world space. Some examples of input sources might be, but are not limited to:

 * **Controllers** (e.g. Meta Quest Touch), will have a ray originating from the tip of the handheld device and the direction is based on the rotation of the device.
 * **Hands** have a ray that originates from a point between the thumb and index tips and points forward. If the underlying system does not provide a ray for hands, the PlayCanvas engine will emulate it. So all hands should have a ray.
 * **Screen**-based input. This might be available on mobile devices (mono screen) in AR session types, where the user can interact with the virtual world via a touch screen.
 * **Gaze**-based input, such as a mobile phone is inserted into a Google Cardboard style device. It will have an input source with `targetRayMode` set to `pc.XRTARGETRAY_GAZE`, and will originate from the viewer's position and point straight where the user is facing.

Here is an example illustrating how to check whether a ray has intersected with the bounding box of a mesh:

```javascript
// set ray with input source data
ray.set(inputSource.getOrigin(), inputSource.getDirection());

// check if mesh bounding box intersects with ray
if (meshInstance.aabb.intersectsRay(ray)) {
    // input source is pointing at a mesh
}
```

## Grip

Some input sources are associated with a physical handheld device, such as a Meta Quest Touch, and can have position and rotation. Their position and rotation are provided in world space.

This can be used to render a virtual controller that matches real-world controller position and rotation.

```javascript
if (inputSource.grip) {
    // can render device model
    // position and rotate associated entity with model
    entity.setPosition(inputSource.getPosition());
    entity.setRotation(inputSource.getRotation());
}
```

## GamePad

If the platform supports the [WebXR Gamepads Module][4], then an input source might have an associated [GamePad][5] object with it, which provides access to its buttons, triggers, axes and other input hardware states:

```javascript
const gamepad = inputSource.gamepad;
if (gamepad) {
    if (gamepad.buttons[0] && gamepad.buttons[0].pressed) {
        // user pressed a button on a gamepad
    }
}
```

## Hands

Check out the dedicated page for [Hand Tracking][7].

## Profiles

Each input source might have a list of strings describing a type of input source, which is described in a [profile registry][6]. Based on this, you can figure out what type of model to render for a handheld device or what capabilities it might have. Additionally, the profile registry lists gamepad mapping details, such as buttons and axes.

```javascript
if (inputSource.profiles.includes('oculus-touch-v2')) {
    // it is an Oculus Touch™ handheld device
}
```

[1]: https://api.playcanvas.com/classes/Engine.XrInputSource.html
[2]: https://api.playcanvas.com/classes/Engine.XrInput.html
[3]: https://api.playcanvas.com/classes/Engine.XrManager.html
[4]: https://www.w3.org/TR/webxr-gamepads-module-1/
[5]: https://w3c.github.io/gamepad/
[6]: https://github.com/immersive-web/webxr-input-profiles/tree/master/packages/registry
[7]: /user-manual/xr/hand-tracking/
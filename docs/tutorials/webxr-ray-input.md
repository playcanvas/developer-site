---
title: WebXR UI Interaction
tags: [vr, ar, input, ui]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/460449/314C07-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/TAYVQgU2/" title="WebXR UI Interaction" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*Click the VR/AR button if you have a VR/AR compatible device/headset.*

This is a WebXR experience that provides interaction between UI and XR input source, such as: laser pointer; gaze; touch screen. Supports desktop, mobile, Oculus Browser, Google Cardboard™, Google Daydream™, Samsung Gear VR™ and other VR/AR headsets.

Let's have a look at the source of the [tutorial project][1].

## Entering VR/AR

Every WebXR experience on PlayCanvas will always have these two elements in some form:

* Adding a user interaction for the user to enter VR/AR
* Enabling VR/AR on the camera

```javascript
button.element.on('click', function() {
    // check support for VR
    if (app.xr.isAvailable(pc.XRTYPE_VR)) {
        // start VR session
        cameraEntity.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR);
    }
});
```

In this project, we have `xr.js` which is added to the Root entity. It manages VR and AR UI buttons, reacts to XR availability changes and XR session state changes.

To read more about the direct PlayCanvas API for WebXR, please refer to the [User Manual][2].

## XR Input Types

The level of fidelity for input devices can be broken into the following groups (DOF == Degrees of Freedom):

* **Gaze** - The default type which has no position and orientation of its own, and is based on the orientation of the head mounted display. Simply put - it is always facing forwards in the direction the user is facing. These include mobile-based VR devices such as Google Cardboard™ and Samsung Gear VR™.
* **Screen** - Touch based input source, which is possible in AR. For example, on mobile devices with touch screens.
* **Tracked Pointer** - Input source which has a tracked rotation and an optionally tracked position in space. This is usually a grippable device, and is associated with hands, either as hand controllers or tracked hands itself. This can be: Google Daydream™, Gear VR™ Controller, Oculus Touch™, Vive™ controllers and many others.

Every input source has a ray with an origin where it starts and a direction in which it is pointing. WebXR input source implementation in PlayCanvas supports all input source types without any extra work from a developer. If an input source is grippable, then we can render its model based on the provided position and rotation.

### Input Sources

The system for the tracked input sources consists of two files:

#### `controllers.js`

This tracks added input sources using [XrInput][4] and makes instances of controller entities for them. For example:

```javascript
app.xr.input.on('add', function (inputSource) {
    // new input source is added
});
```

#### `controller.js`

This is attached to each entity that represents an input source and has the original [XrInputSource][5] associated with it. When an input source can be gripped, it will enable the child entity for the visual model for a controller.

On each update, it will position and rotate the entity based on the input source position and rotation:

```javascript
if (inputSource.grip) {
    this.visualEntity.enabled = true;
    this.entity.setPosition(this.inputSource.getPosition());
    this.entity.setRotation(this.inputSource.getRotation());
}
```

## UI

3D UI is created using [Button][6] and [Element][7] components. Using a combination of both, we can create interactive buttons in 3D space.

Creating a 3D UI for an XR environment is exactly the same as creating a 3D UI for mouse/touch interaction in a non-XR environment. Read more on creating [User Interfaces][3].

By default, each XrInputSource has an `elementInput` property enabled. This means it will interact with Button components just like mouse or touch input, but using its associated 3D ray. Each input source has a ray that has an [origin][8] and a [direction][9]. In this tutorial, we visualize an input source's ray:

```javascript
// set starting point of ray
vecA.copy(inputSource.getOrigin());
// set end point of ray
vecB.copy(inputSource.getDirection());
vecB.scale(1000).add(vecA);
// render line between those two points
app.renderLine(vecA, vecB, color);
```

## UI Interaction

In this tutorial, we have two types of buttons: Rotate (button-rotate.js) and Color (button-color.js) buttons. When rotate button is [clicked][10], it will set the rotation speed of a cube:

```javascript
entity.button.on('click', function() {
    targetEntity.script.cube.rotateSpeed = rotateSpeed;
});
```

When the color button is clicked, we change the diffuse color of each mesh instance of a cube model.

This UI interaction is agnostic to input source: either it originates from VR handheld devices; gaze input of mobile VR; on-screen touch in an AR environment; as well as classic mouse and touch. So creating truly multi-platform applications and testing is easy.

[1]: https://playcanvas.com/project/460449/overview/webvr-ray-input
[2]: /user-manual/xr/using-webxr/
[3]: /user-manual/user-interface/
[4]: https://api.playcanvas.com/engine/classes/XrInput.html
[5]: https://api.playcanvas.com/engine/classes/XrInputSource.html
[6]: https://api.playcanvas.com/engine/classes/ButtonComponent.html
[7]: https://api.playcanvas.com/engine/classes/ElementComponent.html
[8]: https://api.playcanvas.com/engine/classes/XrInputSource.html#getorigin
[9]: https://api.playcanvas.com/engine/classes/XrInputSource.html#getdirection
[10]: https://api.playcanvas.com/engine/classes/ButtonComponent.html#event:click

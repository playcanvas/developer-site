---
title: AR
description: "Augmented reality with WebXR in PlayCanvas: starting AR sessions on headsets and phones, making the camera see-through, the real-world features AR adds, placing content relative to the camera rig, and how handheld and headset AR differ."
---

In augmented reality, your scene appears in the user's surroundings. Headsets such as Meta Quest show the room through their passthrough cameras, and phones show it through their camera, with your scene drawn over it. AR sessions can do everything VR sessions can, and add features that describe the real world: where its surfaces are, how far away they are, and how it is lit.

![Virtual objects in a room seen in AR: a box on the coffee table, a lamp on the floor, and a ring marking where the center of the view meets the floor](/img/user-manual/xr/ar/ar.webp)

<EngineExample id="xr/ar-basic" title="AR Basic" />

## Starting an AR Session {#starting-an-ar-session}

Start an AR session as you would a VR session, with `pc.XRTYPE_AR` as its type. See [Sessions](/user-manual/xr/sessions/#starting-a-session). For the real world to show through, the camera must clear to a fully transparent color, and the skybox must not draw over it.

The [`XrSession`](/user-manual/xr/using-webxr/#your-first-vr-scene) script does both for every AR session, however it was started, and restores them when the session ends. With the script on the camera rig, fire `ar:start`:

```javascript
button.addEventListener('click', () => app.fire('ar:start'));
```

Without it, do the same yourself. While the `end` handlers run, `app.xr.type` is still the type of the session that ended:

```javascript
const skyLayer = app.scene.layers.getLayerById(pc.LAYERID_SKYBOX);
const clearColor = new pc.Color();

app.xr.on('start', () => {
    if (app.xr.type === pc.XRTYPE_AR) {
        clearColor.copy(camera.camera.clearColor);
        camera.camera.clearColor = new pc.Color(0, 0, 0, 0);
        skyLayer.enabled = false;
    }
});

app.xr.on('end', () => {
    if (app.xr.type === pc.XRTYPE_AR) {
        camera.camera.clearColor = clearColor;
        skyLayer.enabled = true;
    }
});
```

Anything else that covers the view, such as a model of a room or a large ground plane, hides the real world too. Leave it out of AR, for example by disabling its entities in the same handlers.

In React, `<Camera>` applies its props again each time it renders, which overrides the transparent clear color that `XrSession` sets. Make the prop transparent during AR sessions yourself, for example with `clearColor={inAr ? '#00000000' : '#1a1c21'}`, where `inAr` is state that you set in `start` and `end` handlers. The [React XR guide](/user-manual/react/guide/xr/)'s example does this.

## Real-World Features {#real-world-features}

AR sessions can describe the user's surroundings:

- [Hit Testing](/user-manual/xr/ar/hit-testing/) finds where a ray meets a real surface, to place objects on it.
- [Anchors](/user-manual/xr/ar/anchors/) keep objects fixed to the real world as the device's understanding of it improves, and can persist from one session to the next.
- [Plane Detection](/user-manual/xr/ar/plane-detection/) and [Mesh Detection](/user-manual/xr/ar/mesh-detection/) give you the geometry of floors, walls, tables and the other objects in the room.
- [Depth Sensing](/user-manual/xr/ar/depth-sensing/) measures the distance to the real world at each pixel, for occlusion and placement.
- [Light Estimation](/user-manual/xr/ar/light-estimation/) tells you where the real light comes from, and its color.
- [Camera Access](/user-manual/xr/ar/camera-color/) gives you the image from the device's camera.
- [Image Tracking](/user-manual/xr/ar/image-tracking/) follows printed images.
- [DOM Overlay](/user-manual/xr/ar/dom-overlay/) shows HTML over handheld AR.

Hit testing and light estimation are requested for every AR session. Request the others in the options of `startXr()`, as [Sessions](/user-manual/xr/sessions/#session-features) shows, and check that the session got them. Which features a device offers varies widely: see [Platforms](/user-manual/xr/platforms/).

## The Real World and the Rig {#the-real-world-and-the-rig}

The poses of hit test results, anchors, planes, meshes and tracked images are in the session's tracking space, relative to the [camera rig](/user-manual/xr/sessions/#the-camera-and-its-rig), as the camera's local pose is. To line up with the real world wherever the rig is, add the entities that follow them as children of the rig, and set their local position and rotation:

```javascript
// A marker that sits on the real surface a hit test finds
const marker = new pc.Entity('marker');
marker.addComponent('render', { type: 'cylinder' });
marker.setLocalScale(0.2, 0.01, 0.2);
rig.addChild(marker);

hitTestSource.on('result', (position, rotation) => {
    marker.setLocalPosition(position);
    marker.setLocalRotation(rotation);
});
```

When the rig is at the origin, unrotated and unscaled, local and world space are the same, and children of the scene's root work too. `XrSession` moves the rig when a session starts, to the floor below where the camera was, so with it, use the rig.

## Handheld and Headset AR {#handheld-and-headset-ar}

AR on a phone and AR on a headset differ in ways that shape an application:

| | Phone | Headset |
| --- | --- | --- |
| Views | One, which `app.xr.views` reports with the eye `pc.XREYE_NONE` | Two, one for each eye |
| Input | Taps on the screen, which are transient input sources with select events | Controllers and hands |
| Interface | HTML, with [DOM Overlay](/user-manual/xr/ar/dom-overlay/), or UI in the scene | [UI in the scene](/user-manual/user-interface/xr/) |
| Holding | The user holds the phone, often in one hand | The user's hands are free |

On a phone, keep interactions to taps, and place content where the user points the phone. On a headset, the user can walk around, reach out and touch, so place content within reach. The same session code serves both, as long as it handles the input sources each one sends.

## Frameworks for Other Browsers {#frameworks-for-other-browsers}

Some browsers, among them Safari on iPhone and iPad, don't offer WebXR AR. Third-party frameworks that track the camera image in JavaScript bring AR to them. See [Third-Party Frameworks](/user-manual/xr/ar/third-party-frameworks/).

## See Also

- [Sessions](/user-manual/xr/sessions/) - Starting sessions, and requesting features
- [Hit Testing](/user-manual/xr/ar/hit-testing/) - Placing objects on real surfaces, the usual first step
- [WebXR AR: Hit Test](/tutorials/webxr-ar-hit-test/) and the other WebXR AR tutorials - Editor projects to explore

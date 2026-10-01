---
title: Hit Testing
description: "AR hit testing in PlayCanvas: finding where a ray meets real-world surfaces, hit test sources and their results, a placement reticle from the center of the view, hit tests from screen taps, offset rays and entity types, placing objects, and anchoring them."
---

A hit test finds where a ray meets the real world, as the device understands it: a floor, a wall, a table. It is how most AR applications let users place things, and the hit point comes with a rotation that lies on the surface.

![A placement ring lying on the floor where the center of the view meets it, beside objects placed earlier](/img/user-manual/xr/ar/hit-testing/reticle.webp)

<EngineExample id="xr/ar-hit-test" title="AR Hit Test" />

## Availability {#availability}

The engine requests hit testing for every AR session. `app.xr.hitTest.supported` is `true` when the browser implements it, and `app.xr.hitTest.available` becomes `true`, firing `available`, once a session has it:

```javascript
app.xr.hitTest.on('available', () => {
    // Start hit testing
});
```

Hit testing works only in AR sessions, and only as well as the device understands the room. Devices that scan the room ahead of time, such as headsets that have been set up for mixed reality, have results straight away. Phones build their understanding from the camera as the user moves, so results appear once the user has looked around for a moment.

## Hit Test Sources {#hit-test-sources}

A hit test source casts a ray every frame, and reports where it hits. Start one with `app.xr.hitTest.start()`:

| Option | Description |
| --- | --- |
| `spaceType` | The space the ray is cast in. The default, `pc.XRSPACE_VIEWER`, casts from the camera, straight ahead |
| `offsetRay` | A [`pc.Ray`](https://api.playcanvas.com/engine/classes/Ray.html) relative to that space, for a ray other than straight ahead |
| `profile` | Instead of a space: hit test from transient input sources with this [profile](/user-manual/xr/input-sources/#profiles), such as screen taps |
| `entityTypes` | What the ray can hit: `pc.XRTRACKABLE_PLANE` (the default), `pc.XRTRACKABLE_POINT` or `pc.XRTRACKABLE_MESH`, as an array |
| `callback` | Called with an error, or with the new [`XrHitTestSource`](https://api.playcanvas.com/engine/classes/XrHitTestSource.html) |

Starting is asynchronous. Every frame in which the ray hits something, the source fires `result` with the position and rotation of the nearest hit, in [tracking space](/user-manual/xr/ar/#the-real-world-and-the-rig). It fires nothing in frames without a hit:

```javascript
app.xr.hitTest.start({
    callback: (err, hitTestSource) => {
        if (err) return;

        hitTestSource.on('result', (position, rotation, inputSource, hitTestResult) => {
            // The nearest hit this frame
        });
    }
});
```

The position and rotation are reused for every result, so copy them to keep them. The `hitTestResult` is the WebXR [`XRHitTestResult`](https://developer.mozilla.org/en-US/docs/Web/API/XRHitTestResult), which you can [anchor](#anchoring-placed-objects) to. `hitTestSource.remove()` stops a source, and every source stops when the session ends. `app.xr.hitTest` fires `result` for every source too, with the source as its first argument.

## A Placement Reticle {#a-placement-reticle}

A ring on the surface in the middle of the view shows users where an object will go. Cast from the viewer, and hide the ring in frames without a hit. Results arrive before your `update` handlers run, so a flag tells them apart:

```javascript
const reticle = new pc.Entity('reticle');
reticle.addComponent('render', { type: 'torus' });
reticle.setLocalScale(0.2, 0.2, 0.2);
rig.addChild(reticle);

let hitThisFrame = false;

app.xr.hitTest.on('available', () => {
    app.xr.hitTest.start({
        callback: (err, hitTestSource) => {
            if (err) return;
            hitTestSource.on('result', (position, rotation) => {
                reticle.setLocalPosition(position);
                reticle.setLocalRotation(rotation);
                hitThisFrame = true;
            });
        }
    });
});

app.on('update', () => {
    reticle.enabled = hitThisFrame;
    hitThisFrame = false;
});
```

The reticle is a child of the [camera rig](/user-manual/xr/sessions/#the-camera-and-its-rig), so its local pose is the hit's pose in tracking space.

## Placing Objects {#placing-objects}

Place an object at the reticle when the user selects, with a tap on a phone, or a trigger press or pinch on a headset:

```javascript
app.xr.input.on('select', () => {
    if (!reticle.enabled) return;

    const box = new pc.Entity('box');
    box.addComponent('render', { type: 'box' });
    box.setLocalScale(0.2, 0.2, 0.2);
    rig.addChild(box);

    // Stand it on the surface: the hit's up axis is the surface's normal
    box.setLocalPosition(reticle.getLocalPosition());
    box.setLocalRotation(reticle.getLocalRotation());
    box.translateLocal(0, 0.1, 0);
});
```

## Hit Tests from Taps {#hit-tests-from-taps}

On a phone, users can tap where they want something. Each tap is a [transient input source](/user-manual/xr/input-sources/#kinds-of-input-source) with the profile `'generic-touchscreen'`. Start one hit test source for all of them, and it reports a result for each tap, with the tap's input source:

```javascript
app.xr.hitTest.on('available', () => {
    app.xr.hitTest.start({
        profile: 'generic-touchscreen',
        callback: (err, hitTestSource) => {
            if (err) return;
            hitTestSource.on('result', (position, rotation, inputSource) => {
                // Where the ray through the tap meets the real world
            });
        }
    });
});
```

A tap's input source exists only while the finger is down, and the browser starts reporting results for it a moment after it appears, so a quick tap can end without any. Use the latest result of a tap when it ends, with `selectend`, or hit test from the viewer instead.

An input source's `hitTestStart()` does the same for that input source's own profile, and fires `hittest:result` on the input source. Like a profile, it applies to transient input sources only. For the rays of controllers and hands, test against the planes or meshes the device detects (see [Plane Detection](/user-manual/xr/ar/plane-detection/) and [Mesh Detection](/user-manual/xr/ar/mesh-detection/)).

## Rays from Other Places {#rays-from-other-places}

An `offsetRay` moves the ray within its space. In the viewer space it is relative to the camera. In a space such as `pc.XRSPACE_LOCALFLOOR`, it is fixed in the room, relative to the session's origin:

```javascript
// Cast straight down from 1 meter above the origin of the session
app.xr.hitTest.start({
    spaceType: pc.XRSPACE_LOCALFLOOR,
    offsetRay: new pc.Ray(new pc.Vec3(0, 1, 0), new pc.Vec3(0, -1, 0)),
    callback: (err, hitTestSource) => {
        // ...
    }
});
```

A source's ray can't change once it has started. For a ray that moves, start a source in the viewer space, which moves with the camera, or remove the source and start another.

`entityTypes` chooses what rays can hit. Planes, the default, are the flat surfaces the device has found. Points are feature points of its tracking, which can be on any surface, but are less precise. Meshes are its [meshes](/user-manual/xr/ar/mesh-detection/) of the room, on devices that build them. Ask for several, and the nearest hit of any of them is reported.

## Anchoring Placed Objects {#anchoring-placed-objects}

As the device's understanding of the room improves, the surfaces it reports can shift slightly, and an object placed at an earlier hit can drift from the real spot. An [anchor](/user-manual/xr/ar/anchors/) created from the hit test result follows the real spot instead:

```javascript
// Anchor the next result after each select
let placeNext = false;
app.xr.input.on('select', () => {
    placeNext = true;
});

hitTestSource.on('result', (position, rotation, inputSource, hitTestResult) => {
    if (!placeNext) return;
    placeNext = false;

    // An add handler puts an object on the new anchor, as the Anchors page shows
    app.xr.anchors.create(hitTestResult);
});
```

Request anchors when you start the session. See [Anchors](/user-manual/xr/ar/anchors/).

## See Also

- [Anchors](/user-manual/xr/ar/anchors/) - Keeping placed objects in place
- [AR](/user-manual/xr/ar/) - Starting AR sessions, and placing content relative to the camera rig
- [WebXR AR: Hit Test](/tutorials/webxr-ar-hit-test/) - Tutorial with an Editor project
- [XrHitTest](https://api.playcanvas.com/engine/classes/XrHitTest.html) - The API reference for `app.xr.hitTest`

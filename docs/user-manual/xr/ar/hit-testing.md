---
title: Hit Testing
---

In an AR/MR context, the interaction of virtual world objects with the real world is achieved by many techniques. Hit Testing allows one to pick a point in space by probing real-world geometry that is estimated using the underlying AR system.

This can be used in various ways and one of the most common is placing a virtual object in space so that it feels planted in the real world.

## Reliability {#reliability}

Hit Testing is implemented by an underlying system building an understanding of ever-evolving real-world geometry. Some platforms rely on pre-captured information, while some platforms estimate geometry in real-time based on Computer Vision techniques. So the reliability of hit testing is subject to the capabilities of the underlying system.

## Support {#support}

You can check if hit testing is supported by the system:

```javascript
if (app.xr.hitTest.supported) {
    // hit testing is supported
}
```

## Hit Test Source {#hit-test-source}

When we want to start hit testing, we issue a request and are provided with a `HitTestSource` instance, which then provides results in the form of events. We can manage the lifetime of the source that way.

The most basic way is to start probing straight from the viewer forward vector:

```javascript
// start a hit test
app.xr.hitTest.start({
    spaceType: pc.XRSPACE_VIEWER, // from a viewer space
    callback: (err, hitTestSource) => {
        if (err) return;
        // subscribe to hit test results
        hitTestSource.on('result', (position, rotation) => {
            // position and rotation of hit test result
            // based on a ray facing forward from the viewer reference space
        });
    }
});
```

We can stop hit testing by removing its source:

```javascript
hitTestSource.remove();
```

## Monoscope (Touch Screen) {#monoscope-touch-screen}

When an XR session is started on a monoscopic device (such as a mobile phone with a touch screen), then it is possible to start hit tests based on user touches on the screen:

```javascript
app.xr.hitTest.start({
    profile: 'generic-touchscreen', // touch screen input sources
    callback: (err, hitTestSource) => {
        if (err) return;
        hitTestSource.on('result', (position, rotation, inputSource) => {
            // position and rotation of hit test result
            // that will be created from touch on mobile devices
        });
    }
});
```

Bear in mind that transient input sources (such as touch) do not provide hit test results straight away, as the hit test source is created as an asynchronous operation and its results are a subject of the underlying system being able to provide such information. This means that a touch might not provide any hit test results within its short-lived time.

## Input Source {#input-source}

The most common way to start hit testing is from a ray of an input source (e.g. controllers or hands):

```javascript
inputSource.hitTestStart({
    callback: (err, hitTestSource) => {
        if (err) return;
        hitTestSource.on('result', (position, rotation) => {
            // position and rotation of a hit test result
            // based on a ray of an input source
        });
    }
});
```

## Arbitrary Ray {#arbitrary-ray}

It is also possible to start a hit testing using a custom ray with the origin point and a direction:

```javascript
const ray = new pc.Ray();

ray.origin.set(0, 1, 0); // start 1 meter above the origin
ray.direction.set(0, -1, 0); // point downwards

app.xr.hitTest.start({
    spaceType: pc.XRSPACE_LOCALFLOOR,
    offsetRay: ray,
    callback: (err, hitTestSource) => {
        // hit test source that will sample real world geometry
        // from the position where AR session started
    }
});
```

## Anchors {#anchors}

Hit tests are performed against the estimation of real-world geometry and the geometry can change if the underlying system estimation process refines the planes, meshes, or points that were hit by the hit test. For that reason, an [Anchor][1] can be created from these hit tests, which then can be updated. This allows a more planted and reliable placement of virtual objects:

```javascript
// subscribe to hit test results
hitTestSource.on('result', (position, rotation, inputSource, hitTestResult) => {
    // create an anchor using a hit test result
    app.xr.anchors.create(hitTestResult, (err, anchor) => {
        if (!err) {
            // a new anchor has been created
        }
    });
});
```

[1]: /user-manual/xr/ar/anchors/

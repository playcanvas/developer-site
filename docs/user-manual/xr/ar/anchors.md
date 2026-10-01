---
title: Anchors
description: "WebXR anchors in PlayCanvas: keeping virtual objects fixed to the real world as tracking improves, creating anchors from a pose or a hit test result, following and destroying them, and persisting them between sessions."
---

An anchor is a point in the real world that the device keeps track of. As the device's understanding of the room improves during a session, the poses of things it reported earlier can drift a little from the real spots they were measured at. An anchor stays with its real spot instead, so an object that follows an anchor stays where the user put it. Some devices can also remember anchors from one session to the next.

<EngineExample id="xr/ar-hit-test-anchors" title="AR Hit Test Anchors" />

## Requesting Anchors {#requesting-anchors}

Ask for anchors when you start an AR session:

```javascript
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    anchors: true
});
```

`app.xr.anchors.supported` is `true` when the browser implements anchors, and `app.xr.anchors.available` becomes `true`, firing `available`, once a session has them.

## Creating Anchors {#creating-anchors}

Create an anchor at a position and rotation in [tracking space](/user-manual/xr/ar/#the-real-world-and-the-rig):

```javascript
app.xr.anchors.create(position, rotation);
```

Or create one from a [hit test result](/user-manual/xr/ar/hit-testing/#anchoring-placed-objects), which attaches it to the surface the hit test found, so it follows that surface as the device refines it:

```javascript
// hitTestResult is the last argument of a hit test source's result event
app.xr.anchors.create(hitTestResult);
```

Anchors are created asynchronously. `app.xr.anchors` fires `add` for each new anchor, including those [restored](#persistence) from earlier sessions, and lists the current ones in `app.xr.anchors.list`. `create()` also takes a callback as its last argument, which receives an error if the anchor can't be created. For an anchor created from a position and rotation, the callback isn't always called when it succeeds, so follow new anchors with `add`, as below.

## Following an Anchor {#following-an-anchor}

An anchor's `getPosition()` and `getRotation()` return its pose in tracking space, and it fires `change` when the pose changes. Keep an object on the anchor by making it a child of the camera rig, and updating its local pose:

```javascript
app.xr.anchors.on('add', (anchor) => {
    const flag = new pc.Entity('flag');
    flag.addComponent('render', { type: 'cone' });
    flag.setLocalScale(0.1, 0.2, 0.1);
    rig.addChild(flag);

    const follow = () => {
        flag.setLocalPosition(anchor.getPosition());
        flag.setLocalRotation(anchor.getRotation());
        flag.translateLocal(0, 0.1, 0); // Stand the cone on the anchor
    };
    follow();
    anchor.on('change', follow);

    anchor.once('destroy', () => {
        flag.destroy();
    });
});
```

## Destroying Anchors {#destroying-anchors}

`anchor.destroy()` deletes an anchor, and fires its `destroy` event. Anchors are destroyed when the session ends, and the device can also destroy one if it can no longer track it, so remove what follows an anchor when it fires `destroy`, as above.

## Persistence {#persistence}

On devices that support it, an anchor can outlive its session: give it an identifier with `anchor.persist()`, and restore it with that identifier in a later session. `app.xr.anchors.persistence` is `true` when the browser supports this:

```javascript
// Remember an anchor, for example when the user places something
anchor.persist((err, uuid) => {
    if (!err) {
        console.log(`Persisted the anchor as ${uuid}`);
    }
});
```

The device remembers the identifiers of the anchors your site has persisted. When a session starts, `app.xr.anchors.uuids` lists them, and `app.xr.anchors.restore()` recreates each anchor, which `app.xr.anchors` then adds as usual:

```javascript
app.xr.anchors.on('available', () => {
    if (!app.xr.anchors.persistence) return;

    for (const uuid of app.xr.anchors.uuids) {
        app.xr.anchors.restore(uuid);
    }
});
```

A restored anchor's `uuid` is its identifier, and `anchor.persistent` is `true`. To know which object goes on which anchor, store the identifiers with your own data, such as in `localStorage`, when you persist them.

`anchor.forget()`, or `app.xr.anchors.forget(uuid)`, deletes a persisted identifier, so the anchor is not restored again. Devices limit how many anchors a site can persist, and can delete them, for example when the user clears the site's data. Meta Quest keeps at most 8 per site, and none in private browsing. Handle a failed `persist()` or `restore()` gracefully.

## See Also

- [Hit Testing](/user-manual/xr/ar/hit-testing/) - Finding the surfaces to anchor to
- [AR](/user-manual/xr/ar/) - Placing content relative to the camera rig
- [XrAnchors](https://api.playcanvas.com/engine/classes/XrAnchors.html) - The API reference for `app.xr.anchors`

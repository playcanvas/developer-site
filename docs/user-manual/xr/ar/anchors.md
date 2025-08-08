---
title: Anchors
---

Anchors provide the ability to create a point in 3D space that can be updated to match an ever-evolving understanding of the real world by the underlying the AR system. This allows for the placement of virtual objects in relation to the real world that feel planted in the user's environment.

Each anchor is represented as a position and orientation and can be created from an arbitrary point as well as in relation to a hit test result that will make it more reliable.

### Using Anchors {#using-anchors}

To start using anchors, when a session is requested, a flag should be provided to the session:

```javascript
app.xr.start(camera, pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    anchors: true
});
```

## Support {#support}

You can check if anchors are supported by the system:

```javascript
if (app.xr.anchors.supported) {
    // anchors are supported
}

app.xr.on('start', () => {
    if (app.xr.anchors.available) {
        // anchors are supported and available
    }
});
```

## Creating Anchors {#creating-anchors}

Then you can create an anchor, e.g. using an arbitrary position and rotation:

```javascript
app.xr.anchors.create(position, rotation, (err, anchor) => {
    if (!err) {
        // new anchor has been created
    }
});
```

Or for more reliable tracking, an anchor can be created from the [Hit Test Result][1].

## Anchor {#anchor}

Each anchor has its position and rotation and can be updated at any point. When an anchor is updated, the application developer should update related virtual objects accordingly.

Anchors can be added and removed dynamically during the session:

```javascript
app.xr.anchors.on('add', (anchor) => {
    const entity = new pc.Entity();

    // add a cone for an anchor
    entity.addComponent('render', { type: 'cone' });
    entity.setLocalScale(0.1, 0.1, 0.1); // 10cm diameter
    app.root.addChild(entity);

    // transform
    entity.setLocalPosition(anchor.getPosition());
    entity.setLocalRotation(anchor.getRotation());
    entity.translateLocal(0, 0.05, 0); // offset cone

    // update cone when anchor changes
    anchor.on('change', () => {
        entity.setLocalPosition(anchor.getPosition());
        entity.setLocalRotation(anchor.getRotation());
        entity.translateLocal(0, 0.05, 0); // offset cone
    });

    // remove cone when anchor is destroyed
    anchor.once('destroy', () => {
        entity.destroy();
    });
});
```

## Persistence {#persistence}

Anchor persistence provides a way to remember anchors between sessions, with a limited number of anchors per origin. This allows applications to place virtual objects in relation to the real-world geometry and remain there between sessions.

You can check if persistence is supported:

```javascript
if (app.xr.anchors.persistence) {
    // application can persist anchors
}
```

Each anchor can have a UUID that allows it to be referenced and restored between sessions.

You can access a list of persistent anchors and restore them on session start:

```javascript
app.xr.on('start', () => {
    const uuids = app.xr.anchors.uuids;
    for(let i = 0; i < uuids.length; i++) {
        app.xr.anchors.restore(uuids[i]);
    }
});
```

To manage individual anchor persistence, you can use `persist` and `forget` methods:

```javascript
anchor.persist((err, uuid) => {
    if (uuid) {
        // anchor has been persisted
    }
});
```

```javascript
if (anchor.persistent) {
    anchor.forget((err) => {
        if (!err) {
            // anchor is forgotten
        }
    });
}
```

[1]: /user-manual/xr/ar/hit-testing/#anchors

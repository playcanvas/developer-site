---
title: Ray Casting
description: Query the physics scene along a line with raycastFirst and raycastAll, read the hit entity, point and normal, filter hits by tag, group or callback, and pick entities under the pointer.
---

The PlayCanvas physics engine allows you to perform ray casts. A ray cast is a query that determines whether a straight line between two 3D points intersects any collision shapes, and where. Ray casts are methods on the rigid body component system, `app.systems.rigidbody`, so they work the same wherever you build: you only need the application and two points.

## Picking with a Ray Cast {#picking-with-a-ray-cast}

One application of ray casting is picking, where the user can touch or click the screen to select an entity. The example below casts a ray from the camera through the pointer position and reports the closest body it hits:

<EngineExample id="physics/raycast" title="Raycast" />

The ray starts at the camera and ends where the pointer position lands on the camera's far clip plane, so it passes through whatever is under the pointer:

```javascript
function pick(screenX, screenY) {
    // From the camera position...
    const from = cameraEntity.getPosition();

    // ...to the pointer position projected onto the far clip plane
    const to = cameraEntity.camera.screenToWorld(screenX, screenY, cameraEntity.camera.farClip);

    // Return the closest hit, or null
    const result = app.systems.rigidbody.raycastFirst(from, to);
    if (result) {
        console.log(`You selected ${result.entity.name}`);
    }
}

app.mouse.on(pc.EVENT_MOUSEDOWN, (event) => pick(event.x, event.y));
app.touch?.on(pc.EVENT_TOUCHSTART, (event) => pick(event.touches[0].x, event.touches[0].y));
```

In the Editor this lives in a script on the camera entity, where `this.app` and `this.entity` stand in for `app` and `cameraEntity`; the [Entity picking using physics](/tutorials/entity-picking-using-physics/) tutorial has the complete script. In React, `useApp()` returns the application; in Web Components, `whenReady('pc-app')` does. See [Moving Bodies](/user-manual/physics/forces-and-impulses/#running-physics-code) for those patterns.

## Raycast Results {#raycast-results}

The rigid body component system provides two query methods:

- [`raycastFirst(start, end, options)`](https://api.playcanvas.com/engine/classes/RigidBodyComponentSystem.html#raycastfirst) returns the closest hit, or `null` if nothing was hit.
- [`raycastAll(start, end, options)`](https://api.playcanvas.com/engine/classes/RigidBodyComponentSystem.html#raycastall) returns an array with every hit along the ray, which is empty if nothing was hit. The array is in no particular order unless you pass `sort: true`, which orders it from nearest to farthest.

Each hit is a [RaycastResult](https://api.playcanvas.com/engine/classes/RaycastResult.html):

| Property | Description |
| --- | --- |
| `entity` | The entity whose collision shape was hit |
| `point` | The world space position of the hit |
| `normal` | The world space surface normal at the hit |
| `hitFraction` | How far along the ray the hit is, from 0 at `start` to 1 at `end` |

Ray casts hit [trigger volumes](/user-manual/physics/trigger-volumes/) as well as rigid bodies. Use one of the filters below to skip them.

## Filtering Ray Casts {#filtering-ray-casts}

Both methods accept an options object:

| Option | Description |
| --- | --- |
| `filterTags` | Only report hits on entities whose [tags](https://api.playcanvas.com/engine/classes/Tags.html) match. Written like the arguments to `Tags#has`, inside an array: `['enemy']` requires the tag, `['enemy', 'boss']` requires both, `[['red', 'blue']]` requires either |
| `filterCallback` | A function that receives each hit entity and returns `true` to keep the hit |
| `filterCollisionGroup` | The [collision group](/user-manual/physics/rigid-bodies/#collision-groups-and-masks) of the ray, tested against the mask of each body |
| `filterCollisionMask` | The collision mask of the ray, tested against the group of each body |
| `sort` | `raycastAll` only. Sort the hits from nearest to farthest |

```javascript
// Find every enemy the shot passes through, nearest first
const hits = app.systems.rigidbody.raycastAll(from, to, {
    filterTags: ['enemy'],
    sort: true
});
for (const hit of hits) {
    hit.entity.script.health.damage(10 * (1 - hit.hitFraction));
}

// Pick anything except the player's own body
const result = app.systems.rigidbody.raycastFirst(from, to, {
    filterCallback: (entity) => entity !== player
});
```

Filtering by tag or callback needs every hit along the ray, so `raycastFirst` with either option does the same work as `raycastAll`. Group and mask filtering happens inside the physics engine and is cheaper. The [Physics raycasting by tag](/tutorials/physics-raycasting-by-tag/) tutorial shows tag filtering in a full project.

## Probing the Environment {#probing-the-environment}

Ray casting has other applications too. An entity can probe its surroundings by firing ray casts. For example, to determine whether a character is standing on the ground, cast a short ray straight down from its position and see whether anything other than the character itself is hit:

```javascript
const from = player.getPosition();
const to = new pc.Vec3(from.x, from.y - 1.1, from.z);
const hit = app.systems.rigidbody.raycastFirst(from, to, {
    filterCallback: (entity) => entity !== player
});
const onGround = hit !== null;
```

## See Also

- [Entity picking using physics](/tutorials/entity-picking-using-physics/) - Tutorial with the complete picking script for the Editor
- [Physics raycasting by tag](/tutorials/physics-raycasting-by-tag/) - Tutorial that filters hits with `filterTags`
- [Place an entity with physics](/tutorials/place-an-entity-with-physics/) - Tutorial that spawns objects where a ray hits the ground
- [RigidBodyComponentSystem](https://api.playcanvas.com/engine/classes/RigidBodyComponentSystem.html) - API reference for `raycastFirst` and `raycastAll`

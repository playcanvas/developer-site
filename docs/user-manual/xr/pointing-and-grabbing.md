---
title: Pointing and Grabbing
description: "Recipes for interacting with objects in XR with PlayCanvas: drawing a laser, picking objects with bounding boxes or physics ray casts, highlighting what a ray points at, grabbing and carrying objects with the grip, throwing them with the controller's velocity, and pressing buttons with a fingertip."
---

Most XR interaction comes down to a few moves: point at something and select it, reach out and grab it, throw it, or press it with a finger. This page builds each from the [rays, actions and poses](/user-manual/xr/input-sources/) of input sources. The code runs in any session, VR or AR, with controllers or hands.

![A controller's laser points at a glowing box, while the other controller holds a small box in its grip](/img/user-manual/xr/pointing-and-grabbing/pointing-and-grabbing.webp)

## Picking with Bounding Boxes {#picking-with-bounding-boxes}

To find what a ray points at among a few objects, test it against their bounding boxes. This function returns the closest entity that an input source points at, and keeps the point the ray hit:

```javascript
const ray = new pc.Ray();
const point = new pc.Vec3();
const hitPoint = new pc.Vec3();

// The closest of the entities that the input source points at, or null.
// The point where the ray hit it is left in hitPoint.
const pick = (inputSource, entities) => {
    ray.set(inputSource.getOrigin(), inputSource.getDirection());

    let closest = null;
    let closestDistance = Infinity;
    for (const entity of entities) {
        for (const meshInstance of entity.render.meshInstances) {
            if (meshInstance.aabb.intersectsRay(ray, point)) {
                const distance = point.distance(ray.origin);
                if (distance < closestDistance) {
                    closest = entity;
                    closestDistance = distance;
                    hitPoint.copy(point);
                }
            }
        }
    }
    return closest;
};
```

Select what the user points at when they select:

```javascript
app.xr.input.on('select', (inputSource) => {
    const target = pick(inputSource, targets);
    if (target) {
        console.log(`Selected ${target.name}`);
    }
});
```

A bounding box is aligned with the world's axes, so it is larger than a rotated or round object. For precise picking, use physics.

## Picking with Physics {#picking-with-physics}

With [physics](/user-manual/physics/) in your application, cast the ray into the physics world. It tests the collision shapes of entities, which can match their meshes closely, and it scales to many objects:

```javascript
const end = new pc.Vec3();

app.xr.input.on('select', (inputSource) => {
    // Cast ten meters along the ray
    const origin = inputSource.getOrigin();
    end.copy(inputSource.getDirection()).mulScalar(10).add(origin);

    const result = app.systems.rigidbody.raycastFirst(origin, end);
    if (result) {
        console.log(`Selected ${result.entity.name} at ${result.point}`);
    }
});
```

See [Ray Casting](/user-manual/physics/ray-casting/) for filtering the results.

## Drawing a Laser {#drawing-a-laser}

A visible ray shows the user where they point, and highlighting its end shows them what a select will hit. Draw a line from each tracked controller or hand, ending at what it points at:

```javascript
const end = new pc.Vec3();

app.on('update', () => {
    for (const inputSource of app.xr.input.inputSources) {
        // Taps and gaze-and-pinch need no laser
        if (inputSource.targetRayMode !== pc.XRTARGETRAY_POINTER) continue;

        // End at what the ray points at, or two meters away
        const target = pick(inputSource, targets);
        if (target) {
            end.copy(hitPoint);
        } else {
            end.copy(inputSource.getDirection()).mulScalar(2).add(inputSource.getOrigin());
        }
        app.drawLine(inputSource.getOrigin(), end, target ? pc.Color.YELLOW : pc.Color.WHITE);
    }
});
```

`app.drawLine()` draws a thin line for one frame. For a thicker laser with a soft end, draw a long, thin box or a mesh of your own, and move it in the same way.

## Grabbing {#grabbing}

To grab an object, remember where it is relative to the hand when the squeeze starts, and keep it there until the squeeze ends:

```javascript
const held = new Map(); // input source → { entity, offset }

const grip = new pc.Mat4();
const world = new pc.Mat4();
const position = new pc.Vec3();
const rotation = new pc.Quat();

// The world transform of an input source's grip pose
const getGripTransform = (inputSource, result) => {
    return result.setTRS(inputSource.getPosition(), inputSource.getRotation(), pc.Vec3.ONE);
};

app.xr.input.on('squeezestart', (inputSource) => {
    if (!inputSource.grip) return;

    // Grab the closest object within 15 cm of the hand
    const handPosition = inputSource.getPosition();
    let closest = null;
    let closestDistance = 0.15;
    for (const entity of grabbables) {
        const distance = entity.getPosition().distance(handPosition);
        if (distance < closestDistance) {
            closest = entity;
            closestDistance = distance;
        }
    }
    if (!closest) return;

    // Remember where the object is relative to the hand
    const offset = new pc.Mat4().mul2(getGripTransform(inputSource, grip).invert(), closest.getWorldTransform());
    held.set(inputSource, { entity: closest, offset });
});

app.xr.input.on('squeezeend', (inputSource) => {
    held.delete(inputSource);
});

app.on('update', () => {
    // Keep each held object where it was in the hand
    for (const [inputSource, { entity, offset }] of held) {
        world.mul2(getGripTransform(inputSource, grip), offset);
        entity.setPosition(world.getTranslation(position));
        entity.setRotation(rotation.setFromMat4(world));
    }
});
```

To grab from a distance, pick the object with the ray instead, when the squeeze starts. Remove the input source from `held` when it is removed too, in case the user puts the controller down mid-grab.

Tracked hands have no grip pose, and squeeze with a fist. To let hands grab, use the pose of a joint near the palm, such as `middle-finger-metacarpal`, in place of the grip.

## Throwing {#throwing}

An object that should fall and collide when released needs a [rigid body](/user-manual/physics/rigid-bodies/). Physics owns the transforms of dynamic bodies, so make the body kinematic while it is held, and dynamic again, moving with the hand's velocity, when it is released. In the `squeezestart` handler of [Grabbing](#grabbing), make the body kinematic as you grab it:

```javascript
held.set(inputSource, { entity: closest, offset });
if (closest.rigidbody) {
    closest.rigidbody.type = pc.BODYTYPE_KINEMATIC;
}
```

And replace its `squeezeend` handler with one that throws:

```javascript
app.xr.input.on('squeezeend', (inputSource) => {
    const grab = held.get(inputSource);
    if (!grab) return;
    held.delete(inputSource);

    const body = grab.entity.rigidbody;
    if (body) {
        body.type = pc.BODYTYPE_DYNAMIC;
        const velocity = inputSource.getLinearVelocity();
        if (velocity) {
            body.linearVelocity = velocity;
        }
    }
});
```

A kinematic body moves with its entity, and pushes dynamic bodies out of its way. The [velocity](/user-manual/xr/controllers/#velocity) is relative to the camera rig, so if the rig moves while the user throws, add the rig's own velocity.

## Pressing with a Finger {#pressing-with-a-finger}

For buttons within reach, a fingertip is more direct than a ray. Press when the tip of an index finger comes close, and release only when it has moved further away, so that a trembling finger doesn't press repeatedly:

```javascript
let pressed = false;

app.on('update', () => {
    let distance = Infinity;
    for (const inputSource of app.xr.input.inputSources) {
        const tip = inputSource.hand?.getJointById('index-finger-tip');
        if (tip) {
            distance = Math.min(distance, tip.getPosition().distance(button.getPosition()));
        }
    }

    // Press within 2 cm of the button's center, and release beyond 4 cm
    if (!pressed && distance < 0.02) {
        pressed = true;
        app.fire('button:press');
    } else if (pressed && distance > 0.04) {
        pressed = false;
    }
});
```

The [`XrMenu`](/user-manual/user-interface/xr/#xr-menus) script's buttons work this way as well as with rays.

## Grabbing the World {#grabbing-the-world}

To let users move, turn and scale the whole scene with both hands, rather than an object, use the `XrManipulation` script. See [Locomotion](/user-manual/xr/locomotion/#moving-the-world).

## See Also

- [Input Sources](/user-manual/xr/input-sources/) - Rays, select and squeeze
- [Controllers](/user-manual/xr/controllers/) - Grip poses and velocity
- [Ray Casting](/user-manual/physics/ray-casting/) - Casting rays into the physics world
- [UI in XR](/user-manual/user-interface/xr/) - Pointing at and selecting UI elements
- [WebXR AR Raycasting Shapes](/tutorials/webxr-ar-raycasting-shapes/) - Tutorial that picks shapes in AR

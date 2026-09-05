---
title: Calling ammo.js Directly
description: Reach Bullet physics features that the PlayCanvas components do not expose by calling the ammo.js API on a rigid body's native object, with continuous collision detection as a worked example.
---

The rigidbody, collision and joint components cover most of what games need from physics, but Bullet can do more than they expose. Continuous collision detection, custom collision flags, extra constraint types, soft bodies and vehicles are all reachable by calling ammo.js directly from your code.

ammo.js is a direct port of Bullet, so its API mirrors the C++ one. There is no ammo.js documentation, but the [Bullet User Manual](https://github.com/bulletphysics/bullet3/blob/master/docs/Bullet_User_Manual.pdf) applies, and the classes and methods exposed to JavaScript are listed in the [ammo.idl](https://github.com/kripken/ammo.js/blob/main/ammo.idl) file of the ammo.js repository. The build that the Editor imports from the Store and that ships with the engine examples exposes everything in that file. If you need more, compile your own build and load it in place of the standard one; in the Editor, add it as a [WASM module asset](/user-manual/editor/assets/inspectors/wasm/).

:::warning

Code written against `Ammo` bypasses the engine's physics components. It ties your project to the ammo.js backend, it is not covered by the PlayCanvas API reference, and the objects it works with are internal to the engine and may change between releases. Prefer the components whenever they can do the job.

:::

## Reaching the Native Objects {#reaching-the-native-objects}

Every rigidbody component wraps a Bullet `btRigidBody`, available as `entity.rigidbody.body` once the component has been initialized. The whole simulation lives in a `btDiscreteDynamicsWorld`, available as `app.systems.rigidbody.dynamicsWorld`. Both are `null` when ammo.js is not loaded. These properties are the same on every surface; only how you obtain `entity` and `app` differs, as described in [Moving Bodies](/user-manual/physics/forces-and-impulses/#running-physics-code).

Two rules keep ammo.js code stable:

- **Fetch the body when you need it.** The engine recreates the native body when properties such as the rigidbody type or the collision shape change, so do not cache `rigidbody.body` across frames. Read it each time you use it, and reapply any settings after a change.
- **Free what you allocate.** ammo.js objects live in WebAssembly memory that JavaScript's garbage collector does not manage. Call `Ammo.destroy()` on any `btVector3`, `btTransform` or constraint you create once you are done with it.

## Continuous Collision Detection {#continuous-collision-detection}

Sometimes, you might find that fast moving rigid bodies in your simulations pass through one another. To overcome this, Bullet provides Continuous Collision Detection (CCD). It performs additional checks by sweeping a sphere between the previous and current positions of a rigid body and looking for intersections with other bodies along the way. CCD is not exposed by the rigidbody component, but two calls on the native body enable it:

```javascript
// Run this once the body exists, for example in a script's initialize(), and again
// if the body is recreated by a change of type or shape
const body = entity.rigidbody.body;

// Distance in meters the body must move in one step before CCD kicks in
body.setCcdMotionThreshold(1);

// Radius of the swept sphere. Keep it below the half extent of the shape:
// for an object about 1 meter across, try 0.2
body.setCcdSweptSphereRadius(0.2);
```

The [Physics with CCD](/tutorials/physics-with-ccd/) tutorial wraps these calls in a script with attributes for both values, and you can find its project [here](https://playcanvas.com/project/447023/overview/physics-with-ccd).

## Beyond the Built-in Components {#beyond-the-built-in-components}

CCD is one example. The same approach reaches other Bullet features:

- **Constraints.** The [joint component](/user-manual/physics/joints/) covers fixed, ball, hinge, slider and 6dof joints. For a constraint type or parameter it does not expose, create the Bullet constraint yourself, add it to the dynamics world with `addConstraint()`, and remove and destroy it when you are done. The [Physics Constraints](https://playcanvas.com/project/618829/overview/physics-constraints) project drives every Bullet constraint type this way.
- **Vehicles.** Bullet's raycast vehicle simulates wheels, suspension and steering on top of a chassis rigid body. There is no vehicle component, so the [Vehicle Physics](/tutorials/vehicle-physics/) tutorial and the engine's [vehicle.js](https://github.com/playcanvas/engine/blob/main/scripts/physics/vehicle.js) script drive `btRaycastVehicle` directly.
- **Soft bodies and cloth.** Bullet's soft body solver is included in ammo.js, but it needs a soft-rigid dynamics world rather than the discrete world the engine creates, which makes it an advanced integration.

<EngineExample id="physics/vehicle" title="Vehicle" />

## See Also

- [Physics with CCD](/tutorials/physics-with-ccd/) - Tutorial that wraps the CCD calls above in a configurable script
- [Vehicle Physics](/tutorials/vehicle-physics/) - Tutorial that drives a raycast vehicle on desktop, mobile and WebXR
- [Joints](/user-manual/physics/joints/) - Constraints without touching ammo.js
- [Alternatives to ammo.js](/user-manual/physics/ammo-alternatives/) - Other physics engines and the backend layer they would plug into
- [Bullet User Manual](https://github.com/bulletphysics/bullet3/blob/master/docs/Bullet_User_Manual.pdf) - The documentation that applies to ammo.js

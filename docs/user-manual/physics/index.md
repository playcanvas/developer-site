---
title: Physics
description: "Overview of PlayCanvas physics: rigid bodies, collision shapes, motion, collision events, triggers, ray casts and joints, on every authoring surface."
---

Most video games you have ever played will have some form of physics. The player expects objects to fall under the influence of gravity. For objects to collide instead of pass through each other. For a sound to play if two objects collide. And so on.

A physics engine attempts to reproduce our understanding of the natural world in an artificial game world. It attempts to realistically animate objects in an expected and predictable way.

![Physics Constraints](/img/user-manual/physics/physics-constraints.webp)

PlayCanvas physics is powered by [ammo.js](https://github.com/kripken/ammo.js), a WebAssembly port of the open source Bullet physics engine. You work with it through components. The [rigidbody](/user-manual/editor/scenes/components/rigidbody/) component decides how an entity moves, the [collision](/user-manual/editor/scenes/components/collision/) component gives it a physical shape, and the alpha [joint](/user-manual/physics/joints/) component constrains bodies to one another. The same components, with the same properties, are available whichever way you build: in the Editor, directly against the engine, in [PlayCanvas React](/user-manual/react/guide/physics/) and in [Web Components](/user-manual/web-components/tags/pc-rigid-body/). Each page in this section explains a concept once and then shows how to apply it on each of those surfaces.

This section covers:

- [Getting Started](/user-manual/physics/physics-basics/) - Enabling physics, gravity, units and how the simulation runs.
- [Rigid Bodies](/user-manual/physics/rigid-bodies/) - Static, dynamic and kinematic bodies, their properties, sleeping and teleporting.
- [Collision Shapes](/user-manual/physics/collision-shapes/) - Primitive, mesh and compound shapes, offsets and scale.
- [Moving Bodies](/user-manual/physics/forces-and-impulses/) - Forces, impulses, torque, velocity and kinematic motion.
- [Collision Events](/user-manual/physics/collision-events/) - Responding to contacts between rigid bodies.
- [Trigger Volumes](/user-manual/physics/trigger-volumes/) - Detecting when bodies enter and leave a region.
- [Ray Casting](/user-manual/physics/ray-casting/) - Querying the scene along a line for picking and probing.
- [Joints](/user-manual/physics/joints/) - Hinges, sliders, ball joints, springs and breakable welds.
- [Calling ammo.js Directly](/user-manual/physics/calling-ammo/) - Reaching Bullet features that the components do not expose.
- [Alternatives to ammo.js](/user-manual/physics/ammo-alternatives/) - Other physics engines and how they could be integrated.

## See Also

- [Collision and Triggers](/tutorials/collision-and-triggers/) - Tutorial that builds a complete physics scene in the Editor
- [Creating Rigid Bodies in Code](/tutorials/creating-rigid-bodies-in-code/) - Tutorial that spawns physics objects from scripts
- [Vehicle Physics](/tutorials/vehicle-physics/) - Tutorial that drives a raycast vehicle
- [Physics in PlayCanvas React](/user-manual/react/guide/physics/) - The React guide to enabling and using physics
- [`<pc-rigid-body>`](/user-manual/web-components/tags/pc-rigid-body/) - The Web Components rigid body reference

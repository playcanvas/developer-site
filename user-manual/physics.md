# Physics

Most video games you have ever played will have some form of physics. The player expects objects to fall under the influence of gravity. For objects to collide instead of pass through each other. For a sound to play if two objects collide. And so on.

A physics engine attempts to reproduce our understanding of the natural world in an artificial game world. It attempts to realistically animate objects in an expected and predictable way.

[Image: Physics Constraints]

PlayCanvas physics is powered by [ammo.js](https://github.com/kripken/ammo.js), a WebAssembly port of the open source Bullet physics engine. You work with it through components. The [rigidbody](https://developer.playcanvas.com/user-manual/editor/scenes/components/rigidbody.md) component decides how an entity moves, the [collision](https://developer.playcanvas.com/user-manual/editor/scenes/components/collision.md) component gives it a physical shape, and the alpha [joint](https://developer.playcanvas.com/user-manual/physics/joints.md) component constrains bodies to one another. The same components, with the same properties, are available whichever way you build: in the Editor, directly against the engine, in [PlayCanvas React](https://developer.playcanvas.com/user-manual/react/guide/physics.md) and in [Web Components](https://developer.playcanvas.com/user-manual/web-components/tags/pc-rigid-body.md). Each page in this section explains a concept once and then shows how to apply it on each of those surfaces.

This section covers:

- [Getting Started](https://developer.playcanvas.com/user-manual/physics/physics-basics.md) - Enabling physics, gravity, units and how the simulation runs.
- [Rigid Bodies](https://developer.playcanvas.com/user-manual/physics/rigid-bodies.md) - Static, dynamic and kinematic bodies, their properties, sleeping and teleporting.
- [Collision Shapes](https://developer.playcanvas.com/user-manual/physics/collision-shapes.md) - Primitive, mesh and compound shapes, offsets and scale.
- [Moving Bodies](https://developer.playcanvas.com/user-manual/physics/forces-and-impulses.md) - Forces, impulses, torque, velocity and kinematic motion.
- [Collision Events](https://developer.playcanvas.com/user-manual/physics/collision-events.md) - Responding to contacts between rigid bodies.
- [Trigger Volumes](https://developer.playcanvas.com/user-manual/physics/trigger-volumes.md) - Detecting when bodies enter and leave a region.
- [Ray Casting](https://developer.playcanvas.com/user-manual/physics/ray-casting.md) - Querying the scene along a line for picking and probing.
- [Joints](https://developer.playcanvas.com/user-manual/physics/joints.md) - Hinges, sliders, ball joints, springs and breakable welds.
- [Calling ammo.js Directly](https://developer.playcanvas.com/user-manual/physics/calling-ammo.md) - Reaching Bullet features that the components do not expose.
- [Alternatives to ammo.js](https://developer.playcanvas.com/user-manual/physics/ammo-alternatives.md) - Other physics engines and how they could be integrated.

## See Also

- [Collision and Triggers](https://developer.playcanvas.com/tutorials/collision-and-triggers/) - Tutorial that builds a complete physics scene in the Editor
- [Creating Rigid Bodies in Code](https://developer.playcanvas.com/tutorials/creating-rigid-bodies-in-code/) - Tutorial that spawns physics objects from scripts
- [Vehicle Physics](https://developer.playcanvas.com/tutorials/vehicle-physics/) - Tutorial that drives a raycast vehicle
- [Physics in PlayCanvas React](https://developer.playcanvas.com/user-manual/react/guide/physics.md) - The React guide to enabling and using physics
- [`<pc-rigid-body>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-rigid-body.md) - The Web Components rigid body reference

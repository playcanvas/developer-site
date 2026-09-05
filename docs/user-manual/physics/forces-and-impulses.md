---
title: Moving Bodies
description: Move dynamic rigid bodies with forces, impulses and torque, set their velocity directly, drive kinematic bodies through their transform, and see where physics code runs on each surface.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Dynamic rigid bodies move in response to forces and impulses. A force is applied to a body over a period of time, whereas an impulse changes a body's velocity in an instant. Both are methods on the [RigidBodyComponent](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html), and they only affect dynamic bodies: static bodies never move and kinematic bodies are positioned by you, so calling them on either has no effect.

Everything on this page is a call on the rigidbody component, identical on every surface. The only thing that differs is where the code runs.

## Running Physics Code {#running-physics-code}

Forces are usually applied every frame while a key is held, so you need somewhere to run per-frame code with access to the entity:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

Subscribe to the application's `update` event, or attach a Script to the entity as described in the [Scripting](/user-manual/scripting/) section:

```javascript
app.on('update', (dt) => {
    // While the right arrow key is held, push the box along the world X axis
    if (app.keyboard.isPressed(pc.KEY_RIGHT)) {
        box.rigidbody.applyForce(10, 0, 0);
    }
});
```

</TabItem>
<TabItem value="editor" label="Editor">

Add a Script component to the entity and attach a script whose `update` method drives the body:

```javascript
import { Script, KEY_RIGHT } from 'playcanvas';

export class Push extends Script {
    static scriptName = 'push';

    update(dt) {
        // While the right arrow key is held, push the body along the world X axis
        if (this.app.keyboard.isPressed(KEY_RIGHT)) {
            this.entity.rigidbody.applyForce(10, 0, 0);
        }
    }
}
```

See [Getting Started with Scripting](/user-manual/scripting/getting-started/) for how scripts are created and attached.

</TabItem>
<TabItem value="react" label="React">

Place a component inside the `<Entity>`, read the entity with `useParent` and run code every frame with `useAppEvent`:

```jsx
import { KEY_RIGHT } from 'playcanvas';
import { useApp, useParent, useAppEvent } from '@playcanvas/react/hooks';

function Push() {
  const app = useApp();
  const entity = useParent();
  useAppEvent('update', (dt) => {
    // While the right arrow key is held, push the body along the world X axis
    if (app.keyboard.isPressed(KEY_RIGHT)) {
      entity.rigidbody?.applyForce(10, 0, 0);
    }
  });
  return null;
}

<Entity name="box">
  <Collision type="box" />
  <RigidBody type="dynamic" />
  <Push />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

Load a script file that exports the same `Push` class shown in the Editor tab, then attach it to the entity:

```html
<pc-asset src="push.mjs"></pc-asset>

<pc-entity name="box">
    <pc-collision type="box"></pc-collision>
    <pc-rigid-body type="dynamic"></pc-rigid-body>
    <pc-script>
        <pc-script-instance name="push"></pc-script-instance>
    </pc-script>
</pc-entity>
```

See [Adding Behavior with Scripts](/user-manual/web-components/scripting/). Alternatively, reach the entity from page JavaScript through the element's `entity` property once the app is ready, as described in [Programmatic Access](/user-manual/web-components/programmatic-access/).

</TabItem>
</Tabs>

## Forces {#forces}

If you want to push a heavy weight across the floor, you would apply a force for as long as the push lasts. Forces accumulate until the next physics step, so a force applied every frame produces a steady acceleration, and a heavier body accelerates more slowly than a lighter one under the same force:

```javascript
// Push along the world X axis, every frame while the push lasts
entity.rigidbody.applyForce(10, 0, 0);
```

## Impulses {#impulses}

If you want to fire a cannonball from a cannon, you would apply a single impulse. An impulse is an instantaneous change in momentum, so apply it once rather than every frame:

```javascript
// Launch up and to the right, once
entity.rigidbody.applyImpulse(10, 10, 0);
```

Both methods also accept a [Vec3](https://api.playcanvas.com/engine/classes/Vec3.html), which is convenient when the direction is calculated at runtime:

```javascript
// Launch the body along the direction it is facing
const impulse = entity.forward.clone().mulScalar(10);
entity.rigidbody.applyImpulse(impulse);
```

## Applying at a Point {#applying-at-a-point}

By default a force or impulse acts through the body's center of mass, so it changes the body's velocity without spinning it. Pass an optional point to apply it off-center and the body rotates as well. The two methods measure that point differently:

- `applyForce(force, point)` takes the point as an offset from the body's position in **world space**.
- `applyImpulse(impulse, point)` takes the point in the **local space of the entity**.

```javascript
// Impulse: the point is in the entity's local space, so this pushes up on the
// point 1 unit along the entity's local Z axis and makes the body tip over
entity.rigidbody.applyImpulse(new pc.Vec3(0, 10, 0), new pc.Vec3(0, 0, 1));

// Force: the point is a world space offset from the body, so transform the
// same local point into world space first
const offset = entity.getWorldTransform().transformVector(new pc.Vec3(0, 0, 1));
entity.rigidbody.applyForce(new pc.Vec3(0, 10, 0), offset);
```

Both methods can also be called with six numbers, the force or impulse followed by the point.

## Torque {#torque}

To spin a body without moving it, apply a torque. `applyTorque` is the rotational equivalent of a force and `applyTorqueImpulse` of an impulse. Both take a Vec3 (or three numbers) whose direction is the world space axis to rotate about and whose length is the strength:

```javascript
// Keep spinning the body about the world Y axis while called every frame
entity.rigidbody.applyTorque(0, 5, 0);

// Give the body a single kick of spin about the world X axis
entity.rigidbody.applyTorqueImpulse(2, 0, 0);
```

## Setting Velocity Directly {#setting-velocity-directly}

Sometimes you want a body to move at an exact speed regardless of its mass, for example a character that should reach top speed immediately or a projectile that must be reset. Assign `linearVelocity` and `angularVelocity` directly:

```javascript
// Move at 5 units per second along the world X axis, keeping the current vertical speed
const velocity = entity.rigidbody.linearVelocity;
entity.rigidbody.linearVelocity = new pc.Vec3(5, velocity.y, 0);

// Stop all motion
entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
```

The velocity getters return read-only snapshots, so modifying the returned vector in place has no effect. Always assign a new value. For a complete character driven this way, see the engine's [first-person](https://github.com/playcanvas/engine/blob/main/scripts/esm/first-person-controller.mjs) and [third-person](https://github.com/playcanvas/engine/blob/main/scripts/esm/third-person-controller.mjs) controller scripts.

## Kinematic Motion {#kinematic-motion}

Kinematic bodies ignore forces, impulses and velocities. You move them by moving the entity, and the physics engine reads the new transform at the start of each step. Dynamic bodies standing on a kinematic platform are carried along with it:

```javascript
// Slide a platform back and forth along the world X axis
let time = 0;
app.on('update', (dt) => {
    time += dt;
    platform.setPosition(Math.sin(time) * 2, 0.5, 0);
});
```

:::tip

[Damping and factors](/user-manual/physics/rigid-bodies/#damping-and-factors) shape how a body responds to everything on this page. Damping slows a body over time, and a factor of 0 on an axis stops it moving or rotating about that axis, which is how you keep a character upright or confine a body to a 2D plane.

:::

## See Also

- [Rigid Bodies](/user-manual/physics/rigid-bodies/) - Body types, mass, damping and factors
- [Collision Events](/user-manual/physics/collision-events/) - Responding when bodies hit each other
- [Forces and Impulses](/tutorials/using-forces-on-rigid-bodies/) - Tutorial project that applies forces, impulses and torque to a rigid body
- [RigidBodyComponent](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html) - API reference for every method on this page

---
title: Rigid Bodies
description: Static, dynamic and kinematic rigid bodies, their mass, friction, restitution, damping and factor properties, sleeping, teleporting and collision groups.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A rigid body is an entity that takes part in the physics simulation. It needs two components: a [rigidbody](/user-manual/editor/scenes/components/rigidbody/) component, which decides how the physics engine treats the entity, and a [collision](/user-manual/editor/scenes/components/collision/) component, which gives it a shape. A rigidbody component without a collision component has nothing to collide with and does nothing. Shapes are covered on the [Collision Shapes](/user-manual/physics/collision-shapes/) page; this page is about the body itself.

## Body Types {#body-types}

The `type` of a rigid body decides who moves it:

- **Static** - Never moves. Use it for the ground, walls and anything else that is part of the environment. Static bodies are cheap, and the engine assumes they stay put.
- **Dynamic** - Fully simulated. It falls under gravity, responds to collisions, [forces and impulses](/user-manual/physics/forces-and-impulses/), and the physics engine owns its position and rotation.
- **Kinematic** - Moved by you, through the entity's transform. It pushes dynamic bodies out of its way but is not affected by them or by gravity. Use it for moving platforms, doors driven by animation and anything else that follows a script rather than the laws of physics.

Here is a one meter dynamic box that will fall onto whatever is below it:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const box = new pc.Entity('box');
box.addComponent('render', { type: 'box' });
box.addComponent('collision', { type: 'box' });
box.addComponent('rigidbody', { type: pc.BODYTYPE_DYNAMIC, mass: 2 });
box.setPosition(0, 5, 0);
app.root.addChild(box);
```

</TabItem>
<TabItem value="editor" label="Editor">

Select the entity, click **Add Component** and add both **Rigid Body** and **Collision** from the Physics group. Set the Rigid Body **Type** to **Dynamic**; the inspector then shows the mass and material properties described below. The default box collision shape, with half extents of 0.5, matches a one unit render box.

</TabItem>
<TabItem value="react" label="React">

```jsx
import { Entity } from '@playcanvas/react';
import { Render, Collision, RigidBody } from '@playcanvas/react/components';

<Entity name="box" position={[0, 5, 0]}>
  <Render type="box" />
  <Collision type="box" />
  <RigidBody type="dynamic" mass={2} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="box" position="0 5 0">
    <pc-render type="box"></pc-render>
    <pc-collision type="box"></pc-collision>
    <pc-rigid-body type="dynamic" mass="2"></pc-rigid-body>
</pc-entity>
```

</TabItem>
</Tabs>

<EngineExample id="physics/falling-shapes" title="Falling Shapes" />

## Mass and Materials {#mass-and-materials}

Four properties describe how heavy a body is and how its surface behaves in a contact:

| Property | Description |
| --- | --- |
| **Mass** | The mass of a dynamic body in kilograms. Heavier bodies need more force to accelerate and push lighter ones aside. Defaults to 1 and is ignored by static and kinematic bodies |
| **Friction** | How strongly the surface resists sliding, from 0 to 1. Defaults to 0.5 |
| **Rolling Friction** | Resistance to rolling, which stops spheres and cylinders from rolling forever. Defaults to 0 |
| **Restitution** | Bounciness, from 0 to 1. Defaults to 0. The values of the two bodies in a contact are multiplied together, so a ball with a restitution of 1 does not bounce on a floor with a restitution of 0 |

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
entity.rigidbody.mass = 5;
entity.rigidbody.friction = 0.8;
entity.rigidbody.rollingFriction = 0.1;
entity.rigidbody.restitution = 0.6;
```

</TabItem>
<TabItem value="editor" label="Editor">

Set **Mass**, **Friction**, **Rolling Friction** and **Restitution** on the [Rigid Body](/user-manual/editor/scenes/components/rigidbody/) component. Mass is only shown for dynamic bodies.

</TabItem>
<TabItem value="react" label="React">

```jsx
<RigidBody type="dynamic" mass={5} friction={0.8} rollingFriction={0.1} restitution={0.6} />
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-rigid-body type="dynamic" mass="5" friction="0.8" rolling-friction="0.1" restitution="0.6"></pc-rigid-body>
```

</TabItem>
</Tabs>

## Damping and Factors {#damping-and-factors}

Two pairs of properties shape how a dynamic body moves once it is in motion:

- **Linear Damping** and **Angular Damping** are the proportion of velocity a body loses each second, from 0 to 1, like air resistance. They default to 0.
- **Linear Factor** and **Angular Factor** scale movement and rotation per world axis. A factor of 0 locks that axis. Setting the angular factor to `0, 0, 0` keeps a character upright; a linear factor of `1, 1, 0` with an angular factor of `0, 0, 1` confines a body to the XY plane for a 2D game. They default to `1, 1, 1`.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// Slow the body down over time, like air resistance
entity.rigidbody.linearDamping = 0.2;
entity.rigidbody.angularDamping = 0.2;

// Keep a character upright: no rotation about any axis
entity.rigidbody.angularFactor = new pc.Vec3(0, 0, 0);

// Confine a body to the XY plane of a 2D game
entity.rigidbody.linearFactor = new pc.Vec3(1, 1, 0);
```

</TabItem>
<TabItem value="editor" label="Editor">

Set **Linear Damping**, **Angular Damping**, **Linear Factor** and **Angular Factor** on the [Rigid Body](/user-manual/editor/scenes/components/rigidbody/) component. They are shown for dynamic bodies only.

</TabItem>
<TabItem value="react" label="React">

```jsx
<RigidBody type="dynamic" linearDamping={0.2} angularDamping={0.2} angularFactor={[0, 0, 0]} />
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-rigid-body type="dynamic" linear-damping="0.2" angular-damping="0.2" angular-factor="0 0 0"></pc-rigid-body>
```

</TabItem>
</Tabs>

## Sleeping {#sleeping}

A dynamic body that comes to rest is put to sleep by the physics engine, which stops simulating it until something disturbs it. Applying a force, impulse or torque, assigning a velocity and teleporting all wake a body automatically, as does being hit by another body. You can also wake one yourself:

```javascript
if (!entity.rigidbody.isActive()) {
    entity.rigidbody.activate();
}
```

## Moving and Teleporting {#moving-and-teleporting}

The physics engine owns the position and rotation of a dynamic body, so anything you set on its entity's transform is overwritten on the next step. To move a dynamic body, apply [forces or velocities](/user-manual/physics/forces-and-impulses/), or call `teleport` on the rigidbody component when it has to jump somewhere, for example when respawning. Teleporting does not clear the body's velocity, so reset that first if the body should arrive at rest:

```javascript
// Move to a position, keeping the current rotation
entity.rigidbody.teleport(0, 10, 0);

// Move and rotate, with the rotation given as Euler angles in degrees
entity.rigidbody.teleport(new pc.Vec3(0, 10, 0), new pc.Vec3(0, 90, 0));

// Respawn at rest: clear the old motion, then move and rotate with a quaternion
entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
entity.rigidbody.teleport(spawn.getPosition(), spawn.getRotation());
```

Kinematic bodies work the other way round. You move the entity with `setPosition`, `setRotation`, `lookAt` and the rest of the transform API, and the body follows on the next step, carrying any dynamic bodies that rest on it:

```javascript
// A platform that slides back and forth along the X axis
platform.setPosition(Math.sin(time) * 2, 0.5, 0);
```

Vector properties such as `linearVelocity` and `angularFactor` return read-only snapshots. Assign a new vector rather than editing the returned one.

These calls are the same wherever you build. In React, reach the entity with the [`useParent`](/user-manual/react/api/hooks/use-parent/) hook from a component placed inside the `<Entity>`; in Web Components, through the `entity` property of the [`<pc-entity>`](/user-manual/web-components/tags/pc-entity/) element. [Moving Bodies](/user-manual/physics/forces-and-impulses/#running-physics-code) shows where per-frame code runs on each surface.

## Collision Groups and Masks {#collision-groups-and-masks}

Every body belongs to a collision **group** and carries a **mask** of the groups it collides with. Two bodies interact only when each one's group is in the other's mask. The engine assigns both when the body type is set: dynamic bodies collide with everything, while static and kinematic bodies never collide with each other. You can narrow this from code to stop, for example, projectiles hitting one another:

```javascript
// Put the body in a user group and stop it colliding with other members of that group.
// Set these after the type, because changing the type resets them.
entity.rigidbody.group = pc.BODYGROUP_USER_1;
entity.rigidbody.mask = pc.BODYMASK_ALL ^ pc.BODYGROUP_USER_1;
```

Eight user groups, `pc.BODYGROUP_USER_1` to `pc.BODYGROUP_USER_8`, are free for your own use. The same groups and masks filter [ray casts](/user-manual/physics/ray-casting/#filtering-ray-casts).

## See Also

- [Collision Shapes](/user-manual/physics/collision-shapes/) - The shape every rigid body needs
- [Moving Bodies](/user-manual/physics/forces-and-impulses/) - Forces, impulses, torque and velocity
- [Rigid Body Component](/user-manual/editor/scenes/components/rigidbody/) - Editor reference for every property
- [RigidBodyComponent](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html) - API reference
- [Creating Rigid Bodies in Code](/tutorials/creating-rigid-bodies-in-code/) - Tutorial that adds both components from a script

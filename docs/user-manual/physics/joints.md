---
title: Joints
description: Constrain rigid bodies to each other with fixed, ball, hinge, slider and 6dof joints using the alpha JointComponent, with limits, motors, springs and breakable constraints.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning[Alpha]

The joint component is in alpha, so its behavior and API may change. It is available from code on every surface and as a tag in Web Components, but the Editor does not yet have an inspector for it and PlayCanvas React has no component for it.

:::

Joints constrain the relative motion of two rigid bodies: a door swinging on its hinge, a drawer sliding on its runner, a chain of links, a crate bobbing on a spring, or a tower of blocks welded together until something hits it hard enough to break the weld.

<EngineExample id="physics/joints" title="Joints" />

## How Joints Work {#how-joints-work}

A joint is a [JointComponent](https://api.playcanvas.com/engine/classes/JointComponent.html) on its own entity. That entity is **not** constrained itself. Its world transform defines the *joint frame*: the position is the anchor point the constraint operates about, and the local X axis is the primary axis. A hinge rotates about X, a slider translates along X and a ball joint twists about X. To aim a joint, rotate the joint entity.

The two bodies being constrained are set with `entityA` and `entityB`, both of which need a [rigidbody component](/user-manual/physics/rigid-bodies/). Leave `entityB` empty to constrain `entityA` to a fixed point in world space, which is how you hang something from nothing. A common arrangement is to parent the joint entity to `entityA` at the pivot point, so the pivot moves with the part it belongs to.

Two details catch people out:

- **Frames are captured once**, when the constraint is created. That usually happens when the component is enabled and both bodies are in the simulation. Moving the joint entity afterwards changes nothing until you call `refreshFrames()` on the component, which re-captures the frames from the current transforms. Entity scale is ignored throughout, as it is for rigid bodies.
- **Limits are measured from the starting pose**, not from the joint entity. The two joint frames coincide at the moment the constraint is created, so every degree of freedom reads zero there. Hinge limits of `0` to `110` degrees mean "from wherever the body started, up to 110 degrees further", not an absolute angle.

## Joint Types {#joint-types}

The `type` property selects the constraint and decides which of the other properties matter:

| Type | Constant | Constrains | Properties it uses |
| --- | --- | --- | --- |
| `fixed` | `JOINTTYPE_FIXED` | Locks the bodies rigidly together | none |
| `ball` | `JOINTTYPE_BALL` | Ball and socket: free rotation about the anchor, with optional swing and twist limits | `swingLimitY`, `swingLimitZ`, `twistLimit` |
| `hinge` | `JOINTTYPE_HINGE` | Rotation about the frame's X axis, with optional limits and a motor | `limits`, `motorSpeed`, `maxMotorForce` |
| `slider` | `JOINTTYPE_SLIDER` | Translation along the frame's X axis, with optional limits and a motor | `limits`, `motorSpeed`, `maxMotorForce` |
| `6dof` | `JOINTTYPE_6DOF` | Each linear and angular axis independently locked, limited or free, with optional springs | `linearMotionX/Y/Z`, `angularMotionX/Y/Z`, `linearLimitsX/Y/Z`, `angularLimitsX/Y/Z`, `linearStiffness`, `angularStiffness`, `linearDamping`, `angularDamping`, `linearEquilibrium`, `angularEquilibrium` |

Every type also honors `enableCollision`, which decides whether the two bodies still collide with each other (off by default), and `breakImpulse`.

For a `6dof` joint each axis starts `MOTION_LOCKED`, so a joint with nothing else set behaves like a fixed one. Open the axes you want with `MOTION_FREE` or `MOTION_LIMITED`, bound the limited ones with the matching limits, and set a stiffness above zero on an axis to turn it into a spring that pulls towards its equilibrium value.

## Adding a Joint {#adding-a-joint}

This door hinge constrains a dynamic door to a static frame. The joint entity sits on the hinge line, rotated so that its local X axis points up, and limits of `0` to `110` degrees let the door open one way only:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const hinge = new pc.Entity('hinge');
hinge.setPosition(1, 1, 0);
hinge.setEulerAngles(0, 0, 90); // the local X axis now points up
hinge.addComponent('joint', {
    type: pc.JOINTTYPE_HINGE,
    entityA: door,
    entityB: doorFrame,
    enableLimits: true,
    limits: new pc.Vec2(0, 110)
});
app.root.addChild(hinge);
```

`pc.Application` registers the joint component system for you. If you build from `pc.AppBase`, add `pc.JointComponentSystem` to `AppOptions.componentSystems` alongside the collision and rigid body systems.

</TabItem>
<TabItem value="editor" label="Editor">

There is no Joint inspector yet, so add the component from a script attached to the hinge entity. Position and rotate the entity in the viewport as usual, then assign the two bodies to the script's attributes:

```javascript
import { Script, Vec2, JOINTTYPE_HINGE } from 'playcanvas';

export class DoorHinge extends Script {
    static scriptName = 'doorHinge';

    /**
     * The door, a dynamic rigid body.
     *
     * @attribute
     * @type {Entity}
     */
    door;

    /**
     * The frame the door hangs from, a static rigid body.
     *
     * @attribute
     * @type {Entity}
     */
    frame;

    initialize() {
        this.entity.addComponent('joint', {
            type: JOINTTYPE_HINGE,
            entityA: this.door,
            entityB: this.frame,
            enableLimits: true,
            limits: new Vec2(0, 110)
        });
    }
}
```

</TabItem>
<TabItem value="react" label="React">

There is no `<Joint>` component yet. Add the engine component from an effect inside the hinge `<Entity>` once physics has loaded, using refs to reach the two bodies:

```jsx
import { useEffect, useRef } from 'react';
import { JOINTTYPE_HINGE, Vec2 } from 'playcanvas';
import { Entity } from '@playcanvas/react';
import { useParent, usePhysics } from '@playcanvas/react/hooks';

function Hinge({ door, frame }) {
  const entity = useParent();
  const { isPhysicsLoaded } = usePhysics();

  useEffect(() => {
    if (!isPhysicsLoaded || !door.current || !frame.current) return;
    entity.addComponent('joint', {
      type: JOINTTYPE_HINGE,
      entityA: door.current,
      entityB: frame.current,
      enableLimits: true,
      limits: new Vec2(0, 110)
    });
    return () => entity.removeComponent('joint');
  }, [entity, isPhysicsLoaded, door, frame]);

  return null;
}

function Door() {
  const door = useRef();
  const frame = useRef();
  return (
    <>
      <Entity ref={frame} name="frame" position={[1, 1, 0]}>{/* collision and static rigid body */}</Entity>
      <Entity ref={door} name="door" position={[1.9, 1, 0]}>{/* collision and dynamic rigid body */}</Entity>
      <Entity name="hinge" position={[1, 1, 0]} rotation={[0, 0, 90]}>
        <Hinge door={door} frame={frame} />
      </Entity>
    </>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="hinge" position="1 1 0" rotation="0 0 90">
    <pc-joint type="hinge" entity-a="#door" entity-b="#door-frame"
              enable-limits limits="0 110"></pc-joint>
</pc-entity>
```

See the [`<pc-joint>`](/user-manual/web-components/tags/pc-joint/) reference for every attribute and a live example of each joint type.

</TabItem>
</Tabs>

## Motors, Limits and Breaking {#motors-limits-and-breaking}

Limits are opt-in twice over: they need `enableLimits` set **and** a limit value. A hinge with `limits` set but `enableLimits` left false swings freely.

Hinges and sliders have a motor. It is engaged while `maxMotorForce` is greater than zero and drives the joint at `motorSpeed`, in degrees per second for a hinge and units per second for a slider. A motor with limits enabled stalls against the stop.

```javascript
// A windmill: spin the rotor about the hinge axis at 90 degrees per second
hinge.joint.motorSpeed = 90;
hinge.joint.maxMotorForce = 100;
```

Any joint can break. Set `breakImpulse` to the impulse above which the constraint gives way; it defaults to `Infinity`, meaning it never breaks. When it does, the component fires a `break` event, `isBroken` becomes true and the bodies move independently. Calling `refreshFrames()` re-attaches the joint from the bodies' current transforms.

```javascript
const weld = jointEntity.joint;
weld.breakImpulse = 60;
weld.on('break', () => {
    console.log('The weld snapped');
});
```

:::note

Breaking cannot be detected for `6dof` joints on ammo.js builds that do not expose constraint state, so the `break` event does not fire for them. The other joint types are unaffected.

:::

## See Also

- [JointComponent](https://api.playcanvas.com/engine/classes/JointComponent.html) - API reference for every joint property
- [`<pc-joint>`](/user-manual/web-components/tags/pc-joint/) - The same joints in Web Components, with a live example of each type
- [Ragdoll](https://playcanvas.github.io/#/physics/ragdoll) - Engine example that builds a character from ball and hinge joints
- [Rigid Bodies](/user-manual/physics/rigid-bodies/) - The bodies every joint constrains

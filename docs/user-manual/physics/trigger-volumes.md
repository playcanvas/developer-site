---
title: Trigger Volumes
description: Detect when dynamic or kinematic rigid bodies enter and leave a region with a collision component that has no rigid body, and respond to triggerenter and triggerleave events.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Trigger volumes are collision shapes that fire events whenever a rigid body enters or leaves them, without physically blocking anything. They are useful for detecting when a goal has been scored, when a race car crosses the finish line or when the player walks into a room.

## Creating a Trigger Volume {#creating-a-trigger-volume}

A trigger is simply a [collision](/user-manual/editor/scenes/components/collision/) component on an entity that has no rigidbody component. Any [collision shape](/user-manual/physics/collision-shapes/) works, including mesh and compound shapes. Here is a box-shaped goal mouth:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const goal = new pc.Entity('goal');
goal.addComponent('collision', {
    type: 'box',
    halfExtents: new pc.Vec3(2, 1, 0.5)
});
goal.setPosition(0, 1, -10);
app.root.addChild(goal);
```

</TabItem>
<TabItem value="editor" label="Editor">

Add a **Collision** component to the entity and set its shape, but do not add a **Rigid Body** component. The Editor draws the shape in the viewport while the entity is selected, which makes it easy to size the volume against the scene.

</TabItem>
<TabItem value="react" label="React">

```jsx
<Entity name="goal" position={[0, 1, -10]}>
  <Collision type="box" halfExtents={[2, 1, 0.5]} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="goal" position="0 1 -10">
    <pc-collision type="box" half-extents="2 1 0.5"></pc-collision>
</pc-entity>
```

</TabItem>
</Tabs>

Because a trigger has no rigid body, you move it like any other entity, with `setPosition`, `setRotation` and the rest of the [Entity](https://api.playcanvas.com/engine/classes/Entity.html) transform API. The physics engine picks up the new transform on its next step.

## Listening for Trigger Events {#listening-for-trigger-events}

The trigger's collision component fires `triggerenter` when a rigid body starts overlapping the volume and `triggerleave` when it stops. Both events pass the entity of the body that entered or left:

```javascript
goal.collision.on('triggerenter', (entity) => {
    console.log(`${entity.name} has entered ${goal.name}.`);
});

goal.collision.on('triggerleave', (entity) => {
    console.log(`${entity.name} has left ${goal.name}.`);
});
```

The rigid body on the other side receives the same two events from its own collision and rigidbody components. Its handlers are passed the trigger entity instead, which lets a body react to the volumes it passes through:

```javascript
player.rigidbody.on('triggerenter', (trigger) => {
    if (trigger.tags.has('checkpoint')) {
        lastCheckpoint = trigger.getPosition().clone();
    }
});
```

Subscribing works exactly as it does for collision events: `on` returns an [EventHandle](https://api.playcanvas.com/engine/classes/EventHandle.html) whose `off()` method removes the listener, or you can pass the same callback to `off(eventName, callback)` on the component. [Collision Events](/user-manual/physics/collision-events/#listening-for-collisions) shows where to put that code in the Editor, in React and in Web Components.

## What Can Trigger a Volume {#what-can-trigger-a-volume}

Only dynamic and kinematic rigid bodies fire trigger events. Static bodies never move, so they are excluded from the overlap tests, and one trigger cannot detect another. If a trigger appears not to fire, check that the entity passing through it has a rigidbody component whose type is Dynamic or Kinematic.

Trigger overlaps never fire the `contact`, `collisionstart` or `collisionend` events. Those are reserved for physical contacts between rigid bodies and are described in [Collision Events](/user-manual/physics/collision-events/).

## See Also

- [Collision Events](/user-manual/physics/collision-events/) - Events for physical contacts between rigid bodies, and where to subscribe on each surface
- [Collision Shapes](/user-manual/physics/collision-shapes/) - The shapes a trigger can take
- [Collision and Triggers](/tutorials/collision-and-triggers/) - Tutorial that resets falling bodies with a trigger

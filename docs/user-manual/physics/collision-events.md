---
title: Collision Events
description: Respond to physical contacts between rigid bodies with the contact, collisionstart and collisionend events, read contact points and impulses, and listen for every contact in the scene.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When two rigid bodies touch, the physics engine reports the contact to both entities. You can respond by playing a sound, applying damage, spawning particles or changing game state. The events are fired on both the [collision](/user-manual/editor/scenes/components/collision/) and the [rigidbody](/user-manual/editor/scenes/components/rigidbody/) components of each entity involved, so you can listen on whichever is more convenient.

## Events {#events}

| Event | When it fires | Handler argument |
| --- | --- | --- |
| `collisionstart` | Once, on the physics step in which two bodies begin touching | [ContactResult](https://api.playcanvas.com/engine/classes/ContactResult.html) |
| `contact` | Every physics step while the bodies remain in contact | [ContactResult](https://api.playcanvas.com/engine/classes/ContactResult.html) |
| `collisionend` | Once, when the bodies stop touching | The other [Entity](https://api.playcanvas.com/engine/classes/Entity.html) |

Contacts are only reported when at least one of the two bodies is dynamic. Static and kinematic bodies never collide with each other. Overlaps with a [trigger volume](/user-manual/physics/trigger-volumes/) fire `triggerenter` and `triggerleave` instead of these events.

## Listening for Collisions {#listening-for-collisions}

Subscribe with `on`, which returns an [EventHandle](https://api.playcanvas.com/engine/classes/EventHandle.html). Keep that handle and call its `off()` method when the listener is no longer needed; passing the same callback to `off(eventName, callback)` on the component, as described in [Events](/user-manual/scripting/events/), removes the listener too. Use `collisionstart` for one-off reactions such as an impact sound, and `contact` when you need the contact details refreshed every step:

```javascript
const handle = entity.collision.on('collisionstart', (result) => {
    console.log(`${entity.name} hit ${result.other.name}`);
});

// Later, when the entity is destroyed or the listener is no longer wanted
handle.off();
```

Where that code lives depends on how you build:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

Subscribe once the entity has its components, as above, or from a Script attached to the entity as shown in the Editor tab. Scripts are covered in the [Scripting](/user-manual/scripting/) section.

</TabItem>
<TabItem value="editor" label="Editor">

Add a Script component to the entity and attach a script that subscribes in `initialize` and unsubscribes when it is destroyed:

```javascript
import { Script } from 'playcanvas';

export class ImpactSound extends Script {
    static scriptName = 'impactSound';

    initialize() {
        const handle = this.entity.collision.on('collisionstart', this.onCollisionStart, this);
        this.on('destroy', () => handle.off());
    }

    onCollisionStart(result) {
        // Play the 'hit' slot of a Sound component on the same entity
        this.entity.sound.play('hit');
    }
}
```

The third argument to `on` binds `this` inside the handler to the script instance.

</TabItem>
<TabItem value="react" label="React">

Place a component inside the `<Entity>`, after its `<Collision>`, and subscribe in an effect once physics has loaded:

```jsx
import { useEffect } from 'react';
import { useParent, usePhysics } from '@playcanvas/react/hooks';

function ImpactSound() {
  const entity = useParent();
  const { isPhysicsLoaded } = usePhysics();

  useEffect(() => {
    if (!isPhysicsLoaded || !entity.collision) return;
    const handle = entity.collision.on('collisionstart', (result) => {
      console.log(`${entity.name} hit ${result.other.name}`);
    });
    return () => handle.off();
  }, [entity, isPhysicsLoaded]);

  return null;
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

Attach the same `ImpactSound` script shown in the Editor tab with [`<pc-script>`](/user-manual/web-components/tags/pc-script/), or subscribe from page JavaScript through the element's `entity` property once the app is ready:

```html
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    await whenReady('pc-app');
    const { entity } = document.querySelector('pc-entity[name="crate"]');
    entity.collision.on('collisionstart', (result) => {
        console.log(`${entity.name} hit ${result.other.name}`);
    });
</script>
```

See [Programmatic Access](/user-manual/web-components/programmatic-access/) for how `whenReady` works.

</TabItem>
</Tabs>

## Contact Data {#contact-data}

`collisionstart` and `contact` pass a [ContactResult](https://api.playcanvas.com/engine/classes/ContactResult.html) with two properties:

- `other` - The entity this body collided with.
- `contacts` - An array of [ContactPoint](https://api.playcanvas.com/engine/classes/ContactPoint.html) objects, one for each point where the two shapes touch.

Each contact point holds:

| Property | Description |
| --- | --- |
| `point` | The contact point on this entity, in world space |
| `pointOther` | The contact point on the other entity, in world space |
| `localPoint` | The contact point in the local space of this entity |
| `localPointOther` | The contact point in the local space of the other entity |
| `normal` | The contact normal in world space. It points away from the surface of the other entity at the point of contact |
| `impulse` | The impulse the physics engine applied to separate the bodies. Larger values mean a harder hit |

The impulse is a handy measure of how hard two bodies collided. Use it to scale a sound's volume or the damage dealt, and to ignore glancing touches:

```javascript
entity.collision.on('collisionstart', (result) => {
    let strongest = 0;
    for (const contact of result.contacts) {
        strongest = Math.max(strongest, contact.impulse);
    }
    if (strongest > 5) {
        entity.sound.play('crash');
    }
});
```

## Scene-wide Contacts {#scene-wide-contacts}

To handle every contact in one place, for example in a central audio or damage manager, listen to the `contact` event on the rigid body component system instead of on individual entities. It fires once per contact point with a [SingleContactResult](https://api.playcanvas.com/engine/classes/SingleContactResult.html) that names both entities:

```javascript
app.systems.rigidbody.on('contact', (result) => {
    // result.a and result.b are the two entities
    // result.pointA, result.pointB and result.normal are in world space
    if (result.impulse > 5) {
        console.log(`${result.a.name} and ${result.b.name} collided hard`);
    }
});
```

:::tip

`contact` fires every physics step for as long as two bodies touch, which for a box resting on the floor means every frame. Prefer `collisionstart` for one-shot effects and keep `contact` handlers cheap.

:::

## See Also

- [Trigger Volumes](/user-manual/physics/trigger-volumes/) - Overlap events for regions that do not block movement
- [Collision and Triggers](/tutorials/collision-and-triggers/) - Tutorial that plays a sound on impact
- [Events](/user-manual/scripting/events/) - How the scripting event system works
- [CollisionComponent](https://api.playcanvas.com/engine/classes/CollisionComponent.html) and [RigidBodyComponent](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html) - API reference for the events on each component

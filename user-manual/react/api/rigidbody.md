# `<Rigidbody/>`

The `<Rigidbody/>` component gives an [`<Entity/>`](https://developer.playcanvas.com/user-manual/react/api/entity.md) physical properties such as mass, velocity, and friction and allows it to interact with the global physics simulation. An `<Entity/>` with a `<Rigidbody/>` will respond to gravity, forces, torques and other physics behaviors.

You can learn more about how the physics system works in PlayCanvas in the [Physics docs](https://developer.playcanvas.com/user-manual/physics.md) and for React specific details, see the guide on [React Physics](https://developer.playcanvas.com/user-manual/react/guide/physics.md).

## Getting started

:::tip

Using physics in PlayCanvas requires ammo.js and `<Application usePhysics/>` to be enabled. Run `npm i sync-ammo` from within your app.

:::

To use the `<Rigidbody/>` component, you need to install the `sync-ammo` dependency and you need to add the [`<Application usePhysics/>`](https://developer.playcanvas.com/user-manual/react/api/application.md) prop set in your root [`<Application/>`](https://developer.playcanvas.com/user-manual/react/api/application.md) component. This will enable the physics system and allow your entities to interact with the physics simulation.

Check out the guide on [React Physics](https://developer.playcanvas.com/user-manual/react/guide/physics.md) for more information.

## Usage

Add a `<Rigidbody/>` component to an [`<Entity/>`](https://developer.playcanvas.com/user-manual/react/api/entity.md). You'll also need to add a [`<Collision/>`](https://developer.playcanvas.com/user-manual/react/api/collision.md) component to the entity to define the shape of the rigid body.

```jsx
<Application usePhysics>
  <Entity>
    <Rigidbody type="box" />
  </Entity>
</Application>
```

**Interactive Physics Example**

```jsx title="rigidbody-example.jsx"
import { useState } from 'react'
import { Entity } from '@playcanvas/react'
import { RigidBody, Collision, Render } from '@playcanvas/react/components'
import { useMaterial } from '@playcanvas/react/hooks'
import { math } from 'playcanvas'
// ↑ imports hidden

const Box = ({ color, ...entityProps  }) => {
  const material = useMaterial({ diffuse: color })
  return (
    <Entity {...entityProps}>
      <RigidBody type="dynamic" mass={1} restitution={0.2} friction={0.5} />
      <Collision type="box" />
      <Render type="box" material={material} />
    </Entity>
  )
}

export const RigidbodyExample = () => {
  const [boxes, setBoxes] = useState([
    { id: 1, position: [0, 20, 0], color: '#e74c3c' },
    { id: 2, position: [0.5, 8, 0], color: '#3498db' },
    { id: 3, position: [-0.5, 11, 0], color: '#2ecc71' }
  ])

  const addBox = () => {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c']
    const color = colors[Math.floor(math.random(0, colors.length))]
    const box = {
      id: Date.now(),
      position: [math.random(-2, 2), 5, math.random(-2, 2)],
      rotation: [math.random(0, 360), math.random(0, 360), math.random(0, 360)],
      color
    }
    setBoxes([...boxes, box])
  }

  return (<>
    {/* Ground plane */}
    <Entity key="ground" position={[0, -0.6, 0]} scale={[10, 0.1, 10]}>
      <RigidBody type="static" friction={0.5} />
      <Collision type="box" halfExtents={[5, 0.1, 5]} />
    </Entity>

    {/* Falling boxes */}
    { boxes.map((props) => <Box key={props.id} {...props} />) }

    {/* UI */}
    <div className="overlay">
      <button onClick={addBox}>Add Box</button>
    </div>
  </>)
}
```

Learn more about the [RigidBody Component](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html) in the PlayCanvas documentation.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `type?` | `"dynamic" \| "kinematic" \| "static"` | `"static"` | Sets the rigid body type determines how the body is simulated. |
| `angularDamping?` | `number` | - | Sets the rate at which a body loses angular velocity over time. Gets the rate at which a body loses angular velocity over time. |
| `angularFactor?` | `[number, number, number]` | - | Sets the scaling factor for angular movement of the body in each axis. Only valid for rigid bodies of type BODYTYPE_DYNAMIC. Defaults to 1 in all axes (body can freely rotate). Gets the scaling factor for angular movement of the body in each axis. Use the setter to update the physics body. |
| `angularVelocity?` | `[number, number, number]` | - | Sets the rotational speed of the body around each world axis. Gets the rotational speed of the body around each world axis. Use the setter to update the physics body. |
| `friction?` | `number` | - | Sets the friction value used when contacts occur between two bodies. A higher value indicates more friction. Should be set in the range 0 to 1. Defaults to 0.5. Gets the friction value used when contacts occur between two bodies. |
| `group?` | `number` | - | Sets the collision group this body belongs to. Combine the group and the mask to prevent bodies colliding with each other. The default depends on the body RigidBodyComponent#type : 1 for dynamic bodies, 2 for static bodies and 4 for kinematic bodies. Setting the type resets the group to the default for the new type, so set the group after the type. Gets the collision group this body belongs to. |
| `linearDamping?` | `number` | - | Sets the rate at which a body loses linear velocity over time. Defaults to 0. Gets the rate at which a body loses linear velocity over time. |
| `linearFactor?` | `[number, number, number]` | - | Sets the scaling factor for linear movement of the body in each axis. Only valid for rigid bodies of type BODYTYPE_DYNAMIC. Defaults to 1 in all axes (body can freely move). Gets the scaling factor for linear movement of the body in each axis. Use the setter to update the physics body. |
| `linearVelocity?` | `[number, number, number]` | - | Sets the speed of the body in a given direction. Gets the speed of the body in a given direction. Use the setter to update the physics body. |
| `mask?` | `number` | - | Sets the collision mask sets which groups this body collides with. It is a bit field of 16 bits, the first 8 bits are reserved for engine use. The default depends on the body RigidBodyComponent#type : 65533 for static bodies, which collides with everything except other static bodies, and 65535 for dynamic and kinematic bodies, which collides with everything. Setting the type resets the mask to the default for the new type, so set the mask after the type. Gets the collision mask sets which groups this body collides with. |
| `mass?` | `number` | - | Sets the mass of the body. This is only relevant for BODYTYPE_DYNAMIC bodies, other types have infinite mass. Defaults to 1. Gets the mass of the body. |
| `restitution?` | `number` | - | Sets the value that controls the amount of energy lost when two rigid bodies collide. The calculation multiplies the restitution values for both colliding bodies. A multiplied value of 0 means that all energy is lost in the collision while a value of 1 means that no energy is lost. Should be set in the range 0 to 1. Defaults to 0. Gets the value that controls the amount of energy lost when two rigid bodies collide. |
| `rollingFriction?` | `number` | - | Sets the torsional friction orthogonal to the contact point. Defaults to 0. Gets the torsional friction orthogonal to the contact point. |
| `system?` | `ComponentSystem` | - | The ComponentSystem used to create this Component. |
| `entity?` | `Entity` | - | The Entity that this Component is attached to. |
| `enabled?` | `boolean` | - | Sets the enabled state of the component. Gets the enabled state of the component. |

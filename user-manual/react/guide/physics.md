# Physics

PlayCanvas ships with a robust [physics system](https://developer.playcanvas.com/user-manual/physics.md). This enables realistic simulations of objects in 3D space, including gravity, collisions, forces and constraints. The physics system is powered by the [ammo.js](https://github.com/kripken/ammo.js) physics engine.

## Getting started

PlayCanvas uses ammo.js as the physics engine. ammo.js is a WASM library and in React it's lazy loaded. This means you're only shipping ammo.js when you need it, helping you keep your bundle size down. It also means you can render something before ammo.js has loaded, or maybe you only need physics as a result of some user interaction. In any case, lazy loading ammo.js means you can get your content rendering fast.

To use the physics system, you'll need to install the `sync-ammo` dependency.

```bash
npm install sync-ammo
```

You'll also need to add the `<Application usePhysics/>` prop to your root `<Application/>` component.

:::tip

PlayCanvas React will only load ammo.js when you have the `<Application usePhysics/>` prop set.

:::

```jsx
<Application usePhysics>
  <Entity>
    <Rigidbody type="box" />
  </Entity>
</Application>
```

## Usage

You allow entities to participate in physics simulation by adding a `RigidBody` and `Collision` component to them. In the example below, we're creating a static ground, a falling sphere and a falling box.

**Objects falling under gravity**

```jsx title="basic-physics.jsx"
import { Entity } from '@playcanvas/react';
import { RigidBody, Collision, Render } from '@playcanvas/react/components';
import { useMaterial } from '@playcanvas/react/hooks';
import { math } from 'playcanvas';

// ↑ imports hidden
export const BasicPhysics = () => {

  const sphereMaterial = useMaterial({ diffuse: 'red' });
  const boxMaterial = useMaterial({ diffuse: '#4ecdc4' });

  return (<>
    {/* Ground (static) */}
    <Entity name="ground" position={[0, -0.6, 0]} scale={[100, 0.1, 100]}>
      <RigidBody type="static" friction={0.5} />
      <Collision type="box" halfExtents={[50, 0.1, 50]} />
    </Entity>

    {/* Falling sphere */}
    <Entity name="sphere" position={[0, 6, 0]}>
      <RigidBody type="dynamic" mass={1} />
      <Collision type="sphere" />
      <Render type="sphere" material={sphereMaterial} />
    </Entity>

    {/* Falling box */}
    <Entity name="box" 
      position={[0.1, 8, 0]} 
      rotation={[math.random(0, 360), math.random(0, 360), math.random(0, 360)]}
    >
      <RigidBody type="dynamic" mass={2} />
      <Collision type="box" />
      <Render type="box" material={boxMaterial} />
    </Entity>
  </>);
};
```

### Physics Properties

You can customize physics behavior by changing the various properties of the [`<RigidBody/>`](https://developer.playcanvas.com/user-manual/react/api/rigidbody.md) and [`<Collision/>`](https://developer.playcanvas.com/user-manual/react/api/collision.md) components. Check out the [Physics documentation](https://developer.playcanvas.com/user-manual/physics.md) for more information.

```jsx
<RigidBody 
  type="dynamic"
  mass={1}                // Object mass
  linearDamping={0.1}     // Air resistance for movement
  angularDamping={0.1}    // Air resistance for rotation
  friction={0.5}          // Surface friction
  restitution={0.3}       // Bounciness (0 = no bounce, 1 = perfect bounce)
/>
```

```jsx
<Collision 
  type="box"
  halfExtents={[1, 1, 1]} // Size for box collision
  radius={0.5}            // Radius for sphere/cylinder collision
  height={2}              // Height for capsule/cylinder collision
/>
```

## The `usePhysics` Hook

Because the physics engine is lazily instantiated you'll want to handle this in a reactive way. This is where the `usePhysics` hook comes in.

```jsx
import { usePhysics } from '@playcanvas/react/hooks';

const PhysicsStatus = () => {
  const { isPhysicsEnabled, isPhysicsLoaded, physicsError } = usePhysics();
  // ...
};
```

The `usePhysics` hook provides information about the physics engine state. You can read more about the [`usePhysics`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-physics.md) hook in the API reference.

For more detailed information about PlayCanvas physics, see the [PlayCanvas physics](https://developer.playcanvas.com/user-manual/physics.md) docs.

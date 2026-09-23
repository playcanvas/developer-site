# Getting Started

PlayCanvas physics is powered by [ammo.js](https://github.com/kripken/ammo.js), a port of the open source Bullet physics engine to WebAssembly. Once it is loaded, you build a simulation out of entities that carry a [rigidbody](https://developer.playcanvas.com/user-manual/editor/scenes/components/rigidbody.md) component, which decides how the entity moves, and a [collision](https://developer.playcanvas.com/user-manual/editor/scenes/components/collision.md) component, which gives it a shape. This page covers loading the library, the global settings, and the rules that every other page in this section builds on.

## Enabling Physics

Physics is opt-in. ammo.js weighs in at several hundred kilobytes, so nothing loads it unless you ask. It is distributed as three files: the WebAssembly module `ammo.wasm.wasm`, its JavaScript glue `ammo.wasm.js`, and `ammo.js`, an asm.js fallback for browsers without WebAssembly support. Until the library is present, physics components are inert placeholders: adding them does nothing and raises no errors.

**Engine**

Load the module before creating the application. The three files ship with the engine repository under `examples/assets/wasm/ammo/` and in the [sync-ammo](https://www.npmjs.com/package/sync-ammo) npm package.

```javascript
pc.WasmModule.setConfig('Ammo', {
    glueUrl: 'ammo/ammo.wasm.js',
    wasmUrl: 'ammo/ammo.wasm.wasm',
    fallbackUrl: 'ammo/ammo.js'
});

// Wait for the module, then create the application as usual
await new Promise((resolve) => {
    pc.WasmModule.getInstance('Ammo', () => resolve());
});

const app = new pc.Application(canvas);
```

The rigid body system finds the `Ammo` global as the application starts and installs the ammo.js backend. `pc.Application` registers every component system for you; if you build from `pc.AppBase` and `pc.AppOptions` instead, add `pc.CollisionComponentSystem` and `pc.RigidBodyComponentSystem` (and `pc.JointComponentSystem` for [joints](https://developer.playcanvas.com/user-manual/physics/joints.md)) to `componentSystems`. The [Falling Shapes](https://playcanvas.github.io/#/physics/falling-shapes) example shows the complete sequence.

**Editor**

Open the Scene Settings panel, expand **PHYSICS** and click **IMPORT AMMO**. This adds the three files from the PlayCanvas Store to your assets, and the engine loads them before your scene starts.

[Image: Physics Settings]

Until the library is imported, the [Collision](https://developer.playcanvas.com/user-manual/editor/scenes/components/collision.md) and [Rigid Body](https://developer.playcanvas.com/user-manual/editor/scenes/components/rigidbody.md) component inspectors show an *Ammo module not found* warning with the same button. To use your own build of ammo.js, add it as a [WASM module asset](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/wasm.md) instead of the Store version.

:::note[Legacy projects]

Projects created before ammo.js was distributed as module assets used a legacy copy of the library that the launcher injected automatically. If a project has no ammo.js assets but physics still works, this is why. Clicking **IMPORT AMMO** adds the module assets and turns the legacy library off at the same time, so a project never loads both. The imported build is newer, smaller and faster, so make the switch when you can.

:::

**React**

Install the module and set the `usePhysics` prop on your root `<Application>`:

```bash
npm install sync-ammo
```

```jsx
import { Application } from '@playcanvas/react';

<Application usePhysics>
  {/* entities with <RigidBody> and <Collision> components */}
</Application>
```

ammo.js is loaded lazily when `usePhysics` is set, so your scene renders before the library arrives and physics components activate once it has. The [`usePhysics`](https://developer.playcanvas.com/user-manual/react/api/hooks/use-physics.md) hook reports `isPhysicsLoaded` if you need to wait for that moment. See the [React physics guide](https://developer.playcanvas.com/user-manual/react/guide/physics.md) for details.

**Web Components**

Declare the module with a [`<pc-wasm>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-wasm.md) tag inside `<pc-app>`:

```html
<pc-app>
    <pc-wasm name="Ammo"
             glue="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.js"
             wasm="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.wasm"
             fallback="https://developer.playcanvas.com/assets/modules/ammo/ammo.js"></pc-wasm>
    <pc-scene>
        <!-- entities with <pc-rigid-body> and <pc-collision> components -->
    </pc-scene>
</pc-app>
```

The application waits for the module before it starts, so every physics tag in the scene works from the first frame.

## Gravity

Gravity is a constant acceleration applied to every dynamic rigid body. The default of -9.81 along the world's Y axis (straight down) approximates Earth. Set it to zero for a game in space, or to something smaller for the Moon.

**Engine**

```javascript
// Lunar gravity. The older setGravity() method is deprecated in favor of this property.
app.systems.rigidbody.gravity = new pc.Vec3(0, -1.62, 0);
```

**Editor**

Set **Gravity** in the **PHYSICS** section of the [Scene Settings](https://developer.playcanvas.com/user-manual/editor/interface/settings/physics.md) panel.

**React**

There is no gravity prop, so set it on the application from a component inside `<Application>`:

```jsx
import { useEffect } from 'react';
import { useApp } from '@playcanvas/react/hooks';

function LunarGravity() {
  const app = useApp();
  useEffect(() => {
    app.systems.rigidbody.gravity.set(0, -1.62, 0);
  }, [app]);
  return null;
}
```

**Web Components**

```html
<pc-scene gravity="0 -1.62 0">
    <!-- ... -->
</pc-scene>
```

## Units of Measurement

The physics engine interprets 1 unit as 1 meter and measures mass in kilograms. For objects to fall at a rate that looks right, size your scenes accordingly: a character who is 1.8 m tall should be 1.8 units high. Scenes built at a very different scale still simulate, but gravity will look too weak or too strong, and very small shapes are prone to tunneling through one another.

## How the Simulation Runs

A few rules follow from the way the engine drives the simulation, and the rest of this section relies on them:

- **The simulation steps at a fixed rate.** Each frame, the physics world advances in fixed steps of 1/60 of a second, taking as many as the frame time requires (up to a limit). Bodies therefore behave the same at 30 and at 144 frames per second. On displays faster than 60 Hz some frames run no step at all, and body transforms are interpolated so that motion stays smooth.
- **Physics owns dynamic bodies.** After each step the engine writes the position and rotation of every dynamic body back to its entity. Anything you set on the entity's transform is overwritten, so dynamic bodies are moved with forces, velocities or `teleport` instead (see [Rigid Bodies](https://developer.playcanvas.com/user-manual/physics/rigid-bodies.md#moving-and-teleporting)).
- **You own static and kinematic bodies.** Their transforms are read from the entity at the start of each step, so you move them like any other entity.
- **Events fire per step.** Collision and trigger events are reported once per physics step, not per frame. A body resting on the floor produces a `contact` event every step for as long as it rests there.

## See Also

- [Rigid Bodies](https://developer.playcanvas.com/user-manual/physics/rigid-bodies.md) - Body types and properties, the next thing to read
- [Collision Shapes](https://developer.playcanvas.com/user-manual/physics/collision-shapes.md) - Giving bodies a shape
- [Physics Settings](https://developer.playcanvas.com/user-manual/editor/interface/settings/physics.md) - The PHYSICS section of the Editor's scene settings
- [Collision and Triggers](https://developer.playcanvas.com/tutorials/collision-and-triggers/) - Tutorial that builds a complete physics scene in the Editor

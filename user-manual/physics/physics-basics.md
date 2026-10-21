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

Gravity is a constant acceleration applied to every dynamic rigid body. The default of -9.81 along the world's Y axis (straight down) approximates Earth. Set it to zero for a game in space, or to something smaller for the Moon. To change how strongly it pulls on individual bodies, give them a [gravity scale](https://developer.playcanvas.com/user-manual/physics/rigid-bodies.md#gravity-scale).

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
- **Physics owns dynamic bodies.** After each step the engine writes the position and rotation of every moving dynamic body back to its entity. Setting the entity's transform does not move the body, so dynamic bodies are moved with forces, velocities or `teleport` instead (see [Rigid Bodies](https://developer.playcanvas.com/user-manual/physics/rigid-bodies.md#moving-and-teleporting)).
- **You own kinematic bodies.** Their transforms are read from the entity at the start of each step, so you move them like any other entity.
- **Static bodies stay where they were created.** The engine reads a static body's position and rotation when the body is created and never checks them again, so moving the entity afterwards leaves the body behind. Anything that moves during play should be kinematic.
- **Bodies have no scale.** Only position and rotation pass from an entity to its body. Primitive collision shapes keep their size however the entity is scaled (see [Scale](https://developer.playcanvas.com/user-manual/physics/collision-shapes.md#scale)).
- **Events fire per step.** Collision and trigger events are reported once per physics step, not per frame. A body resting on the floor produces a `contact` event every step for as long as it rests there.

## Pausing and Slow Motion

The rigid body system's `timeScale` scales the time the simulation advances by each frame. It defaults to 1. Values below 1 run physics in slow motion and values above 1 speed it up. A value of 0 pauses it: bodies freeze in place and keep their velocities, kinematic bodies stop following their entities, and no collision or trigger events fire until it resumes. The rest of the application, including scripts and animation, keeps running, which suits a pause menu that must stay interactive while physics stands still.

**Engine**

```javascript
// Freeze physics while the pause menu is open
app.systems.rigidbody.timeScale = 0;

// Run physics at quarter speed for a slow motion effect
app.systems.rigidbody.timeScale = 0.25;
```

**Editor**

There is no setting for it in the Editor. Set it from a script, where `this.app` is the application:

```javascript
// Freeze physics while the pause menu is open
this.app.systems.rigidbody.timeScale = 0;
```

**React**

There is no prop for it, so set it on the application from a component inside `<Application>`:

```jsx
import { useEffect } from 'react';
import { useApp } from '@playcanvas/react/hooks';

function PhysicsTimeScale({ scale }) {
  const app = useApp();
  useEffect(() => {
    app.systems.rigidbody.timeScale = scale;
  }, [app, scale]);
  return null;
}

// Freeze physics while the pause menu is open
<PhysicsTimeScale scale={paused ? 0 : 1} />
```

**Web Components**

Set the `physics-time-scale` attribute of [`<pc-app>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-app.md). You can change it at any time, through the attribute or the element's `physicsTimeScale` property:

```html
<pc-app physics-time-scale="0">
    <!-- ... -->
</pc-app>
```

```javascript
// Resume at quarter speed for a slow motion effect
document.querySelector('pc-app').physicsTimeScale = 0.25;
```

The simulation still advances in fixed steps of 1/60 of a second. In slow motion a step runs only every few frames, and body transforms are interpolated in between, so motion stays smooth. Speeding up is limited by the number of steps the simulation can take in one frame: at 60 frames per second physics runs at most 10 times faster, and higher values run slower than requested.

The physics time scale applies on top of the application's `timeScale`, which scales the delta time that scripts, animation and physics all receive. Setting the application's to 0 stops everything that advances with time, while setting the rigid body system's to 0 stops physics alone.

Neither one pauses your scripts. Their `update` and `postUpdate` methods keep running every frame, with a `dt` of 0 while the application's time scale is 0, so input handling, spawning and any other logic that is not multiplied by `dt` carries on. Give gameplay code its own pause check. That includes physics calls: impulses and velocity changes made during a pause are applied straight away, and the body sets off with its new velocity when time resumes. Forces applied with `applyForce` while the physics time scale is 0 are not cleared until the simulation steps again, so a script that applies a force every frame builds up a large push that can be released all at once when physics resumes.

## Stepping Manually

`app.systems.rigidbody.step(dt)` advances the simulation by `dt` seconds immediately. It does everything the automatic update does: kinematic bodies and triggers follow their entities, the simulation runs as many fixed steps as `dt` covers, dynamic bodies are written back to their entities, and collision and trigger events fire. The time scale is not applied to `dt`.

Automatic stepping carries on while the time scale is above 0, so calling `step` every frame as well advances the simulation twice per frame. To take over stepping entirely, set the time scale to 0 first. That makes `step` a debugging tool, for example to advance a paused simulation one step per key press and watch a collision unfold frame by frame:

```javascript
const physics = app.systems.rigidbody;
physics.timeScale = 0;

window.addEventListener('keydown', (event) => {
    // Advance the paused simulation by one fixed step each time the period key is pressed
    if (event.key === '.') {
        physics.step(1 / 60);
    }
});
```

Passing the fixed step length of 1/60 runs exactly one step. A shorter `dt` may run no step at all and only move bodies along their interpolated paths, while a longer one runs several, up to 10 per call, and drops any time beyond that. Calling `step` several times in a row fast forwards the simulation, for example to let a pile of objects settle before the player sees it.

The code is the same on every surface; only the way you reach `app` differs. In an Editor script it is `this.app`, in React `useApp()` returns it, and in Web Components `whenReady('pc-app')` resolves with the `<pc-app>` element, whose `app` property holds it.

## See Also

- [Rigid Bodies](https://developer.playcanvas.com/user-manual/physics/rigid-bodies.md) - Body types and properties, the next thing to read
- [Collision Shapes](https://developer.playcanvas.com/user-manual/physics/collision-shapes.md) - Giving bodies a shape
- [RigidBodyComponentSystem](https://api.playcanvas.com/engine/classes/RigidBodyComponentSystem.html) - API reference for gravity, the time scale and manual stepping
- [Physics Settings](https://developer.playcanvas.com/user-manual/editor/interface/settings/physics.md) - The PHYSICS section of the Editor's scene settings
- [Collision and Triggers](https://developer.playcanvas.com/tutorials/collision-and-triggers/) - Tutorial that builds a complete physics scene in the Editor

# Components

A component gives an entity one ability. An entity with a camera component renders the scene, one with a light component lights it, and one with rigidbody and collision components falls, bounces and collides. Components hold the settings of their ability as properties, and an entity can have at most one component of each type.

## Built-in Components

Each name links to the component's reference on that surface. The engine name is the one you pass to `addComponent()`, and also the property that holds the component on its entity: `entity.camera`, `entity.rigidbody` and so on.

| Engine | Editor | React | Web Components | What it does |
| --- | --- | --- | --- | --- |
| [`anim`](https://api.playcanvas.com/engine/classes/AnimComponent.html) | [Anim](https://developer.playcanvas.com/user-manual/editor/scenes/components/anim.md) | [`<Anim>`](https://developer.playcanvas.com/user-manual/react/api/anim.md) | [`<pc-anim>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-anim.md) | Plays animations, blended by an [anim state graph](https://developer.playcanvas.com/user-manual/animation/anim-state-graph-assets.md) |
| [`animation`](https://api.playcanvas.com/engine/classes/AnimationComponent.html) | [Animation](https://developer.playcanvas.com/user-manual/editor/scenes/components/animation.md) | - | - | Legacy: plays animation clips. Use Anim |
| [`audiolistener`](https://api.playcanvas.com/engine/classes/AudioListenerComponent.html) | [Audio Listener](https://developer.playcanvas.com/user-manual/editor/scenes/components/audiolistener.md) | - | [`<pc-audio-listener>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-audio-listener.md) | The point that sounds are heard from |
| [`button`](https://api.playcanvas.com/engine/classes/ButtonComponent.html) | [Button](https://developer.playcanvas.com/user-manual/editor/scenes/components/button.md) | - | [`<pc-button>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-button.md) | Makes a UI element respond to hovers and clicks |
| [`camera`](https://api.playcanvas.com/engine/classes/CameraComponent.html) | [Camera](https://developer.playcanvas.com/user-manual/editor/scenes/components/camera.md) | [`<Camera>`](https://developer.playcanvas.com/user-manual/react/api/camera.md) | [`<pc-camera>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-camera.md) | Renders the scene from the entity's point of view |
| [`collision`](https://api.playcanvas.com/engine/classes/CollisionComponent.html) | [Collision](https://developer.playcanvas.com/user-manual/editor/scenes/components/collision.md) | [`<Collision>`](https://developer.playcanvas.com/user-manual/react/api/collision.md) | [`<pc-collision>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-collision.md) | Gives a rigid body or trigger volume its [shape](https://developer.playcanvas.com/user-manual/physics/collision-shapes.md) |
| [`element`](https://api.playcanvas.com/engine/classes/ElementComponent.html) | [Element](https://developer.playcanvas.com/user-manual/editor/scenes/components/element.md) | [`<Element>`](https://developer.playcanvas.com/user-manual/react/api/element.md) | [`<pc-element>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-element.md) | A rectangle of [user interface](https://developer.playcanvas.com/user-manual/user-interface.md): an image, text or group |
| [`gsplat`](https://api.playcanvas.com/engine/classes/GSplatComponent.html) | [GSplat](https://developer.playcanvas.com/user-manual/editor/scenes/components/gsplat.md) | [`<GSplat>`](https://developer.playcanvas.com/user-manual/react/api/gsplat.md) | [`<pc-gsplat>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-gsplat.md) | Renders a [3D Gaussian splat](https://developer.playcanvas.com/user-manual/gaussian-splatting.md) |
| [`joint`](https://api.playcanvas.com/engine/classes/JointComponent.html) | [Joint](https://developer.playcanvas.com/user-manual/editor/scenes/components/joint.md) | - | [`<pc-joint>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-joint.md) | Alpha: connects rigid bodies with a [joint](https://developer.playcanvas.com/user-manual/physics/joints.md) |
| [`layoutchild`](https://api.playcanvas.com/engine/classes/LayoutChildComponent.html) | [Layout Child](https://developer.playcanvas.com/user-manual/editor/scenes/components/layoutchild.md) | - | [`<pc-layout-child>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-layout-child.md) | Overrides how a layout group sizes its element |
| [`layoutgroup`](https://api.playcanvas.com/engine/classes/LayoutGroupComponent.html) | [Layout Group](https://developer.playcanvas.com/user-manual/editor/scenes/components/layoutgroup.md) | - | [`<pc-layout-group>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-layout-group.md) | Arranges child UI elements in rows, columns or grids |
| [`light`](https://api.playcanvas.com/engine/classes/LightComponent.html) | [Light](https://developer.playcanvas.com/user-manual/editor/scenes/components/light.md) | [`<Light>`](https://developer.playcanvas.com/user-manual/react/api/light.md) | [`<pc-light>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-light.md) | A directional, omni or spot [light](https://developer.playcanvas.com/user-manual/graphics/lighting/lights.md) |
| [`model`](https://api.playcanvas.com/engine/classes/ModelComponent.html) | [Model](https://developer.playcanvas.com/user-manual/editor/scenes/components/model.md) | - | - | Legacy: renders a model asset. Use Render |
| [`particlesystem`](https://api.playcanvas.com/engine/classes/ParticleSystemComponent.html) | [Particle System](https://developer.playcanvas.com/user-manual/editor/scenes/components/particlesystem.md) | - | [`<pc-particle-system>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-particle-system.md) | Emits and draws [particles](https://developer.playcanvas.com/user-manual/graphics/particles.md) |
| [`render`](https://api.playcanvas.com/engine/classes/RenderComponent.html) | [Render](https://developer.playcanvas.com/user-manual/editor/scenes/components/render.md) | [`<Render>`](https://developer.playcanvas.com/user-manual/react/api/render.md) | [`<pc-render>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-render.md) | Draws a primitive shape, or the meshes of a render asset |
| [`rigidbody`](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html) | [Rigid Body](https://developer.playcanvas.com/user-manual/editor/scenes/components/rigidbody.md) | [`<RigidBody>`](https://developer.playcanvas.com/user-manual/react/api/rigidbody.md) | [`<pc-rigid-body>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-rigid-body.md) | Hands the entity to the [physics](https://developer.playcanvas.com/user-manual/physics.md) simulation |
| [`screen`](https://api.playcanvas.com/engine/classes/ScreenComponent.html) | [Screen](https://developer.playcanvas.com/user-manual/editor/scenes/components/screen.md) | [`<Screen>`](https://developer.playcanvas.com/user-manual/react/api/screen.md) | [`<pc-screen>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-screen.md) | The root of a [user interface](https://developer.playcanvas.com/user-manual/user-interface/screens.md) |
| [`script`](https://api.playcanvas.com/engine/classes/ScriptComponent.html) | [Script](https://developer.playcanvas.com/user-manual/editor/scenes/components/script.md) | [`<Script>`](https://developer.playcanvas.com/user-manual/react/api/script.md) | [`<pc-script>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-script.md) | Runs your [scripts](https://developer.playcanvas.com/user-manual/scripting.md) on the entity |
| [`scrollbar`](https://api.playcanvas.com/engine/classes/ScrollbarComponent.html) | [Scrollbar](https://developer.playcanvas.com/user-manual/editor/scenes/components/scrollbar.md) | - | [`<pc-scrollbar>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scrollbar.md) | A scrollbar for a scroll view |
| [`scrollview`](https://api.playcanvas.com/engine/classes/ScrollViewComponent.html) | [Scroll View](https://developer.playcanvas.com/user-manual/editor/scenes/components/scrollview.md) | - | [`<pc-scroll-view>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-scroll-view.md) | A scrollable area of user interface |
| [`sound`](https://api.playcanvas.com/engine/classes/SoundComponent.html) | [Sound](https://developer.playcanvas.com/user-manual/editor/scenes/components/sound.md) | - | [`<pc-sound>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound.md) | Plays sounds, optionally positioned in 3D |
| [`sprite`](https://api.playcanvas.com/engine/classes/SpriteComponent.html) | [Sprite](https://developer.playcanvas.com/user-manual/editor/scenes/components/sprite.md) | `<Sprite>` | - | Draws a [2D sprite](https://developer.playcanvas.com/user-manual/2D.md) or sprite animation |

React and Web Components wrap the components that most applications use. A dash means there is no wrapper, but you can still add the component to the engine entity from code, as described [below](https://developer.playcanvas.com/user-manual/ecs/components.md#components-without-a-wrapper).

## Adding a Component

You add a component to an entity with the settings it should start with. Any setting you leave out takes its default value.

**Engine**

```javascript
const lamp = new pc.Entity('lamp');
lamp.addComponent('light', {
    type: 'omni',
    color: new pc.Color(1, 0.8, 0.6),
    range: 10
});
app.root.addChild(lamp);
```

`addComponent()` returns the new component, which is also available as `lamp.light`. It returns `null`, and logs a warning in the debug engine, if the entity already has a light. It also returns `null` if the application has not registered the light component system; see [Component Systems](https://developer.playcanvas.com/user-manual/ecs/components.md#component-systems).

**Editor**

Select the entity and click **Add Component** in the Inspector, or right-click the entity in the Hierarchy and choose **Add Component**. The menu groups the components by what they do, and grays out the ones the entity already has. The new component appears as a panel in the Inspector, showing its properties at their default values.

[Image: The Inspector panel showing an entity's name, tags, position, rotation and scale above its Add Component button, and below them a Render component with its on/off switch and properties]

**React**

Place the component inside the `<Entity>`, with its settings as props:

```jsx
import { Entity } from '@playcanvas/react';
import { Light } from '@playcanvas/react/components';

<Entity name="lamp">
  <Light type="omni" color="#ffcc99" range={10} />
</Entity>
```

**Web Components**

Place the component's tag inside the `<pc-entity>`, with its settings as attributes:

```html
<pc-entity name="lamp">
    <pc-light type="omni" color="#ffcc99" range="10"></pc-light>
</pc-entity>
```

A component tag that you append to a `<pc-entity>` at runtime adds its component straight away.

### Components Without a Wrapper

In React and Web Components, you can add a component that has no wrapper to the engine entity, from code.

**React**

Write a component that adds the engine component to the entity it is placed in, and removes it when it unmounts. `useParent()` returns the engine entity of the enclosing `<Entity>`:

```jsx
import { useEffect } from 'react';
import { Entity } from '@playcanvas/react';
import { useParent } from '@playcanvas/react/hooks';

function AudioListener() {
  const entity = useParent();

  useEffect(() => {
    entity.addComponent('audiolistener');
    return () => {
      // unmounting the whole entity has already destroyed its components
      if (entity.audiolistener) entity.removeComponent('audiolistener');
    };
  }, [entity]);

  return null;
}

<Entity name="camera">
  <AudioListener />
</Entity>
```

**Web Components**

Wait for the entity to be ready, then add the component to it:

```html
<pc-entity name="logo"></pc-entity>

<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const logo = await whenReady('pc-entity[name="logo"]');
    logo.entity.addComponent('sprite', { type: 'simple' });
</script>
```

## Reading and Changing Properties

A component's settings are properties that you can read and change at any time, and the component reacts straight away. To change a vector or color property, assign a new value to it.

**Engine**

```javascript
lamp.light.intensity = 2;
lamp.light.color = new pc.Color(1, 0, 0);

console.log(lamp.light.range); // 10
```

**Editor**

Edit the fields in the component's panel in the Inspector. While the scene is launched, your changes are sent to the running application, so you can tune values as you watch. Right-click a field to copy its value and paste it into a field of the same type.

To change a property at runtime, set it from a script, for example `this.entity.light.intensity = 2`.

**React**

Change the prop. The component's property is updated when the component renders:

```jsx
function Lamp({ on }) {
  return (
    <Entity name="lamp">
      <Light type="omni" intensity={on ? 2 : 0} />
    </Entity>
  );
}
```

**Web Components**

Change the attribute:

```javascript
const light = document.querySelector('pc-entity[name="lamp"] > pc-light');
light.setAttribute('intensity', '2');
```

Once the element is ready, its `component` property is the engine component, for the properties that have no attribute.

## Disabling and Removing a Component

Every component has an `enabled` property. A disabled component stops working, so a disabled render component is not drawn and a disabled script component stops running its scripts, but it keeps its settings until you enable it again. Removing a component deletes it and its settings. Disabling the whole entity disables all of its components at once; see [Enabling and Disabling](https://developer.playcanvas.com/user-manual/ecs/entities.md#enabling-and-disabling).

**Engine**

```javascript
box.render.enabled = false; // stop drawing the box
box.render.enabled = true;  // draw it again

box.removeComponent('render');
```

**Editor**

Turn a component off and on with the switch in its panel's header. The cog in the header opens a menu to **Copy Component**, **Paste Component** onto another entity, and **Remove Component**.

**React**

Stop rendering a component to remove it. The components have no `enabled` prop, so to disable one and keep its settings, set `enabled` on the engine component, through a ref to its entity:

```jsx
import { useEffect, useRef } from 'react';
import { Entity } from '@playcanvas/react';
import { Light, Render } from '@playcanvas/react/components';

function Box({ visible, lit }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.render.enabled = visible;
  }, [visible]);

  return (
    <Entity ref={ref} name="box">
      <Render type="box" />
      {lit && <Light type="omni" />}
    </Entity>
  );
}
```

**Web Components**

Set the `enabled` attribute of the tag to disable the component, and remove the tag to remove it:

```html
<pc-entity name="box">
    <pc-render type="box" enabled="false"></pc-render>
</pc-entity>
```

## Adding Your Own Behavior

The built-in components cover the abilities the engine provides. For everything else, from a door that opens to the rules of your game, write a [script](https://developer.playcanvas.com/user-manual/scripting.md) and attach it to an entity with a script component. A script component can run any number of scripts, and each one reaches its entity as `this.entity`. Here is a script that spins its entity around its vertical axis:

```javascript
import { Script } from 'playcanvas';

export class Spin extends Script {
    static scriptName = 'spin';

    /**
     * How fast to spin, in degrees per second.
     *
     * @attribute
     */
    speed = 90;

    update(dt) {
        this.entity.rotate(0, this.speed * dt, 0);
    }
}
```

**Engine**

```javascript
box.addComponent('script');
box.script.create(Spin, { properties: { speed: 45 } });
```

**Editor**

Save the script as an asset, such as `spin.mjs`, add a **Script** component to the entity and choose `spin` from its **Add Script** list. The Inspector then shows a field for the `speed` attribute. See [Managing Scripts](https://developer.playcanvas.com/user-manual/editor/scripting/managing-scripts.md).

**React**

Props other than `script` are assigned to the script instance:

```jsx
import { Script } from '@playcanvas/react/components';

<Entity name="box">
  <Render type="box" />
  <Script script={Spin} speed={45} />
</Entity>
```

**Web Components**

Register the script with the application under its name, then add it with a `<pc-script-instance>` inside a `<pc-script>`:

```html
<pc-entity name="box">
    <pc-render type="box"></pc-render>
    <pc-script>
        <pc-script-instance name="spin" attributes='{"speed": 45}'></pc-script-instance>
    </pc-script>
</pc-entity>

<script type="module">
    import { registerScript } from 'playcanvas';
    import { whenReady } from '@playcanvas/web-components';
    import { Spin } from './spin.mjs';

    await whenReady('pc-app');
    registerScript(Spin, 'spin');
</script>
```

## Component Systems

For each type of component, the application has one component system, which creates every component of that type, updates them each frame and destroys them. Systems live in `app.systems`, under the same names as the components, and some of them hold settings that all of their components share:

```javascript
// the gravity that pulls on every rigid body
app.systems.rigidbody.gravity = new pc.Vec3(0, -1.62, 0);
```

An application can only add components whose system it has registered. [`pc.Application`](https://api.playcanvas.com/engine/classes/Application.html) registers every built-in system, as do the Editor, React and Web Components. [`pc.AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html) registers only the systems you list, so that a bundler can leave the others out of your build:

```javascript
const options = new pc.AppOptions();
options.graphicsDevice = device;
options.componentSystems = [
    pc.RenderComponentSystem,
    pc.CameraComponentSystem,
    pc.LightComponentSystem,
    pc.ScriptComponentSystem
];

const app = new pc.AppBase(canvas);
app.init(options);
```

See [Using the Engine Standalone](https://developer.playcanvas.com/user-manual/engine/standalone.md) for the rest of the setup.

## See Also

- [Entities](https://developer.playcanvas.com/user-manual/ecs/entities.md) - Creating, enabling, destroying and copying the entities that components live on
- [Scripting](https://developer.playcanvas.com/user-manual/scripting.md) - Writing scripts, their lifecycle and their attributes
- [Inspector Panel](https://developer.playcanvas.com/user-manual/editor/interface/inspector.md) - Editing components in the Editor
- [PlayCanvas React](https://developer.playcanvas.com/user-manual/react.md) and [Web Components](https://developer.playcanvas.com/user-manual/web-components.md) - The React components and the Web Components tags
- [Component](https://api.playcanvas.com/engine/classes/Component.html) and [ComponentSystem](https://api.playcanvas.com/engine/classes/ComponentSystem.html) - The engine API reference

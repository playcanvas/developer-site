---
title: Components
description: "The built-in PlayCanvas components and their names on each surface, adding and configuring them, disabling and removing them, adding your own behavior with scripts, and the component systems behind them."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A component gives an entity one ability. An entity with a camera component renders the scene, one with a light component lights it, and one with rigidbody and collision components falls, bounces and collides. Components hold the settings of their ability as properties, and an entity can have at most one component of each type.

## Built-in Components {#built-in-components}

Each name links to the component's reference on that surface. The engine name is the one you pass to `addComponent()`, and also the property that holds the component on its entity: `entity.camera`, `entity.rigidbody` and so on.

| Engine | Editor | React | Web Components | What it does |
| --- | --- | --- | --- | --- |
| [`anim`](https://api.playcanvas.com/engine/classes/AnimComponent.html) | [Anim](/user-manual/editor/scenes/components/anim/) | [`<Anim>`](/user-manual/react/api/anim/) | [`<pc-anim>`](/user-manual/web-components/tags/pc-anim/) | Plays animations, blended by an [anim state graph](/user-manual/animation/anim-state-graph-assets/) |
| [`animation`](https://api.playcanvas.com/engine/classes/AnimationComponent.html) | [Animation](/user-manual/editor/scenes/components/animation/) | - | - | Legacy: plays animation clips. Use Anim |
| [`audiolistener`](https://api.playcanvas.com/engine/classes/AudioListenerComponent.html) | [Audio Listener](/user-manual/editor/scenes/components/audiolistener/) | - | [`<pc-audio-listener>`](/user-manual/web-components/tags/pc-audio-listener/) | The point that sounds are heard from |
| [`button`](https://api.playcanvas.com/engine/classes/ButtonComponent.html) | [Button](/user-manual/editor/scenes/components/button/) | - | [`<pc-button>`](/user-manual/web-components/tags/pc-button/) | Makes a UI element respond to hovers and clicks |
| [`camera`](https://api.playcanvas.com/engine/classes/CameraComponent.html) | [Camera](/user-manual/editor/scenes/components/camera/) | [`<Camera>`](/user-manual/react/api/camera/) | [`<pc-camera>`](/user-manual/web-components/tags/pc-camera/) | Renders the scene from the entity's point of view |
| [`collision`](https://api.playcanvas.com/engine/classes/CollisionComponent.html) | [Collision](/user-manual/editor/scenes/components/collision/) | [`<Collision>`](/user-manual/react/api/collision/) | [`<pc-collision>`](/user-manual/web-components/tags/pc-collision/) | Gives a rigid body or trigger volume its [shape](/user-manual/physics/collision-shapes/) |
| [`element`](https://api.playcanvas.com/engine/classes/ElementComponent.html) | [Element](/user-manual/editor/scenes/components/element/) | [`<Element>`](/user-manual/react/api/element/) | [`<pc-element>`](/user-manual/web-components/tags/pc-element/) | A rectangle of [user interface](/user-manual/user-interface/): an image, text or group |
| [`gsplat`](https://api.playcanvas.com/engine/classes/GSplatComponent.html) | [GSplat](/user-manual/editor/scenes/components/gsplat/) | [`<GSplat>`](/user-manual/react/api/gsplat/) | [`<pc-gsplat>`](/user-manual/web-components/tags/pc-gsplat/) | Renders a [3D Gaussian splat](/user-manual/gaussian-splatting/) |
| [`joint`](https://api.playcanvas.com/engine/classes/JointComponent.html) | [Joint](/user-manual/editor/scenes/components/joint/) | - | [`<pc-joint>`](/user-manual/web-components/tags/pc-joint/) | Alpha: connects rigid bodies with a [joint](/user-manual/physics/joints/) |
| [`layoutchild`](https://api.playcanvas.com/engine/classes/LayoutChildComponent.html) | [Layout Child](/user-manual/editor/scenes/components/layoutchild/) | - | [`<pc-layout-child>`](/user-manual/web-components/tags/pc-layout-child/) | Overrides how a layout group sizes its element |
| [`layoutgroup`](https://api.playcanvas.com/engine/classes/LayoutGroupComponent.html) | [Layout Group](/user-manual/editor/scenes/components/layoutgroup/) | - | [`<pc-layout-group>`](/user-manual/web-components/tags/pc-layout-group/) | Arranges child UI elements in rows, columns or grids |
| [`light`](https://api.playcanvas.com/engine/classes/LightComponent.html) | [Light](/user-manual/editor/scenes/components/light/) | [`<Light>`](/user-manual/react/api/light/) | [`<pc-light>`](/user-manual/web-components/tags/pc-light/) | A directional, omni or spot [light](/user-manual/graphics/lighting/lights/) |
| [`model`](https://api.playcanvas.com/engine/classes/ModelComponent.html) | [Model](/user-manual/editor/scenes/components/model/) | - | - | Legacy: renders a model asset. Use Render |
| [`particlesystem`](https://api.playcanvas.com/engine/classes/ParticleSystemComponent.html) | [Particle System](/user-manual/editor/scenes/components/particlesystem/) | - | [`<pc-particle-system>`](/user-manual/web-components/tags/pc-particle-system/) | Emits and draws [particles](/user-manual/graphics/particles/) |
| [`render`](https://api.playcanvas.com/engine/classes/RenderComponent.html) | [Render](/user-manual/editor/scenes/components/render/) | [`<Render>`](/user-manual/react/api/render/) | [`<pc-render>`](/user-manual/web-components/tags/pc-render/) | Draws a primitive shape, or the meshes of a render asset |
| [`rigidbody`](https://api.playcanvas.com/engine/classes/RigidBodyComponent.html) | [Rigid Body](/user-manual/editor/scenes/components/rigidbody/) | [`<RigidBody>`](/user-manual/react/api/rigidbody/) | [`<pc-rigid-body>`](/user-manual/web-components/tags/pc-rigid-body/) | Hands the entity to the [physics](/user-manual/physics/) simulation |
| [`screen`](https://api.playcanvas.com/engine/classes/ScreenComponent.html) | [Screen](/user-manual/editor/scenes/components/screen/) | [`<Screen>`](/user-manual/react/api/screen/) | [`<pc-screen>`](/user-manual/web-components/tags/pc-screen/) | The root of a [user interface](/user-manual/user-interface/screens/) |
| [`script`](https://api.playcanvas.com/engine/classes/ScriptComponent.html) | [Script](/user-manual/editor/scenes/components/script/) | [`<Script>`](/user-manual/react/api/script/) | [`<pc-script>`](/user-manual/web-components/tags/pc-script/) | Runs your [scripts](/user-manual/scripting/) on the entity |
| [`scrollbar`](https://api.playcanvas.com/engine/classes/ScrollbarComponent.html) | [Scrollbar](/user-manual/editor/scenes/components/scrollbar/) | - | [`<pc-scrollbar>`](/user-manual/web-components/tags/pc-scrollbar/) | A scrollbar for a scroll view |
| [`scrollview`](https://api.playcanvas.com/engine/classes/ScrollViewComponent.html) | [Scroll View](/user-manual/editor/scenes/components/scrollview/) | - | [`<pc-scroll-view>`](/user-manual/web-components/tags/pc-scroll-view/) | A scrollable area of user interface |
| [`sound`](https://api.playcanvas.com/engine/classes/SoundComponent.html) | [Sound](/user-manual/editor/scenes/components/sound/) | - | [`<pc-sound>`](/user-manual/web-components/tags/pc-sound/) | Plays sounds, optionally positioned in 3D |
| [`sprite`](https://api.playcanvas.com/engine/classes/SpriteComponent.html) | [Sprite](/user-manual/editor/scenes/components/sprite/) | `<Sprite>` | [`<pc-sprite>`](/user-manual/web-components/tags/pc-sprite/) | Draws a [2D sprite](/user-manual/2D/) or sprite animation |

React and Web Components wrap the components that most applications use. A dash means there is no wrapper, but you can still add the component to the engine entity from code, as described [below](#components-without-a-wrapper).

## Adding a Component {#adding-a-component}

You add a component to an entity with the settings it should start with. Any setting you leave out takes its default value.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
const lamp = new pc.Entity('lamp');
lamp.addComponent('light', {
    type: 'omni',
    color: new pc.Color(1, 0.8, 0.6),
    range: 10
});
app.root.addChild(lamp);
```

`addComponent()` returns the new component, which is also available as `lamp.light`. It returns `null`, and logs a warning in the debug engine, if the entity already has a light. It also returns `null` if the application has not registered the light component system; see [Component Systems](#component-systems).

</TabItem>
<TabItem value="editor" label="Editor">

Select the entity and click **Add Component** in the Inspector, or right-click the entity in the Hierarchy and choose **Add Component**. The menu groups the components by what they do, and grays out the ones the entity already has. The new component appears as a panel in the Inspector, showing its properties at their default values.

<img loading="lazy" alt="The Inspector panel showing an entity's name, tags, position, rotation and scale above its Add Component button, and below them a Render component with its on/off switch and properties" width="360" src="/img/user-manual/editor/inspector/inspector.png" />

</TabItem>
<TabItem value="react" label="React">

Place the component inside the `<Entity>`, with its settings as props:

```jsx
import { Entity } from '@playcanvas/react';
import { Light } from '@playcanvas/react/components';

<Entity name="lamp">
  <Light type="omni" color="#ffcc99" range={10} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

Place the component's tag inside the `<pc-entity>`, with its settings as attributes:

```html
<pc-entity name="lamp">
    <pc-light type="omni" color="#ffcc99" range="10"></pc-light>
</pc-entity>
```

A component tag that you append to a `<pc-entity>` at runtime adds its component straight away.

</TabItem>
</Tabs>

### Components Without a Wrapper {#components-without-a-wrapper}

In React and Web Components, you can add a component that has no wrapper to the engine entity, from code.

<Tabs groupId="workflow" defaultValue="react">
<TabItem value="react" label="React">

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

</TabItem>
<TabItem value="web-components" label="Web Components">

Wait for the entity to be ready, then add the component to it:

```html
<pc-entity name="logo"></pc-entity>

<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const logo = await whenReady('pc-entity[name="logo"]');
    logo.entity.addComponent('sprite', { type: 'simple' });
</script>
```

</TabItem>
</Tabs>

## Reading and Changing Properties {#reading-and-changing-properties}

A component's settings are properties that you can read and change at any time, and the component reacts straight away. To change a vector or color property, assign a new value to it.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
lamp.light.intensity = 2;
lamp.light.color = new pc.Color(1, 0, 0);

console.log(lamp.light.range); // 10
```

</TabItem>
<TabItem value="editor" label="Editor">

Edit the fields in the component's panel in the Inspector. While the scene is launched, your changes are sent to the running application, so you can tune values as you watch. Right-click a field to copy its value and paste it into a field of the same type.

To change a property at runtime, set it from a script, for example `this.entity.light.intensity = 2`.

</TabItem>
<TabItem value="react" label="React">

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

</TabItem>
<TabItem value="web-components" label="Web Components">

Change the attribute:

```javascript
const light = document.querySelector('pc-entity[name="lamp"] > pc-light');
light.setAttribute('intensity', '2');
```

Once the element is ready, its `component` property is the engine component, for the properties that have no attribute.

</TabItem>
</Tabs>

## Disabling and Removing a Component {#disabling-and-removing-a-component}

Every component has an `enabled` property. A disabled component stops working, so a disabled render component is not drawn and a disabled script component stops running its scripts, but it keeps its settings until you enable it again. Removing a component deletes it and its settings. Disabling the whole entity disables all of its components at once; see [Enabling and Disabling](/user-manual/ecs/entities/#enabling-and-disabling).

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
box.render.enabled = false; // stop drawing the box
box.render.enabled = true;  // draw it again

box.removeComponent('render');
```

</TabItem>
<TabItem value="editor" label="Editor">

Turn a component off and on with the switch in its panel's header. The cog in the header opens a menu to **Copy Component**, **Paste Component** onto another entity, and **Remove Component**.

</TabItem>
<TabItem value="react" label="React">

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

</TabItem>
<TabItem value="web-components" label="Web Components">

Set the `enabled` attribute of the tag to disable the component, and remove the tag to remove it:

```html
<pc-entity name="box">
    <pc-render type="box" enabled="false"></pc-render>
</pc-entity>
```

</TabItem>
</Tabs>

## Adding Your Own Behavior {#adding-your-own-behavior}

The built-in components cover the abilities the engine provides. For everything else, from a door that opens to the rules of your game, write a [script](/user-manual/scripting/) and attach it to an entity with a script component. A script component can run any number of scripts, and each one reaches its entity as `this.entity`. Here is a script that spins its entity around its vertical axis:

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

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
box.addComponent('script');
box.script.create(Spin, { properties: { speed: 45 } });
```

</TabItem>
<TabItem value="editor" label="Editor">

Save the script as an asset, such as `spin.mjs`, add a **Script** component to the entity and choose `spin` from its **Add Script** list. The Inspector then shows a field for the `speed` attribute. See [Managing Scripts](/user-manual/editor/scripting/managing-scripts/).

</TabItem>
<TabItem value="react" label="React">

Props other than `script` are assigned to the script instance:

```jsx
import { Script } from '@playcanvas/react/components';

<Entity name="box">
  <Render type="box" />
  <Script script={Spin} speed={45} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

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

</TabItem>
</Tabs>

## Component Systems {#component-systems}

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

See [Using the Engine Standalone](/user-manual/engine/standalone/) for the rest of the setup.

## See Also

- [Entities](/user-manual/ecs/entities/) - Creating, enabling, destroying and copying the entities that components live on
- [Scripting](/user-manual/scripting/) - Writing scripts, their lifecycle and their attributes
- [Inspector Panel](/user-manual/editor/interface/inspector/) - Editing components in the Editor
- [PlayCanvas React](/user-manual/react/) and [Web Components](/user-manual/web-components/) - The React components and the Web Components tags
- [Component](https://api.playcanvas.com/engine/classes/Component.html) and [ComponentSystem](https://api.playcanvas.com/engine/classes/ComponentSystem.html) - The engine API reference

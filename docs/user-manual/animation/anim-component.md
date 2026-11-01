---
title: Playing Animations
description: "Add the anim component to a model, play its animation clips, switch between them with cross-fades, change their speed, pause and loop them, and tell when a clip has finished, in the Engine, the Editor, React and Web Components."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [anim component](/user-manual/editor/scenes/components/anim/) plays animation clips on the entities below it. This page plays the clips that come with a model: it adds the component, gives each clip a state, switches between them and controls their playback.

## Adding the Anim Component {#adding-the-anim-component}

Add the anim component to the root of the hierarchy that the clips animate, usually the root entity of a model. A clip finds the nodes it animates by name, among the descendants of the component's entity. If the nodes are below a different entity, point the component's **Root Bone** (`rootBone`) at it.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

Load the GLB as a container asset, create its entities, and add the component to their root. Register the anim component system and the container handler with your application:

```javascript
const asset = new pc.Asset('robot-arm', 'container', {
    url: 'https://developer.playcanvas.com/assets/robot-arm.glb'
});
asset.ready(() => {
    const arm = asset.resource.instantiateRenderEntity();
    arm.addComponent('anim', { activate: true });
    app.root.addChild(arm);
});
app.assets.add(asset);
app.assets.load(asset);
```

`activate: true` starts playback as soon as the component has a clip to play.

</TabItem>
<TabItem value="editor" label="Editor">

Select the root entity of the model, click **Add Component** and choose **Anim**. In the Editor, the component plays clips through a [state graph](/user-manual/animation/anim-state-graph-assets/): an asset that lists the states the model can be in. Once you choose one as the component's **State Graph**, the component shows a slot for each of its states, and you drag an animation asset into each slot. **Activate** starts playback when the scene launches.

</TabItem>
<TabItem value="react" label="React">

Add an `<Anim>` to the `<Entity>` that renders the model. Given the model's asset, it plays the model's animation:

```jsx
import { Entity } from '@playcanvas/react';
import { Anim, Render } from '@playcanvas/react/components';
import { useModel } from '@playcanvas/react/hooks';

function RobotArm() {
  const { asset } = useModel('https://developer.playcanvas.com/assets/robot-arm.glb');
  if (!asset) return null;

  return (
    <Entity name="robot-arm">
      <Render type="asset" asset={asset} />
      <Anim asset={asset} playing />
    </Entity>
  );
}
```

`<Anim asset>` puts all of the model's animations into one state, so with several of them, only the last one plays. To play them by name, see [Playing Clips](#playing-clips).

:::caution

Always pass `playing`. Each time `<Anim>` renders, it sets every one of its props on the engine component, and the default of `playing` is `false`. Without it, the clips stop as soon as anything renders the component again.

:::

</TabItem>
<TabItem value="web-components" label="Web Components">

Put a [`<pc-anim>`](/user-manual/web-components/tags/pc-anim/) inside the [`<pc-model>`](/user-manual/web-components/tags/pc-model/). With no children, it gives every animation in the model a clip named after it, and plays the first:

```html
<pc-asset id="robot-arm" src="https://developer.playcanvas.com/assets/robot-arm.glb"></pc-asset>
<pc-scene>
    <pc-model asset="robot-arm">
        <pc-anim></pc-anim>
    </pc-model>
</pc-scene>
```

</TabItem>
</Tabs>

## Playing Clips {#playing-clips}

The component holds each clip in a **state**. To play the clips of a model by name, give each one a state of its own, named after the clip. The animations of a GLB are named in the file, and the component starts with the first one you add. To decide which clip plays when, from parameters such as a character's speed, use a [state graph](/user-manual/animation/anim-state-graph-assets/).

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

A container's animations are animation assets, whose resources are the clips, as [`AnimTrack`](https://api.playcanvas.com/engine/classes/AnimTrack.html) objects. [`assignAnimation()`](https://api.playcanvas.com/engine/classes/AnimComponent.html#assignanimation) creates a state for a clip:

```javascript
for (const animation of asset.resource.animations) {
    arm.anim.assignAnimation(animation.resource.name, animation.resource);
}
console.log(arm.anim.baseLayer.states); // ['START', 'idle', 'pick', 'place', 'inspect', 'stow']
```

</TabItem>
<TabItem value="editor" label="Editor">

Create a state graph with one state for each clip, add it to the Anim component, and fill each state's slot with the animation asset for it. See [Building a State Graph](/user-manual/animation/anim-state-graph-assets/#building-a-state-graph).

</TabItem>
<TabItem value="react" label="React">

Give the entity an `<Anim playing />` without an asset, and add the clips to its engine component from a component of your own. `useParent()` returns the engine entity of the enclosing `<Entity>`:

```jsx
import { useEffect } from 'react';
import { Entity } from '@playcanvas/react';
import { Anim, Render } from '@playcanvas/react/components';
import { useModel, useParent } from '@playcanvas/react/hooks';

function Clips({ asset }) {
  const entity = useParent();

  useEffect(() => {
    for (const animation of asset.resource.animations) {
      entity.anim.assignAnimation(animation.resource.name, animation.resource);
    }
  }, [entity, asset]);

  return null;
}

function RobotArm() {
  const { asset } = useModel('https://developer.playcanvas.com/assets/robot-arm.glb');
  if (!asset) return null;

  return (
    <Entity name="robot-arm">
      <Render type="asset" asset={asset} />
      <Anim playing />
      <Clips asset={asset} />
    </Entity>
  );
}
```

</TabItem>
<TabItem value="web-components" label="Web Components">

Declare the clips you want with [`<pc-anim-clip>`](/user-manual/web-components/tags/pc-anim-clip/) children, each named after an animation in the model, and choose the one to play with `clip`:

```html
<pc-model asset="robot-arm">
    <pc-anim clip="idle">
        <pc-anim-clip name="idle"></pc-anim-clip>
        <pc-anim-clip name="pick"></pc-anim-clip>
        <pc-anim-clip name="place"></pc-anim-clip>
    </pc-anim>
</pc-model>
```

</TabItem>
</Tabs>

## Switching Clips {#switching-clips}

Switching to another state can cut straight to it, or cross-fade to it over a time you choose. A cross-fade of a few tenths of a second hides the jump between two poses.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
arm.anim.baseLayer.transition('pick', 0.4); // cross-fade over 0.4 seconds
arm.anim.baseLayer.play('idle');            // cut straight to the start of idle
```

</TabItem>
<TabItem value="editor" label="Editor">

The transitions of the state graph switch between states for you, as their conditions are met. From a script, you can also switch to any state, for example `this.entity.anim.baseLayer.transition('pick', 0.4)`.

</TabItem>
<TabItem value="react" label="React">

Switch on the engine component when a prop changes:

```jsx
function Clip({ name }) {
  const entity = useParent();

  useEffect(() => {
    entity.anim.baseLayer.transition(name, 0.4);
  }, [entity, name]);

  return null;
}

<Entity name="robot-arm">
  <Render type="asset" asset={asset} />
  <Anim playing />
  <Clips asset={asset} />
  <Clip name={clip} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

Change the `clip` attribute. With `transition-time`, the switch cross-fades over that many seconds:

```html
<pc-anim id="arm-anim" clip="idle" transition-time="0.4">
    <pc-anim-clip name="idle"></pc-anim-clip>
    <pc-anim-clip name="pick"></pc-anim-clip>
</pc-anim>

<script>
    document.getElementById('arm-anim').setAttribute('clip', 'pick');
</script>
```

The element's `play()` and `transition()` methods cut or cross-fade for a single switch.

</TabItem>
</Tabs>

## Example {#example}

This Engine app loads a robot arm with five animations, gives each one a state, and cross-fades to the next one each time you click the canvas.

```js live-example
import * as pc from 'playcanvas';

// create the application with the component systems and resource handlers it uses
const canvas = document.getElementById('application');
const device = await pc.createGraphicsDevice(canvas, {
    deviceTypes: [pc.DEVICETYPE_WEBGPU]
});
device.maxPixelRatio = Math.min(window.devicePixelRatio, 2);

const options = new pc.AppOptions();
options.graphicsDevice = device;
options.componentSystems = [
    pc.RenderComponentSystem,
    pc.CameraComponentSystem,
    pc.LightComponentSystem,
    pc.AnimComponentSystem
];
options.resourceHandlers = [pc.ContainerHandler, pc.TextureHandler];

const app = new pc.AppBase(canvas);
app.init(options);
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);
window.addEventListener('resize', () => app.resizeCanvas());
app.start();

app.scene.ambientLight = new pc.Color(0.35, 0.35, 0.4);

// load the robot arm, a GLB with five animations
const asset = new pc.Asset('robot-arm', 'container', {
    url: 'https://developer.playcanvas.com/assets/robot-arm.glb'
});
await new Promise((resolve) => {
    asset.ready(resolve);
    app.assets.add(asset);
    app.assets.load(asset);
});

const camera = new pc.Entity('camera');
camera.addComponent('camera', {
    clearColor: new pc.Color(0.11, 0.12, 0.17)
});
camera.setPosition(1.75, 1.4, 2.15);
camera.lookAt(0, 0.75, 0);
app.root.addChild(camera);

const light = new pc.Entity('light');
light.addComponent('light', {
    castShadows: true,
    shadowBias: 0.2,
    normalOffsetBias: 0.05
});
light.setEulerAngles(48, 38, 0);
app.root.addChild(light);

const floor = new pc.Entity('floor');
const floorMaterial = new pc.StandardMaterial();
floorMaterial.diffuse = new pc.Color(0.24, 0.26, 0.31);
floorMaterial.update();
floor.addComponent('render', { type: 'plane', material: floorMaterial });
floor.setLocalScale(20, 1, 20);
app.root.addChild(floor);

// create the arm's entities, and give its root an anim component
const arm = asset.resource.instantiateRenderEntity({ castShadows: true });
arm.addComponent('anim', { activate: true });
app.root.addChild(arm);

// give each animation in the GLB a state of its own, named after it
const clips = asset.resource.animations.map((animation) => {
    arm.anim.assignAnimation(animation.resource.name, animation.resource);
    return animation.resource.name;
});

// click to cross-fade to the next clip over 0.4 seconds
let current = 0;
canvas.addEventListener('click', () => {
    current = (current + 1) % clips.length;
    arm.anim.baseLayer.transition(clips[current], 0.4);
});

const label = document.createElement('div');
label.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(label);
app.on('update', () => {
    label.textContent = `Playing: ${arm.anim.baseLayer.activeState}. Click for the next clip.`;
});
```

Some things to try:

- Raise the cross-fade time from `0.4` to `2` to see the two clips blend.
- Replace `transition()` with `play()`, and drop the time, to cut between clips instead.
- Add `arm.anim.speed = 0.5;` after the component is created to play every clip at half speed.

## Speed, Pausing and Looping {#speed-pausing-and-looping}

Playback speed multiplies at two levels. Each state has a speed of its own, and the component's `speed` multiplies every state's. A speed of 0 freezes playback. A negative state speed plays a clip backwards, but a negative component speed does not: it holds every clip at its first frame.

```javascript
arm.anim.speed = 0.5;                                   // everything at half speed
arm.anim.assignAnimation('pick', pickTrack, undefined, 2); // this state at double speed
```

A state loops by default. A state that does not loop holds the last frame of its clip until it is left. Pass `false` as the last argument of `assignAnimation()` for a state that plays once. In the Editor, set **Speed** and **Loop** on the state in the [state graph](/user-manual/animation/anim-state-graph-assets/#states), and in Web Components, set `speed` and `loop` on the [`<pc-anim-clip>`](/user-manual/web-components/tags/pc-anim-clip/).

To pause, set the component's `playing` to `false`, and set it back to `true` to carry on. That pauses every layer at once. Each [layer](/user-manual/animation/anim-layer-masking/) also has `pause()` and `play()` methods of its own.

In React, set the component's `speed` and `playing` as props of `<Anim>`, such as `<Anim playing={!paused} speed={0.5} />`. `<Anim>` sets its props again each time it renders, so values set on the engine component from code do not last.

:::caution

With **Activate** turned off, setting `playing` to `true` is not enough to start playback, because no layer has been started either. Start each layer as well: `entity.anim.playing = true` followed by `entity.anim.baseLayer.play()`.

:::

## Knowing When a Clip Has Finished {#knowing-when-a-clip-has-finished}

The component fires no event when a clip ends. A clip that does not loop holds its last frame and stays in its state. There are three ways to act when it finishes:

- **Move on in the state graph.** A transition with an [exit time](/user-manual/animation/anim-state-graph-assets/#transitions) of 1 leaves the state as soon as its clip has played through.
- **Add an event to the end of the clip.** An [animation event](/user-manual/animation/anim-events/) at the clip's duration fires when playback reaches it.
- **Compare the time in the state with its duration.** A layer's `activeStateCurrentTime` is the time its clip has played, in the clip's own seconds, and `activeStateDuration` is the clip's length:

```javascript
const layer = arm.anim.baseLayer;
const finished = layer.activeStateCurrentTime >= layer.activeStateDuration;
```

This works for a clip that plays forwards once. In a looping state, `activeStateCurrentTime` keeps growing rather than wrapping back to 0, and a clip played backwards counts down from 0. Avoid `activeStateProgress` for this: with a state speed other than 1, it applies the speed a second time.

## See Also

- [Animation Clips](/user-manual/animation/anim-animation-assets/) - Where clips come from and how they bind
- [State Graphs](/user-manual/animation/anim-state-graph-assets/) - Deciding which clip plays from parameters
- [Anim Component](/user-manual/editor/scenes/components/anim/) - The Editor reference for the component
- [`<Anim/>`](/user-manual/react/api/anim/), [`<pc-anim>`](/user-manual/web-components/tags/pc-anim/) and [`<pc-anim-clip>`](/user-manual/web-components/tags/pc-anim-clip/) - The React and Web Components references
- [AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html) and [AnimComponentLayer](https://api.playcanvas.com/engine/classes/AnimComponentLayer.html) - The engine API reference

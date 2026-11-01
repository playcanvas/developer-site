---
title: Blend Trees
description: "Blend several animation clips in one state by the value of parameters: 1D, 2D Cartesian, 2D Directional and Direct blend trees, how their clips stay in step, and how to build them in code."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A blend tree is a [state graph](/user-manual/animation/state-graphs/) state that plays several clips at once and blends them, weighted by the values of parameters. It turns a few clips into a continuous range of motion: a walk and a run become every speed between them, and eight walks in eight directions become movement in any direction.

Each **child** of a tree is a clip at a **point**: a value, or a position on a plane, of the tree's parameters. As the parameters change, the tree weights the children by how near their points are, and their weights add up to 1. Unlike a transition, a blend tree never finishes blending: the mix follows the parameters for as long as the state is active.

The Editor's graph editor does not create blend trees, so they are built in code, as part of a state graph's data.

## Kinds of Blend Tree {#kinds-of-blend-tree}

A tree's `type` decides how many parameters it reads, and how its points are compared with them.

| Type | Parameters | Points | Use it for |
| --- | --- | --- | --- |
| `pc.ANIM_BLEND_1D` | One, as `parameter` | Numbers | One value, such as walking speed. Between two points, the two children on either side are blended in proportion. Keep the value between the lowest and highest points: outside them, no child has any weight. |
| `pc.ANIM_BLEND_2D_CARTESIAN` | Two, as `parameters` | `[x, y]` | Two independent values, such as how happy and how energetic a character is. |
| `pc.ANIM_BLEND_2D_DIRECTIONAL` | Two, as `parameters` | `[x, y]` | A direction, such as a movement vector. Points are directions from `[0, 0]`, compared by angle and length, so a walk and a run in the same direction blend properly. Put the idle at `[0, 0]`. |
| `pc.ANIM_BLEND_DIRECT` | One per child, as `parameters` | None | Mixing clips by hand. Each child's weight is its parameter's value, divided by the sum of them all. Negative values count as 0. |

Children are blended only with the other children of their tree. A child cannot be a blend tree of its own.

## Building a Blend Tree {#building-a-blend-tree}

A blend tree is the `blendTree` of a state, with its children listed in `children`. Each child has a `name`, its `point` and, optionally, a `speed` that multiplies the speed of its clip. Here a 1D tree blends idling, walking and running by a `speed` parameter:

```javascript
const stateGraph = {
    layers: [{
        name: 'Base',
        states: [
            { name: 'START' },
            {
                name: 'Movement',
                loop: true,
                blendTree: {
                    type: pc.ANIM_BLEND_1D,
                    parameter: 'speed',
                    children: [
                        { name: 'Idle', point: 0 },
                        { name: 'Walk', point: 1 },
                        { name: 'Run', point: 3 }
                    ]
                }
            }
        ],
        transitions: [{ from: 'START', to: 'Movement' }]
    }],
    parameters: {
        speed: { name: 'speed', type: pc.ANIM_PARAMETER_FLOAT, value: 0 }
    }
};
```

A 2D tree takes two parameter names instead, and its children's points are pairs:

```javascript
blendTree: {
    type: pc.ANIM_BLEND_2D_DIRECTIONAL,
    parameters: ['moveX', 'moveZ'],
    children: [
        { name: 'Idle', point: [0, 0] },
        { name: 'Forward', point: [0, 1] },
        { name: 'Back', point: [0, -1] },
        { name: 'Left', point: [-1, 0] },
        { name: 'Right', point: [1, 0] }
    ]
}
```

Link each child to a clip by its path: the name of the state, a dot, and the name of the child. The state plays once all of its children have clips. Then set the parameters as the game runs.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
character.addComponent('anim', { activate: true });
character.anim.loadStateGraph(stateGraph);

const layer = character.anim.baseLayer;
layer.assignAnimation('Movement.Idle', idleTrack);
layer.assignAnimation('Movement.Walk', walkTrack);
layer.assignAnimation('Movement.Run', runTrack);

app.on('update', () => {
    character.anim.setFloat('speed', velocity.length());
});
```

</TabItem>
<TabItem value="editor" label="Editor">

Load the graph from a script on the entity, and take its clips from animation assets given to the script as attributes. Leave the Anim component's **State Graph** empty:

```javascript
import { Asset, Script } from 'playcanvas';

export class Movement extends Script {
    static scriptName = 'movement';

    /**
     * @attribute
     * @type {Asset}
     * @resource animation
     */
    idle;

    /**
     * @attribute
     * @type {Asset}
     * @resource animation
     */
    walk;

    /**
     * @attribute
     * @type {Asset}
     * @resource animation
     */
    run;

    initialize() {
        this.entity.anim.loadStateGraph(stateGraph);

        const layer = this.entity.anim.baseLayer;
        layer.assignAnimation('Movement.Idle', this.idle.resource);
        layer.assignAnimation('Movement.Walk', this.walk.resource);
        layer.assignAnimation('Movement.Run', this.run.resource);
    }
}
```

</TabItem>
<TabItem value="react" label="React">

```jsx
import { useEffect } from 'react';
import { useParent } from '@playcanvas/react/hooks';

function Movement({ tracks, speed }) {
  const entity = useParent();

  useEffect(() => {
    entity.anim.loadStateGraph(stateGraph);
    entity.anim.baseLayer.assignAnimation('Movement.Idle', tracks.idle);
    entity.anim.baseLayer.assignAnimation('Movement.Walk', tracks.walk);
    entity.anim.baseLayer.assignAnimation('Movement.Run', tracks.run);
  }, [entity, tracks]);

  useEffect(() => {
    entity.anim.setFloat('speed', speed);
  }, [entity, speed]);

  return null;
}
```

Place it in the model's `<Entity>`, after its `<Anim playing />`.

</TabItem>
<TabItem value="web-components" label="Web Components">

As for any [state graph](/user-manual/animation/state-graphs/#building-a-state-graph), leave out `<pc-anim>`, and add the anim component to the model's entity from code:

```javascript
const model = await whenReady('pc-model[name="character"]');
const container = document.getElementById('character').asset.resource;
const tracks = Object.fromEntries(container.animations.map(animation => [animation.resource.name, animation.resource]));

model.entity.addComponent('anim', { activate: true });
model.entity.anim.loadStateGraph(stateGraph);
model.entity.anim.baseLayer.assignAnimation('Movement.Idle', tracks.idle);
model.entity.anim.baseLayer.assignAnimation('Movement.Walk', tracks.walk);
model.entity.anim.baseLayer.assignAnimation('Movement.Run', tracks.run);
```

</TabItem>
</Tabs>

## Keeping Clips in Step {#keeping-clips-in-step}

The clips of a blend tree rarely have the same duration: a run cycle is shorter than a walk cycle. Blended at their own speeds, their steps would drift apart, and a character's feet would slide. So by default, a tree changes the speed of each child so that all of them take the same time to play through: the average of their durations, weighted by the children's weights. Blended half and half, a 1-second clip and a 2-second clip both take 1.5 seconds.

For clips that are not cycles of the same motion, set `syncAnimations: false` on the tree, and each child plays at its own speed.

## Example {#example}

This Engine app blends two of the robot arm's clips, idling and inspecting, with a 1D blend tree. Moving the pointer from the left of the canvas to the right sets the tree's `look` parameter from 0 to 1.

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

// one state, whose 1D blend tree blends idle and inspect by the value of the look parameter
arm.anim.loadStateGraph({
    layers: [{
        name: 'Base',
        states: [
            { name: 'START' },
            {
                name: 'Blend',
                loop: true,
                blendTree: {
                    type: pc.ANIM_BLEND_1D,
                    parameter: 'look',
                    children: [
                        { name: 'Idle', point: 0 },
                        { name: 'Inspect', point: 1 }
                    ]
                }
            }
        ],
        transitions: [{ from: 'START', to: 'Blend' }]
    }],
    parameters: {
        look: { name: 'look', type: pc.ANIM_PARAMETER_FLOAT, value: 0 }
    }
});

// link each child of the tree to a GLB animation, by the path State.Child
const tracks = Object.fromEntries(asset.resource.animations.map(animation => [animation.resource.name, animation.resource]));
arm.anim.baseLayer.assignAnimation('Blend.Idle', tracks.idle);
arm.anim.baseLayer.assignAnimation('Blend.Inspect', tracks.inspect);

// move the pointer across the canvas to set look from 0 at the left to range at the right
const range = 1;
canvas.addEventListener('pointermove', (event) => {
    arm.anim.setFloat('look', range * pc.math.clamp(event.offsetX / canvas.clientWidth, 0, 1));
});

const label = document.createElement('div');
label.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(label);
app.on('update', () => {
    label.textContent = `look: ${arm.anim.getFloat('look').toFixed(2)}. Move the pointer from left to right to blend.`;
});
```

Some things to try:

- Add `{ name: 'Pick', point: 2 }` to the children, link it with `arm.anim.baseLayer.assignAnimation('Blend.Pick', tracks.pick);`, and change `range` to `2`.
- Add `syncAnimations: false` to the blend tree, and watch the two clips drift apart as you blend them.
- Change the type to `pc.ANIM_BLEND_DIRECT`, replace `parameter: 'look'` with `parameters: ['still', 'look']`, add a `still` parameter with a value of 1, and remove the points.

These Engine examples blend a character's clips with 2D trees. In the Examples Browser, drag across the pad in the controls panel to move the blend point, and the circle around each clip's point grows with its weight:

<EngineExample id="animation/blend-trees-2d-cartesian" title="Blend Trees 2D Cartesian" controls />

<EngineExample id="animation/blend-trees-2d-directional" title="Blend Trees 2D Directional" controls />

## See Also

- [State Graphs](/user-manual/animation/state-graphs/) - The states, transitions and parameters that blend trees are part of
- [Layers and Masks](/user-manual/animation/layers-and-masks/) - Blending whole state graphs together
- [AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html) and [AnimComponentLayer](https://api.playcanvas.com/engine/classes/AnimComponentLayer.html) - The engine API reference

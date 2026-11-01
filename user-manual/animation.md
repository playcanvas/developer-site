# Animation

PlayCanvas animates entity hierarchies by playing **animation clips** on them. A clip is a set of keyframes over time for properties of named nodes: the bones of a character, the parts of a machine, or the properties of components, such as the color of a light. The **anim component** plays clips on the hierarchy below its entity, and everything else in this section builds on it.

[GLB Animation](https://playcanvas.com/examples)

Load the T-Rex above, and drag to orbit around it. It is a [Web Components example](https://playcanvas.github.io/web-components/examples/#glb-animation.html), and all of its animation comes from one empty `<pc-anim>` element inside the model's `<pc-model>` element. With no clips declared, it plays the model's own clip on a loop. [On Each Surface](https://developer.playcanvas.com/user-manual/animation.md#on-each-surface) compares how each surface does the same.

## How Animation Works

- **[Clips](https://developer.playcanvas.com/user-manual/animation/clips.md)** usually come from the models you import. A GLB, or an FBX file imported in the Editor, brings its animations with it, and you can also build a clip from keyframes in code. A clip binds to its targets by node name, so one clip can animate any model whose nodes have the same names.
- **[The anim component](https://developer.playcanvas.com/user-manual/animation/playing-animations.md)** plays clips on the hierarchy below its entity. Each clip it plays is held in a **state**, and the component cross-fades between states when you switch.
- **[State graphs](https://developer.playcanvas.com/user-manual/animation/state-graphs.md)** decide which state plays. A state graph is a state machine of states, the **transitions** between them and the **parameters** that the transitions test, such as a `speed` or a `jump` trigger. You set the parameters from code, and the graph does the rest.
- **[Blend trees](https://developer.playcanvas.com/user-manual/animation/blend-trees.md)** blend several clips in one state by the value of parameters, so a character can move smoothly from a walk into a run.
- **[Layers and masks](https://developer.playcanvas.com/user-manual/animation/layers-and-masks.md)** play several state graphs on one model at the same time, each limited to some of its nodes, so a character can wave while it walks.
- **[Events](https://developer.playcanvas.com/user-manual/animation/events.md)** fire at chosen times in a clip, for footstep sounds, effects or gameplay.

## On Each Surface

The anim component is the same everywhere, but the surfaces expose different amounts of it. Anything a surface has no markup or UI for, you can reach through the engine component from code.

| | Engine | Editor | React | Web Components |
| --- | --- | --- | --- | --- |
| Play a model's clips | `entity.anim.assignAnimation()` | An Anim component and a state graph asset | `<Anim playing />` | [`<pc-anim>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-anim.md) |
| Switch clips with a cross-fade | `layer.transition()` | Transitions in the state graph | The engine API | The `clip` and `transition-time` attributes |
| State graphs and parameters | `entity.anim.loadStateGraph()` | The Anim State Graph asset editor | The engine API | The engine API |
| Blend trees | In the state graph data | From a script only | The engine API | The engine API |
| Layers and masks | `entity.anim.addLayer()` | Layers in the graph, masks in the Anim component | The engine API | The engine API |
| Events | `new pc.AnimEvents()` on a clip | Events on the animation asset | The engine API | The engine API |

:::note

The anim component replaced the older **animation** component, which plays clips without state graphs. That component still works, but use the anim component in new projects. For 2D skeletal animation made with Spine, see [Spine](https://developer.playcanvas.com/user-manual/2D/spine.md).

:::

## In This Section

- [Playing Animations](https://developer.playcanvas.com/user-manual/animation/playing-animations.md) - Adding the anim component, playing and switching clips, speed, pausing, looping and finished clips.
- [Animation Clips](https://developer.playcanvas.com/user-manual/animation/clips.md) - Clips in GLB and FBX files, how they bind to nodes, and building clips in code.
- [State Graphs](https://developer.playcanvas.com/user-manual/animation/state-graphs.md) - States, transitions, parameters and conditions, built in the Editor or in code.
- [Blend Trees](https://developer.playcanvas.com/user-manual/animation/blend-trees.md) - Blending clips by one or two parameters, or by a weight each.
- [Layers and Masks](https://developer.playcanvas.com/user-manual/animation/layers-and-masks.md) - Playing several graphs at once, blending them, and masking them to parts of a model.
- [Animation Events](https://developer.playcanvas.com/user-manual/animation/events.md) - Firing events at chosen times in a clip and handling them.

## See Also

- [Anim Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/anim.md) - The Editor reference for the component
- [Animation Asset](https://developer.playcanvas.com/user-manual/editor/assets/inspectors/animation.md) - Previewing clips and the animation import settings in the Editor
- [Anim State Graph Blending](https://developer.playcanvas.com/tutorials/anim-blending/) - Tutorial that builds a blended state graph in the Editor
- [Animation examples](https://playcanvas.com/examples/#/animation/locomotion) - Engine examples of locomotion, blend trees, layer masks, events and more
- [AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html) and [AnimComponentLayer](https://api.playcanvas.com/engine/classes/AnimComponentLayer.html) - The engine API reference

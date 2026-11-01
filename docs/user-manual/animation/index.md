---
title: Animation
description: "How PlayCanvas plays animation clips on characters, machines and any other hierarchy of entities, with the anim component, state graphs, blend trees, layers, masks and events, in the Engine, the Editor, React and Web Components."
---

PlayCanvas animates entity hierarchies by playing **animation clips** on them. A clip is a set of keyframes over time for properties of named nodes: the bones of a character, the parts of a machine, or the properties of components, such as the color of a light. The **anim component** plays clips on the hierarchy below its entity, and everything else in this section builds on it.

<EngineExample src="https://playcanvas.github.io/web-components/examples/#glb-animation.html" thumbnail="/img/user-manual/animation/t-rex.jpg" title="GLB Animation" />

Load the T-Rex above, and drag to orbit around it. It is a [Web Components example](https://playcanvas.github.io/web-components/examples/#glb-animation.html), and all of its animation comes from one empty `<pc-anim>` element inside the model's `<pc-model>` element. With no clips declared, it plays the model's own clip on a loop. [On Each Surface](#on-each-surface) compares how each surface does the same.

## How Animation Works {#how-animation-works}

- **[Clips](/user-manual/animation/anim-animation-assets/)** usually come from the models you import. A GLB, or an FBX file imported in the Editor, brings its animations with it, and you can also build a clip from keyframes in code. A clip binds to its targets by node name, so one clip can animate any model whose nodes have the same names.
- **[The anim component](/user-manual/animation/anim-component/)** plays clips on the hierarchy below its entity. Each clip it plays is held in a **state**, and the component cross-fades between states when you switch.
- **[State graphs](/user-manual/animation/anim-state-graph-assets/)** decide which state plays. A state graph is a state machine of states, the **transitions** between them and the **parameters** that the transitions test, such as a `speed` or a `jump` trigger. You set the parameters from code, and the graph does the rest.
- **[Blend trees](/user-manual/animation/blend-trees/)** blend several clips in one state by the value of parameters, so a character can move smoothly from a walk into a run.
- **[Layers and masks](/user-manual/animation/anim-layer-masking/)** play several state graphs on one model at the same time, each limited to some of its nodes, so a character can wave while it walks.
- **[Events](/user-manual/animation/anim-events/)** fire at chosen times in a clip, for footstep sounds, effects or gameplay.

## On Each Surface {#on-each-surface}

The anim component is the same everywhere, but the surfaces expose different amounts of it. Anything a surface has no markup or UI for, you can reach through the engine component from code.

| | Engine | Editor | React | Web Components |
| --- | --- | --- | --- | --- |
| Play a model's clips | `entity.anim.assignAnimation()` | An Anim component and a state graph asset | `<Anim playing />` | [`<pc-anim>`](/user-manual/web-components/tags/pc-anim/) |
| Switch clips with a cross-fade | `layer.transition()` | Transitions in the state graph | The engine API | The `clip` and `transition-time` attributes |
| State graphs and parameters | `entity.anim.loadStateGraph()` | The Anim State Graph asset editor | The engine API | The engine API |
| Blend trees | In the state graph data | From a script only | The engine API | The engine API |
| Layers and masks | `entity.anim.addLayer()` | Layers in the graph, masks in the Anim component | The engine API | The engine API |
| Events | `new pc.AnimEvents()` on a clip | Events on the animation asset | The engine API | The engine API |

:::note

The anim component replaced the older **animation** component, which plays clips without state graphs. That component still works, but use the anim component in new projects. For 2D skeletal animation made with Spine, see [Spine](/user-manual/2D/spine/).

:::

## In This Section {#in-this-section}

- [Playing Animations](/user-manual/animation/anim-component/) - Adding the anim component, playing and switching clips, speed, pausing, looping and finished clips.
- [Animation Clips](/user-manual/animation/anim-animation-assets/) - Clips in GLB and FBX files, how they bind to nodes, and building clips in code.
- [State Graphs](/user-manual/animation/anim-state-graph-assets/) - States, transitions, parameters and conditions, built in the Editor or in code.
- [Blend Trees](/user-manual/animation/blend-trees/) - Blending clips by one or two parameters, or by a weight each.
- [Layers and Masks](/user-manual/animation/anim-layer-masking/) - Playing several graphs at once, blending them, and masking them to parts of a model.
- [Animation Events](/user-manual/animation/anim-events/) - Firing events at chosen times in a clip and handling them.

## See Also

- [Anim Component](/user-manual/editor/scenes/components/anim/) - The Editor reference for the component
- [Animation Asset](/user-manual/editor/assets/inspectors/animation/) - Previewing clips and the animation import settings in the Editor
- [Anim State Graph Blending](/tutorials/anim-blending/) - Tutorial that builds a blended state graph in the Editor
- [Animation examples](https://playcanvas.com/examples/#/animation/locomotion) - Engine examples of locomotion, blend trees, layer masks, events and more
- [AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html) and [AnimComponentLayer](https://api.playcanvas.com/engine/classes/AnimComponentLayer.html) - The engine API reference

---
title: <pc-model>
description: "Reference for the pc-model element: instantiate a 3D model from a GLB container asset within a scene or entity."
---

The `<pc-model>` tag is used to define an entity that instantiates a 3D model from a GLB file.

For a walkthrough of the whole workflow — exporting, compressed meshes, discovering what a file contains and adjusting it — see [Loading Models](../loading-models.md).

:::note[Usage]

* It must be a direct child of a [`<pc-scene>`](../pc-scene) or a [`<pc-entity>`](../pc-entity).
* It can have 0..n [`<pc-node>`](../pc-node) children, each binding to a node inside the instantiated hierarchy to override it, add components to it or attach new content under it.

:::

## Attributes

All attributes of [`<pc-entity>`](../pc-entity) are also available.

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | String | - | Container asset ID (must reference a `container` type asset) |

</div>

## Events

Listen to these events using [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) or by assigning an event listener to the `oneventname` property of this interface.

| Event | Description |
| --- | --- |
| `load` | Fired each time the container asset finishes instantiating, including a re-instantiation after `asset` changes. |
| `error` | An [`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent) fired when the container asset fails to load, with the engine's error in `message`. |

Neither event bubbles, so listen on the element itself — or use a capture-phase listener on an ancestor to observe every model on the page.

The element becomes ready once its hierarchy has been instantiated and added to the scene, so a ready `<pc-model>` always has a non-null `entity` with valid world transforms. A failed load also settles readiness, with `entity` left `null` — readiness means the load settled, not that it succeeded, so listen for `error` (or check `entity`) to tell the two apart.

## Animation

If the container holds any animations, the instantiated root is given an `anim` component and the *first* animation is assigned and played. This happens automatically: there is no attribute to enable it, and none to choose a different clip, pause it or blend between clips.

Markup therefore covers exactly one case — play what the file came with. For anything more, reach the component through the element's `entity` and drive it with the engine's [AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html) API:

```javascript
import { whenReady } from '@playcanvas/web-components';

const { entity } = await whenReady('pc-model');
entity.anim.baseLayer.pause();
```

Importing by package name needs `@playcanvas/web-components` in your page's import map — see [Programmatic Access](../programmatic-access.md).

A model with no animations gets no `anim` component, so checking for one is how you tell whether a file's animations survived its export — the [printable hierarchy](#inspecting-the-hierarchy) shows it as `(anim)` on the root.

## Example

A GLB with a skeletal animation — which auto-plays, exactly as the [Animation](#animation) section above describes. Drag to orbit:

```html live-example
<pc-app>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.21.4/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/t-rex.glb" id="t-rex"></pc-asset>
    <pc-material id="floor" diffuse="#3a3f4b"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="2.5 1.5 3.5">
            <pc-camera clear-color="#2a2d36"></pc-camera>
            <pc-scripts>
                <pc-script name="cameraControls" focus-point="0 1.2 0" pitch-range="-90 0" zoom-range="1.5 10"></pc-script>
            </pc-scripts>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows shadow-distance="20" intensity="1.5"></pc-light>
        </pc-entity>
        <pc-entity name="ground" scale="30 30 30">
            <pc-render type="plane" material="floor"></pc-render>
        </pc-entity>
        <pc-model asset="t-rex" scale="1.5 1.5 1.5"></pc-model>
    </pc-scene>
</pc-app>
```

To reach inside the loaded hierarchy, nest a [`<pc-node>`](../pc-node) for each node you want to change:

```html
<pc-model asset="car">
    <!-- Hide the ground plane the GLB was exported with -->
    <pc-node name="Plane" enabled="false"></pc-node>
</pc-model>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-model>` elements using the [ModelElement API](https://api.playcanvas.com/web-components/classes/ModelElement.html).

### Inspecting the Hierarchy

The `hierarchy()` method reports the instantiated tree as it actually exists, which is the vocabulary a [`<pc-node>`](../pc-node) resolves against — and not necessarily what the source asset's node names suggest. [Loading Models](../loading-models.md#seeing-what-you-loaded) works through a real example; this is the reference. Printing it is one line:

```javascript
import { whenReady } from '@playcanvas/web-components';

const model = await whenReady('pc-model');
console.log(String(model.hierarchy()));
```

```none
Car
├─ FrontAxle
│  └─ Wheel [0] (render) {defaultGlbMaterial}
├─ RearAxle
│  └─ Wheel [1] (render) {defaultGlbMaterial}
├─ Wing
└─ Wing1
```

Each line is a node: its name, then `[index]` when other nodes share that name, the component types it carries in parentheses, and the materials of a render component in braces. So the two wheels above are reached with `<pc-node name="Wheel" index="0">` and `<pc-node name="Wheel" index="1">`, and `Wing1` is the engine renaming a second `Wing` sibling apart as it built the hierarchy.

`hierarchy()` returns the root node of a plain-data tree, or `null` while there is nothing instantiated — before the container asset has loaded, after a load failed, or once the element has left the document. Every node carries:

| Property | Type | Description |
| --- | --- | --- |
| `name` | String | The node's name as instantiated, which is the name a `<pc-node>` looks up. It can differ from the name in the source asset: the engine synthesizes `node_<index>` names for unnamed nodes and renames identically named siblings apart |
| `path` | String | The node's `/`-separated path below the model root, which is the `path` a `<pc-node>` bound to it reports. The root's path is its own name |
| `index` | Number | The node's position among the nodes sharing its name, counted in depth-first order over the whole model — exactly the match a `<pc-node>`'s `index` selects |
| `components` | String[] | The types of the components attached to the node (such as `render`), sorted |
| `materials` | Object[] | One `{ index, name }` entry per mesh instance of the node's render component, in component order. Empty for a node without one |
| `children` | Object[] | The node's child nodes |
| `toString()` | Function | Renders the subtree rooted at this node as the printable tree above, so `String(node)` prints any branch |

The material `name` values are runtime labels read as they stand, which makes them a convenient handle but not a unique one: an unnamed glTF material is called `Untitled`, a primitive authored without a material carries the engine's shared `defaultGlbMaterial`, duplicates stay duplicated, and the name is `null` if a script cleared the assignment. The `index` is the unambiguous one. Both are what [`<pc-node>`'s `material-overrides`](../pc-node#overriding-materials) selects with, and a [`<pc-material>`](../pc-material) you swap in reports whatever its `name` attribute says — worth setting on any material you want to recognize here.

The tree is a snapshot, computed afresh on each call: it does not track later changes to the hierarchy, and mutating it changes nothing. Being plain data, it survives `JSON.stringify`, so it is easy to log, diff or assert against in a test.

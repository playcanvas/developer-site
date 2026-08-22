---
title: <pc-model>
description: "Reference for the pc-model element: instantiate a 3D model from a GLB container asset, and host components and child entities on the stable entity it creates."
---

The `<pc-model>` tag is used to define an entity that instantiates a 3D model from a GLB file.

For a walkthrough of the whole workflow — exporting, compressed meshes, discovering what a file contains and adjusting it — see [Loading Models](../loading-models.md).

:::note[Usage]

* It must be a direct child of a [`<pc-scene>`](../pc-scene), a [`<pc-entity>`](../pc-entity), another `<pc-model>` or a [`<pc-node>`](../pc-node).
* It can have 0..n [`<pc-node>`](../pc-node) children, each binding to a node inside the instantiated hierarchy to override it, add components to it or attach new content under it.
* It can have [`<pc-entity>`](../pc-entity) and `<pc-model>` children, and one of each component type — it hosts them exactly as a [`<pc-entity>`](../pc-entity) does.

:::

`<pc-model>` is an entity in its own right, not just a loader. The element creates its own entity — the *host* — and parents the GLB's instantiated content beneath it. That is what lets a model carry components and children directly:

```html
<pc-model name="t-rex" asset="t-rex" scale="3 3 3">
    <pc-anim></pc-anim>
</pc-model>
```

The host is the element's `entity`, and it is stable: it exists from boot, survives a change of `asset`, and keeps whatever components and children were attached to it across a reload. The instantiated GLB content is separately available as `contentEntity`.

Because the element's own transform belongs to the host, `position`, `rotation` and `scale` are *instance placement* — they compose with whatever transform the asset authored on its own root rather than replacing it.

## Attributes

`<pc-model>` takes every attribute of [`<pc-entity>`](../pc-entity), including the `onpointer*` inline handlers, and adds `asset`.

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | String | - | Container asset ID (must reference a `container` type asset) |
| `enabled` | Boolean | `"true"` | Enabled state of the model |
| `name` | String | - | Name identifier for the host entity |
| `position` | Vector3 | `"0 0 0"` | Local-space position as "X Y Z" values |
| `rotation` | Vector3 | `"0 0 0"` | Local-space rotation as "X Y Z" Euler angles in degrees |
| `scale` | Vector3 | `"1 1 1"` | Local-space scale as "X Y Z" values |
| `tags` | String | - | Comma-separated list of tags |

</div>

## Events

Listen to these events using [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) or by assigning an event listener to the `oneventname` property of this interface.

| Event | Description |
| --- | --- |
| `load` | Fired each time the container asset finishes instantiating, including a re-instantiation after `asset` changes. |
| `error` | An [`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent) fired when the container asset fails to load, with the engine's error in `message`. |

Neither event bubbles, so listen on the element itself — or use a capture-phase listener on an ancestor to observe every model on the page.

The host is registered for picking, so `<pc-model>` also fires the five pointer events a [`<pc-entity>`](../pc-entity) does — `pointerdown`, `pointerenter`, `pointerleave`, `pointermove` and `pointerup` — with the same inline `onpointer*` attribute forms. A whole model becomes clickable without a wrapper or a [`<pc-node>`](../pc-node):

```html
<pc-model asset="t-rex" onpointerdown="this.setAttribute('scale', '2 2 2')"></pc-model>
```

Pointer events resolve to the nearest *listening* element, so a model that listens for nothing does not swallow events from a listening ancestor.

Readiness means the current `asset` selection has settled, which covers three outcomes: content loaded and parented beneath the host, a load that failed, or no `asset` assigned at all. The host `entity` is non-null throughout — including after a failure — so it is not the way to tell success from failure. Use the `error` event, or check `contentEntity`:

```javascript
const model = await whenReady('pc-model');
if (!model.contentEntity) {
    // no asset, or the load failed
}
```

## Animation

A container's animations play when you nest a [`<pc-anim>`](../pc-anim) inside the model. One empty tag is enough to get what the file came with — every animation in the container becomes a clip, named after its track, and the first one starts playing:

```html
<pc-model asset="robot">
    <pc-anim></pc-anim>
</pc-model>
```

The component attaches to the model's host, so no wrapper entity is involved. Add [`<pc-anim-clip>`](../pc-anim-clip) children to name the clips yourself, set a per-clip speed or looping, or take clips from other files.

To check whether a file's animations survived its export, ask the component what it found:

```javascript
import { whenReady } from '@playcanvas/web-components';

const anim = await whenReady('pc-anim');
console.log(anim.clips); // ['Walk', 'Idle']
```

Importing by package name needs `@playcanvas/web-components` in your page's import map — see [Programmatic Access](../programmatic-access.md). A container with no animations in it logs a warning naming the model, so the console answers the same question without any code.

## Example

A GLB with a skeletal animation, played by the [`<pc-anim>`](../pc-anim) nested inside the model. Drag to orbit:

```html live-example
<pc-app>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.21.4/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/t-rex.glb" id="t-rex"></pc-asset>
    <pc-material id="floor" diffuse="#3a3f4b"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="2.5 1.5 3.5">
            <pc-camera clear-color="#2a2d36"></pc-camera>
            <pc-script>
                <pc-script-instance name="cameraControls" focus-point="0 1.2 0" pitch-range="-90 0" zoom-range="1.5 10"></pc-script-instance>
            </pc-script>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows shadow-distance="20" intensity="1.5"></pc-light>
        </pc-entity>
        <pc-entity name="ground" scale="30 30 30">
            <pc-render type="plane" material="floor"></pc-render>
        </pc-entity>
        <pc-model name="t-rex" asset="t-rex" scale="1.5 1.5 1.5">
            <pc-anim></pc-anim>
        </pc-model>
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

### The Two Entities

A `<pc-model>` exposes two entities, and picking the wrong one is the easiest mistake to make here:

| Property | What it is |
| --- | --- |
| `entity` | The **host** the element creates and fronts. Non-null from boot, stable across `asset` changes, and where components and child elements attach |
| `contentEntity` | The **instantiated GLB root**, parented beneath the host. `null` until a load succeeds, and replaced on every reload |

So components go on `entity`, and questions about what the file contained go to `contentEntity`:

```javascript
const model = await whenReady('pc-model');

model.entity.anim;          // the component a nested <pc-anim> added
model.contentEntity.name;   // the GLB root's own name, e.g. 'Sketchfab_model'
```

`hierarchy()` and [`<pc-node>`](../pc-node) resolution are both scoped to the content root, so the host never appears in a printed tree, a node `path`, or a name search.

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

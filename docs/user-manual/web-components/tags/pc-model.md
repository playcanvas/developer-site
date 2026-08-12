---
title: <pc-model>
description: "Reference for the pc-model element: instantiate a 3D model from a GLB container asset within a scene or entity."
---

The `<pc-model>` tag is used to define an entity that instantiates a 3D model from a GLB file.

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

## Example

```html
<pc-app>
    <pc-asset src="assets/car.glb" id="car"></pc-asset>
    <pc-scene>
        <pc-model asset="car"></pc-model>
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

Writing a [`<pc-node>`](../pc-node) means knowing what the GLB instantiated as — and a viewer that shows you the node names of the *source* asset is not always showing you those. The `hierarchy()` method reports the tree as it actually exists, which is the vocabulary a `<pc-node>` resolves against. Printing it is one line:

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

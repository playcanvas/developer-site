---
title: <pc-node>
description: "Reference for the pc-node element: bind to a node inside a loaded model's hierarchy to override its transform, enabled state and tags, add components to it, or attach new content under it."
---

The `<pc-node>` tag binds to a node inside the hierarchy that a [`<pc-model>`](../pc-model) instantiated, and declares overrides against it. It is how you adjust what a GLB was authored with, without editing the GLB: hide a node, move it, give it a component, or parent new content under it.

Where [`<pc-entity>`](../pc-entity) *creates* an entity, `<pc-node>` *references* one that the model already created. Its `name` is a lookup, never a rename.

:::note[Usage]

* It must be a descendant of a [`<pc-model>`](../pc-model), either directly or nested inside another `<pc-node>`.
* It can have 0..n nested [`<pc-node>`](../pc-node) children, which resolve their own `name` within the bound node's subtree.
* It can have 0..n [`<pc-entity>`](../pc-entity) children, which are created and parented under the bound node — attachment points for new content.
* It can have the same component tags as a [`<pc-entity>`](../pc-entity) — [`<pc-collision>`](../pc-collision), [`<pc-light>`](../pc-light), [`<pc-scripts>`](../pc-scripts) and the rest — which add that component to the bound node.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | *authored* | Overrides the node's enabled state |
| `index` | Number | - | Which match to bind when `name` matches more than one node, 0-based in depth-first order. Required when the name is ambiguous, optional otherwise |
| `name` | String | - | Name of the node to bind, looked up within the enclosing `<pc-model>` (or `<pc-node>`) |
| `position` | Vector3 | *authored* | Overrides the node's local position as "X Y Z" values |
| `rotation` | Vector3 | *authored* | Overrides the node's local rotation as "X Y Z" Euler angles in degrees |
| `scale` | Vector3 | *authored* | Overrides the node's local scale as "X Y Z" values |
| `tags` | String | *authored* | Overrides the node's tags, separated by spaces or commas |

</div>

:::note[Overrides, not defaults]

Everything except `name` and `index` is an *override*, so `<pc-node>` reads its absent attributes differently from every other tag. An attribute that is present replaces the authored value; an attribute that is absent leaves it alone. Removing one at runtime — or assigning `null` to the matching JavaScript property — restores the value the model was authored with, rather than the engine default. That is why the table above has no concrete defaults: the default *is* whatever the GLB says.

An override replaces the authored value; it does not compose with it. `position="0 1 0"` puts the node at a local Y of 1, whatever it was exported at.

:::

## Finding the Node

`name` matches on the node names in the loaded hierarchy, taking the first match in depth-first order. Nesting one `<pc-node>` inside another scopes the inner search to the outer node's subtree, which is the simplest way to reach a node whose name is only unique locally.

When a name is not unique within the search scope, the element binds nothing and warns with the paths of every candidate, so you can pick one with `index`:

```none
pc-node 'Wheel' is ambiguous in model 'car' - specify index: [0] Body/Wheel_FL/Wheel, [1] Body/Wheel_FR/Wheel
```

Binding nothing is deliberate: guessing would silently decorate the wrong node, and a re-export that introduced a duplicate name would break a document that used to work.

The other resolution failures warn in the same way — a name that matches nothing (with the closest name it did find, as a typo hint), an `index` beyond the number of matches, and a node that another `<pc-node>` has already bound. In each case the element binds nothing and never becomes ready.

An element only becomes ready once it is bound, and its descendants wait with it. If the model reloads, or the element retargets because you changed `name`, it re-resolves and re-applies its overrides, components and attached content against the new node.

## Events

`<pc-node>` dispatches the same pointer events as [`<pc-entity>`](../pc-entity), fired when the pointer intersects the bound node's geometry. Binding a node is what makes it a pick target, so a `<pc-node>` is also how you make one part of a model interactive.

| Event | Description |
| --- | --- |
| `pointerdown` | Fired when a pointer is pressed down on the node. |
| `pointerenter` | Fired when a pointer enters the node. |
| `pointerleave` | Fired when a pointer leaves the node. |
| `pointermove` | Fired when a pointer is moved over the node. |
| `pointerup` | Fired when a pointer is released from the node. |

The inline `onpointer*` attributes work here exactly as they do on [`<pc-entity>`](../pc-entity).

## Example

```html
<pc-app>
    <pc-asset src="assets/car.glb" id="car"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="0 1 4">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-model asset="car">
            <!-- Hide the ground plane the GLB was exported with -->
            <pc-node name="Plane" enabled="false"></pc-node>

            <!-- Nudge the roof up and tag it, leaving its authored rotation and scale alone -->
            <pc-node name="Roof" position="0 0.05 0" tags="openable"></pc-node>

            <!-- Attach a spot light under the headlight node -->
            <pc-node name="Headlight_L">
                <pc-entity>
                    <pc-light type="spot" intensity="4" range="20"></pc-light>
                </pc-entity>
            </pc-node>
        </pc-model>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-node>` elements using the [NodeElement API](https://api.playcanvas.com/web-components/classes/NodeElement.html).

Alongside `entity`, which is the node it bound, the element reports how resolution went. `state` is `"pending"` while it has nothing to bind (no name yet, or the model has not instantiated), `"bound"` once it has, and `"missing"`, `"ambiguous"` or `"duplicate"` when resolution failed. `path` is the `/`-separated path of the bound node below the search scope, or `null` while unbound. Together they let you assert a document's bindings rather than reading the console:

```javascript
import { whenReady } from '@playcanvas/web-components';

const node = await whenReady('pc-node[name="Roof"]');
console.log(node.state, node.path); // 'bound' 'Body/Roof'
```

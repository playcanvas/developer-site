---
title: <pc-node>
description: "Reference for the pc-node element: bind to a node inside a loaded model's hierarchy to override its transform, enabled state and tags, add components to it, or attach new content under it."
---

The `<pc-node>` tag binds to a node inside the hierarchy that a [`<pc-model>`](../pc-model) instantiated, and declares overrides against it. It is how you adjust what a GLB was authored with, without editing the GLB: hide a node, move it, give it a component, or parent new content under it.

Where [`<pc-entity>`](../pc-entity) *creates* an entity, `<pc-node>` *references* one that the model already created. Its `name` is a lookup, never a rename.

For worked examples of the common adjustments — hiding, re-posing, reskinning, attaching content and adding components — see [Loading Models](../loading-models.md#adjusting-what-you-loaded).

:::note[Usage]

* It must be a descendant of a [`<pc-model>`](../pc-model), either directly or nested inside another `<pc-node>`.
* It can have 0..n nested [`<pc-node>`](../pc-node) children, which resolve their own `name` within the bound node's subtree.
* It can have 0..n [`<pc-entity>`](../pc-entity) children, which are created and parented under the bound node — attachment points for new content.
* It can have the same component tags as a [`<pc-entity>`](../pc-entity) — [`<pc-collision>`](../pc-collision), [`<pc-light>`](../pc-light), [`<pc-script>`](../pc-script) and the rest — which add that component to the bound node.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | *authored* | Overrides the node's enabled state |
| `index` | Number | - | Which match to bind when `name` matches more than one node, 0-based in depth-first order. Required when the name is ambiguous, optional otherwise |
| `material-overrides` | String | *authored* | Overrides the material assignments of the bound node's render component, as a JSON object mapping selectors to `<pc-material>` ids. See [Overriding Materials](#overriding-materials) |
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

## Overriding Materials

`material-overrides` reskins part of a model without editing the GLB. Its value is a JSON object mapping selectors to [`<pc-material>`](../pc-material) ids, so wrap it in single quotes — JSON needs the double ones for itself:

```html
<pc-model asset="car">
    <pc-node name="Body" material-overrides='{"name:CarPaint": "candy-red", "index:3": "smoked-glass"}'></pc-node>
</pc-model>
```

Both selectors address the mesh instances of the bound node's render component:

| Selector | Selects |
| --- | --- |
| `name:X` | Every mesh instance whose material is named `X` |
| `index:N` | Mesh instance `N`, numbered from 0 in the order the render component lists them |

The mapping is sparse: an assignment that no rule matches keeps the material the model was authored with. Where rules of both kinds cover the same mesh instance, `index:` wins — so you can replace a material everywhere it appears by name, then pin the one exception by index.

Use [`<pc-model>`'s `hierarchy()`](../pc-model#inspecting-the-hierarchy) to discover the names and indices a node offers. Material names are runtime labels rather than unique identifiers — glTF allows duplicates, leaves unnamed materials called `Untitled`, and gives a primitive authored without a material the engine's shared `defaultGlbMaterial` — so reach for `index:` whenever a name is not distinct.

Names are matched against the assignments captured when the mapping first applied. A rule therefore never matches a material that another rule put there, and renaming a material afterwards cannot change what it selects. Removing the attribute puts every captured assignment back, as does assigning `null` to the `materialOverrides` property or setting an empty `{}`.

The target is the render component the model was authored with. A `<pc-node>` bound to a node that has none warns and changes nothing, and a render component that a child [`<pc-render>`](../pc-render) added is never the target.

Rules are validated one at a time, and an invalid one is ignored while the rest of the mapping still applies. Each of these warns: a selector with neither prefix, an `index:` that is not a non-negative integer, an index past the last mesh instance, a name that matches no assignment (the warning lists the names that are there), and an id that resolves to no `<pc-material>`. A value that is not a JSON object at all — malformed JSON, or an array — warns and is treated as absent, restoring the captured assignments rather than leaving the previous mapping in force.

A `<pc-material>` added to the document *after* a mapping referenced it is not picked up on its own. Assign the mapping again once the element exists and the rule resolves.

## Events

`<pc-node>` dispatches the same pointer events as [`<pc-entity>`](../pc-entity), fired when the pointer intersects the bound node's geometry. Binding a node is what makes it a pick target, so a `<pc-node>` is also how you make one part of a model interactive.

| Event | Description |
| --- | --- |
| `click` | Fired when a primary pointer button is pressed and then released over the node. |
| `pointerdown` | Fired when a pointer is pressed down on the node. |
| `pointerenter` | Fired when a pointer enters the node. |
| `pointerleave` | Fired when a pointer leaves the node. |
| `pointermove` | Fired when a pointer is moved over the node. |
| `pointerup` | Fired when a pointer is released from the node. |

The inline `onclick` and `onpointer*` attributes work here exactly as they do on [`<pc-entity>`](../pc-entity), including [how a click resolves](../pc-entity#clicks) when the press and release land on different geometry.

## Example

This GLB instantiates two nodes — `play` (the orange shell, its logo cut out of each face) and `canvas` (the dark inner box you see through the cutouts). [`hierarchy()`](../pc-model#inspecting-the-hierarchy) is how you discover that. The `<pc-node>` binds `play` and swaps its authored orange for blue via `material-overrides`. Try binding `canvas` instead, or add `enabled="false"` to hide the shell entirely. Drag to orbit:

```html live-example
<pc-app>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.22.0/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/playcanvas-cube.glb" id="cube"></pc-asset>
    <pc-material id="repaint" name="Repaint" diffuse="#4a9eff"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="0 0 3">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
            <pc-script>
                <pc-script-instance name="cameraControls" enable-pan="false" zoom-range="1.5 6"></pc-script-instance>
            </pc-script>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light intensity="2"></pc-light>
        </pc-entity>
        <pc-model asset="cube">
            <!-- Bind the node named "play" and swap in the repaint material -->
            <pc-node name="play" material-overrides='{"index:0": "repaint"}'></pc-node>
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

The `materialOverrides` property is the mapping described in [Overriding Materials](#overriding-materials), as an object rather than a JSON string:

```javascript
const body = await whenReady('pc-node[name="Body"]');
body.materialOverrides = { 'name:CarPaint': 'candy-red' };
body.materialOverrides = null; // back to the authored materials
```

The element stores a frozen copy of what you assign, so mutating your object afterwards changes nothing — assign a new mapping to change one. Property writes do not reflect back to the `material-overrides` attribute, which follows how the other override properties behave.

## See Also

* [`<pc-model>`](../pc-model) — the model whose node is bound
* [`<pc-material>`](../pc-material) — materials a node can substitute via `material-overrides`
* [`<pc-entity>`](../pc-entity) — attaches new content under a node
* [Loading Models](../loading-models.md) — finding the nodes inside a loaded model

Examples: [Product Viewer](https://playcanvas.github.io/web-components/examples/product-viewer.html), [Ragdoll](https://playcanvas.github.io/web-components/examples/ragdoll.html) and [Vehicle Physics](https://playcanvas.github.io/web-components/examples/vehicle-physics.html).

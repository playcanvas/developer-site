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

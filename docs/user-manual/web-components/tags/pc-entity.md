---
title: <pc-entity>
---

The `<pc-entity>` tag is used to define an entity.

:::note[Usage]

* It must be a direct child of [`<pc-scene>`](../pc-scene) or another `<pc-entity>`.
* It can have 0..n [`<pc-entity>`](../pc-entity) children.
* It can optionally have one of each component type as children: [`<pc-camera>`](../pc-camera), [`<pc-collision>`](../pc-collision), [`<pc-element>`](../pc-element), [`<pc-light>`](../pc-light), [`<pc-listener>`](../pc-listener), [`<pc-particles>`](../pc-particles), [`<pc-render>`](../pc-render), [`<pc-rigidbody>`](../pc-rigidbody), [`<pc-screen>`](../pc-screen), [`<pc-scripts>`](../pc-scripts), [`<pc-sounds>`](../pc-sounds), [`<pc-splat>`](../pc-splat).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | Enabled state of the entity |
| `name` | String | - | Name identifier for the entity |
| `position` | Vector3 | `"0 0 0"` | Local-space position as "X Y Z" values |
| `rotation` | Vector3 | `"0 0 0"` | Local-space rotation as "X Y Z" Euler angles in degrees |
| `scale` | Vector3 | `"1 1 1"` | Local-space scale as "X Y Z" values |
| `tags` | String | - | Space-separated list of tags |

</div>

## Events

Listen to these events using [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) or by assigning an event listener to the `oneventname` property of this interface.

| Event | Description |
| --- | --- |
| `pointerdown` | Fired when a pointer is pressed down on the entity. |
| `pointerenter` | Fired when a pointer enters the entity. |
| `pointerleave` | Fired when a pointer leaves the entity. |
| `pointermove` | Fired when a pointer is moved over the entity. |
| `pointerup` | Fired when a pointer is released from the entity. |

## Example

```html
<pc-entity name="MyEntity" position="1 2 3" rotation="45 0 0" scale="2 2 2" tags="tag1 tag2">
    <!-- Child entities and components go here -->
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-entity>` elements using the [EntityElement API](https://api.playcanvas.com/web-components/classes/EntityElement.html).

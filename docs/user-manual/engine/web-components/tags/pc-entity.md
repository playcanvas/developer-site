---
title: <pc-entity>
---

The `<pc-entity>` tag is used to define an entity.

:::note

* It must be a direct child of [`<pc-scene>`](../pc-scene) or another `<pc-entity>`.

:::

## Attributes

| Attribute | Description |
| --- | --- |
| `enabled` | Enabled state of the entity. If not specified, `true` is used. |
| `name` | The name of the entity. |
| `position` | The position of the entity. Specified as a space-separated list of X, Y, and Z values. If not specified, `0 0 0` is used. |
| `rotation` | The rotation of the entity. Specified as a space-separated list of X, Y, and Z Euler angles in degrees. If not specified, `0 0 0` is used. |
| `scale` | The scale of the entity. Specified as a space-separated list of X, Y, and Z values. If not specified, `1 1 1` is used. |
| `tags` | A space-separated list of tags for the entity. |

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

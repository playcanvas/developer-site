---
title: <pc-listener>
---

The `<pc-listener>` tag is used to define a listener component. It has no attributes.

:::note

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

| Attribute | Description |
| --- | --- |
| `enabled` | Enabled state of the component. If not specified, `true` is used. |

## Example

```html
<pc-entity>
    <pc-listener></pc-listener>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-listener>` elements using the [ListenerComponentElement API](https://api.playcanvas.com/web-components/classes/ListenerComponentElement.html).

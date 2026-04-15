---
title: <pc-listener>
description: "Reference for the pc-listener element: positional audio listener placement and settings for 3D sound relative to the active camera."
---

The `<pc-listener>` tag is used to define a listener component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | Enabled state of the component |

</div>

## Example

```html
<pc-entity>
    <pc-listener></pc-listener>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-listener>` elements using the [ListenerComponentElement API](https://api.playcanvas.com/web-components/classes/ListenerComponentElement.html).

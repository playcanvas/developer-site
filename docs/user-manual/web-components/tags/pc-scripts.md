---
title: <pc-scripts>
---

The `<pc-scripts>` tag is used to define a scripts component.

:::note

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

| Attribute | Description |
| --- | --- |
| `enabled` | Enabled state of the scripts component. If not specified, `true` is used. |

## Example

```html
<pc-entity>
    <pc-scripts>
        <pc-script name="myScript"></pc-script>
    </pc-scripts>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-scripts>` elements using the [ScriptComponentElement API](https://api.playcanvas.com/web-components/classes/ScriptComponentElement.html).

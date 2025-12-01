---
title: <pc-scripts>
---

The `<pc-scripts>` tag is used to define a scripts component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).
* It can have 0..n [`<pc-script>`](../pc-script) children.

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
    <pc-scripts>
        <pc-script name="myScript"></pc-script>
    </pc-scripts>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-scripts>` elements using the [ScriptComponentElement API](https://api.playcanvas.com/web-components/classes/ScriptComponentElement.html).

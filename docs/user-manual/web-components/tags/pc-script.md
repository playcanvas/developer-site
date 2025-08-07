---
title: <pc-script>
---

The `<pc-script>` tag is used to define a script.

:::note

* It must be a direct child of a [`<pc-scripts>`](../pc-scripts) component.
* The script must have been loaded via the [`<pc-asset>`](../pc-asset) tag.

:::

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `attributes` | String | `""` | JSON string of script attributes |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `name` | String | - | Script name (must match the script's `scriptName` property) |

## Example

```html
<pc-entity>
    <pc-scripts>
        <pc-script name="myScript"></pc-script>
    </pc-scripts>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-script>` elements using the [ScriptElement API](https://api.playcanvas.com/web-components/classes/ScriptElement.html).

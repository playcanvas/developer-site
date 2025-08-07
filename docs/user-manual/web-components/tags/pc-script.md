---
title: <pc-script>
---

The `<pc-script>` tag is used to define a script.

:::note

* It must be a direct child of a [`<pc-scripts>`](../pc-scripts) component.
* The script must have been loaded via the [`<pc-asset>`](../pc-asset) tag.

:::

## Attributes

| Attribute | Description |
| --- | --- |
| `attributes` | A JSON string of attributes for the script. |
| `enabled` | Enabled state of the component. If not specified, `true` is used. |
| `name` | The name of the script. Set this to the value of the `scriptName` property of the assigned script. |

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

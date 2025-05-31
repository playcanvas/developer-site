---
title: <pc-script>
---

The `<pc-script>` tag is used to define a script.

:::note

* It must be a direct child of a [`<pc-scripts>`](../pc-scripts) component.
* The script must have been loaded via the [`<pc-asset>`](../pc-asset) tag.

:::

## 属性

| 属性 (Attribute) | 説明 |
| --- | --- |
| `attributes` | A JSON string of attributes for the script. |
| `enabled` | Enabled state of the script. If not specified, `true` is used. |
| `name` | The name of the script. The name is the class name of the script in camel case. |

## 例

```html
<pc-entity>
    <pc-scripts>
        <pc-script name="myScript"></pc-script>
    </pc-scripts>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-script>` elements using the [ScriptElement API](https://api.playcanvas.com/classes/EngineWebComponents.ScriptElement.html).

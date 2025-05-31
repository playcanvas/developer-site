---
title: <pc-scripts>
---

The `<pc-scripts>` tag is used to define a scripts component.

:::note

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## 属性

| 属性 (Attribute) | 説明 |
| --- | --- |
| `enabled` | Enabled state of the scripts component. If not specified, `true` is used. |

## 例

```html
<pc-entity>
    <pc-scripts>
        <pc-script name="myScript"></pc-script>
    </pc-scripts>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-scripts>` elements using the [ScriptComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.ScriptComponentElement.html).

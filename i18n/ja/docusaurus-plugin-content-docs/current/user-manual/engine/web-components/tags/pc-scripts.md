---
title: <pc-scripts>
---

`<pc-scripts>`タグは、スクリプトコンポーネントを定義するために使用されます。

:::note

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性

| 属性 | 説明 |
| --- | --- |
| `enabled` | スクリプトコンポーネントの有効状態。指定されていない場合、`true`が使用されます。 |

## 例

```html
<pc-entity>
    <pc-scripts>
        <pc-script name="myScript"></pc-script>
    </pc-scripts>
</pc-entity>
```

## JavaScriptインターフェース

[ScriptComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.ScriptComponentElement.html)を使用して、`<pc-scripts>`要素をプログラムで作成および操作できます。

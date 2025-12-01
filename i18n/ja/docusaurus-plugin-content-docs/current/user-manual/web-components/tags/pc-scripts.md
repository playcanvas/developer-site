---
title: <pc-scripts>
---

`<pc-scripts>`タグは、スクリプトコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。
* 0..n個の[`<pc-script>`](../pc-script)の子を持つことができます。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |

</div>

## 例

```html
<pc-entity>
    <pc-scripts>
        <pc-script name="myScript"></pc-script>
    </pc-scripts>
</pc-entity>
```

## JavaScriptインターフェース

[ScriptComponentElement API](https://api.playcanvas.com/web-components/classes/ScriptComponentElement.html)を使用して、`<pc-scripts>`要素をプログラムで作成および操作できます。

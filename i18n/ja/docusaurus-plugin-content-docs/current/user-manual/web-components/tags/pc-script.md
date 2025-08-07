---
title: <pc-script>
---

`<pc-script>`タグはスクリプトを定義するために使用されます。

:::note[使用法]

* それは[`<pc-scripts>`](../pc-scripts)コンポーネントの直接の子である必要があります。
* スクリプトは[`<pc-asset>`](../pc-asset)タグを介してロードされている必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `attributes` | 文字列 | `""` | スクリプト属性のJSON文字列 |
| `enabled` | 真偽値 | `"true"` | スクリプトの有効状態 |
| `name` | 文字列 | - | スクリプト名 (スクリプトの`scriptName`プロパティと一致する必要があります) |

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

[ScriptElement API](https://api.playcanvas.com/web-components/classes/ScriptElement.html)を使用して、`<pc-script>`要素をプログラムで作成および操作できます。

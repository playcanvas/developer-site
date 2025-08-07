---
title: <pc-listener>
---

`<pc-listener>`タグは、リスナーコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity)の直接の子である必要があります。

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
    <pc-listener></pc-listener>
</pc-entity>
```

## JavaScriptインターフェース

[ListenerComponentElement API](https://api.playcanvas.com/web-components/classes/ListenerComponentElement.html)を使用して、`<pc-listener>`要素をプログラムで作成および操作できます。

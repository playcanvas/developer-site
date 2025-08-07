---
title: <pc-listener>
---

`<pc-listener>` タグは、リスナーコンポーネントを定義するために使用されます。属性はありません。

:::note

* これは [`<pc-entity>`](../pc-entity) の直接の子である必要があります。

:::

## 例

```html
<pc-entity>
    <pc-listener></pc-listener>
</pc-entity>
```

## 属性

| 属性 | 説明 |
| --- | --- |
| `enabled` | コンポーネントの有効状態。指定されていない場合、`true`が使用されます。 |

## JavaScript インターフェース

[ListenerComponentElement API](https://api.playcanvas.com/web-components/classes/ListenerComponentElement.html) を使用して、プログラムで `<pc-listener>` 要素を作成および操作できます。

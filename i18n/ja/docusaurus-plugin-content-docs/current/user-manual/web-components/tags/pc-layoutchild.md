---
title: <pc-layoutchild>
description: "pc-layoutchild要素のリファレンス: レイアウトグループ内での子ごとのレイアウト制約（最小/最大サイズとフィット比率）です。"
---

`<pc-layoutchild>`タグは、親の [`<pc-layoutgroup>`](../pc-layoutgroup) によって要素がどのようにサイズ調整されるかを制御するレイアウトの子コンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-element>`](../pc-element) も持つ [`<pc-entity>`](../pc-entity) の直接の子である必要があります。
* そのエンティティ自体は、[`<pc-layoutgroup>`](../pc-layoutgroup) を持つエンティティの子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `exclude-from-layout` | Flag | - | この要素をレイアウトから除外し、スペースを取らないようにします |
| `fit-height-proportion` | Number | `"0"` | `height-fitting` が stretch または shrink のとき、この要素が取るグループの余剰高さの割合 |
| `fit-width-proportion` | Number | `"0"` | `width-fitting` が stretch または shrink のとき、この要素が取るグループの余剰幅の割合 |
| `max-height` | Number | - | 要素がレイアウトされる最大の高さ（制限しない場合は省略） |
| `max-width` | Number | - | 要素がレイアウトされる最大の幅（制限しない場合は省略） |
| `min-height` | Number | `"0"` | 要素がレイアウトされる最小の高さ |
| `min-width` | Number | `"0"` | 要素がレイアウトされる最小の幅 |

</div>

## 例

```html
<pc-entity>
    <pc-element type="image" width="200" height="45"></pc-element>
    <pc-layoutchild min-height="45" fit-width-proportion="1"></pc-layoutchild>
</pc-entity>
```

## JavaScriptインターフェース

[LayoutChildComponentElement API](https://api.playcanvas.com/web-components/classes/LayoutChildComponentElement.html)を使用して、`<pc-layoutchild>`要素をプログラムで作成および操作できます。

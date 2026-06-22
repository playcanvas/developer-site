---
title: <pc-layoutgroup>
description: "pc-layoutgroup要素のリファレンス: 子要素を水平または垂直のレイアウトに配置し、間隔、パディング、整列、フィッティングを制御します。"
---

`<pc-layoutgroup>`タグは、子の要素エンティティを行または列に自動的に配置するレイアウトグループコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-element>`](../pc-element) も持つ [`<pc-entity>`](../pc-entity) の直接の子である必要があります。
* 子エンティティは自動的に配置されます。グループ内での子のサイズ調整方法を制御するには、子に [`<pc-layoutchild>`](../pc-layoutchild) を追加します。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `alignment` | Vector2 | `"0 1"` | 子要素の水平・垂直方向の整列（各成分0〜1） |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `height-fitting` | Enum | `"none"` | 垂直軸方向のフィッティング: `"none"` \| `"stretch"` \| `"shrink"` \| `"both"` |
| `orientation` | Enum | `"horizontal"` | レイアウトの向き: `"horizontal"` \| `"vertical"` |
| `padding` | Vector4 | `"0 0 0 0"` | グループ周囲のパディングを `left bottom right top` で指定 |
| `reverse-x` | Flag | - | 水平軸に沿って子の順序を反転します |
| `reverse-y` | Flag | - | 垂直軸に沿って子の順序を反転します |
| `spacing` | Vector2 | `"0 0"` | 子同士の間隔を `x y` で指定 |
| `width-fitting` | Enum | `"none"` | 水平軸方向のフィッティング: `"none"` \| `"stretch"` \| `"shrink"` \| `"both"` |
| `wrap` | Flag | - | 子がグループからあふれたときに、新しい行または列に折り返すかどうか |

</div>

## 例

```html
<pc-entity name="list">
    <pc-element type="group" width="220" height="400"></pc-element>
    <pc-layoutgroup orientation="vertical" alignment="0 1" spacing="0 5" padding="10 10 10 10"></pc-layoutgroup>

    <pc-entity name="item-1">
        <pc-element type="image" width="200" height="45"></pc-element>
        <pc-layoutchild></pc-layoutchild>
    </pc-entity>
    <pc-entity name="item-2">
        <pc-element type="image" width="200" height="45"></pc-element>
        <pc-layoutchild></pc-layoutchild>
    </pc-entity>
</pc-entity>
```

## JavaScriptインターフェース

[LayoutGroupComponentElement API](https://api.playcanvas.com/web-components/classes/LayoutGroupComponentElement.html)を使用して、`<pc-layoutgroup>`要素をプログラムで作成および操作できます。

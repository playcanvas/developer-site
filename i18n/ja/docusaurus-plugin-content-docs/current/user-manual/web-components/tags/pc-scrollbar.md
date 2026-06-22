---
title: <pc-scrollbar>
description: "pc-scrollbar要素のリファレンス: 向き、ハンドルサイズ、値を持ち、スクロールビューを駆動するドラッグ可能なスクロールバーです。"
---

`<pc-scrollbar>`タグは、0〜1の範囲で位置を報告するドラッグ可能なハンドルを提供するスクロールバーコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-element>`](../pc-element) も持つ [`<pc-entity>`](../pc-entity) の直接の子である必要があります。
* [`<pc-scrollview>`](../pc-scrollview) の `horizontal-scrollbar` または `vertical-scrollbar` 属性から参照されます。
* `handle` 属性は、ドラッグ可能なハンドルとして使用する [`<pc-entity>`](../pc-entity) を参照します。そのイメージ要素には `use-input` を設定してください。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `handle` | String | - | ドラッグ可能なハンドルとして使用する [`<pc-entity>`](../pc-entity) への参照（CSSセレクター、要素id、またはエンティティ名） |
| `handle-size` | Number | `"0.5"` | トラックのサイズに対するハンドルのサイズ（0〜1） |
| `orientation` | Enum | `"horizontal"` | スクロールバーの向き: `"horizontal"` \| `"vertical"` |
| `value` | Number | `"0"` | スクロールバーの現在位置（0〜1） |

</div>

## 例

```html
<pc-entity name="scrollbar">
    <pc-element type="image" anchor="1 0 1 1" width="20"></pc-element>
    <pc-scrollbar orientation="vertical" handle-size="0.5" handle="#handle"></pc-scrollbar>

    <!-- ドラッグ可能なハンドル -->
    <pc-entity name="handle" id="handle">
        <pc-element type="image" anchor="0 1 1 1" use-input></pc-element>
        <pc-button></pc-button>
    </pc-entity>
</pc-entity>
```

## JavaScriptインターフェース

[ScrollbarComponentElement API](https://api.playcanvas.com/web-components/classes/ScrollbarComponentElement.html)を使用して、`<pc-scrollbar>`要素をプログラムで作成および操作できます。

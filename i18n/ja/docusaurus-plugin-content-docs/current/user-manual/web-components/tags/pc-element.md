---
title: <pc-element>
---

`<pc-element>`タグは、要素コンポーネントを定義するために使用されます。

:::note[使用法]

* これは、[`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `anchor` | Vector4 | `"0 0 0 1"` | "X Y Z W" 値としてのアンカーポイント |
| `asset` | String | - | フォントアセットID (`font` 型アセットを参照する必要があります) |
| `auto-width` | Flag | - | コンテンツに合わせて幅を自動的に調整するかどうか |
| `color` | Color | `"1 1 1 1"` | スペース区切りのRGBA値、16進数コード、または[名前付きカラー](https://github.com/playcanvas/web-components/blob/main/src/colors.ts)としての色 |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `font-size` | Number | `"16"` | ピクセル単位のフォントサイズ |
| `line-height` | Number | `"1.2"` | 行の高さの乗数 |
| `pivot` | Vector2 | `"0.5 0.5"` | "X Y" 値としてのピボットポイント |
| `text` | String | - | 表示するテキストコンテンツ |
| `type` | Enum | `"group"` | 要素の型: `"group"` \| `"image"` \| `"text"` |
| `width` | Number | `"0"` | ピクセル単位の幅 (自動サイズ調整の場合は0) |
| `wrap-lines` | Flag | - | テキストの行を折り返すかどうか |

</div>

## 例

```html
<pc-entity>
    <pc-element type="text" asset="arial"text="Hello, World!"></pc-element>
</pc-entity>
```

## JavaScriptインターフェース

[ElementComponentElement API](https://api.playcanvas.com/web-components/classes/ElementComponentElement.html)を使用して、`<pc-element>`要素をプログラムで作成および操作できます。

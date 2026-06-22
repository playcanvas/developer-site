---
title: <pc-element>
description: "pc-element要素のリファレンス: スクリーン空間のUIテキスト、画像、グループをPlayCanvasのElement Componentとレイアウトに対応付けます。"
---

`<pc-element>`タグは、要素コンポーネントを定義するために使用されます。要素コンポーネントはユーザーインターフェースの構成要素であり、`type` 属性で選択する `group`、`image`、`text` の3つのタイプがあります。適用される属性はタイプによって異なります。

:::note[使用法]

* これは、[`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

:::note

イメージ要素はスプライト（`sliced` な [`<pc-asset>`](../pc-asset) による9スライススプライトを含む）またはテクスチャをレンダリングでき、`mask` として子孫をクリップすることもできます。フォント `asset` が必要なのはテキスト要素のみです。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `anchor` | Vector4 | `"0 0 0 1"` | 要素のアンカーを親に対する `left bottom right top` で設定します。各値は 0〜1。`[0,0,0,0]` は親の左下に固定、`[1,1,1,1]` は右上に固定。左右または上下が異なる（スプリットアンカー）場合、その範囲に合わせて要素がリサイズされます（例: `[0,0,1,1]` は親全体を埋めます）。 |
| `asset` | String | - | フォントアセットID (`font` 型アセットを参照する必要があります)。テキスト要素でのみ必須です |
| `auto-fit-height` | Flag | - | フォントサイズを（`min-font-size` まで）縮小して、テキストを要素の高さに収めます。`auto-height="false"` が必要です。テキスト要素のみ |
| `auto-fit-width` | Flag | - | フォントサイズを（`min-font-size` まで）縮小して、テキストを要素の幅に収めます。`auto-width="false"` が必要です。テキスト要素のみ |
| `auto-height` | Boolean | `"true"` | テキストコンテンツに合わせて高さを自動的に調整するかどうか。テキスト要素のみ |
| `auto-width` | Boolean | `"true"` | テキストコンテンツに合わせて幅を自動的に調整するかどうか。テキスト要素のみ |
| `color` | Color | `"1 1 1 1"` | スペース区切りのRGBA値、16進数コード、または[名前付きカラー](https://github.com/playcanvas/web-components/blob/main/src/colors.ts)としての色 |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `enable-markup` | Flag | - | スタイル付きテキストのマークアップ処理を有効にします。色付きテキストの場合は `[color="#ff0000"]text[/color]` などのタグをサポートします。 |
| `font-size` | Number | `"32"` | ピクセル単位のフォントサイズ |
| `height` | Number | `"0"` | ピクセル単位の高さ (自動サイズ調整の場合は0) |
| `line-height` | Number | `"32"` | ピクセル単位の行の高さ |
| `margin` | Vector4 | - | スプリット（ストレッチ）アンカーからの要素のインセットを `left bottom right top` で指定します。ポイントアンカーの場合は、代わりに `width`/`height` がサイズを決定します |
| `mask` | Flag | - | 要素が子孫を自身の範囲にクリップするかどうか。イメージ要素のみ |
| `max-font-size` | Number | `"32"` | 自動フィット時に使用される最大のフォントサイズ |
| `min-font-size` | Number | `"8"` | 自動フィット時に使用される最小のフォントサイズ |
| `opacity` | Number | `"1"` | 不透明度。0（透明）〜1（不透明） |
| `pivot` | Vector2 | `"0.5 0.5"` | "X Y" 値としてのピボットポイント |
| `pixels-per-unit` | Number | - | スプライトをレンダリングするときに使用される、ユニットあたりのピクセル数。イメージ要素のみ |
| `sprite-asset` | String | - | レンダリングするスプライト [`<pc-asset>`](../pc-asset) のID。イメージ要素のみ |
| `sprite-frame` | Number | `"0"` | レンダリングするスプライトのフレームインデックス。イメージ要素のみ |
| `text` | String | - | 表示するテキストコンテンツ |
| `texture-asset` | String | - | レンダリングするテクスチャ [`<pc-asset>`](../pc-asset) のID。イメージ要素のみ |
| `type` | Enum | `"group"` | 要素の型: `"group"` \| `"image"` \| `"text"` |
| `use-input` | Flag | - | 要素がポインター入力を受け取るかどうか。[`<pc-button>`](../pc-button) とスクロールビューの操作に必要です |
| `width` | Number | `"0"` | ピクセル単位の幅 (自動サイズ調整の場合は0) |
| `wrap-lines` | Flag | - | テキストの行を折り返すかどうか |

</div>

## 例

```html
<pc-entity>
    <pc-element type="text" asset="arial" text="Hello, World!"></pc-element>
</pc-entity>
```

## JavaScriptインターフェース

[ElementComponentElement API](https://api.playcanvas.com/web-components/classes/ElementComponentElement.html)を使用して、`<pc-element>`要素をプログラムで作成および操作できます。

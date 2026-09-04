---
title: <pc-element>
description: "pc-element要素のリファレンス: フォント、スプライト、レイアウト、入力サポートを備えた、テキスト・イメージ・グループのUI要素です。"
---

`<pc-element>`タグは、要素コンポーネントを定義するために使用されます。要素コンポーネントはユーザーインターフェースの構成要素であり、`type` 属性で選択する `group`、`image`、`text` の3つのタイプがあります。適用される属性はタイプによって異なります。

名前に反して、これは基底クラスでも汎用のラッパーでもありません。`<pc-element>`はエンジンの2D UIコンポーネントであり、すべてのコンポーネントタグと同じように、自分が追加するコンポーネント（`entity.element`）を名前で表します。ホストとなるエンティティに、[`<pc-screen>`](../pc-screen)の階層内で画像・1行のテキスト・あるいは何も描画しない矩形を与えます。

:::note[使用法]

* これは、[`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node)の直接の子である必要があります。

:::

:::note

イメージ要素はスプライト（`sliced` な [`<pc-asset>`](../pc-asset) による9スライススプライトを含む）またはテクスチャをレンダリングでき、`mask` として子孫をクリップすることもできます。`font-asset` が必要なのはテキスト要素のみです。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `anchor` | Vector4 | `"0.5 0.5 0.5 0.5"` | 要素のアンカーを親に対する `left bottom right top` で設定します。各値は 0〜1。`[0,0,0,0]` は親の左下に固定、`[1,1,1,1]` は右上に固定。左右または上下が異なる（スプリットアンカー）場合、その範囲に合わせて要素がリサイズされます（例: `[0,0,1,1]` は親全体を埋めます）。 |
| `auto-fit-height` | Boolean | `"false"` | フォントサイズを（`min-font-size` まで）縮小して、テキストを要素の高さに収めます。`auto-height="false"` が必要です。テキスト要素のみ |
| `auto-fit-width` | Boolean | `"false"` | フォントサイズを（`min-font-size` まで）縮小して、テキストを要素の幅に収めます。`auto-width="false"` が必要です。テキスト要素のみ |
| `auto-height` | Boolean | `"true"` | テキストコンテンツに合わせて高さを自動的に調整するかどうか。テキスト要素のみ |
| `auto-width` | Boolean | `"true"` | テキストコンテンツに合わせて幅を自動的に調整するかどうか。テキスト要素のみ |
| `color` | Color | `"1 1 1 1"` | スペース区切りのRGBA値、16進数コード、または[名前付きカラー](https://github.com/playcanvas/web-components/blob/main/src/colors.ts)としての色 |
| `enable-markup` | Boolean | `"false"` | スタイル付きテキストのマークアップ処理を有効にします。色付きテキストの場合は `[color="#ff0000"]text[/color]` などのタグをサポートします。 |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `font-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | フォント [`<pc-asset>`](../pc-asset) のID (`font` 型アセットを参照する必要があります)。テキスト要素でのみ必須です |
| `font-size` | Number | `"32"` | ピクセル単位のフォントサイズ |
| `height` | Number | `"0"` | ピクセル単位の高さ (自動サイズ調整の場合は0) |
| `line-height` | Number | `"32"` | ピクセル単位の行の高さ |
| `margin` | Vector4 | - | スプリット（ストレッチ）アンカーからの要素のインセットを `left bottom right top` で指定します。ポイントアンカーの場合は、代わりに `width`/`height` がサイズを決定します |
| `mask` | Boolean | `"false"` | 要素が子孫を自身の範囲にクリップするかどうか。イメージ要素のみ |
| `max-font-size` | Number | `"32"` | 自動フィット時に使用される最大のフォントサイズ |
| `min-font-size` | Number | `"8"` | 自動フィット時に使用される最小のフォントサイズ |
| `opacity` | Number | `"1"` | 不透明度。0（透明）〜1（不透明） |
| `pivot` | Vector2 | `"0.5 0.5"` | "X Y" 値としてのピボットポイント |
| `pixels-per-unit` | Number | - | スプライトをレンダリングするときに使用される、ユニットあたりのピクセル数。イメージ要素のみ |
| `sprite-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | レンダリングするスプライト [`<pc-asset>`](../pc-asset) のID。イメージ要素のみ |
| `sprite-frame` | Number | `"0"` | レンダリングするスプライトのフレームインデックス。イメージ要素のみ |
| `text` | String | - | 表示するテキストコンテンツ |
| `texture-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | レンダリングするテクスチャ [`<pc-asset>`](../pc-asset) のID。イメージ要素のみ |
| `type` | Enum | `"group"` | 要素の型: `"group"` \| `"image"` \| `"text"` |
| `use-input` | Boolean | `"false"` | 要素がポインター入力を受け取るかどうか。[`<pc-button>`](../pc-button) とスクロールビューの操作に必要です |
| `width` | Number | `"0"` | ピクセル単位の幅 (自動サイズ調整の場合は0) |
| `wrap-lines` | Boolean | `"false"` | テキストの行を折り返すかどうか |

</div>

## 例 {#example}

パネルとしての `image` 要素の上に、2つの `text` 要素を重ねています。2つ目は `enable-markup` によるインラインの色付けを使用しています。`text`、`font-size`、パネルの `color` を編集してみましょう:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/fonts/arial.json" type="font" id="arial"></pc-asset>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="panel">
                <pc-element type="image" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                            width="400" height="150" color="#2a2d36" opacity="0.9"></pc-element>
                <pc-entity name="heading" position="0 35 0">
                    <pc-element type="text" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                                font-asset="arial" font-size="36" text="<pc-element>"></pc-element>
                </pc-entity>
                <pc-entity name="body" position="0 -25 0">
                    <pc-element type="text" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                                font-asset="arial" font-size="20" enable-markup="true"
                                text='Comes in [color="#ff8a3c"]group[/color], [color="#7ab8ff"]image[/color] and [color="#8ce99a"]text[/color] types'></pc-element>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[ElementComponentElement API](https://api.playcanvas.com/web-components/classes/ElementComponentElement.html)を使用して、`<pc-element>`要素をプログラムで作成および操作できます。

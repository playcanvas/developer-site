---
title: <pc-element>
description: "pc-element要素のリファレンス: フォント、スプライト、レイアウト、入力サポートを備えた、テキスト・イメージ・グループのUI要素です。"
---

`<pc-element>`タグは、ユーザーインターフェースの構成要素である要素コンポーネントを追加します。`type` 属性で選択する `group`、`image`、`text` の3つのタイプがあり、適用される属性はタイプによって異なります。

名前に反して、これは基底クラスでも汎用のラッパーでもありません。`<pc-element>`はエンジンの2D UIコンポーネントであり、すべてのコンポーネントタグと同じように、自分が追加するコンポーネント（`entity.element`）を名前で表します。ホストとなるエンティティに、画像・テキスト・あるいは何も描画しない矩形を与えます。

この矩形は通常 [`<pc-screen>`](../pc-screen) の上にレイアウトされますが、要素にスクリーンは必須ではありません。[Text](https://playcanvas.github.io/web-components/examples/#text.html) サンプルのスクロールする文章にはスクリーンがありません。上にスクリーンがない要素はエンティティのトランスフォームで配置され、ワールド単位でサイズが決まるため、32 × 32の要素は32メートル四方になります。[スクリーンのないエレメント](/user-manual/user-interface/elements/#elements-without-a-screen)を参照してください。

:::note[使用法]

* これは、[`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node)の直接の子である必要があります。

:::

:::note

イメージ要素はテクスチャまたはスプライトを描画し（`render-mode="sliced"` または `"tiled"` を持つスプライトの [`<pc-asset>`](../pc-asset) による、9スライスやタイルのスプライトを含む）、子孫をクリップする `mask` として使うこともできます。`font-asset` が必要なのはテキスト要素のみです。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `alignment` | Vector2 | `"0.5 0.5"` | 要素内でのテキストの水平・垂直方向の配置。各値は 0〜1。`"0.5 0.5"` は中央揃え、`"0 1"` は左上揃えです。テキスト要素のみ |
| `anchor` | Vector4 | `"0 0 0 0"` | 要素の辺が取り付けられる親の位置を `left bottom right top` で指定します。各値は 0〜1 で、`"0 0 0 0"` は親の左下隅、`"1 1 1 1"` は右上隅です。ある軸の2つの値が異なる場合はアンカーが分割され、要素はその軸で親と一緒に伸縮して `margin` の分だけ内側に配置され、その軸の `width` または `height` は無視されます。`anchor="0 0 1 1" margin="0 0 0 0"` は親全体を埋めます。[アンカー](/user-manual/user-interface/elements/#anchor)を参照してください |
| `auto-fit-height` | Boolean | `"false"` | フォントを `max-font-size` から `min-font-size` まで縮小して、テキストを要素の高さに収めます。有効な間は `font-size` は無視されます。`auto-height="false"` が必要です。テキスト要素のみ |
| `auto-fit-width` | Boolean | `"false"` | フォントを `max-font-size` から `min-font-size` まで縮小して、テキストを要素の幅に収めます。有効な間は `font-size` は無視されます。`auto-width="false"` が必要です。テキスト要素のみ |
| `auto-height` | Boolean | `"true"` | テキストコンテンツに合わせて高さを自動的に調整するかどうか。テキスト要素のみ |
| `auto-width` | Boolean | `"true"` | テキストコンテンツに合わせて幅を自動的に調整するかどうか。テキスト要素のみ |
| `color` | Color | `"1 1 1 1"` | イメージまたはテキストの色。テクスチャの色に乗算されるため、白いテクスチャを任意の色で描画できます。アルファは無視されるため、透明度には `opacity` を使ってください |
| `enable-markup` | Boolean | `"false"` | `[color="#ff0000"]red[/color]` のようなテキスト内のタグで、テキストの一部にスタイルを付けるかどうか。[マークアップ](/user-manual/user-interface/text-elements/#markup)を参照してください。テキスト要素のみ |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `fit-mode` | Enum | `"stretch"` | テクスチャまたはスプライトを要素の矩形にどう収めるか: `"stretch"` \| `"contain"` \| `"cover"`。`stretch` はソースのアスペクト比を無視して矩形をちょうど埋め、`contain` はソース全体を矩形の内側に収め、`cover` はソースで矩形全体を覆います（どちらもアスペクト比を維持します）。覆うイメージは矩形からはみ出すため、親の `mask` で切り取ってください。イメージ要素のみ |
| `font-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | フォント [`<pc-asset>`](../pc-asset) のID (`font` 型アセットを参照する必要があります)。テキスト要素でのみ必須です |
| `font-size` | Number | `"32"` | スクリーンの単位でのテキストのサイズ。テキスト要素のみ |
| `height` | Number | `"32"` | スクリーンの単位での要素の高さ。アンカーが垂直方向に分割されている場合と、`auto-height` がテキストに合わせてサイズを決めている間のテキスト要素では無視されます |
| `justify` | Boolean | `"false"` | 単語間の隙間を広げて、折り返された行を要素の両端に揃えるかどうか。`wrap-lines` と固定幅が必要です。最終行と、明示的な改行で終わる行は、代わりに `alignment` に従います。テキスト要素のみ |
| `line-height` | Number | `"32"` | 隣り合う行のベースライン間の距離（スクリーンの単位）。`font-size` には追従しないため、大きなフォントではあわせて設定してください。設定しないと、折り返した行が重なります。テキスト要素のみ |
| `margin` | Vector4 | - | アンカーが分割されている軸での、各辺とアンカーとの距離を `left bottom right top` で指定します。正の値は辺を内側に移動します。省略すると、分割された軸にはエンジンのデフォルトのマージン `0 0 -32 -32` が残り、要素は右と上のアンカーから32単位はみ出すため、アンカーを分割するときは必ず設定してください。[マージン](/user-manual/user-interface/elements/#margin)を参照してください |
| `mask` | Boolean | `"false"` | 要素が子孫を、自身の矩形、またはテクスチャやスプライトの不透明な部分にクリップするかどうか。マスク自体は描画されないため、その `color` は何の効果もありません。[マスク](/user-manual/user-interface/masks/)を参照してください。イメージ要素のみ |
| `max-font-size` | Number | `"32"` | 自動フィット時に使用される最大のフォントサイズで、フィッティングはこのサイズから始まります。テキスト要素のみ |
| `max-lines` | Number | - | `wrap-lines` がテキストを折り返す最大行数。収まらないテキストは最終行に追加されます。省略した場合は制限なし。テキスト要素のみ |
| `min-font-size` | Number | `"8"` | 自動フィット時に使用される最小のフォントサイズ。テキスト要素のみ |
| `opacity` | Number | `"1"` | 不透明度。0（透明）〜1（不透明）。要素の子には影響しません |
| `outline-color` | Color | `"0 0 0 1"` | テキストのアウトラインの色。`outline-thickness` が0より大きい場合にのみ描画されます。テキスト要素のみ |
| `outline-thickness` | Number | `"0"` | テキストのアウトラインの太さ。0（アウトラインなし）〜1。テキスト要素のみ |
| `pivot` | Vector2 | `"0 0"` | 要素の位置に置かれ、回転と拡大縮小の中心になる、要素上の点。サイズに対する割合で指定し、`"0 0"` は左下隅、`"0.5 0.5"` は中心です |
| `pixels-per-unit` | Number | - | スプライトの1単位あたりのピクセル数を上書きします。これはスライスまたはタイルのスプライトのボーダーの幅を決め、`b` ピクセルのボーダーの幅はスクリーンの単位で `b / pixels-per-unit` になります。シンプルなスプライトは要素に合わせて引き伸ばされるため、効果はありません。イメージ要素のみ |
| `shadow-color` | Color | `"0 0 0 1"` | テキストの影の色。`shadow-offset` が `"0 0"` 以外の場合にのみ描画されます。テキスト要素のみ |
| `shadow-offset` | Vector2 | `"0 0"` | "X Y" 値としてのテキストの影のオフセット。各値は -1〜1 で、フォントサイズに比例します。正の値は影を右と上にずらし、`"0 0"` は影を描画しません。テキスト要素のみ |
| `spacing` | Number | `"1"` | テキストの文字間隔。通常の間隔に対する倍率です。テキスト要素のみ |
| `sprite-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | レンダリングするスプライト [`<pc-asset>`](../pc-asset) のID。イメージ要素のみ |
| `sprite-frame` | Number | `"0"` | レンダリングするスプライトのフレームインデックス。イメージ要素のみ |
| `text` | String | - | 表示するテキスト。テキスト要素のみ |
| `texture-asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | レンダリングするテクスチャ [`<pc-asset>`](../pc-asset) のID。イメージ要素のみ |
| `type` | Enum | `"group"` | 要素の型: `"group"` \| `"image"` \| `"text"` |
| `use-input` | Boolean | `"false"` | 要素がマウス、タッチ、XRの入力を受け取り、入力イベントを発火するかどうか。[`<pc-button>`](../pc-button)、ドラッグされる [`<pc-scroll-view>`](../pc-scroll-view) のコンテンツ、スクロールバーのハンドルに必要です。[UI入力の有効化](/user-manual/user-interface/input/#enabling-ui-input)を参照してください |
| `width` | Number | `"32"` | スクリーンの単位での要素の幅。アンカーが水平方向に分割されている場合と、`auto-width` がテキストに合わせてサイズを決めている間のテキスト要素では無視されます |
| `wrap-lines` | Boolean | `"false"` | テキストを要素の幅で折り返すかどうか。折り返す幅が必要なため、`auto-width="false"` にするか、アンカーを水平方向に分割してください。テキスト要素のみ |

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

`component`プロパティは、この要素が追加するエンジンの[ElementComponent](https://api.playcanvas.com/engine/classes/ElementComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。

## 関連項目 {#see-also}

* [`<pc-screen>`](../pc-screen) — インターフェースをレイアウトして描画するスクリーン
* [`<pc-button>`](../pc-button) — イメージ要素をインタラクティブにします
* [`<pc-layout-group>`](../pc-layout-group) — エンティティの子の要素を自動的に配置します
* [`<pc-scroll-view>`](../pc-scroll-view) — ビューポートの中でコンテンツ要素をスクロールします
* [エレメント](/user-manual/user-interface/elements/)、[テキストエレメント](/user-manual/user-interface/text-elements/)、[イメージエレメント](/user-manual/user-interface/image-elements/) — ユーザーインターフェースのセクションにある、アンカー、サイズ、テキスト、イメージの解説

サンプル: [2D Screen](https://playcanvas.github.io/web-components/examples/#2d-screen.html)、[Text](https://playcanvas.github.io/web-components/examples/#text.html)、[UI Layout](https://playcanvas.github.io/web-components/examples/#ui-layout.html)

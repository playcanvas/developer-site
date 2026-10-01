---
title: <pc-scroll-view>
description: "pc-scroll-view要素のリファレンス: コンテンツ、スクロールバー、マウスホイール対応、bounce/clamp/infinite モードを備えたスクロール可能なビューポートです。"
---

`<pc-scroll-view>`タグは、より大きなコンテンツ要素の一部をビューポートを通して表示し、ドラッグ、マウスホイール、スクロールバーで残りの部分を表示できるようにするスクロールビューコンポーネントを追加します。

:::note[使用法]

* [`<pc-element>`](../pc-element) も持つ [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node) の直接の子である必要があります。
* ビューポート、コンテンツ、スクロールバーの各エンティティを、エンティティの `name` またはドキュメント全体の `#` セレクターで参照します。[エンティティ参照](../attributes.md#entity-references)を参照してください。
* コンテンツがその内側だけに描画されるように、ビューポートは `mask` を設定したイメージ要素にしてください。マスク自体は描画されないため、その `color` は何の効果もありません。
* コンテンツはビューポートの子にし、左上のピボットでビューポートの左上隅にアンカーし（`anchor="0 1 0 1" pivot="0 1"`）、中身に合わせたサイズにする必要があります。スクロールビューがそのサイズを変えることはありません。ドラッグできるようにするには `use-input` が必要です。[コンテンツのサイズ設定](/user-manual/user-interface/scroll-views/#sizing-the-content)を参照してください。
* マウスホイールは、ポインターがビューの中の入力が有効な要素（コンテンツなど）の上にある間、ビューをスクロールします。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `bounce-amount` | Number | `"0.1"` | `scroll-mode="bounce"` のとき、端を越えてスクロールされたコンテンツが戻る遅さ。0ではすぐに戻り、0.1ではスマートフォンのスクロールのような感触になり、値が大きいほど遅くなります |
| `content` | [Entity Reference](../attributes.md#entity-references) | - | ビューのスクロールに合わせて移動するコンテンツ [`<pc-entity>`](../pc-entity) への参照 |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `friction` | Number | `"0.05"` | フリックされた後にコンテンツが減速する速さ。0〜1で、0では減速せず、1ではすぐに止まります |
| `horizontal` | Boolean | `"true"` | 水平軸方向のスクロールを有効にするかどうか |
| `horizontal-scrollbar` | [Entity Reference](../attributes.md#entity-references) | - | 水平 [`<pc-scrollbar>`](../pc-scrollbar) を保持する [`<pc-entity>`](../pc-entity) への参照 |
| `horizontal-scrollbar-visibility` | Enum | `"always"` | 水平スクロールバーを表示するタイミング: `"always"` \| `"when-required"` |
| `mouse-wheel-sensitivity` | Vector2 | `"1 1"` | マウスホイールの感度を `x y` で指定（軸の値が0の場合、その軸のホイールスクロールは無効） |
| `scroll-mode` | Enum | `"bounce"` | コンテンツの端での挙動: `"clamp"` \| `"bounce"` \| `"infinite"`。`"clamp"` は端で止め、`"bounce"` は端を越えさせてから跳ね返し、`"infinite"` はどこまでもスクロールさせます。マウスホイールでは跳ね返りません |
| `use-mouse-wheel` | Boolean | `"true"` | スクロールビューがマウスホイールに反応するかどうか |
| `vertical` | Boolean | `"true"` | 垂直軸方向のスクロールを有効にするかどうか |
| `vertical-scrollbar` | [Entity Reference](../attributes.md#entity-references) | - | 垂直 [`<pc-scrollbar>`](../pc-scrollbar) を保持する [`<pc-entity>`](../pc-entity) への参照 |
| `vertical-scrollbar-visibility` | Enum | `"always"` | 垂直スクロールバーを表示するタイミング: `"always"` \| `"when-required"` |
| `viewport` | [Entity Reference](../attributes.md#entity-references) | - | ビューポートとして使用される [`<pc-entity>`](../pc-entity) への参照。コンテンツをクリップする、マスクされたイメージ要素です |

</div>

## 例 {#example}

行を、マウスホイール、ドラッグ、またはスクロールバーでスクロールしてみましょう。ビューポートの `mask` が行をクリップします。`scroll-mode="clamp"` で跳ね返らずに端で止めたり、`friction` を `0.5` にしてフリックを早く止めたり、コンテンツの `height` を大きくしたりしてみましょう:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="scroll-view">
                <pc-element type="group" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="260" height="260"></pc-element>
                <pc-scroll-view
                    horizontal="false"
                    vertical="true"
                    viewport="#viewport"
                    content="#content"
                    vertical-scrollbar="#v-scrollbar"></pc-scroll-view>

                <!-- ビューポートはコンテンツをスクロールビューの範囲にクリップします -->
                <pc-entity name="viewport" id="viewport">
                    <pc-element type="image" anchor="0 0 1 1" margin="0 0 20 0" mask></pc-element>

                    <!-- コンテンツはビューのスクロールに合わせて移動します。高さは行のレイアウト後の
                         サイズです: 60 x 8行 + 間隔 8 x 7 + 上下のパディング 10 ずつ -->
                    <pc-entity name="content" id="content">
                        <pc-element type="group" anchor="0 1 0 1" pivot="0 1" width="240" height="556" use-input></pc-element>
                        <pc-layout-group orientation="vertical" alignment="0 1" spacing="0 8" padding="10 10 10 10"></pc-layout-group>
                        <pc-entity name="row-1"><pc-element type="image" width="220" height="60" color="#ff8a3c"></pc-element></pc-entity>
                        <pc-entity name="row-2"><pc-element type="image" width="220" height="60" color="#7ab8ff"></pc-element></pc-entity>
                        <pc-entity name="row-3"><pc-element type="image" width="220" height="60" color="#8ce99a"></pc-element></pc-entity>
                        <pc-entity name="row-4"><pc-element type="image" width="220" height="60" color="#ffd43b"></pc-element></pc-entity>
                        <pc-entity name="row-5"><pc-element type="image" width="220" height="60" color="#e599f7"></pc-element></pc-entity>
                        <pc-entity name="row-6"><pc-element type="image" width="220" height="60" color="#63e6be"></pc-element></pc-entity>
                        <pc-entity name="row-7"><pc-element type="image" width="220" height="60" color="#ffa8a8"></pc-element></pc-entity>
                        <pc-entity name="row-8"><pc-element type="image" width="220" height="60" color="#74c0fc"></pc-element></pc-entity>
                    </pc-entity>
                </pc-entity>

                <!-- 垂直スクロールバー: 右端の内側に沿った幅20単位のストリップ -->
                <pc-entity name="v-scrollbar" id="v-scrollbar">
                    <pc-element type="image" anchor="1 0 1 1" pivot="1 0.5" width="20" margin="0 0 0 0" color="#2a2d36"></pc-element>
                    <pc-scrollbar orientation="vertical" handle="#v-handle"></pc-scrollbar>
                    <pc-entity name="handle" id="v-handle">
                        <pc-element type="image" anchor="0 1 1 1" pivot="0.5 1" margin="0 0 0 0" color="#ff8a3c" use-input></pc-element>
                        <pc-button hover-tint="#ffa76d" pressed-tint="#cc6e30"></pc-button>
                    </pc-entity>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[ScrollViewComponentElement API](https://api.playcanvas.com/web-components/classes/ScrollViewComponentElement.html)を使用して、`<pc-scroll-view>`要素をプログラムで作成および操作できます。

`component`プロパティは、この要素が追加するエンジンの[ScrollViewComponent](https://api.playcanvas.com/engine/classes/ScrollViewComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。

## 関連項目 {#see-also}

* [`<pc-scrollbar>`](../pc-scrollbar) — ビューを操作し、その位置を反映します
* [`<pc-element>`](../pc-element) — ビューポートとコンテンツは要素です。`mask`がコンテンツをクリップします
* [`<pc-layout-group>`](../pc-layout-group) — コンテンツの子を配置します
* [スクロールビュー](/user-manual/user-interface/scroll-views/) — ユーザーインターフェースのセクションにある、作り方、コンテンツのサイズ設定、コードからのスクロールの解説

サンプル: [Scroll View](https://playcanvas.github.io/web-components/examples/#scroll-view.html)

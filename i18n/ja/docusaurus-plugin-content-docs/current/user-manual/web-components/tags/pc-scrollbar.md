---
title: <pc-scrollbar>
description: "pc-scrollbar要素のリファレンス: 向き、ハンドルサイズ、値を持ち、スクロールビューを駆動するドラッグ可能なスクロールバーです。"
---

`<pc-scrollbar>`タグは、スクロールバーコンポーネントを追加します。ユーザーがトラックに沿ってハンドルをドラッグし、その位置が0〜1の `value` になります。[`<pc-scroll-view>`](../pc-scroll-view) のスクロール位置を表示して設定し、単体ではスライダーとして働きます。

:::note[使用法]

* [`<pc-element>`](../pc-element) も持つ [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node) の直接の子である必要があります。
* [`<pc-scroll-view>`](../pc-scroll-view) を操作するには、ビューの `horizontal-scrollbar` または `vertical-scrollbar` 属性から参照します。その場合、ビューが `handle-size` と `value` を設定し、指定した値は置き換えられます。
* `handle` 属性は、ハンドルとして使用するエンティティを参照します。ハンドルはトラックの子で、`use-input` を設定したイメージ要素を持ち、トラックの始端でトラックの幅いっぱいにアンカーします。垂直スクロールバーでは、下の例のように `anchor="0 1 1 1" pivot="0.5 1"` です。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `handle` | [Entity Reference](../attributes.md#entity-references) | - | ドラッグ可能なハンドルとして使用する [`<pc-entity>`](../pc-entity) |
| `handle-size` | Number | `"0"` | トラックの長さに対するハンドルの長さの割合（0〜1）。デフォルトの0ではハンドルの長さがなくなるため、自分で使うスクロールバーでは設定してください。スクロールビューは、コンテンツのうち見えている割合をこの値に設定します |
| `orientation` | Enum | `"horizontal"` | スクロールバーの向き: `"horizontal"` \| `"vertical"` |
| `value` | Number | `"0"` | ハンドルの位置（0〜1）。0は垂直スクロールバーでは上端、水平スクロールバーでは左端です。スクロールビューは、自身のスクロール位置をこの値に設定します |

</div>

## 例 {#example}

スライダーとして働く単体の垂直スクロールバーです — オレンジ色のハンドルをドラッグしてみましょう。トラックの長さに対する割合である `handle-size` や、下端にする `1` などの初期の `value` を変えることもできます:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="scrollbar">
                <pc-element type="image" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5"
                            width="20" height="240" color="#3a3f4b"></pc-element>
                <pc-scrollbar orientation="vertical" handle-size="0.35" handle="#handle"></pc-scrollbar>

                <!-- ドラッグ可能なハンドル -->
                <pc-entity name="handle" id="handle">
                    <pc-element type="image" anchor="0 1 1 1" pivot="0.5 1" margin="0 0 0 0" color="#ff8a3c" use-input></pc-element>
                    <pc-button hover-tint="#ffa76d" pressed-tint="#cc6e30"></pc-button>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[ScrollbarComponentElement API](https://api.playcanvas.com/web-components/classes/ScrollbarComponentElement.html)を使用して、`<pc-scrollbar>`要素をプログラムで作成および操作できます。

`component`プロパティは、この要素が追加するエンジンの[ScrollbarComponent](https://api.playcanvas.com/engine/classes/ScrollbarComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。

## 関連項目 {#see-also}

* [`<pc-scroll-view>`](../pc-scroll-view) — スクロールバーが操作するビュー
* [`<pc-element>`](../pc-element) — トラックとハンドルはイメージ要素です
* [`<pc-screen>`](../pc-screen) — スクロールバーがレンダリングされるスクリーン
* [スクロールバー](/user-manual/user-interface/scroll-views/#scrollbars)と[スライダー](/user-manual/user-interface/common-widgets/#sliders) — ユーザーインターフェースのセクションにある、スクロールビューの中と単体でのスクロールバーの解説

サンプル: [Scroll View](https://playcanvas.github.io/web-components/examples/#scroll-view.html)

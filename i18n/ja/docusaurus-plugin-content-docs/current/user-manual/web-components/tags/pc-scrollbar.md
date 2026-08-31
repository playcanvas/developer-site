---
title: <pc-scrollbar>
description: "pc-scrollbar要素のリファレンス: 向き、ハンドルサイズ、値を持ち、スクロールビューを駆動するドラッグ可能なスクロールバーです。"
---

`<pc-scrollbar>`タグは、0〜1の範囲で位置を報告するドラッグ可能なハンドルを提供するスクロールバーコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-element>`](../pc-element) も持つ [`<pc-entity>`](../pc-entity) の直接の子である必要があります。
* [`<pc-scroll-view>`](../pc-scroll-view) の `horizontal-scrollbar` または `vertical-scrollbar` 属性から参照されます。
* `handle` 属性は、ドラッグ可能なハンドルとして使用する [`<pc-entity>`](../pc-entity) を参照します。そのイメージ要素には `use-input` を設定してください。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `handle` | String | - | ドラッグ可能なハンドルとして使用する [`<pc-entity>`](../pc-entity) への[参照](../attributes.md#entity-references)（エンティティの `name`、またはドキュメント全体の `#` セレクター） |
| `handle-size` | Number | `"0.5"` | トラックのサイズに対するハンドルのサイズ（0〜1） |
| `orientation` | Enum | `"horizontal"` | スクロールバーの向き: `"horizontal"` \| `"vertical"` |
| `value` | Number | `"0"` | スクロールバーの現在位置（0〜1） |

</div>

## 例 {#example}

単体の垂直スクロールバーです — オレンジ色のハンドルをドラッグしてみましょう。`handle-size` (トラックに対する割合) や初期の `value` を変えることもできます:

```html live-example
<pc-app max-pixel-ratio="1">
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
                    <pc-button hover-tint="0.85 0.85 0.85 1" pressed-tint="0.7 0.7 0.7 1"></pc-button>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[ScrollbarComponentElement API](https://api.playcanvas.com/web-components/classes/ScrollbarComponentElement.html)を使用して、`<pc-scrollbar>`要素をプログラムで作成および操作できます。

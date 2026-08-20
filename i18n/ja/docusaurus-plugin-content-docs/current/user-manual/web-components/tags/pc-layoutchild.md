---
title: <pc-layoutchild>
description: "pc-layoutchild要素のリファレンス: レイアウトグループ内での子ごとのレイアウト制約（最小/最大サイズとフィット比率）です。"
---

`<pc-layoutchild>`タグは、親の [`<pc-layoutgroup>`](../pc-layoutgroup) によって要素がどのようにサイズ調整されるかを制御するレイアウトの子コンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-element>`](../pc-element) も持つ [`<pc-entity>`](../pc-entity) の直接の子である必要があります。
* そのエンティティ自体は、[`<pc-layoutgroup>`](../pc-layoutgroup) を持つエンティティの子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `exclude-from-layout` | Boolean | `"false"` | この要素をレイアウトから除外し、スペースを取らないようにします |
| `fit-height-proportion` | Number | `"0"` | `height-fitting` が stretch または shrink のとき、この要素が取るグループの余剰高さの割合 |
| `fit-width-proportion` | Number | `"0"` | `width-fitting` が stretch または shrink のとき、この要素が取るグループの余剰幅の割合 |
| `max-height` | Number | - | 要素がレイアウトされる最大の高さ（制限しない場合は省略） |
| `max-width` | Number | - | 要素がレイアウトされる最大の幅（制限しない場合は省略） |
| `min-height` | Number | `"0"` | 要素がレイアウトされる最小の高さ |
| `min-width` | Number | `"0"` | 要素がレイアウトされる最小の幅 |

</div>

## 例 {#example}

`width-fitting="stretch"` を設定した水平グループ内の3つのアイテムです。中央のアイテムの `fit-width-proportion="1"` により、グループの余剰幅は中央だけが吸収します。最初のアイテムにも `1` を与えて分け合わせたり、中央に `max-width` を設定したりしてみましょう:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="toolbar">
                <pc-element type="group" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="480" height="70"></pc-element>
                <pc-layoutgroup orientation="horizontal" alignment="0 0.5" spacing="8 0"
                                padding="10 10 10 10" width-fitting="stretch"></pc-layoutgroup>

                <pc-entity name="item-1">
                    <pc-element type="image" width="80" height="50" color="#7ab8ff"></pc-element>
                    <pc-layoutchild></pc-layoutchild>
                </pc-entity>
                <pc-entity name="item-2">
                    <pc-element type="image" width="80" height="50" color="#ff8a3c"></pc-element>
                    <pc-layoutchild fit-width-proportion="1"></pc-layoutchild>
                </pc-entity>
                <pc-entity name="item-3">
                    <pc-element type="image" width="80" height="50" color="#7ab8ff"></pc-element>
                    <pc-layoutchild></pc-layoutchild>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[LayoutChildComponentElement API](https://api.playcanvas.com/web-components/classes/LayoutChildComponentElement.html)を使用して、`<pc-layoutchild>`要素をプログラムで作成および操作できます。

---
title: <pc-layout-child>
description: "pc-layout-child要素のリファレンス: レイアウトグループ内での子ごとのレイアウト制約（最小/最大サイズとフィット比率）です。"
---

`<pc-layout-child>`タグは、エンティティの親の [`<pc-layout-group>`](../pc-layout-group) がエンティティの要素のサイズをどう決めるかを変えたり、要素をレイアウトから外したりするレイアウトチャイルドコンポーネントを追加します。

:::note[使用法]

* [`<pc-element>`](../pc-element) も持つ [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node) の直接の子である必要があります。
* そのエンティティ自体は、[`<pc-layout-group>`](../pc-layout-group) を持つエンティティの子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `exclude-from-layout` | Boolean | `"false"` | 要素をレイアウトから外すかどうか。外した要素はスペースを取らず、自身のアンカーと位置を保ちます |
| `fit-height-proportion` | Number | `"0"` | 縦のレイアウトで、`height-fitting` が加える、または減らす高さのうち、この要素が受け持つ比率。下の注記を参照してください |
| `fit-width-proportion` | Number | `"0"` | 横のレイアウトで、`width-fitting` が加える、または減らす幅のうち、この要素が受け持つ比率。下の注記を参照してください |
| `max-height` | Number | - | 要素がレイアウトされる最大の高さ（制限しない場合は省略） |
| `max-width` | Number | - | 要素がレイアウトされる最大の幅（制限しない場合は省略） |
| `min-height` | Number | `"0"` | 要素がレイアウトされる最小の高さ |
| `min-width` | Number | `"0"` | 要素がレイアウトされる最小の幅 |

</div>

:::note[比率]

レイアウトグループがレイアウトの方向に子を引き伸ばすとき、子は追加のスペースを比率で分け合います。比率2の子は比率1の子の2倍を受け取り、比率0の子は何も受け取りません。ただし、すべての子が0の場合は均等に分け合います。縮小では比率が反転し、比率の大きい子ほど減る量が少なくなります。比率が2と1の100単位の子2つを140単位に縮小すると、80と60になります。レイアウトと交差する方向では、各子はそれぞれ単独で合わせられます。[レイアウトチャイルド](/user-manual/user-interface/layout-groups/#layout-children)を参照してください。

:::

## 例 {#example}

`width-fitting="stretch"` を設定した水平グループ内の3つのアイテムです。中央のアイテムの `fit-width-proportion="1"` により、グループの余剰幅は中央だけが受け取ります。最初のアイテムにも `1` を与えて2つで分け合わせたり、`2` を与えて最初のアイテムに2倍を受け取らせたりしてみましょう。中央のアイテムの比率を削除すると、3つすべてで均等に分け合います:

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
                <pc-layout-group orientation="horizontal" alignment="0 0.5" spacing="8 0"
                                 padding="10 10 10 10" width-fitting="stretch"></pc-layout-group>

                <pc-entity name="item-1">
                    <pc-element type="image" width="80" height="50" color="#7ab8ff"></pc-element>
                    <pc-layout-child></pc-layout-child>
                </pc-entity>
                <pc-entity name="item-2">
                    <pc-element type="image" width="80" height="50" color="#ff8a3c"></pc-element>
                    <pc-layout-child fit-width-proportion="1"></pc-layout-child>
                </pc-entity>
                <pc-entity name="item-3">
                    <pc-element type="image" width="80" height="50" color="#7ab8ff"></pc-element>
                    <pc-layout-child></pc-layout-child>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[LayoutChildComponentElement API](https://api.playcanvas.com/web-components/classes/LayoutChildComponentElement.html)を使用して、`<pc-layout-child>`要素をプログラムで作成および操作できます。

`component`プロパティは、この要素が追加するエンジンの[LayoutChildComponent](https://api.playcanvas.com/engine/classes/LayoutChildComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。

## 関連項目 {#see-also}

* [`<pc-layout-group>`](../pc-layout-group) — 子が調整するレイアウトを持つグループ
* [`<pc-element>`](../pc-element) — 子がサイズを決める要素
* [レイアウトチャイルド](/user-manual/user-interface/layout-groups/#layout-children) — ユーザーインターフェースのセクションにある、サイズ、比率、除外の解説

サンプル: [UI Layout](https://playcanvas.github.io/web-components/examples/#ui-layout.html)、[Scroll View](https://playcanvas.github.io/web-components/examples/#scroll-view.html)

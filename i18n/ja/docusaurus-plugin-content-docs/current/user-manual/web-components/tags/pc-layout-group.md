---
title: <pc-layout-group>
description: "pc-layout-group要素のリファレンス: 子要素を水平または垂直のレイアウトに配置し、間隔、パディング、整列、フィッティングを制御します。"
---

`<pc-layout-group>`タグは、子の要素エンティティを行または列に自動的に配置するレイアウトグループコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-element>`](../pc-element) も持つ [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node) の直接の子である必要があります。
* 子エンティティは自動的に配置されます。グループ内での子のサイズ調整方法を制御するには、子に [`<pc-layout-child>`](../pc-layout-child) を追加します。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `alignment` | Vector2 | `"0 1"` | 子要素の水平・垂直方向の整列（各成分0〜1） |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `height-fitting` | Enum | `"none"` | 垂直軸方向のフィッティング: `"none"` \| `"stretch"` \| `"shrink"` \| `"both"` |
| `orientation` | Enum | `"horizontal"` | レイアウトの向き: `"horizontal"` \| `"vertical"` |
| `padding` | Vector4 | `"0 0 0 0"` | グループ周囲のパディングを `left bottom right top` で指定 |
| `reverse-x` | Boolean | `"false"` | 水平軸に沿って子の順序を反転します |
| `reverse-y` | Boolean | `"false"` | 垂直軸に沿って子の順序を反転します |
| `spacing` | Vector2 | `"0 0"` | 子同士の間隔を `x y` で指定 |
| `width-fitting` | Enum | `"none"` | 水平軸方向のフィッティング: `"none"` \| `"stretch"` \| `"shrink"` \| `"both"` |
| `wrap` | Boolean | `"false"` | 子がグループからあふれたときに、新しい行または列に折り返すかどうか |

</div>

## 例 {#example}

行を自動的に配置する縦のリストです。`orientation="horizontal"` にしたり、`spacing` を大きくしたり、`reverse-y` を付けたり — 行を追加して自動的に収まる様子を見たりしてみましょう:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="ui">
            <pc-screen screen-space="true" scale-mode="blend" reference-resolution="640 320"></pc-screen>
            <pc-entity name="list">
                <pc-element type="group" anchor="0.5 0.5 0.5 0.5" pivot="0.5 0.5" width="260" height="220"></pc-element>
                <pc-layout-group orientation="vertical" alignment="0 1" spacing="0 8"
                                 padding="10 10 10 10" width-fitting="stretch"></pc-layout-group>

                <pc-entity name="row-1">
                    <pc-element type="image" width="240" height="50" color="#ff8a3c"></pc-element>
                </pc-entity>
                <pc-entity name="row-2">
                    <pc-element type="image" width="240" height="50" color="#7ab8ff"></pc-element>
                </pc-entity>
                <pc-entity name="row-3">
                    <pc-element type="image" width="240" height="50" color="#8ce99a"></pc-element>
                </pc-entity>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[LayoutGroupComponentElement API](https://api.playcanvas.com/web-components/classes/LayoutGroupComponentElement.html)を使用して、`<pc-layout-group>`要素をプログラムで作成および操作できます。

`component`プロパティは、この要素が追加するエンジンの[LayoutGroupComponent](https://api.playcanvas.com/engine/classes/LayoutGroupComponent.html)です。要素の準備が完了するまでは`null`で、属性が公開していないものはすべてここから利用できます。

## 関連項目 {#see-also}

* [`<pc-layout-child>`](../pc-layout-child) — 子ごとのサイズ規則
* [`<pc-element>`](../pc-element) — 配置される要素
* [`<pc-screen>`](../pc-screen) — レイアウトが載るスクリーン

サンプル: [UI Layout](https://playcanvas.github.io/web-components/examples/ui-layout.html)、[Scroll View](https://playcanvas.github.io/web-components/examples/scroll-view.html)

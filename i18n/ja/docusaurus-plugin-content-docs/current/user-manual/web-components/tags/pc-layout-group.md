---
title: <pc-layout-group>
description: "pc-layout-group要素のリファレンス: 子要素を水平または垂直のレイアウトに配置し、間隔、パディング、整列、フィッティングを制御します。"
---

`<pc-layout-group>`タグは、エンティティの子の要素を行、列、またはグリッドに並べ、それらを伸縮して収めることもできるレイアウトグループコンポーネントを追加します。

:::note[使用法]

* [`<pc-element>`](../pc-element) も持つ [`<pc-entity>`](../pc-entity)、[`<pc-model>`](../pc-model)、または[`<pc-node>`](../pc-node) の直接の子である必要があります。
* エンティティの直接の子のうち、有効で、有効な要素を持つものを、ドキュメント内の順序で配置します。子のアンカーを `"0 0 0 0"` にし、位置も設定するため、指定したアンカーや位置は置き換えられます。[子の配置の仕組み](/user-manual/user-interface/layout-groups/#how-children-are-placed)を参照してください。
* 子のサイズの決め方を制御したり、子をレイアウトから外したりするには、子に [`<pc-layout-child>`](../pc-layout-child) を追加します。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `alignment` | Vector2 | `"0 1"` | 子がグループを埋めないときの、グループ内での子の位置。左下隅の `"0 0"` から右上の `"1 1"` までの値で指定します。デフォルトでは左上に置かれます |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `height-fitting` | Enum | `"none"` | 子の高さをグループに合わせて変えるかどうか: `"none"` \| `"stretch"` \| `"shrink"` \| `"both"`。下の注記を参照してください |
| `orientation` | Enum | `"horizontal"` | `"horizontal"` は子を横一列に、`"vertical"` は縦一列に並べます: `"horizontal"` \| `"vertical"` |
| `padding` | Vector4 | `"0 0 0 0"` | グループの辺の内側に空けておくスペースを `left bottom right top` で指定 |
| `reverse-x` | Boolean | `"false"` | 子を右から左へ並べるかどうか |
| `reverse-y` | Boolean | `"true"` | 子を上から下へ並べるかどうか。y軸は上向きなので、列やグリッドの行が上から下へ並ぶのは、このデフォルトによるものです。下から上へ積み上げるには `"false"` にします |
| `spacing` | Vector2 | `"0 0"` | 隣り合う子の間隔を `x y` で指定します。`x` は行の中の子の間隔、`y` は列の中の子の間隔とグリッドの行の間隔です |
| `width-fitting` | Enum | `"none"` | 子の幅をグループに合わせて変えるかどうか: `"none"` \| `"stretch"` \| `"shrink"` \| `"both"`。下の注記を参照してください |
| `wrap` | Boolean | `"false"` | 行からあふれる子で新しい行を始めるかどうか。これでグリッドになります。縦のレイアウトでは新しい列を始めます |

</div>

:::note[フィッティング]

`"none"` は子を自身のサイズのままにし、`"stretch"` はグループを埋めるように最大サイズまで拡大し、`"shrink"` はグループに収まるように最小サイズまで縮小し、`"both"` は必要な方を行います。行の幅など、レイアウトの方向では、スペースは子の [`<pc-layout-child>`](../pc-layout-child) の比率で分け合われます。レイアウトと交差する方向では、各子はそれぞれ単独で、自分の行または列に合わせられます。`wrap` を使うと、行はあふれる前に新しい行を始めるため、`"both"` は `"stretch"` として働きます。[フィッティング](/user-manual/user-interface/layout-groups/#fitting)を参照してください。

:::

## 例 {#example}

行を自動的に配置する縦のリストで、最初の行が一番上に来ます。`spacing` を大きくしたり、`reverse-y="false"` で下から上へ積み上げる向きにしたり、行を追加して自動的に収まる様子を見たりしてみましょう。`orientation="horizontal"` にすると行は横に並んでグループからあふれますが、`width-fitting="both"` にすると縮小されてグループの幅を分け合います:

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
* [レイアウトグループ](/user-manual/user-interface/layout-groups/) — ユーザーインターフェースのセクションにある、子の配置、フィッティング、折り返しの解説

サンプル: [UI Layout](https://playcanvas.github.io/web-components/examples/#ui-layout.html)、[Scroll View](https://playcanvas.github.io/web-components/examples/#scroll-view.html)

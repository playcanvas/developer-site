---
title: <pc-gsplat>
description: "pc-gsplat要素のリファレンス: Gaussian splat Assetをレンダリングし、splatデータのソース、影、LOD調整向けの属性を扱います。"
---

`<pc-gsplat>`タグは、3D Gaussian Splatsをレンダリングするためのgsplatコンポーネントを定義するために使用されます。

スプラットベースのシーンをレンダリングする場合、最高のパフォーマンスを得るには、[`<pc-app>`](../pc-app)タグの`antialias`と`high-resolution`を`false`に設定することをお勧めします。

:::note[使用法]

* それは、[`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | String | - | Gaussian splatアセットID (`gsplat`タイプのアセットを参照する必要があります) |
| `cast-shadows` | Flag | - | gsplatコンポーネントが影を落とすかどうか |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `lod-base-distance` | Number | `"5"` | 最初のLOD遷移 (LOD 0 から LOD 1) の距離。これより近いスプラットは最高品質のLODを使用します。最小値は`0.1`。LODレベルを含むアセットにのみ影響します。 |
| `lod-multiplier` | Number | `"3"` | 連続するLOD距離しきい値の間の乗数で、等比数列を形成します。値が大きいほど、より粗いLODへ早く切り替わります。最小値は`1.2`。LODレベルを含むアセットにのみ影響します。 |

</div>

## 例

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="MYgGZax" title="<pc-gsplat> example" />

## JavaScriptインターフェース

[GSplatComponentElement API](https://api.playcanvas.com/web-components/classes/GSplatComponentElement.html)を使用して、`<pc-gsplat>`要素をプログラムで作成および操作できます。

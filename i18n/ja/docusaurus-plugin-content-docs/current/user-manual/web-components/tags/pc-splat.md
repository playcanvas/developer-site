---
title: <pc-splat>
---

`<pc-splat>`タグは、3D Gaussian Splatsをレンダリングするためのスプラットコンポーネントを定義するために使用されます。

スプラットベースのシーンをレンダリングする場合、最高のパフォーマンスを得るには、[`<pc-app>`](../pc-app)タグの`antialias`と`high-resolution`を`false`に設定することをお勧めします。

:::note[使用法]

* それは、[`<pc-entity>`](../pc-entity)の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `asset` | String | - | Gaussian splatアセットID (`gsplat`タイプのアセットを参照する必要があります) |
| `cast-shadows` | Flag | - | スプラットコンポーネントが影を落とすかどうか |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `unified` | Flag | - | スプラットのグローバルソートとLODストリーミングを有効にします。コンポーネントが無効の場合にのみ設定できます。 |

</div>

## 例

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="MYgGZax" title="<pc-splat> example" />

## JavaScriptインターフェース

[SplatComponentElement API](https://api.playcanvas.com/web-components/classes/SplatComponentElement.html)を使用して、`<pc-splat>`要素をプログラムで作成および操作できます。

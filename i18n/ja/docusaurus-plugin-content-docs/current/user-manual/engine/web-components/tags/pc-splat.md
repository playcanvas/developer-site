---
title: <pc-splat>
---

`<pc-splat>` タグは、3D Gaussian Splats をレンダリングするためのスプラットコンポーネントを定義するために使用されます。

スプラットベースのシーンをレンダリングする場合、最高のパフォーマンスを得るためには、[`<pc-app>`](../pc-app) タグの `antialias` と `high-resolution` を `false` に設定することをお勧めします。

:::note

*   [`<pc-entity>`](../pc-entity) の直接の子である必要があります。

:::

## 属性

| 属性 | 説明 |
| --- | --- |
| `asset` | `gsplat` 型を持つ [`<pc-asset>`](../pc-asset) タグの `id` と一致する必要がある文字列です。 |
| `enabled` | スプラットコンポーネントの有効状態。指定されていない場合、`true` が使用されます。 |

## 例

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="MYgGZax" title="<pc-splat> example" />

## JavaScript インターフェース

[SplatComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.SplatComponentElement.html) を使用して、`<pc-splat>` 要素をプログラムで作成および操作できます。

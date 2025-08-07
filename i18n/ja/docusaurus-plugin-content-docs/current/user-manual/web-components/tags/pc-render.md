---
title: <pc-render>
---

`<pc-render>` タグは、3Dプリミティブをレンダリングするレンダリングコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity) の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `cast-shadows` | フラグ | - | コンポーネントが影を落とすかどうか |
| `enabled` | 真偽値 | `"true"` | コンポーネントの有効状態 |
| `receive-shadows` | フラグ | - | コンポーネントが影を受け取るかどうか |
| `type` | 列挙型 | - | プリミティブの形状: `"box"` \| `"capsule"` \| `"cone"` \| `"cylinder"` \| `"plane"` \| `"sphere"` |

</div>

## 例

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="NPKMrLy" title="<pc-render> 例" />

## JavaScript Interface

[RenderComponentElement API](https://api.playcanvas.com/web-components/classes/RenderComponentElement.html) を使用して、`<pc-render>` 要素をプログラムで作成および操作できます。

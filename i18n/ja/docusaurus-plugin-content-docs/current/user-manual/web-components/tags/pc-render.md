---
title: <pc-render>
description: "pc-render要素のリファレンス: プリミティブまたはメッシュのレンダリング、マテリアル、レイヤー、Entity上のシャドウの投射・受け取り設定です。"
---

`<pc-render>`タグは、3Dプリミティブをレンダリングするレンダリングコンポーネントを定義するために使用されます。

:::note[使用法]

* [`<pc-entity>`](../pc-entity) の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `cast-shadows` | Boolean | `"true"` | コンポーネントが影を落とすかどうか |
| `enabled` | Boolean | `"true"` | コンポーネントの有効状態 |
| `material` | String | - | プリミティブのレンダリングに使用する [`<pc-material>`](../pc-material) の `id`。省略した場合はデフォルトのマテリアルが使用されます |
| `receive-shadows` | Boolean | `"true"` | コンポーネントが影を受け取るかどうか |
| `type` | 列挙型 | `"box"` | レンダリングするプリミティブの形状: `"box"` \| `"capsule"` \| `"cone"` \| `"cylinder"` \| `"plane"` \| `"sphere"` |

</div>

:::tip

glTF/GLBファイルから3Dモデルをレンダリングするには、代わりに [`<pc-model>`](../pc-model) を使用してください。

:::

## 例

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="NPKMrLy" title="<pc-render> 例" />

## JavaScriptインターフェース

[RenderComponentElement API](https://api.playcanvas.com/web-components/classes/RenderComponentElement.html)を使用して、`<pc-render>`要素をプログラムで作成および操作できます。

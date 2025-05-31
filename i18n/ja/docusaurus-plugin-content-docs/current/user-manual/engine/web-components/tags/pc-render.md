---
title: <pc-render>
---

`<pc-render>` タグは、3Dプリミティブをレンダリングするレンダーコンポーネントを定義するために使用されます。

:::note

* これは [`<pc-entity>`](../pc-entity) の直接の子である必要があります。

:::

## 属性

| 属性 | 説明 |
| --- | --- |
| `type` | レンダーコンポーネントのタイプ。`box`、`capsule`、`cone`、`cylinder`、`plane`、または`sphere`のいずれかです。 |
| `cast-shadows` | 値なし属性。存在する場合、レンダーコンポーネントは影を落とします。 |
| `receive-shadows` | 値なし属性。存在する場合、レンダーコンポーネントは影を受け取ります。 |

## 例

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="NPKMrLy" title="<pc-render> example" />

## JavaScriptインターフェース

[RenderComponentElement API](https://api.playcanvas.com/web-components/classes/RenderComponentElement.html) を使用して、`<pc-render>` 要素をプログラムで作成および操作できます。

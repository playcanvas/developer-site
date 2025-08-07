---
title: <pc-app>
---

`<pc-app>`タグは、PlayCanvas アプリケーションのルート要素です。PlayCanvas アプリケーションを初期化し、シーンのコンテナを提供するために使用されます。

:::note[使用法]

* ドキュメントの `body` 要素の子孫である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `alpha` | Boolean | `"true"` | アプリケーションがフレームバッファにアルファチャネルを割り当てるかどうか |
| `antialias` | Boolean | `"true"` | アプリケーションがアンチエイリアシングを使用するかどうか |
| `backend` | Enum | `"webgl2"` | グラフィックスエンジンのバックエンド: `"webgpu"` \| `"webgl2"` \| `"null"` |
| `depth` | Boolean | `"true"` | アプリケーションがデプスバッファを割り当てるかどうか |
| `high-resolution` | Boolean | `"true"` | 物理解像度またはCSS解像度を使用してレンダリングするかどうか |
| `stencil` | Boolean | `"true"` | アプリケーションがステンシルバッファを割り当てるかどうか |

</div>

## 例

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="JoPvXjO" title="<pc-app> の例" />

## JavaScriptインターフェース

[AppElement API](https://api.playcanvas.com/web-components/classes/AppElement.html)を使用して、`<pc-app>`要素をプログラムで作成および操作できます。

---
title: <pc-app>
---

`<pc-app>`タグは、PlayCanvasアプリケーションのルート要素です。PlayCanvasアプリケーションを初期化し、シーンのコンテナを提供するために使用されます。

:::note

* ドキュメントの`body`要素の子孫である必要があります。

:::

## 属性

<div className="nowrap-first-col">

| 属性 | 説明 |
| --- | --- |
| `alpha` | 真偽値属性。アプリケーションがフレームバッファにアルファチャンネルを割り当てるかどうかを決定します。デフォルトは`true`です。 |
| `antialias` | 真偽値属性。アプリケーションがアンチエイリアシングを使用するかどうかを決定します。デフォルトは`true`です。 |
| `depth` | 真偽値属性。アプリケーションがデプスバッファを割り当てるかどうかを決定します。デフォルトは`true`です。 |
| `high-resolution` | 真偽値属性。アプリケーションが物理解像度またはCSS解像度を使用してレンダリングするかどうかを決定します。デフォルトは`true`です。 |
| `stencil` | 真偽値属性。アプリケーションがステンシルバッファを割り当てるかどうかを決定します。デフォルトは`true`です。 |

</div>

## 例

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="JoPvXjO" title="<pc-app> example" />

## JavaScriptインターフェース

[AppElement API](https://api.playcanvas.com/classes/EngineWebComponents.AppElement.html)を使用して、`<pc-app>`要素をプログラムで作成および操作できます。

---
title: <pc-app>
description: "pc-app要素のリファレンス: PlayCanvasのApplicationを初期化し、グラフィックスオプション、およびSceneとEntityのルートコンテナです。"
---

`<pc-app>`タグは、PlayCanvas アプリケーションのルート要素です。PlayCanvas アプリケーションを初期化し、シーンのコンテナを提供するために使用されます。

:::note[使用法]

* ドキュメントの `body` 要素の子孫である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `alpha` | Boolean | `"true"` | アプリケーションがフレームバッファにアルファチャネルを割り当てるかどうか。これにより、シーンが描画されていない部分でページが透けて見えます |
| `antialias` | Boolean | `"true"` | アプリケーションがアンチエイリアシングを使用するかどうか |
| `backend` | Enum | `"webgpu"` | グラフィックスエンジンのバックエンド: `"webgpu"` \| `"webgl2"` \| `"null"`。WebGPUが利用できないブラウザではWebGL 2にフォールバックします。WebGL 2を強制するには`"webgl2"`を設定してください。`"null"`は何も描画しないレンダラーを選択し、ヘッドレステスト用に存在します |
| `depth-buffer` | Boolean | `"true"` | アプリケーションがデプスバッファを割り当てるかどうか |
| `loading-bar` | Boolean | `"true"` | 起動時およびアセットのプリロード中に、アプリケーションが組み込みのローディングバーを表示するかどうか |
| `max-pixel-ratio` | Number | 上限なし | アプリケーションがレンダリングするピクセル比の上限。キャンバスはこの値とディスプレイ自身のデバイスピクセル比のうち小さい方でサイズが決まります。したがって`"1"`はCSS解像度でレンダリングし、`"2"`は高密度ディスプレイのすべてのピクセルを描画することなく鮮明さを保ちます |
| `stencil-buffer` | Boolean | `"true"` | アプリケーションがステンシルバッファを割り当てるかどうか |

</div>

:::warning[0.11.0での名称変更]

`depth`は`depth-buffer`に、`stencil`は`stencil-buffer`に変更され、Booleanの`high-resolution`は数値の`max-pixel-ratio`になりました。`high-resolution="false"`は`max-pixel-ratio="1"`に置き換えてください。以前の名称は認識されません。

:::

:::note[属性が読み取られるタイミング]

上記の属性のうち`max-pixel-ratio`と`loading-bar`以外は、要素がドキュメントに挿入されてグラフィックスデバイスを作成する際に一度だけ読み取られます。その後に変更しても、要素のプロパティは更新されますが実行中のアプリケーションには影響せず、その旨の警告がログに出力されます。新しい値を適用するには、要素を削除して再挿入してください。

:::

## ローディングバー

アプリケーションの起動中およびアセットのプリロード中、`<pc-app>`は要素の上端にローディングバーを表示します。表示を抑制するには`loading-bar="false"`を設定するか、次のCSSカスタムプロパティでテーマを設定します。

| プロパティ | 説明 |
| --- | --- |
| `--pc-loading-bar-color` | バーの塗りつぶされた部分の色 |
| `--pc-loading-bar-background` | その背後にある未塗りつぶしのトラックの色 |
| `--pc-loading-bar-height` | バーの高さ |

独自のローディング画面を作成する場合は、バーを抑制し、要素の`progress`イベントと`loadProgress`プロパティから制御してください。

## 例

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="JoPvXjO" title="<pc-app> の例" />

## JavaScriptインターフェース

[AppElement API](https://api.playcanvas.com/web-components/classes/AppElement.html)を使用して、`<pc-app>`要素をプログラムで作成および操作できます。

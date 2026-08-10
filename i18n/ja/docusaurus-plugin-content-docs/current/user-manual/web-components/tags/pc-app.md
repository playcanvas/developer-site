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

:::note[属性が読み取られるタイミング]

上記の属性のうち`max-pixel-ratio`と`loading-bar`以外は、要素がドキュメントに挿入されてグラフィックスデバイスを作成する際に一度だけ読み取られます。その後に変更しても、要素のプロパティは更新されますが実行中のアプリケーションには影響せず、その旨の警告がログに出力されます。新しい値を適用するには、要素を削除して再挿入してください。

:::

## サイズ指定

この要素は`<video>`や`<img>`のような置換要素と同じ方式でサイズが決まります。つまり、ページのCSSが制御するブロックレベルのボックスで、デフォルトはキャンバスの固有サイズである300×150ピクセルです。アプリケーションのキャンバスは常に要素全体を満たし、描画バッファの解像度は要素のサイズにライブで追従します（上限は`max-pixel-ratio`）。スプリッターのドラッグ、フレックスのリフロー、CSSアニメーションなど、要素のサイズを変えるものすべてにレンダリング結果が追従します。

フルスクリーンは組み込みの動作ではなく、通常のCSSで実現します。

```css
pc-app {
    width: 100%;
    height: 100vh;  /* 動的ビューポート単位に未対応のブラウザ向けフォールバック */
    height: 100dvh;
}
```

同様に、要素はカード、分割ペイン、グリッドセルなど、任意のサイズで埋め込むことができ、1つのページに複数のアプリを共存させることもできます。

:::note[明示的な寸法でサイズを指定する]

要素のサイズは明示的な`width`と`height`で指定してください。ライブラリのデフォルトスタイルが明示的な寸法を与えており、CSSのボックス解決では明示的な寸法がinsetによる引き伸ばしより優先されるため、`position: fixed; inset: 0`だけでは要素は引き伸ばされ**ません**。（デフォルトは[`:where()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:where)により詳細度ゼロで宣言されているため、どんなに単純なページ側のルールでも上書きできます。）

:::

:::warning[破壊的変更]

0.12.0までのリリースでは、`<pc-app>`は暗黙的にブラウザウィンドウ全体を満たしていました。この動作に依存していたページは、要素のサイズを自分で指定する必要があります — 上記のフルスクリーンCSSが従来の動作を再現します。

:::

要素のサイズが描画バッファを制御しない唯一の例外はXRセッションの表示中で、その間はセッションがバッファを所有します。

## ローディングバー

アプリケーションの起動中およびアセットのプリロード中、`<pc-app>`は要素の上端にローディングバーを表示します。表示を抑制するには`loading-bar="false"`を設定するか、次のCSSカスタムプロパティでテーマを設定します。

| プロパティ | 説明 |
| --- | --- |
| `--pc-loading-bar-color` | バーの塗りつぶされた部分の色 |
| `--pc-loading-bar-background` | その背後にある未塗りつぶしのトラックの色 |
| `--pc-loading-bar-height` | バーの高さ |

独自のローディング画面を作成する場合は、バーを抑制し、要素の`progress`イベントと`loadProgress`プロパティから制御してください。

## イベント

これらのイベントは、[`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)を使用するか、このインターフェースの`oneventname`プロパティにイベントリスナーを割り当てることでリッスンできます。

| イベント | 説明 |
| --- | --- |
| `progress` | アプリケーションがアセットをプリロードしている間に発生する[`ProgressEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent)。`loaded`と`total`はバイト数ではなくアセット数で、読み込みに失敗したアセットも読み込み済みとして数えられます。起動ごとに少なくとも1回発生し、最後のイベントでは必ず`loaded`が`total`と等しくなります。 |
| `error` | グラフィックスデバイスを作成できず、アプリケーションが起動できないとき（WebGLが無効化されている、GPUがブロックリストに載っているなど）に発生する[`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent)。`message`には要求されたバックエンドの名前が入り、`error`には元の失敗が入ります。 |

どちらのイベントもバブリングしないため、要素自身でリッスンしてください。

`error`を発生させた要素は決してready状態にならず、`app`プロパティは`null`のままです。特に、`whenReady('pc-app')`は永遠に解決しません（[プログラムによるアクセス](../programmatic-access.md)を参照）。フォールバックUIを表示したいページは、準備完了を待つのではなく、このイベントをリッスンしてください。

```javascript
document.querySelector('pc-app').addEventListener('error', (event) => {
    // WebGPUもWebGL 2も利用できない — 代わりに静的コンテンツを表示する
    document.getElementById('fallback').hidden = false;
});
```

要素を削除して再挿入すると、その時点の属性で起動を再試行します。

## 例

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="JoPvXjO" title="<pc-app> の例" />

## JavaScriptインターフェース

[AppElement API](https://api.playcanvas.com/web-components/classes/AppElement.html)を使用して、`<pc-app>`要素をプログラムで作成および操作できます。

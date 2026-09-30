---
title: <pc-app>
description: "pc-app要素のリファレンス: PlayCanvasのApplicationを初期化し、グラフィックスオプション、およびSceneとEntityのルートコンテナです。"
---

`<pc-app>`タグは、PlayCanvas アプリケーションのルート要素です。PlayCanvas アプリケーションを初期化し、シーンのコンテナを提供するために使用されます。

:::note[使用法]

* ドキュメントの `body` 要素の子孫である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `alpha` | Boolean | `"true"` | アプリケーションがフレームバッファにアルファチャネルを割り当てるかどうか。これにより、シーンが描画されていない部分でページが透けて見えます |
| `antialias` | Boolean | `"true"` | アプリケーションがアンチエイリアシングを使用するかどうか |
| `area-light-luts` | [Asset ID](../attributes.md#asset-and-material-ids) | - | エリアライトのルックアップテーブルをJSONとして保持する[`<pc-asset>`](../pc-asset)のID。これを読み込むとアプリケーション全体でエリアライトが有効になり、`rect`・`disk`・`sphere`の`shape`を持つ[`<pc-light>`](../pc-light)要素が意図どおりに描画されます。外すと再び無効になります。即座に適用されます。[エリアライト](../pc-light#area-lights)を参照 |
| `backend` | Enum | `"webgpu"` | グラフィックスエンジンのバックエンド: `"webgpu"` \| `"webgl2"` \| `"null"`。WebGPUが利用できないブラウザではWebGL 2にフォールバックします。WebGL 2を強制するには`"webgl2"`を設定してください。`"null"`は何も描画しないレンダラーを選択し、ヘッドレステスト用に存在します |
| `depth-buffer` | Boolean | `"true"` | アプリケーションがデプスバッファを割り当てるかどうか |
| `loading-bar` | Boolean | `"true"` | 起動時およびアセットのプリロード中に、アプリケーションが組み込みのローディングバーを表示するかどうか |
| `max-pixel-ratio` | Number | 上限なし | アプリケーションがレンダリングするピクセル比の上限（0より大きい値）。キャンバスはこの値とディスプレイ自身のデバイスピクセル比のうち小さい方でサイズが決まります。したがって`"1"`はCSS解像度でレンダリングし、`"2"`は高密度ディスプレイのすべてのピクセルを描画することなく鮮明さを保ちます |
| `picking` | Enum | `"auto"` | エンティティ要素で[ポインターイベント](../pc-entity#events)をディスパッチするために、アプリケーションがポインターの下のシーンをいつピッキングするか: `"auto"` \| `"always"` \| `"none"`。`auto`は、あるイベントの種類のリスナーがエンティティ要素または[`<pc-scene>`](../pc-scene)に登録されている間だけ、その種類についてピッキングします。`always`はすべてのポインターイベントでピッキングします。ドキュメント上のリスナーや、Reactの`onPointerMove`のようなフレームワークの委譲ハンドラーなど、アプリケーションが認識できないリスナーにはこれが必要です。`none`はピッキングを一切行わないため、エンティティはポインターイベントを受け取りません。ピッキングではシーンをもう一度レンダリングするため、`auto`がデフォルトになっています。[イベントがディスパッチされるタイミング](../pc-entity#when-events-are-dispatched)を参照 |
| `stencil-buffer` | Boolean | `"true"` | アプリケーションがステンシルバッファを割り当てるかどうか |
| `with-credentials` | Boolean | `"false"` | アセットのリクエストが他のオリジンに資格情報（CookieとHTTP認証）を送信するかどうか。アセットサーバー側でCORSにより許可されている必要があります。エンジンはこの設定をページ全体で共有されるHTTPクライアントに保持するため、ページ上のすべての`<pc-app>`に適用されます。この属性を付けて起動したアプリはすべてのアプリケーションで有効にし、その後いずれかのアプリで変更すると、すべてのアプリケーションに対して設定されます |

</div>

:::note[属性が読み取られるタイミング]

上記の属性のうち`max-pixel-ratio`・`loading-bar`・`area-light-luts`・`picking`・`with-credentials`以外は、要素がドキュメントに挿入されてグラフィックスデバイスを作成する際に一度だけ読み取られます。その後に変更しても、要素のプロパティは更新されますが実行中のアプリケーションには影響せず、その旨の警告がログに出力されます。新しい値を適用するには、要素を削除して再挿入してください。

:::

## サイズ指定 {#sizing}

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

描画バッファは要素だけでなくディスプレイにも追従します。ウィンドウを画素密度の異なる画面に移動したり、ページをズームしたりすると、要素のサイズが変わらなくてもデバイスピクセル比が変わるため、アプリケーションはピクセル比を評価し直し、それに合わせてバッファのサイズを変更します。実際に使われる比率、つまり`max-pixel-ratio`とディスプレイ自身の比率の小さい方は`app.graphicsDevice.maxPixelRatio`に入り、要素の`maxPixelRatio`プロパティは上限値を返します。描画品質を管理するコードは、`app.graphicsDevice.maxPixelRatio`に直接代入することもできます。その場合、ディスプレイが変わってもその比率は保たれ、バッファのサイズだけが追従します。`max-pixel-ratio`を再び設定すると、比率の管理は要素に戻ります。

要素のサイズが描画バッファを制御しない唯一の例外はXRセッションの表示中で、その間はセッションがバッファを所有します。

## ローディングバー {#loading-bar}

アプリケーションの起動中およびアセットのプリロード中、`<pc-app>`は要素の上端にローディングバーを表示します。表示を抑制するには`loading-bar="false"`を設定するか（起動後に設定するとバーは直ちに消えますが、`"true"`に戻しても要素を再挿入するまで効果はありません）、次のCSSカスタムプロパティでテーマを設定します。

| プロパティ | 説明 |
| --- | --- |
| `--pc-loading-bar-color` | バーの塗りつぶされた部分の色 |
| `--pc-loading-bar-background` | その背後にある未塗りつぶしのトラックの色 |
| `--pc-loading-bar-height` | バーの高さ |

独自のローディング画面を作成する場合は、バーを抑制し、要素の`progress`イベントと`loadProgress`プロパティから制御してください。

## イベント {#events}

これらのイベントは、[`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)を使用するか、このインターフェースの`oneventname`プロパティにイベントリスナーを割り当てることでリッスンできます。

| イベント | 説明 |
| --- | --- |
| `progress` | アプリケーションがアセットをプリロードしている間に発生する[`ProgressEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent)。`loaded`と`total`はバイト数ではなくアセット数で、読み込みに失敗したアセットも読み込み済みとして数えられます。起動ごとに少なくとも1回発生し、最後のイベントでは必ず`loaded`が`total`と等しくなります。 |
| `error` | グラフィックスデバイスを作成できず、アプリケーションが起動できないとき（WebGLが無効化されている、GPUがブロックリストに載っているなど）に発生する[`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent)。`message`には要求されたバックエンドの名前が入り、`error`には元の失敗が入ります。捕捉する方法は[下記](#handling-a-failed-boot)を参照してください。 |

どちらのイベントもバブリングしないため、要素自身でリッスンしてください。

### 起動の失敗を処理する {#handling-a-failed-boot}

`error`を発生させた要素は決してready状態にならず、`app`プロパティは`null`のままです。特に、`whenReady('pc-app')`は永遠に解決しません（[プログラムによるアクセス](../programmatic-access.md)を参照）。フォールバックUIを表示したいページは、準備完了を待つのではなく、このイベントをリッスンしてください。ハンドラーはインライン属性として設定します。失敗はライブラリが起動した直後、自分のモジュールスクリプトが実行される前に報告されることがあるため、モジュールスクリプトから追加したリスナーでは取りこぼす可能性があります。属性であれば、要素が解析された時点から有効です。

```html
<pc-app onerror="document.getElementById('fallback').hidden = false">
```

このイベントは、デバイスをまったく作成できない場合を対象としています。デフォルトの`backend`では、WebGPUを提供するブラウザはまずWebGPUを試してからWebGL 2にフォールバックしますが、その経路で両方が失敗すると、現在のエンジンは`error`を発生させずに要素を待機状態のままにします。必ず表示すべきフォールバックには、タイムアウトも設けてください。数秒経っても要素がready状態にならなければ表示します。

要素を削除して再挿入すると、その時点の属性で起動を再試行します。

エンティティでディスパッチされた[ポインターイベント](../pc-entity#events)も、キャンバス自身のネイティブなポインターイベントと並んで`<pc-app>`までバブリングします。両者は`event.isTrusted`で区別できます。ブラウザのネイティブなイベントでは`true`、ディスパッチされたイベントでは`false`です。エンティティのイベントがそもそもディスパッチされるかどうかは`picking`によって決まります。[イベントがディスパッチされるタイミング](../pc-entity#when-events-are-dispatched)を参照してください。

## 例 {#example}

カメラ、ライト、球体からなる完全なアプリケーションです。`<pc-app>`タグに `antialias="false"` や `max-pixel-ratio="1"` を設定してみましょう:

```html live-example
<pc-app>
    <pc-scene>
        <pc-entity name="camera" position="0 0 3">
            <pc-camera clear-color="#8099e6"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 45 0">
            <pc-light></pc-light>
        </pc-entity>
        <pc-entity name="ball">
            <pc-render type="sphere"></pc-render>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[AppElement API](https://api.playcanvas.com/web-components/classes/AppElement.html)を使用して、`<pc-app>`要素をプログラムで作成および操作できます。

`app`プロパティは、実行中のエンジンの[AppBase](https://api.playcanvas.com/engine/classes/AppBase.html)です。要素の準備が完了するまでは`null`で、シーン、アセットレジストリ、レンダーループにアクセスできます。`elementFromEntity()`は、エンジンのエンティティからそれを表す要素を返します。

## 関連項目 {#see-also}

* [`<pc-scene>`](../pc-scene) — アプリがレンダリングする唯一のシーン
* [`<pc-asset>`](../pc-asset) — シーンが始まる前にアプリがプリロードするリソース
* [`<pc-wasm>`](../pc-wasm) — 物理などアプリが起動前にロードするモジュール
* [プログラムによるアクセス](../programmatic-access.md) — JavaScriptから`ready`を待ち、`app`にアクセスする方法

サンプル: [Spinning Cube](https://playcanvas.github.io/web-components/examples/#spinning-cube.html)、[Basic Shapes](https://playcanvas.github.io/web-components/examples/#basic-shapes.html)

---
title: <pc-wasm>
description: "pc-wasm要素のリファレンス: glue・wasm・fallbackのパスから、Ammo、Basis、DracoDecoderModuleなどのWebAssemblyモジュールを読み込みます。"
---

`<pc-wasm>`タグは、アプリケーションの起動前にエンジンが必要とするWebAssemblyモジュール — 物理用の`Ammo`、圧縮アセット用の`Basis`や`DracoDecoderModule` — をロードします。

:::note[使用法]

* [`<pc-app>`](../pc-app)の直接の子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `fallback` | String | - | WebAssemblyがサポートされていない場合のフォールバック（asm.js）コードへのパス。Dracoデコーダーはこれを使用しません |
| `glue` | String | - | モジュール用のJavaScriptグルーコードへのパス |
| `name` | String | - | スクリプトで参照するために使用されるモジュール名 |
| `wasm` | String | - | WebAssembly (.wasm) ファイルへのパス |

</div>

`name`は大文字と小文字が区別されます — エンジンは正確な名前でモジュールを検索します。エンジンが使用するモジュールは`Ammo`（物理）、`Basis`（テクスチャトランスコード）、`DracoDecoderModule`（メッシュ展開）です。大文字と小文字の誤りは、要素が報告できない唯一の読み込み失敗です。`name="ammo"`とすると、glueスクリプトの読み込み時にエンジンが`TypeError`をスローし、`error`イベントは発生せず、要素もその`<pc-app>`も決してready状態になりません。

:::note[属性が読み取られるタイミング]

属性は、モジュールの読み込みが始まるとき（要素が最初にドキュメントに接続されたとき、または包含する`<pc-app>`が先に起動してこの要素を収集した場合はそれより早いタイミング）に一度だけ読み取られます。その後に変更しても効果はありません。プログラムによる要素の作成は期待どおりに動作します。要素をドキュメントに追加する前に属性を設定してください。

:::

## 準備完了 {#readiness}

この要素は非同期に初期化され、モジュールの読み込みが完了するか失敗するとready状態になります。標準の`ready`イベントを発生させ、`whenReady('pc-wasm')`で待機できます（[プログラムによるアクセス](../programmatic-access.md)を参照）。（例外は`Basis`で、トランスコーダーの読み込みが始まった時点でready状態になります。）ready状態は読み込みが決着したことを意味し、成功したことを意味するわけではありません。失敗したモジュールは[`error`](#events)も発生させます。ただし、要素を直接待機する必要はほとんどありません。`<pc-app>`は、グラフィックスデバイスを作成する前に、子要素であるすべての`<pc-wasm>`の読み込みが決着するのを待機するため、アプリが準備完了した時点で、各モジュールは読み込みを完了しているか、失敗を報告しているからです。それより深くネストされた`<pc-wasm>`も読み込まれますが、アプリはそれを待ちません。

準備完了状態は意図的に固定されています。WebAssemblyモジュールは決してアンロードされないエンジングローバルな状態を構成するため、要素を削除してもpending状態には戻らず、再挿入してもモジュールが再読み込みされることはありません。

`name`のない`<pc-wasm>`は警告をログに出力し、決してready状態になりません — ただし、包含する`<pc-app>`の起動は妨げません。

`Ammo`は後から追加するのではなく、マークアップで宣言してください。エンジンが物理モジュールを探すのはアプリケーションの起動時の一度だけなので、それなしで起動したアプリは物理なしで動作します。

## イベント {#events}

このイベントは、[`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)を使用するか、このインターフェースの`oneventname`プロパティにイベントリスナーを割り当てることでリッスンできます。

| イベント | 説明 |
| --- | --- |
| `error` | モジュールの読み込みが失敗したとき（URLの誤りやサーバーの拒否など）に発生する[`ErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent)で、エンジンのエラーが`message`に入ります。要素ごとに一度だけ発生し、要素はそれでもready状態になります。`Basis`モジュールでは発生しません。 |

このイベントはバブリングしないため、要素自身でリッスンするか、`<pc-app>`でキャプチャフェーズのリスナーを使用してください。

読み込みに失敗したモジュールがあっても、アプリケーションは止まりません。要素はコンソールに`pc-wasm failed to load module '<name>' - <error>`を出力し、包含する`<pc-app>`はそのモジュールなしで起動します。`Ammo`が失敗した場合、アプリは物理なしで動作します。エンジンは失敗したモジュールを二度と読み込もうとしないため、そのモジュールを読み込むすべての`<pc-wasm>`が一緒に失敗します。読み込みが失敗した時点ですでに待機していたものも、後から追加されたもの（たとえば2つ目の`<pc-app>`の中のもの）も同様で、後者はただちに失敗します。

## 例 {#example}

`Ammo` 物理モジュールの読み込みです。ボックスが落下するのはモジュールが宣言されているからです — アプリはモジュールを待ってから起動するため、シーン開始時には物理が使用可能になっています。`<pc-wasm>` タグを削除して再実行してみましょう:

```html live-example
<pc-app>
    <!-- ammo.jsのWebAssemblyモジュールをロード -->
    <pc-wasm name="Ammo" glue="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.js" wasm="https://developer.playcanvas.com/assets/modules/ammo/ammo.wasm.wasm" fallback="https://developer.playcanvas.com/assets/modules/ammo/ammo.js"></pc-wasm>
    <pc-scene>
        <pc-entity name="camera" position="0 2 6">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows normal-offset-bias="0.05" shadow-bias="0.2"></pc-light>
        </pc-entity>
        <pc-entity name="crate" position="0 4 0" rotation="25 15 35">
            <pc-render type="box"></pc-render>
            <pc-collision></pc-collision>
            <pc-rigid-body type="dynamic"></pc-rigid-body>
        </pc-entity>
        <pc-entity name="ground" position="0 -0.5 0" scale="10 1 10">
            <pc-render type="box"></pc-render>
            <pc-collision half-extents="5 0.5 5"></pc-collision>
            <pc-rigid-body type="static"></pc-rigid-body>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScriptインターフェース {#javascript-interface}

[WasmElement API](https://api.playcanvas.com/web-components/classes/WasmElement.html)を使用して、`<pc-wasm>`要素をプログラムで作成および操作できます。

この要素はエンジンオブジェクトを公開しません。準備が完了した時点で、モジュールは`name`の下でエンジンの`WasmModule`を通じてインスタンス化されています（`Basis`だけはエンジンのBasis初期化処理を通ります）。Ammoのglueスクリプトはグローバルの`Ammo`を定義するため、スクリプトから直接利用できます。その他のモジュールには`WasmModule.getInstance(name, callback)`でアクセスしてください。

## 関連項目 {#see-also}

* [`<pc-rigid-body>`](../pc-rigid-body) — Ammoをロードする最も一般的な理由である物理
* [`<pc-collision>`](../pc-collision) — 物理用の衝突形状
* [`<pc-app>`](../pc-app) — すべてのモジュールを待ってから起動します

サンプル: [Basic Physics](https://playcanvas.github.io/web-components/examples/#basic-physics.html)、[Vehicle Physics](https://playcanvas.github.io/web-components/examples/#vehicle-physics.html)、[Video Texture](https://playcanvas.github.io/web-components/examples/#video-texture.html)

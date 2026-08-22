---
title: <pc-wasm>
description: "pc-wasm要素のリファレンス: glue・wasm・fallbackのパスから、Ammo、Basis、DracoDecoderModuleなどのWebAssemblyモジュールを読み込みます。"
---

`<pc-wasm>`タグはWebAssemblyモジュールをロードするために使用されます。

:::note[使用法]

* [`<pc-app>`](../pc-app)の直接の子である必要があります。

:::

## 属性 {#attributes}

<div className="attribute-table">

| 属性 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `fallback` | String | - | WebAssemblyがサポートされていない場合のフォールバック（asm.js）コードへのパス |
| `glue` | String | - | モジュール用のJavaScriptグルーコードへのパス |
| `name` | String | - | スクリプトで参照するために使用されるモジュール名 |
| `wasm` | String | - | WebAssembly (.wasm) ファイルへのパス |

</div>

`name`は大文字と小文字が区別されます — エンジンは正確な名前でモジュールを検索します。エンジンが使用するモジュールは`Ammo`（物理）、`Basis`（テクスチャトランスコード）、`DracoDecoderModule`（メッシュ展開）です。

:::note[属性が読み取られるタイミング]

属性は、モジュールの読み込みが始まるとき（要素が最初にドキュメントに接続されたとき、または包含する`<pc-app>`が先に起動してこの要素を収集した場合はそれより早いタイミング）に一度だけ読み取られます。その後に変更しても効果はありません。プログラムによる要素の作成は期待どおりに動作します。要素をドキュメントに追加する前に属性を設定してください。

:::

## 準備完了 {#readiness}

この要素は非同期に初期化され、モジュールの読み込みが完了するとready状態になります。標準の`ready`イベントを発生させ、`whenReady('pc-wasm')`で待機できます（[プログラムによるアクセス](../programmatic-access.md)を参照）。ただし、直接待機する必要はほとんどありません。包含する`<pc-app>`は、グラフィックスデバイスを作成する前に、配下に宣言されたすべての`<pc-wasm>`を待機するため、準備完了したアプリとは、モジュールの読み込みが完了したアプリだからです。

準備完了状態は意図的に固定されています。WebAssemblyモジュールは決してアンロードされないエンジングローバルな状態を構成するため、要素を削除してもpending状態には戻らず、再挿入してもモジュールが再読み込みされることはありません。

`name`のない`<pc-wasm>`は警告をログに出力し、決してready状態になりません — ただし、包含する`<pc-app>`の起動は妨げません。

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
            <pc-light cast-shadows></pc-light>
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

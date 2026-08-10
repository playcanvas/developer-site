---
title: <pc-module>
description: "pc-module要素のリファレンス: glue・wasm・fallbackのパスから、Ammo、Basis、DracoDecoderModuleなどのWebAssemblyモジュールを読み込みます。"
---

`<pc-module>`タグはWebAssemblyモジュールをロードするために使用されます。

:::note[使用法]

* [`<pc-app>`](../pc-app)の直接の子である必要があります。

:::

## 属性

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

## 準備完了

この要素は非同期に初期化され、モジュールの読み込みが完了するとready状態になります。標準の`ready`イベントを発生させ、`whenReady('pc-module')`で待機できます（[プログラムによるアクセス](../programmatic-access.md)を参照）。ただし、直接待機する必要はほとんどありません。包含する`<pc-app>`は、グラフィックスデバイスを作成する前に、配下に宣言されたすべての`<pc-module>`を待機するため、準備完了したアプリとは、モジュールの読み込みが完了したアプリだからです。

準備完了状態は意図的に固定されています。WebAssemblyモジュールは決してアンロードされないエンジングローバルな状態を構成するため、要素を削除してもpending状態には戻らず、再挿入してもモジュールが再読み込みされることはありません。

`name`のない`<pc-module>`は警告をログに出力し、決してready状態になりません — ただし、包含する`<pc-app>`の起動は妨げません。

## 例

```html
<pc-app>
    <!-- ammo.jsモジュールをロード -->
    <pc-module name="Ammo" glue="ammo.wasm.js" wasm="ammo.wasm.wasm" fallback="ammo.js"></pc-module>
</pc-app>
```

## JavaScriptインターフェース

[ModuleElement API](https://api.playcanvas.com/web-components/classes/ModuleElement.html)を使用して、`<pc-module>`要素をプログラムで作成および操作できます。

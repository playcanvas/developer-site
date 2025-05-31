---
title: <pc-module>
---

`<pc-module>`タグは、WebAssemblyモジュールをロードするために使用されます。

:::note

* [`<pc-app>`](../pc-app)の直接の子である必要があります。

:::

## 属性

| 属性 | 説明 |
| --- | --- |
| `name` | モジュールの名前です。これはスクリプト内でモジュールを参照するために使用されます。 |
| `glue` | モジュールのglue codeへのパスです。 |
| `wasm` | モジュールのWASMファイルへのパスです。 |
| `fallback` | モジュールのfallback (asm.js) コードへのパスです (WebAssemblyがサポートされていない場合)。 |

## 例

```html
<pc-app>
    <!-- ammo.jsモジュールをロードします -->
    <pc-module name="ammo" glue="ammo.js" wasm="ammo.wasm.wasm" fallback="ammo.wasm.js"></pc-module>
</pc-app>
```

## JavaScriptインターフェース

[ModuleElement API](https://api.playcanvas.com/classes/EngineWebComponents.ModuleElement.html)を使用して、`<pc-module>`要素をプログラムで作成および操作できます。

---
title: <pc-module>
---

`<pc-module>`タグはWebAssemblyモジュールをロードするために使用されます。

:::note[使用方法]

*   [`<pc-app>`](../pc-app)の直接の子である必要があります。

:::

## 属性

<div className="attribute-table">

| 属性 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `fallback` | String | - | WebAssemblyがサポートされていない場合のフォールバック（asm.js）コードへのパス |
| `glue` | String | - | モジュール用のJavaScriptグルーコードへのパス |
| `name` | String | - | スクリプトで参照するために使用されるモジュール名 |
| `wasm` | String | - | WebAssembly (.wasm) ファイルへのパス |

</div>

## 例

```html
<pc-app>
    <!-- ammo.jsモジュールをロード -->
    <pc-module name="ammo" glue="ammo.js" wasm="ammo.wasm.wasm" fallback="ammo.wasm.js"></pc-module>
</pc-app>
```

## JavaScriptインターフェース

[ModuleElement API](https://api.playcanvas.com/web-components/classes/ModuleElement.html)を使用して、`<pc-module>`要素をプログラムで作成および操作できます。

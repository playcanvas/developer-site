---
title: WASM Module
---

Wasmモジュール(WebAssemblyモジュールとも呼ばれます)には、Web向けにコンパイルされた実行可能コードが含まれています。

Wasmモジュールには3つの部分があります。

* バイナリ実行ファイル
* JavaScriptのグルーコード ファイル
* オプションのフォールバックasm.js

これらのファイルは、アセットパネルにドラッグアンドドロップするか、アセットパネルコンテキストメニューから 'Upload' を選択することでプロジェクトに追加できます。

PlayCanvasエディターは現在、[Emscripten][2]でコンパイルされたWasmモジュールのみをサポートしていることに注意してください。

## Wasmモジュールのプロパティ

Once the files have been added to the project, select the Wasm Module to display its properties in the Inspector Panel:
![Wasm Module Properties](/img/user-manual/assets/wasm-module.png)

### 名前

名前は、グルーコードやフォールバックスクリプトで定義されているモジュール名と一致する必要があります。この名前は、ロード時にモジュールをインスタンス化するために使用されます。

### グルースクリプト (Glue script)

これは、Wasmコードを実行するために必要なJavaScriptのグルーコードです。

### フォールバックスクリプト (Fallback script)

これは、WebAssemblyがサポートされていない際に使用する、オプションのフォールバックasm.js スクリプトです。

[2]: https://emscripten.org/

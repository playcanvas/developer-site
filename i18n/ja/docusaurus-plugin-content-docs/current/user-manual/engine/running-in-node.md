---
title: Node.jsでエンジンを実行する
---

[Node.js](https://nodejs.org/)は、Windows、Linux、macOSなどで動作するクロスプラットフォームのオープンソースJavaScriptランタイム環境です。これはV8 JavaScriptエンジン上で動作し、ウェブブラウザの外部でJavaScriptコードを実行します。Node.jsを使用すると、開発者はJavaScriptでコマンドラインツールやサーバーサイドスクリプティングを作成できます。

PlayCanvas EngineはNode.jsでの実行を完全にサポートしています。これは次のような場合に役立ちます。

* マルチプレイヤーサーバーの作成
* アセットデータ処理ツールの作成
* アプリケーションの単体テストの記述

:::note

PlayCanvas EngineはNode.jsを使用して独自の[単体テスト](https://github.com/playcanvas/engine/blob/main/test/README.md)を実行しています。

:::

## インストール

開始する前に、Node.js 18以降がインストールされていることを確認してください。その後、npmを使用してPlayCanvas Engineと`jsdom`をインストールできます。

```bash
npm install jsdom playcanvas --save-dev
```

:::info

`jsdom`パッケージは、Node.jsでDOM環境をシミュレートするために使用されます。これは、PlayCanvas Engineが複数の場所でDOM APIを使用しているため必要です。

:::

## jsdomの設定

`jsdom`を使用してDOM環境を設定し、PlayCanvas Engineが正常に実行できるようにする関数を作成しましょう。

```javascript
import { JSDOM } from 'jsdom';
import * => pc from 'playcanvas';

let jsdom;

export function jsdomSetup() {
    const html = '<!DOCTYPE html><html><head></head><body></body></html>';

    jsdom = new JSDOM(html, {
        resources: 'usable',         // エンジンがアセットをロードできるようにする
        runScripts: 'dangerously',   // エンジンがスクリプトを実行できるようにする
        url: 'http://localhost:3000' // ドキュメントのURLを設定する
    });

    // windowとdocumentをグローバルスコープにコピーする
    global.window = jsdom.window;
    global.document = jsdom.window.document;

    // エンジンで使用されるDOM APIをグローバルスコープにコピーする
    global.ArrayBuffer = jsdom.window.ArrayBuffer;
    global.Audio = jsdom.window.Audio;
    global.DataView = jsdom.window.DataView;
    global.Image = jsdom.window.Image;
    global.KeyboardEvent = jsdom.window.KeyboardEvent;
    global.MouseEvent = jsdom.window.MouseEvent;
    global.XMLHttpRequest = jsdom.window.XMLHttpRequest;

    // PlayCanvas APIをグローバルスコープにコピーする（「classic」スクリプトにのみ必要）
    jsdom.window.pc = pc;
}
```

`jsdomSetup()`を呼び出した後、通常通りPlayCanvasアプリケーションを作成できます。

## PlayCanvasアプリケーションの作成

Node.jsでPlayCanvasアプリケーションを実行する場合、レンダリングは必要ない可能性が高いです。この場合、グラフィックを出力しないNullグラフィックデバイスを作成できます。

```javascript
import { Application, NullGraphicsDevice } from 'playcanvas';

export function createApp() {
    const canvas = document.createElement('canvas');
    const graphicsDevice = new NullGraphicsDevice(canvas);
    return new Application(canvas, { graphicsDevice });
}
```

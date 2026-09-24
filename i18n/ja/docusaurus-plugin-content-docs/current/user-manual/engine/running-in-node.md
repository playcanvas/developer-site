---
title: Node.jsでエンジンを実行する
description: Node.jsでPlayCanvas Engineをサーバー側で使い、マルチプレイヤーサーバー、アセット処理ツール、単体テストに活用します。
---

[Node.js](https://nodejs.org/)は、Windows、Linux、macOSなどで動作するクロスプラットフォームのオープンソースJavaScriptランタイム環境です。これはV8 JavaScriptエンジン上で動作し、ウェブブラウザの外部でJavaScriptコードを実行します。Node.jsを使用すると、開発者はJavaScriptでコマンドラインツールやサーバーサイドスクリプティングを作成できます。

PlayCanvas EngineはNode.jsでの実行を完全にサポートしています。これは次のような場合に役立ちます。

* マルチプレイヤーサーバーの作成
* アセットデータ処理ツールの作成
* アプリケーションの単体テストの記述

:::note

PlayCanvas EngineはNode.jsを使用して独自の[単体テスト](https://github.com/playcanvas/engine/blob/main/test/README.md)を実行しています。

:::

## インストール {#installation}

開始する前に、Node.js 18以降がインストールされていることを確認してください。その後、npmを使用してPlayCanvas Engineをインストールできます。

```bash
npm install playcanvas
```

## ヘッドレスアプリケーションの作成 {#creating-a-headless-application}

Node.jsでPlayCanvasアプリケーションを実行する場合、レンダリングは必要ない可能性が高いです。この場合、何もレンダリングしない[`NullGraphicsDevice`](https://api.playcanvas.com/engine/classes/NullGraphicsDevice.html)を作成できます。表示するものがないため、キャンバスの代わりにプレーンなオブジェクトを使用できます。

```javascript
import { AppBase, AppOptions, NullGraphicsDevice, ScriptComponentSystem } from 'playcanvas';

// 何もレンダリングしないため、プレーンなオブジェクトをキャンバスの代わりに使用する
const canvas = { width: 1, height: 1 };

const options = new AppOptions();
options.graphicsDevice = new NullGraphicsDevice(canvas);
options.componentSystems = [ScriptComponentSystem];

const app = new AppBase(canvas);
app.init(options);
app.start();
```

[`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html)は、登録したコンポーネントシステムだけを実行します。このアプリケーションは、[スクリプトの追加](#adding-scripts)で使用するスクリプトコンポーネントシステムを登録しています。他の種類のコンポーネントを追加する場合は、[アプリケーションの構成](/user-manual/engine/standalone/#configuring-the-application)で説明しているように、それぞれのシステムを登録してください。

## アプリケーションの更新 {#updating-the-application}

ブラウザでは、`app.start()`は`requestAnimationFrame`で駆動されるメインループを開始します。Node.jsには`requestAnimationFrame`がないため、メインループは実行されません。代わりに、必要なレートで[`app.update(dt)`](https://api.playcanvas.com/engine/classes/AppBase.html#update)を呼び出してください。これにより、スクリプト、アニメーション、物理など、登録したコンポーネントシステムが更新され、レンダリングは一切行われません。

```javascript
const TICK_RATE = 20; // 1秒あたりの更新回数

setInterval(() => {
    app.update(1 / TICK_RATE);
}, 1000 / TICK_RATE);
```

固定の`dt`を渡すと、タイマーにずれが生じても、すべての更新が同じ長さになります。

## スクリプトの追加 {#adding-scripts}

[ESMスクリプト](/user-manual/scripting/esm-scripts/)は標準的なJavaScriptモジュールであるため、Node.jsで直接インポートできます。たとえば、エンティティを回転させるスクリプトは次のとおりです。

```javascript title="rotate.mjs"
import { Script } from 'playcanvas';

export class Rotate extends Script {
    static scriptName = 'rotate';

    update(dt) {
        this.entity.rotate(0, 90 * dt, 0);
    }
}
```

スクリプトクラスをインポートし、スクリプトコンポーネントに渡します。

```javascript
import { Entity } from 'playcanvas';
import { Rotate } from './rotate.mjs';

const entity = new Entity('Box');
entity.addComponent('script');
entity.script.create(Rotate);
app.root.addChild(entity);
```

これで、`app.update(dt)`を呼び出すたびにスクリプトの`update`メソッドが実行されます。

## jsdomの使用 {#using-jsdom}

エンジンの一部は、Node.jsが提供していないDOM APIに依存しています。

* `<script>`要素でロードされるクラシックスクリプト
* `XMLHttpRequest`でファイルをリクエストする、アセットレジストリを通じたアセットのロード

これらのいずれかが必要な場合は、[`jsdom`](https://www.npmjs.com/package/jsdom)パッケージを使用してDOM環境をシミュレートできます。

```bash
npm install jsdom
```

次の関数は、`jsdom`を使用してDOM環境を設定し、PlayCanvas Engineが正常に実行できるようにします。

```javascript
import { JSDOM } from 'jsdom';
import * as pc from 'playcanvas';

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

アプリケーションを作成する前に`jsdomSetup()`を呼び出してください。アセットをロードするには、クラシックスクリプト用の`ScriptHandler`など、アセットの種類ごとのリソースハンドラーも`AppOptions`に登録してください。`jsdom`もメインループを提供しないため、上記のように`app.update(dt)`を呼び出し続けてください。

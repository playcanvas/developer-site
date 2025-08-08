---
title: Engineをスタンドアロンで使用する
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PlayCanvas Engineでアプリケーションを構築する際に、エディタを使用せずに構築することが可能です。Engineを直接使用して構築されたアプリケーションの例をいくつか示します。

* [glTF Viewer](https://playcanvas.com/viewer) \[[GitHub](https://github.com/playcanvas/model-viewer)\]
* [SuperSplat](https://playcanvas.com/supersplat/editor) \[[GitHub](https://github.com/playcanvas/supersplat)\]
* ...そしてもちろん、[PlayCanvas Editor](../../editor)そのものもです！

このページでは、開始方法を説明します。

:::note

始める前に、[Node.js](https://nodejs.org/)がインストールされていることを確認してください。

:::

プロジェクトをセットアップする際には、考慮すべき主要な2つのオプションがあります。

## オプション1: ビルドツールとNPM

これは、ほとんどの開発者に適した推奨されるセットアップです。

ビルドツールは、アプリケーションを幅広いブラウザで実行できる最適化されたパッケージにバンドルできます。[webpack](https://webpack.js.org/)、[Rollup](https://rollupjs.org/)、[esbuild](https://esbuild.github.io/)など、多くのビルドツールがあり、PlayCanvasはそれらすべてで動作します。ここでは、モダンなウェブプロジェクト向けに、より高速で無駄のない開発体験を提供することを目指す人気のビルドツールである[Vite](https://vitejs.dev/)を使用します。

まず、JavaScriptとTypeScriptのどちらで開発するかを選択します。

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

1. ターミナル/コマンドプロンプトを開き、アプリ用のフォルダを作成してその中に`cd`します。
2. `playcanvas`と`vite`をインストールします。

    ```sh
    npm install playcanvas vite --save-dev
    ```

3. `index.html`を作成し、これを貼り付けます。

    ```html title="index.html"
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <style>
                body { margin: 0; overflow: hidden; }
            </style>
        </head>
        <body>
            <script type="module" src="main.js"></script>
            <canvas id='application'></canvas>
        </body>
    </html>
    ```

4. `main.js`を作成し、これを貼り付けます。

    ```javascript title="main.js"
    import * as pc from 'playcanvas';

    // create an application
    // アプリケーションを作成します
    const canvas = document.getElementById('application');
    const app = new pc.Application(canvas);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.start();

    // create a camera
    // カメラを作成します
    const camera = new pc.Entity();
    camera.addComponent('camera', {
        clearColor: new pc.Color(0.3, 0.3, 0.7)
    });
    camera.setPosition(0, 0, 3);
    app.root.addChild(camera);

    // create a light
    // ライトを作成します
    const light = new pc.Entity();
    light.addComponent('light');
    light.setEulerAngles(45, 45, 0);
    app.root.addChild(light);

    // create a box
    // ボックスを作成します
    const box = new pc.Entity();
    box.addComponent('model', {
        type: 'box'
    });
    app.root.addChild(box);

    // rotate the box
    // ボックスを回転させます
    app.on('update', (dt) => box.rotate(10 * dt, 20 * dt, 30 * dt));
    ```

5. Vite開発サーバーを実行します。

    ```sh
    npx vite
    ```

    これにより、`http://localhost:5173`でサーバーが起動します。ブラウザでこのURLにアクセスすると、以下が表示されます。

    ![Spinning Cube](/img/user-manual/engine/standalone/spinning-cube.webp)

    :::tip

    ソースファイルを保存するたびに、タブが自動的に再読み込みされます。

    :::

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

1. ターミナル/コマンドプロンプトを開き、アプリ用のフォルダを作成してその中に`cd`します。
2. `playcanvas`と`vite`をインストールします。

    ```sh
    npm install playcanvas vite --save-dev
    ```

3. `index.html`を作成し、これを貼り付けます。

    ```html title="index.html"
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <style>
                body { margin: 0; overflow: hidden; }
            </style>
        </head>
        <body>
            <script type="module" src="main.ts"></script>
            <canvas id='application'></canvas>
        </body>
    </html>
    ```

4. `main.ts`を作成し、以下を貼り付けます。

    ```typescript title="main.ts"
    import * as pc from 'playcanvas';

    // アプリケーションを作成
    const canvas = document.getElementById('application') as HTMLCanvasElement;
    const app = new pc.Application(canvas);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.start();

    // カメラを作成
    const camera = new pc.Entity();
    camera.addComponent('camera', {
        clearColor: new pc.Color(0.3, 0.3, 0.7)
    });
    camera.setPosition(0, 0, 3);
    app.root.addChild(camera);

    // ライトを作成
    const light = new pc.Entity();
    light.addComponent('light');
    light.setEulerAngles(45, 45, 0);
    app.root.addChild(light);

    // ボックスを作成
    const box = new pc.Entity();
    box.addComponent('model', {
        type: 'box'
    });
    app.root.addChild(box);

    // ボックスを回転
    app.on('update', (dt: number) => box.rotate(10 * dt, 20 * dt, 30 * dt));
    ```

5. Vite開発サーバーを実行します。

    ```sh
    npx vite
    ```

    これにより、サーバーが`http://localhost:5173`で起動します。ブラウザでこのURLにアクセスすると、以下が表示されます。

    ![回転する立方体](/img/user-manual/engine/standalone/spinning-cube.webp)

    :::tip

    ソースファイルを保存するたびに、タブが自動的にリロードされます。

    :::

  </TabItem>
</Tabs>

## オプション2：インポートマップとCDN

[インポートマップ](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)は、JavaScriptモジュール内のモジュール指定子を解決できます。このインポートステートメントを考えてみましょう。

```javascript
import * as pc from 'playcanvas';
```

インポートマップは、「playcanvas」をブラウザによって動的にロードできるCDNでホストされたエンジンのビルドに解決できます。これは、オプション1で説明したビルド手順をスキップできることを意味します。

まず、JavaScriptとTypeScriptのどちらで開発するかを選択します。

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

1. Terminal/Command Promptを開き、アプリのフォルダを作成し、その中に`cd`します。
2. `index.html`を作成し、以下を貼り付けます。

    ```html title="index.html"
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <style>
                body { margin: 0; overflow: hidden; }
            </style>
            <script type="importmap">
            {
                "imports": {
                    "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas/+esm"
                }
            }
            </script>
        </head>
        <body>
            <script type="module" src="main.js"></script>
            <canvas id='application'></canvas>
        </body>
    </html>
    ```

3. `main.js`を作成し、以下を貼り付けます。

    ```javascript title="main.js"
    import * as pc from 'playcanvas';

    // アプリケーションを作成
    const canvas = document.getElementById('application');
    const app = new pc.Application(canvas);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.start();

    // カメラを作成
    const camera = new pc.Entity();
    camera.addComponent('camera', {
        clearColor: new pc.Color(0.3, 0.3, 0.7)
    });
    camera.setPosition(0, 0, 3);
    app.root.addChild(camera);

    // ライトを作成
    const light = new pc.Entity();
    light.addComponent('light');
    light.setEulerAngles(45, 45, 0);
    app.root.addChild(light);

    // ボックスを作成
    const box = new pc.Entity();
    box.addComponent('model', {
        type: 'box'
    });
    app.root.addChild(box);

    // ボックスを回転させる
    app.on('update', (dt) => box.rotate(10 * dt, 20 * dt, 30 * dt));
    ```

4. `serve` を実行します:

    ```sh
    npx serve
    ```

    これにより、`http://localhost:3000` でサーバーが起動します。ブラウザでこのURLにアクセスすると、次の表示が表示されます:

    ![回転するキューブ](/img/user-manual/engine/standalone/spinning-cube.webp)

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

1. ターミナル/コマンドプロンプトを開き、アプリ用のフォルダーを作成してその中に `cd` します。
2. `index.html` を作成し、これを貼り付けます:

    ```html title="index.html"
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <style>
                body { margin: 0; overflow: hidden; }
            </style>
            <script type="importmap">
            {
                "imports": {
                    "playcanvas": "https://cdn.jsdelivr.net/npm/playcanvas/+esm"
                }
            }
            </script>
        </head>
        <body>
            <script type="module" src="main.js"></script>
            <canvas id='application'></canvas>
        </body>
    </html>
    ```

3. `main.ts` を作成し、これを貼り付けます:

    ```javascript title="main.ts"
    import * as pc from 'playcanvas';

    // アプリケーションを作成します
    const canvas = document.getElementById('application') as HTMLCanvasElement;
    const app = new pc.Application(canvas);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.start();

    // カメラを作成します
    const camera = new pc.Entity();
    camera.addComponent('camera', {
        clearColor: new pc.Color(0.3, 0.3, 0.7)
    });
    camera.setPosition(0, 0, 3);
    app.root.addChild(camera);

    // ライトを作成します
    const light = new pc.Entity();
    light.addComponent('light');
    light.setEulerAngles(45, 45, 0);
    app.root.addChild(light);

    // ボックスを作成します
    const box = new pc.Entity();
    box.addComponent('model', {
        type: 'box'
    });
    app.root.addChild(box);

    // ボックスを回転させます
    app.on('update', (dt: number) => box.rotate(10 * dt, 20 * dt, 30 * dt));
    ```

4. `playcanvas` と `typescript` をインストールします:

    ```sh
    npm install playcanvas typescript --save-dev
    ```

5. `main.ts` を `main.js` にコンパイルします:

    ```sh
    npx tsc main.ts --lib esnext,dom --module esnext --moduleResolution node
    ```

6. `serve` を実行します:

    ```sh
    npx serve
    ```

    これにより、`http://localhost:3000` でサーバーが起動します。ブラウザでこのURLにアクセスすると、次の表示が表示されます:

    ![回転するキューブ](/img/user-manual/engine/standalone/spinning-cube.webp)

  </TabItem>
</Tabs>

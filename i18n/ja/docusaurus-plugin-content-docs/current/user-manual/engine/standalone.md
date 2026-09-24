---
title: Engineをスタンドアロンで使用する
description: Editorを使わず、npmとビルドツール、またはインポートマップとCDNでPlayCanvasアプリケーションを構築します。
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

:::tip[クイックスタート]

ViteとTypeScriptを使用するプロジェクトでは、公式の[`create-playcanvas`](/user-manual/getting-started/start-with-create-playcanvas/)ツールを実行してEngine形式を選択します。

```bash
npm create playcanvas@latest my-app -- -f engine
```

生成されたプロジェクトには、実行可能なスターターと、対応するAIコーディングエージェント向けの[PlayCanvas Skills](/user-manual/getting-started/use-playcanvas-skills/)が含まれます。

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
    npm install playcanvas
    npm install vite --save-dev
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

    // create a graphics device, preferring WebGPU over WebGL 2.0
    // WebGPUを優先してグラフィックスデバイスを作成します
    const canvas = document.getElementById('application');
    const device = await pc.createGraphicsDevice(canvas, {
        deviceTypes: [pc.DEVICETYPE_WEBGPU]
    });

    // create an application with the systems and handlers it uses
    // 使用するシステムとハンドラーを指定してアプリケーションを作成します
    const options = new pc.AppOptions();
    options.graphicsDevice = device;
    options.componentSystems = [
        pc.RenderComponentSystem,
        pc.CameraComponentSystem,
        pc.LightComponentSystem
    ];
    options.resourceHandlers = [
        pc.TextureHandler,
        pc.ContainerHandler
    ];

    const app = new pc.AppBase(canvas);
    app.init(options);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.start();

    // resize the canvas when the window is resized
    // ウィンドウのサイズが変わったらキャンバスのサイズを変更します
    window.addEventListener('resize', () => app.resizeCanvas());

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
    box.addComponent('render', {
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
    npm install playcanvas
    npm install vite --save-dev
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

    // WebGPUを優先してグラフィックスデバイスを作成
    const canvas = document.getElementById('application') as HTMLCanvasElement;
    const device = await pc.createGraphicsDevice(canvas, {
        deviceTypes: [pc.DEVICETYPE_WEBGPU]
    });

    // 使用するシステムとハンドラーを指定してアプリケーションを作成
    const options = new pc.AppOptions();
    options.graphicsDevice = device;
    options.componentSystems = [
        pc.RenderComponentSystem,
        pc.CameraComponentSystem,
        pc.LightComponentSystem
    ];
    options.resourceHandlers = [
        pc.TextureHandler,
        pc.ContainerHandler
    ];

    const app = new pc.AppBase(canvas);
    app.init(options);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.start();

    // ウィンドウのサイズが変わったらキャンバスのサイズを変更
    window.addEventListener('resize', () => app.resizeCanvas());

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
    box.addComponent('render', {
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

    // WebGPUを優先してグラフィックスデバイスを作成
    const canvas = document.getElementById('application');
    const device = await pc.createGraphicsDevice(canvas, {
        deviceTypes: [pc.DEVICETYPE_WEBGPU]
    });

    // 使用するシステムとハンドラーを指定してアプリケーションを作成
    const options = new pc.AppOptions();
    options.graphicsDevice = device;
    options.componentSystems = [
        pc.RenderComponentSystem,
        pc.CameraComponentSystem,
        pc.LightComponentSystem
    ];
    options.resourceHandlers = [
        pc.TextureHandler,
        pc.ContainerHandler
    ];

    const app = new pc.AppBase(canvas);
    app.init(options);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.start();

    // ウィンドウのサイズが変わったらキャンバスのサイズを変更
    window.addEventListener('resize', () => app.resizeCanvas());

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
    box.addComponent('render', {
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

    ```typescript title="main.ts"
    import * as pc from 'playcanvas';

    // WebGPUを優先してグラフィックスデバイスを作成します
    const canvas = document.getElementById('application') as HTMLCanvasElement;
    const device = await pc.createGraphicsDevice(canvas, {
        deviceTypes: [pc.DEVICETYPE_WEBGPU]
    });

    // 使用するシステムとハンドラーを指定してアプリケーションを作成します
    const options = new pc.AppOptions();
    options.graphicsDevice = device;
    options.componentSystems = [
        pc.RenderComponentSystem,
        pc.CameraComponentSystem,
        pc.LightComponentSystem
    ];
    options.resourceHandlers = [
        pc.TextureHandler,
        pc.ContainerHandler
    ];

    const app = new pc.AppBase(canvas);
    app.init(options);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.start();

    // ウィンドウのサイズが変わったらキャンバスのサイズを変更します
    window.addEventListener('resize', () => app.resizeCanvas());

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
    box.addComponent('render', {
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
    npx tsc main.ts --target es2022 --lib esnext,dom --module esnext --moduleResolution bundler --types webxr
    ```

6. `serve` を実行します:

    ```sh
    npx serve
    ```

    これにより、`http://localhost:3000` でサーバーが起動します。ブラウザでこのURLにアクセスすると、次の表示が表示されます:

    ![回転するキューブ](/img/user-manual/engine/standalone/spinning-cube.webp)

  </TabItem>
</Tabs>

## アプリケーションの構成 {#configuring-the-application}

サンプルは、2つの手順でアプリケーションを作成します。

1. [`createGraphicsDevice`](https://api.playcanvas.com/engine/functions/createGraphicsDevice.html)でグラフィックスデバイスを作成します。`deviceTypes`に`DEVICETYPE_WEBGPU`を指定するとWebGPUが要求され、WebGPUが利用できない場合、EngineはWebGL 2.0にフォールバックします。
2. アプリケーションが使用するコンポーネントシステムとリソースハンドラーを列挙した[`AppOptions`](https://api.playcanvas.com/engine/classes/AppOptions.html)オブジェクトで、[`AppBase`](https://api.playcanvas.com/engine/classes/AppBase.html)を初期化します。それ以外は登録されないため、ビルドツールは残りの部分をバンドルから除外できます。

アプリケーションの機能を増やすときは、必要なものを登録します。

* **コンポーネント**: コンポーネントの種類ごとに、そのコンポーネントシステムが必要です。たとえば、`script`コンポーネントを使用するには`pc.ScriptComponentSystem`を追加します。[`Application`のコンストラクター](https://api.playcanvas.com/engine/classes/Application.html#constructor)に、すべてのコンポーネントの種類とそのシステムが記載されています。システムが登録されていない場合、`addComponent`は`null`を返し、Engineのデバッグビルドはエラーをログに出力します。
* **アセット**: アセットの種類ごとに、そのリソースハンドラーが必要です。サンプルでは、テクスチャ用の`pc.TextureHandler`とGLBモデル用の`pc.ContainerHandler`を登録しています。
* **その他の機能**: サウンド、バッチ処理、ライトマップ、XRは、`AppOptions`の他のプロパティで有効にします。たとえば、`sound`コンポーネントには`options.soundManager = new pc.SoundManager()`も必要です。

:::note

[`Application`](https://api.playcanvas.com/engine/classes/Application.html)クラスは、これらをすべて自動的に設定します。ただし、コンストラクターではWebGPUデバイスを作成できず、すべてのコンポーネントシステムとリソースハンドラーがバンドルに含まれます。また、将来のリリースで非推奨になる予定です。

:::

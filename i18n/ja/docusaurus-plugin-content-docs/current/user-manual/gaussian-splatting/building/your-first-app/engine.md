---
title: Engine API の使用
---

[PlayCanvas Engine](/user-manual/engine) を直接使用して、シンプルなGaussian splatアプリケーションをステップバイステップで構築しましょう。回転させることができるインタラクティブな3Dおもちゃの猫のsplatがあるシーンを作成します。

## 開始点

2つのファイル、HTMLファイルとJavaScriptファイルでプロジェクトをセットアップしましょう。

まず、`index.html`ファイルを作成します。

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
    </body>
</html>
```

次に、基本的なPlayCanvasアプリケーション設定で`main.js`ファイルを作成します。

```javascript title="main.js"
import { Application, Asset, AssetListLoader, Entity, FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas';

// アプリケーションを作成
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const app = new Application(canvas, {
    graphicsDeviceOptions: {
        antialias: false
    }
});
app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
app.setCanvasResolution(RESOLUTION_AUTO);
app.start();

window.addEventListener('resize', () => app.resizeCanvas());
```

これは、[`Application`](https://api.playcanvas.com/engine/classes/Application.html)クラスを使用して、以下のキャンバスを持つ空の3Dシーンを作成します。

- ブラウザウィンドウ全体を埋めます (`FILLMODE_FILL_WINDOW`)
- デバイスのピクセル比率に基づいて解像度を自動的に調整します (`RESOLUTION_AUTO`)
- ウィンドウのサイズ変更時に適切にリサイズされます

まだ何もレンダリングされていませんが、アセットをロードし、カメラとコンテンツを追加する必要があります。

:::warning パフォーマンスの最適化

最適なsplatレンダリングパフォーマンスのために、グラフィックデバイスオプションで`antialias`を無効にしました。この設定は、Gaussian splatレンダリングにおける主要なボトルネックであるフラグメント処理の負荷を軽減するのに役立ちます。[パフォーマンス](../engine-features/performance.md)ガイドで詳細をご覧ください。

:::

## アセットのロード

splatを表示したり、カメラコントロールを追加したりする前に、アプリが使用するアセットをロードする必要があります。アセットを定義するために[`Asset`](https://api.playcanvas.com/engine/classes/Asset.html)クラスを、それらを効率的にロードするために[`AssetListLoader`](https://api.playcanvas.com/engine/classes/AssetListLoader.html)を使用します。コメントに「ここにコードをステップバイステップで追加します」とある`main.js`にこのコードを追加します。

```javascript
// アセットをロード
const assets = [
    new Asset('camera-controls', 'script', {
        url: 'https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs'
    }),
    new Asset('toy', 'gsplat', {
        url: 'https://developer.playcanvas.com/assets/toy-cat.sog'
    })
];

const loader = new AssetListLoader(assets, app.assets);
await new Promise(resolve => loader.load(resolve));
```

2つのアセットをロードしています：

- シーンの周りを軌道移動できるカメラコントロールスクリプト
- おもちゃの猫のsplatを含む`.sog`ファイル

[`AssetListLoader`](https://api.playcanvas.com/engine/classes/AssetListLoader.html)はすべてのアセットを効率的にロードし、`await`を使用して、続行する前にそれらが完全にロードされていることを確認します。

## カメラの追加

シーンを表示するには、[`Entity`](https://api.playcanvas.com/engine/classes/Entity.html)クラスを使用してカメラエンティティを作成し、それに[カメラコンポーネント](https://api.playcanvas.com/engine/classes/CameraComponent.html)を追加する必要があります。アセットのロード後に、このコードを`main.js`に追加します。

```javascript
// カメラエンティティを作成
const camera = new Entity('Camera');
camera.setPosition(0, 0, 2.5);
camera.addComponent('camera');
app.root.addChild(camera);
```

カメラをZ軸方向に2.5単位配置しました。デフォルトでは、カメラは負のZ軸方向を向くため、カメラはsplatを配置する原点方向を向いています。

## カメラコントロールの追加

[スクリプトコンポーネント](https://api.playcanvas.com/engine/classes/ScriptComponent.html)を使用してカメラコントロールスクリプトをアタッチし、カメラをインタラクティブにしましょう。カメラの作成後に、このコードを`main.js`に追加します。

```javascript
// カメラコントロールを追加
camera.addComponent('script');
camera.script.create('cameraControls');
```

[`AssetListLoader`](https://api.playcanvas.com/engine/classes/AssetListLoader.html)を使用してカメラコントロールスクリプトをすでにロードしているため、直接スクリプトコンポーネントを作成できます。カメラコントロールを使用すると、次のことができます：

- **マウス左ドラッグ**: ターゲットの周りを軌道移動
- **マウス右ドラッグ**: カメラをパン
- **マウスホイール**: ズームイン/ズームアウト

## Splatの追加

[gsplatコンポーネント](https://api.playcanvas.com/engine/classes/GSplatComponent.html)を使用して、おもちゃの猫のsplatをシーンに追加しましょう。カメラコントロールの後、このコードを`main.js`に追加します。

```javascript
// splatエンティティを作成
const splat = new Entity('Toy Cat');
splat.setPosition(0, -0.7, 0);
splat.setEulerAngles(0, 0, 180);
splat.addComponent('gsplat', { asset: assets[1] });
app.root.addChild(splat);
```

`assets[1]`（配列内の2番目のアセット）を使用してsplatアセットを参照します。splatを原点よりわずかに下（Y軸で-0.7）に配置し、Z軸周りに180度回転させて適切に配置しました。

## 完全なコード

上記の手順のすべてのコードを含む完成したファイルは次のとおりです：

**index.html:**

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
    </body>
</html>
```

**main.js:**

```javascript title="main.js"
import { Application, Asset, AssetListLoader, Entity, FILLMODE_FILL_WINDOW, RESOLUTION_AUTO } from 'playcanvas';

// アプリケーションを作成
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const app = new Application(canvas, {
    graphicsDeviceOptions: {
        antialias: false
    }
});
app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
app.setCanvasResolution(RESOLUTION_AUTO);
app.start();

window.addEventListener('resize', () => app.resizeCanvas());

// アセットをロード
const assets = [
    new Asset('camera-controls', 'script', {
        url: 'https://cdn.jsdelivr.net/npm/playcanvas/scripts/esm/camera-controls.mjs'
    }),
    new Asset('toy', 'gsplat', {
        url: 'https://developer.playcanvas.com/assets/toy-cat.sog'
    })
];

const loader = new AssetListLoader(assets, app.assets);
await new Promise(resolve => loader.load(resolve));

// カメラエンティティを作成
const camera = new Entity('Camera');
camera.setPosition(0, 0, 2.5);
camera.addComponent('camera');
camera.addComponent('script');
camera.script.create('cameraControls');
app.root.addChild(camera);

// splatエンティティを作成
const splat = new Entity('Toy Cat');
splat.setPosition(0, -0.7, 0);
splat.setEulerAngles(0, 0, 180);
splat.addComponent('gsplat', { asset: assets[1] });
app.root.addChild(splat);
```

## 最終結果

上記の手順を完了すると、軌道移動、パン、ズームができるインタラクティブな3Dおもちゃの猫のsplatが表示されるはずです！

import CodePenEmbed from '@site/src/components/CodePenEmbed';

<CodePenEmbed id="LEpRPbj" defaultTab="js" title="PlayCanvas Engine: 最初の Splat" />

:::tip 自分で試してみましょう

上記の2つのファイル（`index.html`と`main.js`）を同じディレクトリに作成し、ブラウザで`index.html`を開いて、最初のsplatアプリが動作するのを見てみましょう！その後、PlayCanvas Engineの全機能を使用して、好きなように拡張してください！

:::

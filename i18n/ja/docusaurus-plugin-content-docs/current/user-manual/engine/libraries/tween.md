---
title: トゥイーン
description: playcanvas-tweenライブラリで、エンティティのトランスフォームやその他の値を時間経過でアニメートします。手動のlerpの代わりに、イージングカーブ、ループ、ヨーヨー、チェーン、イベントを使えます。
---

エンティティや任意の値を、ある状態から別の状態へ時間をかけてアニメートしたいことはよくあります。これはトゥイーンと呼ばれます。[playcanvas-tween](https://github.com/playcanvas/playcanvas-tween) は、イージングカーブ、ループ、ヨーヨー、イベントを備えたPlayCanvas用のトゥイーンライブラリです。

## インストール

ライブラリには2つのビルドがあり、リポジトリの [distフォルダー](https://github.com/playcanvas/playcanvas-tween/tree/main/dist) にあります:

- `tween.umd.js` - クラシックスクリプトです。エディターのプロジェクトにスクリプトアセットとして追加すると、エンティティとアプリケーションに `tween()` メソッドが追加されます。ライブラリを読み込んだ後にアプリケーションを作成する場合は、`app.addTweenManager()` を呼び出してトゥイーンを有効にしてください。
- `tween.mjs` - ESスクリプトやエンジンのみのプロジェクト向けのESモジュールです。`tweenEntity()` を使うか、`addTweenExtensions()` を一度呼び出して、エンティティとアプリケーションに `tween()` メソッドを追加します:

```javascript
import * as pc from 'playcanvas';
import { addTweenExtensions, SineOut } from './tween.mjs';

// エンティティとアプリケーションにtween()を追加する
addTweenExtensions(pc);

entity.tween(entity.getLocalPosition()).to({ x: 10, y: 0, z: 0 }, 1, SineOut).start();
```

## エンティティのトゥイーン

`entity.tween()` にはアニメートする値を、`to()` には目標の値、秒単位の長さ、イージングカーブを渡します。次の例は、エンティティのローカル位置を往復させ続けます:

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/wEftzstB/" title="Tween Local Position" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

```javascript
this.entity
    .tween(this.entity.getLocalPosition())
    .to(new Vec3(4, 0, 0), 1.0, SineOut)
    .loop(true)
    .yoyo(true)
    .start();
```

回転には、`to()` の代わりに `rotate()` を使います。オイラー角を受け取ってクォータニオンで補間するか、クォータニオンを受け取ります:

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/H8553dGa/" title="Tween Local Rotation" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

```javascript
this.entity
    .tween(this.entity.getLocalEulerAngles())
    .rotate(new Vec3(180, 0, 180), 1.0, Linear)
    .loop(true)
    .yoyo(true)
    .start();
```

スケールは位置と同じように扱えます:

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/ndTiHCpD/" title="Tween Local Scale" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

```javascript
this.entity
    .tween(this.entity.getLocalScale())
    .to(new Vec3(3, 3, 3), 1.0, SineOut)
    .loop(true)
    .yoyo(true)
    .start();
```

## その他の値のトゥイーン

`app.tween()` は、色など任意のオブジェクトをトゥイーンします。目標とオブジェクトに共通するプロパティがトゥイーンされ、`onUpdate()` で変化する値を適用します:

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/aoRYsYrc/" title="Tween Material Color" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

```javascript
const color = new Color(0, 0, 0);
const material = this.entity.render.material;
this.app
    .tween(color)
    .to(new Color(1, 1, 1), 1.0, Linear)
    .loop(true)
    .yoyo(true)
    .onUpdate(() => {
        material.diffuse = color;
        material.update();
    })
    .start();
```

上のデモは [Using the Tween library](https://playcanvas.com/project/452634/overview/using-the-tween-library) プロジェクトにあります。

## トゥイーンの制御

トゥイーンのメソッドはチェーンできます:

| メソッド | 説明 |
| --- | --- |
| `start()`、`stop()` | トゥイーンを開始、停止します。 |
| `pause()`、`resume()` | トゥイーンを一時停止、再開します。 |
| `delay(seconds)` | トゥイーンの開始を遅らせます。 |
| `repeat(count)` | トゥイーンを `count` 回再生します。 |
| `loop(true)` | トゥイーンを永久に再生します。 |
| `yoyo(true)` | 順方向に再生するたびに、逆方向にも再生します。逆方向の再生を見るには、`repeat` または `loop` と組み合わせてください。 |
| `reverse()` | トゥイーンを反転します。 |

トゥイーンの再生中には、次のコールバックが呼び出されます:

| コールバック | 説明 |
| --- | --- |
| `onUpdate(callback)` | 毎回の更新時に、タイムステップとともに呼び出されます。 |
| `onComplete(callback)` | トゥイーンが終了したときに呼び出されます。 |
| `onLoop(callback)` | ループするトゥイーンが1サイクルを終えるたびに、`onComplete` の代わりに呼び出されます。 |

## イージング

イージングカーブは、開始値と目標値の間で値がどのように変化するかを決めます。ライブラリには `Linear` と、`Quadratic`、`Cubic`、`Quartic`、`Quintic`、`Sine`、`Exponential`、`Circular`、`Back`、`Bounce`、`Elastic` のそれぞれの `In`、`Out`、`InOut` があり、たとえば `SineOut` や `ElasticInOut` のように使います。

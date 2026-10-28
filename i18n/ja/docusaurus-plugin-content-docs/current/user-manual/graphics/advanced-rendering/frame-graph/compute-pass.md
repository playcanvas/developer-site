---
title: コンピュートパス
description: "ComputePass はフレーム内の特定の位置でコンピュートシェーダーをディスパッチします：カメラへの追加、シーンマップに合わせたディスパッチサイズの設定、結果のリードバック、XR ビュー。"
---

[`ComputePass`](https://api.playcanvas.com/engine/classes/ComputePass.html) は、[コンピュート](/user-manual/graphics/shaders/compute-shaders/)インスタンスのリストを、1 つの物理コンピュートパス内で順番にディスパッチする[フレームパス](frame-passes.md)です。コンピュート処理をフレーム内の特定の位置に配置します。たとえばカメラのレンダリング後に配置して、同じフレーム内でカメラのシーン深度マップとシーンカラーマップを処理します。

代わりに、呼び出した時点でコンピュートインスタンスをすぐにディスパッチするには、[`GraphicsDevice#computeDispatch`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#computedispatch) を使用します。

:::warning

コンピュートシェーダーは **WebGPU** でのみサポートされています。[`GraphicsDevice#supportsCompute`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#supportscompute) を参照してください。その他のデバイスでは、パスは何もディスパッチせずに実行されます。

:::

## パスの作成 {#creating-the-pass}

ディスパッチするコンピュートインスタンスを指定してパスを作成します。インスタンスはパスの [`computes`](https://api.playcanvas.com/engine/classes/ComputePass.html#computes) 配列に保持され、後からインスタンスを追加したり削除したりできます。パスには名前を設定します。名前は GPU プロファイリングでディスパッチのラベルになります。

```javascript
const compute = new Compute(app.graphicsDevice, shader, 'Histogram');
compute.setParameter('bins', histogramBuffer);

const pass = new ComputePass(app.graphicsDevice, [compute]);
pass.name = 'HistogramPass';
```

## フレームへのパスの追加 {#adding-the-pass-to-a-frame}

カメラのレンダリング前またはレンダリング後にディスパッチするには、パスをカメラの [`beforePasses`](https://api.playcanvas.com/engine/classes/CameraComponent.html#beforepasses) または [`afterPasses`](https://api.playcanvas.com/engine/classes/CameraComponent.html#afterpasses) に追加します。別のパスの 前のパスまたは 後のパスに追加することもできます。独自の [`framePasses`](camera-passes.md#replacing-the-cameras-rendering) でレンダリングするカメラでは、パスをその中に含めて、リスト内の位置でディスパッチすることもできます。たとえば、シーンをテクスチャにレンダリングするパスと、コンピュートシェーダーが書き込んだ内容を使用するパスの間です。カメラの 後のパスにあるパスは、同じフレームでカメラがレンダリングした内容を読み取ります。

```javascript
cameraEntity.camera.afterPasses.push(pass);
```

パスは 1 フレームに最大 1 回実行されます。

## カメラがレンダリングした内容の読み取り {#reading-what-the-camera-rendered}

カメラの 後のパスにあるコンピュートパスは、同じフレームでカメラがレンダリングした深度マップとカラーマップを読み取れます。[`requestSceneDepthMap`](https://api.playcanvas.com/engine/classes/CameraComponent.html#requestscenedepthmap) と [`requestSceneColorMap`](https://api.playcanvas.com/engine/classes/CameraComponent.html#requestscenecolormap) でカメラにマップを要求し、[`setSceneDepthMap`](https://api.playcanvas.com/engine/classes/Compute.html#setscenedepthmap) と [`setSceneColorMap`](https://api.playcanvas.com/engine/classes/Compute.html#setscenecolormap) でコンピュートインスタンスにアタッチします。

```javascript
cameraEntity.camera.requestSceneColorMap(true);
compute.setSceneColorMap(cameraEntity.camera.sceneColorMapHandle);
```

`CameraFrame` でレンダリングするカメラでのマップの要求方法と、コンピュートシェーダーでの読み取り方法については、[シーン深度マップとカラーマップ](/user-manual/graphics/shaders/compute-shaders/#scene-depth-and-color-maps)を参照してください。

## ディスパッチ {#the-dispatch}

各コンピュートインスタンスは、そのインスタンスに設定されたディスパッチサイズとパラメーターでディスパッチされます。これらはフレームのレンダリング前か、ディスパッチ直前の [`onBefore`](https://api.playcanvas.com/engine/classes/FramePass.html#onbefore) で設定します。`onBefore` は、シェーダーが書き込むバッファの準備（たとえばクリア）にも使用します。

[前述のとおり](#reading-what-the-camera-rendered)アタッチした、カメラのシーンカラーマップの各テクセルを処理するシェーダーは、カラーマップのサイズでディスパッチされます。そのハンドルは、カメラが最後にレンダリングしたマップのサイズを持ちます。このサイズは、カメラがレンダースケールでレンダリングする場合や、独自のレンダーターゲットにレンダリングする場合は、キャンバスのサイズとは異なります。深度マップのハンドルも同じ [`width`](https://api.playcanvas.com/engine/classes/SceneDepthMapHandle.html#width) と [`height`](https://api.playcanvas.com/engine/classes/SceneDepthMapHandle.html#height) を持ちます。

```javascript
pass.onBefore = () => {
    // カメラが直前にレンダリングしたカラーマップのテクセルごとに 1 スレッド
    const { width, height } = cameraEntity.camera.sceneColorMapHandle;
    compute.setupDispatchThreads(width, height);
    histogramBuffer.clear();
};
```

## 結果のリードバック {#reading-the-results-back}

結果は [`onAfter`](https://api.playcanvas.com/engine/classes/FramePass.html#onafter) で読み取ります。そこで要求した読み取りは、ディスパッチの直後に記録されるためです。データは数フレーム後に届きます。

```javascript
pass.onAfter = () => {
    histogramBuffer.read().then((data) => {
        // 計算から数フレーム後に届くヒストグラム
    });
};
```

## XR ビュー {#xr-views}

フレームが複数の XR ビューをレンダリングする場合、[`xrViewIndex`](https://api.playcanvas.com/engine/classes/ComputePass.html#xrviewindex) はパスを実行するビューを選択し、パスはそのビュー内の自身の位置で実行されます。すべてのビューの前に 1 回だけ実行するには `-1` を使用します。コンピュートインスタンスは 1 フレームに最大 1 回しかディスパッチされないため、複数のビューに対してディスパッチするには、ビューごとに別々のコンピュートインスタンスを持つ `ComputePass` が必要です。カメラの 後のパスにあるパスは、すべてのビューの後に 1 回実行されます。

## パスの所有 {#owning-the-pass}

パスはコンピュートインスタンスを破棄せず、カメラもパスを破棄しません。不要になったら、パスを削除してから、パスとコンピュートインスタンスを破棄します。

```javascript
const passes = cameraEntity.camera.afterPasses;
passes.splice(passes.indexOf(pass), 1);
pass.destroy();
compute.destroy();
```

## 例 {#examples}

カメラの後に実行されるコンピュートパスが、カメラがレンダリングした色のヒストグラムを作成し、それがリードバックされて画面に描画されます。

<EngineExample id="compute/histogram" title="Histogram" />

カメラの後に実行されるコンピュートパスが、カメラのシーン深度マップとシーンカラーマップを読み取り、シーンを走査するスキャナーパルスを描画します。

<EngineExample id="compute/scene-maps" title="Scene Maps" />

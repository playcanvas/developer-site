---
title: シーンのレンダリング
description: "RenderPassForward はカメラでシーンのレイヤーをレンダリングします：パスの作成、レイヤーの追加、毎フレームの処理内容、カメラのレンダリングを独自のパスで置き換える方法。"
---

[`RenderPassForward`](https://api.playcanvas.com/engine/classes/RenderPassForward.html) は、1 つのカメラでシーンのレイヤーをレンダリングする [`RenderPass`](render-pass.md) です。エンジンがシーンのレンダリングに使用するパスでもあります。カメラの [`framePasses`](https://api.playcanvas.com/engine/classes/CameraComponent.html#framepasses) で使用すると、シーンを独自のレンダーターゲットにレンダリングし、表示される前に独自のパスで処理できます。

## パスの作成 {#creating-the-pass}

グラフィックスデバイス、シーン、レイヤーをレンダリングするカメラコンポーネントを指定してパスを作成します。レンダリング先のレンダーターゲットで初期化し、レンダリングするレイヤーを順番に追加します。

```javascript
const worldLayer = app.scene.layers.getLayerByName('World');
const uiLayer = app.scene.layers.getLayerById(LAYERID_UI);

const scenePass = new RenderPassForward(app.graphicsDevice, app.scene, cameraEntity.camera);
scenePass.name = 'ScenePass';
scenePass.init(renderTarget);

scenePass.addLayer(worldLayer, false);
scenePass.addLayer(uiLayer, true);
```

各レイヤーには、不透明と透明のサブレイヤーがあります。[`addLayer`](https://api.playcanvas.com/engine/classes/RenderPassForward.html#addlayer) の 2 番目の引数でどちらをレンダリングするかを選択するため、両方をレンダリングするにはレイヤーを 2 回追加します。パスがレンダリングするレイヤーは、カメラもレンダリングする必要があります。[`CameraComponent#layers`](https://api.playcanvas.com/engine/classes/CameraComponent.html#layers) を参照してください。

## パスが毎フレーム行うこと {#what-the-pass-does-each-frame}

パスは、カメラがレイヤーをレンダリングするのと同じ方法でレイヤーをレンダリングします。

- カメラとレイヤーのクリアフラグの要求に従って、レンダーターゲットをクリアします。そのレイヤーでクリアしないようにするには、`addLayer` の 3 番目の引数に `false` を渡します。
- カメラに対してレイヤーのメッシュインスタンスをカリングし、それらに必要なディレクショナルシャドウをレンダリングします。
- フレーム内でそのカメラをレンダリングする最初のパスである場合、カメラの [`beforePasses`](https://api.playcanvas.com/engine/classes/CameraComponent.html#beforepasses) をレンダリングします。
- フレーム内でそのカメラをレンダリングする最初のパスからシーンの `prerender` イベントを、最後のパスから `postrender` を発火し、レンダリングする各レイヤーの前後で `prerender:layer` と `postrender:layer` を発火します。

## ガンマ補正とトーンマッピング {#gamma-correction-and-tone-mapping}

デフォルトでは、パスはカメラのガンマ補正とトーンマッピングでレンダリングします。パスは [`gammaCorrection`](https://api.playcanvas.com/engine/classes/RenderPassForward.html#gammacorrection) と [`toneMapping`](https://api.playcanvas.com/engine/classes/RenderPassForward.html#tonemapping) でこれらを上書きできます。たとえば HDR パイプラインでは、シーンを浮動小数点のレンダーターゲットにリニアでレンダリングし、後続のパスでトーンマッピングします。一方、UI を画面にレンダリングするパスはカメラの設定を維持します。

```javascript
scenePass.gammaCorrection = GAMMA_NONE;
scenePass.toneMapping = TONEMAP_LINEAR;
```

## カメラのレンダリングの置き換え {#replacing-the-cameras-rendering}

独自のパスでカメラをレンダリングするには、カメラの [`framePasses`](camera-passes.md#replacing-the-cameras-rendering) に `RenderPassForward` を追加し、それがレンダリングした内容を処理するパスも一緒に追加します。たとえば、シーンをテクスチャにレンダリングし、そのテクスチャを[シェーダークアッドパス](render-pass-shader-quad.md)で画面に描画します。カメラは複数のフォワードパスでレイヤーをレンダリングすることもできます。たとえば、まず不透明レイヤーをレンダリングし、次にそれらがレンダリングした内容を読み取る独自のパスを実行し、その後に透明レイヤーをレンダリングします。[カメラパス](camera-passes.md)を参照してください。

## 制限事項 {#limitations}

`RenderPassForward` を別の `RenderPassForward` の下にネストすることはできません。つまり、その 前のパスや 後のパス、あるいはパスが自身より前にレンダリングするカメラの `beforePasses` に入れることはできません。別のカメラで先にレイヤーをレンダリングするには、パスを順番にレンダリングします。たとえば、`framePasses` 内の通常の `FramePass` の 前のパスとしてレンダリングするか、優先度の低いカメラでレンダリングします。

## 例 {#example}

フォワードパスが World レイヤーと UI レイヤーをテクスチャにレンダリングし、シェーダークアッドパスがそのテクスチャに色味を付けて画面に描画します。

<EngineExample id="render-targets/render-pass-camera" title="Render Pass Camera" />

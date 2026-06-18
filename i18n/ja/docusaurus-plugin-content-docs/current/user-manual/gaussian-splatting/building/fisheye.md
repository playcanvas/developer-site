---
title: 魚眼レンダリング
description: "Gaussian スプラットと無限スカイボックスに魚眼プロジェクションを適用し、超広角の視野や「タイニープラネット」効果を実現します。"
---

PlayCanvas は、Gaussian スプラットと無限スカイボックスに対する魚眼（樽型歪み）プロジェクションをサポートしています。これにより、超広角の視野、没入感のある 360° ビュー、そしてスタイライズされた「タイニープラネット」効果をレンダリングできます。通常のメッシュや UI は標準のレクティリニア（直線）プロジェクションのままレンダリングされます。

![強い魚眼プロジェクションでレンダリングされた Gaussian スプラットシーン](pathname:///img/user-manual/gaussian-splatting/fisheye-ultra-wide.png)

**ライブデモを見る** - 設定パネルを開き、`fisheye` スライダーを `0` から `1` までドラッグしてください。`cameraFov` を高い値にしたり、異なる HDRI 環境と組み合わせたりして、スカイドームやタイニープラネットの見た目を再現してみてください。

<EngineExample id="gaussian-splatting/lod-streaming" title="ライブデモを見る" />

## 概要

この効果は 2 つのシンプルな `[0, 1]` スライダーで制御されます：

- [`Scene.gsplat.fisheye`](https://api.playcanvas.com/engine/classes/GSplatParams.html#fisheye) — Gaussian スプラットのレンダリングを歪ませます。
- [`Sky.fisheye`](https://api.playcanvas.com/engine/classes/Sky.html#fisheye) — 無限スカイボックスを歪ませます。

`0` のときは標準のパースペクティブビューです。値を大きくするほど樽型歪みが強くなり、実効的な視野が広がります。両方のスライダーを同じ値に設定すると、スプラットと空が同じプロジェクションを共有し、シームレスな広角ルックが得られます。

:::warning

魚眼は Gaussian スプラットと無限の空にのみ影響します。シーン内の他のオブジェクト（メッシュ、スプライト、UI など）はカメラの標準パースペクティブプロジェクションを使用し続け、歪み**ません**。通常のメッシュへの魚眼歪みの適用は現時点ではサポートされていません。

実際上、これは魚眼がスプラットと空が中心のシーンに最も適していることを意味します。通常のメッシュを魚眼ビューに混在させると、歪んでいないメッシュと歪んだスプラットの間で見た目の不一致が発生し、幾何学的に位置が合わなくなります。

:::

## 要件と制限

- **パースペクティブカメラ専用**: 正射投影では効果がありません。
- **スカイボックス**: `Sky.fisheye` は `SKYTYPE_INFINITE` の空にのみ適用されます。ドームタイプやボックスタイプの空には影響しません。
- **初回のシェーダーコンパイル**: 魚眼を初めて有効にしたときには、新しいシェーダーバリアントがコンパイルされます（1 回だけの小さなコスト）。その後、`0` と非ゼロ値の切り替えは即座に行われます。
- **ソート**: 魚眼を使用する際は、[`Scene.gsplat.radialSorting`](https://api.playcanvas.com/engine/classes/GSplatParams.html#radialsorting) を有効にすることをお勧めします。視野が非常に広い場合、デフォルトのデプスソートでは目に見えるアーティファクトが発生する可能性があり、ラジアルソートがそれを回避します。

## 基本的な使い方

スプラットと空の両方で魚眼を有効にして一致させます：

```javascript
// 適度な魚眼効果を適用（0 = オフ、1 = 最大歪み）
app.scene.gsplat.fisheye = 0.5;
app.scene.sky.fisheye = 0.5;

// 魚眼使用時のスプラットソートアーティファクトを回避するために推奨
app.scene.gsplat.radialSorting = true;
```

無効にするには、両方を `0` に戻します：

```javascript
app.scene.gsplat.fisheye = 0;
app.scene.sky.fisheye = 0;
```

## 効果のレシピ

### 超広角視野

少量の魚眼と高いカメラ FOV を組み合わせると、自然な広角レンズの見た目が得られます。アクションカメラ、VR スタイルのプレビュー、または標準のパースペクティブカメラでは狭く感じる映画的な屋内ショットに便利です。

```javascript
camera.camera.fov = 120;
app.scene.gsplat.fisheye = 0.3;
app.scene.sky.fisheye = 0.3;
```

### 魚眼スカイドーム

魚眼の値を高くすると、無限スカイボックスがドーム状の投影に変わります。環境プレビューや HDRI の確認に最適です。

```javascript
camera.camera.fov = 140;
app.scene.gsplat.fisheye = 0.8;
app.scene.sky.fisheye = 0.8;
```

### タイニープラネット

`fisheye = 1` と広い FOV を組み合わせると、カメラを下向きに傾けたときに、プロジェクションが十分にタイトに包み込まれ、クラシックな「タイニープラネット」の見た目が得られます。

```javascript
camera.camera.fov = 320;
app.scene.gsplat.fisheye = 1;
app.scene.sky.fisheye = 1;
```

## 関連項目

- [Scene.gsplat API](https://api.playcanvas.com/engine/classes/Scene.html#gsplat)
- [Sky API](https://api.playcanvas.com/engine/classes/Sky.html)
- [スプラットレンダリングアーキテクチャ](/user-manual/gaussian-splatting/rendering-architecture)
- [パフォーマンス](/user-manual/gaussian-splatting/building/performance)

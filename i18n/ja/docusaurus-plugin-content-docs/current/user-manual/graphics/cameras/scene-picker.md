---
title: シーンピッカー
description: Picker API で画面座標からメッシュとスプラットを選択し、非同期読み取りと、任意で深度に基づくワールド座標を取得します。
---

`Picker` クラスは、画面をクリックまたはタッチした座標からメッシュインスタンスを選択する手段を提供します。カメラの視点からシーンをオフスクリーンバッファに一意の ID カラーでレンダリングすることで、クリックしたオブジェクトを効率よく識別します。Picker は通常のメッシュと Gaussian Splats の両方をサポートし、WebGL2 と WebGPU のバックエンドで動作します。

## 基本的な使い方

Picker を作成するには、Application、希望する解像度、および任意で深度ピッキングの有効化を指定してインスタンス化します。

```javascript
const picker = new pc.Picker(app, width, height, depth);
```

基本的なワークフローは次の 3 ステップです。

1. **準備** — [`prepare(camera, scene, layers)`](https://api.playcanvas.com/engine/classes/Picker.html#prepare) を呼び出してピック用バッファをレンダリングします。フレームごとに 1 回、またはカメラやシーンが変わったときだけ実行します。
2. **リサイズ** — 必要に応じて [`resize(width, height)`](https://api.playcanvas.com/engine/classes/Picker.html#resize) で Picker の解像度を調整します。
3. **クエリ** — [`getSelectionAsync(x, y, width, height)`](https://api.playcanvas.com/engine/classes/Picker.html#getSelectionAsync) で、ピックされたメッシュインスタンスを非同期に取得します。

Picker は GPU からピクセルデータを読み取る際にメインスレッドをブロックしない非同期 API を使うため、ピッキング時もスムーズなフレームレートを維持できます。Picker の使用が終わったら [`destroy()`](https://api.playcanvas.com/engine/classes/Picker.html#destroy) を呼び出して GPU リソースを解放してください。

API の詳細は [Picker API リファレンス](https://api.playcanvas.com/engine/classes/Picker.html)を参照してください。

## 深度のサポート

既定では、Picker はメッシュインスタンス ID のみを取得します。ただし、コンストラクタの第 4 引数に `true` を渡すと深度ピッキングを有効にできます。

```javascript
const picker = new pc.Picker(app, width, height, true);
```

深度ピッキングが有効な場合、Picker はメッシュ ID とともに深度値を取得します。この追加情報により、オブジェクト表面のクリック位置の正確な 3D ワールド座標を計算でき、オブジェクトの配置、距離の計測、エディタツールの作成などに役立ちます。

## ワールド座標のピッキング

深度ピッキングが有効な場合、[`getWorldPointAsync(x, y)`](https://api.playcanvas.com/engine/classes/Picker.html#getWorldPointAsync) で画面座標における 3D ワールド位置を取得できます。

```javascript
picker.getWorldPointAsync(x, y).then((worldPoint) => {
    if (worldPoint) {
        // worldPoint is a Vec3 in world space
        console.log('Clicked at:', worldPoint);
    } else {
        // No object was clicked (background)
        console.log('Clicked on empty space');
    }
});
```

このメソッドは、ワールド位置を含む `Vec3` で解決する Promise、またはオブジェクトがクリックされなかった場合は `null` を返します。透視投影と正投影の両方のカメラで正しく動作します。

## パフォーマンスの考慮

Picker のパフォーマンスは、次のように最適化できます。

**低解像度**：ピック用バッファを画面解像度より小さくレンダリングすると、パフォーマンスが大きく向上します。例として、画面解像度の 0.25 倍を使う場合：

```javascript
const pickerScale = 0.25;
const picker = new pc.Picker(
    app,
    canvas.width * pickerScale,
    canvas.height * pickerScale,
    true
);
```

トレードオフとして精度が下がり、解像度が低いと非常に小さなオブジェクトは拾えないことがあります。

**非同期読み取り**：Picker の非同期 API により、GPU からピクセルデータを読み取る間もメインスレッドをブロックせず、スムーズなフレームレートを維持できます。

**選択的な更新**：`prepare()` は必要なときだけ呼び出します。カメラとオブジェクトが静的なら、以前レンダリングしたピック用バッファを再利用し、再度 `prepare()` を呼ばなくても構いません。

## Gaussian Splatting のサポート

Picker は通常のメッシュと同じ API で Gaussian Splat インスタンスを完全にサポートします。メッシュインスタンス ID でスプラットインスタンスをピックでき、深度を有効にすればスプラット表面の正確な 3D 位置も求められます。

これにより、スプラット上にマーカーを置く、距離を測る、複雑なシーンで個々のスプラット Entity を選択するなどのインタラクティブな用途が可能になります。完全なデモは Gaussian Splatting Picking の例を参照してください。

<EngineExample id="gaussian-splatting/picking" title="Gaussian Splatting Picking の例" />

## 例

次の Engine の例で Picker の動作を確認できます。

- **Area Picker** — 矩形の画面領域でメッシュインスタンスをピックし、視覚的フィードバックを表示します。

<EngineExample id="graphics/area-picker" title="Area Picker" />

- **Gaussian Splatting Picking** — スプラットインスタンスのピッキングと、ワールド位置ピッキングでスプラット表面にマーカーを置く方法を示します。

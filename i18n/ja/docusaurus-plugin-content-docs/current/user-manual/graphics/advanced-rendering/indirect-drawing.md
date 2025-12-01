---
title: 間接描画
---

間接描画は、描画呼び出しのパラメーター(頂点数、インスタンス数など)がCPUによって直接指定されるのではなく、GPUバッファメモリに格納されるGPU駆動のレンダリング手法です。これにより、コンピュートシェーダーがレンダリングパラメーターを動的に生成または変更できるようになり、より効率的なGPU駆動のレンダリングワークフローが可能になります。

この機能は現在、**WebGPUでのみサポートされています** ([`GraphicsDevice.isWebGPU`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#iswebgpu)を使用してWebGPUの利用可能性を確認できます) 。他のプラットフォームでは無視されます。

## 間接描画の仕組み

従来のレンダリングでは、CPUが各描画呼び出しについて頂点数やインスタンス数などの描画パラメーターを指定します。間接描画では、これらのパラメーターはGPUバッファに格納され、GPUがレンダリング中にそれらを読み取ります。これにより以下が可能になります:

- **GPU駆動のカリング**: コンピュートシェーダーがどのオブジェクトをレンダリングするかを決定できます
- **動的インスタンス数**: プロシージャルに描画するインスタンス数を制御できます
- **CPUオーバーヘッドの削減**: CPU-GPU同期が減少します
- **複雑なレンダリング効果**: GPU駆動のLOD選択などの高度な手法を可能にします

## 基本的な使用法

### 間接描画の設定

間接描画では、間接描画バッファにスロットを割り当て、それをメッシュインスタンスに割り当てる必要があります。**重要**: スロットはフレームごとに新しく割り当てる必要があります:

```javascript
// フレームごとに新しいスロットを取得する
const indirectSlot = app.graphicsDevice.getIndirectDrawSlot();

// 間接レンダリングを使用するようにメッシュインスタンスを設定する
// 最初のパラメーター: カメラコンポーネント (すべてのカメラの場合はnull)
// 2番目のパラメーター: 割り当てられたスロット
meshInstance.setIndirect(null, indirectSlot);
```

### バッファサイズの設定

フレームごとの間接描画呼び出しの最大数を制御します:

```javascript
// フレームごとの間接描画呼び出しの最大数を設定 (デフォルト: 1024)
app.graphicsDevice.maxIndirectDrawCount = 2048;
```

### 間接描画バッファの理解

間接描画バッファは、描画呼び出しのパラメーターを保持するストレージバッファです。これはグラフィックスデバイスによって自動的に管理されます:

- `app.graphicsDevice.indirectDrawBuffer` を介してアクセス
- `maxIndirectDrawCount` プロパティによってサイズが制御されます
- 各スロットには: `indexCount`、`instanceCount`、`firstIndex`、`baseVertex`、`firstInstance` が含まれます

### コンピュートシェーダーとの併用

間接描画は、描画パラメーターを生成するコンピュートシェーダーと組み合わせると最も強力です。`getIndirectMetaData()` メソッドは、コンピュートシェーダーに必要なメッシュ情報を返します:

```javascript
// 間接レンダリングに必要なメッシュメタデータを取得
// Int32Array [count, base, baseVertex, 0] を返す
const meshMetaData = meshInstance.getIndirectMetaData();

// レンダリングパラメーターを制御するコンピュートシェーダーを作成
const compute = new pc.Compute(device, shader, 'IndirectDrawCompute');
compute.setParameter('indirectMetaData', meshMetaData);
compute.setParameter('indirectDrawBuffer', app.graphicsDevice.indirectDrawBuffer);
compute.setParameter('indirectSlot', indirectSlot);

// 描画パラメーターを生成するためにコンピュートシェーダーをディスパッチ
device.computeDispatch([compute], 'GenerateIndirectDraw');
```

## APIリファレンス

詳細なAPIドキュメントについては、以下のPlayCanvasエンジンクラスとメソッドを参照してください:

- [`MeshInstance.setIndirect()`](https://api.playcanvas.com/engine/classes/MeshInstance.html#setindirect) - 間接レンダリング用にメッシュインスタンスを設定する
- [`GraphicsDevice.getIndirectDrawSlot()`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#getindirectdrawslot) - 間接描画バッファにスロットを割り当てる
- [`GraphicsDevice.indirectDrawBuffer`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#indirectdrawbuffer) - 間接描画バッファにアクセスする
- [`GraphicsDevice.maxIndirectDrawCount`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#maxindirectdrawcount) - フレームごとの間接描画呼び出しの最大数を制御する

## ライブサンプル

アニメーションするインスタンス数での間接描画の完全なデモンストレーションについては、[間接描画のサンプル](https://playcanvas.github.io/#/compute/indirect-draw) を参照してください。

---
title: 間接描画
description: WebGPUの間接ドロースロット、GPUバッファパラメータ、コンピュート駆動のカリング、フレームごとのスロット割り当てルールです。
---

間接描画は、描画呼び出しのパラメーター(頂点数、インスタンス数など)がCPUによって直接指定されるのではなく、GPUバッファメモリに格納されるGPU駆動のレンダリング手法です。これにより、コンピュートシェーダーがレンダリングパラメーターを動的に生成または変更できるようになり、より効率的なGPU駆動のレンダリングワークフローが可能になります。

この機能は現在、**WebGPUでのみサポートされています** ([`GraphicsDevice.supportsIndirectDraw`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#supportsindirectdraw)を使用してサポート状況を確認できます) 。他のプラットフォームでは無視され、メッシュインスタンスは通常の描画呼び出しとしてレンダリングされます。

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
- 各スロットは20バイト（32ビットワード5個）です

### スロットのレイアウト {#slot-layout}

エンジンは、インデックスバッファを持つメッシュにはインデックス付き描画（`drawIndexedIndirect`）を、インデックスバッファを持たないメッシュにはインデックスなし描画（`drawIndirect`）を発行します。2つの描画は同じ20バイトのスロットから異なるレイアウトを読み取るため、メッシュに合ったレイアウトで書き込んでください:

```wgsl
// インデックスバッファを持つメッシュ: 5つのワードすべてが読み取られる
struct DrawIndexedIndirectArgs {
    indexCount: u32,
    instanceCount: u32,
    firstIndex: u32,
    baseVertex: i32,
    firstInstance: u32
};

// インデックスバッファを持たないメッシュ: 最初の4つのワードのみが読み取られる
struct DrawIndirectArgs {
    vertexCount: u32,
    instanceCount: u32,
    firstVertex: u32,
    firstInstance: u32,
    unused: u32 // 20バイトのスロット間隔を保つ
};
```

インデックスなしのメッシュでは、`firstInstance` は4番目のワードです。5番目のワードに書き込んだ値は無視されます。

### 描画ごとのデータの受け渡し

シェーダーは `firstInstance` をインスタンスインデックス（WGSLでは `pcInstanceIndex`）の一部として、頂点インデックスとは別に読み取ります。そのため、インスタンスデータへのオフセットなど、描画ごとの値を渡すのに適しています。

この用途に `baseVertex` を使用しないでください。GPUはこの値をすべてのインデックスに加算するため、シェーダーが受け取る頂点インデックスがずれます。

0以外の `firstInstance` には、WebGPUの `indirect-first-instance` 機能が必要です。この機能は広くサポートされています。使用する前に [`GraphicsDevice.supportsIndirectFirstInstance`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#supportsindirectfirstinstance) を確認してください。この機能がない場合、GPUは `firstInstance` が0以外の間接描画をスキップします。

### コンピュートシェーダーとの併用

間接描画は、描画パラメーターを生成するコンピュートシェーダーと組み合わせると最も強力です。`getIndirectMetaData()` メソッドは、コンピュートシェーダーに必要なメッシュ情報を返します:

```javascript
// 間接レンダリングに必要なメッシュメタデータを取得
// Int32Array [count, base, baseVertex, 0] を返す
const meshMetaData = meshInstance.getIndirectMetaData();

// レンダリングパラメーターを制御するコンピュートシェーダーを作成
const compute = new Compute(device, shader, 'IndirectDrawCompute');
compute.setParameter('indirectMetaData', meshMetaData);
compute.setParameter('indirectDrawBuffer', app.graphicsDevice.indirectDrawBuffer);
compute.setParameter('indirectSlot', indirectSlot);

// 描画パラメーターを生成するためにコンピュートシェーダーをディスパッチ
device.computeDispatch([compute], 'GenerateIndirectDraw');
```

このメタデータは間接描画コマンドではありません。最後の値は予約済みで、`firstInstance` ではありません。[スロットのレイアウト](#slot-layout) に示すように、メッシュに合ったスロットのレイアウトに値をコピーしてください。

## APIリファレンス

詳細なAPIドキュメントについては、以下のPlayCanvasエンジンクラスとメソッドを参照してください:

- [`MeshInstance.setIndirect()`](https://api.playcanvas.com/engine/classes/MeshInstance.html#setindirect) - 間接レンダリング用にメッシュインスタンスを設定する
- [`GraphicsDevice.supportsIndirectDraw`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#supportsindirectdraw) - デバイスが間接描画をサポートしているかを確認する
- [`GraphicsDevice.supportsIndirectFirstInstance`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#supportsindirectfirstinstance) - 間接描画で0以外の `firstInstance` を使用できるかを確認する
- [`GraphicsDevice.getIndirectDrawSlot()`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#getindirectdrawslot) - 間接描画バッファにスロットを割り当てる
- [`GraphicsDevice.indirectDrawBuffer`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#indirectdrawbuffer) - 間接描画バッファにアクセスする
- [`GraphicsDevice.maxIndirectDrawCount`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#maxindirectdrawcount) - フレームごとの間接描画呼び出しの最大数を制御する

## ライブサンプル

アニメーションするインスタンス数での間接描画の完全なデモンストレーションについては、間接描画のサンプル を参照してください。

<EngineExample id="compute/indirect-draw" title="間接描画のサンプル" />

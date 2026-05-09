---
title: FramePassCameraFrame クラスの拡張
description: FramePassCameraFrame を拡張してパスを挿入し、処理順を並べ替え、HDR スタック内の中間シーンテクスチャを利用します。
---

より高度なカスタマイズとして、`FramePassCameraFrame` クラスを拡張してカスタムレンダーパスを追加したり、レンダリングパイプラインを変更したりできます。サブクラスは [`CameraFrame.createRenderPass`](https://api.playcanvas.com/engine/classes/CameraFrame.html#createrenderpass) をオーバーライドして組み込みます。この方法では、組み込みの [`CameraFrame`](https://api.playcanvas.com/engine/classes/CameraFrame.html) エフェクトを活かしつつ、パス生成と実行順を細かく制御できます。

## 概要

`FramePassCameraFrame` を拡張すると、次のことができます。

- パイプラインにカスタムレンダーパスを追加する
- 既存のパスを変更または置き換える
- パス実行の順序を制御する
- レンダリングパイプラインから中間テクスチャにアクセスする

## 例：カスタムレンダーパスの追加

この例では、`FramePassCameraFrame` クラスを拡張してレンダリングパイプラインにカスタムレンダーパスを挿入する方法を示します。`createPasses()` メソッドをオーバーライドすると、シーンテクスチャを対象とする独自の処理ステップを追加できます。`collectPasses()` メソッドでは、カスタムパスがパイプラインのどこで実行されるかを制御します。この例では最終の compose パスの直前に挿入しています。エッジ検出、カスタムブラー、中間レンダーターゲットが必要な処理など、独自のレンダーパスが要るエフェクトに便利です。

```javascript
import { CameraFrame, FramePassCameraFrame } from 'playcanvas';

class CustomFramePassCameraFrame extends FramePassCameraFrame {
    createPasses(options) {
        // Call the base implementation to create standard passes
        super.createPasses(options);
        
        // Add your custom render pass
        this.customPass = new MyCustomRenderPass(this.device, this.sceneTexture);
        
        // You can also modify or replace existing passes here
    }
    
    collectPasses() {
        // Override to control pass ordering
        const passes = super.collectPasses();
        
        // Insert your custom pass at the desired position
        // This example inserts it before the compose pass
        passes.splice(passes.indexOf(this.composePass), 0, this.customPass);
        
        return passes;
    }
}

// Use your custom class by extending CameraFrame
class MyCameraFrame extends CameraFrame {
    createRenderPass() {
        return new CustomFramePassCameraFrame(this.app, this, this.cameraComponent, this.options);
    }
}

// Create an instance of your custom CameraFrame
const cameraFrame = new MyCameraFrame(app, cameraEntity.camera);
cameraFrame.update();
```

## 用途

このアプローチは次のような場合に適しています。

- 独自のレンダーターゲットを必要とするレンダーパスを追加する
- 複数パスにわたる複雑なエフェクトを実装する
- サードパーティのレンダリング手法を組み込む
- パイプラインを細かく制御したい上級ユーザー向け
- 他のパスからの中間結果を処理する必要があるエフェクト

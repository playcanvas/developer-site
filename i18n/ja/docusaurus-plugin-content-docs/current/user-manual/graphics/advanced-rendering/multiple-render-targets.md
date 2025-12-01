---
title: 複数のレンダーターゲット
---

複数のレンダーターゲット機能を使用すると、複数のテクスチャに同時にレンダリングできます。このマニュアルページでは、複数のレンダーターゲットの実装、設定、および使用例について説明します。

デバイスでのサポート状況を確認するには、`pc.GraphicsDevice.supportsMrt`を確認してください。一般的に、これはすべてのWebGL2およびWebGPUデバイス、および`WEBGL_draw_buffers`拡張機能をサポートするWebGL1デバイスでサポートされています。WebGL1デバイスでは、Androidを除いてサポート率が非常に高いことに注意してください。Androidでは非常に低いです。

さらに、使用できるカラーアタッチメントの数は、`pc.GraphicsDevice.maxColorAttachments`を確認することで検出できます。通常、8つのアタッチメントがサポートされています。

複数のレンダーターゲットには、以下の制限があります。

- 複数のレンダーターゲットのすべてのカラーアタッチメントは、同じ幅と高さを持ちます。
- すべてのカラーアタッチメントは、`pc.CameraComponent.clearColor`を使用して指定された同じ値にクリアされます。
- すべてのカラーアタッチメントは、`pc.BlendState`を使用して指定された同じ書き込みマスクとアルファブレンドモードを使用します。

## MRTの使用方法

複数のカラーテクスチャを使用してレンダーターゲットを作成します。

```javascript
const colorBuffers = app.graphicsDevice.supportsMrt ? [texture0, texture1, texture2] : [texture0];
const renderTarget = new pc.RenderTarget({
    name: 'MRT',
    colorBuffers: colorBuffers,
    depth: true
    samples: 2
});
```

MRTにレンダリングするために使用するカメラを作成します。

```javascript
const camera = new pc.Entity('MRTCamera');
camera.addComponent('camera', {
    // メインカメラより前に各フレームをレンダリングするように優先度を設定します
    priority: -1,

    // このカメラはMRTにレンダリングします
    renderTarget: renderTarget
});
app.root.addChild(camera);

// MRTがサポートされている場合、カメラがMyMRTというカスタムシェーダーパスを使用するように設定します
if (app.graphicsDevice.supportsMrt) {
    camera.camera.setShaderPass('MyMRT');
}
```

### 標準マテリアル

StandardMaterialを使用して複数のレンダーターゲット (MRT) にレンダリングする場合、追加のカラーバッファに値を出力するために、出力シェーダーチャンクをオーバーライドする必要があります。この例での変更は、ターゲット0のフォワードパス出力に使用される`gl_FragColor`には影響しないことに注意することが重要です。同様にオーバーライドしたい場合は、`pcFragColor0`にも値を出力できます。

```javascript
materials.forEach((material) => {
    material.chunks.outputPS = `
        #ifdef MYMRT_PASS
            // ワールド法線をターゲット1に出力
            pcFragColor1 = vec4(litArgs_worldNormal * 0.5 + 0.5, 1.0);

            // グロスをターゲット2に出力
            pcFragColor2 = vec4(vec3(litArgs_gloss) , 1.0);
        #endif
    `;
});
```

### カスタムシェーダー

StandardMaterialをレンダリングに使用せず、代わりに完全にカスタムのフラグメントシェーダーを使用する場合、目的の値を`pcFragColor0...pcFragColor7`に直接出力できます。特定のカメラのレンダリングのみを変更する必要がある場合は、そのカメラ用に設定されたシェーダーパスに対応する`MYMRT_PASS`定義を利用してください。

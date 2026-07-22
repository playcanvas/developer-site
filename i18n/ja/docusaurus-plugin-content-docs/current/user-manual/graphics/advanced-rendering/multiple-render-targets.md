---
title: 複数のレンダーターゲット
description: 複数レンダーターゲットの設定、共有アタッチメントのルール、複数のカラーバッファへのシェーダー出力です。
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「複数のレンダーターゲット」で使用する Script と Shader を Pull/Push モードでローカル編集し、変更を確認できます。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 関連するテキストアセットを作成し、Camera とレンダリングのプロパティを設定して、結果を起動、キャプチャできます。

:::

複数のレンダーターゲット機能を使用すると、複数のテクスチャに同時にレンダリングできます。このマニュアルページでは、複数のレンダーターゲットの実装、設定、および使用例について説明します。

MRTは、PlayCanvasが動作するすべてのデバイス（WebGL2およびWebGPU）でサポートされています。現在のデバイスで使用できるカラーアタッチメントの数を検出するには、[`GraphicsDevice.maxColorAttachments`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#maxcolorattachments)を確認してください。通常、8つのアタッチメントがサポートされています。

複数のレンダーターゲットには、以下の制限があります。

- 複数のレンダーターゲットのすべてのカラーアタッチメントは、同じ幅と高さを持ちます。
- すべてのカラーアタッチメントは、[`CameraComponent.clearColor`](https://api.playcanvas.com/engine/classes/CameraComponent.html#clearcolor)を使用して指定された同じ値にクリアされます。
- すべてのカラーアタッチメントは、[`BlendState`](https://api.playcanvas.com/engine/classes/BlendState.html)を使用して指定された同じ書き込みマスクとアルファブレンドモードを使用します。

## MRTの使用方法

レンダリング先となるテクスチャを作成します。

```javascript
const createTexture = name => new pc.Texture(app.graphicsDevice, {
    name,
    width: 512,
    height: 512,
    format: pc.PIXELFORMAT_RGBA8,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE
});

const texture0 = createTexture('RT-texture-0');
const texture1 = createTexture('RT-texture-1');
const texture2 = createTexture('RT-texture-2');
```

それらをレンダーターゲットでラップします。

```javascript
const renderTarget = new pc.RenderTarget({
    name: 'MRT',
    colorBuffers: [texture0, texture1, texture2],
    depth: true,
    samples: 2
});
```

MRTにレンダリングするために使用するカメラエンティティを作成します。

```javascript
const entity = new pc.Entity('MRTCamera');
entity.addComponent('camera', {
    // 負の優先度 => メインカメラより前にレンダリングされます
    priority: -1,
    renderTarget
});
app.root.addChild(entity);

// カメラがMyMRTというカスタムシェーダーパスを使用するように設定します
entity.camera.setShaderPass('MyMRT');
```

### 標準マテリアル

[`StandardMaterial`](https://api.playcanvas.com/engine/classes/StandardMaterial.html)を使用して複数のレンダーターゲット (MRT) にレンダリングする場合、追加のカラーバッファに値を出力するために`outputPS`シェーダーチャンクをオーバーライドします。プロジェクトが対象とするシェーダー言語ごとにチャンクを用意してください — WebGL2にはGLSL、WebGPUにはWGSLです。[`Material.getShaderChunks`](https://api.playcanvas.com/engine/classes/Material.html#getshaderchunks)を使って、両方のチャンクを対象エンティティのレンダーコンポーネントのすべてのマテリアルに適用します。

```javascript
// GLSL出力チャンク（WebGL2で使用）
const glslChunk = `
    #ifdef MYMRT_PASS
        // ワールド法線をターゲット1に出力
        pcFragColor1 = vec4(litArgs_worldNormal * 0.5 + 0.5, 1.0);

        // グロスをターゲット2に出力
        pcFragColor2 = vec4(vec3(litArgs_gloss), 1.0);
    #endif
`;

// WGSL出力チャンク（WebGPUで使用）
const wgslChunk = `
    #ifdef MYMRT_PASS
        // ワールド法線をターゲット1に出力
        output.color1 = vec4f(litArgs_worldNormal * 0.5 + 0.5, 1.0);

        // グロスをターゲット2に出力
        output.color2 = vec4f(vec3f(litArgs_gloss), 1.0);
    #endif
`;

// `targetEntity`は、MRTを通してレンダリングしたいマテリアルを持つエンティティ（または階層のルート）です
const renders = targetEntity.findComponents('render');
renders.forEach((render) => {
    render.meshInstances.forEach((meshInstance) => {
        const material = meshInstance.material;
        material.getShaderChunks(pc.SHADERLANGUAGE_GLSL).set('outputPS', glslChunk);
        material.getShaderChunks(pc.SHADERLANGUAGE_WGSL).set('outputPS', wgslChunk);
        material.shaderChunksVersion = '2.8';
    });
});
```

上記のチャンクはカラーターゲット1と2にのみ書き込みます — ターゲット0 (GLSLでは`pcFragColor0`、WGSLでは`output.color0`) は引き続き標準のフォワードパス出力を受け取ります。これも上書きしたい場合は、同じチャンク内で書き込んでください。

### カスタムシェーダー

[`StandardMaterial`](https://api.playcanvas.com/engine/classes/StandardMaterial.html)の代わりに完全にカスタムのフラグメントシェーダーを使用する場合は、目的の値をGLSLでは`pcFragColor0`...`pcFragColor7`に、WGSLでは`output.color0`...`output.color7`に直接書き込みます。

特定のカメラのレンダリングのみに変更を限定する場合は、そのカメラのシェーダーパスdefineで処理を囲みます。defineはパス名を大文字にして`_PASS`を付加したもので、[`setShaderPass('MyMRT')`](https://api.playcanvas.com/engine/classes/CameraComponent.html#setshaderpass)はシェーダー内で`MYMRT_PASS`を有効化します。

## 例

完全に動作するサンプルがエンジンの例にあります: Multiple Render Targets は、カスタムシェーダーパスを通してチェス盤をレンダリングし、ワールド法線とグロスを追加のカラーターゲットに書き込んで、それぞれを画面上に別々のテクスチャとして表示します。

<EngineExample id="graphics/multi-render-targets" title="Multiple Render Targets" />

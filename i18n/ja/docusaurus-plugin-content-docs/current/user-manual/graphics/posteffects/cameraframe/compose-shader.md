---
title: Compose シェーダーのカスタマイズ
description: CameraFrame の compose チャンクを上書きして、最終フルスクリーン結合パスにユニフォームとピクセル効果を注入します。
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「Compose シェーダーのカスタマイズ」で使用する Script と Shader を Pull/Push モードでローカル編集し、変更を確認できます。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 関連するテキストアセットを作成し、Camera とレンダリングのプロパティを設定して、結果を起動、キャプチャできます。

:::

カスタムポストエフェクトを追加する最も簡単な方法は、すべてのエフェクトを合成してバックバッファへ出力する最終の compose パスをカスタマイズすることです。追加のレンダーパスが不要で、最終出力だけを変更したい場合に適しています。

## 概要

`CameraFrame` を作成する前にシェーダーチャンクを上書きすることで、カスタムシェーダーコードを注入できます。compose パスには、カスタマイズ用に空のチャンクが 3 つ用意されています。

- `composeDeclarationsPS` — カスタムユニフォーム宣言とヘルパー関数を追加
- `composeMainStartPS` — `main` 関数の先頭にコードを追加
- `composeMainEndPS` — 最終出力の直前、`main` 関数の末尾にコードを追加

## 例：簡単なピクセル化エフェクト

ピクセル化エフェクトを追加する完全な例です。

```javascript
import { CameraFrame, ShaderChunks, SHADERLANGUAGE_GLSL, SHADERLANGUAGE_WGSL } from 'playcanvas';

// Override compose shader chunks before creating CameraFrame
const shaderChunks = ShaderChunks.get(graphicsDevice, SHADERLANGUAGE_GLSL);

shaderChunks.set('composeDeclarationsPS', `
    uniform float pixelSize;
`);

shaderChunks.set('composeMainEndPS', `
    // Apply pixelation effect
    vec2 pixelatedUV = floor(uv0 / pixelSize) * pixelSize;
    color = getLinear(texture2D(sceneTexture, pixelatedUV));
`);

// For WebGPU, also set WGSL chunks
const wgslChunks = ShaderChunks.get(graphicsDevice, SHADERLANGUAGE_WGSL);
wgslChunks.set('composeDeclarationsPS', `
    uniform pixelSize: f32;
`);

wgslChunks.set('composeMainEndPS', `
    let pixelatedUV: vec2f = floor(input.uv0 / uniform.pixelSize) * uniform.pixelSize;
    color = getLinear(textureSample(sceneTexture, sceneTextureSampler, pixelatedUV));
`);

// Now create the CameraFrame
const cameraFrame = new CameraFrame(app, cameraEntity.camera);
cameraFrame.update();

// Set the custom uniform value
app.on('update', () => {
    graphicsDevice.scope.resolve('pixelSize').setValue(0.005);
});
```

## 重要な注意

- **グローバルな適用**：シェーダーチャンクへの変更は、すべての `CameraFrame` インスタンスにグローバルに適用されます。
- **WebGPU のサポート**：クロスプラットフォーム互換のため、GLSL と WGSL の両方のシェーダーチャンクを用意してください。
- **タイミング**：シェーダーチャンクは、`CameraFrame` インスタンスを作成する前に設定する必要があります。

## 参考資料

- Custom Compose Shader の例 — 動作する完全なデモ

<EngineExample id="graphics/custom-compose-shader" title="Custom Compose Shader の例" />

## 用途

この方法は次のような場合に適しています。

- 単純なスクリーンスペースエフェクト（ビネット、色調整、歪み）を追加する
- 追加のテクスチャやレンダーパスを必要としないポストプロセスを行う
- 視覚効果の迅速なプロトタイピングを行う
- 最終的に合成された画像に対して動作するエフェクトを適用する

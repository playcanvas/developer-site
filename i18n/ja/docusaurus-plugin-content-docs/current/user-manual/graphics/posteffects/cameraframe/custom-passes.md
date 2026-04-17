---
title: カスタムレンダーパス
description: CameraFrame を使わずにカメラ上で RenderPass ベースのポストスタックを構築し、パイプラインを完全に手動制御します。
---

最も柔軟なアプローチは、`CameraFrame` から独立して動作する完全カスタムのレンダーパスを実装することです。レンダリングパイプラインを完全に制御でき、ゼロからカスタムのポストプロセススタックを構築できます。

## 概要

このアプローチでは `CameraFrame` は一切使いません。代わりに独自のレンダーパスを作成し、カメラの `renderPasses` 配列に直接割り当てます。完全な制御が必要な場合や、カスタムのポストプロセスパイプラインを実装したい場合に適しています。

## 例：簡単なティントのレンダーパス

シーンにティントをかけるカスタムレンダーパスの完全な例です。

```javascript
import * as pc from 'playcanvas';

class RenderPassTint extends pc.RenderPassShaderQuad {
    constructor(device, sourceTexture) {
        super(device);
        this.sourceTexture = sourceTexture;
        this.tint = pc.Color.WHITE.clone();
        
        this.shader = this.createShader();
    }
    
    createShader() {
        return pc.ShaderUtils.createShader(this.device, {
            uniqueName: 'TintShader',
            attributes: { aPosition: pc.SEMANTIC_POSITION },
            vertexChunk: 'quadVS',
            
            fragmentGLSL: `
                uniform sampler2D sourceTexture;
                uniform vec3 tint;
                varying vec2 uv0;
                
                void main() {
                    vec4 color = texture2D(sourceTexture, uv0);
                    gl_FragColor = vec4(color.rgb * tint, color.a);
                }
            `,
            
            fragmentWGSL: `
                var sourceTexture: texture_2d<f32>;
                var sourceTextureSampler: sampler;
                uniform tint: vec3f;
                varying uv0: vec2f;
                
                @fragment fn fragmentMain(input: FragmentInput) -> FragmentOutput {
                    var output: FragmentOutput;
                    let color: vec4f = textureSample(sourceTexture, sourceTextureSampler, uv0);
                    output.color = vec4f(color.rgb * uniform.tint, color.a);
                    return output;
                }
            `
        });
    }
    
    execute() {
        this.device.scope.resolve('sourceTexture').setValue(this.sourceTexture);
        this.device.scope.resolve('tint').setValue([this.tint.r, this.tint.g, this.tint.b]);
        super.execute();
    }
}
```

## カスタムレンダーパスの設定

`CameraFrame` を使わずにカスタムレンダーパスを使うには：

```javascript
// Create your scene render pass (renders the 3D scene)
const scenePass = new pc.RenderPassForward(device, composition, scene, renderer);
scenePass.init(renderTarget);

// Create your custom post-processing pass
const tintPass = new RenderPassTint(device, renderTarget.colorBuffer);
tintPass.init(camera.renderTarget);

// Assign passes to the camera
camera.renderPasses = [scenePass, tintPass];
```

## マルチパスの例

複数のカスタムパスを連鎖させる例です。

```javascript
// Create render targets
const rt1 = new pc.RenderTarget({
    colorBuffer: new pc.Texture(device, {
        width: 1920, height: 1080,
        format: pc.PIXELFORMAT_RGBA8
    })
});

const rt2 = new pc.RenderTarget({
    colorBuffer: new pc.Texture(device, {
        width: 1920, height: 1080,
        format: pc.PIXELFORMAT_RGBA8
    })
});

// Create scene pass
const scenePass = new pc.RenderPassForward(device, composition, scene, renderer);
scenePass.init(rt1);

// Create blur pass (horizontal)
const blurHPass = new RenderPassBlurHorizontal(device, rt1.colorBuffer);
blurHPass.init(rt2);

// Create blur pass (vertical)
const blurVPass = new RenderPassBlurVertical(device, rt2.colorBuffer);
blurVPass.init(camera.renderTarget); // Final output

// Set the pass chain
camera.renderPasses = [scenePass, blurHPass, blurVPass];
```

## 参考資料

- [Render Pass の例](https://playcanvas.vercel.app/#/graphics/render-pass) — カスタムレンダーパスの完全なデモ

## 用途

このアプローチは次のような場合に適しています。

- **完全カスタムのパイプライン** — レンダリング処理全体を細かく制御したいとき
- **外部システムとの連携** — サードパーティのレンダリングやエフェクトライブラリを組み込むとき
- **パフォーマンスの最適化** — 用途に合わせた最小限のパイプラインを構築するとき
- **学習と実験** — レンダリングパイプラインの動作を理解するとき
- **特殊なレンダリング** — 非標準のレンダリング手法や研究実装

## 重要な考慮事項

- **手動管理** — レンダーターゲット、テクスチャ、メモリは自分で管理する責任があります。
- **メモリ管理** — メモリリークを避けるため、リソースの適切な解放を行ってください。
- **クロスプラットフォーム** — WebGL と WebGPU のサポートのため、GLSL と WGSL の両方のシェーダーを用意してください。
- **解像度の扱い** — 動的な解像度変更に適切に対応してください。
- **レイヤー管理** — 各パスがレンダリングするレイヤーを正しく設定してください。

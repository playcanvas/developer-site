---
title: シェーダークアッドパス
description: "RenderPassShaderQuad はレンダーターゲット全体またはその一部のすべてのピクセルに対してシェーダーを実行します：シェーダーの記述、パラメーターの設定、レンダーステート、インスタンス化したクアッドと繰り返し描画するクアッド、drawQuadWithShader。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[`RenderPassShaderQuad`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html) は、シェーダーでクアッドを描画する [`RenderPass`](render-pass.md) です。そのため、フラグメントシェーダーはクアッドが覆うピクセルごとに 1 回実行されます。覆う範囲はデフォルトではレンダーターゲット全体で、[ビューポート](#render-states-and-the-drawn-area)を設定するとその一部になります。これはポストプロセスエフェクトや、GPU でテクスチャを計算するあらゆるパスの基本的な構成要素です。

このパスは、その [`shader`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#shader) 用のクアッドを作成し、レンダーステートを設定し、実行時にクアッドを描画します。シェーダーを設定してそのまま使用することも、シェーダーを作成してパラメーターを設定するパスの基底クラスとして使用することもできます。

## シェーダー {#the-shader}

頂点シェーダーは、`SEMANTIC_POSITION` を使用する属性でクアッドの角を受け取ります。`quadVS` シェーダーチャンクがこの頂点シェーダーを実装し、クアッドの UV 座標を `uv0` varying でフラグメントシェーダーに渡すため、記述するのはフラグメントシェーダーだけです。パスが WebGL2 と WebGPU の両方で動作するように、GLSL と WGSL の両方で記述します。

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform sampler2D sourceTexture;
uniform vec3 tint;
varying vec2 uv0;

void main() {
    vec4 color = texture2D(sourceTexture, uv0);
    gl_FragColor = vec4(color.rgb * tint, color.a);
}
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
var sourceTexture: texture_2d<f32>;
var sourceTextureSampler: sampler;
uniform tint: vec3f;
varying uv0: vec2f;

@fragment fn fragmentMain(input: FragmentInput) -> FragmentOutput {
    var output: FragmentOutput;
    let color = textureSample(sourceTexture, sourceTextureSampler, input.uv0);
    output.color = vec4f(color.rgb * uniform.tint, color.a);
    return output;
}
```

</TabItem>
</Tabs>

[`ShaderUtils.createShader`](https://api.playcanvas.com/engine/classes/ShaderUtils.html#createshader) に両方のフラグメントシェーダーを渡して、シェーダーを作成します。

```javascript
const shader = ShaderUtils.createShader(device, {
    uniqueName: 'TintShader',
    attributes: { aPosition: SEMANTIC_POSITION },
    vertexChunk: 'quadVS',
    fragmentGLSL: tintGLSL,
    fragmentWGSL: tintWGSL
});
```

シェーダーは共有されるため、パスはシェーダーを破棄しません。

## シェーダーパラメーターの設定 {#setting-the-shader-parameters}

シェーダーのテクスチャとユニフォームは、グラフィックスデバイスのスコープに設定されます。他のパスが同じ名前のパラメーターを設定することがあるため、クアッドを描画する直前に設定してください。パラメーターはパスの作成時に一度だけ解決し、オーバーライドした `execute` の中で、クアッドを描画する `super.execute()` を呼び出す前に値を設定します。

```javascript
// テクスチャに色を乗算してレンダーターゲットに描画するパス
class TintPass extends RenderPassShaderQuad {
    constructor(device, sourceTexture) {
        super(device);
        this.name = 'TintPass';
        this.sourceTexture = sourceTexture;
        this.tint = new Float32Array([1, 0.5, 0.5]);
        this.shader = ShaderUtils.createShader(device, {
            uniqueName: 'TintShader',
            attributes: { aPosition: SEMANTIC_POSITION },
            vertexChunk: 'quadVS',
            fragmentGLSL: tintGLSL,
            fragmentWGSL: tintWGSL
        });

        // シェーダーパラメーターを一度だけ解決する
        this.sourceTextureId = device.scope.resolve('sourceTexture');
        this.tintId = device.scope.resolve('tint');
    }

    execute() {
        // クアッドを描画する直前にパラメーターを設定する
        this.sourceTextureId.setValue(this.sourceTexture);
        this.tintId.setValue(this.tint);
        super.execute();
    }
}

const pass = new TintPass(app.graphicsDevice, sourceTexture);
pass.init(renderTarget);

// クアッドがレンダーターゲット全体を覆うため、内容をロードせずにクリアする
pass.setClearColor(Color.BLACK);
```

毎フレーム描画するにはパスをカメラに追加します（[カメラパス](camera-passes.md)を参照してください）。または、`pass.render()` で一度だけレンダリングします。

## レンダーステートと描画領域 {#render-states-and-the-drawn-area}

デフォルトでは、クアッドはレンダーターゲット全体を覆い、ブレンド、深度テスト、フェイスカリングなしで描画され、レンダーターゲットの内容を置き換えます。これを変更するには、次のプロパティを設定します。

- [`blendState`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#blendstate) - クアッドをレンダーターゲットの内容と合成します。
- [`depthState`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#depthstate)、[`stencilFront`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#stencilfront)、[`stencilBack`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#stencilback) - クアッドをレンダーターゲットの深度またはステンシルに対してテストします。
- [`viewport`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#viewport)、および必要に応じて [`scissor`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#scissor) - レンダーターゲットの一部だけに描画します。

たとえば、パスを直接使用して、テクスチャアトラスの 1 つのタイルにシェーダーを描画します。アトラスはクリアされないため、他のタイルは内容を保持します。

```javascript
const pass = new RenderPassShaderQuad(app.graphicsDevice);
pass.name = 'AtlasTile';
pass.shader = tileShader;
pass.init(atlasRenderTarget);

pass.viewport = new Vec4(256, 0, 256, 256);
pass.render();

// 同じタイルの上に 2 つ目のシェーダーをブレンドする
pass.shader = overlayShader;
pass.blendState = BlendState.ALPHABLEND;
pass.render();

pass.destroy();
```

## 複数のクアッドの描画 {#drawing-several-quads}

スプライトのように、それぞれがインデックスに応じて読み取るデータだけが異なる多数のクアッドを描画するには、[`numInstances`](https://api.playcanvas.com/engine/classes/RenderPassShaderQuad.html#numinstances) を設定して、1 回のインスタンス描画でまとめて描画します。各インスタンスは自身のインデックス（GLSL では `gl_InstanceID`、WGSL では `pcInstanceIndex`）を読み取ってクアッドのデータを取得し、たとえばクアッドを配置します。デフォルトでは `numInstances` は `undefined` で、インスタンス化せずに 1 つのクアッドを描画します。0 を設定すると何も描画しませんが、パス自体はレンダリングされるため、レンダーターゲットのクリアは引き続き行われます。

ライトごとに 1 つなど、異なるパラメーターで複数のクアッドを描画するには、`execute` をオーバーライドし、クアッドごとにパラメーターまたはビューポートを設定して `super.execute()` を呼び出します。これにより、パスのレンダーステートでクアッドが描画されます。

```javascript
execute() {
    for (const light of this.lights) {
        this.colorId.setValue(light.color);
        this.viewport = light.screenRect;
        super.execute();
    }
}
```

## クアッドの即時描画 {#drawing-a-quad-immediately}

テクスチャを一度だけ生成する場合など、単発の描画には [`drawQuadWithShader`](https://api.playcanvas.com/engine/functions/drawQuadWithShader.html) を使用します。この関数は、パスをセットアップせずに、シェーダーでクアッドをレンダーターゲットへ即座に描画します。

```javascript
device.scope.resolve('scale').setValue(4);
drawQuadWithShader(device, renderTarget, shader);
```

呼び出すたびにパスを作成し、レンダリングして破棄するため、呼び出しごとにメモリの割り当てが発生します。グラフィックスデバイスに現在設定されているブレンドステートで描画し、レンダーターゲットの内容をクリアせずにロードします。クアッドを毎フレーム描画する場合や、独自のレンダーステートで描画する場合は、一度作成して再利用する `RenderPassShaderQuad` を使用してください。

## 例 {#examples}

2 つの `RenderPassShaderQuad` パスが、テクスチャに光の軌跡を描きます。フェードパスは逆減算のブレンドステートでテクスチャを暗くし、ブラシパスは各ブラシの経路に沿ってドットを描画します。ブラシパスはドットごとにビューポートを設定し、すべてを 1 つのパスで描画します。

<EngineExample id="render-targets/render-pass-shader-quad" title="Light Trails" />

ポストプロセスエフェクト内の `RenderPassShaderQuad` が、深度や明るさが急激に変化する箇所で、シーンにインクの輪郭線を描画します。

<EngineExample id="camera-frame/ink-outline" title="Ink Outline" />

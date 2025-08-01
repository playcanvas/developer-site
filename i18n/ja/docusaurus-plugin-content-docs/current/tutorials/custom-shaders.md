---
title: カスタムシェーダー
tags: [シェーダー, マテリアル]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406044/4J2JX2-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/zwvhLoS9/" title="カスタムシェーダー" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::info

このチュートリアルでは、[ShaderMaterial](https://api.playcanvas.com/engine/classes/ShaderMaterial.html) API を使用して、WebGL と WebGPU の両方で動作する、燃えるような縁を持つディゾルブエフェクトを作成します。完全なプロジェクトは[こちら](https://playcanvas.com/project/406044/overview/tutorial-custom-shaders)で確認できます。

:::

PlayCanvas に 3D モデルをインポートすると、デフォルトでは[Physical Material](/user-manual/graphics/physical-rendering/physical-materials/)が使用されます。これは、多くのレンダリング要件をカバーできる汎用性の高いマテリアルタイプです。

しかし、マテリアルに特殊なエフェクトや特殊なケースを適用したいと思うことがよくあります。これを行うには、カスタムシェーダーを記述する必要があります。

## ShaderMaterial API

PlayCanvas は、カスタムシェーダーの作成を簡素化し、WebGL (GLSL) と WebGPU (WGSL) の両方をサポートする[ShaderMaterial](https://api.playcanvas.com/engine/classes/ShaderMaterial.html) API を提供します。この API は、グラフィックス API 間の違いを自動的に処理し、シェーダー開発のためのよりクリーンなインターフェースを提供します。

## クロスプラットフォームシェーダーのサポート

カスタムシェーダーがすべてのデバイスとブラウザで動作するようにするには、シェーダーの [GLSL](/user-manual/graphics/shaders/glsl-specifics/) と [WGSL](/user-manual/graphics/shaders/wgsl-specifics/) の両方のバージョンを提供する必要があります。

- **GLSL** (OpenGL Shading Language): WebGL で使用されます
- **WGSL** (WebGPU Shading Language): WebGPU で使用されます

## 頂点シェーダー

### GLSL 頂点シェーダー

```glsl
attribute vec3 aPosition;
attribute vec2 aUv0;

uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;

varying vec2 vUv0;

void main(void)
{
    vUv0 = aUv0;
    gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
}
```

### WGSL 頂点シェーダー

```wgsl
attribute aPosition: vec3f;
attribute aUv0: vec2f;

uniform matrix_viewProjection: mat4x4f;
uniform matrix_model: mat4x4f;

varying vUv0: vec2f;

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    output.vUv0 = aUv0;
    output.position = uniform.matrix_viewProjection * uniform.matrix_model * vec4<f32>(aPosition, 1.0);

    return output;
}
```

## フラグメントシェーダー

### GLSL フラグメントシェーダー

```glsl
varying vec2 vUv0;

uniform sampler2D uDiffuseMap;
uniform sampler2D uHeightMap;
uniform float uTime;

void main(void)
{
    float height = texture2D(uHeightMap, vUv0).r;
    vec4 color = texture2D(uDiffuseMap, vUv0);

    if (height < uTime) {
        discard;
    }

    // 燃焼帯の幅
    float edgeWidth = 0.05;

    if (height < (uTime + edgeWidth)) {
        // 内側の縁で0 → 外側の縁で1
        float t = (height - uTime) / edgeWidth;

        // 炎のグラデーション：黄色から暗いオレンジへ
        vec3 burnColor = mix(
            vec3(1.0, 0.7, 0.2),
            vec3(0.6, 0.1, 0.0),
            t
        );

        // 燃焼色を元のテクスチャとブレンドする
        color = vec4(mix(burnColor, color.rgb, t), 1.0);
    }

    gl_FragColor = color;
}
```

### WGSL フラグメントシェーダー

```wgsl
varying vUv0: vec2f;

uniform uTime: f32;

var uDiffuseMap: texture_2d<f32>;
var uDiffuseMapSampler: sampler;
var uHeightMap: texture_2d<f32>;
var uHeightMapSampler: sampler;

@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
    var output: FragmentOutput;

    let height = textureSample(uHeightMap, uHeightMapSampler, vUv0).r;
    var color = textureSample(uDiffuseMap, uDiffuseMapSampler, vUv0);

    if (height < uniform.uTime) {
        discard;
    }

    // 燃焼帯の幅
    let edgeWidth = 0.05;

    if (height < (uniform.uTime + edgeWidth)) {
        // tは0（内側の縁のすぐ内側）から1（外側の縁）まで変化
        let t = (height - uniform.uTime) / edgeWidth;

        // 炎の色：明るい黄色から暗いオレンジにフェードアウト
        let burnColor = mix(
            vec3f(1.0, 0.7, 0.2),
            vec3f(0.6, 0.1, 0.0),
            t
        );

        // 燃焼色を元のテクスチャとブレンドする（外側の縁ほど燃焼色が濃くなる）
        color = vec4f(mix(burnColor, color.rgb, t), 1.0);
    }

    output.color = color;
    return output;
}
```

上記のシェーダーは、炎のような燃焼する縁を持つディゾルブ効果を作成します。頂点シェーダーはメッシュの頂点をスクリーン空間に変換し、フラグメントシェーダーはハイトマップテクスチャに基づいてディゾルブ効果を作成します。ピクセルでの`uTime`の値がハイトマップの値よりも大きい場合、そのピクセルは破棄されます（モデルが透明になります）。ディゾルブの縁の近くでは、リアルな燃焼効果のために炎色のグラデーションをブレンドします。

## ShaderMaterial の作成

```javascript
// Create a new ShaderMaterial with both GLSL and WGSL versions
this.material = new ShaderMaterial({
    uniqueName: 'Dissolve',
    vertexGLSL: this.vertexGLSL.resource,
    fragmentGLSL: this.fragmentGLSL.resource,
    vertexWGSL: this.vertexWGSL.resource,
    fragmentWGSL: this.fragmentWGSL.resource,
    attributes: {
        aPosition: SEMANTIC_POSITION,
        aUv0: SEMANTIC_TEXCOORD0
    }
});
```

[ShaderMaterial コンストラクター](https://api.playcanvas.com/engine/classes/ShaderMaterial.html#constructor)は、GLSL と WGSL の両方のシェーダーコードを受け取ります。PlayCanvas は、使用されているグラフィックス API に基づいて適切なバージョンを自動的に選択します。`attributes` オブジェクトは、シェーダーが期待する頂点属性を指定します。

## シェーダーパラメータの設定

```javascript
// Set the initial time parameter
this.material.setParameter('uTime', 0);

// Set the diffuse texture
const diffuseTexture = this.diffuseMap.resource;
this.material.setParameter('uDiffuseMap', diffuseTexture);

// Set the height map texture
const heightTexture = this.heightMap.resource;
this.material.setParameter('uHeightMap', heightTexture);
```

Uniform は、通常の Materials と同じように動作する[`setParameter()`](https://api.playcanvas.com/engine/classes/Material.html#setparameter)メソッドを使用して設定されます。ShaderMaterial は、GLSL と WGSL の uniform 構文の違いを自動的に処理します。

## シェーダーアセットのスクリプト属性

```javascript
/**
 * GLSL 頂点シェーダー。
 * 
 * @attribute
 * @title GLSL 頂点シェーダー
 * @type {pc.Asset}
 */
vertexGLSL;

/**
 * GLSL フラグメントシェーダー。
 * 
 * @attribute
 * @title GLSL フラグメントシェーダー
 * @type {pc.Asset}
 */
fragmentGLSL;

/**
 * WGSL 頂点シェーダー。
 * 
 * @attribute
 * @title WGSL 頂点シェーダー
 * @type {pc.Asset}
 */
vertexWGSL;

/**
 * WGSL フラグメントシェーダー。
 * 
 * @attribute
 * @title WGSL フラグメントシェーダー
 * @type {pc.Asset}
 */
fragmentWGSL;

/**
 * ディフューズマップ
 * 
 * @attribute
 * @title ディフューズマップ
 * @type {pc.Asset}
 */
diffuseMap;

/**
 * ハイトマップ
 * 
 * @attribute
 * @title ハイトマップ
 * @type {pc.Asset}
 */
heightMap;
```

PlayCanvas Editor で、4 つのシェーダーアセット（GLSL が 2 つ、WGSL が 2 つ）を作成し、これらのスクリプト属性に割り当てる必要があります。

## Uniform の更新

```javascript
update(dt) {
    this.time += dt;

    // 正弦波を使用して滑らかな振動を作成する
    const t = (Math.sin(this.time) + 1) / 2;

    // マテリアルのタイム値を更新する
    this.material.setParameter('uTime', t);
}
```

ディゾルブ効果を実現するために、時間とともに変化する閾値としてハイトマップの値を使用します。このバージョンでは、正弦波を使用して 0 から 1 の間で滑らかな振動を作成し、より自然なディゾルブアニメーションを提供します。

## 完全なスクリプト

```javascript
import { Script, ShaderMaterial, SEMANTIC_POSITION, SEMANTIC_TEXCOORD0 } from 'playcanvas';

/**
 * エンティティのレンダーコンポーネントにディゾルブシェーダーマテリアルを適用します。
 */
export class CustomShader extends Script {
    scriptName = 'dissolveShader';

    /**
     * GLSL 頂点シェーダー。
     * 
     * @attribute
     * @title GLSL 頂点シェーダー
     * @type {pc.Asset}
     */
    vertexGLSL;

    /**
     * GLSL フラグメントシェーダー。
     * 
     * @attribute
     * @title GLSL フラグメントシェーダー
     * @type {pc.Asset}
     */
    fragmentGLSL;

    /**
     * WGSL 頂点シェーダー。
     * 
     * @attribute
     * @title WGSL 頂点シェーダー
     * @type {pc.Asset}
     */
    vertexWGSL;

    /**
     * WGSL フラグメントシェーダー。
     * 
     * @attribute
     * @title WGSL フラグメントシェーダー
     * @type {pc.Asset}
     */
    fragmentWGSL;

    /**
     * ディフューズマップ
     * 
     * @attribute
     * @title ディフューズマップ
     * @type {pc.Asset}
     */
    diffuseMap;

    /**
     * ハイトマップ
     * 
     * @attribute
     * @title ハイトマップ
     * @type {pc.Asset}
     */
    heightMap;

    time = 0;

    // エンティティごとに一度呼び出される初期化コード
    initialize() {
        // 新しいマテリアルを作成し、シェーダーを設定する
        this.material = new ShaderMaterial({
            uniqueName: 'Dissolve',
            vertexGLSL: this.vertexGLSL.resource,
            fragmentGLSL: this.fragmentGLSL.resource,
            vertexWGSL: this.vertexWGSL.resource,
            fragmentWGSL: this.fragmentWGSL.resource,
            attributes: {
                aPosition: SEMANTIC_POSITION,
                aUv0: SEMANTIC_TEXCOORD0
            }
        });

        // 初期時間パラメータを設定する
        this.material.setParameter('uTime', 0);

        // ディフューズテクスチャを設定する
        const diffuseTexture = this.diffuseMap.resource;
        this.material.setParameter('uDiffuseMap', diffuseTexture);

        // ハイトマップテクスチャを設定する
        const heightTexture = this.heightMap.resource;
        this.material.setParameter('uHeightMap', heightTexture);

        // すべてのレンダーコンポーネントのマテリアルを置き換える
        const renders = this.entity.findComponents('render');
        for (let i = 0; i < renders.length; ++i) {
            const meshInstances = renders[i].meshInstances;
            for (let j = 0; j < meshInstances.length; j++) {
                meshInstances[j].material = this.material;
            }
        }
    }

    // フレームごとに呼び出される更新コード
    update(dt) {
        this.time += dt;

        // 正弦波を使用して滑らかな振動を作成する
        const t = (Math.sin(this.time) + 1) / 2;

        // マテリアルのタイム値を更新する
        this.material.setParameter('uTime', t);
    }
}
```

このスクリプトは、ShaderMaterial API を使用してクロスプラットフォームのカスタムシェーダーを作成する方法を示しています。ディゾルブ効果は、ハイトマップを使用してどのピクセルを破棄するかを決定し、溶解の進行とともに燃えるような縁の効果を作成します。

## GLSL と WGSL の違い

両方の API 用にシェーダーを記述する際には、以下の重要な違いに留意してください。

- **構文**: WGSL はより明示的な型指定（`vec3f`、`f32`）を使用しますが、GLSL は型を推論します
- **属性/Varyings**: WGSL は構造化された入出力を使用しますが、GLSL はグローバル変数を使用します
- **テクスチャ**: WGSL はテクスチャとサンプラーを分離しますが、GLSL はそれらを結合します
- **エントリポイント**: WGSL は `@vertex` および `@fragment` デコレーターを使用しますが、GLSL は `main()` を使用します

ShaderMaterial API はこれらの違いを自動的に処理するため、API 固有の詳細ではなくシェーダーロジックに集中できます。

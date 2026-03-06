---
title: WGSL の詳細
---

PlayCanvasエンジンで使用されるWGSLシェーダーは、特定の要件を満たす必要があります。これらの要件により、エンジンはシェーダーを正しく統合し、属性、ユニフォーム、バリイングなどの必要なリソースを確実に受け取ることができます。

以下のセクションでは、PlayCanvas用のWGSLシェーダーを記述する際の主要な側面について説明します。

### 簡略化されたシェーダーインターフェース構文

標準的なWGSL（WebGPUシェーディング言語）では、ユニフォーム、属性、バリイングを宣言する際に、各リソースに対して`@group`と`@binding`インデックスを明示的に指定する必要があります。これは冗長でエラーが発生しやすく、特に一般的なパターンでは問題となります。

使いやすさを向上させ、シェーダー開発を効率化するために、GLSLに似た簡略化された構文を採用しています。このモデルでは、`@group`や`@binding`属性を手動で指定する必要はありません。これらは事前定義されたレイアウトに基づいて、エンジンによって自動的に割り当てられ、管理されます。

#### 比較例

標準的なWGSL：

```wgsl
struct Uniforms {
    uTime: f32,
};

struct FragmentInput {
    @location(0) uv0: vec2f,
    @builtin(position) position: vec4f
};

@group(0) @binding(0) var<uniform> ub: Uniforms;

@fragment fn fragmentMain(FragmentInput) -> @location(0) vec4f {
    // 本体
}
```

対照的に、簡略化された構文では多くの定型コードを省略できます。

```wgsl
uniform uTime: f32;
varying uv0: vec2f;

@fragment fn fragmentMain(input: FragmentInput) -> FragmentOutput {
    // 本体
}
```

### 属性

属性は頂点ごとの入力データを定義し、頂点シェーダーでのみ使用できます。以下の構文を使用して宣言する必要があります：

```wgsl
attribute aUv0: vec2f;
```

内部的には、`VertexInput`構造体が自動的に作成され、すべての属性が格納されます。属性はメイン関数に渡される構造体からアクセスできますが、グローバルスコープでもアクセスできます。

```wgsl
attribute aUv0: vec2f;

@vertex fn vertexMain(input: VertexInput) -> VertexOutput {

    // メイン関数に渡されたinputを使用してアクセス
    var myUv1 = input.aUv0;

    // グローバル変数としてもアクセス可能（他の関数内で特に便利）
    var myUv2 = aUv0;
}
```

`VertexInput`構造体の一部として、およびグローバルスコープでも、これらの組み込み属性が自動的に利用可能です：

```wgsl
vertexIndex: @builtin(vertex_index)
instanceIndex: @builtin(instance_index)
```

属性名は、[ShaderMaterial](/user-manual/graphics/shaders/)を作成する際に`attributes`プロパティで指定した名前と一致する必要があります。

### ユニフォーム

ユニフォームは、エンジンからシェーダーに*数値リソース*を渡すために使用されます。

ユニフォームは以下の簡略化された構文を使用して宣言されます：

```wgsl
uniform view_position: vec3f;
uniform tints: array<vec3f, 4>;
uniform weights: array<f32, 8>;
```

内部的には、ユニフォームは自動的にユニフォームバッファに配置され、シェーダーコードでは`uniform.`プレフィックスを使用してアクセスされます：

```wgsl
var pos = uniform.view_position;
var color = uniform.tints[2];

// 配列で使用されるf32およびvec2<>型は、アラインメント要件のためにアラインされた構造体でラップされ、
// 値は`element`プロパティとして利用可能です。
// struct WrappedF32 { @size(16) element: f32 }
var weight = uniform.weights[3].element;
```

エンジンはレンダリング時に適切なユニフォーム値を自動的に設定します。

:::note

現在、ユニフォームシステムは`f32`、`i32`、`u32`を含む単純な型、およびベクトルと行列（例：`vec4f`、`mat4x4f`）のみをサポートしています。構造体は現時点ではサポートされていないため、すべてのユニフォーム値は基本型の個別の変数として宣言する必要があります。

:::

### テクスチャリソース

テクスチャリソースは簡略化されたWGSL構文を使用し、各リソースに対して`@group`と`@binding`インデックスを指定する必要はありません。

#### テクスチャのサンプリング

WGSLでは、GLSLとは異なり、テクスチャとサンプラーは別々のオブジェクトとして扱われます。

テクスチャをサンプリングする（フィルタリングされたテクセル値を取得する）場合、テクスチャオブジェクトの*直後に*サンプラーを提供する必要があります。

```wgsl
// サンプラー付き2Dテクスチャの宣言
var diffuseMap: texture_2d<f32>;
var diffuseMapSampler: sampler;

// テクスチャサンプリング
var texel = textureSample(diffuseMap, diffuseMapSampler, coords);
```

#### テクスチャのフェッチ

生のテクセルデータのみを読み取る必要がある場合（フィルタリング、ミップマッピング、アドレッシングモードなし）、`textureSample`の代わりに`textureLoad`を使用できます。これはノンフィルタアクセス、または単にテクセルフェッチと呼ばれます。

このような場合、サンプラーは必要ありませんし、許可されていません。例えば：

```wgsl
// サンプラーなしのキューブマップテクスチャ
var noSamplerMap: texture_cube<f32>;

// テクセルのフェッチ
let texel = textureLoad(noSamplerMap, coords, mipLevel);
```

#### フィルタリング不可テクスチャ

WebGPUはフィルタリング不可のfloatテクスチャをサポートしており、これは通常、フィルタリングが許可されていない深度テクスチャからのサンプリングなどの特殊な目的に使用されます。しかし、WGSLはこれらのフィルタリング不可floatテクスチャを宣言するための構文で明確なサンプルタイプを提供していません。この制限に対処し、シェーダー宣言に基づいた適切なバインドグループの自動生成を可能にするために、`uff`（unfilterable-float）という新しいサンプルタイプを導入しています。

`uff`を使用すると、シェーダーでフィルタリング不可floatテクスチャを明示的に宣言できます：

```wgsl
// 宣言
var colorMap: texture_2d<uff>;

// サンプリング
let data: vec4f = textureLoad(colorMap, uv, 0);
```

この拡張により、エンジンはテクスチャのサンプリング機能を正しく解釈し、適切にバインドできます。

:::note

`texture_external`のサポートはまだ利用できませんが、将来追加される予定です。

:::

### ストレージバッファ

ストレージバッファは、シェーダーがランダムアクセスで任意のデータを読み書きできるGPUアクセス可能なメモリリソースです。WGSLでは`var<storage>`を使用して宣言され、パーティクルシステム、コンピュートデータ、動的ジオメトリなどの大規模または構造化されたデータセットの処理に理想的です。ユニフォームとは異なり、ストレージバッファは読み取りと書き込みの両方のアクセスをサポートしています（適切なアクセス制御付き）。

頂点シェーダーでストレージバッファを使用する例：

```wgsl
struct Particle {
    position: vec3f,
    velocity: vec3f,
}

// 読み取り専用モードのパーティクルストレージバッファ
var<storage, read> particles: array<Particle>;
```

### 半精度型

デバイスが16ビット浮動小数点演算をサポートしている場合（`device.supportsShaderF16`）、シェーダーはネイティブWGSL半精度型を使用してパフォーマンスを向上させ、メモリ帯域幅を削減できます：

| ネイティブWGSL型 | 説明 |
|------------------|------|
| `f16` | 16ビット浮動小数点スカラー |
| `vec2h`, `vec3h`, `vec4h` | 16ビット浮動小数点ベクトル |
| `mat2x2h`, `mat3x3h`, `mat4x4h` | 16ビット浮動小数点行列 |

PlayCanvasは、サポートされている場合はf16型に、そうでない場合はf32型に自動的に解決される型エイリアスを提供します：

| エイリアス | f16サポート時 | f16非サポート時 |
|-----------|---------------|-----------------|
| `half` | `f16` | `f32` |
| `half2` | `vec2<f16>` | `vec2f` |
| `half3` | `vec3<f16>` | `vec3f` |
| `half4` | `vec4<f16>` | `vec4f` |
| `half2x2` | `mat2x2<f16>` | `mat2x2f` |
| `half3x3` | `mat3x3<f16>` | `mat3x3f` |
| `half4x4` | `mat4x4<f16>` | `mat4x4f` |

これらのエイリアスは頂点シェーダーとフラグメントシェーダーに自動的に含まれます。コンピュートシェーダーの場合は、`#include "halfTypesCS"`で含めます。

使用例：

```wgsl
// 中間計算にhalf型を使用
var color: half3 = half3(1.0, 0.5, 0.0);
var intensity: half = half(0.8);
var result: half3 = color * intensity;

// 必要に応じてf32に変換（例：出力用）
output.color = vec4f(vec3f(result), 1.0);
```

:::note

`device.supportsShaderF16`がtrueの場合、エンジンは自動的に`enable f16;`ディレクティブを追加し、条件付きコンパイル用に`CAPS_SHADER_F16`を定義します。WGSLではf16とf32間の明示的な型変換が必要です。精度間の変換には`half3(vec3fValue)`や`vec3f(half3Value)`などのコンストラクタを使用してください。

:::

### バリイング

バリイングは、頂点シェーダーからフラグメントシェーダーに値を渡すために使用されます。頂点シェーダーとフラグメントシェーダーの両方で、以下の簡略化された構文を使用して宣言します：

```wgsl
varying texCoord: vec2f;
```

内部的には、これらは解析され、頂点シェーダーでは`VertexOutput`構造体に、フラグメントシェーダーでは`FragmentInput`構造体に格納されます。

#### 頂点シェーダー

`VertexOutput`構造体の一部として、これらの組み込み変数が自動的に利用可能です：

```wgsl
position: @builtin(position)
```

例：

```wgsl
varying texCoord: vec2f;

@vertex fn vertexMain(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    output.position = uniform.matrix_viewProjection * pos;
    output.texCoord = vec2f(0.0, 1.0);
    return output;
}
```

#### フラグメントシェーダー

`FragmentInput`構造体の一部として、これらの組み込み変数が自動的に利用可能です：

```wgsl
position: @builtin(position)            // 補間されたフラグメント位置
frontFacing: @builtin(front_facing)     // 前面向き
sampleIndex: @builtin(sample_index)     // MSAAのサンプルインデックス
primitiveIndex: @builtin(primitive_index) // プリミティブインデックス（サポート時）
```

これらの組み込み変数は、以下の名前でグローバルスコープでも利用可能です：

```wgsl
pcPosition
pcFrontFacing
pcSampleIndex
pcPrimitiveIndex  // サポート時
```

:::note

`primitiveIndex` / `pcPrimitiveIndex`組み込み変数は、`device.supportsPrimitiveIndex`がtrueの場合にのみ利用可能です。この機能はWebGPU専用です（WebGL2では利用不可）。機能がサポートされている場合、エンジンは必要な`enable primitive_index;` WGSLディレクティブを自動的に追加し、条件付きコンパイル用のシェーダー定義`CAPS_PRIMITIVE_INDEX`が利用可能になります。

:::

例：

```wgsl
varying texCoord: vec2f;

@fragment
fn fragmentMain(input: FragmentInput) -> FragmentOutput {
    var output: FragmentOutput;
    output.color = vec4f(1.0);
    return output;
}
```

### フラグメントシェーダー出力

フラグメントシェーダーは、フレームバッファのレンダーターゲット（カラーアタッチメント）に書き込まれる1つ以上のカラー出力を生成する責任があります。

エンジンは`FragmentOutput`構造体を自動的に提供し、これには`color`、`color1`、`color2`などの定義済みvec4fフィールドのセットが含まれ、`GraphicsDevice.maxColorAttachments`で定義された制限までのすべての可能なカラーアタッチメントをカバーします。

`FragmentOutput`構造体の一部として、これらの組み込み変数が自動的に利用可能です：

```wgsl
fragDepth: @builtin(frag_depth)
```

例：

```wgsl
@fragment fn fragmentMain(input: FragmentInput) -> FragmentOutput {
    var output: FragmentOutput;
    output.color = vec4f(1.0);
    output.color1 = vec4f(0.5);
    output.fragDepth = 0.2;
    return output;
}
```

:::note

整数テクスチャへのレンダリング（`vec4f`以外の出力フォーマット）のサポートはまだ利用できませんが、将来追加される予定です。

:::

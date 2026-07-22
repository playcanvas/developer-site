---
title: WGSL リフレクション
description: "手動の bind group なしの簡略化された WGSL 宣言：PlayCanvas がシェーダーソースからリソースを反映しバインディングを割り当てる方法。"
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「WGSL リフレクション」で使用する Shader と Script アセットを Pull/Push モードでローカル編集し、変更を確認できます。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Shader アセットのテキストを読み取りまたは上書きし、それを使用するエンティティを設定して、シーンの起動やキャプチャでレンダリングを確認できます。

:::

PlayCanvas は WGSL シェーダーのソースからリソースを直接反映（リフレクト）します。ユニフォーム、テクスチャ、ストレージバッファを `@group`/`@binding` インデックスなしで宣言すると、エンジンがこれらの宣言を解析し、バインドグループ形式を構築してバインディングを自動的に割り当てます。この簡略化された構文は、頂点・フラグメント・コンピュートシェーダーで使用されます。

以下のセクションでは、リソースの宣言と反映の方法を説明します。頂点／フラグメント固有の構文（属性、バリイング、フラグメント出力）については、[WGSL 頂点・フラグメントシェーダー](/user-manual/graphics/shaders/wgsl-vertex-fragment-shaders) を参照してください。

### 簡略化されたシェーダーインターフェース構文

標準的なWGSL（WebGPUシェーディング言語）では、ユニフォーム、属性、バリイングを宣言する際に、各リソースに対して`@group`と`@binding`インデックスを明示的に指定する必要があります。これは冗長でエラーが発生しやすく、特に一般的なパターンでは問題となります。

使いやすさを向上させ、シェーダー開発を効率化するために、GLSLに似た簡略化された構文を採用しています。このモデルでは、`@group`や`@binding`属性を手動で指定してはいけません。エンジンはシェーダー処理中にそのようなアノテーションを取り除き、事前定義されたレイアウトに基づいてバインディングを再割り当てします。

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

この拡張により、エンジンはテクスチャのサンプリング機能を正しく解釈し、適切にバインドできます。内部的には、エンジンは出力されるWGSLで`texture_2d<uff>`を`texture_2d<f32>`に書き換え、`SAMPLETYPE_UNFILTERABLE_FLOAT`を持つ`BindTextureFormat`を自動的に生成します。

##### `uff`とサンプラーのペアリング

`uff`テクスチャは`sampler`宣言とペアにすることもでき、`textureSampleLevel`、`textureGather`、または`textureSample`のフィルタリングなしフォームを使用できます。これは、深度レンダーターゲットを生のfloatとして読み取るための標準的なパターンです（例：階層Zバッファ、深度認識ブラー、スクリーンスペースアンビエントオクルージョン）。

```wgsl
var srcDepth: texture_2d<uff>;
var srcDepthSampler: sampler;

// 明示的なミップレベルでのシングルタップサンプル読み取り。
let z = textureSampleLevel(srcDepth, srcDepthSampler, uv, 0.0).r;

// 2x2ギャザー（4つの隣接テクセルのrチャンネルを返します）。
let four = textureGather(0, srcDepth, srcDepthSampler, uv);
```

:::note

`uff`をサンプラーとペアにする場合、バインドする`pc.Texture`は**非フィルタリング**のサンプラー構成（通常は`minFilter: FILTER_NEAREST`、`magFilter: FILTER_NEAREST`、および`*_NEAREST`ミップフィルター）でなければなりません。フィルタリングサンプラーはフィルタリング可能なfloatテクスチャに対してのみ有効であり、フィルタリングサンプラーをフィルタリング不可floatテクスチャと組み合わせると、WebGPUは描画時にバインドグループを拒否します。

:::

##### 深度テクスチャをバインドする方法の選択

深度テクスチャ（任意の`pc.PIXELFORMAT_DEPTH*`形式）は、デバイスがオプションの`float32-filterable`機能を公開していない限り、WebGPU上で単なる`texture_2d<f32>`としてサンプリングすることはできません。必要な処理に基づいて正しい宣言を選択してください：

| ユースケース                                                       | WGSL宣言             | サンプラー                                                              |
| -------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------- |
| シャドウ比較（`textureSampleCompare*`）                              | `texture_depth_2d`  | `sampler_comparison`                                                  |
| フィルタリングなしの生の深度float（HZB、SSAO、深度認識ブラー）              | `texture_2d<uff>`   | 非フィルタリング`sampler`、または`textureLoad`使用時はサンプラーなし          |
| フィルタリングされた線形深度                                            | `texture_2d<f32>`   | フィルタリング`sampler` — デバイスの`float32-filterable`機能が必要         |

:::note

バインドグループ形式は、シェーダーのリソース宣言から派生します。作成後に`Shader`インスタンスの`meshBindGroupFormat`を変更しても、シェーダー処理がソースから再生成するため効果がありません。サンプルタイプを制御するには、後からバインドグループ形式を上書きするのではなく、テクスチャを`uff`（または他のサンプルタイプ固有のWGSLフォーム）で宣言してください。

:::

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

### ストレージテクスチャ

ストレージテクスチャを使うと、シェーダーはサンプラーなしでテクセルを直接書き込み（および必要に応じて読み取り）できます。最も一般的にはコンピュートシェーダーの出力として使用されます。簡略化された`texture_storage_*`構文で、フォーマットとアクセスモードを指定して宣言します：

```wgsl
// 書き込み専用ストレージテクスチャ（コンピュート出力の一般的なケース）
var outputTexture: texture_storage_2d<rgba8unorm, write>;

// テクセルの書き込み
textureStore(outputTexture, vec2i(global_id.xy), color);
```

アクセスモードは`write`、`read`、`read_write`のいずれかです。ストレージテクスチャの読み取り（`read` / `read_write`）には、`device.supportsStorageTextureRead`のサポートと、筆者が記述する`requires readonly_and_readwrite_storage_textures;`ディレクティブが必要です。[WGSL ケイパビリティ](/user-manual/graphics/shaders/wgsl-capabilities#wgsl-language-extensions)を参照してください。

バインドするテクスチャは`storage: true`オプションで作成する必要があります（[コンピュートシェーダー](/user-manual/graphics/shaders/compute-shaders)を参照）。

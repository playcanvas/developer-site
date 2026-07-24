---
title: コンピュートシェーダー（応用）
description: "WebGPU コンピュートシェーダーのバインドグループ手動制御：手書きの computeBindGroupFormat、明示的なバインディング、反映リソースとの混在。"
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「コンピュートシェーダー（応用）」について、次の要件を満たしてください: WebGPU コンピュートシェーダーのバインドグループ手動制御：手書きの computeBindGroupFormat、明示的なバインディング、反映リソースとの混在 アプリケーションを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 関連するスクリプトまたはシェーダーアセットに「コンピュートシェーダー（応用）」を実装し、次の要件を満たしてください: WebGPU コンピュートシェーダーのバインドグループ手動制御：手書きの computeBindGroupFormat、明示的なバインディング、反映リソースとの混在。Push の前に完全な差分と診断を確認してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Shader アセットのテキストを読み取りまたは上書きし、それを使用するエンティティを設定して、シーンの起動やキャプチャでレンダリングを確認してください。

:::

ほとんどのコンピュートシェーダーでは、[コンピュートシェーダー](/user-manual/graphics/shaders/compute-shaders) のページで説明している簡略化された構文だけで十分です。WGSL でリソースを宣言すれば、エンジンが自動的に反映します。

このページでは、バインドグループの **手動** 制御について説明します。これは現在も完全にサポートされています。リソースを記述する `computeBindGroupFormat`（および必要に応じて `computeUniformBufferFormats`）を自分で指定し、WGSL に明示的な `@group`/`@binding` インデックスを記述します。次のような場合に使用します：

- バインディングレイアウトを正確に制御したい
- 固定のバインディングでエンジンやアプリケーション所有のバッファと連携したい
- 明示的にバインドしたリソースと反映されるリソースを混在させたい

:::note

手動バインドグループは非推奨ではありません。`computeBindGroupFormat` を手書きしている既存のコンピュートシェーダーは、変更なしでそのまま動作します。都合のよいときに簡略化された構文へ移行しても、まったく移行しなくても構いません。

:::

## バインドグループフォーマット

`computeBindGroupFormat`は、コンピュートシェーダーで利用可能なリソースを定義します。これを指定する場合は、一致するように WGSL に明示的な `@group`/`@binding` インデックスを記述します。様々なタイプのリソースをバインドできます：

```javascript
const shader = new pc.Shader(device, {
    name: 'MyComputeShader',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: shaderCode,
    computeBindGroupFormat: new pc.BindGroupFormat(device, [
        // リソースバインディングをここに記述
    ])
});
```

### ストレージバッファ

ストレージバッファは、大量のデータへの読み書きアクセスを可能にします：

```javascript
// 読み書き可能なストレージバッファ
new pc.BindStorageBufferFormat('particles', pc.SHADERSTAGE_COMPUTE)

// 読み取り専用のストレージバッファ
new pc.BindStorageBufferFormat('spheres', pc.SHADERSTAGE_COMPUTE, true)
```

WGSLでは、ストレージバッファに以下のようにアクセスします：

```wgsl
@group(0) @binding(0) var<storage, read_write> particles: array<f32>;
@group(0) @binding(1) var<storage, read> spheres: array<vec4f>;
```

### ストレージテクスチャ

ストレージテクスチャは、コンピュートシェーダーがテクスチャに直接書き込むことを可能にします：

```javascript
new pc.BindStorageTextureFormat('outTexture', pc.PIXELFORMAT_RGBA8, pc.TEXTUREDIMENSION_2D)
```

WGSLでは：

```wgsl
@group(0) @binding(0) var outputTexture: texture_storage_2d<rgba8unorm, write>;

// テクスチャへの書き込み
textureStore(outputTexture, vec2i(global_id.xy), color);
```

### 入力テクスチャ

入力テクスチャは読み取り専用のテクスチャデータを提供します。最後のパラメータはサンプラーを含めるかどうかを制御します：

```javascript
// サンプラーなしのテクスチャ（textureLoad用）
new pc.BindTextureFormat('inputTexture', pc.SHADERSTAGE_COMPUTE, undefined, undefined, false)

// サンプラー付きのテクスチャ（textureSampleLevel用）
new pc.BindTextureFormat('inputTexture', pc.SHADERSTAGE_COMPUTE, undefined, undefined, true)
```

WGSLでは、サンプラーが含まれている場合、テクスチャ名に`_sampler`サフィックスを付けて使用します：

```wgsl
// サンプラーなし - 直接テクセルアクセスにtextureLoadを使用
@group(0) @binding(0) var inputTexture: texture_2d<f32>;
let color = textureLoad(inputTexture, position, 0);

// サンプラー付き - フィルタリングされたサンプリングにtextureSampleLevelを使用
@group(0) @binding(0) var inputTexture: texture_2d<f32>;
@group(0) @binding(1) var inputTexture_sampler: sampler;
let color = textureSampleLevel(inputTexture, inputTexture_sampler, uv, 0.0);
```

:::note

コンピュートシェーダーでは、ミップレベル（LOD）を明示的に指定する必要があるため、`textureSample`の代わりに`textureSampleLevel`を使用してください。

:::

### ユニフォームバッファ

コンピュートシェーダーにユニフォームデータを渡すには、まずユニフォームバッファフォーマットを定義します：

```javascript
const uniformBufferFormat = new pc.UniformBufferFormat(device, [
    new pc.UniformFormat('tint', pc.UNIFORMTYPE_VEC4),
    new pc.UniformFormat('time', pc.UNIFORMTYPE_FLOAT),
    new pc.UniformFormat('count', pc.UNIFORMTYPE_UINT)
]);
```

次に、バインドグループとともにシェーダー定義に含めます：

```javascript
const shader = new pc.Shader(device, {
    name: 'ComputeShader',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: shaderCode,

    // ユニフォームバッファフォーマットを割り当て
    computeUniformBufferFormats: {
        ub: uniformBufferFormat
    },

    // バインドグループにユニフォームバッファを含める
    computeBindGroupFormat: new pc.BindGroupFormat(device, [
        new pc.BindUniformBufferFormat('ub', pc.SHADERSTAGE_COMPUTE),
        // ... その他のバインディング
    ])
});
```

WGSLでは：

```wgsl
struct ub_compute {
    tint: vec4f,
    time: f32,
    count: u32
}

@group(0) @binding(0) var<uniform> ubCompute: ub_compute;

@compute @workgroup_size(1, 1, 1)
fn main(@builtin(global_invocation_id) global_id: vec3u) {
    let t = ubCompute.time;
    let c = ubCompute.count;
}
```

## 反映リソースと手動リソースの混在

呼び出し側が指定する `computeBindGroupFormat` と、簡略化された（反映される）構文は、同じシェーダー内で併用できます：

- `computeBindGroupFormat` に記述したリソースは、指定したバインディングで **グループ 0** に配置されます。
- 簡略化された構文（`@group`/`@binding` なし）で宣言したリソースは引き続き反映され、**インデックス 1 の別のバインドグループ** に配置されます。
- WGSL 内の明示的な（`@group`/`@binding` 付きの）宣言はそのまま保持されます。

`computeBindGroupFormat` を指定しない場合、反映されるリソースはグループ 0 に配置されます（[コンピュートシェーダー](/user-manual/graphics/shaders/compute-shaders) を参照）。

いずれの場合も、リソースが手動バインドか反映かにかかわらず、値は `setParameter` で名前によって割り当てられます。

## サンプル

以下のサンプルは手書きのバインドグループフォーマットを使用しています：

<EngineExample id="compute/histogram" title="Histogram" />

<EngineExample id="compute/texture-gen" title="Texture Generation" />

<EngineExample id="compute/indirect-dispatch" title="Indirect Dispatch" />

---
title: WGSL ケイパビリティ
description: "デバイス依存の任意の WGSL 機能：半精度型と WGSL 言語拡張、およびそれらの CAPS_* 定義。"
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「WGSL ケイパビリティ」で使用する Shader と Script アセットを Pull/Push モードでローカル編集し、変更を確認できます。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Shader アセットのテキストを読み取りまたは上書きし、それを使用するエンティティを設定して、シーンの起動やキャプチャでレンダリングを確認できます。

:::

このページでは、デバイスのサポートに依存する任意の WGSL 機能について説明します。エンジンは各ケイパビリティを `device.supports*` フラグと対応する `CAPS_*` プリプロセッサ定義で公開し、必要に応じて `enable …;` / `requires …;` ディレクティブを生成される WGSL に注入します。これらの機能は頂点・フラグメント・コンピュートシェーダーにわたって利用できます。

### 半精度型 {#half-precision-types}

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

### WGSL 言語拡張 {#wgsl-language-extensions}

デバイス作成時に、エンジンは `navigator.gpu.wgslLanguageFeatures` を読み取り、任意の言語機能用に必要な `enable …;` および `requires …;` ディレクティブを生成される WGSL に付加します。シェーダー側では、対応する `CAPS_*` 定義（`Shader` 定義の `vertexDefines` / `fragmentDefines` / `cdefines` とマージ）で分岐できます。

- **`device.supportsShaderF16`**
  - **エンジンが注入:** `enable f16;`
  - **プリプロセッサ定義:** `CAPS_SHADER_F16`
  - **シェーダー段階:** 頂点、フラグメント、コンピュート
  - **説明:** 本ページの [半精度型](#half-precision-types) および、エンジンが付与する `half` / `half2` などのエイリアス
- **`device.supportsPrimitiveIndex`**
  - **エンジンが注入:** `enable primitive_index;`
  - **プリプロセッサ定義:** `CAPS_PRIMITIVE_INDEX`
  - **シェーダー段階:** フラグメント
  - **説明:** 簡略 API では、対応端末向けに `FragmentInput` の `primitiveIndex` およびグローバル `pcPrimitiveIndex`
- **`device.supportsSubgroups`**
  - **エンジンが注入:** `enable subgroups;`
  - **プリプロセッサ定義:** `CAPS_SUBGROUPS`
  - **シェーダー段階:** フラグメントとコンピュート
  - **説明:** サブグループ組み込み（`subgroupBroadcast` 等）。`device.supportsSubgroupUniformity` 専用の `requires` / `enable` は追加されず、subgroups 機能と合わせて扱う
- **`device.supportsSubgroupId`**
  - **エンジンが注入:** `requires subgroup_id;`
  - **プリプロセッサ定義:** `CAPS_SUBGROUP_ID`
  - **シェーダー段階:** その `Shader` 定義に応じ、エンジンが WGSL へコンパイルする段階（使用する各段階向けのモジュール）
  - **説明:** ワークグループ内の `subgroup_id` / `num_subgroups` 組み込み
- **`device.supportsLinearIndexing`**
  - **エンジンが注入:** `requires linear_indexing;`（**コンピュート** エントリのモジュールのみ。頂点・フラグメントには入れない）
  - **プリプロセッサ定義:** `CAPS_LINEAR_INDEXING`
  - **シェーダー段階:** コンピュート
  - **説明:** `global_invocation_index` / `workgroup_index`。解説: [WebGPU 147-148](https://developer.chrome.com/blog/new-in-webgpu-147-148#wgsl_linear_indexing_extension)
- **`device.supportsStorageTextureRead`**
  - **エンジンが注入:** *なし* — ストレージテクスチャを読む場合は、WGSL 内に `requires readonly_and_readwrite_storage_textures;` を自前で記述
  - **プリプロセッサ定義:** `CAPS_STORAGE_TEXTURE_READ`（デバイスがストレージテクスチャの読み取りに対応しているときに有効。コードパス分岐用）
  - **シェーダー段階:** 機能を使う場合にコンピュート
  - **説明:** エンジンは能力の宣言のみ。`requires` は必ず筆者が書く想定
- **`device.supportsUnrestrictedPointerParameters`**
  - **エンジンが注入:** `requires unrestricted_pointer_parameters;`
  - **プリプロセッサ定義:** `CAPS_UNRESTRICTED_POINTER_PARAMETERS`
  - **シェーダー段階:** 頂点・フラグメント・コンピュート
  - **説明:** `storage`・`uniform`・`workgroup` アドレス空間のポインタを関数の引数として渡せるようにします
- **`device.supportsPointerCompositeAccess`**
  - **エンジンが注入:** `requires pointer_composite_access;`
  - **プリプロセッサ定義:** `CAPS_POINTER_COMPOSITE_ACCESS`
  - **シェーダー段階:** 頂点・フラグメント・コンピュート
  - **説明:** 複合型へのポインタのデリファレンスの糖衣構文。`(*p).field` や `(*p)[i]` の代わりに `p.field` や `p[i]` と書けます
- **`device.supportsPacked4x8IntegerDotProduct`**
  - **エンジンが注入:** `requires packed_4x8_integer_dot_product;`
  - **プリプロセッサ定義:** `CAPS_PACKED_4X8_INTEGER_DOT_PRODUCT`
  - **シェーダー段階:** 頂点・フラグメント・コンピュート
  - **説明:** 8ビットパック整数の内積向け DP4a 系の組み込み関数（`dot4U8Packed`、`dot4I8Packed`、および `pack4x{I,U}8`、`pack4x{I,U}8Clamp`、`unpack4x{I,U}8` ヘルパー）を公開します。量子化推論や整数中心のコンピュートに有用
- **`device.supportsTextureAndSamplerLet`**
  - **エンジンが注入:** `requires texture_and_sampler_let;`
  - **プリプロセッサ定義:** `CAPS_TEXTURE_AND_SAMPLER_LET`
  - **シェーダー段階:** 頂点・フラグメント・コンピュート
  - **説明:** テクスチャ・サンプラー変数を `let` バインディングに代入できるようにします（バインドレス的な間接参照パターンへの準備）

使用例（コンピュート）— `CAPS_LINEAR_INDEXING` があるときは線形のワークグループ番号を使い、なければ従来の方法で求めます。

```wgsl
@compute @workgroup_size(64, 1, 1)
fn main(
    @builtin(global_invocation_id) global_id: vec3u,
    @builtin(num_workgroups) nwg: vec3u,
#ifdef CAPS_LINEAR_INDEXING
    @builtin(workgroup_index) flat_wg: u32,
#endif
) {
#ifdef CAPS_LINEAR_INDEXING
    let wg = flat_wg;
#else
    let wg = global_id.x; // 1D ディスパッチ; 2D/3D は必要に応じて拡張
#endif
    _ = wg;
}
```

---
title: シェーダープリプロセッサ
description: コンパイル前に GLSL、WGSL、コンピュートシェーダーへ適用される C スタイルの define、include、ifdef チェーン。
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「シェーダープリプロセッサ」について、次の要件を満たしてください: コンパイル前に GLSL、WGSL、コンピュートシェーダーへ適用される C スタイルの define、include、ifdef チェーン アプリケーションを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 関連するスクリプトまたはシェーダーアセットに「シェーダープリプロセッサ」を実装し、次の要件を満たしてください: コンパイル前に GLSL、WGSL、コンピュートシェーダーへ適用される C スタイルの define、include、ifdef チェーン。Push の前に完全な差分と診断を確認してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Shader アセットのテキストを読み取りまたは上書きし、それを使用するエンティティを設定して、シーンの起動やキャプチャでレンダリングを確認してください。

:::

シェーダーがコンパイルされる前に、PlayCanvas はソースコードに C スタイルのプリプロセッサを適用します。これにより、シェーダーのバリエーション管理、条件付きインクルード、値の注入が行えます。プリプロセッサは GLSL、WGSL、コンピュートシェーダーで動作します。

## プリプロセッサディレクティブ

次のディレクティブがサポートされています。

### define と undef

```glsl
#define FEATURE_ENABLED
#define MAX_LIGHTS 4
#define MULTIPLIER 2.5

#undef FEATURE_ENABLED
```

定義は単純なフラグ（値なし）にすることも、値に関連付けることもできます。

### 条件付きコンパイル

```glsl
#ifdef FEATURE_ENABLED
    // Code included only if FEATURE_ENABLED is defined
#endif

#ifndef FEATURE_ENABLED
    // Code included only if FEATURE_ENABLED is NOT defined
#endif

#if defined(FEATURE_A) && defined(FEATURE_B)
    // Code included if both FEATURE_A and FEATURE_B are defined
#endif

#if MAX_LIGHTS > 2
    // Code included if MAX_LIGHTS is greater than 2
#endif
```

### if-else-elif チェーン

```glsl
#if QUALITY == 0
    // Low quality path
#elif QUALITY == 1
    // Medium quality path
#else
    // High quality path
#endif
```

### 論理演算子

プリプロセッサは `&&`（AND）、`||`（OR）、`!`（NOT）をサポートします。

```glsl
#if defined(FEATURE_A) && !defined(FEATURE_B)
    // FEATURE_A is defined but FEATURE_B is not
#endif

#if defined(FEATURE_A) || defined(FEATURE_B)
    // At least one of FEATURE_A or FEATURE_B is defined
#endif
```

### 比較演算子

サポートされる演算子：`==`、`!=`、`<`、`<=`、`>`、`>=`

```glsl
#if MAX_LIGHTS >= 4
    // 4 or more lights supported
#endif

#if QUALITY != 0
    // Not low quality
#endif
```

### include ディレクティブ

`#include` ディレクティブは、登録済みのシェーダーチャンクから内容を挿入します。

```glsl
#include "chunkName"
```

例として、Engine が提供するチャンクをインクルードするには：

```glsl
#include "gammaPS"
#include "tonemappingPS"
```

#### カスタムシェーダーチャンクの登録

カスタムインクルードを追加する推奨方法は、`ShaderChunks` に登録することです。GLSL と WGSL の両方を用意でき、Engine が適切な方を自動的に使います。

```javascript
// Get the shader chunks for each language
const chunksGLSL = pc.ShaderChunks.get(device, pc.SHADERLANGUAGE_GLSL);
const chunksWGSL = pc.ShaderChunks.get(device, pc.SHADERLANGUAGE_WGSL);

// Register your custom chunk in both languages
chunksGLSL.set('myUtilsPS', `
    float myHelper(float x) {
        return x * 2.0;
    }
`);

chunksWGSL.set('myUtilsPS', `
    fn myHelper(x: f32) -> f32 {
        return x * 2.0;
    }
`);
```

登録後、シェーダー内で `#include` によりチャンクを使います。

```glsl
#include "myUtilsPS"

void main() {
    float result = myHelper(0.5);
}
```

#### ループ付きインクルード

ループカウンタ付きでチャンクを複数回インクルードできます。

```glsl
#define LIGHT_COUNT 4
#include "lightPS, LIGHT_COUNT"
```

`lightPS` が 4 回インクルードされ、チャンク内の `{i}` は `0`、`1`、`2`、`3` に置き換えられます。

## インジェクション define と通常の define

プリプロセッサは、構文によって区別される 2 種類の define をサポートします。

### 通常の define

通常の define は `#ifdef` や `#if` などのプリプロセッサディレクティブで使います。

```glsl
#define FEATURE_ENABLED
#define MAX_LIGHTS 4

#ifdef FEATURE_ENABLED
    // This code is included
#endif

#if MAX_LIGHTS > 2
    // This code is included
#endif
```

GLSL では、配列サイズなどの文脈で define をネイティブに使えます。

```glsl
#define SAMPLE_COUNT 8
float samples[SAMPLE_COUNT];
```

ただし WGSL ではこれはサポートされません。代わりに `{NAME}` 構文のインジェクション define を使ってください。

### インジェクション define（中括弧構文）

インジェクション define は中括弧 `{NAME}` を使い、シェーダーソース全体に直接文字列置換を行います（プリプロセッサディレクティブ行は除く）。

```glsl
#define {WORKGROUP_SIZE} 64

@compute @workgroup_size({WORKGROUP_SIZE}, 1, 1)
fn main() {
    var<workgroup> data: array<f32, {WORKGROUP_SIZE}>;
}
```

プリプロセス後は次のようになります。

```glsl
@compute @workgroup_size(64, 1, 1)
fn main() {
    var<workgroup> data: array<f32, 64>;
}
```

インジェクション define は特に次の場合に便利です。

- WGSL のワークグループサイズ（コンパイル時定数である必要がある）
- プリプロセッサ以外の文脈に現れる必要がある値
- `#if` の置換をサポートしないシェーダーコードのパラメータ化

## シェーダーへの define の渡し方

### ShaderMaterial の define

`ShaderMaterial` では `setDefine()` を使います。

```javascript
material.setDefine('USE_TEXTURE', true);
material.setDefine('MAX_LIGHTS', '4');
```

### シェーダー定義の define

`ShaderMaterial` を使わずにプログラムでシェーダーを作成する場合、define を渡せます。

#### 頂点シェーダーとフラグメントシェーダー

`ShaderUtils.createShader()` で、define 付きの頂点／フラグメントシェーダーを作成します。

```javascript
const shader = pc.ShaderUtils.createShader(device, {
    uniqueName: 'MyShader',
    vertexGLSL: vertexCodeGLSL,
    vertexWGSL: vertexCodeWGSL,
    fragmentGLSL: fragmentCodeGLSL,
    fragmentWGSL: fragmentCodeWGSL,
    vertexDefines: definesMap,
    fragmentDefines: definesMap
});
```

#### コンピュートシェーダー

コンピュートシェーダーは `Shader` クラスで直接作成します。

```javascript
const shader = new pc.Shader(device, {
    name: 'MyComputeShader',
    shaderLanguage: pc.SHADERLANGUAGE_WGSL,
    cshader: computeCode,
    cincludes: includesMap,  // Custom includes for compute shader
    cdefines: definesMap     // Defines for compute shader
});
```

### includes マップ

includes マップは `#include` ディレクティブの内容を提供します。

```javascript
const includesMap = new Map([
    ['myChunk', 'float helper() { return 1.0; }'],
    ['anotherChunk', '// More shader code...']
]);
```

Engine が提供するチャンクも使えます。

```javascript
cincludes: pc.ShaderChunks.get(device, pc.SHADERLANGUAGE_WGSL)
```

### defines マップ

defines マップでは、キーを define 名（インジェクション define の場合は中括弧を含む）にします。

```javascript
// Regular defines (for #ifdef, #if)
const definesMap = new Map([
    ['FEATURE_ENABLED', ''],      // Flag define (no value)
    ['MAX_LIGHTS', '4']           // Value define
]);

// Injection defines (for direct replacement)
const definesMap = new Map([
    ['{WORKGROUP_SIZE}', '64'],
    ['{TILE_SIZE}', '16']
]);
```

## ベストプラクティス

1. **`#ifdef` や `#if` による条件付きコンパイルには通常の define** を使う
2. **プリプロセッサ以外の文脈での直接置換が必要なときはインジェクション define `{NAME}`** を使う
3. **利用可能なら Engine のチャンクを優先**し、プラットフォーム間の互換性を確保する

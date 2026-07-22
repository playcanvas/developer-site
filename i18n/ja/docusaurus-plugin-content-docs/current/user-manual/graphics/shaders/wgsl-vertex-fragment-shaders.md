---
title: WGSL 頂点・フラグメントシェーダー
description: "PlayCanvas における頂点・フラグメント固有の WGSL 構文：属性、バリイング、フラグメント出力。"
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「WGSL 頂点・フラグメントシェーダー」で使用する Shader と Script アセットを Pull/Push モードでローカル編集し、変更を確認できます。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Shader アセットのテキストを読み取りまたは上書きし、それを使用するエンティティを設定して、シーンの起動やキャプチャでレンダリングを確認できます。

:::

このページでは、頂点シェーダーとフラグメントシェーダーに固有の WGSL 構文（属性、バリイング、フラグメント出力）について説明します。

すべてのシェーダー段階で共有されるリソース（ユニフォーム、テクスチャ、ストレージバッファ。簡略化された構文で宣言され、バインドグループへ自動的に反映されます）については、[WGSL リフレクション](/user-manual/graphics/shaders/wgsl-reflection) を参照してください。

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

`primitiveIndex` / `pcPrimitiveIndex` 組み込み変数は、`device.supportsPrimitiveIndex` が true の場合にのみ利用可能です。この機能は WebGPU 専用です（WebGL2 では利用不可）。`enable primitive_index;` および `CAPS_PRIMITIVE_INDEX` については [WGSL 言語拡張](/user-manual/graphics/shaders/wgsl-capabilities#wgsl-language-extensions) を参照してください。

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

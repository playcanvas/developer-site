---
title: シェーダー
---

3DモデルをPlayCanvasにインポートすると、デフォルトで当社の[Physical Material][1]が使用されます。これは、レンダリングの多くのニーズをカバーできる多用途なマテリアルタイプです。

しかし、マテリアルに特殊効果や特殊なケースを適用したいと思うことがよくあります。これを行うには、カスタムシェーダーを記述する必要があります。この場合、`ShaderMaterial`を使用する必要があります。

`ShaderMaterial`のインスタンスを作成する手順は次のとおりです。

シェーダーの記述を作成します。

```javascript
const shaderDesc = {
    uniqueName: 'MyShader',
    shaderLanguage: pc.SHADERLANGUAGE_GLSL,
    vertexCode: `
        // 頂点シェーダーのソースコードを記述します
    `,
    fragmentCode: `
        // フラグメントシェーダーのソースコードを記述します
    `,
    attributes: {
        aPosition: pc.SEMANTIC_POSITION,
        aUv0: pc.SEMANTIC_TEXCOORD0
    }
};
```

次に、レンダリングに使用できるマテリアルのインスタンスを作成します。

```javascript
const material = new pc.ShaderMaterial(shaderDesc);
```

シェーダーのソースコードは、WebGL2またはWebGPUプラットフォームをターゲットにする場合はGLSLで、WebGPUのみをターゲットにする場合はWGSLで記述できます。

:::note

GLSLシェーダーを記述した場合、WebGL2プラットフォームで直接サポートされます。しかし、WebGPUプラットフォームでは、GLSLシェーダーはWASMトランスパイラを使用してWGSLへのトランスパイルが必要です。このトランスパイルステップを避け、シェーダーコンパイルに関連するネイティブパフォーマンスを達成し、WASMファイルの追加ダウンロードを避けるために、WebGPUプラットフォーム向けにWGSLで同等のシェーダーを記述することを検討することをお勧めします。これは直接サポートされています。

:::

## プリプロセッサー {#preprocessor}

シェーダーが使用される前に、プリプロセッシングステップが適用され、シェーダーのバリエーションを効果的に管理できます。

このプリプロセッシングステップは、一般的なCライクなプリプロセッサー構造に従い、`#define`、`#if`、`#else`、`#endif`などのディレクティブを処理します。これにより、シェーダーコードが異なるユースケース向けにどのようにコンパイルされ、カスタマイズされるかをきめ細かく制御できます。

### マテリアルシェーダーの定義 {#material-shader-defines}

シェーダーの定義はマテリアルごとに設定でき、シェーダーの動作を動的にカスタマイズできます。例：

```javascript
material.setDefine('USE_TEXTURE', true);
material.setDefine('FIRETYPE', 'RED');
```

これにより、以下の行がシェーダーソースに追加されます。

```glsl
#define USE_TEXTURE
#define FIRETYPE RED
```

その後、これらの定義をシェーダー内で条件ロジックに使用できます。

```glsl
#if defined(USE_TEXTURE)
// Apply texture-based rendering
#endif

#if FIRETYPE == RED
// Apply red fire effect
#endif
```

このシステムにより、複数のシェーダーファイルを必要とせずに柔軟なシェーダーバリエーションが可能になり、さまざまなマテリアルに合わせてレンダリングを簡単にカスタマイズできます。

### レンダーパスの定義 {#renderpass-defines}

エンジンは一部の定義を自動的に提供し、レンダーパスとの統合を可能にします。デフォルトでは、異なるレンダーパスに特化したコードを記述できるように、これら3つの定義のいずれかが提供されます。

```glsl
// 通常のフォワードパスで色をレンダリングするために定義されます
#define FORWARD_PASS

// シャドウレンダリングパスのために定義されます
// シェーダー出力の詳細は、使用されるシャドウタイプによって異なる場合があります
#define SHADOW_PASS

// `Picker`クラスがメッシュインスタンスIDをレンダリングするために使用するレンダーパスのために定義されます
#define SHADOW_PICK 
```

[`CameraComponent.setShaderPass`](https://api.playcanvas.com/engine/classes/CameraComponent.html#setshaderpass)を使用して作成されたカスタムレンダーパスを使用する場合、対応する定義が自動的に生成されます。例：

```javascript
camera.setRenderPass('custom');
```

これにより、以下の定義がシェーダーに追加されます。

```glsl
#define CUSTOM_PASS
```

### シェーダーのインクルード {#shader-includes}

エンジンは内部シェーダーをチャンクから構築します。これらは、最終的なシェーダーを形成するために結合される小さなシェーダー関数です。これらのチャンクは`ShaderMaterial`を使用したカスタムシェーダーでも使用でき、エンジンの機能を簡単に統合できます。

#### 頂点シェーダー {#vertex-shader}

エンジンは、一般的な変換、法線計算、その他の重要な操作を処理する事前定義されたシェーダーインクルードを提供します。これにより、カスタムシェーダーはスキニング、モーフィング、インスタンス化を自動的にサポートできます。

例：

```glsl
// エンジンが提供する変換関連の機能を含みます。
// - `vertex_position`アトリビュートを自動的に宣言します。
// - 必要に応じてスキニングとモーフィングを処理します。
// - 以下のユニフォームを追加します：
//   - `matrix_viewProjection`
//   - `matrix_model`
//   - `matrix_normal`
// - ユーティリティ関数を提供します：
//   - `getModelMatrix()`
//   - `getLocalPosition()`
#include "transformCoreVS"

// エンジンが提供する法線関連の機能を含みます。
// - `vertex_normal`アトリビュートを自動的に宣言します。
// - 必要に応じてスキニングとモーフィングを処理します。
// - ユーティリティ関数を提供します：
//   - `getNormalMatrix()`
//   - `getLocalNormal()`
#include "normalCoreVS"

void main(void)
{
    // スキニング、モーフィング、またはインスタンス化を考慮してモデル行列を取得します。
    mat4 modelMatrix = getModelMatrix();
    vec3 localPos = getLocalPosition(vertex_position.xyz);
    vec4 worldPos = modelMatrix * vec4(localPos, 1.0);

    // 法線行列を取得し、ワールド法線を計算します。
    mat3 normalMatrix = getNormalMatrix(modelMatrix);
    vec3 localNormal = getLocalNormal(vertex_normal);
    vec3 worldNormal = normalize(normalMatrix * localNormal);

    // 例：ワールド法線を使用してシンプルなラップアラウンド拡散ライティングを適用します。
    brightness = (dot(worldNormal, uLightDir) + 1.0) * 0.5;

    // ジオメトリを変換します。
    gl_Position = matrix_viewProjection * worldPos;
}
```

#### フラグメントシェーダー {#fragment-shader}

エンジンは、ガンマ補正、トーンマッピング、フォグなどの一般的な色処理効果のために含めることができる事前定義されたシェーダーチャンクを提供します。これらのインクルードにより、レンダリング設定に従って色が正しく処理されます。

使用例

```glsl
#include "gammaPS"       // 入出力のガンマ補正をサポートします
#include "tonemappingPS" // トーンマッピングをサポートします
#include "fogPS"         // フォグ効果をサポートします

void main(void)
{
    // リニアカラースペースで色を評価します
    vec3 colorLinear = ...;

    // 有効な場合はフォグを適用します
    vec3 fogged = addFog(colorLinear);

    // 有効な場合はトーンマッピングを適用します
    vec3 toneMapped = toneMap(fogged);

    // ガンマ補正を適用し、最終的な色を出力します
    gl_FragColor.rgb = gammaCorrectOutput(toneMapped);
    gl_FragColor.a = alpha;
}
```

これらの関数はエンジンの設定に基づいて自動的に構成され、異なるレンダリング条件下でも色処理が一貫していることを保証します。

:::note

より完全な例、およびインスタンス化の実装方法の詳細については、エンジンの例を参照してください。

:::

#### 生成されたシェーダー {#generated-shaders}

生成されたシェーダーを検査する必要がある場合は、これをスクリプトに追加できます

```javascript
pc.Tracing.set(pc.TRACEID_SHADER_ALLOC, true);
```

作成された各シェーダーはブラウザのコンソールにログとして記録され、そのソースコードを検査できます。例：

![sRGB](/img/user-manual/graphics/shaders/shader-log.png)

詳細については、[ShaderMaterial APIドキュメント](https://api.playcanvas.com/engine/classes/ShaderMaterial.html)を参照してください。

[1]: /user-manual/graphics/physical-rendering/physical-materials/

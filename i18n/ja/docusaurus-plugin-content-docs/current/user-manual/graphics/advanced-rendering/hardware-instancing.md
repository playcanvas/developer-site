---
title: ハードウェアインスタンシング
---

ハードウェアインスタンシング (Hardware instancing) は、GPUに複数の同一のメッシュを少数のドローコールでレンダリングする技術です。メッシュの各インスタンスは、異なる限定的な状態（例えば、位置、回転、スケール、色）を持つことができます。木や弾丸、パーティクル、または繰り返されるジオメトリを描画するのに適した技術です。

PlayCanvasはWebGL2以上を必要とするため、インスタンシングはすべてのデバイスでサポートされています。

また、すべてのインスタンスがレンダリング用にGPUに送信され、カメラフラスタムカリングは行われないことに注意してください。

## ライブサンプル

- [基本インスタンシング](https://playcanvas.vercel.app/#/graphics/instancing-basic) - デフォルトのMat4インスタンシングフォーマットとStandardMaterialのデモ
- [カスタムインスタンシング](https://playcanvas.vercel.app/#/graphics/instancing-custom) - カスタム頂点フォーマットとシェーダーチャンクのオーバーライド
- [GLBインスタンシング](https://playcanvas.vercel.app/#/graphics/instancing-glb) - GLBファイルのEXT_mesh_gpu_instancing拡張機能の使用
- [Goochインスタンシング](https://playcanvas.vercel.app/#/graphics/instancing-gooch) - インスタンシングをサポートする完全なカスタムShaderMaterial

## デフォルトフォーマットを使用した基本インスタンシング

インスタンシングを使用する最も簡単な方法は、インスタンスごとにMat4ワールド行列を格納するデフォルトのインスタンシングフォーマットを使用することです。

### ステップ1: インスタンス行列の準備

個々のインスタンスの行列をFloat32Arrayに格納します：

```javascript
// store matrices for individual instances into array
const instanceCount = 1000;
const matrices = new Float32Array(instanceCount * 16);
const matrix = new pc.Mat4();
const pos = new pc.Vec3();
const rot = new pc.Quat();
const scl = new pc.Vec3();

for (let i = 0; i < instanceCount; i++) {
    // set up position, rotation, scale for each instance
    pos.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
    rot.setFromEulerAngles(i * 30, i * 50, i * 70);
    scl.set(0.1, 0.1, 0.1);
    matrix.setTRS(pos, rot, scl);

    // copy matrix elements into array of floats
    for (let m = 0; m < 16; m++) {
        matrices[i * 16 + m] = matrix.data[m];
    }
}
```

### ステップ2: 頂点バッファの作成とインスタンシングの有効化

[`pc.VertexFormat.getDefaultInstancingFormat`](https://api.playcanvas.com/engine/classes/VertexFormat.html#getdefaultinstancingformat)を使用してVertexBufferを作成し、MeshInstanceでインスタンシングを有効にします：

```javascript
const vbFormat = pc.VertexFormat.getDefaultInstancingFormat(app.graphicsDevice);
const vertexBuffer = new pc.VertexBuffer(app.graphicsDevice, vbFormat, instanceCount, {
    data: matrices
});

// enable instancing on the mesh instance
const meshInst = entity.render.meshInstances[0];
meshInst.setInstancing(vertexBuffer);
```

### 動的更新

位置が毎フレーム変化する動的インスタンシングの場合、動的頂点バッファを作成して更新します：

```javascript
// create dynamic vertex buffer (no initial data)
const vertexBuffer = new pc.VertexBuffer(app.graphicsDevice, vbFormat, instanceCount, {
    usage: pc.BUFFER_DYNAMIC
});

// update per frame
vertexBuffer.setData(matrices);
```

## カスタム頂点フォーマット

より効率的なインスタンシングやカスタムのインスタンスごとのデータのために、デフォルトのMat4フォーマットの代わりにカスタム頂点フォーマットを定義できます。

### 例: 位置とスケールフォーマット

このフォーマットは、インスタンスごとに位置（3つのfloat）と均一スケール（1つのfloat）のみを格納し、インスタンスあたりのメモリを64バイトから16バイトに削減します：

```javascript
const vbFormat = new pc.VertexFormat(app.graphicsDevice, [
    { semantic: pc.SEMANTIC_ATTR12, components: 3, type: pc.TYPE_FLOAT32 }, // position
    { semantic: pc.SEMANTIC_ATTR13, components: 1, type: pc.TYPE_FLOAT32 }  // scale
]);

// store data for individual instances, 4 floats each
const instanceCount = 3000;
const data = new Float32Array(instanceCount * 4);

for (let i = 0; i < instanceCount; i++) {
    const offset = i * 4;
    data[offset + 0] = Math.random() * 10 - 5; // x
    data[offset + 1] = Math.random() * 10 - 5; // y
    data[offset + 2] = Math.random() * 10 - 5; // z
    data[offset + 3] = 0.1 + Math.random() * 0.1; // scale
}

const vertexBuffer = new pc.VertexBuffer(app.graphicsDevice, vbFormat, instanceCount, {
    data: data
});
```

カスタムフォーマットを使用する場合、データを解釈するためのカスタムシェーダーまたはシェーダーチャンクも提供する必要があります（以下のセクションを参照）。

## StandardMaterialシェーダーチャンク

カスタムインスタンシングフォーマットでStandardMaterialを使用する場合、カスタム属性からモデル行列がどのように計算されるかを定義するために、インスタンシングシェーダーチャンクをオーバーライドできます。

### ステップ1: マテリアル属性の設定

どのセマンティクスがどの属性名にマップされるかをマテリアルに伝えます：

```javascript
const material = new pc.StandardMaterial();
material.setAttribute('aInstPosition', pc.SEMANTIC_ATTR12);
material.setAttribute('aInstScale', pc.SEMANTIC_ATTR13);
```

### ステップ2: インスタンシングシェーダーチャンクのオーバーライド

GLSL（WebGL）とWGSL（WebGPU）の両方にカスタムシェーダーコードを提供します：

```javascript
material.getShaderChunks(pc.SHADERLANGUAGE_GLSL).set('transformInstancingVS', `
    attribute vec3 aInstPosition;
    attribute float aInstScale;

    mat4 getModelMatrix() {
        return mat4(
            vec4(aInstScale, 0.0, 0.0, 0.0),
            vec4(0.0, aInstScale, 0.0, 0.0),
            vec4(0.0, 0.0, aInstScale, 0.0),
            vec4(aInstPosition, 1.0)
        );
    }
`);

material.getShaderChunks(pc.SHADERLANGUAGE_WGSL).set('transformInstancingVS', `
    attribute aInstPosition: vec3f;
    attribute aInstScale: f32;

    fn getModelMatrix() -> mat4x4f {
        return mat4x4f(
            vec4f(aInstScale, 0.0, 0.0, 0.0),
            vec4f(0.0, aInstScale, 0.0, 0.0),
            vec4f(0.0, 0.0, aInstScale, 0.0),
            vec4f(aInstPosition, 1.0)
        );
    }
`);

material.update();
```

インスタンシングチャンクは、各インスタンスのワールド行列を返す`getModelMatrix()`関数を実装する必要があります。

## インスタンシングを使用したカスタムシェーダー

インスタンシングをサポートする完全なカスタムシェーダー（ShaderMaterialを使用）を書く場合、`INSTANCING`プリプロセッサ定義を使用して、インスタンシングコードを条件付きで含めます：

### GLSLの例

```glsl
#include "transformCoreVS"

#if INSTANCING
    attribute vec3 aInstPosition;
    attribute float aInstScale;

    mat4 getModelMatrix() {
        return mat4(
            vec4(aInstScale, 0.0, 0.0, 0.0),
            vec4(0.0, aInstScale, 0.0, 0.0),
            vec4(0.0, 0.0, aInstScale, 0.0),
            vec4(aInstPosition, 1.0)
        );
    }
#endif

void main(void) {
    mat4 modelMatrix = getModelMatrix();
    vec3 localPos = getLocalPosition(vertex_position.xyz);
    vec4 worldPos = modelMatrix * vec4(localPos, 1.0);
    gl_Position = matrix_viewProjection * worldPos;
}
```

### WGSLの例

```wgsl
#include "transformCoreVS"

#if INSTANCING
    attribute aInstPosition: vec3f;
    attribute aInstScale: f32;

    fn getModelMatrix() -> mat4x4f {
        return mat4x4f(
            vec4f(aInstScale, 0.0, 0.0, 0.0),
            vec4f(0.0, aInstScale, 0.0, 0.0),
            vec4f(0.0, 0.0, aInstScale, 0.0),
            vec4f(aInstPosition, 1.0)
        );
    }
#endif

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    let modelMatrix: mat4x4f = getModelMatrix();
    let localPos: vec3f = getLocalPosition(input.vertex_position.xyz);
    let worldPos: vec4f = modelMatrix * vec4f(localPos, 1.0);
    output.position = uniform.matrix_viewProjection * worldPos;
    return output;
}
```

`#if INSTANCING`ガードにより、同じシェーダーがインスタンシングされたレンダリングとされていないレンダリングの両方で動作します。インスタンシングが有効でない場合、エンジンはデフォルトの`getModelMatrix()`実装を提供します。

### カスタムシェーダーでのデフォルトMat4フォーマットの使用

デフォルトのインスタンシングフォーマット（インスタンスごとのMat4）を使用する場合、4つの`instance_line`属性から行列を読み取ります：

```glsl
attribute vec4 instance_line1;
attribute vec4 instance_line2;
attribute vec4 instance_line3;
attribute vec4 instance_line4;

mat4 getModelMatrix() {
    return mat4(instance_line1, instance_line2, instance_line3, instance_line4);
}
```

## GLBインスタンシング

GLB/glTFファイルは、[`EXT_mesh_gpu_instancing`](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing/README.md)拡張機能を介してインスタンシングデータを含めることができます。このようなファイルを読み込むと、PlayCanvasは自動的にインスタンシングを設定します：

```javascript
const entity = assets.glb.resource.instantiateRenderEntity({
    castShadows: true
});
app.root.addChild(entity);
```

これは、インスタンス化されたジオメトリのエクスポートをサポートするBlenderなどのツールで作成されたシーンに便利です。

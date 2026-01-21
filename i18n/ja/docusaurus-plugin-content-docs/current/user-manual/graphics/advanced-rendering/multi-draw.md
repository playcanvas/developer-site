---
title: マルチドロー
---

マルチドロー（Multi-draw）は、エンジンが単一のAPI呼び出しで複数のサブドローを送信できるレンダリング技術です。複数のジオメトリは単一のMeshに結合され、単一のMeshInstanceを通じてレンダリングされ、各サブドローは結合されたジオメトリの異なる部分をターゲットにします。これにより、同じマテリアルとレンダー状態を共有する多くのサブメッシュをレンダリングする際のCPUオーバーヘッドが削減され、パフォーマンスが向上します。

## ユースケース

マルチドローは以下のような場合に特に有用です：

- **地形レンダリング** - 地形をパッチに分割し、すべての可視パッチを1回の呼び出しでレンダリングし、隠れたパッチを動的にカリング
- **結合ジオメトリ** - 複数のジオメトリを単一のメッシュに結合し、異なる部分を異なるインスタンス数でレンダリング
- **LODシステム** - ドローコールを変更せずにサブメッシュを切り替え
- **カリングシステム** - マテリアルの変更なしにジオメトリの一部を表示/非表示

## プラットフォームサポート

`GraphicsDevice.supportsMultiDraw`を使用してマルチドローのサポートを確認します：

```javascript
if (app.graphicsDevice.supportsMultiDraw) {
    // マルチドローを使用
} else {
    // 標準レンダリングにフォールバック
}
```

- **WebGPU**: 常にサポート（間接描画コマンドを使用）
- **WebGL2**: `WEBGL_multi_draw`拡張機能を介してほとんどのデバイスでサポート

`supportsMultiDraw`がfalseの場合、エンジンはマルチドローデータを使用して単一ドローコールの内部ループに自動的にフォールバックします。これはマルチドローの完全なパフォーマンス利点を提供しませんが、マテリアルとレンダー状態が一度だけ設定されるため、個別のMeshInstanceを持つ別々のジオメトリをレンダリングするよりも大幅に高速です。

## ライブサンプル

- [マルチドロー](https://playcanvas.vercel.app/#/graphics/multi-draw) - 動的パッチカリングを使用した地形レンダリング
- [マルチドローインスタンス](https://playcanvas.vercel.app/#/graphics/multi-draw-instanced) - インスタンシングを使用した異なるジオメトリ（WebGPUのみ）
- [マルチドローインスタンス マルチプラットフォーム](https://playcanvas.vercel.app/#/graphics/multi-draw-instanced-multi-platform) - クロスプラットフォームのインスタンス化マルチドロー

## 基本的なマルチドロー

マルチドローの最も簡単な使い方は、結合されたメッシュからサブメッシュをレンダリングすることです。

### ステップ1: 結合メッシュの作成

複数のジオメトリを単一のメッシュに結合し、各サブメッシュのインデックスオフセットとカウントを追跡します：

```javascript
// サブドロー情報を追跡
const subDraws = [];
let indexOffset = 0;

// ジオメトリを結合
const positions = [];
const indices = [];
let vertexBase = 0;

for (const geometry of geometries) {
    // サブドロー情報を保存
    subDraws.push({
        firstIndex: indexOffset,
        indexCount: geometry.indices.length
    });

    // 位置を追加
    positions.push(...geometry.positions);

    // オフセット付きでインデックスを追加
    for (const idx of geometry.indices) {
        indices.push(vertexBase + idx);
    }

    vertexBase += geometry.positions.length / 3;
    indexOffset += geometry.indices.length;
}

// 結合メッシュを作成
const mesh = new pc.Mesh(app.graphicsDevice);
mesh.setPositions(positions);
mesh.setIndices(indices);
mesh.update();
```

### ステップ2: マルチドローの設定

`MeshInstance.setMultiDraw()`を使用してドローコマンドを割り当て、それらを設定します：

```javascript
const meshInst = new pc.MeshInstance(mesh, material);

// 最大サブドロー数でマルチドローを割り当て
const cmd = meshInst.setMultiDraw(null, subDraws.length);

// 各サブドローを追加
for (let i = 0; i < subDraws.length; i++) {
    const sub = subDraws[i];
    // add(index, indexCount, instanceCount, firstIndex, baseVertex, firstInstance)
    cmd.add(i, sub.indexCount, 1, sub.firstIndex, 0, 0);
}

// アクティブなドロー数でファイナライズ
cmd.update(subDraws.length);
```

### ステップ3: 動的更新

サブドローを表示/非表示にするために、毎フレームドローコマンドを更新できます：

```javascript
app.on('update', (dt) => {
    let activeCount = 0;

    for (let i = 0; i < subDraws.length; i++) {
        // このサブドローが可視かどうかを確認（例：フラスタムカリング）
        if (isVisible(subDraws[i])) {
            cmd.add(activeCount, subDraws[i].indexCount, 1, subDraws[i].firstIndex, 0, 0);
            activeCount++;
        }
    }

    // 実際の可視ドロー数で更新
    cmd.update(activeCount);
});
```

## インスタンシングを使用したマルチドロー

マルチドローはハードウェアインスタンシングと組み合わせて、異なるジオメトリを異なるインスタンス数で単一の呼び出しでレンダリングできます。

### WebGPUアプローチ

WebGPUでは、`firstInstance`パラメータを使用して、各サブドローがインスタンスデータをどこから読み取るかを指定できます：

```javascript
// 異なるインスタンス数を持つ3つのジオメトリ
const instanceCounts = [8, 15, 25];
const totalInstances = instanceCounts.reduce((a, b) => a + b, 0);

// すべてのインスタンスのインスタンスデータを作成
const matrices = new Float32Array(totalInstances * 16);
// ... 行列を設定 ...

// インスタンシング頂点バッファを作成
const vbFormat = pc.VertexFormat.getDefaultInstancingFormat(app.graphicsDevice);
const vb = new pc.VertexBuffer(app.graphicsDevice, vbFormat, totalInstances, {
    data: matrices
});
meshInst.setInstancing(vb);

// firstInstanceオフセットでマルチドローを設定
const firstInstance = [0, instanceCounts[0], instanceCounts[0] + instanceCounts[1]];
const cmd = meshInst.setMultiDraw(null, 3);

cmd.add(0, indexCounts[0], instanceCounts[0], firstIndex[0], 0, firstInstance[0]);
cmd.add(1, indexCounts[1], instanceCounts[1], firstIndex[1], 0, firstInstance[1]);
cmd.add(2, indexCounts[2], instanceCounts[2], firstIndex[2], 0, firstInstance[2]);
cmd.update(3);
```

### クロスプラットフォームアプローチ

WebGL2は`firstInstance`をサポートしていません。両方のプラットフォームで同じ結果を得るには、インスタンスデータをテクスチャに保存し、カスタムシェーダーチャンクで`gl_DrawID`を使用できます：

```javascript
if (app.graphicsDevice.isWebGL2 && app.graphicsDevice.supportsMultiDraw) {
    // 行列をテクスチャに保存
    const matricesTexture = new pc.Texture(app.graphicsDevice, {
        width: totalInstances * 4,  // 行列ごとに4つのvec4
        height: 1,
        format: pc.PIXELFORMAT_RGBA32F,
        minFilter: pc.FILTER_NEAREST,
        magFilter: pc.FILTER_NEAREST,
        mipmaps: false,
        levels: [matrices]
    });

    // インスタンスIDを持つカスタム頂点フォーマットを使用
    const vbFormat = new pc.VertexFormat(app.graphicsDevice, [{
        semantic: pc.SEMANTIC_ATTR11,
        components: 1,
        type: pc.TYPE_INT32,
        asInt: true
    }]);

    // インスタンシングシェーダーチャンクをオーバーライド
    material.setAttribute('aInstanceId', pc.SEMANTIC_ATTR11);
    material.setParameter('uDrawOffsets[0]', drawOffsets);
    material.setParameter('uInstanceMatrices', matricesTexture);
    material.shaderChunks.glsl.set('transformInstancingVS', customShaderCode);
}
```

カスタムシェーダーは`gl_DrawID`を使用してベースオフセットを決定し、テクスチャから行列をフェッチします：

```glsl
#ifdef CAPS_MULTI_DRAW
    attribute int aInstanceId;
    uniform float uDrawOffsets[10];
    uniform sampler2D uInstanceMatrices;

    mat4 getInstancedMatrix(int index) {
        int size = textureSize(uInstanceMatrices, 0).x;
        int j = index * 4;
        int x = j % size;
        int y = j / size;
        vec4 v1 = texelFetch(uInstanceMatrices, ivec2(x, y), 0);
        vec4 v2 = texelFetch(uInstanceMatrices, ivec2(x + 1, y), 0);
        vec4 v3 = texelFetch(uInstanceMatrices, ivec2(x + 2, y), 0);
        vec4 v4 = texelFetch(uInstanceMatrices, ivec2(x + 3, y), 0);
        return mat4(v1, v2, v3, v4);
    }

    mat4 getModelMatrix() {
        int drawOffset = int(uDrawOffsets[gl_DrawID]);
        int instanceIndex = drawOffset + aInstanceId;
        return matrix_model * getInstancedMatrix(instanceIndex);
    }
#endif
```

## DrawCommands APIリファレンス

`DrawCommands`クラスは`MeshInstance.setMultiDraw()`によって返されます：

### setMultiDraw

```javascript
const cmd = meshInstance.setMultiDraw(camera, maxCount);
```

- `camera` - コマンドをバインドするCameraComponent、またはすべてのカメラの場合は`null`
- `maxCount` - 割り当てるサブドローの最大数。マルチドローを無効にするには`0`を渡します。
- 戻り値: `DrawCommands`インスタンス

### add

```javascript
cmd.add(i, indexOrVertexCount, instanceCount, firstIndexOrVertex, baseVertex, firstInstance);
```

- `i` - ドローインデックス（0からmaxCount-1）
- `indexOrVertexCount` - 描画するインデックスまたは頂点の数
- `instanceCount` - インスタンス数（インスタンス化されていない場合は1を使用）
- `firstIndexOrVertex` - 開始インデックスまたは頂点オフセット
- `baseVertex` - ベース頂点オフセット（WebGPUのみ、デフォルト0）
- `firstInstance` - 最初のインスタンスオフセット（WebGPUのみ、デフォルト0）

### update

```javascript
cmd.update(count);
```

- `count` - 実行する実際のドロー数（maxCount以下）

すべての`add()`呼び出しの後に`update()`を呼び出して、ドローコマンドをファイナライズします。

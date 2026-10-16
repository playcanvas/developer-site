---
title: メッシュの作成
description: ジオメトリクラスや独自の頂点データからコードでメッシュを構築し、毎フレーム更新し、頂点バッファを直接扱います。
---

[`Mesh`](https://api.playcanvas.com/engine/classes/Mesh.html)は、コードで次の3つの方法により作成できます。簡単なものから順に、より柔軟になります。

1. `SphereGeometry`など、一般的な形状を生成する[ジオメトリクラス](#geometry-classes)から作成する。
2. 位置、法線、テクスチャ座標など、自分で用意した[頂点データ](#setting-vertex-data)から作成する。
3. 自分で作成した[頂点バッファとインデックスバッファ](#vertex-and-index-buffers)から作成する。

メッシュを描画するには、[メッシュインスタンス](mesh-instances.md#rendering-a-mesh-instance)で説明しているように、メッシュインスタンスを作成し、Renderコンポーネントに渡すか、レイヤーに追加します。

## ジオメトリクラス {#geometry-classes}

ジオメトリクラスは、形状の頂点データをCPU上で生成します。[`Mesh.fromGeometry()`](https://api.playcanvas.com/engine/classes/Mesh.html#fromgeometry)は、そのデータを新しいメッシュにアップロードします。

```javascript
import { Mesh, SphereGeometry } from 'playcanvas';

const mesh = Mesh.fromGeometry(app.graphicsDevice, new SphereGeometry({
    radius: 2,
    latitudeBands: 32,
    longitudeBands: 32
}));
```

| クラス | 形状 | 主なオプション |
| ------ | ---- | -------------- |
| [`BoxGeometry`](https://api.playcanvas.com/engine/classes/BoxGeometry.html) | ボックス | `halfExtents`、`widthSegments`、`lengthSegments`、`heightSegments` |
| [`PlaneGeometry`](https://api.playcanvas.com/engine/classes/PlaneGeometry.html) | 上を向いた平面 | `halfExtents`、`widthSegments`、`lengthSegments` |
| [`SphereGeometry`](https://api.playcanvas.com/engine/classes/SphereGeometry.html) | 球 | `radius`、`latitudeBands`、`longitudeBands` |
| [`CapsuleGeometry`](https://api.playcanvas.com/engine/classes/CapsuleGeometry.html) | カプセル | `radius`、`height`、`heightSegments`、`sides` |
| [`CylinderGeometry`](https://api.playcanvas.com/engine/classes/CylinderGeometry.html) | 円柱 | `radius`、`height`、`heightSegments`、`capSegments` |
| [`ConeGeometry`](https://api.playcanvas.com/engine/classes/ConeGeometry.html) | 円錐または円錐台 | `baseRadius`、`peakRadius`、`height`、`heightSegments`、`capSegments` |
| [`TorusGeometry`](https://api.playcanvas.com/engine/classes/TorusGeometry.html) | トーラスまたはその一部 | `tubeRadius`、`ringRadius`、`sectorAngle`、`segments`、`sides` |
| [`CircleGeometry`](https://api.playcanvas.com/engine/classes/CircleGeometry.html) | 平らな円盤 | `radius`、`sectors`、`rings`、`ringExponent` |
| [`DomeGeometry`](https://api.playcanvas.com/engine/classes/DomeGeometry.html) | スカイドームなどに使う、底面を平らにした球 | `latitudeBands`、`longitudeBands` |

いずれも位置、法線、テクスチャ座標、インデックスを生成します。ほとんどのクラスは`calculateTangents: true`も受け付け、マテリアルの[法線マップ](../physical-rendering/physical-materials.md)に必要なタンジェントを追加します。

[`Geometry`](https://api.playcanvas.com/engine/classes/Geometry.html)は配列を格納するだけのコンテナなので、メッシュを作成する前にデータを変更できます。次の例では、分割した平面を波打つ地形に変形し、法線を再計算します。

```javascript
import { Mesh, PlaneGeometry, Vec2 } from 'playcanvas';

const geometry = new PlaneGeometry({
    halfExtents: new Vec2(10, 10),
    widthSegments: 64,
    lengthSegments: 64
});

const positions = geometry.positions;
for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] = Math.sin(positions[i] * 0.5) * Math.cos(positions[i + 2] * 0.5);
}
geometry.calculateNormals();

const mesh = Mesh.fromGeometry(app.graphicsDevice, geometry);
```

空の`Geometry`に独自の`positions`、`normals`、`uvs`、`colors`、`indices`を設定して、`Mesh.fromGeometry()`に渡すこともできます。

## 頂点データの設定 {#setting-vertex-data}

独自のデータからメッシュを構築するには、新しいメッシュに各頂点ストリームを設定し、[`update()`](https://api.playcanvas.com/engine/classes/Mesh.html#update)を呼び出します。`update()`は頂点バッファとインデックスバッファを作成し、データをアップロードします。次のメッシュは、テクスチャ座標を持つ1枚の四角形です。

```javascript
import { Mesh, calculateNormals } from 'playcanvas';

const positions = new Float32Array([
    -1, 0, 1,
    1, 0, 1,
    1, 0, -1,
    -1, 0, -1
]);
const uvs = new Float32Array([
    0, 0,
    1, 0,
    1, 1,
    0, 1
]);
const indices = [
    0, 1, 2,
    0, 2, 3
];

const mesh = new Mesh(app.graphicsDevice);
mesh.setPositions(positions);
mesh.setNormals(calculateNormals(positions, indices));
mesh.setUvs(0, uvs);
mesh.setIndices(indices);
mesh.update();
```

各メソッドは1つの頂点ストリームを設定します。

| メソッド | 頂点ごとのデータ | 格納形式 |
| -------- | ---------------- | -------- |
| [`setPositions()`](https://api.playcanvas.com/engine/classes/Mesh.html#setpositions) | x、y、z | 32ビット浮動小数点数 |
| [`setNormals()`](https://api.playcanvas.com/engine/classes/Mesh.html#setnormals) | x、y、z | 32ビット浮動小数点数 |
| [`setUvs()`](https://api.playcanvas.com/engine/classes/Mesh.html#setuvs) | テクスチャ座標セット0から7のu、v | 32ビット浮動小数点数 |
| [`setColors()`](https://api.playcanvas.com/engine/classes/Mesh.html#setcolors) | r、g、b、a | 32ビット浮動小数点数 (HDRカラー向け) |
| [`setColors32()`](https://api.playcanvas.com/engine/classes/Mesh.html#setcolors32) | 0から255の範囲のr、g、b、a | 8ビット値 (シェーダーでは0から1として読み取られます) |
| [`setVertexStream()`](https://api.playcanvas.com/engine/classes/Mesh.html#setvertexstream) | `SEMANTIC_TANGENT`などの任意のセマンティック | 指定したデータ型 |
| [`setIndices()`](https://api.playcanvas.com/engine/classes/Mesh.html#setindices) | 各プリミティブの頂点のインデックス | 16ビット (65535を超える頂点を持つメッシュでは32ビット) |

データにはJavaScriptの配列も型付き配列も使えます。大きなメッシュや毎フレーム変化するデータには型付き配列のほうが高速で、小さなメッシュでは通常の配列を使うと型付き配列を作成するコストを避けられます。メッシュのすべての頂点ストリームは、同じ頂点数でなければなりません。インデックスは省略可能で、省略した場合は頂点が順番に描画されます。

[`calculateNormals()`](https://api.playcanvas.com/engine/functions/calculateNormals.html)と[`calculateTangents()`](https://api.playcanvas.com/engine/functions/calculateTangents.html)は、三角形メッシュの位置、テクスチャ座標、インデックスから法線とタンジェントを生成します。

頂点カラーで描画するには、マテリアル側で有効にします。たとえば`StandardMaterial`では`material.diffuseVertexColor = true`を設定します。

### プリミティブタイプ

デフォルトでは、`update()`はメッシュを三角形として描画し、三角形ごとに3つの頂点またはインデックスを使います。ポイントやラインとして描画するには、別のプリミティブタイプを渡します。

```javascript
import { PRIMITIVE_LINES } from 'playcanvas';

mesh.update(PRIMITIVE_LINES);
```

タイプには`PRIMITIVE_POINTS`、`PRIMITIVE_LINES`、`PRIMITIVE_LINELOOP`、`PRIMITIVE_LINESTRIP`、`PRIMITIVE_TRIANGLES`、`PRIMITIVE_TRISTRIP`、`PRIMITIVE_TRIFAN`があります。この方法で描画するラインの幅は1ピクセルです。太いラインについては[太いライン](../wide-lines.md)を参照してください。

### バウンディングボックス {#bounding-box}

`update()`は、メッシュの位置からローカル空間のバウンディングボックスも計算します。エンジンはこれをフラスタムカリングとソートに使います。この処理を省くには、2番目の引数に`false`を渡し、[`mesh.aabb`](https://api.playcanvas.com/engine/classes/Mesh.html#aabb)を自分で設定します。

```javascript
import { BoundingBox, PRIMITIVE_TRIANGLES, Vec3 } from 'playcanvas';

mesh.aabb = new BoundingBox(new Vec3(0, 0, 0), new Vec3(10, 2, 10));
mesh.update(PRIMITIVE_TRIANGLES, false);
```

バウンディングボックスは、3成分の位置からのみ計算されます。それ以外の位置を使う場合や、シェーダーが頂点データの範囲外へ頂点を動かす場合は、`aabb`を自分で設定してください。

## メッシュの更新

メッシュはいつでも、毎フレームでも更新できます。変更した頂点ストリームを設定し、もう一度`update()`を呼び出します。設定しなかったストリームは以前のデータを保持します。次の例では、高さが毎フレーム変化するグリッドを作成し、テクスチャ座標とインデックスは一度だけ設定します。

```javascript
const mesh = new Mesh(app.graphicsDevice);
mesh.setPositions(positions);
mesh.setNormals(calculateNormals(positions, indices));
mesh.setUvs(0, uvs);
mesh.setIndices(indices);
mesh.update();

app.on('update', (dt) => {
    animateHeights(positions, dt);

    // 変化するのは位置と法線だけです
    mesh.setPositions(positions);
    mesh.setNormals(calculateNormals(positions, indices));
    mesh.update();
});
```

<EngineExample id="graphics/mesh-generation" title="Mesh Generation" />

メッシュを更新するときは、次の点に注意してください。

- **メッシュインスタンスを作成する前に、すべての頂点ストリームを設定します。** メッシュインスタンスは、メッシュが割り当てられたときにそのメッシュが持つ頂点ストリームに合わせてシェーダーを設定するため、先に`update()`を呼び出してください。後からストリームを変更する方法は、[頂点フォーマットの変更](#changing-the-vertex-format)を参照してください。
- **大きくなるメッシュには領域を確保します。** 更新に必要な頂点数やインデックス数がバッファの容量を超えると、新しいサイズでバッファが作り直されます。新しいバッファには前回の`update()`以降に設定した頂点ストリームしか含まれないため、その更新ではすべてのストリームを設定してください。これを避けるには、データを設定する前に`mesh.clear(false, false, maxVertices, maxIndices)`のように最大数を[`clear()`](https://api.playcanvas.com/engine/classes/Mesh.html#clear)に渡し、最大サイズの領域を確保します。最初の2つの引数は、バッファの使用方法に関する省略可能なヒントです。
- **バウンディングボックスの更新にはコストがかかります。** 毎フレーム変化する大きなメッシュでは、[バウンディングボックス](#bounding-box)で説明しているように、すべての姿勢を含むバウンディングボックスを設定することを検討してください。

### 頂点フォーマットの変更 {#changing-the-vertex-format}

頂点カラーやテクスチャ座標セットの追加など、メッシュが持つ頂点ストリームを変更するには、`clear()`を呼び出します。`clear()`は頂点フォーマットを破棄し、次の`update()`は設定したデータから新しい頂点バッファとインデックスバッファを作成します。そのため、すべてのストリームとインデックスを設定し直してください。メッシュインスタンスは、メッシュが割り当てられたときにその頂点ストリームに合わせてシェーダーを設定するため、すでに設定されていても、メッシュを各メッシュインスタンスにもう一度割り当ててください。エンジンのデバッグビルドは、割り当て後にメッシュの頂点ストリームが変わったメッシュインスタンスについて警告します。

```javascript
mesh.clear();
mesh.setPositions(positions);
mesh.setNormals(normals);
mesh.setColors32(colors);
mesh.setIndices(indices);
mesh.update();

// 新しい頂点ストリームに合わせてメッシュインスタンスのシェーダーを設定します
meshInstance.mesh = mesh;
```

### 読み込んだメッシュの変更

同じメソッドは読み込んだメッシュにも使えます。[`getPositions()`](https://api.playcanvas.com/engine/classes/Mesh.html#getpositions)などのゲッターで現在のデータを読み取り、変更して設定し直します。[共有されるメッシュ](index.md#shared-meshes)で説明しているように、読み込んだメッシュはそのアセットからインスタンス化したすべてのエンティティで共有されることに注意してください。

```javascript
const mesh = entity.render.meshInstances[0].mesh;

const positions = [];
mesh.getPositions(positions);

// すべての頂点を持ち上げます
for (let i = 1; i < positions.length; i += 3) {
    positions[i] += 0.5;
}

mesh.setPositions(positions);
mesh.update();
```

<EngineExample id="graphics/mesh-deformation" title="Mesh Deformation" />

## 頂点バッファとインデックスバッファ {#vertex-and-index-buffers}

頂点レイアウトを完全に制御するには、[`VertexBuffer`](https://api.playcanvas.com/engine/classes/VertexBuffer.html)と[`IndexBuffer`](https://api.playcanvas.com/engine/classes/IndexBuffer.html)を自分で作成してメッシュに割り当てます。これにより、バイナリファイルのインターリーブされたデータなど、最終的なレイアウトのデータを頂点ストリームごとにコピーせずにアップロードできます。

レイアウトは[`VertexFormat`](https://api.playcanvas.com/engine/classes/VertexFormat.html)で記述します。デフォルトでは属性をインターリーブし、各属性は4バイトの倍数の位置から始まります。次の例では、頂点ごとに位置と8ビットのカラーを持つ、合計16バイトの頂点で三角形を描画します。

```javascript
import {
    BoundingBox,
    Mesh,
    PRIMITIVE_TRIANGLES,
    SEMANTIC_COLOR,
    SEMANTIC_POSITION,
    TYPE_FLOAT32,
    TYPE_UINT8,
    Vec3,
    VertexBuffer,
    VertexFormat
} from 'playcanvas';

const device = app.graphicsDevice;
const format = new VertexFormat(device, [
    { semantic: SEMANTIC_POSITION, components: 3, type: TYPE_FLOAT32 },
    { semantic: SEMANTIC_COLOR, components: 4, type: TYPE_UINT8, normalize: true }
]);

const vertices = [
    { position: [-1, 0, 0], color: [255, 0, 0, 255] },
    { position: [1, 0, 0], color: [0, 255, 0, 255] },
    { position: [0, 1.5, 0], color: [0, 0, 255, 255] }
];

// format.sizeは1頂点あたりのバイト数です
const data = new ArrayBuffer(format.size * vertices.length);
const floats = new Float32Array(data);
const bytes = new Uint8Array(data);
vertices.forEach((vertex, i) => {
    floats.set(vertex.position, i * format.size / 4);
    bytes.set(vertex.color, i * format.size + 12);
});

const mesh = new Mesh(device);
mesh.vertexBuffer = new VertexBuffer(device, format, vertices.length, { data });
mesh.primitive[0] = {
    type: PRIMITIVE_TRIANGLES,
    base: 0,
    baseVertex: 0,
    count: vertices.length,
    indexed: false
};
mesh.aabb = new BoundingBox(new Vec3(0, 0.75, 0), new Vec3(1, 0.75, 0));
```

バッファを自分で割り当てる場合は`update()`を使わないため、描画内容を記述する[プリミティブ](https://api.playcanvas.com/engine/classes/Mesh.html#primitive)とバウンディングボックスも設定してください。インデックス付きのメッシュでは、インデックスバッファを`mesh.indexBuffer[0]`に割り当て、`indexed`を`true`にします。メッシュを破棄すると、割り当てたバッファも破棄されます。

WebGPUでは、メッシュのバッファを[コンピュートシェーダー](../shaders/compute-shaders.md)から読み書きすることもできます。`new Mesh(device, { storageVertex: true, storageIndex: true })`でメッシュを作成するか、同じオプションを`Mesh.fromGeometry()`に渡してください。

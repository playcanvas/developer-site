---
title: Plane Detection
---

[Mesh Detection](/user-manual/xr/ar/mesh-detection/)と非常によく似ており、Plane Detectionは現実世界の表面を推定するプレーンへのアクセスを提供します。

各プレーンは、`wall`、`floor`、`table`などのオプションで利用可能なラベルを持つ表面を表すことができます。

基盤となるシステムの実装によっては、基盤となるシステムは事前にキャプチャされたデータとリアルタイムの再構築の両方を提供できます。

## Support

```javascript
if (app.xr.planeDetection.supported) {
    // プレーン検出がサポートされています
}

app.xr.on('start', () => {
    if (app.xr.planeDetection.available) {
        // プレーン検出が利用可能です
    }
});
```

## Access

セッションの開始時に機能フラグを追加する必要があります。

```javascript
app.xr.start(camera, pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    planeDetection: true
});
```

その後、プレーンは非同期で追加/削除されます。

```javascript
app.xr.planeDetection.on('add', (xrPlane) => {
    // 新しいXrPlaneが追加されました

    xrPlane.once('remove', () => {
        // XrPlaneが削除されました
    });
});
```

また、XrPlaneのリストが利用可能です。

```javascript
const xrPlanes = app.xr.planeDetection.meshes;
for (let i = 0; i < xrPlanes.length; i++) {
    const xrPlane = xrPlanes[i];
}
```

## Mesh

各プレーンはXrPlaneのインスタンスとして表され、アクティブなセッション中に動的に追加/削除できます。また、そのライフタイム中に変更可能なデータも持っています。

XrPlaneの位置と回転（ワールド空間）にアクセスできます。

```javascript
entity.setPosition(xrPlane.getPosition());
entity.setRotation(xrPlane.getRotation());
```

各XrPlaneは、視覚的なメッシュを構築するために使用できるポイント（ローカル空間）と向きを持っています。ポイントのリストは、多角形の境界の頂点を表します。

`xrPlane.orientation`は、プレーンが垂直、水平、またはその他のいずれであるかに関する情報を提供します。

以下の例は、各XrPlaneの視覚的なメッシュを作成し、それをシーンルートに追加します。

```javascript
app.xr.planeDetection.on('add', (xrPlane) => {
    // ジオメトリデータ
    const mesh = new pc.Mesh(app.graphicsDevice);
    mesh.clear(true, true); // メッシュが動的バッファで作成されていることを確認

    // 頂点リストを作成
    const vertices = new Float32Array((xrPlane.points.length + 1) * 3);

    // 最初の点は常に原点にあります
    vertices[0] = 0;
    vertices[1] = 0;
    vertices[2] = 0;

    // インデックスリストを作成
    const indices = new Uint32Array(xrPlane.points.length * 3);

    // 各エッジがメッシュの原点に接続されたポリゴンを構築
    for (let i = 0; i < xrPlane.points.length; i++) {
        vertices[i * 3 + 3 + 0] = xrPlane.points[i].x;
        vertices[i * 3 + 3 + 1] = xrPlane.points[i].y;
        vertices[i * 3 + 3 + 2] = xrPlane.points[i].z;
        indices[i * 3 + 0] = 0;
        indices[i * 3 + 1] = i + 1;
        indices[i * 3 + 2] = ((i + 1) % xrPlane.points.length) + 1;
    }

    mesh.setPositions(vertices); // 頂点を設定
    mesh.setNormals(pc.calculateNormals(vertices, indices)); // 法線を計算
    mesh.setIndices(indices); // インデックスを設定
    mesh.update(pc.PRIMITIVE_TRIANGLES); // バッファを更新

    const material = new pc.StandardMaterial();
    const meshInstance = new pc.MeshInstance(mesh, material);

    const entity = new pc.Entity(xrPlane.label);

    // レンダーコンポーネントを追加
    entity.addComponent('render', {
        meshInstances: [ meshInstance ]
    });

    // エンティティをシーンルートに追加
    app.root.addChild(entity);

    // XrPlaneが削除された後のクリーンアップ
    xrPlane.once('remove', () => {
        material.destroy();
        mesh.destroy();
        entity.destroy();
    });
});
```

## Semantic Label

XrPlaneは様々な現実世界のオブジェクトを表すことができ、そのプロパティ`XrPlane.label`を使用してそれが何を表しているかを特定するのに役立つラベルを持っています。

これらのラベルは次のいずれかになります: `floor`、`wall`、`door`、`window`、`table`、`screen`、`global mesh`、`other` など。こちらは[セマンティックラベルのリスト](https://github.com/immersive-web/semantic-labels/blob/master/labels.json)ですが、このリストは確定的なものではなく、プラットフォームが適切だと判断したものを報告できます。

## 変更点

基盤となるシステムの機能に応じて、XRセッションがアクティブな間にXrPlane属性が変更されることがあります。そのイベントを購読し、視覚的なメッシュを適切に更新できます:

```javascript
xrPlane.on('change', () => {
    // ポイントおよび/またはラベルが変更されました
});
```

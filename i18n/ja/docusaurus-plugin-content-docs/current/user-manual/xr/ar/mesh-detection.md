---
title: メッシュ検出
---

現実世界と仮想オブジェクト間の相互作用は、両者の視覚的および論理的な相互作用によって実現されます。メッシュ検出は、現実世界のジオメトリをメッシュの形式で表現したものにアクセスを提供するAPIです。以下のような多くの方法で使用できます。

* 現実世界の環境内での仮想オブジェクトの物理演算
* パスファインディング
* オブジェクト配置
* オクルージョン
* プロシージャルエフェクト

このAPIは、メッシュのリスト、そのジオメトリ、変換、およびセマンティックラベリングを提供します。

基盤となるシステムは、その実装に応じて、事前にキャプチャされたデータを提供できるだけでなく、リアルタイムの再構築も提供できます。

## サポート

```javascript
if (app.xr.meshDetection.supported) {
    // メッシュ検出がサポートされています
}

app.xr.on('start', () => {
    if (app.xr.meshDetection.available) {
        // メッシュ検出が利用可能です
    }
});
```

## アクセス

セッション開始時に機能フラグを追加する必要があります。

```javascript
app.xr.start(camera, pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    meshDetection: true
});
```

メッシュは非同期で追加/削除されます。

```javascript
app.xr.meshDetection.on('add', (xrMesh) => {
    // 新しいXrMeshが追加されました

    xrMesh.once('remove', () => {
        // XrMeshが削除されました
    });
});
```

また、XrMeshのリストも利用可能です。

```javascript
const xrMeshes = app.xr.meshDetection.meshes;
for (let i = 0; i < xrMeshes.length; i++) {
    const xrMesh = xrMeshes[i];
}
```

## メッシュ

各メッシュはXrMeshのインスタンスとして表現され、アクティブなセッション中に追加/削除できます。また、そのライフタイム中に変更可能なデータも持ちます。

XrMeshの位置と回転（ワールド空間）にアクセスできます。

```javascript
entity.setPosition(xrMesh.getPosition());
entity.setRotation(xrMesh.getRotation());
```

各XrMeshは、視覚的なメッシュを構築するために使用できる頂点とインデックス（ローカル空間）を持っています。以下の例は、各XrMeshの視覚的なメッシュを作成し、それをシーンのルートに追加します。

```javascript
app.xr.meshDetection.on('add', (xrMesh) => {
    // ジオメトリデータ
    const mesh = new pc.Mesh(app.graphicsDevice);
    mesh.clear(true, true); // メッシュが動的バッファで作成されることを確認
    mesh.setPositions(xrMesh.vertices); // 頂点を設定
    mesh.setNormals(pc.calculateNormals(xrMesh.vertices, xrMesh.indices)); // 法線を計算
    mesh.setIndices(xrMesh.indices); // インデックスを設定
    mesh.update(pc.PRIMITIVE_TRIANGLES); // バッファを更新

    const material = new pc.StandardMaterial();
    const meshInstance = new pc.MeshInstance(mesh, material);

    const entity = new pc.Entity();

    // レンダリングコンポーネントを追加
    entity.addComponent('render', {
        meshInstances: [ meshInstance ]
    });

    // エンティティをシーンのルートに追加
    app.root.addChild(entity);

    // XrMeshが削除された後にクリーンアップ
    xrMesh.once('remove', () => {
        material.destroy();
        mesh.destroy();
        entity.destroy();
    });
});
```

## セマンティックラベル

XrMeshはさまざまな現実世界のオブジェクトを表すことができ、そのプロパティ`XrMesh.label`を使用して、それが何を表しているかを特定するのに役立ちます。

これらのラベルは、`floor`、`wall`、`door`、`window`、`table`、`screen`、`global mesh`、`other`、`more`のいずれかです。このリストは決定的ではなく、プラットフォームは適切だと判断するあらゆるものを報告できますが、[セマンティックラベルのリスト][1]はこちらにあります。

## 変更

基盤となるシステムの機能に応じて、XRセッションがアクティブな間にXrMeshのジオメトリが変更されることがあります。そのイベントを購読し、それに応じて視覚的なメッシュを更新できます。

```javascript
xrMesh.on('change', () => {
    // 頂点、インデックス、および/またはラベルが変更されました
});
```

[1]: https://github.com/immersive-web/semantic-labels/blob/master/labels.json

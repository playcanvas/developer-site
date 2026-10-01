---
title: メッシュ検出
description: "PlayCanvasでのARメッシュ検出: セマンティックラベル付きの部屋や家具の三角形メッシュ、追加・変更・削除されるメッシュへの追従、メッシュの描画、メッシュからの物理コライダーの構築、オクルージョンへの利用。"
---

メッシュ検出を使うと、ユーザーの周囲の三角形メッシュを取得できます。[平面](/user-manual/xr/ar/plane-detection/)が平らな面を表すのに対し、メッシュはソファ、ランプ、部屋全体など、物の形状をなぞります。現実の物体に対する物理演算、オクルージョン、現実の面に沿って広がるエフェクトなどに使います。

![検出されたメッシュとして表示した部屋の家具。ワイヤーフレームの縁が付いた半透明の青い形状で描画され、ソファの上には仮想のボールがある](/img/user-manual/xr/ar/mesh-detection/meshes.webp)

<EngineExample id="xr/ar-mesh-detection" title="AR Mesh Detection" />

## メッシュ検出のリクエスト {#requesting-mesh-detection}

ARセッションを開始するときに、メッシュ検出をリクエストします。

```javascript
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    meshDetection: true
});
```

ブラウザがメッシュ検出を実装していれば、`app.xr.meshDetection.supported`は`true`です。セッションでメッシュ検出が使えるようになると、`app.xr.meshDetection.available`が`true`になり、`available`イベントが発火します。Meta Questでは、平面と同じくメッシュもユーザーがセットアップした部屋から得られ、`app.xr.initiateRoomCapture()`で部屋のセットアップの開始をデバイスに要求できます。[平面検出](/user-manual/xr/ar/plane-detection/#requesting-plane-detection)を参照してください。

## メッシュ {#meshes}

`app.xr.meshDetection`は、デバイスがメッシュを報告するたびに`add`を発火し、メッシュがなくなると`remove`を発火します。現在のメッシュの一覧は`app.xr.meshDetection.meshes`にあります。各メッシュは[`XrMesh`](https://api.playcanvas.com/engine/classes/XrMesh.html)で、次のプロパティとメソッドを持ちます。

| プロパティまたはメソッド | 説明 |
| --- | --- |
| `getPosition()`, `getRotation()` | [トラッキング空間](/user-manual/xr/ar/#the-real-world-and-the-rig)でのメッシュのポーズ |
| `vertices` | メッシュのローカル空間での頂点位置の`Float32Array`。1頂点につき3つの数値 |
| `indices` | 三角形を構成する頂点のインデックスの`Uint32Array`。1つの三角形につき3つ |
| `label` | `'table'`、`'couch'`、`'global mesh'`など、メッシュが何であるかを示す文字列、または空文字列 |

メッシュの頂点、インデックス、ラベルが変わると、メッシュは`change`を発火します。ポーズはイベントなしでどのフレームでも変わる可能性があるため、毎フレーム読み取ってください。エンジン2.23以降では、`remove`の後もプロパティは最後の値を保持します。それより前のバージョンでは、削除されたメッシュの`vertices`、`indices`、`label`は、`remove`ハンドラー内であってもエラーをスローします。

Meta Questは、ユーザーが登録した家具ごとにメッシュを1つ報告します。部屋をスキャンできるデバイスでは、さらに部屋全体のメッシュを1つ、`'global mesh'`というラベルで報告します。

## メッシュの描画 {#drawing-meshes}

検出された各メッシュを描画用のメッシュに変換し、そのポーズに追従させます。

```javascript
app.xr.meshDetection.on('add', (xrMesh) => {
    const mesh = new pc.Mesh(app.graphicsDevice);
    mesh.setPositions(xrMesh.vertices);
    mesh.setNormals(pc.calculateNormals(xrMesh.vertices, xrMesh.indices));
    mesh.setIndices(xrMesh.indices);
    mesh.update();

    const material = new pc.StandardMaterial();
    material.opacity = 0.3;
    material.blendType = pc.BLEND_NORMAL;
    material.update();

    const entity = new pc.Entity(xrMesh.label || 'mesh');
    entity.addComponent('render', {
        meshInstances: [new pc.MeshInstance(mesh, material)]
    });
    rig.addChild(entity);

    const follow = app.on('update', () => {
        entity.setLocalPosition(xrMesh.getPosition());
        entity.setLocalRotation(xrMesh.getRotation());
    });

    xrMesh.once('remove', () => {
        follow.off();
        entity.destroy();
        material.destroy();
    });
});
```

描画したメッシュを変化に合わせて更新するには、`mesh.clear(true, true)`で動的バッファーを使うメッシュとして作成し、`change`ハンドラーで位置、法線、インデックスを設定し直します。

## 物理演算 {#physics}

メッシュのコリジョン形状を持つStaticなリジッドボディを使うと、仮想オブジェクトが現実の部屋と衝突するようになります。検出されたメッシュからモデルを構築し、コリジョン形状に渡します。

```javascript
app.xr.meshDetection.on('add', (xrMesh) => {
    const mesh = new pc.Mesh(app.graphicsDevice);
    mesh.setPositions(xrMesh.vertices);
    mesh.setIndices(xrMesh.indices);
    mesh.update();

    const model = new pc.Model();
    model.graph = new pc.GraphNode();
    model.meshInstances = [new pc.MeshInstance(mesh, new pc.StandardMaterial(), model.graph)];

    const collider = new pc.Entity('room collider');
    rig.addChild(collider);
    collider.setLocalPosition(xrMesh.getPosition());
    collider.setLocalRotation(xrMesh.getRotation());
    collider.addComponent('collision', { type: 'mesh', model });
    collider.addComponent('rigidbody', { type: 'static' });

    xrMesh.once('remove', () => collider.destroy());
});
```

家具や部屋のメッシュは動かないため、コライダーにはメッシュのポーズを一度だけ設定します。大きな部屋のメッシュからメッシュ形状を構築するには少し時間がかかるので、変化のたびではなく、一度だけ構築してください。[コリジョン形状](/user-manual/physics/collision-shapes/#mesh-colliders)を参照してください。

## オクルージョン {#occlusion}

深度を書き込み、色は書き込まないマテリアルでメッシュを描画すると、現実の物体の向こうにある仮想オブジェクトが隠れ、現実の物体はそのまま見えます。マテリアルの`redWrite`、`greenWrite`、`blueWrite`、`alphaWrite`を`false`に設定し、遮蔽用のメッシュはWorldレイヤーより前に描画される[レイヤー](/user-manual/graphics/layers/)に入れます。メッシュは粗いため、オクルージョンの境界はおおよそのものにしかなりません。ピクセル単位のオクルージョンには、デバイスが対応していれば[深度センシング](/user-manual/xr/ar/depth-sensing/)を使います。

## 関連情報 {#see-also}

- [平面検出](/user-manual/xr/ar/plane-detection/) - 平らな面とルームキャプチャ
- [コリジョン形状](/user-manual/physics/collision-shapes/) - メッシュコライダー
- [XrMeshDetection](https://api.playcanvas.com/engine/classes/XrMeshDetection.html) - `app.xr.meshDetection`のAPIリファレンス

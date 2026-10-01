---
title: 平面検出
description: "PlayCanvasでのAR平面検出: セマンティックラベル付きの床、壁、テーブルなどの平らな面、追加・変更・削除される平面への追従、メッシュとしての描画、ルームキャプチャ、平面を使った配置、物理演算、オクルージョン。"
---

平面検出を使うと、ユーザーの周囲にある平らな面、つまり床、壁、天井、テーブル、ドア、窓を取得できます。各平面はポーズと向きを持つ多角形で、一部のデバイスでは、それが何であるかを示すラベルも持ちます。平面は、現実の面にコンテンツを置いたり、仮想オブジェクトを部屋と衝突させたり、仮想オブジェクトを壁の向こうに隠したりするのに使います。

![ラベルごとに色分けして描画した部屋の平面。床は緑、壁は青、テーブルとソファはオレンジ](/img/user-manual/xr/ar/plane-detection/planes.webp)

<EngineExample id="xr/ar-plane-detection" title="AR Plane Detection" />

## 平面検出のリクエスト {#requesting-plane-detection}

ARセッションを開始するときに、平面検出をリクエストします。

```javascript
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    planeDetection: true
});
```

ブラウザが平面検出を実装していれば、`app.xr.planeDetection.supported`は`true`です。セッションで平面検出が使えるようになると、`app.xr.planeDetection.available`が`true`になり、`available`イベントが発火します。

平面の取得元はデバイスによって異なります。Meta Questなどのヘッドセットは、ユーザーがセットアップした部屋の平面をまとめて一度に報告します。そのため、ユーザーが部屋をセットアップしていなければ、平面が1つもないことがあります。`app.xr.initiateRoomCapture()`は、デバイスが対応していれば、部屋のセットアップを開始するようデバイスに要求します。スマートフォンは、ユーザーが周囲を見回すのに合わせてカメラから平面を検出し、時間とともに、より多く、より大きな平面を報告するようになります。

```javascript
app.xr.on('start', () => {
    // 平面が届かない場合は、ユーザーに部屋のスキャンを提案する
    setTimeout(() => {
        if (app.xr.active && app.xr.planeDetection.planes.length === 0) {
            app.xr.initiateRoomCapture((err) => {
                if (err) console.warn(err.message);
            });
        }
    }, 2000);
});
```

## 平面 {#planes}

`app.xr.planeDetection`は、デバイスが平面を報告するたびに`add`を発火し、平面がなくなると`remove`を発火します。現在の平面の一覧は`app.xr.planeDetection.planes`にあります。各平面は[`XrPlane`](https://api.playcanvas.com/engine/classes/XrPlane.html)で、次のプロパティとメソッドを持ちます。

| プロパティまたはメソッド | 説明 |
| --- | --- |
| `getPosition()`, `getRotation()` | [トラッキング空間](/user-manual/xr/ar/#the-real-world-and-the-rig)での平面のポーズ。平面はローカルのXZ平面上にあり、ローカルのY軸が法線です |
| `points` | ローカル空間の点で表した平面の輪郭 |
| `orientation` | `'horizontal'`、`'vertical'`、またはそれ以外の向きでは`null` |
| `label` | `'floor'`、`'wall'`、`'table'`など、平面が何であるかを示す文字列、または空文字列 |
| `id` | 平面に固有の番号 |

平面は、デバイスが周囲をより詳しく把握するにつれて変化します。輪郭、向き、ラベルが変わると、平面は`change`を発火します。ポーズはイベントなしでどのフレームでも変わる可能性があるため、毎フレーム読み取ってください。エンジン2.23以降では、`remove`の後もプロパティは最後の値を保持します。それより前のバージョンでは、削除された平面の`points`と`label`は、`remove`ハンドラー内であってもエラーをスローします。

## 平面の描画 {#drawing-planes}

平面の原点を起点に扇状に並べた三角形で、平面の輪郭を埋めるメッシュを構築し、平面が変化したら構築し直します。

```javascript
// 平面のローカル空間で、平面の輪郭を三角形で埋める
const updatePlaneMesh = (mesh, plane) => {
    const positions = [0, 0, 0];
    const normals = [0, 1, 0];
    const indices = [];
    const count = plane.points.length;
    plane.points.forEach((point, i) => {
        positions.push(point.x, point.y, point.z);
        normals.push(0, 1, 0);
        indices.push(0, i + 1, ((i + 1) % count) + 1);
    });
    mesh.setPositions(positions);
    mesh.setNormals(normals);
    mesh.setIndices(indices);
    mesh.update();
};

app.xr.planeDetection.on('add', (plane) => {
    const mesh = new pc.Mesh(app.graphicsDevice);
    mesh.clear(true, true); // 平面は変化する可能性があるため、バッファーを動的にする
    updatePlaneMesh(mesh, plane);

    const material = new pc.StandardMaterial();
    material.diffuse = plane.orientation === 'horizontal' ? pc.Color.GREEN : pc.Color.BLUE;
    material.opacity = 0.4;
    material.blendType = pc.BLEND_NORMAL;
    material.cull = pc.CULLFACE_NONE;
    material.update();

    const entity = new pc.Entity(plane.label || 'plane');
    entity.addComponent('render', {
        meshInstances: [new pc.MeshInstance(mesh, material)]
    });
    rig.addChild(entity);

    // ポーズはどのフレームでも変わる可能性があり、輪郭は平面が変化したときに変わる
    const follow = app.on('update', () => {
        entity.setLocalPosition(plane.getPosition());
        entity.setLocalRotation(plane.getRotation());
    });
    plane.on('change', () => updatePlaneMesh(mesh, plane));

    plane.once('remove', () => {
        follow.off();
        entity.destroy();
        material.destroy();
    });
});
```

エンティティはカメラリグの子なので、そのローカルのポーズがトラッキング空間での平面のポーズになります。ほとんどのデバイスで平面は凸多角形、Meta Questでは長方形なので、扇状の三角形で正しく埋められます。

## ラベル {#labels}

平面の`label`は、デバイスが部屋をどう認識しているかに基づきます。よく使われるラベルには`floor`、`ceiling`、`wall`、`door`、`window`、`table`があります。全一覧は、WebXRの[セマンティックラベル](https://github.com/immersive-web/semantic-labels)を参照してください。すべてのデバイスが平面にラベルを付けるわけではなく、一覧にないラベルを報告するデバイスもあります。そのため、未知のラベルや空のラベルは、種類のわからない面として扱ってください。

## 用途 {#uses}

- **配置。** 最も大きな水平面やテーブルの上にコンテンツを置きます。[ヒットテスト](/user-manual/xr/ar/hit-testing/)で得られるのは1点ですが、平面からは面全体が一度に得られます。
- **物理演算。** 各平面のエンティティに、平面と同じ大きさの薄いボックスのコリジョン形状を持つStaticな[リジッドボディ](/user-manual/physics/rigid-bodies/)を追加します。こうすると、仮想オブジェクトが現実の床に着地し、現実の壁で跳ね返るようになります。不規則な形の面には[メッシュ](/user-manual/xr/ar/mesh-detection/#physics)を使います。
- **オクルージョン。** 深度を書き込み、色は書き込まないマテリアルで壁を描画すると、壁の向こうにある仮想オブジェクトが隠れ、現実の壁はそのまま見えます。マテリアルの`redWrite`、`greenWrite`、`blueWrite`、`alphaWrite`を`false`に設定してください。壁は隠す対象のオブジェクトより先に描画する必要があるため、Worldレイヤーより前に描画される[レイヤー](/user-manual/graphics/layers/)に入れます。

## 関連情報 {#see-also}

- [メッシュ検出](/user-manual/xr/ar/mesh-detection/) - 部屋と家具の三角形メッシュ
- [ヒットテスト](/user-manual/xr/ar/hit-testing/) - 面上の1点を見つける
- [WebXR: Plane Detection](/tutorials/webxr-plane-detection/) - エディターのプロジェクトを使ったチュートリアル
- [XrPlaneDetection](https://api.playcanvas.com/engine/classes/XrPlaneDetection.html) - `app.xr.planeDetection`のAPIリファレンス

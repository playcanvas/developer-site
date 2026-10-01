---
title: アンカー
description: "PlayCanvasのWebXRアンカー：トラッキングの精度が上がっても仮想オブジェクトを現実世界に固定しておく方法、ポーズやヒットテストの結果からのアンカーの作成、アンカーへの追従と破棄、セッション間でのアンカーの永続化。"
---

アンカーは、デバイスがトラッキングし続ける現実世界の点です。セッション中にデバイスによる部屋の把握が進むと、以前に報告されたもののポーズが、測定された現実の場所から少しずれていくことがあります。一方、アンカーは現実の場所から離れないため、アンカーに追従するオブジェクトは、ユーザーが置いた場所にとどまります。デバイスによっては、セッションをまたいでアンカーを記憶することもできます。

<EngineExample id="xr/ar-hit-test-anchors" title="AR Hit Test Anchors" />

## アンカーのリクエスト {#requesting-anchors}

ARセッションの開始時に、アンカーをリクエストします。

```javascript
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    anchors: true
});
```

ブラウザがアンカーを実装していれば、`app.xr.anchors.supported`が`true`になります。セッションでアンカーが使えるようになると、`app.xr.anchors.available`が`true`になり、`available`が発火します。

## アンカーの作成 {#creating-anchors}

[トラッキング空間](/user-manual/xr/ar/#the-real-world-and-the-rig)での位置と回転を指定して、アンカーを作成します。

```javascript
app.xr.anchors.create(position, rotation);
```

または、[ヒットテストの結果](/user-manual/xr/ar/hit-testing/#anchoring-placed-objects)から作成します。この場合、アンカーはヒットテストで見つかった面に結び付けられ、デバイスがその面をより正確に把握していくのに合わせて、面に追従します。

```javascript
// hitTestResultは、ヒットテストソースのresultイベントの最後の引数
app.xr.anchors.create(hitTestResult);
```

アンカーは非同期で作成されます。`app.xr.anchors`は、以前のセッションから[復元](#persistence)されたものも含め、新しいアンカーごとに`add`を発火します。現在のアンカーの一覧は`app.xr.anchors.list`にあります。`create()`は最後の引数としてコールバックも受け取り、アンカーを作成できなかった場合はエラーが渡されます。ただし、位置と回転から作成したアンカーでは、成功時にコールバックが呼ばれないことがあります。そのため、次のように、新しいアンカーには`add`で追従してください。

## アンカーへの追従 {#following-an-anchor}

アンカーの`getPosition()`と`getRotation()`は、トラッキング空間でのアンカーのポーズを返します。ポーズが変わると、アンカーは`change`を発火します。オブジェクトをアンカーの位置に保つには、オブジェクトをカメラリグの子にして、そのローカルのポーズを更新します。

```javascript
app.xr.anchors.on('add', (anchor) => {
    const flag = new pc.Entity('flag');
    flag.addComponent('render', { type: 'cone' });
    flag.setLocalScale(0.1, 0.2, 0.1);
    rig.addChild(flag);

    const follow = () => {
        flag.setLocalPosition(anchor.getPosition());
        flag.setLocalRotation(anchor.getRotation());
        flag.translateLocal(0, 0.1, 0); // 円錐をアンカーの上に立たせる
    };
    follow();
    anchor.on('change', follow);

    anchor.once('destroy', () => {
        flag.destroy();
    });
});
```

## アンカーの破棄 {#destroying-anchors}

`anchor.destroy()`はアンカーを削除し、アンカーの`destroy`イベントを発火します。アンカーはセッションの終了時に破棄されます。また、トラッキングできなくなったアンカーをデバイスが破棄することもあります。そのため、上の例のように、アンカーが`destroy`を発火したら、そのアンカーに追従しているものを削除してください。

## 永続化 {#persistence}

対応しているデバイスでは、アンカーをセッションの終了後も存続させることができます。`anchor.persist()`でアンカーに識別子を与え、後のセッションでその識別子を使って復元します。ブラウザがこれをサポートしている場合、`app.xr.anchors.persistence`は`true`です。

```javascript
// 例えばユーザーが何かを配置したときに、アンカーを記憶する
anchor.persist((err, uuid) => {
    if (!err) {
        console.log(`Persisted the anchor as ${uuid}`);
    }
});
```

デバイスは、サイトが永続化したアンカーの識別子を記憶しています。セッションが開始されると、`app.xr.anchors.uuids`にその一覧が入ります。`app.xr.anchors.restore()`で各アンカーを再作成すると、`app.xr.anchors`が通常どおりそのアンカーを追加します。

```javascript
app.xr.anchors.on('available', () => {
    if (!app.xr.anchors.persistence) return;

    for (const uuid of app.xr.anchors.uuids) {
        app.xr.anchors.restore(uuid);
    }
});
```

復元されたアンカーの`uuid`はその識別子で、`anchor.persistent`は`true`です。どのオブジェクトをどのアンカーに置くかがわかるように、永続化するときに、識別子を独自のデータとともに`localStorage`などに保存しておきます。

`anchor.forget()`または`app.xr.anchors.forget(uuid)`は、永続化された識別子を削除し、そのアンカーが再び復元されないようにします。デバイスは、サイトが永続化できるアンカーの数を制限しており、ユーザーがサイトのデータを消去したときなどに、アンカーを削除することもあります。Meta Questが保持するのは1サイトあたり最大8個で、プライベートブラウジングでは1つも保持しません。`persist()`や`restore()`が失敗した場合も、適切に処理してください。

## 関連情報 {#see-also}

- [ヒットテスト](/user-manual/xr/ar/hit-testing/) - アンカーを付ける面を見つける
- [AR](/user-manual/xr/ar/) - カメラリグを基準にしたコンテンツの配置
- [XrAnchors](https://api.playcanvas.com/engine/classes/XrAnchors.html) - `app.xr.anchors`のAPIリファレンス

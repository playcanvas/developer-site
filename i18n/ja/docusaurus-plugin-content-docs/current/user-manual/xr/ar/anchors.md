---
title: アンカー
---

アンカーは、基盤となるARシステムによる現実世界の絶えず進化する理解に合わせて更新できる、3D空間内のポイントを作成する機能を提供します。これにより、ユーザーの環境に据え付けられているように感じられる、現実世界に関連する仮想オブジェクトの配置が可能になります。

各アンカーは位置と向きとして表現され、任意の点から作成できるだけでなく、より信頼性の高いものにするヒットテストの結果に関連して作成することもできます。

### アンカーの使用 {#using-anchors}

アンカーの使用を開始するには、セッションがリクエストされた際に、そのセッションにフラグを提供する必要があります。

```javascript
app.xr.start(camera, pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    anchors: true
});
```

## サポート {#support}

システムがアンカーをサポートしているか確認できます。

```javascript
if (app.xr.anchors.supported) {
    // アンカーがサポートされています
}

app.xr.on('start', () => {
    if (app.xr.anchors.available) {
        // アンカーはサポートされており、利用可能です
    }
});
```

## アンカーの作成 {#creating-anchors}

次に、例えば任意のポジションと回転を使用して、アンカーを作成できます。

```javascript
app.xr.anchors.create(position, rotation, (err, anchor) => {
    if (!err) {
        // 新しいアンカーが作成されました
    }
});
```

または、より信頼性の高いトラッキングのために、アンカーは[Hit Test Result](/user-manual/xr/ar/hit-testing/#anchors)から作成できます。

## アンカー {#anchor}

各アンカーは独自のポジションと回転を持ち、いつでも更新できます。アンカーが更新された場合、アプリケーション開発者は関連する仮想オブジェクトを適切に更新する必要があります。

アンカーはセッション中に動的に追加および削除できます。

```javascript
app.xr.anchors.on('add', (anchor) => {
    const entity = new pc.Entity();

    // アンカー用にコーンを追加
    entity.addComponent('render', { type: 'cone' });
    entity.setLocalScale(0.1, 0.1, 0.1); // 直径10cm
    app.root.addChild(entity);

    // 変換
    entity.setLocalPosition(anchor.getPosition());
    entity.setLocalRotation(anchor.getRotation());
    entity.translateLocal(0, 0.05, 0); // コーンをオフセット

    // アンカーが変更されたときにコーンを更新
    anchor.on('change', () => {
        entity.setLocalPosition(anchor.getPosition());
        entity.setLocalRotation(anchor.getRotation());
        entity.translateLocal(0, 0.05, 0); // コーンをオフセット
    });

    // アンカーが破棄されたときにコーンを削除
    anchor.once('destroy', () => {
        entity.destroy();
    });
});
```

## 永続化 {#persistence}

アンカーの永続化は、セッション間でアンカーを記憶する方法を提供し、オリジンごとにアンカーの数が制限されています。これにより、アプリケーションは現実世界のジオメトリに関連して仮想オブジェクトを配置し、セッション間でそれらを維持することができます。

永続化がサポートされているか確認できます。

```javascript
if (app.xr.anchors.persistence) {
    // アプリケーションはアンカーを永続化できます
}
```

各アンカーは、セッション間で参照および復元できるUUIDを持つことができます。

永続的なアンカーのリストにアクセスし、セッション開始時にそれらを復元できます。

```javascript
app.xr.on('start', () => {
    const uuids = app.xr.anchors.uuids;
    for(let i = 0; i < uuids.length; i++) {
        app.xr.anchors.restore(uuids[i]);
    }
});
```

個々のアンカーの永続化を管理するには、`persist` および `forget` メソッドを使用できます。

```javascript
anchor.persist((err, uuid) => {
    if (uuid) {
        // アンカーが永続化されました
    }
});
```

```javascript
if (anchor.persistent) {
    anchor.forget((err) => {
        if (!err) {
            // アンカーは忘れられました
        }
    });
}
```

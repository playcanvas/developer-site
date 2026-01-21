---
title: ピッキング
---

PlayCanvas Engine は、指定されたピクセルでレンダリングされたメッシュインスタンスをクエリできる[Picker API](https://api.playcanvas.com/engine/classes/Picker.html)を提供します。ピッカーは、メッシュの場合と同じ方法でスプラットと連携します。

**[ライブデモを見る](https://playcanvas.github.io/#/gaussian-splatting/picking)** - インタラクティブな選択とワールド位置検出によるスプラットピッキングの動作を確認できます。

## Picker のセットアップ

スプラットをピッキングするには、深度を有効にして（3番目のパラメータを `true` に設定）Picker インスタンスを作成します：

```javascript
// ワールド位置検出のために深度バッファをサポートしたピッカーを作成
const picker = new pc.Picker(app, 1, 1, true);
```

深度バッファは、クリックされたオブジェクトを識別するだけでなく、ピッキングされたポイントの3Dワールド位置を取得する場合に必要です。

## ピッキングの準備

ピッカーにクエリを送る前に、`prepare()` を呼び出してIDテクスチャをレンダリングする必要があります：

```javascript
// スプラットを含むレイヤーを取得
const worldLayer = app.scene.layers.getLayerByName('World');

// ピッキングバッファをレンダリング
picker.prepare(camera.camera, app.scene, [worldLayer]);
```

パフォーマンスを向上させるために、ピッカーのサイズを低解像度に変更できます：

```javascript
// より高速なピッキングのために1/4解像度を使用
const pickerScale = 0.25;
picker.resize(canvas.clientWidth * pickerScale, canvas.clientHeight * pickerScale);

// ピック座標も同様にスケーリング
const scaledX = mouseX * pickerScale;
const scaledY = mouseY * pickerScale;
```

## ピッキングされたオブジェクトの識別

`getSelectionAsync()` を使用して、スクリーン位置のメッシュインスタンスを取得します：

```javascript
const meshInstances = await picker.getSelectionAsync(x, y, 1, 1);
if (meshInstances.length > 0) {
    const meshInstance = meshInstances[0];
    // このメッシュインスタンスを所有するエンティティを見つける
    const pickedEntity = findEntityByMeshInstance(meshInstance);
}
```

メッシュインスタンスを所有する GSplat エンティティに一致させるには、`gsplat.instance.meshInstance` プロパティと比較します：

```javascript
// 一致するメッシュインスタンスを持つエンティティを見つける
const entity = entities.find(e => e.gsplat.instance.meshInstance === meshInstance);
```

## ワールド位置の取得

`getWorldPointAsync()` を使用して、ピッキングされたポイントの3Dワールド位置を取得します：

```javascript
const worldPoint = await picker.getWorldPointAsync(x, y);
if (worldPoint) {
    // worldPoint は3D位置を含む Vec3
    console.log('ピッキングされた位置:', worldPoint.x, worldPoint.y, worldPoint.z);
}
```

## 完全なサンプル

オブジェクト識別とワールド位置を組み合わせた一般的なピッキングワークフローは次のとおりです：

```javascript
const handlePick = async (mouseX, mouseY) => {
    // パフォーマンスのために低解像度を使用
    const pickerScale = 0.25;
    picker.resize(canvas.clientWidth * pickerScale, canvas.clientHeight * pickerScale);

    // ピッカーを準備
    const worldLayer = app.scene.layers.getLayerByName('World');
    picker.prepare(camera.camera, app.scene, [worldLayer]);

    const x = mouseX * pickerScale;
    const y = mouseY * pickerScale;

    // ワールド位置を取得
    const worldPoint = await picker.getWorldPointAsync(x, y);
    if (!worldPoint) return;

    // ピッキングされたオブジェクトを取得
    const meshInstances = await picker.getSelectionAsync(x, y, 1, 1);
    if (meshInstances.length === 0) return;

    const meshInstance = meshInstances[0];

    // このメッシュインスタンスを所有する gsplat エンティティを見つける
    const entity = splatEntities.find(
        e => e.gsplat.instance.meshInstance === meshInstance
    );

    if (entity) {
        // 必要に応じてワールド位置をエンティティのローカル空間に変換
        const localPos = entity.getWorldTransform()
            .clone()
            .invert()
            .transformPoint(worldPoint);

        console.log('ピッキングされたエンティティ:', entity.name);
        console.log('ローカル位置:', localPos);
    }
};

// マウスクリックを処理
app.mouse.on(pc.EVENT_MOUSEDOWN, (event) => {
    handlePick(event.x, event.y);
});

// タッチイベントを処理
app.touch.on(pc.EVENT_TOUCHSTART, (event) => {
    const touch = event.touches[0];
    handlePick(touch.x, touch.y);
});
```

## デバッグ

ピッカーは内部バッファを公開しており、デバッグに役立ちます：

```javascript
// カラーバッファを表示（オブジェクトID）
if (picker.colorBuffer) {
    app.drawTexture(0.55, -0.77, 0.2, 0.2, picker.colorBuffer);
}

// 深度バッファを表示
if (picker.depthBuffer) {
    app.drawTexture(0.77, -0.77, 0.2, 0.2, picker.depthBuffer);
}
```

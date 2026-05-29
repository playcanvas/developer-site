---
title: ピッキング
description: "Gaussianスプラットで PlayCanvas Picker を使う：ID設定、深度ピッキング、ワールド位置の取得、コード例です。"
---

PlayCanvas Engine は、指定されたピクセルでレンダリングされたオブジェクトをクエリできる[Picker API](https://api.playcanvas.com/engine/classes/Picker.html)を提供します。ピッカーは、メッシュの場合と同じ方法でスプラットと連携します。

**ライブデモを見る** - インタラクティブな選択とワールド位置検出によるスプラットピッキングの動作を確認できます。

<EngineExample id="gaussian-splatting/picking" title="ライブデモを見る" />

## Picker のセットアップ

スプラットをピッキングするには、深度を有効にして（3番目のパラメータを `true` に設定）Picker インスタンスを作成します：

```javascript
// ワールド位置検出のために深度バッファをサポートしたピッカーを作成
const picker = new pc.Picker(app, 1, 1, true);
```

深度バッファは、クリックされたオブジェクトを識別するだけでなく、ピッキングされたポイントの3Dワールド位置を取得する場合に必要です。

また、シーンの gsplat マネージャーで ID トラッキングを有効にする必要があります。これはスプラットをレンダリングする前に行う必要があります：

```javascript
// ピッカーがスプラットコンポーネントを識別できるよう gsplat ID を有効化
app.scene.gsplat.enableIds = true;
```

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

`getSelectionAsync()` を使用して、スクリーン位置でピッキングされたオブジェクトを取得します。ピッカーは `GSplatComponent` を直接返します：

```javascript
const selection = await picker.getSelectionAsync(x, y, 1, 1);
if (selection.length > 0) {
    // selection には GSplatComponent インスタンスが含まれます
    const gsplatComponent = selection[0];
    // このコンポーネントを所有するエンティティを見つける
    const entity = entities.find(e => e.gsplat === gsplatComponent);
}
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

一般的なピッキングワークフローは次のとおりです：

```javascript
// スプラットピッキング用に ID トラッキングを有効化
app.scene.gsplat.enableIds = true;

// スプラットエンティティを作成
const splat = new pc.Entity('splat');
splat.addComponent('gsplat', {
    asset: splatAsset
});
app.root.addChild(splat);

// 深度サポート付きでピッカーを作成
const picker = new pc.Picker(app, 1, 1, true);

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
    const selection = await picker.getSelectionAsync(x, y, 1, 1);
    if (selection.length === 0) return;

    // selection には GSplatComponent が直接含まれます
    const gsplatComponent = selection[0];

    // このコンポーネントを所有するエンティティを見つける
    const entity = splatEntities.find(e => e.gsplat === gsplatComponent);

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

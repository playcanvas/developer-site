---
title: ピッキング
---

PlayCanvas Engine は、指定されたピクセルでレンダリングされたオブジェクトをクエリできる[Picker API](https://api.playcanvas.com/engine/classes/Picker.html)を提供します。ピッカーは、メッシュの場合と同じ方法でスプラットと連携します。

**[ライブデモを見る](https://playcanvas.github.io/#/gaussian-splatting/picking)** - インタラクティブな選択とワールド位置検出によるスプラットピッキングの動作を確認できます。

## Unified モードと Non-Unified モード

GSplat コンポーネントは Unified または Non-Unified レンダリングモードで動作できます（詳細は[統合スプラットレンダリング](../unified-rendering/)を参照）。ピッキングの動作はこれらのモード間で異なります：

- **Unified モード**：ピッキングは `GSplatComponent` を直接返します。
- **Non-Unified モード**：ピッキングはメッシュインスタンスを返し、それを使用して所有するエンティティを見つけます。

## Picker のセットアップ

スプラットをピッキングするには、深度を有効にして（3番目のパラメータを `true` に設定）Picker インスタンスを作成します：

```javascript
// ワールド位置検出のために深度バッファをサポートしたピッカーを作成
const picker = new pc.Picker(app, 1, 1, true);
```

深度バッファは、クリックされたオブジェクトを識別するだけでなく、ピッキングされたポイントの3Dワールド位置を取得する場合に必要です。

### Unified モードのセットアップ

Unified モードを使用する場合、シーンの gsplat マネージャーで ID トラッキングを有効にする必要があります。これはスプラットをレンダリングする前に行う必要があります：

```javascript
// Unified ピッキング用に gsplat ID を有効化
app.scene.gsplat.enableIds = true;
```

また、gsplat コンポーネントを `unified: true` で作成することを確認してください：

```javascript
entity.addComponent('gsplat', {
    asset: splatAsset,
    unified: true
});
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

`getSelectionAsync()` を使用して、スクリーン位置でピッキングされたオブジェクトを取得します。戻り値はレンダリングモードによって異なります。

### Unified モード

Unified モードでは、ピッカーは `GSplatComponent` を直接返します：

```javascript
const selection = await picker.getSelectionAsync(x, y, 1, 1);
if (selection.length > 0) {
    // Unified モードでは、selection には GSplatComponent インスタンスが含まれます
    const gsplatComponent = selection[0];
    // このコンポーネントを所有するエンティティを見つける
    const entity = entities.find(e => e.gsplat === gsplatComponent);
}
```

### Non-Unified モード

Non-Unified モードでは、ピッカーはメッシュインスタンスを返します：

```javascript
const meshInstances = await picker.getSelectionAsync(x, y, 1, 1);
if (meshInstances.length > 0) {
    const meshInstance = meshInstances[0];
    // 一致するメッシュインスタンスを持つエンティティを見つける
    const entity = entities.find(e => e.gsplat.instance.meshInstance === meshInstance);
}
```

## ワールド位置の取得

`getWorldPointAsync()` を使用して、ピッキングされたポイントの3Dワールド位置を取得します。これは両方のモードで同じように動作します：

```javascript
const worldPoint = await picker.getWorldPointAsync(x, y);
if (worldPoint) {
    // worldPoint は3D位置を含む Vec3
    console.log('ピッキングされた位置:', worldPoint.x, worldPoint.y, worldPoint.z);
}
```

## 完全なサンプル（Unified モード）

Unified モードの一般的なピッキングワークフローは次のとおりです：

```javascript
// Unified ピッキング用に ID トラッキングを有効化
app.scene.gsplat.enableIds = true;

// Unified モードでスプラットエンティティを作成
const splat = new pc.Entity('splat');
splat.addComponent('gsplat', {
    asset: splatAsset,
    unified: true
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

    // Unified モードでは、selection には GSplatComponent が直接含まれます
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

## 完全なサンプル（Non-Unified モード）

Non-Unified モードの一般的なピッキングワークフローは次のとおりです：

```javascript
// スプラットエンティティを作成（Non-Unified がデフォルト）
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

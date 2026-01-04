---
title: アセットレジストリ
---

[`AssetRegistry`](https://api.playcanvas.com/engine/classes/AssetRegistry.html) は、PlayCanvas でアセットを管理するための中心的なシステムです。アプリケーションで利用可能なすべてのアセットのコレクションを保持し、アセットの検索、読み込み、管理を行うためのメソッドを提供します。

## レジストリへのアクセス

アセットレジストリは、アプリケーションオブジェクトを通じてアクセスできます。

```javascript
const assets = this.app.assets;
```

## アセットの検索

### ID による検索

すべてのアセットには一意の数値 ID があります。これはアセットを参照する最も確実な方法です。

```javascript
const asset = this.app.assets.get(123456);
```

### 名前による検索

名前でアセットを検索します。最初に一致したアセットを返します。

```javascript
const asset = this.app.assets.find('My Texture');
```

指定した名前を持つすべてのアセットを検索します。

```javascript
const assets = this.app.assets.findAll('Enemy');
```

### タグによる検索

アセットにはタグを付けてグループ化することができます。特定のタグを持つすべてのアセットを検索します。

```javascript
const levelAssets = this.app.assets.findByTag('level-1');
```

複数のタグに一致するアセットを検索します（AND ロジック）。

```javascript
// 'level-1' と 'enemy' の両方のタグが付いたアセット
const enemies = this.app.assets.findByTag('level-1', 'enemy');
```

複数のタグのいずれかに一致するアセットを検索します（OR ロジック）。

```javascript
// 'level-1' または 'level-2' のタグが付いたアセット
const assets = this.app.assets.findByTag(['level-1', 'level-2']);
```

## アセットイベント

レジストリは、アセットが追加、削除、または読み込まれたときにイベントを発行します。

### レジストリイベント

```javascript
// アセットがレジストリに追加された
this.app.assets.on('add', (asset) => {
    console.log('Asset added:', asset.name);
});

// アセットがレジストリから削除された
this.app.assets.on('remove', (asset) => {
    console.log('Asset removed:', asset.name);
});

// アセットが読み込まれた
this.app.assets.on('load', (asset) => {
    console.log('Asset loaded:', asset.name);
});

// アセットの読み込みに失敗した
this.app.assets.on('error', (err, asset) => {
    console.error('Failed to load:', asset.name, err);
});
```

### 個別のアセットイベント

特定のアセットのイベントをリッスンすることもできます。

```javascript
const asset = this.app.assets.find('My Texture');

// アセットのリソースが準備できたときに呼び出される
asset.on('load', (asset) => {
    console.log('Texture loaded:', asset.resource);
});

// 読み込みに失敗したときに呼び出される
asset.on('error', (err, asset) => {
    console.error('Failed:', err);
});

// アセットがレジストリから削除されたときに呼び出される
asset.on('remove', (asset) => {
    console.log('Asset removed');
});

// プロパティが変更されたときに呼び出される
asset.on('change', (asset, property, newValue, oldValue) => {
    console.log(`${property} changed from ${oldValue} to ${newValue}`);
});
```

### ready() の使用

`ready()` メソッドは、アセットが読み込まれたときにコードを実行する便利な方法です。アセットがすでに読み込まれている場合、コールバックは即座に実行されます。

```javascript
const asset = this.app.assets.find('My Texture');

asset.ready((asset) => {
    // ここではアセットが読み込まれていることが保証されています
    const texture = asset.resource;
    material.diffuseMap = texture;
});

// まだ読み込まれていない場合は、読み込みをトリガーする
this.app.assets.load(asset);
```

## 実行時にアセットを追加する

実行時に新しいアセットを作成してレジストリに追加することができます。

```javascript
const asset = new pc.Asset('New Texture', 'texture', {
    url: 'path/to/texture.png'
});

this.app.assets.add(asset);
this.app.assets.load(asset);
```

## 関連項目

- [プリロード](preloading) - アプリ開始前に読み込むアセットを制御する
- [読み込みとアンロード](loading-unloading) - アセットの動的な読み込み管理
- [`AssetRegistry` API リファレンス](https://api.playcanvas.com/engine/classes/AssetRegistry.html)

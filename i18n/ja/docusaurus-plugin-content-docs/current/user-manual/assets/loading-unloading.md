---
title: 読み込みとアンロード
---

PlayCanvas は、実行時にアセットを動的に読み込みおよびアンロードするための API を提供しています。これにより、メモリ使用量をきめ細かく制御し、必要に応じてコンテンツをストリーミングすることができます。

## アセットの読み込み

### 登録済みアセットの読み込み

アセットレジストリに既に存在するアセット（エディタで追加されたアセットなど）の場合は、`app.assets.load()` を使用します。

```javascript
const asset = this.app.assets.find('My Texture');

asset.ready((asset) => {
    // アセットが読み込まれ、使用可能になった
    const texture = asset.resource;
});

this.app.assets.load(asset);
```

### URL からの読み込み

実行時に URL からアセットを読み込むには、`app.assets.loadFromUrl()` を使用します。

```javascript
this.app.assets.loadFromUrl('path/to/texture.png', 'texture', (err, asset) => {
    if (err) {
        console.error('Failed to load texture:', err);
        return;
    }
    
    // アセットが読み込まれ、レジストリに追加された
    const texture = asset.resource;
});
```

2 番目のパラメータはアセットタイプを指定します。一般的なタイプには以下があります。
- `texture` - 画像（PNG、JPG、WebP など）
- `model` - 3D モデル（GLB）
- `audio` - サウンドファイル（MP3、OGG、WAV）
- `json` - JSON データ
- `binary` - バイナリデータ
- `css` - スタイルシート
- `html` - HTML ドキュメント
- `script` - JavaScript ファイル
- `shader` - シェーダーコード

### オプション付きの読み込み

URL から読み込む際に追加オプションを渡すことができます。

```javascript
this.app.assets.loadFromUrlAndFilename(
    'path/to/model.glb',
    'model.glb',
    'container',
    (err, asset) => {
        if (err) {
            console.error('Failed to load model:', err);
            return;
        }
        
        // 読み込んだモデルからエンティティを作成
        const entity = asset.resource.instantiateRenderEntity();
        this.app.root.addChild(entity);
    }
);
```

## 読み込みイベントの処理

### ready() の使用

`ready()` メソッドは、アセットが読み込まれたときにコールバックを実行します。アセットが既に読み込まれている場合、コールバックは即座に実行されます。

```javascript
const asset = this.app.assets.find('My Model');

asset.ready((asset) => {
    // ここで asset.resource を安全に使用できる
});

// まだ読み込まれていない場合は読み込みをトリガー
if (!asset.loaded) {
    this.app.assets.load(asset);
}
```

### イベントの使用

個別のアセットまたはレジストリで読み込みイベントをリッスンできます。

```javascript
// 特定のアセットでリッスン
asset.on('load', (asset) => {
    console.log('Asset loaded:', asset.name);
});

asset.on('error', (err, asset) => {
    console.error('Load failed:', asset.name, err);
});

// レジストリで任意のアセットをリッスン
this.app.assets.on('load', (asset) => {
    console.log('Some asset loaded:', asset.name);
});
```

## アセットのアンロード

メモリを解放するには、不要になったアセットをアンロードできます。

```javascript
const asset = this.app.assets.find('Large Texture');

// リソースをアンロードするが、アセットはレジストリに残す
asset.unload();

// アセットは後で再度読み込むことができる
this.app.assets.load(asset);
```

### アセットの削除

アセットをレジストリから完全に削除するには：

```javascript
const asset = this.app.assets.find('Temporary Asset');

// レジストリから削除（リソースもアンロードされる）
this.app.assets.remove(asset);
```

## 複数アセットの読み込み

複数のアセットを読み込み、すべての完了を待つには：

```javascript
const assetNames = ['texture1', 'texture2', 'model1'];
const assets = assetNames.map(name => this.app.assets.find(name));

let loaded = 0;
const total = assets.length;

const onAssetLoad = () => {
    loaded++;
    if (loaded === total) {
        // すべてのアセットが読み込まれた
        this.onAllAssetsReady();
    }
};

for (const asset of assets) {
    asset.ready(onAssetLoad);
    if (!asset.loaded) {
        this.app.assets.load(asset);
    }
}
```

## ベストプラクティス

- **未使用アセットをアンロードする** - レベルやシーンを切り替える際にアセットをアンロードしてメモリを解放する
- **ready() を使用する** - 読み込み済みと未読み込みの両方のケースを処理できる
- **エラーを処理する** - 動的読み込みには常にエラーハンドリングを提供する
- **まとめて読み込む** - 関連するアセットを一緒に読み込み、視覚的な不整合を避ける

## 関連項目

- [アセットレジストリ](asset-registry) - アセットの検索と管理
- [プリロード](preloading) - アプリ開始前のアセット読み込み

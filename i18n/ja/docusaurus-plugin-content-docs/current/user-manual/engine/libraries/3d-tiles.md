---
title: 3D Tiles
description: フォトグラメトリ、都市モデル、地形などの大規模な3Dデータセットを、3DTilesRendererJSのPlayCanvasレンダラーを使って3D Tiles形式でストリーミングします。
---

[3D Tiles](https://www.ogc.org/standards/3DTiles) は、フォトグラメトリ、都市モデル、地形などの大規模な3Dデータセットをストリーミングするためのオープン標準です。タイルセットは詳細度の異なるタイルのツリーになっているため、ビューアーはカメラに必要なタイルだけを、ビューに必要な詳細度で読み込みます。

NASA-AMMOSの [3DTilesRendererJS](https://github.com/NASA-AMMOS/3DTilesRendererJS) は3D Tilesを読み込んでレンダリングするライブラリで、PlayCanvas用のレンダラーを含んでいます。タイルのコンテンツはエンジンのglTFパーサーで読み込まれるため、エンジンが対応しているglTF拡張はタイルでも使用でき、WebGPUとWebGL 2でレンダリングされます。

## インストール

ライブラリとエンジンをnpmからインストールします:

```bash
npm install 3d-tiles-renderer playcanvas
```

PlayCanvasレンダラーは `3d-tiles-renderer/playcanvas` からインポートします。

## タイルセットのレンダリング

タイルセットの `tileset.json` のURLを指定して `TilesRenderer` を作成し、読み込むタイルを決めるカメラを渡して、ルートエンティティをシーンに追加し、毎フレーム更新します:

```javascript
import { TilesRenderer } from '3d-tiles-renderer/playcanvas';

const tiles = new TilesRenderer('https://example.com/tileset/tileset.json', app);
tiles.setCamera(camera.camera);
app.root.addChild(tiles.group);

// カメラが移動した後、毎フレームタイルを更新する
app.on('update', () => {
    tiles.update();
});
```

タイルは `container` アセットとして読み込まれ、`tiles.group` の下にレンダーコンポーネントを持つエンティティとして作成されます。`Application` には必要なものがすべて含まれています。`AppBase` を使うアプリケーションでは、`RenderComponentSystem` と、`ContainerHandler` および `TextureHandler` リソースハンドラーが必要です。

タイルセットは独自の座標系で配置されているため、`tiles.group` または親エンティティを移動、回転、スケールして、シーン内に配置してください。

## 設定

| プロパティ | 説明 |
| --- | --- |
| `errorTarget` | より詳細なタイルが代わりに読み込まれるまでに、タイルに許容されるスクリーンスペースの誤差 (ピクセル単位)。値を小さくすると、より詳細に、より多くのデータが読み込まれます。デフォルトは16です。 |
| `lruCache.minBytesSize`、`lruCache.maxBytesSize` | 読み込まれたタイルのメモリ予算。デフォルトは0.3 GiBと0.4 GiBです。 |
| `fetchOptions` | すべてのリクエストで `fetch` に渡されるオプション。`mode`、`credentials`、`headers` などです。 |
| `renderOptions` | タイルのレンダーコンポーネントのオプション。`castShadows`、`receiveShadows`、`layers` などです。 |
| `assetOptions` | タイルを読み込む `container` アセットのオプション。glTFパーサーのコールバックなどです。 |

フォトグラメトリのタイルは、大きなテクスチャを含むことがよくあります。メモリ予算がビューに対して小さすぎると、他のタイルのためにタイルがアンロードされ、ビューの読み込みが完了しない場合があります。そのようなタイルセットでは、対象とするデバイスのメモリを考慮しながら予算を増やしてください。

## 圧縮されたコンテンツ

Draco圧縮メッシュやKTX2テクスチャを含むタイルは、タイルを読み込む前にエンジンのデコーダーを設定する必要があります。設定しないと、それらのタイルは読み込みに失敗します:

```javascript
import { basisInitialize, dracoInitialize } from 'playcanvas';

dracoInitialize({
    jsUrl: 'wasm/draco/draco.wasm.js',
    wasmUrl: 'wasm/draco/draco.wasm.wasm'
});

basisInitialize({
    glueUrl: 'wasm/basis/basis.wasm.js',
    wasmUrl: 'wasm/basis/basis.wasm.wasm',
    fallbackUrl: 'wasm/basis/basis.js'
});
```

デコーダーは `playcanvas` npmパッケージには含まれていません。エンジンのリポジトリの [`examples/assets/wasm`](https://github.com/playcanvas/engine/tree/main/examples/assets/wasm) にあります。

## 読み込まれたタイルのカスタマイズ

レンダラーは動作に応じてイベントを発行します。`load-model` イベントは、タイルが読み込まれるたびに、そのコンテンツ用に作成されたエンティティとともに発行されるため、マテリアルを変更できます。たとえばフォトグラメトリのタイルは通常アンリットで、色はエミッシブマップに入っています。ライティングを適用して影も受けるようにするには、色をディフューズマップに移します:

```javascript
tiles.on('load-model', ({ scene }) => {
    for (const render of scene.findComponents('render')) {
        for (const meshInstance of render.meshInstances) {
            const material = meshInstance.material;
            material.diffuseMap = material.emissiveMap;
            material.emissiveMap = null;
            material.emissive.set(0, 0, 0);
            material.useLighting = true;
            material.update();
        }
    }
});
```

イベントは `on` と `off`、または `addEventListener` と `removeEventListener` で購読できます。

## プラグイン

プラグインはレンダラーを拡張します。たとえば、タイルサービスでの認証や、タイルセットの機能への対応を追加します。`registerPlugin` で登録します:

```javascript
tiles.registerPlugin(plugin);
```

`3d-tiles-renderer/core/plugins` にある、エンジンに依存しないライブラリのプラグインは、PlayCanvasレンダラーで動作します。プラグインは、レンダラーがタイルセットを読み込む間に呼び出すフックを持つ、単純なオブジェクトにすることもできます。下のHelsinkiのサンプルは、この方法でタイルセットを調整しています。

## 制限事項

- 対応しているタイルのコンテンツは、glTF、GLB、B3DMのみです。
- 対応しているバウンディングボリュームは `box` と `sphere` のみです。`region` ボリュームしか持たないタイルは表示されません。
- エンジンのトランスフォームは32ビットのため、地球上に配置され、原点から数百万メートル離れた座標を持つタイルセットは、正確にレンダリングされません。そのようなタイルセットは、エンジンに渡す前に倍精度で原点近くに配置し直す必要があります。Helsinkiのサンプルは、プラグインでこれを行っています。
- タイルに対するレイキャストには対応していません。

## サンプル

<EngineExample id="integrations/mars-3d-tiles" title="Mars 3D Tiles" />

<EngineExample id="integrations/helsinki-3d-tiles" title="Helsinki 3D Tiles" />

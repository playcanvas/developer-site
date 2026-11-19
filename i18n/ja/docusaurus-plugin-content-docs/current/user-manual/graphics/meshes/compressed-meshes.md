---
title: 圧縮メッシュ
description: Draco または meshopt で圧縮された GLB モデルを PlayCanvas で読み込み、モデルのダウンロードサイズを削減するために両者を使い分けます。
---

GLB ファイルのサイズの大部分は、多くの場合ジオメトリが占めています。ジオメトリを圧縮するとファイルを数分の一に小さくでき、ダウンロードが速くなります。その代わり、読み込み時にデコードが必要になります。

エンジンは、glTF の代表的な 2 つの圧縮方式のいずれかで圧縮された GLB および glTF ファイルを読み込めます。

| 方式 | glTF 拡張 | デコーダー |
|------|-----------|------------|
| [Draco](https://google.github.io/draco/) | `KHR_draco_mesh_compression` | Draco WebAssembly モジュール (Web Worker 上で実行) |
| [meshopt](https://meshoptimizer.org/) | `EXT_meshopt_compression`, `KHR_meshopt_compression` | meshoptimizer デコーダーモジュール |

どちらのデコーダーもエンジンには含まれていません。以下で説明するように、デコーダーのファイルをアプリケーションと一緒に配信し、その場所をエンジンに指定します。デコーダーなしで圧縮ファイルを読み込むと、読み込みに失敗します。

## 方式の選択

どちらの方式もジオメトリを大幅に縮小しますが、仕組みが異なります。

- **Draco** はメッシュプリミティブ (頂点位置、法線、テクスチャ座標などの属性とインデックス) を圧縮します。静的なジオメトリでは通常もっとも小さなファイルになりますが、デコードが比較的遅いため、エンジンは Web Worker 上でデコードします。Draco はアニメーションやモーフターゲットを圧縮しません。
- **meshopt** は glTF のバッファビュー自体を圧縮するため、頂点属性、インデックス、アニメーションのキーフレーム、モーフターゲットなど、ファイル内のすべてのバイナリデータに適用されます。ファイルは通常 Draco よりやや大きくなりますが、デコードははるかに高速です。また、meshopt で圧縮したデータは、Web サーバーが適用する gzip や Brotli 圧縮でさらに小さくなります。

アニメーションやスキニングを含むモデルや、低速なデバイスでの読み込み時間が重要な場合は meshopt を、静的なジオメトリのダウンロードサイズを最小にしたい場合は Draco を選ぶとよいでしょう。

テクスチャはどちらの方式でも圧縮されません。テクスチャも圧縮するには、[Basis](/user-manual/optimization/texture-compression/) テクスチャを使用してください。

## Draco

### Draco ファイルの作成

- [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline): `gltf-pipeline -i model.glb -o model-draco.glb -d`
- [glTF-Transform](https://gltf-transform.dev/): `gltf-transform draco model.glb model-draco.glb`
- Blender の glTF エクスポーターで **Compression** オプションを有効にする。
- エディターはモデルのインポート時に Draco で圧縮できます。インポート設定の[メッシュ圧縮](/user-manual/editor/assets/import-pipeline/#mesh-compression)を参照してください。

### Draco ファイルの読み込み

Draco デコーダーは、WebAssembly モジュールと JavaScript のグルースクリプトで構成されます。[Draco のリリース](https://github.com/google/draco/releases)からファイルを入手するか、エンジンの[サンプル](https://github.com/playcanvas/engine/tree/main/examples/assets/wasm/draco)にあるファイル一式をコピーし、Draco 圧縮モデルを読み込む前にその URL をエンジンに設定します。

```javascript
import { WasmModule } from 'playcanvas';

WasmModule.setConfig('DracoDecoderModule', {
    glueUrl: 'lib/draco/draco.wasm.js',
    wasmUrl: 'lib/draco/draco.wasm.wasm',
    fallbackUrl: 'lib/draco/draco.js'
});

// 必要に応じて、モデルを読み込む前にデコーダーの読み込みを待つ
await new Promise((resolve) => {
    WasmModule.getInstance('DracoDecoderModule', resolve);
});
```

または、[`dracoInitialize`](https://api.playcanvas.com/engine/functions/dracoInitialize.html) でデコーダーを直接設定することもできます。この方法では、並列にデコードする Worker の数も指定できます。

```javascript
import { dracoInitialize } from 'playcanvas';

dracoInitialize({
    jsUrl: 'lib/draco/draco.wasm.js',
    wasmUrl: 'lib/draco/draco.wasm.wasm',
    numWorkers: 2,
    lazyInit: true  // 最初の Draco メッシュが読み込まれるときに Worker を開始する
});
```

どちらも行わない場合、エンジンはページと同じ場所にある `draco.wasm.js` と `draco.wasm.wasm` を探します。

エディターでは、[レンダリング設定](/user-manual/editor/interface/settings/rendering/)の **Draco Library** ボタンでデコーダーをプロジェクトに追加すると、エンジンが自動的に設定されます。

動作するプロジェクトについては、[Draco 圧縮 GLB の読み込み](/tutorials/loading-draco-compressed-glbs/)チュートリアルを参照してください。

## Meshopt

meshopt のサポートには Engine 2.24 以降が必要です。

### Meshopt ファイルの作成

- [gltfpack](https://meshoptimizer.org/gltf/): `gltfpack -i model.glb -o model-meshopt.glb -cc`。`-c` オプションで圧縮し、`-cc` でさらに強く圧縮します。gltfpack は `KHR_mesh_quantization` で頂点データの量子化も行い、エンジンはこれに対応しています。
- [glTF-Transform](https://gltf-transform.dev/): `gltf-transform meshopt model.glb model-meshopt.glb`

### Meshopt ファイルの読み込み

デコーダーは、[meshoptimizer](https://github.com/zeux/meshoptimizer/tree/master/js) JavaScript パッケージの `meshopt_decoder.mjs` です。meshopt 圧縮モデルを読み込む前に、[`meshoptInitialize`](https://api.playcanvas.com/engine/functions/meshoptInitialize.html) で初期化します。デコーダーモジュールの URL を渡すと、最初に meshopt 圧縮ファイルが読み込まれるときにエンジンがそのモジュールをインポートします。

```javascript
import { meshoptInitialize } from 'playcanvas';

meshoptInitialize({ url: 'lib/meshopt/meshopt_decoder.mjs' });
```

アプリケーションをバンドルする場合は、`meshoptimizer` npm パッケージからデコーダーをインポートして渡すこともできます。

```javascript
import { MeshoptDecoder } from 'meshoptimizer';
import { meshoptInitialize } from 'playcanvas';

meshoptInitialize({ decoder: MeshoptDecoder });
```

相対的な `url` は、ドキュメント内の他の URL と同様にページを基準に解決されます。`KHR_meshopt_compression` を使用するファイルには、meshoptimizer 1.0 以降のデコーダーが必要です。

デフォルトでは、デコーダーはメインスレッドで実行されます。ほとんどのモデルではこれで十分高速です。大きなファイルをメインスレッドをブロックせずにデコードするには、`numWorkers` を設定して Web Worker 上でデコードします。

```javascript
meshoptInitialize({ url: 'lib/meshopt/meshopt_decoder.mjs', numWorkers: 2 });
```

デコーダーを初期化すれば、meshopt 圧縮モデルは他のモデルと同様に `container` アセットとして読み込めます。

```javascript
import { Asset } from 'playcanvas';

const asset = new Asset('model', 'container', { url: 'models/model-meshopt.glb' });
asset.ready(() => {
    const entity = asset.resource.instantiateRenderEntity();
    app.root.addChild(entity);
});
app.assets.add(asset);
app.assets.load(asset);
```

デコーダーが初期化されていない場合、バッファビューが meshopt で圧縮されていることを示し、`meshoptInitialize` に言及するエラーで読み込みが失敗します。例外は、gltfpack の `-cf` で書き出したファイルのように、非圧縮のフォールバックデータも含むファイルです。デコーダーがない場合はエンジンがフォールバックデータを読み込み、デコーダーがある場合はフォールバックデータのダウンロードを省略します。

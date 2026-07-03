---
title: SPZ 形式
description: 3D Gaussian splat向けのSPZ形式。Nianticの圧縮スプラット形式、外部パーサースクリプトによるエンジンでの読み込み、SplatTransformでの変換を説明します。
sidebar_label: SPZ
---

**SPZ**は、[Niantic](https://github.com/nianticlabs/spz)によるオープンソースの3D Gaussian Splatデータ圧縮形式です。量子化されたスプラット属性をZSTD圧縮ストリームに格納し、視覚品質の知覚的な損失をほとんど伴わずに、PLYと比べてファイルサイズを約10分の1にします。Scaniverseなどのアプリのネイティブ形式です。

これらのファイルは**[SplatTransform](/user-manual/splat-transform/)**で作成でき、パーサースクリプトを使用してPlayCanvasエンジンで読み込むことができます。

## SPZファイルの作成

[SplatTransform](/user-manual/splat-transform/)を使用して、サポートされている任意のスプラット形式から変換します。

```bash
splat-transform scene.ply scene.spz
```

デフォルトではSPZバージョン4で書き出されます。これはエンジンのパーサーがサポートするバージョンです。

## PlayCanvasでの読み込み

SPZパーサーはエンジン本体には含まれていません。エンジンに同梱されるスクリプト ([`scripts/esm/parsers/spz-parser.mjs`](https://github.com/playcanvas/engine/blob/main/scripts/esm/parsers/spz-parser.mjs)) として提供され、アプリケーションが`gsplat`リソースハンドラーに登録します。

SPZの属性ストリームはZSTDで圧縮されているため、パーサーにはZSTD展開用のWebAssemblyモジュールも必要です。Dracoモジュールと同じ方法で登録します。ビルド済みのモジュールは[エンジンのリポジトリ](https://github.com/playcanvas/engine/tree/main/examples/assets/wasm/zstd)から入手できます。

```javascript
import { SpzParser } from 'playcanvas/scripts/esm/parsers/spz-parser.mjs';

// spzの属性ストリームはZSTD圧縮されているため、デコーダーモジュールを登録します
pc.WasmModule.setConfig('ZstdDecoderModule', {
    glueUrl: 'zstd.wasm.js',
    wasmUrl: 'zstd.wasm.wasm'
});

// spzパーサーをgsplatリソースハンドラーに登録します
app.loader.getHandler('gsplat').addParser(new SpzParser(app));

// spzファイルは通常のgsplatアセットとして読み込めます
const asset = new pc.Asset('scene', 'gsplat', { url: 'scene.spz' });
app.assets.add(asset);
app.assets.load(asset);
```

完全なセットアップについては、[simple-spzのサンプル](https://playcanvas.github.io/#/gaussian-splatting/simple-spz)を参照してください。

## エンジンサポートに関する注意

- SPZ**バージョン4**のみがサポートされています。旧形式のgzipベースのファイル (バージョン1～3) は読み込めません。[SplatTransform](/user-manual/splat-transform/)で再変換してください。
- スプラットデータは量子化されたままGPUメモリに保持され (スプラットあたり約20バイト + 球面調和関数)、シェーダーで逆量子化されます。そのため、GPUメモリ使用量は非圧縮形式ではなく、圧縮PLYやSOGと同程度です。
- 球面調和関数は3バンドまでサポートされています。4次の球面調和関数を持つファイルは、超過分のバンドが無視された状態で読み込まれます。
- **座標系**: スプラットデータは (glTFと同様に) +Yが上の座標系を使用するため、PLYファイルとは異なり、読み込んだスプラットをシーンに配置する際に反転回転は不要です。
- `antialiased`フラグとベンダー拡張は無視されます。

## SPZを使用するタイミング

スプラットアセットが既にこの形式で存在する場合に使用してください。たとえば、Scaniverseで撮影したスキャンや、Nianticエコシステムのツールで作成されたコンテンツなどです。

:::tip

Web配信には引き続き[SOG](./sog.md)が推奨される形式です。より高い圧縮率とより高速な読み込みを実現し、エンジンで標準サポートされています。

:::

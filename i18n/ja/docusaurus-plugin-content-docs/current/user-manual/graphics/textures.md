---
title: テクスチャ
description: コードからテクスチャを作成して使用する方法を、2Dテクスチャ・キューブマップ・テクスチャ配列・ボリュームテクスチャ、ピクセルフォーマット、データのアップロード、サンプリング、ミップマップ、シェーダー、テクスチャデータの読み戻しとコピーとともに解説します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[テクスチャ](https://api.playcanvas.com/engine/classes/Texture.html)は、GPU上に保存される画像やデータのグリッドです。テクスチャはもっとも一般的には[アセット](../assets/index.md)として読み込まれ、マテリアルで使用されますが、コードから作成してデータを書き込み、カスタムシェーダーでサンプリングしたり、[レンダーターゲット](./advanced-rendering/render-targets.md)を使ってレンダリング先にしたりすることもできます。

## テクスチャの種類 {#texture-types}

| 種類 | 作成方法 | 主な用途 |
| --- | --- | --- |
| 2Dテクスチャ | （デフォルト） | 画像、データマップ、レンダーターゲットの出力 |
| キューブマップ | `cubemap: true` | 環境マップ、反射、オムニライトのシャドウ - 6つの正方形の面 |
| 2Dテクスチャ配列 | `arrayLength: n` | 同じサイズの2Dレイヤーを重ねたもので、レイヤーのインデックスでサンプリングします - 地形のレイヤー、インポスター、スプライトのセット |
| ボリューム（3D）テクスチャ | `volume: true` と `depth: n` | テクセルの3Dグリッドで、3D座標でサンプリングします - フォグや雲のボリューム、3Dルックアップテーブル、ボクセルデータ |

## テクスチャの作成 {#creating-a-texture}

```javascript
const texture = new Texture(app.graphicsDevice, {
    name: 'MyTexture',
    width: 256,
    height: 256,
    format: PIXELFORMAT_RGBA8,
    mipmaps: true,
    minFilter: FILTER_LINEAR_MIPMAP_LINEAR,
    magFilter: FILTER_LINEAR,
    addressU: ADDRESS_CLAMP_TO_EDGE,
    addressV: ADDRESS_CLAMP_TO_EDGE
});
```

他の種類のテクスチャも同じコンストラクタを使用し、オプションで種類を選択します。

```javascript
// 128x128の面を6つ持つキューブマップ
const cubemap = new Texture(app.graphicsDevice, { width: 128, height: 128, cubemap: true });

// 256x256のレイヤーを16個持つテクスチャ配列
const textureArray = new Texture(app.graphicsDevice, { width: 256, height: 256, arrayLength: 16 });

// 64x64x32テクセルのボリュームテクスチャ
const volume = new Texture(app.graphicsDevice, { width: 64, height: 64, depth: 32, volume: true });
```

## ピクセルフォーマット {#pixel-formats}

`format` オプションで、各テクセルの保存形式を選択します。[`Texture`](https://api.playcanvas.com/engine/classes/Texture.html) のAPIリファレンスには、すべてのフォーマットと、WebGL2およびWebGPUでのサポートの詳細が記載されています。主なグループは次のとおりです。

- **8ビットフォーマット** - `PIXELFORMAT_RGBA8`（デフォルト）、`PIXELFORMAT_RG8`、`PIXELFORMAT_R8` で、色や一般的なデータに使用します。
- **sRGBフォーマット** - ほとんどのカラー画像のように、sRGBで作成されたカラーテクスチャには、sRGBフォーマット（例：`PIXELFORMAT_SRGBA8`）か、フォーマットのsRGB版を選択する `srgb: true` オプションを使用します。サンプリング時にリニア空間へ変換されるため、ライティングが物理的に正しく保たれます。[リニアワークフロー](./linear-workflow/index.md)と[sRGBテクスチャの扱い](./linear-workflow/textures.md)を参照してください。
- **HDRフォーマット** - 0から1の範囲外の値のための、半精度浮動小数点（`PIXELFORMAT_RGBA16F`）、単精度浮動小数点（`PIXELFORMAT_RGBA32F`）、小さい浮動小数点（`PIXELFORMAT_111110F`）、およびコンパクトな共有指数の `PIXELFORMAT_RGB9E5` です。[HDRレンダリング](./linear-workflow/hdr-rendering.md)を参照してください。
- **整数フォーマット** - 例えば `PIXELFORMAT_R8U` や `PIXELFORMAT_RGBA32U` で、整数値を保持します。フィルタリングはできず、シェーダーではテクセル座標で読み取ります。
- **圧縮フォーマット** - DXT、ETC、PVRTC、ASTCなどのファミリーで、使用するメモリが大幅に少なくなります。通常はテクスチャアセットから生成されます。[テクスチャ圧縮](../optimization/texture-compression.md)を参照してください。
- **深度フォーマット** - `PIXELFORMAT_DEPTH`、`PIXELFORMAT_DEPTH16`、`PIXELFORMAT_DEPTHSTENCIL` で、レンダーターゲットの深度バッファとして使用します。

すべてのフォーマットにレンダリングできるわけではありません。レンダーターゲットのページの[フォーマットの選択](./advanced-rendering/render-targets.md#choosing-a-format)を参照してください。

## データのアップロード {#uploading-data}

データはテクスチャの作成時に `levels` オプションで指定できます。このオプションは、最上位レベルから順に各ミップレベルのデータを保持します。

- **2Dテクスチャ** - 各レベルは型付き配列、または画像、キャンバス、ImageBitmap、ビデオなどのブラウザの画像ソースです。
- **キューブマップ** - 各レベルは6つの面の配列で、順序は +X、-X、+Y、-Y、+Z、-Z です。
- **テクスチャ配列** - 各レベルは、レイヤーごとのエントリを持つ配列です。
- **ボリュームテクスチャ** - 各レベルは、すべての深度スライスを順に保持する1つの型付き配列です。

```javascript
// すべての深度スライスのデータを書き込んだボリュームテクスチャ
const data = new Uint8Array(64 * 64 * 32 * 4);
// ... スライスごと、行ごとにデータを書き込みます
const volume = new Texture(app.graphicsDevice, {
    width: 64,
    height: 64,
    depth: 32,
    volume: true,
    format: PIXELFORMAT_RGBA8,
    levels: [data]
});
```

データは後から更新することもできます。

- [`lock`](https://api.playcanvas.com/engine/classes/Texture.html#lock) は、書き込むためのミップレベル（またはキューブマップの面）の型付き配列を返し、[`unlock`](https://api.playcanvas.com/engine/classes/Texture.html#unlock) がそれをアップロードします。ボリュームテクスチャの場合、型付き配列はミップレベルのすべての深度スライスを保持します。
- [`setSource`](https://api.playcanvas.com/engine/classes/Texture.html#setsource) は、キャンバスやビデオなどのブラウザの画像ソースを設定します。

```javascript
const pixels = texture.lock();
for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = 255;        // 赤
    pixels[i + 1] = 0;      // 緑
    pixels[i + 2] = 0;      // 青
    pixels[i + 3] = 255;    // アルファ
}
texture.unlock();
```

## サンプリングのオプション {#sampling-options}

テクスチャのフィルタリングとラッピングは次のオプションで設定し、対応するプロパティで後から変更することもできます。

- `minFilter` と `magFilter` - テクスチャが縮小・拡大されるときのフィルタリングです。例えば `FILTER_LINEAR_MIPMAP_LINEAR`（トライリニア）や `FILTER_NEAREST`（フィルタリングなし）です。
- `anisotropy` - 異方性フィルタリングのレベルで、浅い角度でもテクスチャをシャープに保ちます。
- `addressU`、`addressV`、`addressW` - 各方向のラッピングです。例えば `ADDRESS_REPEAT` や `ADDRESS_CLAMP_TO_EDGE` です。`addressW` はボリュームテクスチャに適用されます。

## ミップマップ {#mipmaps}

ミップマップは、テクスチャを縮小してフィルタリングしたもので、遠くでもテクスチャを滑らかかつ高速にサンプリングできるようにします。`mipmaps` オプション（デフォルトで有効）で有効になり、その数はテクスチャの最大の寸法（ボリュームテクスチャの場合は深度も含む）で決まります。`numLevels` オプションで数を明示的に指定することもできます。

データの最上位レベルだけを指定した場合、テクスチャのアップロード時に他のレベルが自動的に生成されます。これはボリュームテクスチャを含むすべての種類のテクスチャに適用されます。圧縮テクスチャと整数テクスチャは生成に対応しておらず、すべてのレベルを指定する必要があります。

ミップマップはテクスチャにレンダリングした後にも生成されます。レンダーターゲットのページの[ミップマップ](./advanced-rendering/render-targets.md#mipmaps)を参照してください。

## シェーダーでのサンプリング {#sampling-in-shaders}

`StandardMaterial` などのマテリアルは、2Dテクスチャとキューブマップをサンプリングします。テクスチャ配列とボリュームテクスチャは[カスタムシェーダー](./shaders/index.md)でサンプリングし、テクスチャに対応する型で宣言します。

| テクスチャの種類 | GLSL | WGSL |
| --- | --- | --- |
| 2Dテクスチャ | `sampler2D` | `texture_2d<f32>` |
| キューブマップ | `samplerCube` | `texture_cube<f32>` |
| 2Dテクスチャ配列 | `sampler2DArray` | `texture_2d_array<f32>` |
| ボリュームテクスチャ | `sampler3D` | `texture_3d<f32>` |

例えば、テクスチャ配列とボリュームテクスチャは次のようになります。

<Tabs groupId="shader-language" queryString="lang">
<TabItem value="glsl" label="GLSL">

```glsl
uniform mediump sampler2DArray uLayers;
uniform mediump sampler3D uVolume;

// フラグメントシェーダー内
vec4 layerColor = texture(uLayers, vec3(uv, layerIndex));
vec4 volumeColor = texture(uVolume, uvw);
```

</TabItem>
<TabItem value="wgsl" label="WGSL">

```wgsl
var uLayers: texture_2d_array<f32>;
var uLayersSampler: sampler;
var uVolume: texture_3d<f32>;
var uVolumeSampler: sampler;

// フラグメントシェーダー内
let layerColor = textureSample(uLayers, uLayersSampler, uv, layerIndex);
let volumeColor = textureSample(uVolume, uVolumeSampler, uvw);
```

</TabItem>
</Tabs>

```javascript
material.setParameter('uLayers', textureArray);
material.setParameter('uVolume', volume);
```

整数テクスチャは整数のサンプラー型（例えばGLSLの `usampler2D`、WGSLの `texture_2d<u32>`）を使用し、`texelFetch` / `textureLoad` でテクセル座標を指定して読み取ります。

WebGPUでは、テクスチャの一部（ミップレベルや配列レイヤーの範囲）を、[`Texture#getView`](https://api.playcanvas.com/engine/classes/Texture.html#getview) で作成した [`TextureView`](https://api.playcanvas.com/engine/classes/TextureView.html) を使ってバインドできます。WebGLでは、テクスチャビューはテクスチャ全体をバインドします。

## 読み戻しとコピー {#reading-back-and-copying}

[`Texture#read`](https://api.playcanvas.com/engine/classes/Texture.html#read) は、テクスチャのピクセルの矩形をGPUからダウンロードし、それを解決するPromiseを返します。キューブマップの面は `face` オプションで、テクスチャ配列のレイヤーは `layer` で、ボリュームテクスチャの深度スライスは `slice` で選択します。`slice` を指定しない場合、ボリュームのすべての深度スライスが1回の操作で順に読み取られます。

```javascript
const pixels = await texture.read(0, 0, texture.width, texture.height, { mipLevel: 0 });

// ボリュームテクスチャの1つの深度スライス、またはすべての深度スライス
const slicePixels = await volume.read(0, 0, volume.width, volume.height, { slice: 5 });
const volumePixels = await volume.read(0, 0, volume.width, volume.height);
```

[`Texture#copy`](https://api.playcanvas.com/engine/classes/Texture.html#copy) は、テクスチャの領域を同じフォーマットの別のテクスチャへGPU上でコピーします。同じ `face`、`layer`、`slice` オプションに対応しており、`slice` を指定しない場合はボリュームテクスチャのすべての深度スライスをコピーします。

```javascript
// ボリュームテクスチャのすべての深度スライスをコピーします
destination.copy(volume);

// テクスチャ配列の1つのレイヤーをコピーします
destinationArray.copy(textureArray, { layer: 3 });
```

## テクスチャへのレンダリング {#rendering-into-textures}

テクスチャにはレンダリングでき、キューブマップの面、テクスチャ配列のレイヤー、ボリュームテクスチャの深度スライスにもレンダリングできます。[レンダーターゲット](./advanced-rendering/render-targets.md)を参照してください。

## テクスチャのメモリ {#texture-memory}

テクスチャは破棄されるまでGPUメモリを保持します。そのサイズは寸法、フォーマット、ミップレベルによって決まり、キューブマップのすべての面、テクスチャ配列のすべてのレイヤー、ボリュームテクスチャのすべての深度スライスが含まれます。テクスチャが使用するメモリは次の方法で確認できます。

- [MiniStats](../optimization/mini-stats.md) は、テクスチャが使用するGPUメモリをVRAMセクションに表示します。
- [Inspector](../scripting/debugging/inspector.md) は、Texturesタブでデバイス上のテクスチャを大きい順に一覧表示し、Memoryタブでビデオメモリをリソースの種類ごとに分類します。

コードから作成したテクスチャは、不要になったら破棄します。

```javascript
texture.destroy();
```

## 関連ページ {#related-pages}

- [レンダーターゲット](./advanced-rendering/render-targets.md) - テクスチャへのレンダリングです。
- [リニアワークフロー](./linear-workflow/index.md)と[sRGBテクスチャの扱い](./linear-workflow/textures.md) - テクスチャの色空間です。
- [HDRレンダリング](./linear-workflow/hdr-rendering.md) - HDRフォーマットとHDRレンダリングです。
- [テクスチャ圧縮](../optimization/texture-compression.md) - 圧縮テクスチャのフォーマットです。
- [シェーダー](./shaders/index.md) - テクスチャをサンプリングするカスタムシェーダーの作成です。
- [MiniStats](../optimization/mini-stats.md)と[Inspector](../scripting/debugging/inspector.md) - テクスチャが使用するメモリの確認です。

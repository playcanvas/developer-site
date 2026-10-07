---
title: レンダーターゲット
description: 画面の代わりにオフスクリーンテクスチャへシーンをレンダリングし、その結果をシーン内で使用する方法を、作成・レイヤー構成・キューブマップの面とテクスチャ配列・ミップマップ・向き・フォーマット・リサイズ・MSAAとともに解説します。
---

[レンダーターゲット](https://api.playcanvas.com/engine/classes/RenderTarget.html)は、画面の代わりにレンダリング先として使用できる矩形のレンダリング面です。1つ以上のレンダリング可能なカラーテクスチャと、オプションの深度（およびステンシル）バッファをラップします。カメラがレンダーターゲットにレンダリングすると、そのカラーテクスチャに結果が保持され、通常のテクスチャと同じように使用できます。もっとも一般的には、マテリアルに適用してシーン内に表示したり、さらに加工したりします。

これは、ゲーム内スクリーン、監視モニター、鏡やポータル、反射や屈折、カスタムのマルチパスパイプラインといった表現の基盤となります。レンダーターゲットは、キューブマップの1つの面や、テクスチャ配列の1つのレイヤーにレンダリングすることもできます。[キューブマップの面とテクスチャ配列のレイヤー](#cubemap-faces-and-texture-array-layers)を参照してください。

## レンダーターゲットの作成 {#creating-a-render-target}

まず、レンダリング先となるカラー[テクスチャ](https://api.playcanvas.com/engine/classes/Texture.html)を作成します。テクスチャは、レンダリング可能で非圧縮のフォーマットを使用する必要があります（後述の[フォーマットの選択](#choosing-a-format)を参照）。

```javascript
const texture = new pc.Texture(app.graphicsDevice, {
    name: 'RT-color',
    width: 512,
    height: 256,
    format: pc.PIXELFORMAT_SRGBA8,
    mipmaps: true,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE
});
```

次に、それをレンダーターゲットでラップします。レンダリングするシーンで深度テストが必要な場合は深度バッファを要求し、ハードウェアアンチエイリアスには `samples` を設定します（[アンチエイリアス](#anti-aliasing)を参照）。

```javascript
const renderTarget = new pc.RenderTarget({
    name: 'RT',
    colorBuffer: texture,
    depth: true,
    origin: pc.RENDERTARGET_ORIGIN_TOP
});
```

[`origin`](#orientation) オプションについては後述します。

## シーンをレンダリングする {#rendering-the-scene-into-it}

レンダーターゲットをカメラの [`renderTarget`](https://api.playcanvas.com/engine/classes/CameraComponent.html#rendertarget) プロパティに割り当てます。そのカメラは画面ではなくテクスチャにレンダリングするようになります。負の `priority` を設定して、メインカメラよりも前に毎フレームレンダリングされるようにし、メインカメラがテクスチャを使用する時点で内容が最新になるようにします。

```javascript
const textureCamera = new pc.Entity('TextureCamera');
textureCamera.addComponent('camera', {
    // メインカメラ（デフォルトの優先度0）より前にレンダリングされます
    priority: -1,
    renderTarget
});
app.root.addChild(textureCamera);
```

レンダーターゲットは、カメラ以外の手段でも埋めることができます。たとえば全画面シェーダーパスやコンピュートシェーダーなどですが、カメラでシーンをレンダリングするのがもっとも一般的なケースです。

## 表示面をレイヤーで除外する {#excluding-the-display-surface-with-layers}

レンダーターゲットのテクスチャを同じシーン内のオブジェクトに表示する場合、そのオブジェクト自体はレンダーターゲットにレンダリングしては**いけません**。さもないと、その面が現在生成中のテクスチャをレンダリングしようとし、自分自身にフィードバックしてしまいます。

これをきれいに実現する方法が[レイヤー](../layers/index.md)です。カメラは自身の `layers` 配列に列挙されたレイヤーのみをレンダリングするため、表示オブジェクトをテクスチャカメラが列挙していないレイヤーに配置すれば除外できます。以下の[レンダーテクスチャのサンプル](#example)では、3つのレイヤーと2つのカメラを使用しています。

- **World** - シーンの内容。両方のカメラが列挙するため、テクスチャと画面の両方にレンダリングされます。
- **Excluded** - テクスチャを表示するオブジェクト（および画面にのみ表示すべきもの）。メインカメラのみが列挙します。
- **Skybox** - 両方のカメラが列挙します。

```javascript
// テクスチャにレンダリングしてはいけないオブジェクト用のレイヤー
const excludedLayer = new pc.Layer({ name: 'Excluded' });
app.scene.layers.insert(excludedLayer, 1);

const worldLayer = app.scene.layers.getLayerByName('World');
const skyboxLayer = app.scene.layers.getLayerByName('Skybox');

// テクスチャカメラはシーンをレンダリングするが、Excludedレイヤーはレンダリングしない
textureCamera.camera.layers = [worldLayer.id, skyboxLayer.id];

// メインカメラは、Excludedレイヤーの表示面を含めてすべてをレンダリングする
mainCamera.camera.layers = [worldLayer.id, excludedLayer.id, skyboxLayer.id];
```

## 結果を使用する {#using-the-result}

レンダーターゲットのカラーテクスチャは [`renderTarget.colorBuffer`](https://api.playcanvas.com/engine/classes/RenderTarget.html#colorbuffer) として利用できます（作成したテクスチャと同じものです）。他のテクスチャと同じようにマテリアルに適用できます。たとえば、表示面として機能する平面のエミッシブマップとして使用します。

```javascript
const material = new pc.StandardMaterial();
material.emissiveMap = renderTarget.colorBuffer;
material.emissive = pc.Color.WHITE;
material.update();
```

## キューブマップの面とテクスチャ配列のレイヤー {#cubemap-faces-and-texture-array-layers}

レンダーターゲットは、テクスチャ全体の代わりに、キューブマップの1つの面や、2Dテクスチャ配列（`arrayLength` を指定して作成したテクスチャ）の1つのレイヤーにレンダリングできます。キューブマップの面は [`face`](https://api.playcanvas.com/engine/classes/RenderTarget.html#face) オプションで、配列のレイヤーは [`layer`](https://api.playcanvas.com/engine/classes/RenderTarget.html#layer) オプションで選択します。

複数の面やレイヤーにレンダリングするには、それぞれにレンダーターゲットを作成し、すべてで同じテクスチャを共有します。レンダーターゲットは軽量です。複数のビューをベイクする場合など、面やレイヤーを一度だけレンダリングするときは、その後でレンダーターゲットを破棄でき、結果はテクスチャに残ります。

```javascript
const layerCount = 16;

const textureArray = new pc.Texture(app.graphicsDevice, {
    name: 'RT-array',
    width: 256,
    height: 256,
    arrayLength: layerCount,
    format: pc.PIXELFORMAT_SRGBA8,
    mipmaps: false
});

// レイヤーごとのレンダーターゲット。すべてで同じテクスチャ配列を共有します
const renderTargets = [];
for (let layer = 0; layer < layerCount; layer++) {
    renderTargets.push(new pc.RenderTarget({
        colorBuffer: textureArray,
        layer,
        depth: true,
        origin: pc.RENDERTARGET_ORIGIN_TOP
    }));
}
```

`depth: true` を指定すると、各レンダーターゲットは独自の深度バッファを確保します。`depthBuffer` オプションで指定する深度バッファは、テクスチャ配列（またはキューブマップ）にすることもでき、その場合は同じレイヤーにレンダリングされます。また、すべてのレイヤーのレンダーターゲットで共有する2Dの深度テクスチャにすることもできます。

`StandardMaterial` はテクスチャ配列をサンプリングしません。レイヤーを表示するには、テクスチャ配列を宣言し、サンプリングするレイヤーを選択する[カスタムシェーダー](../shaders/index.md)を使用します。

```glsl
uniform mediump sampler2DArray uLayers;

// フラグメントシェーダー内
vec4 color = texture(uLayers, vec3(vUv0, layerIndex));
```

```wgsl
var uLayers: texture_2d_array<f32>;
var uLayersSampler: sampler;

// フラグメントシェーダー内
let color = textureSample(uLayers, uLayersSampler, input.vUv0, layerIndex);
```

```javascript
material.setParameter('uLayers', textureArray);
```

### レンダリング中のテクスチャをサンプリングする {#sampling-a-texture-while-rendering-into-it}

テクスチャは、そのテクスチャにレンダリングしているのと同じレンダーパス内ではサンプリングできません。他のレイヤーにレンダリングしている場合でも同様で、シェーダーはテクスチャ全体にアクセスできるためです。

- **WebGL2** - できません。サンプラーをテクスチャ配列の一部のレイヤーに制限することはできません。
- **WebGPU** - レンダリング中のレイヤーを含まない [`TextureView`](https://api.playcanvas.com/engine/classes/TextureView.html) をバインドすることで可能です。ビューは [`Texture#getView`](https://api.playcanvas.com/engine/classes/Texture.html#getview) で作成します。シェーダーは、ビューのレイヤーをその最初のレイヤーからの相対インデックスで参照します。

```javascript
// レンダーターゲットがレイヤー0にレンダリングしている間に、レイヤー1のみをサンプリングします。シェーダーからはレイヤー0として参照します
material.setParameter('uLayers', textureArray.getView(0, 1, 1, 1));
```

WebGLでは、`TextureView` の代わりにテクスチャ全体がバインドされます。すべてのプラットフォームで同じデータの読み書きを行うには、2つのテクスチャを交互に使用し、一方にレンダリングしながらもう一方をサンプリングします。

次の例は、テクスチャ配列のレイヤーごとにレンダーターゲットを使用して、64方向から見た像をテクスチャ配列にレンダリングし、数千個のインポスターを描画します。インポスターは、見る方向に最も近いビューを表示する、カメラに向いた四角形です。

<EngineExample id="render-targets/texture-array-impostors" title="Texture Array Impostors" />

## ミップマップ {#mipmaps}

カラーテクスチャにミップマップがある場合、レンダーターゲットはレンダーパスのたびにミップマップを再生成するため、結果をミップマップフィルタリングでサンプリングできます。

代わりに特定のミップレベルにレンダリングするには、`mipLevel` オプションを使用します。このオプションを指定すると（0であっても）、ミップマップの自動生成も無効になります。0以外のミップレベルへのレンダリングは、深度バッファと組み合わせて使用することはできません。

レンダーターゲットがキューブマップの面や配列のレイヤーにレンダリングする場合、WebGPUはレンダリングした面またはレイヤーのミップマップのみを再生成します。WebGL2はテクスチャのすべての面またはレイヤーのミップマップを再生成するため、多くのレイヤーにレンダリングする場合にはコストが高くなります。ミップマップを一度だけ生成するには、最後にレンダリングするものを除くすべてのレンダーターゲットで、ミップマップの生成を無効にします。

```javascript
for (let layer = 0; layer < layerCount; layer++) {
    const lastLayer = layer === layerCount - 1;
    renderTargets.push(new pc.RenderTarget({
        colorBuffer: textureArray,
        layer,
        depth: true,

        // WebGL2では、最後のレイヤーをレンダリングした後に、テクスチャ配列全体のミップマップを一度だけ生成します
        // （カメラのpriorityなどを使用して、レイヤーを順番にレンダリングします）
        mipLevel: app.graphicsDevice.isWebGL2 && !lastLayer ? 0 : undefined
    }));
}
```

## 向き {#orientation}

WebGL2とWebGPUは、レンダリングされた画像を垂直方向に逆の行順でネイティブに格納します。向きを指定しないままレンダーターゲットを通常のテクスチャとして（メッシュのUVで）サンプリングすると、2つのAPI間で結果が上下反転して見えます。`origin` オプションは、格納される向きを固定し、レンダーターゲットがどこでも同一に見えるようにします。次のいずれかを指定できます。

- [`RENDERTARGET_ORIGIN_TOP`](https://api.playcanvas.com/engine/variables/RENDERTARGET_ORIGIN_TOP.html) - すべてのグラフィックスAPIで、行0がレンダリングされた画像の上端になります。これは画像テクスチャの格納方法と一致します。**通常のテクスチャとしてサンプリングするレンダーターゲット（マテリアルマップやキューブマップの面）には、これを使用してください。** ほとんどのコンテンツで推奨されます。サンプリングするコードは、読み込んだ画像を扱うつもりで書いてください。
- [`RENDERTARGET_ORIGIN_BOTTOM`](https://api.playcanvas.com/engine/variables/RENDERTARGET_ORIGIN_BOTTOM.html) - すべてのグラフィックスAPIで、行0がレンダリングされた画像の下端になり、WebGL2のネイティブなレイアウトを再現します。WebGLの規約に沿って書かれた既存のコード（投影（NDC）座標からUVを導出するシェーダーや、ビューポート矩形でセルをアドレッシングするテクスチャアトラスなど）をそのまま動作させたい場合に使用します。
- [`RENDERTARGET_ORIGIN_NATIVE`](https://api.playcanvas.com/engine/variables/RENDERTARGET_ORIGIN_NATIVE.html) - 画像はグラフィックスAPIのネイティブな向きで格納されるため、行順はWebGL2とWebGPUで異なります。これがデフォルトです。フラグメント位置から導出した座標を使う画面空間サンプリングなど、向きに依存しない用途にのみ適しています。

要するに、レンダーターゲットをシーン内の面に表示する場合は `RENDERTARGET_ORIGIN_TOP` を使用してください。

## フォーマットの選択 {#choosing-a-format}

カラーテクスチャは、レンダリング可能で非圧縮のフォーマットを使用する必要があります。

- **`PIXELFORMAT_RGBA8`**（またはそのsRGBバリアントである `PIXELFORMAT_SRGBA8`）が標準的な選択肢で、どこでもレンダリング可能です。
- **`PIXELFORMAT_RGB10A2`** はRGB各チャンネル10ビットと2ビットのアルファを提供し、`RGBA8` と同じメモリコストでより高い精度が得られます。WebGL2とWebGPUの両方でレンダリング可能です。
- **HDRフォーマット**（float の `PIXELFORMAT_RGBA32F`、half-float の `PIXELFORMAT_RGBA16F`、small-float の `PIXELFORMAT_111110F`）は、デバイスのサポート状況に応じてレンダリング可能です。直接1つを選ぶ代わりに、[`GraphicsDevice.getRenderableHdrFormat`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#getrenderablehdrformat) をクエリすると、サポートされている最初の選択肢が返されます。サポート状況は異なります。WebGPUではfloatとhalf-floatは常にレンダリング可能です。WebGL2ではhalf-floatは広く利用可能（多くのモバイルiOSデバイスを含む）ですが、完全なfloatのレンダリングには [`GraphicsDevice.textureFloatRenderable`](https://api.playcanvas.com/engine/classes/GraphicsDevice.html#texturefloatrenderable) が必要です。
- **`PIXELFORMAT_RGB9E5`** はコンパクトなHDRフォーマットで、サンプリングは可能ですが、レンダーターゲットのカラーバッファとしては**使用できません**。

フォーマットの完全な一覧と詳細なHDRサポート規則については、[`Texture`](https://api.playcanvas.com/engine/classes/Texture.html) APIリファレンスを参照してください。

レンダリング中の深度テストには、レンダーターゲットの作成時に `depth: true` で深度バッファを要求します（上記のとおり）。ステンシルバッファが必要な場合は `stencil: true` も指定します。

## リサイズ {#resizing}

レンダーターゲットの解像度を変更するには（たとえばウィンドウのリサイズ時に出力サイズと一致させ続けるため）、[`renderTarget.resize(width, height)`](https://api.playcanvas.com/engine/classes/RenderTarget.html#resize) を呼び出します。これは基になるカラーバッファと深度バッファをリサイズします。それまでの内容は保持されません。

## アンチエイリアス {#anti-aliasing}

`samples` を1より大きく設定すると、ハードウェアのマルチサンプルアンチエイリアス（MSAA）でターゲットをレンダリングします。マルチサンプルの結果は、作成した単一サンプルのカラーテクスチャ（サンプリング対象となるもの）へ自動的に解決されます。

```javascript
const renderTarget = new pc.RenderTarget({
    colorBuffer: texture,
    depth: true,
    origin: pc.RENDERTARGET_ORIGIN_TOP,
    samples: 4
});
```

サンプルの解決方法を制御したり、シェーダーでサンプルを個別に読み取ったりするには、下記の[明示的なマルチサンプルレンダーターゲット](#explicit-multisampled-render-targets-and-custom-resolves)を参照してください。

## 明示的なマルチサンプルレンダーターゲットとカスタム解決 {#explicit-multisampled-render-targets-and-custom-resolves}

:::note

このセクションの機能は Engine 2.22 以降が必要で、WebGPU 専用です。

:::

上記の自動解決は、固定のハードウェア「ボックス」フィルターでサンプルを平均します。異なる解決が必要なテクニック（トーンマップされたカラー解決、min/max のデプス解決、シェーダーでの個別サンプルの読み取りなど）では、マルチサンプルテクスチャ（`samples` を1より大きく設定した [`Texture`](https://api.playcanvas.com/engine/classes/Texture.html)）を明示的に作成し、レンダーターゲットのバッファとして直接使用します。

```javascript
// マルチサンプルテクスチャ - レンダーターゲットはそのサンプルへ直接レンダリングします
const msColor = new pc.Texture(app.graphicsDevice, { width, height, format: pc.PIXELFORMAT_RGBA16F, samples: 4 });
const msDepth = new pc.Texture(app.graphicsDevice, { width, height, format: pc.PIXELFORMAT_DEPTH, samples: 4 });

// 任意の単一サンプル解決ターゲット
const resolvedColor = new pc.Texture(app.graphicsDevice, { width, height, format: pc.PIXELFORMAT_RGBA16F, mipmaps: false });
const resolvedDepth = new pc.Texture(app.graphicsDevice, { width, height, format: pc.PIXELFORMAT_R32F, mipmaps: false });

const renderTarget = new pc.RenderTarget({
    colorBuffer: msColor,
    resolveBuffer: resolvedColor,       // レンダーパス終了時のハードウェア解決
    depthBuffer: msDepth,
    depthResolveBuffer: resolvedDepth   // depthResolveMode で制御されるシェーダーベースの解決
});
```

- **カラー**: `resolveBuffer` を指定すると、自動パスと同様に、レンダーパス終了時にカラーサンプルがハードウェア解決されます。省略すると、サンプルはそのまま保存され、後続のパスが `texture_multisampled_2d` に対する `textureLoad` で個別に読み取れます（カスタム解決）。整数フォーマットなど、ハードウェアが解決できないフォーマットで MSAA を使う唯一の方法でもあります。複数レンダーターゲットでは、各アタッチメントごとに任意の解決テクスチャ（`resolveBuffers`）を持てます。
- **デプス**: WebGPU にはデプスのハードウェア解決がありません。マルチサンプルの `depthBuffer` は `texture_depth_multisampled_2d` としてサンプルごとに読み取るか、エンジン提供のシェーダーで `depthResolveBuffer` へ解決できます。解決の演算は [`depthResolveMode`](https://api.playcanvas.com/engine/classes/RenderTarget.html#depthresolvemode) で選択します - `DEPTHRESOLVE_MIN`（デフォルト。最も近いサーフェスを選択）、`DEPTHRESOLVE_MAX`、`DEPTHRESOLVE_SAMPLE0`。同じモードは、シーンデプスマップやデプスコピーで使われるデプス解決も制御します。

これらのテクニックを示す2つの例があります - ハードウェア解決と並べて比較するカスタムのトーンマップカラー解決、および解決済みデプスによるフォグと比較するサンプルごとのデプスフォグです。

<EngineExample id="graphics-advanced/custom-msaa-resolve" title="Custom MSAA Resolve" />

<EngineExample id="graphics-advanced/msaa-depth-fog" title="MSAA Depth Fog" />

## クリーンアップ {#cleaning-up}

レンダーターゲットはテクスチャを所有しないため、使い終わったらそれらを個別に破棄します。カラーテクスチャ（および明示的に作成した場合は深度バッファのテクスチャ）を破棄してから、レンダーターゲットを破棄します。

```javascript
renderTarget.colorBuffer.destroy();
renderTarget.destroy();
```

複数のキューブマップの面や配列のレイヤーのレンダーターゲットがテクスチャを共有している場合は、各レンダーターゲットを破棄し、共有テクスチャは一度だけ破棄します。

## 例 {#example}

次の例は、2つ目のカメラからシーンをテクスチャにレンダリングし、それをワールド内の平面に表示します。上記の3レイヤー構成を使って表示用の平面をレンダーターゲットから除外し、数秒ごとにテクスチャカメラを透視投影と平行投影で切り替えます。

<EngineExample id="graphics/render-to-texture" title="Render to Texture" />

## 関連ページ {#related-pages}

- [複数のレンダーターゲット](./multiple-render-targets.md) - 1つのパスから複数のカラーバッファへ同時にレンダリングします。
- [複数のカメラ](../cameras/multiple-cameras.md) - ビューの合成とカメラへのレンダーターゲットの割り当てです。
- [レイヤー](../layers/index.md) - 各カメラがどのオブジェクトをレンダリングするかを制御します。
- [ポストエフェクト](../posteffects/index.md) - レンダーターゲットの上に構築された、組み込みおよびカスタムの後処理です。
- [デバイスロストと復旧](./device-loss.md) - コンテキストまたはデバイスのロスト後にGPUで生成した内容を復元します。
- [TextureRenderer](../debug-drawing.md#texturerenderer) - レンダーターゲットの色や個別のチャンネルを画面で確認します。

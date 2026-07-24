---
title: レンダーターゲット
description: 画面の代わりにオフスクリーンテクスチャへシーンをレンダリングし、その結果をシーン内で使用する方法を、作成・レイヤー構成・向き・フォーマット・リサイズ・MSAAとともに解説します。
---

[レンダーターゲット](https://api.playcanvas.com/engine/classes/RenderTarget.html)は、画面の代わりにレンダリング先として使用できる矩形のレンダリング面です。1つ以上のレンダリング可能なカラーテクスチャと、オプションの深度（およびステンシル）バッファをラップします。カメラがレンダーターゲットにレンダリングすると、そのカラーテクスチャに結果が保持され、通常のテクスチャと同じように使用できます。もっとも一般的には、マテリアルに適用してシーン内に表示したり、さらに加工したりします。

これは、ゲーム内スクリーン、監視モニター、鏡やポータル、反射や屈折、カスタムのマルチパスパイプラインといった表現の基盤となります。

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

## クリーンアップ {#cleaning-up}

レンダーターゲットはテクスチャを所有しないため、使い終わったらそれらを個別に破棄します。カラーテクスチャ（および明示的に作成した場合は深度バッファのテクスチャ）を破棄してから、レンダーターゲットを破棄します。

```javascript
renderTarget.colorBuffer.destroy();
renderTarget.destroy();
```

## 例 {#example}

次の例は、2つ目のカメラからシーンをテクスチャにレンダリングし、それをワールド内の平面に表示します。上記の3レイヤー構成を使って表示用の平面をレンダーターゲットから除外し、数秒ごとにテクスチャカメラを透視投影と平行投影で切り替えます。

<EngineExample id="graphics/render-to-texture" title="Render to Texture" />

## 関連ページ {#related-pages}

- [複数のレンダーターゲット](./multiple-render-targets.md) - 1つのパスから複数のカラーバッファへ同時にレンダリングします。
- [複数のカメラ](../cameras/multiple-cameras.md) - ビューの合成とカメラへのレンダーターゲットの割り当てです。
- [レイヤー](../layers/index.md) - 各カメラがどのオブジェクトをレンダリングするかを制御します。
- [ポストエフェクト](../posteffects/index.md) - レンダーターゲットの上に構築された、組み込みおよびカスタムの後処理です。

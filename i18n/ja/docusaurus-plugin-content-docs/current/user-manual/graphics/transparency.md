---
title: 透明度
description: "PlayCanvasで透明なサーフェスをレンダリングする方法（アルファブレンディング、アルファテスト、不透明度のディザリング、アルファトゥカバレッジ）を比較し、それぞれの使いどころを説明します。"
---

PlayCanvasには、完全に不透明ではないサーフェスをレンダリングする方法がいくつかあります。それぞれコスト、描画順への依存度、発生するアーティファクトの種類が異なるため、何をレンダリングするかによって適切な選択が変わります。

いずれの方法も、マテリアルの不透明度によって制御されます。不透明度は[`StandardMaterial#opacity`](https://api.playcanvas.com/engine/classes/StandardMaterial.html#opacity)、[`opacityMap`](https://api.playcanvas.com/engine/classes/StandardMaterial.html#opacitymap)、または頂点カラーから取得されます。

## アルファブレンディング

[`blendType`](https://api.playcanvas.com/engine/classes/Material.html#blendtype)に`BLEND_NORMAL`などのブレンドモードを設定すると、サーフェスはフレームバッファに既に存在する内容と混合されます。

```javascript
material.blendType = pc.BLEND_NORMAL;
material.opacity = 0.5;
material.update();
```

これは最も滑らかな結果が得られ、任意の不透明度の値をサポートしますが、描画順に依存します。ブレンドされるジオメトリは不透明なジオメトリの後の透明パスで描画され、[`Layer#transparentSortMode`](https://api.playcanvas.com/engine/classes/Layer.html#transparentsortmode)に従ってレイヤーごとに奥から手前へソートされます。ソートはメッシュインスタンス単位で行われるため、自身と重なる単一のメッシュを正しく解決することはできません。これは、植生、髪、ガラスでアーティファクトが発生する一般的な原因です。また、ブレンドされるマテリアルは通常デプス書き込みを無効にするため、互いを遮蔽しません。

## アルファテスト

[`alphaTest`](https://api.playcanvas.com/engine/classes/Material.html#alphatest)は、不透明度がしきい値を下回るフラグメントを破棄します。

```javascript
material.alphaTest = 0.5;
material.update();
```

結果は二値になります。つまりフラグメントは完全に不透明か、破棄されるかのどちらかです。そのためソートが不要で、マテリアルは不透明パスに留まり、通常どおりデプスに書き込みます。これにより低コストで描画順に完全に依存しなくなりますが、切り抜きのエッジは硬くエイリアスが目立ちます。部分的な不透明度が不要な、密度の高い植生などの切り抜き表現で通常選ばれる方法です。

## 不透明度のディザリング

[`opacityDither`](https://api.playcanvas.com/engine/classes/StandardMaterial.html#opacitydither)は、不透明度をブレンドする代わりに、一定の割合のフラグメントを破棄するスクリーンスペースのディザパターンに変換します。

```javascript
material.blendType = pc.BLEND_NONE;
material.opacity = 0.5;
material.opacityDither = pc.DITHER_BAYER8;
material.update();
```

使用できるパターンは`DITHER_BAYER2`、`DITHER_BAYER4`、`DITHER_BAYER8`、`DITHER_BAYER16`、`DITHER_BLUENOISE`、`DITHER_IGNNOISE`です。アルファテストと同様に描画順に依存せず不透明パスに留まりますが、連続的な不透明度をサポートします。その代償としてノイズが見えますが、テンポラルアンチエイリアシングや高い出力解像度と組み合わせることで滑らかな透明表現に解消されます。[`opacityShadowDither`](https://api.playcanvas.com/engine/classes/StandardMaterial.html#opacityshadowdither)は、オブジェクトが落とすシャドウに同じ手法を適用します。

## アルファトゥカバレッジ

[`alphaToCoverage`](https://api.playcanvas.com/engine/classes/Material.html#alphatocoverage)は、フラグメントのアルファ値を使用してMSAAのサンプルカバレッジマスクを構築します。ブレンドの代わりに、ハードウェアがアルファ値に応じた割合のマルチサンプルカバレッジを保持します。

```javascript
material.blendType = pc.BLEND_NONE;
material.opacity = 0.5;
material.alphaToCoverage = true;
material.update();
```

ブレンドを有効にする必要はありません。アルファテストと同様に、アルファ値はカバレッジマスクによって消費されます。マテリアルは不透明パスに留まりデプスに書き込むため、結果は描画順に依存しません。

品質はレンダーターゲットのサンプル数によって制限されます。4x MSAAの場合、不透明度は0%、25%、50%、75%、100%に量子化されます。そのため、アルファトゥカバレッジはアルファによる切り抜きの硬いエッジを滑らかにするのには適していますが、量子化が目立つ広い面積の半透明表現には適していません。

### 要件

アルファトゥカバレッジにはマルチサンプルのレンダーターゲットが必要で、シングルサンプルのレンダーターゲットにレンダリングする場合は**何も通知されずに無視されます**。リリースビルドではログも出力されず、エラーも発生せず、サーフェスは単に完全に不透明としてレンダリングされます。このフラグを有効にしても変化が見られない場合は、アンチエイリアシングが実際に有効になっているか確認してください。

```javascript
const device = await pc.createGraphicsDevice(canvas, {
    deviceTypes: [deviceType],
    antialias: true
});
```

WebGPUではさらに要件があります。レンダーターゲットの最初のカラーアタッチメントが、アルファチャンネルを持つブレンド可能なフォーマットを使用している必要があります。これは実際に問題になります。[`CameraFrame`](https://api.playcanvas.com/engine/classes/CameraFrame.html)はHDRレンダーターゲットに`PIXELFORMAT_111110F`を優先しますが、このフォーマットにはアルファチャンネルがありません。そのため、デフォルトのフォーマットの`CameraFrame`を通してレンダリングされるジオメトリではアルファトゥカバレッジは無視され、デバッグビルドでは警告が出力されます。アルファチャンネルを持つフォーマットを要求すれば解決します。

```javascript
cameraFrame.rendering.renderFormats = [pc.PIXELFORMAT_RGBA16F];
cameraFrame.update();
```

WebGLには同等の制限はありません。レンダーターゲットがアルファチャンネルを格納しているかどうかに関係なく、シェーダーが出力したアルファ値を使用するためです。そのためWebGLでは`PIXELFORMAT_111110F`のようなフォーマットでもアルファトゥカバレッジが適用されます。これは2つのバックエンド間の意図的な違いであり、バグではありません。

## 手法の選択

| 手法 | 不透明度 | 描画順への依存 | パス | 主な欠点 |
|------|----------|----------------|------|----------|
| アルファブレンディング | 連続的 | あり | 透明 | ソートのアーティファクト、自己ソート不可 |
| アルファテスト | 二値 | なし | 不透明 | 硬くエイリアスの目立つエッジ |
| 不透明度のディザリング | 連続的 | なし | 不透明 | TAAがない場合にノイズが見える |
| アルファトゥカバレッジ | サンプル数に量子化 | なし | 不透明 | MSAAが必要、段階が粗い |

大まかな指針としては、ガラスなど実際に透けて見えるサーフェスで描画順よりも品質が重要な場合はアルファブレンディング、密度の高い切り抜きにはアルファテスト、フェードやLODの遷移（特にテンポラルアンチエイリアシングが既に有効な場合）には不透明度のディザリング、MSAAのコストを既に支払っている場合に切り抜きのエッジを滑らかにするにはアルファトゥカバレッジを使用してください。

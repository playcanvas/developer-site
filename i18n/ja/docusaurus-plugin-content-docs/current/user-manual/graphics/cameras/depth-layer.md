---
title: Depthレイヤー
description: カメラレイヤーでSceneのカラーと深度バッファをキャプチャし、シェーダーやScriptからの要求、線形またはガンマのSceneカラーに対応します。
---

一部のレンダリング技術では、特定のカメラのシーンのDepthバッファまたはColorバッファにアクセスする必要があります。Depth Layerは、カメラの `layers` プロパティに追加できる特別なレイヤーです。 レイヤーの [`order`] [4] は、レンダリング中にDepthバッファまたはColorバッファがキャプチャされるタイミングを定義します。キャプチャされたバッファは、カメラの後続のレイヤーで使用できます。

通常、これらのバッファは、不透明なレイヤーがすべてレンダリングされた後にキャプチャされ、以下の透明なレイヤーやポストエフェクトで使用できます。

さらに、これらのバッファをキャプチャするには、スクリプトからCameraComponentでキャプチャを有効にする必要があります:

- [```requestSceneColorMap```](https://api.playcanvas.com/engine/classes/CameraComponent.html#requestscenecolormap) Colorマップをリクエストする
- [```requestSceneDepthMap```](https://api.playcanvas.com/engine/classes/CameraComponent.html#requestscenedepthmap) Depthマップをリクエストする

キャプチャした深度を画面で確認するには、[TextureRenderer.sceneDepth](../debug-drawing.md#scene-depth) を使用してください。

## バッファのアクセス

シェーダー内でテクスチャーとしてこれらのバッファにアクセスするには、次のユニフォーム名を使用します:

- Colorマップ: `uSceneColorMap`
- Depthマップ: `uSceneDepthMap`

コンピュートシェーダーはこれらのユニフォームを使用しません。代わりに、コンピュートインスタンスを通じてカメラのマップにアクセスします。[シーンの深度マップとカラーマップ](/user-manual/graphics/shaders/compute-shaders#scene-depth-and-color-maps)を参照してください。

## Colorマップのミップマップ {#color-map-mipmaps}

Colorマップにはミップマップがあり、粗い屈折を持つマテリアルはこれをサンプリングして、背後にあるものをぼかします。カスタムシェーダーでは、GLSLの `texture2DLod`、またはWGSLの `textureSampleLevel` でミップレベルを選択します。カメラコンポーネントの2つのプロパティが、Depth LayerとCameraFrameのどちらでキャプチャされたColorマップでも、そのミップマップを制御します:

- [`sceneColorMapMipmapFilter`](https://api.playcanvas.com/engine/classes/CameraComponent.html#scenecolormapmipmapfilter) は、ミップマップを生成するフィルターを選択します。デフォルトの `MIPMAPFILTER_BOX` はテクセルのブロックを平均するため、強くぼかした屈折ではブロックが見え、ちらつきます。`MIPMAPFILTER_GAUSSIAN` は、ミップマップの生成コストが高くなる代わりに、滑らかにぼかします。
- [`sceneColorMapMipmaps`](https://api.playcanvas.com/engine/classes/CameraComponent.html#scenecolormapmipmaps) を `false` に設定すると、Colorマップはミップマップなしでキャプチャされます。屈折は常にシャープになり、透明なガラスや陽炎に適しています。毎フレームのミップマップの生成と、Colorマップのメモリの約3分の1を節約できます。

```javascript
// 粗い屈折を滑らかにぼかす
cameraEntity.camera.sceneColorMapMipmapFilter = MIPMAPFILTER_GAUSSIAN;

// または、シャープな屈折だけが必要な場合
cameraEntity.camera.sceneColorMapMipmaps = false;
```

## 例

これらのエンジン例では、DepthマップとColorマップの両方のレンダリング、およびそれらを使用するカスタムシェーダーが示されています。

- GrabPass は、ぼけたミップレベルをサンプリングするすりガラスでColorバッファの使用を示し、ボックスとガウシアンのミップマップフィルターを比較します: `GrabPass`

<EngineExample id="shaders/grab-pass" title="GrabPass" />

- GroundFog はDepthバッファの使用を示します: `GroundFog`

<EngineExample id="shaders/ground-fog" title="GroundFog" />

- Dispersion はSceneカラーテクスチャを使った屈折と色収差を示します: `Dispersion`

<EngineExample id="materials/dispersion" title="Dispersion" />

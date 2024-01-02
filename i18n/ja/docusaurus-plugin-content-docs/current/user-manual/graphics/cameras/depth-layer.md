---
title: Depthレイヤー
layout: usermanual-page.hbs
position: 2
---

一部のレンダリング技術では、特定のカメラのシーンのDepthバッファまたはColorバッファにアクセスする必要があります。Depth Layerは、カメラの `layers` プロパティに追加できる特別なレイヤーです。 レイヤーの [`order`] [4] は、レンダリング中にDepthバッファまたはColorバッファがキャプチャされるタイミングを定義します。キャプチャされたバッファは、カメラの後続のレイヤーで使用できます。

通常、これらのバッファは、不透明なレイヤーがすべてレンダリングされた後にキャプチャされ、以下の透明なレイヤーやポストエフェクトで使用できます。

さらに、これらのバッファをキャプチャするには、スクリプトからCameraComponentでキャプチャを有効にする必要があります:

- [```requestSceneColorMap```][0] Colorマップをリクエストする
- [```requestSceneDepthMap```][1] Depthマップをリクエストする

## バッファのアクセス

シェーダー内でテクスチャーとしてこれらのバッファにアクセスするには、次のユニフォーム名を使用します:

- Colorマップ: `uSceneColorMap`
- Depthマップ: `uSceneDepthMap`

## 例

これらのエンジン例では、DepthマップとColorマップの両方のレンダリング、およびそれらを使用するカスタムシェーダーが示されています。

- GrabPass はColorバッファの使用を示します:[`GrabPass`] [2]
- GroundFog はDepthバッファの使用を示します:[`GroundFog`] [3]

[0]: /api/pc.CameraComponent.html#requestSceneColorMap
[1]: /api/pc.CameraComponent.html#requestSceneDepthMap
[2]: https://playcanvas.github.io/#/graphics/grab-pass
[3]: https://playcanvas.github.io/#/graphics/ground-fog
[4]: /user-manual/graphics/layers/#choosing-the-layer-order

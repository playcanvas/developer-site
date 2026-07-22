---
title: Depthレイヤー
description: カメラレイヤーでSceneのカラーと深度バッファをキャプチャし、シェーダーやScriptからの要求、線形またはガンマのSceneカラーに対応します。
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「Depthレイヤー」について、次の要件を満たしてください: カメラレイヤーでSceneのカラーと深度バッファをキャプチャし、シェーダーやScriptからの要求、線形またはガンマのSceneカラーに対応すること アプリケーションを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 開いているプロジェクトで「Depthレイヤー」を設定し、次の要件を満たしてください: カメラレイヤーでSceneのカラーと深度バッファをキャプチャし、シェーダーやScriptからの要求、線形またはガンマのSceneカラーに対応すること。シーンを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。

:::

一部のレンダリング技術では、特定のカメラのシーンのDepthバッファまたはColorバッファにアクセスする必要があります。Depth Layerは、カメラの `layers` プロパティに追加できる特別なレイヤーです。 レイヤーの [`order`] [4] は、レンダリング中にDepthバッファまたはColorバッファがキャプチャされるタイミングを定義します。キャプチャされたバッファは、カメラの後続のレイヤーで使用できます。

通常、これらのバッファは、不透明なレイヤーがすべてレンダリングされた後にキャプチャされ、以下の透明なレイヤーやポストエフェクトで使用できます。

さらに、これらのバッファをキャプチャするには、スクリプトからCameraComponentでキャプチャを有効にする必要があります:

- [```requestSceneColorMap```](https://api.playcanvas.com/engine/classes/CameraComponent.html#requestscenecolormap) Colorマップをリクエストする
- [```requestSceneDepthMap```](https://api.playcanvas.com/engine/classes/CameraComponent.html#requestscenedepthmap) Depthマップをリクエストする

## バッファのアクセス

シェーダー内でテクスチャーとしてこれらのバッファにアクセスするには、次のユニフォーム名を使用します:

- Colorマップ: `uSceneColorMap`
- Depthマップ: `uSceneDepthMap`

## 例

これらのエンジン例では、DepthマップとColorマップの両方のレンダリング、およびそれらを使用するカスタムシェーダーが示されています。

- GrabPass はColorバッファの使用を示します: `GrabPass`

<EngineExample id="shaders/grab-pass" title="GrabPass" />

- GroundFog はDepthバッファの使用を示します: `GroundFog`

<EngineExample id="shaders/ground-fog" title="GroundFog" />

- Dispersion はSceneカラーテクスチャを使った屈折と色収差を示します: `Dispersion`

<EngineExample id="materials/dispersion" title="Dispersion" />

---
title: カメラ
description: カメラの作成に加え、投影、トーンマッピング、マルチカメラレンダリング、カメラコントロール、座標変換を解説します。
---

:::ai

* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** Camera Component を作成、設定し、編集カメラをフォーカスして、シーンの起動やキャプチャで表示を確認できます。

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

カメラはシーンを画面にレンダリングします。カメラは [CameraComponent](https://api.playcanvas.com/engine/classes/CameraComponent.html) がアタッチされた単なるエンティティであり、シーンはそのエンティティの位置と向きからレンダリングされます。そのため、他のエンティティと同じように、エンティティを移動・回転させることでカメラの向きを変えられます。カメラはローカルの負のZ軸方向を向いています。

何かを表示するには、シーンに少なくとも1つの有効なカメラが必要です。さらに、カメラでは多くのことを制御できます。3Dシーンを2D画像にマッピングする[投影](projection.md)、最終的な色を決定づける[トーンマッピング](tone-mapping.md)、そして分割画面・オーバーレイ・レンダーターゲットへの描画のために[複数のカメラ](multiple-cameras.md)でビューを合成する方法などです。

## カメラの作成 {#creating-a-camera}

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// Cameraコンポーネントを持つエンティティを作成する
const camera = new pc.Entity('Camera');
camera.addComponent('camera', {
    clearColor: new pc.Color(0.3, 0.3, 0.7)
});
app.root.addChild(camera);

// エンティティを変換してカメラの向きを定める
camera.setPosition(0, 5, 10);
camera.lookAt(0, 0, 0);
```

</TabItem>
<TabItem value="editor" label="Editor">

新しいシーンには自動的にカメラエンティティが配置されます。別のカメラを作成するには、Entityメニューを使用します。これにより、[Cameraコンポーネント](/user-manual/editor/scenes/components/camera)を持つエンティティが1ステップで作成されます。

![Camera creation](/img/user-manual/graphics/cameras/camera-create.png)

カメラのすべてのプロパティはインスペクターで編集できます。

</TabItem>
<TabItem value="react" label="React">

```jsx
<Entity name="camera" position={[0, 5, 10]}>
  <Camera clearColor="#4d4db3" />
</Entity>
```

利用可能なすべてのpropsは [`<Camera/>` コンポーネントリファレンス](/user-manual/react/api/camera)を参照してください。

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="camera" position="0 5 10">
  <pc-camera clear-color="0.3 0.3 0.7 1"></pc-camera>
</pc-entity>
```

利用可能なすべての属性は [`<pc-camera>` タグリファレンス](/user-manual/web-components/tags/pc-camera)を参照してください。

</TabItem>
</Tabs>

## このセクションの内容

* [投影](projection.md) — 透視投影と正投影、視野角、クリップ面とフラスタムカリング。
* [クリア](clearing.md) — 背景色の設定、キャンバスの透明化、クリアの無効化。
* [トーンマッピングと露出](tone-mapping.md) — HDRのシーンライティングをディスプレイにマッピングし、必要に応じて物理ベースの露出を制御します。
* [複数のカメラ](multiple-cameras.md) — 優先度、ビューポート、レイヤー、レンダーターゲットでビューを合成します。
* [カメラコントロール](camera-controls.md) — エンジン付属のスクリプトで、オービット・フライ・一人称のナビゲーションを追加します。
* [スクリーン座標とワールド座標](screen-and-world.md) — 2Dスクリーン位置と3Dワールド位置を相互に変換します。
* [Scene Picker](scene-picker.md) — スクリーン座標の下にあるオブジェクトを正確に選択します。
* [Depthレイヤー](depth-layer.md) — シーンのカラーバッファと深度バッファにシェーダーからアクセスします。

## さらに先へ

* **ポストプロセッシング** — ブルーム、被写界深度、SSAO、TAA、ビネットなどはカメラごとに適用されます。[ポストエフェクト](/user-manual/graphics/posteffects/)を参照してください。
* **ARとVR** — カメラは [`startXr()`](https://api.playcanvas.com/engine/classes/CameraComponent.html#startxr) で没入型WebXRセッションを開始できます。[XRセクション](/user-manual/xr/)を参照してください。
* **カメラごとのフォグ** — [`fog`](https://api.playcanvas.com/engine/classes/CameraComponent.html#fog) でシーンのフォグ設定を個々のカメラで上書きできます。
* **カスタム投影** — [`calculateProjection`](https://api.playcanvas.com/engine/classes/CameraComponent.html#calculateprojection) と [`calculateTransform`](https://api.playcanvas.com/engine/classes/CameraComponent.html#calculatetransform) のコールバックを指定すると、斜投影や平面反射などの高度なエフェクトを実現できます。
* **チュートリアル** — [Camera Following a Path](/tutorials/camera-following-a-path) と [Orbit Camera](/tutorials/orbit-camera) を試してみてください。

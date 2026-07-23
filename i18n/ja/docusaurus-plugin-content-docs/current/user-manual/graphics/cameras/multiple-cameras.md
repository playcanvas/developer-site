---
title: 複数のカメラ
description: 優先度、ビューポート、レイヤー、レンダーターゲットを使い、分割画面やオーバーレイなどに向けて複数カメラのビューを合成します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

シーンには任意の数のカメラを配置でき、それらはシンプルなモデルに従って最終的な画像へ合成されます。有効なすべてのカメラは、自身の[レイヤー](#layers)を、自身のレンダーターゲット（[レンダーターゲット](#render-targets)が設定されていなければ画面）の[ビューポート](#viewports)に、`priority` の順（小さい値が先）でレンダリングします。

このモデルは幅広い構成をサポートします。分割画面のマルチプレイヤー、ミニマップやバックミラーのようなピクチャインピクチャのオーバーレイ、3Dシーンの上に描画されるUI、監視モニターやポータルのようなレンダーテクスチャのサーフェスなどです。

<EngineExample id="graphics/multi-view" title="Multi View" />

## ビューポート {#viewports}

デフォルトでは、カメラはレンダーターゲットの全幅と全高にレンダリングします。`rect` プロパティを使うと、レンダリングを矩形範囲に制限できます。矩形は0〜1の正規化座標で `[x, y, width, height]` として指定します（原点は左下隅です）。

2プレイヤーの水平分割画面では、2つのカメラがそれぞれ画面の半分を使用します:

![Horizontal splitscreen](/img/user-manual/graphics/cameras/camera-horizontal-splitscreen.png)

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// プレイヤー1: 画面の左半分
camera1.camera.rect = new pc.Vec4(0, 0, 0.5, 1);

// プレイヤー2: 画面の右半分。camera1 の後にレンダリング
camera2.camera.rect = new pc.Vec4(0.5, 0, 0.5, 1);
camera2.camera.priority = 1;
```

</TabItem>
<TabItem value="editor" label="Editor">

Hierarchyで各カメラを選択し、[Cameraコンポーネント](/user-manual/editor/scenes/components/camera)で **Viewport**（X、Y、Width、Height）と **Priority** を設定します。

</TabItem>
<TabItem value="react" label="React">

```jsx
<Entity name="player1Camera">
  <Camera rect={[0, 0, 0.5, 1]} />
</Entity>
<Entity name="player2Camera">
  <Camera rect={[0.5, 0, 0.5, 1]} priority={1} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<pc-entity name="player1-camera">
  <pc-camera rect="0 0 0.5 1"></pc-camera>
</pc-entity>
<pc-entity name="player2-camera">
  <pc-camera rect="0.5 0 0.5 1" priority="1"></pc-camera>
</pc-entity>
```

</TabItem>
</Tabs>

垂直分割画面の場合は、代わりにビューポートを縦に積み重ねます。上が `[0, 0.5, 1, 0.5]`、下が `[0, 0, 1, 0.5]` です:

![Vertical splitscreen](/img/user-manual/graphics/cameras/camera-vertical-splitscreen.png)

関連するプロパティとして `scissorRect` があります。これは同じ正規化形式の矩形でレンダリングをクリップしますが、ビューポートへの投影方法は変更しません。

## レイヤー {#layers}

各カメラは、自身の `layers` プロパティにリストされた[レイヤー](/user-manual/graphics/layers)のみをレンダリングするため、カメラごとにシーンのまったく異なるサブセットを表示できます。典型的な用途としては、ゲームの上にUIレイヤーだけをレンダリングするUIカメラ、エフェクトレイヤーをスキップするミニマップカメラ、一人称視点での武器のレンダリングなどがあります。実例は[Camera Model Maskingチュートリアル](/tutorials/camera-model-masking)を参照してください。

## カメラスタッキング {#camera-stacking}

あるカメラを別のカメラの上にレンダリングする場合（ピクチャインピクチャのオーバーレイや、異なるレイヤーセットを描画するフルスクリーンカメラなど）、後のカメラ（`priority` が大きい方）が先のカメラの画像を消してしまわないようにする必要があります。必要に応じて[クリアフラグ](clearing.md)を無効にします:

```javascript
// メインビューの上、右下隅にオーバーレイカメラをレンダリングする
overlay.camera.priority = 1;
overlay.camera.rect = new pc.Vec4(0.7, 0, 0.3, 0.3);
overlay.camera.clearColorBuffer = true;  // オーバーレイは独自の背景を持つ
overlay.camera.clearDepthBuffer = true;  // メインビューと深度テストしない

// メインビューに重ねて合成するフルスクリーンオーバーレイの場合:
// overlay.camera.clearColorBuffer = false;
```

## レンダーターゲット {#render-targets}

カメラは画面の代わりに、`renderTarget` プロパティに [RenderTarget](https://api.playcanvas.com/engine/classes/RenderTarget.html) を割り当てることで、オフスクリーンテクスチャにレンダリングできます。生成されたテクスチャはマテリアルに適用して、ゲーム内のスクリーン、鏡、ポータルなどに使ったり、さらに加工したりできます。詳しくは [レンダーターゲット](/user-manual/graphics/advanced-rendering/render-targets/) のページを参照してください。エンジンのレンダーテクスチャのサンプルも参照してください:

<EngineExample id="graphics/render-to-texture" title="Render to Texture" />

## パフォーマンスに関する考慮事項 {#performance-considerations}

* 有効なカメラはそれぞれ自身のレイヤーを再度レンダリングします。ドローコールはカメラの数に比例して増加します。各カメラの `layers` は、実際に必要な最小限に制限してください。
* カメラの `rect` を小さくすると塗りつぶすピクセル数は減りますが、レンダリングするオブジェクトのドローコールごとのCPUコストは減りません。
* カメラごとの[ポストプロセッシング](/user-manual/graphics/posteffects/)はカメラ単位で実行されるため、分割画面ビューにエフェクトを適用するとGPUコストが倍増します。
* たまにしか更新が必要ないレンダーターゲット（静的な鏡など）は、毎フレーム更新する必要はありません。カメラを無効にしておき、必要なときに有効にしてください。

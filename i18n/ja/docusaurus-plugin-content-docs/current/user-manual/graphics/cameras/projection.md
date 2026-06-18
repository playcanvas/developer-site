---
title: 投影
description: 透視投影または正投影の選択、視野角の設定、クリップ面・アスペクト比・フラスタムカリングの調整を解説します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

カメラの投影は、3Dシーンをどのように2D画像へ平面化するかを定義します。PlayCanvasのカメラは、透視投影と正投影の2つの投影タイプをサポートしています。

## 透視投影 {#perspective}

デフォルトである透視投影は、私たちの目や実際のカメラの仕組みを模倣します。遠くにあるオブジェクトほど小さく見えます。カメラが見ることのできる空間の体積（フラスタム）は、四角錐台の形になります。

![Perspective camera](pathname:///img/user-manual/graphics/cameras/camera-perspective.png)

フラスタムの形状は視野角（`fov`）で制御します。これは度単位の角度で、デフォルトは45です。デフォルトではこの角度は垂直方向に測られますが、`horizontalFov` を `true` に設定すると水平方向で測られます。値を大きくするとより広い範囲が映り、極端な場合は魚眼レンズのような見た目になります。値を小さくすると、ズームインした望遠レンズのような効果になります。

## 正投影 {#orthographic}

正投影は平行投影です。オブジェクトはカメラからの距離に関係なく、画面上で同じ大きさを保ちます。フラスタムは直方体になります。2Dゲームやアイソメトリックゲーム、CADスタイルのビジュアライゼーションでよく使用されます。

![Orthographic camera](pathname:///img/user-manual/graphics/cameras/camera-orthographic.png)

視野角は適用されないため、ビューのサイズは `orthoHeight` で設定します。これはワールド単位でのビューボリュームの高さの半分です（デフォルトは10）。幅はアスペクト比から導出されます。

投影タイプは次のように設定します:

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
// pc.PROJECTION_PERSPECTIVE（デフォルト） | pc.PROJECTION_ORTHOGRAPHIC
camera.camera.projection = pc.PROJECTION_ORTHOGRAPHIC;
camera.camera.orthoHeight = 5; // ワールド単位でのビューの高さの半分
```

</TabItem>
<TabItem value="editor" label="Editor">

Hierarchyでカメラを選択し、[Cameraコンポーネント](/user-manual/editor/scenes/components/camera)で **Projection** を **Perspective** または **Orthographic** に設定します。それに応じて **Field of View** または **Ortho Height** フィールドが表示されます。

</TabItem>
<TabItem value="react" label="React">

```jsx
import { PROJECTION_ORTHOGRAPHIC } from 'playcanvas';

<Entity name="camera">
  <Camera projection={PROJECTION_ORTHOGRAPHIC} orthoHeight={5} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<!-- デフォルトは透視投影。orthographic フラグを追加すると切り替わります -->
<pc-entity name="camera">
  <pc-camera orthographic ortho-height="5"></pc-camera>
</pc-entity>
```

</TabItem>
</Tabs>

## クリップ面 {#clip-planes}

ニアクリップ面とファークリップ面はフラスタムの両端を区切り、カメラが見ることのできる距離の範囲を制限します。`nearClip`（デフォルト 0.1）より近いもの、または `farClip`（デフォルト 1000）より遠いものはレンダリングされません:

```javascript
camera.camera.nearClip = 0.5;
camera.camera.farClip = 500;
```

:::note

ファークリップ面とニアクリップ面の比率は、深度バッファの精度がシーン全体にどのように分配されるかを決定します。ニア面がファー面に対して非常に小さい場合、遠くのサーフェスを確実に区別するための精度が不足し、Zファイティングと呼ばれるちらつきが発生することがあります。これを避けるには、ニア面はシーンが許容できる範囲でできるだけ大きく、ファー面は必要以上に大きくしないように設定してください。

:::

## アスペクト比 {#aspect-ratio}

デフォルトでは、カメラのアスペクト比はレンダーターゲットと[ビューポート](multiple-cameras.md#viewports)から毎フレーム自動的に計算されるため（`aspectRatioMode` が [`ASPECT_AUTO`](https://api.playcanvas.com/engine/variables/ASPECT_AUTO.html)）、キャンバスのサイズが変わっても画像が引き伸ばされることはありません。非正方形ピクセルのディスプレイ向けにレンダリングするなどの特殊なケースでは、`aspectRatioMode` を [`ASPECT_MANUAL`](https://api.playcanvas.com/engine/variables/ASPECT_MANUAL.html) に設定し、`aspectRatio` を自分で指定してください。

## フラスタムカリング {#frustum-culling}

フラスタムカリングが有効な場合（`frustumCulling`、デフォルトで有効）、エンジンはバウンディングボックスがカメラのフラスタムの完全に外側にあるメッシュインスタンスのレンダリングをスキップします。これにより、大規模なシーンではドローコール数を大幅に削減できます。可視性に関係なくすべてをGPUに送信する必要がある場合にのみ無効にしてください。

フラスタム自体は読み取り専用の `frustum` プロパティから [Frustum](https://api.playcanvas.com/engine/classes/Frustum.html) として公開されており、カスタムの可視性判定に利用できます:

```javascript
const visible = camera.camera.frustum.containsPoint(entity.getPosition());
```

---
title: トーンマッピングと露出
description: カメラごとのトーンマッピングとガンマでHDRのシーンライティングをディスプレイにマッピングし、物理ベースの露出も制御します。
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ライティングの計算はハイダイナミックレンジ（HDR）で行われます。ピクセルの明るさは、標準的なディスプレイで表示できる範囲を大きく超えることがあります。トーンマッピングは、このHDRの範囲を表示可能な色に圧縮する最終的な変換であり、シーンの見た目に大きな影響を与えます。PlayCanvasでは、トーンマッピングはカメラごとに設定します。

## トーンマッピング {#tone-mapping}

利用可能なトーンマッピングカーブは次のとおりです:

* [`TONEMAP_LINEAR`](https://api.playcanvas.com/engine/variables/TONEMAP_LINEAR.html) — 圧縮なし。明るい値は単純に白でクリップされます。デフォルトです。
* [`TONEMAP_FILMIC`](https://api.playcanvas.com/engine/variables/TONEMAP_FILMIC.html) — ハイライトが緩やかにロールオフする、クラシックなフィルミックカーブ。
* [`TONEMAP_HEJL`](https://api.playcanvas.com/engine/variables/TONEMAP_HEJL.html) — パンチが効いてコントラストの強いフィルミック近似。
* [`TONEMAP_ACES`](https://api.playcanvas.com/engine/variables/TONEMAP_ACES.html) — Academy Color Encoding Systemのカーブで、映画的でフォトリアルなレンダリングに広く使用されています。
* [`TONEMAP_ACES2`](https://api.playcanvas.com/engine/variables/TONEMAP_ACES2.html) — コントラストと彩度のバランスが異なるACESのバリエーション。
* [`TONEMAP_NEUTRAL`](https://api.playcanvas.com/engine/variables/TONEMAP_NEUTRAL.html) — 色相と彩度の変化を最小限に抑えながらハイライトを圧縮します。正確な色再現が重要な場合（製品コンフィギュレーターなど）に適しています。

HDRライティングを使用する物理ベースのシーンでは、通常 `TONEMAP_ACES` または `TONEMAP_NEUTRAL` が最適な出発点です。

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
camera.camera.toneMapping = pc.TONEMAP_ACES;
```

</TabItem>
<TabItem value="editor" label="Editor">

Hierarchyでカメラを選択し、[Cameraコンポーネント](/user-manual/editor/scenes/components/camera)で **Tonemapping** を設定します。

</TabItem>
<TabItem value="react" label="React">

```jsx
import { TONEMAP_ACES } from 'playcanvas';

<Entity name="camera">
  <Camera toneMapping={TONEMAP_ACES} />
</Entity>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

```html
<!-- tonemap: none | linear | filmic | hejl | aces | aces2 | neutral -->
<pc-entity name="camera">
  <pc-camera tonemap="aces"></pc-camera>
</pc-entity>
```

</TabItem>
</Tabs>

:::note

[CameraFrame](/user-manual/graphics/posteffects/cameraframe/) によるポストプロセッシングが有効な場合、トーンマッピングはポストプロセッシングパイプライン側で適用されます。カメラではなく `CameraFrame` のレンダリングオプションで設定してください。

:::

## ガンマ補正 {#gamma-correction}

トーンマッピングの後、カメラの出力は標準的なsRGBディスプレイ向けにガンマエンコードされます。これは `gammaCorrection` で制御します:

* [`GAMMA_SRGB`](https://api.playcanvas.com/engine/variables/GAMMA_SRGB.html) — 出力はsRGBディスプレイ向けにエンコードされます。デフォルトであり、通常のレンダリングすべてに推奨される設定です。
* [`GAMMA_NONE`](https://api.playcanvas.com/engine/variables/GAMMA_NONE.html) — 出力はリニア空間のままになります。これは、出力を中間HDRテクスチャにレンダリングし、後続のパスでトーンマッピングとガンマ補正を行う高度なHDRパイプラインのみを対象としています。標準的なディスプレイでは、シーンが暗く見えすぎてしまいます。

レンダリングがリニア空間で行われ、最後にガンマエンコードされる理由については、[リニアワークフロー](/user-manual/graphics/linear-workflow/)を参照してください。

## 物理ベースの露出 {#physical-exposure}

デフォルトでは、シーンの明るさはシンプルな `scene.exposure` の乗数で制御されます。代わりに、写真家にはおなじみの3つのプロパティを使って、物理カメラの露出をモデル化することもできます:

```javascript
app.scene.physicalUnits = true; // ライトの強度が物理単位（ルクス）になります

camera.camera.aperture = 16;        // f値 — 大きいほど露出は少なくなります（デフォルト: 16）
camera.camera.shutter = 1 / 1000;   // 秒 — 長いほど露出は多くなります（デフォルト: 1/1000）
camera.camera.sensitivity = 1000;   // ISO — 高いほど露出は多くなります（デフォルト: 1000）
```

:::note

`aperture`、`shutter`、`sensitivity` は `scene.physicalUnits` が `true` の場合にのみ効果があります。`false`（デフォルト）の場合は、代わりに `scene.exposure` が使用されます。

:::

エンジンの物理ライト単位のサンプルで実際の動作を確認できます:

<EngineExample id="graphics/light-physical-units" title="Physical Light Units" />

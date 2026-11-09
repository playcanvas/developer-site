---
title: レガシーポストエフェクト
description: 非推奨のレガシー Script ベースのポストエフェクトと、それぞれを置き換える CameraFrame のエフェクト。
---

:::warning[非推奨]

レガシーの Script ベースのポストエフェクトは非推奨であり、将来のメジャーバージョンのエンジンで削除されます。引き続き動作しますが、カメラに追加するとデバッグビルドのエンジンで非推奨の警告が出力されます。代わりに [CameraFrame](/user-manual/graphics/posteffects/cameraframe) を使用してください。[CameraFrame への移行](#migrating-to-cameraframe) を参照してください。

:::

PlayCanvas では、レガシーの Script ベースのポストエフェクトを提供しています。そのそれぞれに [CameraFrame](/user-manual/graphics/posteffects/cameraframe) による新しくパフォーマンスのよい代替があるか、CameraFrame の独自エフェクトとして作成できます。

## セットアップ

ポストエフェクトは Script として実装しており、[Camera](/user-manual/editor/scenes/components/camera) コンポーネントが付いた Entity に追加できます。カメラにポストエフェクトを追加する手順は次のとおりです。

1. 下記のいずれかのエフェクトを選び、GitHub のリンクから Script を取得します。

    - [Bloom](/user-manual/graphics/posteffects/legacy/bloom)
    - [Brightness-Contrast](/user-manual/graphics/posteffects/legacy/brightness_contrast)
    - [Hue-Saturation](/user-manual/graphics/posteffects/legacy/hue_saturation)
    - [FXAA](/user-manual/graphics/posteffects/legacy/fxaa)
    - [Sepia](/user-manual/graphics/posteffects/legacy/sepia)
    - [Vignette](/user-manual/graphics/posteffects/legacy/vignette)

2. カメラを表す Entity に [Script](/user-manual/editor/scenes/components/script) コンポーネントを追加します。
3. 希望するポストエフェクトの Script をカメラ Entity の Script コンポーネントに割り当てます。Script コンポーネントに列挙されたポストエフェクト Script の順序が、適用される順序になります。

独自のポストエフェクトを作成することもできます。追加の例は [GitHub](https://github.com/playcanvas/engine/tree/main/scripts/posteffects) にあります。

## CameraFrame への移行 {#migrating-to-cameraframe}

カメラからレガシーのポストエフェクト Script を削除し、代わりに `CameraFrame` を追加します。Editor では [CameraFrame Script](/user-manual/graphics/linear-workflow/hdr-rendering/#cameraframe-in-the-editor) をアタッチし、コードでは [`CameraFrame`](https://api.playcanvas.com/engine/classes/CameraFrame.html) を作成します。次に、レガシーのエフェクトを置き換えるエフェクトを有効にします。

| レガシー Script | CameraFrame での代替 |
| --- | --- |
| Bloom (`posteffect-bloom.js`) | ブルーム (`bloom`) |
| Bokeh (`posteffect-bokeh.js`) | 被写界深度 (`dof`) |
| Brightness-Contrast (`posteffect-brightnesscontrast.js`) | カラーグレーディングの `brightness` と `contrast` (`grading`) |
| Hue-Saturation (`posteffect-huesaturation.js`) | カラーグレーディングの `saturation` (`grading`)。色相の変更には [カラールックアップテーブル](/user-manual/graphics/linear-workflow/hdr-rendering/#color-lut) (`colorLUT`) を使用します |
| Luminosity (`posteffect-luminosity.js`) | `saturation` を 0 にしたカラーグレーディング (`grading`) |
| Sepia (`posteffect-sepia.js`) | [カラールックアップテーブル](/user-manual/graphics/linear-workflow/hdr-rendering/#color-lut) (`colorLUT`) |
| Vignette (`posteffect-vignette.js`) | ビネット (`vignette`) |
| FXAA (`posteffect-fxaa.js`) | マルチサンプリング (`rendering.samples`)、テンポラルアンチエイリアス (`taa`)、または [`SmaaEffect`](https://api.playcanvas.com/engine/classes/SmaaEffect.html) |
| SSAO (`posteffect-ssao.js`) | アンビエントオクルージョン (`ssao`) |
| Outline (`posteffect-outline.js`) | [`OutlineRenderer`](https://api.playcanvas.com/engine/classes/OutlineRenderer.html) |
| Edge Detect、Blend、Horizontal / Vertical Tilt Shift | 組み込みの代替はありません。[独自のエフェクト](/user-manual/graphics/posteffects/cameraframe/#custom-post-processing) を作成してください |

レガシーのエフェクトは、カメラの `disablePostEffectsLayer` を変更しない限り、UI レイヤーとそれ以降のレイヤーには適用されません。`CameraFrame` は Immediate レイヤーまでのレイヤー (Immediate レイヤーを含む) にエフェクトを適用し、UI などの以降のレイヤーはエフェクトの後にレンダリングします。

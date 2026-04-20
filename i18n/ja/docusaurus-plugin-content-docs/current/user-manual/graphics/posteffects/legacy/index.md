---
title: レガシーポストエフェクト
description: レガシーの Script ベースのポストエフェクトをカメラ Entity にアタッチし、パスの順序を制御し、Engine リポジトリから既製のエフェクトを取得します。
---

PlayCanvas では、レガシーの Script ベースのポストエフェクトが引き続きサポートされ、動作します。これらの多くは [CameraFrame](/user-manual/graphics/posteffects/cameraframe) により新しくパフォーマンスのよい代替がありますが、利用は可能です。

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

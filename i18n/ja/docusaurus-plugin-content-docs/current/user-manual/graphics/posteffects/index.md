---
title: ポストエフェクト
---

PlayCanvasでは、プロジェクトへのポストプロセッシングエフェクトを追加することができます。ポストエフェクトは最終的にレンダリングされるイメージを変更し、アプリケーションにビジュアル効果を簡単に追加する方法を提供します。

ポストエフェクトは、[Camera](/user-manual/editor/scenes/components/camera) コンポーネントがアタッチされた Entity に追加できるスクリプトとして実装されています。カメラにポストエフェクトを追加するには、以下の手順を実行します。

1. 以下のエフェクトのうち、一つを選択し、GitHub リンクからスクリプトを取得します。

    - [ブルーム](/user-manual/graphics/posteffects/legacy/bloom)
    - [ブライトネス・コントラスト](/user-manual/graphics/posteffects/legacy/brightness_contrast)
    - [色相・彩度](/user-manual/graphics/posteffects/legacy/hue_saturation)
    - [FXAA](/user-manual/graphics/posteffects/legacy/fxaa)
    - [セピア](/user-manual/graphics/posteffects/legacy/sepia)
    - [ビネット](/user-manual/graphics/posteffects/legacy/vignette)

2. カメラに [Script](/user-manual/editor/scenes/components/script) コンポーネントを追加します。
3. カメラの Script コンポーネントに、必要なポストエフェクトスクリプトを割り当てます。ポストエフェクトスクリプトが Scriptコンポーネント内でリストされる順序が、適用順序を決定することに注意してください。

また、カスタムポストエフェクトを作成することもできます。追加のポストエフェクトについては、[GitHub](https://github.com/playcanvas/engine/tree/main/scripts/posteffects)で探すことができます。

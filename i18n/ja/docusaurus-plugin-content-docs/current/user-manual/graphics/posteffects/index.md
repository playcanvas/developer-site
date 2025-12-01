---
title: ポストエフェクト
---

PlayCanvasでは、プロジェクトへのポストプロセッシングエフェクトを追加することができます。ポストエフェクトは最終的にレンダリングされるイメージを変更し、アプリケーションにビジュアル効果を簡単に追加する方法を提供します。

ポストエフェクトは、[Camera][1] コンポーネントがアタッチされた Entity に追加できるスクリプトとして実装されています。カメラにポストエフェクトを追加するには、以下の手順を実行します。

1. 以下のエフェクトのうち、一つを選択し、GitHub リンクからスクリプトを取得します。

    - [ブルーム][3]
    - [ブライトネス・コントラスト][4]
    - [色相・彩度][5]
    - [FXAA][6]
    - [セピア][7]
    - [ビネット][8]

2. カメラに [Script][9] コンポーネントを追加します。
3. カメラの Script コンポーネントに、必要なポストエフェクトスクリプトを割り当てます。ポストエフェクトスクリプトが Scriptコンポーネント内でリストされる順序が、適用順序を決定することに注意してください。

また、カスタムポストエフェクトを作成することもできます。追加のポストエフェクトについては、[GitHub][2]で探すことができます。

[1]: /user-manual/scenes/components/camera
[2]: https://github.com/playcanvas/engine/tree/main/scripts/posteffects
[3]: /user-manual/graphics/posteffects/legacy/bloom
[4]: /user-manual/graphics/posteffects/legacy/brightness_contrast
[5]: /user-manual/graphics/posteffects/legacy/hue_saturation
[6]: /user-manual/graphics/posteffects/legacy/fxaa
[7]: /user-manual/graphics/posteffects/legacy/sepia
[8]: /user-manual/graphics/posteffects/legacy/vignette
[9]: /user-manual/scenes/components/script

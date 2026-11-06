---
title: FXAAエフェクト
description: 高速フルスクリーンアンチエイリアシング向けのレガシー FXAA Script と、エンジン posteffect-fxaa 実装の場所です。
---

:::warning[非推奨]

このレガシーエフェクトは非推奨です。代わりに [CameraFrame](/user-manual/graphics/posteffects/cameraframe) のマルチサンプリング、テンポラルアンチエイリアス、または SMAA を使用してください。[CameraFrame への移行](/user-manual/graphics/posteffects/legacy#migrating-to-cameraframe) を参照してください。

:::

Fast Approximateアンチエイリアシング(FXAA)はNVIDIAが考案したアンチエイリアスの手法です。これによりシーンに簡単かつ高速なアンチエイリアシングを適応することができます。

これはエフェクトをかけていない画像です。

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

これがエフェクトを適用した同じ画像です。

![Image with effect](/img/user-manual/graphics/posteffects/with-fxaa.png)

ポストエフェクトスクリプトは[GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-fxaa.js)で入手できます。

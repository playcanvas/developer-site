---
title: ビネットエフェクト
sidebar_position: 6
---

写真撮影や光学において、[ビネット効果][1]とは、中心部に比べて画像の周辺部の明るさや彩度が低下することです。この効果は、視聴者の目をフレームの中心に向けるために使用することができます。

これはエフェクトをかけていない画像です。

![Image without effect][2]

これがエフェクトを適用した同じ画像です。

![Image with effect][3]

ビルドインのビネットエフェクトには次の属性があります：

* **Offset**: エフェクトのオフセットをコントロール。
* **Darkness**: エフェクトの暗さをコントロール。

ポストエフェクトスクリプトは[GitHub][4]で入手できます。

[1]: https://en.wikipedia.org/wiki/Vignetting
[2]: /images/platform/posteffects/without_effects.png
[3]: /images/platform/posteffects/with_vignette.png
[4]: https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-vignette.js

---
title: Bloom エフェクト
---

[ブルーム (Bloom)][1]は現実世界のカメラが現実には存在しないものを写しだしてしまうアーティファクトを再現するために使うポストプロセスエフェクトです。このエフェクトは画像の明るい領域のエッジから漏れ広がる光のふちを描画し、非常に明るい光がそのシーンを撮影しているカメラの露出限界を超えている様子を表現します。

次は、ブルームを適用していないイメージです。

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

そして下の画像がブルームエフェクトを適応した画像です。

![Image with effect](/img/user-manual/graphics/posteffects/with-bloom.png)

ビルトインのブルームエフェクトは以下のパラメータを持ちます:

* **Bloom Intensity**: エフェクトの強度
* **Bloom Threshold**: この閾値より明るいピクセルのみがエフェクトの対象となります。0から1の間の値を取ります。
* **Blur Amount**: ぼかしの量を設定します。

ポストエフェクトスクリプトは[GitHub][4]で入手できます。

[1]: https://en.wikipedia.org/wiki/Bloom_(shader_effect)
[4]: https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-bloom.js

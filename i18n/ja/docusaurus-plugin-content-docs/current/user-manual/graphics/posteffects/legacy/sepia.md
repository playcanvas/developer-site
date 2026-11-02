---
title: セピアエフェクト
description: レガシーのセピア Script エフェクトの量と、セピアポストプロセス用カメラ Script の GitHub 参照です。
---

:::warning[非推奨]

このレガシーエフェクトは非推奨です。代わりに [CameraFrame](/user-manual/graphics/posteffects/cameraframe) のカラールックアップテーブルを使用してください。[CameraFrame への移行](/user-manual/graphics/posteffects/legacy#migrating-to-cameraframe) を参照してください。

:::

セピアエフェクトは画像を古い写真のような見え方にするエフェクトです。

これはエフェクトをかけていない画像です。

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

これがエフェクトを適用した同じ画像です。

![Image with effect](/img/user-manual/graphics/posteffects/with-sepia.png)

ビルトインのセピアエフェクトは以下の様な属性値を持ちます:

* **Amount**: エフェクトの強度を設定します。0から1の間の値を取ります。

ポストエフェクトスクリプトは[GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-sepia.js)で入手できます。

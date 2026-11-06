---
title: 色相・彩度エフェクト
description: レガシーの色相・彩度 Script エフェクトのコントロールと、huesaturation ポストエフェクトソースの GitHub リンクです。
---

:::warning[非推奨]

このレガシーエフェクトは非推奨です。代わりに [CameraFrame](/user-manual/graphics/posteffects/cameraframe) のカラーグレーディングの `saturation` を使用してください。色相の変更にはカラールックアップテーブルを使用します。[CameraFrame への移行](/user-manual/graphics/posteffects/legacy#migrating-to-cameraframe) を参照してください。

:::

色相 (Hue) 彩度 (Saturation) エフェクトは、レンダリングされたイメージの色相と彩度を変更できます。

これはエフェクトをかけていない画像です。

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

これがエフェクトをかけて色調と彩度を調整した画像です:

![Image with effect](/img/user-manual/graphics/posteffects/with-hue-saturation.png)

ビルトインの色調-彩度エフェクトは以下の様な属性値が設定されています:

* **Hue**: 画像の色調です。-1から1の範囲の値をとります。(-1はマイナス180度、0は変化なし、1は180度となります)
* **Saturation**: 画像の彩度です。-1から1の範囲の値をとります。(-1は灰色で塗りつぶした状態、0は変化なし、1は最大の彩度となります)

ポストエフェクトスクリプトは[GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-huesaturation.js)で入手できます。

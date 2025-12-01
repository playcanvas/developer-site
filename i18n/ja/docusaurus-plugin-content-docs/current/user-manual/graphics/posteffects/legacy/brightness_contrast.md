---
title: ブライトネス・コントラストエフェクト
---

ブライトネス (Brightness) とコントラスト (Contrast) エフェクトは、レンダリング後の画像の輝度とコントラストを調整します。

これはエフェクトをかけていない画像です。

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

これがエフェクトをかけて輝度とコントラストを調整した画像です。

![Image with effect](/img/user-manual/graphics/posteffects/with-brightness-contrast.png)

ビルトインの輝度とコントラストエフェクトは以下の様な属性値が設定されています:

* **Brightness**: 画像の輝度です。-1から1の範囲の値をとります。(-1は黒で塗りつぶされた状態、0は変化なし、1は白で塗りつぶされた状態となります)
* **Contrast**: 画像のコントラストです。-1から1の範囲の値をとります。(-1は灰色で塗りつぶした状態、0は変化なし、1は最大のコントラストとなります)

ポストエフェクトスクリプトは[GitHub][3]で入手できます。

[3]: https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-brightnesscontrast.js

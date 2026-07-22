---
title: ブライトネス・コントラストエフェクト
description: "レガシーの明るさ・コントラスト Script エフェクト：パラメータ範囲とカメラポストパイプラインの GitHub ソース。"
---

:::ai

* **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「ブライトネス・コントラストエフェクト」で使用する Script と Shader を Pull/Push モードでローカル編集し、変更を確認できます。
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 関連するテキストアセットを作成し、Camera とレンダリングのプロパティを設定して、結果を起動、キャプチャできます。

:::

ブライトネス (Brightness) とコントラスト (Contrast) エフェクトは、レンダリング後の画像の輝度とコントラストを調整します。

これはエフェクトをかけていない画像です。

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

これがエフェクトをかけて輝度とコントラストを調整した画像です。

![Image with effect](/img/user-manual/graphics/posteffects/with-brightness-contrast.png)

ビルトインの輝度とコントラストエフェクトは以下の様な属性値が設定されています:

* **Brightness**: 画像の輝度です。-1から1の範囲の値をとります。(-1は黒で塗りつぶされた状態、0は変化なし、1は白で塗りつぶされた状態となります)
* **Contrast**: 画像のコントラストです。-1から1の範囲の値をとります。(-1は灰色で塗りつぶした状態、0は変化なし、1は最大のコントラストとなります)

ポストエフェクトスクリプトは[GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-brightnesscontrast.js)で入手できます。

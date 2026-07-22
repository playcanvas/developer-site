---
title: ビネットエフェクト
description: エッジを暗くするレガシーのビネット offset と darkness コントロール、およびビネット Script の GitHub リンクです。
---

:::ai

* **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「ビネットエフェクト」で使用する Script と Shader を Pull/Push モードでローカル編集し、変更を確認できます。
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 関連するテキストアセットを作成し、Camera とレンダリングのプロパティを設定して、結果を起動、キャプチャできます。

:::

写真撮影や光学において、[ビネット効果](https://en.wikipedia.org/wiki/Vignetting)とは、中心部に比べて画像の周辺部の明るさや彩度が低下することです。この効果は、視聴者の目をフレームの中心に向けるために使用することができます。

これはエフェクトをかけていない画像です。

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

これがエフェクトを適用した同じ画像です。

![Image with effect](/img/user-manual/graphics/posteffects/with-vignette.png)

ビルドインのビネットエフェクトには次の属性があります：

* **Offset**: エフェクトのオフセットをコントロール。
* **Darkness**: エフェクトの暗さをコントロール。

ポストエフェクトスクリプトは[GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-vignette.js)で入手できます。

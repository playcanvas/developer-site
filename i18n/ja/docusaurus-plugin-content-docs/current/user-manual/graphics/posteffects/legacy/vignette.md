---
title: ビネットエフェクト
description: エッジを暗くするレガシーのビネット offset と darkness コントロール、およびビネット Script の GitHub リンクです。
---

:::ai

* **[Engine Development](/user-manual/ai/developing-with-engine/):** 「ビネットエフェクト」について、次の要件を満たしてください: エッジを暗くするレガシーのビネット offset と darkness コントロール、およびビネット Script の GitHub リンクであること アプリケーションを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。
* **[VS Code Extension](/user-manual/ai/vscode-extension/):** 関連するスクリプトまたはシェーダーアセットに「ビネットエフェクト」を実装し、次の要件を満たしてください: エッジを暗くするレガシーのビネット offset と darkness コントロール、およびビネット Script の GitHub リンクであること。Push の前に完全な差分と診断を確認してください。
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 開いているプロジェクトで「ビネットエフェクト」を設定し、次の要件を満たしてください: エッジを暗くするレガシーのビネット offset と darkness コントロール、およびビネット Script の GitHub リンクであること。シーンを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。

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

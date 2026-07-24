---
title: 色相・彩度エフェクト
description: レガシーの色相・彩度 Script エフェクトのコントロールと、huesaturation ポストエフェクトソースの GitHub リンクです。
---

:::ai

* **[Engine Development](/user-manual/ai/developing-with-engine/):** 「色相・彩度エフェクト」について、次の要件を満たしてください: レガシーの色相・彩度 Script エフェクトのコントロールと、huesaturation ポストエフェクトソースの GitHub リンクであること アプリケーションを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。
* **[VS Code Extension](/user-manual/ai/vscode-extension/):** 関連するスクリプトまたはシェーダーアセットに「色相・彩度エフェクト」を実装し、次の要件を満たしてください: レガシーの色相・彩度 Script エフェクトのコントロールと、huesaturation ポストエフェクトソースの GitHub リンクであること。Push の前に完全な差分と診断を確認してください。
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 開いているプロジェクトで「色相・彩度エフェクト」を設定し、次の要件を満たしてください: レガシーの色相・彩度 Script エフェクトのコントロールと、huesaturation ポストエフェクトソースの GitHub リンクであること。シーンを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。

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

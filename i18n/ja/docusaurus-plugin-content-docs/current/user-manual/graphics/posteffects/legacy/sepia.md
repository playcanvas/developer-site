---
title: セピアエフェクト
description: レガシーのセピア Script エフェクトの量と、セピアポストプロセス用カメラ Script の GitHub 参照です。
---

:::ai

* **[Engine Development](/user-manual/ai/developing-with-engine/):** 「セピアエフェクト」について、次の要件を満たしてください: レガシーのセピア Script エフェクトの量と、セピアポストプロセス用カメラ Script の GitHub 参照であること アプリケーションを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。
* **[VS Code Extension](/user-manual/ai/vscode-extension/):** 関連するスクリプトまたはシェーダーアセットに「セピアエフェクト」を実装し、次の要件を満たしてください: レガシーのセピア Script エフェクトの量と、セピアポストプロセス用カメラ Script の GitHub 参照であること。Push の前に完全な差分と診断を確認してください。
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 開いているプロジェクトで「セピアエフェクト」を設定し、次の要件を満たしてください: レガシーのセピア Script エフェクトの量と、セピアポストプロセス用カメラ Script の GitHub 参照であること。シーンを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。

:::

セピアエフェクトは画像を古い写真のような見え方にするエフェクトです。

これはエフェクトをかけていない画像です。

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

これがエフェクトを適用した同じ画像です。

![Image with effect](/img/user-manual/graphics/posteffects/with-sepia.png)

ビルトインのセピアエフェクトは以下の様な属性値を持ちます:

* **Amount**: エフェクトの強度を設定します。0から1の間の値を取ります。

ポストエフェクトスクリプトは[GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-sepia.js)で入手できます。

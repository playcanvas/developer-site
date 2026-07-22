---
title: FXAAエフェクト
description: 高速フルスクリーンアンチエイリアシング向けのレガシー FXAA Script と、エンジン posteffect-fxaa 実装の場所です。
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「FXAAエフェクト」について、次の要件を満たしてください: 高速フルスクリーンアンチエイリアシング向けのレガシー FXAA Script と、エンジン posteffect-fxaa 実装の場所であること アプリケーションを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 関連するスクリプトまたはシェーダーアセットに「FXAAエフェクト」を実装し、次の要件を満たしてください: 高速フルスクリーンアンチエイリアシング向けのレガシー FXAA Script と、エンジン posteffect-fxaa 実装の場所であること。Push の前に完全な差分と診断を確認してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 開いているプロジェクトで「FXAAエフェクト」を設定し、次の要件を満たしてください: 高速フルスクリーンアンチエイリアシング向けのレガシー FXAA Script と、エンジン posteffect-fxaa 実装の場所であること。シーンを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。

:::

Fast Approximateアンチエイリアシング(FXAA)はNVIDIAが考案したアンチエイリアスの手法です。これによりシーンに簡単かつ高速なアンチエイリアシングを適応することができます。

これはエフェクトをかけていない画像です。

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

これがエフェクトを適用した同じ画像です。

![Image with effect](/img/user-manual/graphics/posteffects/with-fxaa.png)

ポストエフェクトスクリプトは[GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-fxaa.js)で入手できます。

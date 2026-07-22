---
title: FXAAエフェクト
description: 高速フルスクリーンアンチエイリアシング向けのレガシー FXAA Script と、エンジン posteffect-fxaa 実装の場所です。
---

:::ai

- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「FXAAエフェクト」で使用する Script と Shader を Pull/Push モードでローカル編集し、変更を確認できます。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 関連するテキストアセットを作成し、Camera とレンダリングのプロパティを設定して、結果を起動、キャプチャできます。

:::

Fast Approximateアンチエイリアシング(FXAA)はNVIDIAが考案したアンチエイリアスの手法です。これによりシーンに簡単かつ高速なアンチエイリアシングを適応することができます。

これはエフェクトをかけていない画像です。

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

これがエフェクトを適用した同じ画像です。

![Image with effect](/img/user-manual/graphics/posteffects/with-fxaa.png)

ポストエフェクトスクリプトは[GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-fxaa.js)で入手できます。

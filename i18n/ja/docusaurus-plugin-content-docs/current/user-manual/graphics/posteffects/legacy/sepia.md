---
title: セピアエフェクト
description: レガシーのセピア Script エフェクトの量と、セピアポストプロセス用カメラ Script の GitHub 参照です。
---

:::ai

* **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「セピアエフェクト」で使用する Script と Shader を Pull/Push モードでローカル編集し、変更を確認できます。
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 関連するテキストアセットを作成し、Camera とレンダリングのプロパティを設定して、結果を起動、キャプチャできます。

:::

セピアエフェクトは画像を古い写真のような見え方にするエフェクトです。

これはエフェクトをかけていない画像です。

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

これがエフェクトを適用した同じ画像です。

![Image with effect](/img/user-manual/graphics/posteffects/with-sepia.png)

ビルトインのセピアエフェクトは以下の様な属性値を持ちます:

* **Amount**: エフェクトの強度を設定します。0から1の間の値を取ります。

ポストエフェクトスクリプトは[GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-sepia.js)で入手できます。

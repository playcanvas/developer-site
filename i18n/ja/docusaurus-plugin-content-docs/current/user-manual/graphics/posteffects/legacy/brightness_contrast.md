---
title: ブライトネス・コントラストエフェクト
description: "レガシーの明るさ・コントラスト Script エフェクト：パラメータ範囲とカメラポストパイプラインの GitHub ソース。"
---

:::ai

* **[Engine Development](/user-manual/ai/developing-with-engine/):** 「ブライトネス・コントラストエフェクト」について、次の要件を満たしてください: レガシーの明るさ・コントラスト Script エフェクト：パラメータ範囲とカメラポストパイプラインの GitHub ソース アプリケーションを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。
* **[VS Code Extension](/user-manual/ai/vscode-extension/):** 関連するスクリプトまたはシェーダーアセットに「ブライトネス・コントラストエフェクト」を実装し、次の要件を満たしてください: レガシーの明るさ・コントラスト Script エフェクト：パラメータ範囲とカメラポストパイプラインの GitHub ソース。Push の前に完全な差分と診断を確認してください。
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 開いているプロジェクトで「ブライトネス・コントラストエフェクト」を設定し、次の要件を満たしてください: レガシーの明るさ・コントラスト Script エフェクト：パラメータ範囲とカメラポストパイプラインの GitHub ソース。シーンを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。

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

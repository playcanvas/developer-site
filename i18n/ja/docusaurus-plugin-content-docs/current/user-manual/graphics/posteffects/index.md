---
title: ポストエフェクト
description: モダンな CameraFrame の HDR ポストプロセスとレガシーの Script エフェクトを比較し、各フィルターへのリンクを探します。
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「ポストエフェクト」について、次の要件を満たしてください: モダンな CameraFrame の HDR ポストプロセスとレガシーの Script エフェクトを比較し、各フィルターへのリンクを探すること アプリケーションを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。
- **[VS Code Extension](/user-manual/ai/vscode-extension/):** 関連するスクリプトまたはシェーダーアセットに「ポストエフェクト」を実装し、次の要件を満たしてください: モダンな CameraFrame の HDR ポストプロセスとレガシーの Script エフェクトを比較し、各フィルターへのリンクを探すること。Push の前に完全な差分と診断を確認してください。
- **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 開いているプロジェクトで「ポストエフェクト」を設定し、次の要件を満たしてください: モダンな CameraFrame の HDR ポストプロセスとレガシーの Script エフェクトを比較し、各フィルターへのリンクを探すること。シーンを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。

:::

PlayCanvasでは、プロジェクトへのポストプロセッシングエフェクトを追加することができます。ポストエフェクトは最終的にレンダリングされるイメージを変更し、アプリケーションにビジュアル効果を簡単に追加する方法を提供します。

ポストエフェクトは、[Camera](/user-manual/editor/scenes/components/camera) コンポーネントがアタッチされた Entity に追加できるスクリプトとして実装されています。カメラにポストエフェクトを追加するには、以下の手順を実行します。

1. 以下のエフェクトのうち、一つを選択し、GitHub リンクからスクリプトを取得します。

    - [ブルーム](/user-manual/graphics/posteffects/legacy/bloom)
    - [ブライトネス・コントラスト](/user-manual/graphics/posteffects/legacy/brightness_contrast)
    - [色相・彩度](/user-manual/graphics/posteffects/legacy/hue_saturation)
    - [FXAA](/user-manual/graphics/posteffects/legacy/fxaa)
    - [セピア](/user-manual/graphics/posteffects/legacy/sepia)
    - [ビネット](/user-manual/graphics/posteffects/legacy/vignette)

2. カメラに [Script](/user-manual/editor/scenes/components/script) コンポーネントを追加します。
3. カメラの Script コンポーネントに、必要なポストエフェクトスクリプトを割り当てます。ポストエフェクトスクリプトが Scriptコンポーネント内でリストされる順序が、適用順序を決定することに注意してください。

また、カスタムポストエフェクトを作成することもできます。追加のポストエフェクトについては、[GitHub](https://github.com/playcanvas/engine/tree/main/scripts/posteffects)で探すことができます。

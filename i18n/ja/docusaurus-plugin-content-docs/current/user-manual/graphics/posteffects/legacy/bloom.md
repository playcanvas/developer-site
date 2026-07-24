---
title: Bloom エフェクト
description: "レガシーの Script ブルーム：intensity、threshold、blur、および GitHub 上のエンジン posteffect-bloom ソースへのリンク。"
---

:::ai

* **[Engine Development](/user-manual/ai/developing-with-engine/):** 「Bloom エフェクト」について、次の要件を満たしてください: レガシーの Script ブルーム：intensity、threshold、blur、および GitHub 上のエンジン posteffect-bloom ソースへのリンク アプリケーションを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。
* **[VS Code Extension](/user-manual/ai/vscode-extension/):** 関連するスクリプトまたはシェーダーアセットに「Bloom エフェクト」を実装し、次の要件を満たしてください: レガシーの Script ブルーム：intensity、threshold、blur、および GitHub 上のエンジン posteffect-bloom ソースへのリンク。Push の前に完全な差分と診断を確認してください。
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 開いているプロジェクトで「Bloom エフェクト」を設定し、次の要件を満たしてください: レガシーの Script ブルーム：intensity、threshold、blur、および GitHub 上のエンジン posteffect-bloom ソースへのリンク。シーンを起動して表示結果をキャプチャし、シェーダーまたはレンダリングのコンソールエラーを確認してください。

:::

[ブルーム (Bloom)](https://en.wikipedia.org/wiki/Bloom_(shader_effect))は現実世界のカメラが現実には存在しないものを写しだしてしまうアーティファクトを再現するために使うポストプロセスエフェクトです。このエフェクトは画像の明るい領域のエッジから漏れ広がる光のふちを描画し、非常に明るい光がそのシーンを撮影しているカメラの露出限界を超えている様子を表現します。

次は、ブルームを適用していないイメージです。

![Image without effect](/img/user-manual/graphics/posteffects/without-effects.png)

そして下の画像がブルームエフェクトを適応した画像です。

![Image with effect](/img/user-manual/graphics/posteffects/with-bloom.png)

ビルトインのブルームエフェクトは以下のパラメータを持ちます:

* **Bloom Intensity**: エフェクトの強度
* **Bloom Threshold**: この閾値より明るいピクセルのみがエフェクトの対象となります。0から1の間の値を取ります。
* **Blur Amount**: ぼかしの量を設定します。

ポストエフェクトスクリプトは[GitHub](https://github.com/playcanvas/engine/blob/main/scripts/posteffects/posteffect-bloom.js)で入手できます。

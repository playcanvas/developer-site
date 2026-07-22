---
title: Bloom エフェクト
description: "レガシーの Script ブルーム：intensity、threshold、blur、および GitHub 上のエンジン posteffect-bloom ソースへのリンク。"
---

:::ai

* **[VS Code Extension](/user-manual/ai/vscode-extension/):** 「Bloom エフェクト」で使用する Script と Shader を Pull/Push モードでローカル編集し、変更を確認できます。
* **[Editor MCP Server](/user-manual/ai/editor-mcp-server/):** 関連するテキストアセットを作成し、Camera とレンダリングのプロパティを設定して、結果を起動、キャプチャできます。

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

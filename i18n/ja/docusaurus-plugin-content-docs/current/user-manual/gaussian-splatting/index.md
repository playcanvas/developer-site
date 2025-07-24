---
title: Gaussian Splatting
sidebar_position: 12.5
---

3D Gaussian Splattingは、フォトリアリスティックな3Dシーンをキャプチャ、表現、レンダリングするための画期的な手法です。従来のポリゴンメッシュとは異なり、Gaussian Splattingは何百万もの小さな半透明の楕円形スプラットを使用し、優れた視覚的忠実度で詳細な環境を再構築します。

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/cLkf99ZV/" title="360 lookaround camera" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

## Gaussian Splattingの特別な点は？

Gaussian Splattingはフォトグラメトリを通じて実世界の環境キャプチャに優れており、高品質な3Dコンテンツを驚くほど迅速かつ手頃な価格で生成できます。この手法は特に以下の点で強力です。

- **フォトリアリスティックな環境** - 驚くほど詳細なビジュアルで実際の場所をキャプチャ
- **迅速なコンテンツ作成** - 簡単な写真/ビデオキャプチャから複雑な3Dシーンを生成
- **ボリュメトリック表現** - 半透明な素材、微細なディテール、複雑なライティングを自然に処理
- **リアルタイムレンダリング** - ウェブブラウザでのインタラクティブなフレームレートに最適化

## PlayCanvas Gaussian Splattingワークフロー

PlayCanvasは、Gaussian Splatを扱うための完全なエコシステムを提供します。

1. **[スプラットの作成](creating)** - 独自のスプラットデータを作成する方法
2. **[スプラットの表示](viewing-splats)** - PlayCanvas Model Viewerを使用してスプラットをプレビューおよび評価
3. **[スプラットの編集](editing)** - 最適なレンダリングのためにスプラットをクリーンアップおよび準備
4. **[スプラットのレンダリング](rendering)** - PlayCanvasプロジェクトにスプラットを統合

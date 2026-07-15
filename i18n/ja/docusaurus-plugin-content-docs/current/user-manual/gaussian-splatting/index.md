---
title: Gaussian Splatting
description: "PlayCanvasにおける3D Gaussian Splattingの概要：キャプチャ、表示、編集、フォトリアルなスプラットシーンでWebアプリを構築します。"
---

3D Gaussian Splattingは、フォトリアルな3Dシーンをキャプチャ、表現、レンダリングするための革新的な技術です。従来のポリゴンメッシュとは異なり、Gaussian Splattingは、何百万もの小さな半透明の楕円形のスプラットを使用して、卓越した視覚的忠実度で詳細な環境を再構築します。

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/cLkf99ZV/" title="360 lookaround camera" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

## Gaussian Splattingの特長

Gaussian Splattingは、フォトグラメトリーを通じて実世界の環境をキャプチャするのに優れており、高品質な3Dコンテンツを驚くほど迅速かつ手頃な価格で生成できます。この技術は、特に以下の点で強力です。

- **フォトリアルな環境** - 実世界の場所を驚くほどの視覚的詳細さでキャプチャ
- **迅速なコンテンツ作成** - シンプルな写真/ビデオキャプチャから複雑な3Dシーンを生成
- **ボリュメトリック表現** - 半透明のマテリアル、微細なディテール、複雑なライティングを自然に処理
- **リアルタイムレンダリング** - Webブラウザでのインタラクティブなフレームレートに最適化

## 実世界で活用される3DGS

PlayCanvasを使用したGaussian Splat体験は、幅広い業界で提供されています。

- **小売とEコマース** - [2nd Swing](https://www.2ndswing.com/golf-clubs/drivers/ping-g440-max-driver/g440-max-dvr)と[Nood](https://nood.co.nz/pages/interactive-lounge)のインタラクティブな製品ビジュアライゼーション、Shopify向けの製品キャプチャを提供する[Doly](https://www.animl.ai/)
- **不動産とバーチャルツアー** - [Mind Studio](https://studio.adnfamily.com/maquette-immersive)による不動産ショーケースと[SplatTour](https://splattour.com/)による動画から3Dツアーへの変換
- **文化と遺産** - [CyArk](https://www.cyark.org/projects/civita-antigravity/overview)と[モントリオール美術館](https://labs.dpt.co/article-3dgs.html)による重要な場所へのデジタルアクセス
- **映像とコンテンツ制作** - [Prewatch](https://www.prewatch.io/)によるバーチャルロケハンと[Solaya](https://solaya.ai/)による再利用可能なデジタルツイン
- **地理空間と環境の記録** - [Skyfall-GS](https://skyfall-gs.jayinnn.dev/)による衛星画像から生成された都市シーンと[Wildflow](https://wildflow.ai/)によるサンゴ礁のスキャン
- **ソーシャル体験とストーリーテリング** - [Braintrance](https://www.braintrance.net/)による3Dの思い出の共有と[StorySplat](https://storysplat.com/)によるインタラクティブな物語

さらに多くのプロジェクトは、[Awesome PlayCanvasの3D Gaussian Splattingセクション](https://github.com/playcanvas/awesome-playcanvas#3d-gaussian-splatting)でご覧いただけます。

## PlayCanvas Gaussian Splattingワークフロー

PlayCanvasは、Gaussian Splat（スプラット）を扱うための完全なエコシステムを提供します。

1. **[スプラットの作成](creating)** - 独自のスプラットデータを作成する方法
2. **[スプラットの表示](viewing)** - PlayCanvas Model Viewerを使用してスプラットをプレビューおよび評価
3. **[スプラットの編集と公開](editing)** - [SuperSplat](/user-manual/supersplat/)プラットフォーム（Editor、Studio、Viewer、Convert）または[splat-transform CLI](/user-manual/splat-transform/)でスプラットをクリーンアップ、最適化、公開、キュレーション
4. **[スプラットベースのアプリの構築](building)** - PlayCanvasプロジェクトにスプラットを統合

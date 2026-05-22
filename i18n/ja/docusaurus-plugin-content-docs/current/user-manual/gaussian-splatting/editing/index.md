---
title: スプラットの編集と公開
description: SuperSplatプラットフォームでガウシアンスプラットを編集、公開、キュレーション、共有、発見する — そしてスクリプト化されたワークフローにはsplat-transform CLIを使います。
---

生のGaussian Splatファイルは、本番環境で使う前に編集と最適化が必要な場合が多くあります — 不要な要素の削除、ファイルサイズの圧縮、視聴体験の調整など。PlayCanvasは補完関係にある2つのツールセットを提供します：

- **[SuperSplat](/user-manual/supersplat/)プラットフォーム** — ビジュアル、ブラウザベース、[superspl.at](https://superspl.at)でホスト。スプラットの編集、公開、管理、キュレーション、共有、発見をエンドツーエンドで担う拠点です。
- **[splat-transform](/user-manual/splat-transform/) CLI** — スクリプト化された再現可能な変換とバッチ処理のためのオープンソースのコマンドラインツール。

## Gaussian Splatを編集する理由

生成されたスプラットファイルには、通常、対処する必要があるいくつかの問題があります：

- **フローター** - 再構築エラーにより誤った場所に存在する浮遊スプラット
- **背景ノイズ** - スキャン中にキャプチャされた不要な環境要素
- **過大なファイルサイズ** - リアルタイムレンダリングには多すぎるスプラット
- **パフォーマンスの低下** - フレームレートに影響を与える最適ではないスプラット分布
- **視覚的アーティファクト** - 手動でのクリーンアップが必要なレンダリングの不具合

## SuperSplatプラットフォーム

[SuperSplat](/user-manual/supersplat/)は、生のキャプチャから洗練された共有可能なシーンまで、スプラットのライフサイクル全体をカバーします：

- **[Editor](/user-manual/supersplat/editor/)** — スプラットをクリーンアップ、クロップ、色調整、アニメーション化するオープンソースのブラウザベースエディタ。superspl.atへ公開します。
- **[Direct Upload](/user-manual/supersplat/upload)** — Editorを省略し、ホームページのオレンジ色の**Upload Splat**ボタンで完成済みスプラットファイルを直接公開します。
- **[Manage](/user-manual/supersplat/manage)** — あなたのライブラリ：メタデータの編集、公開範囲の変更、ダウンロード可否とライセンスの選択、削除、Studioで開く。
- **[Studio](/user-manual/supersplat/studio/)** — 公開後の視聴体験をキュレーション：カメラ、アニメーション、注釈、ポストエフェクト、スカイボックス、コリジョン。
- **[シーンページ](/user-manual/supersplat/scene-page)** — 訪問者が表示、共有、埋め込み、いいね、コメント、（許可されていれば）ダウンロードを行う公開ページ。
- **[Explore](/user-manual/supersplat/explore)** — 共有されたすべてのスプラットの公開ギャラリー。ソート、期間、特徴フィルタ、検索を備えます。
- **[Viewer](/user-manual/supersplat/viewer/)** — シーンページを動かすオープンソースのウェブビューア。単一ファイルのHTMLとしてエクスポート可能、または`@playcanvas/supersplat-viewer` npmパッケージで埋め込めます。
- **[Convert](/user-manual/supersplat/convert)** — ブラウザ内のフォーマット変換とトランスフォーム（translate / rotate / scale / フィルタ）。splat-transformで実装されています。

## SplatTransform CLI

[splat-transform CLI](/user-manual/splat-transform/)は、次のような場合に最適な選択です：

- スクリプトによる再現可能な変換
- 多数のファイル横断のバッチ処理
- 自動フィルタリングと最適化
- ビルドパイプラインへの統合
- スプラットファイルをプログラム的に結合・マージ

Convertページとsplat-transform CLIは同じ基盤ライブラリを使うため、Convertでインタラクティブに行えることはすべて、コマンドラインから自動化できます。

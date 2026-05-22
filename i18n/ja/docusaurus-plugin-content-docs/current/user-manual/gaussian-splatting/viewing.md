---
title: Splatsの表示
description: "PlayCanvas Model ViewerでGaussian splatsをプレビュー：対応形式、操作、編集や統合前のスプラットの確認方法です。"
---

Gaussian splatを作成したら、編集やプロジェクトへの統合に進む前に、それをプレビューして評価したいと思うでしょう。**PlayCanvas Model Viewer**は、完全なPlayCanvasプロジェクトをセットアップすることなく、splatファイルを素早く表示し、検査するための便利な方法を提供します。

## PlayCanvas Model Viewer

[PlayCanvas Model Viewer](https://playcanvas.com/viewer)は、Gaussian splatsを含む3Dコンテンツをブラウザで直接、即座にプレビューできるウェブベースのツールです。

<video autoPlay muted loop controls src='/video/playcanvas-splat-viewer.mp4' style={{width: '100%', height: 'auto'}} />

### 対応Splatフォーマット

Model Viewerは、以下の一般的に使用されるGaussian splatフォーマットに対応しています。

| フォーマット | ファイル拡張子 | 説明 |
|--------|----------------|-------------|
| **PLY** | `.ply` | 標準的な非圧縮Splatフォーマット |
| **Compressed PLY** | `.compressed.ply` | 圧縮（量子化）フォーマット |
| **SOG (bundled)** | `.sog` | 単一ファイル内の超圧縮フォーマット |
| **SOG (unbundled)** | `meta.json` + `.webp` images | 複数ファイル内の超圧縮フォーマット |

### Splatsの表示方法

1. **アクセス** [playcanvas.com/viewer](https://playcanvas.com/viewer)
2. ファイルシステムからビューアへsplatを**ドラッグ＆ドロップ**します

   :::info[unbundled SOGシーンの表示]
   **SOG (unbundled)**フォーマットの場合：`meta.json`と`.webp`画像を含む**親フォルダー**をドラッグします
   :::
3. 3Dシーンを**ナビゲート**します：

   | 操作 | アクション |
   |---------|--------|
   | 左ダブルクリック | オービットポイントを設定 |
   | 左クリック + ドラッグ | splatの周りをオービット |
   | 右クリック + ドラッグ | 見回す |
   | Shift + クリック + ドラッグ | ビューをパン |
   | マウスホイール | ズームイン/アウト |
   | WASDまたは矢印キー | 前後左右に移動 |

## オープンソースとカスタマイズ

PlayCanvas Model Viewerは**オープンソース**であり、[GitHub](https://github.com/playcanvas/model-viewer)で利用可能です。これにより、以下のことが可能です：

- **独自のバージョンをホストする** - ローカルサーバーを使用するか、独自のインフラストラクチャにデプロイして、完全に制御できます
- **新しい機能を追加する** - 追加のファイルフォーマットやカスタムUIのサポートを追加する
- **貢献する** - 問題やプルリクエストを提出して、全員のためにビューアを改善するのに役立てる

## 公開済みスプラットの表示

スプラットがすでにsuperspl.atに公開されている場合、ガウシアンスプラットに特化した2つのビューア側オプションがあります：

- **公開[シーンページ](/user-manual/supersplat/scene-page)**（`superspl.at/scene/<hash>`） — スプラットを最も簡単に共有する方法で、[Studio](/user-manual/supersplat/studio/)でカメラ、アニメーション、注釈、ポストエフェクト、コリジョンを含めてキュレーション済みのスプラットにも適しています。
- **[SuperSplat Viewer](/user-manual/supersplat/viewer/)** — シーンページを動かしているオープンソースのウェブビューア。`@playcanvas/supersplat-viewer`としてnpmで利用でき、自分のサイトに埋め込んだり、単一ファイルのHTMLエクスポートとしてセルフホストできます。

上記のPlayCanvas Model Viewerは、任意のスプラットファイル（および他の3Dコンテンツ）を素早くプレビューしたいとき、公開前またはプリフライトチェックの一環として、依然として適切なツールです。

## 次のステップ

Model Viewerでsplatsをプレビューした後：

- クリーンアップが必要な場合 → [スプラットの編集と公開](../editing)に進み、[SuperSplatプラットフォーム](/user-manual/supersplat/)で最適化、公開、キュレーションを行います
- 品質があなたのニーズを満たしている場合 → 直接[Splatベースのアプリの構築](../building)に進みます

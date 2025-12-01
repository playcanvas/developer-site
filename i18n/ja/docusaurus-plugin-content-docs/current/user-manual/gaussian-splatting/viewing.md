---
title: Splatsの表示
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

## 次のステップ

Model Viewerでsplatsをプレビューした後：

- クリーンアップが必要な場合 → [Splatsの編集](../editing)に進み、最適化と洗練を行います
- 品質があなたのニーズを満たしている場合 → 直接[Splatベースのアプリの構築](../building)に進みます

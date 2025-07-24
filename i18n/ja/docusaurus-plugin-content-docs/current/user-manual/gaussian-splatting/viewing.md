---
title: スプラットの表示
sidebar_position: 3
---

Gaussian スプラットを作成したら、プロジェクトの編集や統合に進む前に、それをプレビューして評価したいと思うでしょう。**PlayCanvas Model Viewer** を使用すると、完全な PlayCanvas プロジェクトをセットアップすることなく、スプラットファイルを素早く表示および検査できる便利な方法が提供されます。

## PlayCanvas Model Viewer

[PlayCanvas Model Viewer](https://playcanvas.com/viewer) は、Gaussian スプラットを含む 3D コンテンツをブラウザで直接瞬時にプレビューできるウェブベースのツールです。

<video autoplay controls src='/video/playcanvas-splat-viewer.mp4' style={{width: '100%', height: 'auto'}} />

### 対応スプラット形式

Model Viewer は、以下の3つの一般的に使用される Gaussian スプラット形式をサポートしています。

- **PLY ファイル** (`.ply`) - 標準的な非圧縮スプラット形式
- **圧縮 PLY ファイル** (`.compressed.ply`) - PlayCanvas 圧縮 (量子化) 形式
- **SOGS 形式** (`meta.json` + WebP 画像) - 超圧縮形式

### スプラットの表示方法

1. [playcanvas.com/viewer](https://playcanvas.com/viewer) に**アクセス**します
2. スプラットをビューアに**ドラッグ＆ドロップ**します
   - **PLY** および **圧縮 PLY** ファイルの場合: 個々のファイルをドラッグします
   - **SOGS** 形式の場合: `meta.json` と WebP 画像を含む親フォルダをドラッグします
3. 3D シーンを**操作**します:

   | 操作 | アクション |
   |---------|--------|
   | 左ダブルクリック | オービットポイントを設定 |
   | 左クリック + ドラッグ | スプラットの周りをオービット |
   | 右クリック + ドラッグ | 周囲を見回す |
   | Shift + クリック + ドラッグ | ビューをパン |
   | マウスホイール | ズームイン/アウト |
   | WASD または矢印キー | 前進/後退/左/右に移動 |

## オープンソースとカスタマイズ

PlayCanvas Model Viewer は**オープンソース**であり、[GitHub](https://github.com/playcanvas/model-viewer) で入手できます。これは以下のことを意味します。

- **独自のバージョンをホスト** - ローカルサーバーを使用するか、独自のインフラストラクチャにデプロイして完全に制御します
- **新しい機能を追加** - 追加のファイル形式やカスタム UI のサポートを追加します
- **貢献する** - イシューやプルリクエストを送信して、ビューアを皆のために改善するのに役立ちます

## 次のステップ

Model Viewer でスプラットをプレビューした後:

- クリーンアップが必要な場合 → 最適化と調整のために [スプラットの編集](../editing) に進みます
- 品質が要件を満たしている場合 → 直接 [スプラットのレンダリング](../rendering) に進みます

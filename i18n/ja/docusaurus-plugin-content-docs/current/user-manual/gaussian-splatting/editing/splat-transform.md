---
title: SplatTransform CLIツール
---

[SplatTransform](https://github.com/playcanvas/splat-transform) は、3D Gaussian Splats の操作を容易にするために設計された強力なコマンドラインツールです。フォーマット間の変換、変換の適用、スプラットデータの分析など、SplatTransform は開発者が Gaussian splat ワークフローを正確に制御するために必要なツールを提供します。

:::note Open Source

SplatTransform は、[MITライセンスの下でGitHubにてオープンソース化されています](https://github.com/playcanvas/splat-transform)。

:::

## SplatTransformを使用する理由

SplatTransform は、開発者が Gaussian splats を扱う際に直面する重要な問題を解決します：

🔄 **幅広いフォーマットサポート** — PLY, SPLAT, KSPLAT, SOGS、さらにはCSV間をシームレスに変換  
🛠️ **強力な変換機能** — スプラットを正確に平行移動、回転、拡大縮小  
🧹 **スマートフィルタリング** — NaN値の除去、プロパティによるフィルタリング、不要なデータの削除  
📦 **シーンのマージ** — 複数のスプラットファイルを統合されたシーンに結合  
⚡ **製品対応** — 最高のパフォーマンスのために最適化済み  
🆓 **オープンソース** — 完全に無料でGitHubで利用可能

## インストール

npm を介して SplatTransform をグローバルにインストールします：

```bash
npm install -g @playcanvas/splat-transform
```

インストールを確認します：

```bash
splat-transform --version
```

## 基本的な使い方

### フォーマット変換

一般的に使用されるスプラットフォーマット間をシンプルなコマンドで変換します：

```bash
# KSPLATをPLYに変換
splat-transform input.ksplat converted.ply

# PLYをSOGSフォーマットに変換
splat-transform input.ply meta.json

# SPLATフォーマットに変換
splat-transform input.ply output.splat
```

SplatTransform は拡張子に基づいてファイルフォーマットを検出します。サポートされているフォーマットは以下の通りです：

| フォーマット | 拡張子 | 入力 | 出力 | 説明 |
|--------|-----------|-------|--------|-------------|
| PLY | `.ply` | ✅ | ✅ | 非圧縮バイナリフォーマット |
| Compressed PLY | `.compressed.ply` | ✅ | ✅ | 圧縮バイナリフォーマット |
| SPLAT | `.splat` | ✅ | ❌ | バイナリフォーマット (antimatter15) |
| KSPLAT | `.ksplat` | ✅ | ❌ | 圧縮バイナリフォーマット (mkkellogg) |
| SOGS | `meta.json` | ❌ | ✅ | 超圧縮フォーマット (JSON + WebP) |
| CSV | `.csv` | ❌ | ✅ | 分析用のコンマ区切り値 |

## 変換

### 空間変換の適用

直感的なコマンドラインオプションで変換中にスプラットを変換します：

```bash
# スプラットを平行移動
splat-transform input.ply -t 0,0,10 translated.ply

# Y軸を中心に90度回転
splat-transform input.ply -r 0,90,0 rotated.ply

# スプラットを50%拡大縮小
splat-transform input.ply -s 0.5 scaled.ply

# 複数の変換を組み合わせる
splat-transform input.ply -s 0.5 -t 0,0,10 -r 0,90,0 transformed.ply
```

### 変換オプション

| オプション | 説明 | フォーマット |
|--------|-------------|--------|
| `-t, --translate` | 平行移動ベクトル | `x,y,z` |
| `-r, --rotate` | 角度での回転 | `x,y,z` |
| `-s, --scale` | 均一なスケールファクター | `number` |

## フィルタリングと最適化

### スマートフィルタリング

不要なデータを削除し、製品用にスプラットを最適化します：

```bash
# NaN値を削除
splat-transform input.ply --filterNaN cleaned.ply

# 不透明度でフィルタリング (不透明度 > 0.3 のスプラットを保持)
splat-transform input.ply -c opacity,gt,0.3 filtered.ply

# 不要なデータバンドを削除
splat-transform input.ply --filterBands 2 optimized.ply

# 複数のフィルターを組み合わせる
splat-transform input.ply --filterNaN -c opacity,gt,0.1 --filterBands 2 production.ply
```

### フィルターオプション

| オプション | 説明 | 使用法 |
|--------|-------------|-------|
| `-n, --filterNaN` | NaN値を持つスプラットを削除 | `--filterNaN` |
| `-c, --condition` | プロパティ条件でフィルタリング | `-c property,operator,value` |
| `-b, --filterBands` | 指定された数の球面調和バンドを保持 | `--filterBands 0/1/2/3` |

#### 条件演算子

- `gt` - より大きい
- `lt` - より小さい
- `eq` - 等しい
- `gte` - 以上
- `lte` - 以下

## シーンのマージ

複数のスプラットファイルを個別の変換を適用して単一のシーンに結合します：

```bash
# シンプルなマージ
splat-transform fileA.ply fileB.ply merged.ply

# ファイルごとに異なる変換を適用してマージ
splat-transform inputA.ply -r 0,90,0 inputB.ply -s 2 merged.ply

# 複雑な複数ファイルのマージ
splat-transform \
  scene1.ply -t 0,0,0 \
  scene2.ply -t 10,0,0 -r 0,45,0 \
  scene3.ply -t 0,0,10 -s 0.8 \
  combined_scene.ply
```

## データ分析のためのCSVエクスポート

SplatTransform の最も強力な機能の1つは CSV エクスポートであり、データサイエンスワークフローを可能にします：

```bash
# スプラットデータをCSVにエクスポート
splat-transform scene.ply data.csv

# 分析のためにエクスポートする前に事前フィルタリング
splat-transform input.ply --filterNaN -c opacity,gt,0.1 analysis.csv
```

### CSVエクスポートが重要な理由

- **スプレッドシート分析** — Excel、Google Sheets、または任意のデータ分析ツールに直接インポート
- **統計的洞察** — 分布、相関、品質メトリクスの計算
- **カスタムフィルタリング** — スプレッドシートの数式を使用して外れ値を特定したりデータをセグメント化
- **視覚化** — スプラットデータのパターンを理解するためのチャートやグラフの作成
- **統合** — スプラットデータを機械学習パイプラインやカスタムワークフローに供給

CSVエクスポートは、スプラットを不透明なバイナリファイルから、研究や最適化に最適な読み取り可能で分析可能なデータセットに変換します。

## 一般的なワークフロー

### 生産最適化パイプライン

```bash
# クリーンアップし、球面調和バンドを制限し、本番環境向けにスケールを適用
splat-transform raw_capture.ply \
  --filterNaN \
  --filterBands 2 \
  -s 0.8 \
  production/meta.json
```

### フォーマット移行

```bash
# 既存のKSPLATアセットをPlayCanvas SOGSに変換
for file in *.ksplat; do
  splat-transform "$file" "${file%.ksplat}_meta.json"
done
```

### 品質分析

```bash
# スプレッドシートでの品質分析のためにエクスポート
splat-transform scene.ply \
  --filterNaN \
  -c opacity,gt,0.05 \
  quality_analysis.csv
```

### マルチシーン構成

```bash
# 複数のシーンを正確な位置で結合
splat-transform \
  environment.ply -t 0,0,0 \
  character.ply -t 2,0,1 -r 0,180,0 \
  props.ply -t -3,0,2 -s 1.2 \
  complete_scene.ply
```

## ヘルプの取得

任意のコマンドのヘルプを取得します：

```bash
# 一般的なヘルプ
splat-transform --help

# バージョン情報を取得
splat-transform --version
```

問題、機能要求、または貢献については、[GitHubリポジトリ](https://github.com/playcanvas/splat-transform)を参照してください。プロジェクトはコミュニティからのバグ報告とプルリクエストを歓迎しています。

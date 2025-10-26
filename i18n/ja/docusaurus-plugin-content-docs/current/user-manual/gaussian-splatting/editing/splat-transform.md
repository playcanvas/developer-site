---
title: SplatTransform CLIツール
---

[SplatTransform](https://github.com/playcanvas/splat-transform) は、3D Gaussian Splats の操作を容易にするために設計された強力なコマンドラインツールです。フォーマット間の変換、変換の適用、スプラットデータの分析など、SplatTransform は開発者が Gaussian splat ワークフローを正確に制御するために必要なツールを提供します。

:::note Open Source

SplatTransform は、[MITライセンスの下でGitHubにてオープンソース化されています](https://github.com/playcanvas/splat-transform)。

:::

## SplatTransformを使用する理由

SplatTransform は、開発者が Gaussian splats を扱う際に直面する重要な問題を解決します：

🔄 **幅広いフォーマットサポート** — PLY, SPLAT, KSPLAT, SOG、さらにはCSV間をシームレスに変換  
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

SplatTransform の一般的な構文は次のとおりです：

```bash
splat-transform [GLOBAL] input [ACTIONS] ... output [ACTIONS]
```

**重要なポイント：**

- 入力ファイルが作業セットになり、ACTIONS が順番に適用されます
- 最後のファイルが出力で、その後のアクションは最終結果を変更します

### フォーマット変換

一般的に使用されるスプラットフォーマット間をシンプルなコマンドで変換します：

```bash
# シンプルなフォーマット変換
splat-transform input.ply output.csv

# .splat フォーマットから変換
splat-transform input.splat output.ply

# .ksplat フォーマットから変換
splat-transform input.ksplat output.ply

# 圧縮PLYに変換
splat-transform input.ply output.compressed.ply

# 圧縮PLYを標準PLYに展開
# (圧縮 .ply は読み取り時に自動的に検出され展開されます)
splat-transform input.compressed.ply output.ply

# SOG バンドル版フォーマットに変換
splat-transform input.ply output.sog

# SOG 非バンドル版フォーマットに変換
splat-transform input.ply output/meta.json

# SOG (バンドル版) から PLY に変換
splat-transform scene.sog restored.ply

# SOG (非バンドル版フォルダ) から PLY に変換
splat-transform output/meta.json restored.ply

# スタンドアロンHTMLビューアに変換
splat-transform input.ply output.html

# カスタム設定でHTMLビューアに変換
splat-transform -E settings.json input.ply output.html
```

SplatTransform は拡張子に基づいてファイルフォーマットを検出します。サポートされているフォーマットは以下の通りです：

| フォーマット | 入力 | 出力 | 説明 |
| ------ | ----- | ------ | ----------- |
| `.ply` | ✅ | ✅ | 標準PLYフォーマット |
| `.sog` | ✅ | ✅ | バンドル版超圧縮フォーマット (推奨) |
| `meta.json` | ✅ | ✅ | 非バンドル版超圧縮フォーマット (`.webp` テクスチャを伴う) |
| `.compressed.ply` | ✅ | ✅ | 圧縮PLYフォーマット (読み取り時に自動検出され展開) |
| `.ksplat` | ✅ | ❌ | 圧縮スプラットフォーマット (mkkellogg フォーマット) |
| `.splat` | ✅ | ❌ | 圧縮スプラットフォーマット (antimatter15 フォーマット) |
| `.spz` | ✅ | ❌ | 圧縮スプラットフォーマット (Niantic フォーマット) |
| `.mjs` | ✅ | ❌ | mjs スクリプトを使用してシーンを生成 (Beta) |
| `.csv` | ❌ | ✅ | コンマ区切り値スプレッドシート |
| `.html` | ❌ | ✅ | スタンドアロンHTMLビューアアプリ (SOGフォーマットを埋め込み) |

## アクション

アクションは繰り返し適用でき、任意の順序でスプラットを変換およびフィルタリングできます：

```none
-t, --translate        <x,y,z>          スプラットを (x, y, z) で平行移動
-r, --rotate           <x,y,z>          スプラットをオイラー角 (x, y, z) で回転 (度単位)
-s, --scale            <factor>         スプラットを均一にスケーリング
-H, --filter-harmonics <0|1|2|3>        n より大きい球面調和バンドを削除
-N, --filter-nan                        NaN または Inf 値を持つガウシアンを削除
-B, --filter-box       <x,y,z,X,Y,Z>    ボックス外のガウシアンを削除 (最小、最大コーナー)
-S, --filter-sphere    <x,y,z,radius>   球外のガウシアンを削除 (中心、半径)
-V, --filter-value     <name,cmp,value> <name> <cmp> <value> のスプラットを保持
                                          cmp ∈ {lt,lte,gt,gte,eq,neq}
-p, --params           <key=val,...>    .mjs ジェネレータスクリプトにパラメータを渡す
```

## グローバルオプション

```none
-h, --help                              ヘルプを表示して終了
-v, --version                           バージョンを表示して終了
-w, --overwrite                         出力ファイルが存在する場合は上書き
-c, --cpu                               SOG球面調和圧縮にCPUを使用
-i, --iterations       <n>              SOG SH圧縮のイテレーション数 (多い=高品質)。デフォルト: 10
-E, --viewer-settings  <settings.json>  HTMLビューア設定JSONファイル
```

:::note

`-E` オプションにデータを渡す方法の詳細については、[SuperSplat Viewer Settings Schema](https://github.com/playcanvas/supersplat-viewer?tab=readme-ov-file#settings-schema) を参照してください。

:::

## 変換

### 空間変換の適用

直感的なコマンドラインオプションで変換中にスプラットを変換します：

```bash
# スケールと平行移動
splat-transform bunny.ply -s 0.5 -t 0,0,10 bunny_scaled.ply

# Y軸を中心に90度回転
splat-transform input.ply -r 0,90,0 output.ply

# 複数の変換を連結
splat-transform input.ply -s 2 -t 1,0,0 -r 0,0,45 output.ply
```

## フィルタリングと最適化

### スマートフィルタリング

不要なデータを削除し、製品用にスプラットを最適化します：

```bash
# NaN と Inf を含むエントリを削除
splat-transform input.ply --filter-nan output.ply

# 不透明度の値でフィルタリング (不透明度 > 0.5 のスプラットのみを保持)
splat-transform input.ply -V opacity,gt,0.5 output.ply

# 2より高い球面調和バンドを削除
splat-transform input.ply --filter-harmonics 2 output.ply
```

## シーンのマージ

複数のスプラットファイルを個別の変換を適用して単一のシーンに結合します：

```bash
# 異なる変換で複数のファイルを結合
splat-transform -w cloudA.ply -r 0,90,0 cloudB.ply -s 2 merged.compressed.ply

# 結合結果に最終的な変換を適用
splat-transform input1.ply input2.ply output.ply -t 0,0,10 -s 0.5
```

## データ分析のためのCSVエクスポート

SplatTransform の最も強力な機能の1つは CSV エクスポートであり、データサイエンスワークフローを可能にします：

```bash
# スプラットデータをCSVにエクスポート
splat-transform scene.ply data.csv

# 分析のためにエクスポートする前に事前フィルタリング
splat-transform input.ply --filter-nan -V opacity,gt,0.1 analysis.csv
```

### CSVエクスポートが重要な理由

- **スプレッドシート分析** — Excel、Google Sheets、または任意のデータ分析ツールに直接インポート
- **統計的洞察** — 分布、相関、品質メトリクスの計算
- **カスタムフィルタリング** — スプレッドシートの数式を使用して外れ値を特定したりデータをセグメント化
- **視覚化** — スプラットデータのパターンを理解するためのチャートやグラフの作成
- **統合** — スプラットデータを機械学習パイプラインやカスタムワークフローに供給

CSVエクスポートは、スプラットを不透明なバイナリファイルから、研究や最適化に最適な読み取り可能で分析可能なデータセットに変換します。

## ジェネレーター (Beta)

ジェネレータースクリプトを使用してガウシアンスプラットデータを合成できます。これにより、JavaScriptを使用してスプラットシーンを手続き的に作成できます：

```bash
splat-transform gen-grid.mjs -p width=10,height=10,scale=10,color=0.1 scenes/grid.ply -w
```

詳細については、GitHubリポジトリの[ジェネレータースクリプトの例](https://github.com/playcanvas/splat-transform/tree/main/generators)を参照してください。

## 一般的なワークフロー

### 生産最適化パイプライン

```bash
# クリーンアップし、球面調和バンドを制限し、本番環境向けにスケールを適用
splat-transform raw_capture.ply \
  --filter-nan \
  --filter-harmonics 2 \
  -s 0.8 \
  production/capture.sog
```

### フォーマット移行

```bash
# 既存のKSPLATアセットをPlayCanvas SOGに変換
for file in *.ksplat; do
  splat-transform "$file" "${file%.ksplat}.sog"
done
```

### 品質分析

```bash
# スプレッドシートでの品質分析のためにエクスポート
splat-transform scene.ply \
  --filter-nan \
  -V opacity,gt,0.05 \
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

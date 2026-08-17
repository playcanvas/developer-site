---
title: Streamed SOGの生成
description: "splat-transform でマルチLODのStreamed SOG（lod-meta.json）を構築します：LODレベルのタグ付け、単一ソースのデシメート、チャンクのチューニング、Streamed SOGの読み戻し。"
---

[Streamed SOG](/user-manual/gaussian-splatting/formats/streamed-sog)形式は、大きなGaussian splatシーンの効率的なストリーミングとレンダリングを可能にします。[splat-transform](/user-manual/splat-transform/)は、段階的にガウシアンが少なくなる一連のLOD (Level of Detail) レベル（LOD 0 = 最高詳細、数字が大きいほど詳細度が低い）から、プログレッシブダウンロードのために空間ツリー構造を持つ最適化されたストリーミング形式を構築します。

PlayCanvasアプリケーションでのStreamed SOGの読み込みとレンダリングについては、[LODストリーミング](/user-manual/gaussian-splatting/building/lod-streaming)ガイドを参照してください。

## LODレベルの用意

LODレベルは次の2つの方法で用意できます：

- **独自のLODファイルを用意する** — 各レベルごとに個別のスプラットファイルを提供します（例：トレーニング時に生成したものや、別のツールからエクスポートしたもの）。
- **単一のソースをデシメートして生成する** — [`--decimate`](/user-manual/splat-transform/#actions)を使用して、1つの高品質な入力から詳細度の低いレベルを作成できます。各レベルを個別に用意する必要はありません。

:::note

デシメーションは呼び出しの最後のアクションでなければならず、その出力は `.ply` ファイルである必要があります。そのため、LODレベルの生成は2ステップのプロセスになります：まずデシメートしたPLYレベルを書き出し、次に2回目の呼び出しでそれらをStreamed SOGにまとめます。デシメーションはメモリ制限付きのストリーミング処理で、1億以上のガウシアンを持つシーンにもスケールします。巨大なシーンでの深いターゲットは一時ファイルを `--scratch-dir`（デフォルト：出力ファイルのディレクトリ）にスピルします。

:::

## 出力ファイル名の要件

出力ファイル名がフォーマットを決定します。これらは**任意の名前ではありません**：

- **`lod-meta.json`** — Streamed SOG形式を生成（プログレッシブローディング用の空間ツリー構造を持つ複数のSOGチャンク）
- **`meta.json`** — 非バンドル版SOG形式を生成（単一のSOGファイル、ストリーミングなし）

出力ファイル名は正確に `lod-meta.json` または `meta.json` である必要があります。変更できるのはその前のディレクトリパスのみです。例：`output/lod-meta.json`、`my-scene/lod-meta.json`。

## `--tag-lod` による入力のタグ付け

`-l` / `--tag-lod` は入力ファイルのガウシアンにLODレベルをタグ付けするもので、適用対象の入力ファイルの後に置きます。`lod-meta.json` 出力の場合、すべての入力にタグが必要です：

- **`n >= 0`** — 詳細レベル（`0` = 最高詳細）。
- **`-1`** — **環境（environment）**：背景用スプラット（例：空や遠景）。LODチャンクに振り分けられる代わりに `env/meta.json` に書き込まれ、`lod-meta.json` の `environment` フィールドから参照されます。

LCC および LCC2 入力には既にLODレベル（および存在する場合は環境）が含まれているため、明示的なタグは不要です。

:::note

環境スプラットは `lod-meta.json` 出力の場合にのみ書き込まれます。その他の出力形式では無視されます — 環境タグ付きスプラットが破棄される場合、splat-transform は警告を表示します。

:::

## 使用例

```bash
# 複数の入力ファイルからStreamed SOG形式を生成
# 各入力ファイルは異なる詳細レベルを表します（LOD 0は最高品質）
splat-transform \
  lod0.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  lod3.ply -l 3 \
  output/lod-meta.json \
  --filter-nan \
  --filter-harmonics 0

# 単一の高品質ソースをデシメートして詳細度の低いレベルを生成
# ステップ1: ソーススプラットの段階的に小さいバージョンを作成
splat-transform source.ply -d 50% lod1.ply
splat-transform source.ply -d 25% lod2.ply
splat-transform source.ply -d 10% lod3.ply
# ステップ2: フル詳細のソースとデシメートしたレベルをStreamed SOG形式にまとめる
splat-transform \
  source.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  lod3.ply -l 3 \
  output/lod-meta.json \
  --filter-nan

# LODレベルと一緒に環境（背景）スプラットを含める
splat-transform \
  scene.ply -l 0 \
  sky.ply --tag-lod -1 \
  output/lod-meta.json

# より良いパフォーマンスのためにカスタムチャンク設定でLODを生成
splat-transform \
  --lod-chunk-count 1024 \
  --lod-chunk-extent 32 \
  lod0.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  output/lod-meta.json \
  --filter-nan

# LCCまたはLCC2ファイルから直接Streamed SOG形式を生成
# (これらのファイルには複数のLODレベルが既に含まれています)
splat-transform scene.lcc output/lod-meta.json
```

## Streamed SOGの読み戻し

Streamed SOGは入力フォーマットとしても読み取り可能です。`-L` / `--select-lod` で読み取るLODレベルを選択し、`--info` で変換せずにデータセットの構造を確認できます：

```bash
# 最高詳細レベルをPLYに抽出
splat-transform scene/lod-meta.json --select-lod 0 lod0.ply

# 何も書き込まずにフォーマットとLODごとのスプラット数を確認
splat-transform scene/lod-meta.json --info null
```

## ヒント

- `--decimate`（`-d`）を使用して、各レベルを個別に用意する代わりに、1つの高品質ソースから詳細度の低いLODレベルを生成
- `--filter-nan`を使用して、処理前に無効なガウシアンを削除
- 色の詳細がそれほど重要でない場合は、`--filter-harmonics 0`を使用してファイルサイズを削減
- `--lod-chunk-count`を使用して、スプラットを含む生成されるSOGファイルの数を制御
- `--lod-chunk-extent`を使用して各ノードのサイズを制御。非常に大きなシーンの場合は増やして、管理するノードの数が膨大になるのを避ける
- `--info`を使用して、生成されたデータセットのLODごとのスプラット数を確認

## 関連項目

- [Streamed SOGフォーマット](/user-manual/gaussian-splatting/formats/streamed-sog) — ディスク上のフォーマット仕様。
- [LODストリーミング](/user-manual/gaussian-splatting/building/lod-streaming) — PlayCanvasアプリでのStreamed SOGの読み込みとレンダリング。
- [splat-transform CLI リファレンス](/user-manual/splat-transform/) — LOD入力/出力オプションを含む完全なオプションリファレンス。
- [SuperSplatのストリーミング](/user-manual/supersplat/streaming) — SuperSplatのWeb UIを介したStreamed SOGの生成。

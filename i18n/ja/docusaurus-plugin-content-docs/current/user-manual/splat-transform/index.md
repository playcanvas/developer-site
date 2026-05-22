---
title: SplatTransform
description: "SplatTransformのCLIとライブラリ：スプラット形式の相互変換、データの変換とフィルタ、Sceneのマージ、コリジョン用のボクセル化、画像レンダリングを行います。"
---

[SplatTransform](https://github.com/playcanvas/splat-transform) は、Gaussian splatsの変換と編集のためのオープンソースライブラリおよびCLIツールです。フォーマット間の変換、変換の適用、データのフィルタリング、コリジョンボリュームの生成、スプラット統計の分析など、SplatTransformは開発者がGaussian splatワークフローを正確に制御するためのツールを提供します。このライブラリはプラットフォームに依存せず、Node.jsとブラウザの両方の環境で動作します。

:::note Open Source

SplatTransform は、[MITライセンスの下でGitHubにてオープンソース化されています](https://github.com/playcanvas/splat-transform)。

:::

:::tip ウェブUIが欲しい場合

[SuperSplat Convertページ](/user-manual/supersplat/convert)（[superspl.at/convert](https://superspl.at/convert)）はsplat-transformのウェブフロントエンドです。WebAssembly経由でブラウザ内で同じ変換とトランスフォームを実行します — インストール不要です。単発の変換にはウェブUIを、スクリプト化されたバッチワークフローには下記のCLIを使うのがよいでしょう。

:::

## SplatTransformを使用する理由

SplatTransformは、開発者がGaussian splatsを扱う際に直面する問題を解決します：

🔄 **幅広いフォーマットサポート** — 読み取り：PLY、Compressed PLY、SOG、SPZ、SPLAT、KSPLAT、LCC。書き込み：PLY、Compressed PLY、SOG、SPZ、GLB、CSV、HTMLビューア、LOD、Voxel、WebP画像  
🛠️ **強力な変換機能** — スプラットを正確に平行移動、回転、拡大縮小  
🧹 **スマートフィルタリング** — NaN/Inf の除去、値・ボックス・球・球面調和バンド・フローター寄与によるフィルタリング、シード点周辺の連結クラスタのみを保持  
📐 **デシメーションと並べ替え** — プログレッシブなペアワイズマージによる単純化と、空間局所性のためのMortonコードによる並べ替え  
🧱 **コリジョン生成** — シーンをスパースオクツリーにボクセル化し、ランタイム物理エンジン用の`.collision.glb`メッシュを出力  
🖼️ **画像レンダリング** — 設定可能なカメラビューからシーンをロスレスWebPにレンダリング  
📊 **統計分析** — データ分析やテスト検証のためのカラムごとの統計情報を生成  
📦 **シーンのマージ** — 複数のスプラットファイルを1つのマージされたシーンに結合  
⚙️ **ジェネレーター** — JavaScriptのジェネレータースクリプトでスプラットデータを手続き的に合成  
🆓 **オープンソース** — MITライセンスでGitHubで自由に利用可能

## インストール

最新バージョンをインストールまたは更新します：

```bash
npm install -g @playcanvas/splat-transform
```

ライブラリとして使用する場合は、依存関係としてインストールします：

```bash
npm install @playcanvas/splat-transform
```

CLIのインストールを確認します：

```bash
splat-transform --version
```

Docker でバックエンドとして実行する場合（GPU/Vulkan のセットアップを含む）は、[Docker バックエンド](/user-manual/splat-transform/docker)ガイドを参照してください。

## CLIの使い方

SplatTransform の一般的な構文は次のとおりです：

```bash
splat-transform [GLOBAL] input [ACTIONS] ... output [ACTIONS]
```

**重要なポイント：**

- 入力ファイルが作業セットになり、ACTIONS が順番に適用されます
- 最後のファイルが出力で、その後のアクションは最終結果を変更します
- ファイル出力を破棄するには出力として `null` を使用します（`--summary` と併用すると分析専用の実行に便利）

## サポートされているフォーマット

SplatTransform はファイル拡張子からフォーマットを検出します：

| フォーマット      | 入力 | 出力 | 説明                                                                                                                                              |
| ----------------- | ---- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.ply`            | ✅   | ✅   | 標準PLYフォーマット                                                                                                                               |
| `.sog`            | ✅   | ✅   | バンドル版超圧縮フォーマット（推奨）                                                                                                              |
| `meta.json`       | ✅   | ✅   | 非バンドル版超圧縮フォーマット（`.webp`テクスチャを伴う）。出力ファイル名は**必ず** `meta.json` である必要があります                              |
| `.compressed.ply` | ✅   | ✅   | 圧縮PLYフォーマット（読み取り時に自動検出され展開）                                                                                               |
| `.spz`            | ✅   | ✅   | 圧縮スプラットフォーマット（Niantic フォーマット、v2–4）                                                                                          |
| `.lcc`            | ✅   | ❌   | LCCファイルフォーマット（XGRIDS）                                                                                                                 |
| `.ksplat`         | ✅   | ❌   | 圧縮スプラットフォーマット（mkkellogg フォーマット）                                                                                              |
| `.splat`          | ✅   | ❌   | 圧縮スプラットフォーマット（antimatter15 フォーマット）                                                                                           |
| `.mjs`            | ✅   | ❌   | mjs スクリプトを使用してシーンを生成（Beta）                                                                                                      |
| `.glb`            | ❌   | ✅   | [KHR_gaussian_splatting](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_gaussian_splatting) 拡張機能付きバイナリ glTF |
| `.csv`            | ❌   | ✅   | コンマ区切り値スプレッドシート                                                                                                                    |
| `.html`           | ❌   | ✅   | SOGベースのHTMLビューアアプリ（単一ページまたは非バンドル版）                                                                                     |
| `.voxel.json`     | ❌   | ✅   | コリジョン検出用のスパースボクセルオクツリー。[コリジョンメッシュ](/user-manual/splat-transform/collision)ガイドを参照。出力ファイル名は**必ず** `.voxel.json` である必要があります |
| `lod-meta.json`   | ❌   | ✅   | マルチレベルディテール SOG バンドル（LODごとの`.sog`チャンクを伴う）。出力ファイル名は**必ず** `lod-meta.json` である必要があります               |
| `.webp`           | ❌   | ✅   | GPUラスタライザでカメラビューからレンダリングされたロスレスWebP画像                                                                              |
| `null`            | ❌   | ✅   | 出力を破棄（`--summary` と併用して分析専用の実行に便利）                                                                                          |

## アクション

アクションは指定された順序で実行され、繰り返し使用できます。アクションは任意の入力または出力ファイルの後に配置できます：

```none
-t, --translate        <x,y,z>          Translate Gaussians by (x, y, z)
-r, --rotate           <x,y,z>          Rotate Gaussians by Euler angles (x, y, z), in degrees
-s, --scale            <factor>         Uniformly scale Gaussians by factor
-H, --filter-harmonics <0|1|2|3>        Remove spherical harmonic bands > n
-N, --filter-nan                        Remove Gaussians with NaN values and most Inf values;
                                          retains +Infinity in opacity and -Infinity in scale_*
-B, --filter-box       <x,y,z,X,Y,Z>    Remove Gaussians outside box (min, max corners)
-S, --filter-sphere    <x,y,z,radius>   Remove Gaussians outside sphere (center, radius)
-V, --filter-value     <name,cmp,value> Keep Gaussians where <name> <cmp> <value>
                                          cmp ∈ {lt,lte,gt,gte,eq,neq}
                                          opacity, scale_*, f_dc_* use transformed values
                                          (linear opacity 0-1, linear scale, linear color 0-1).
                                          Append _raw for raw PLY values (e.g. opacity_raw).
-F, --decimate         <n|n%>           Simplify to n Gaussians via progressive pairwise merging.
                                          Use n% to keep a percentage of Gaussians.
-G, --filter-floaters  [size,op,min]    Remove Gaussians not contributing to any solid voxel.
                                          Evaluates each Gaussian at occupied voxel centers.
                                          Default: size=0.05, opacity=0.1, min=0.004 (1/255).
                                          Bare flag (no value) uses all defaults.
-D, --filter-cluster   [res,op,min]     Keep only the connected cluster at --seed-pos.
                                          GPU-voxelizes at coarse resolution (res world units/voxel).
                                          Default: res=1.0, opacity=0.999, min=0.1.
                                          Bare flag (no value) uses all defaults.
-p, --params           <key=val,...>    Pass parameters to .mjs generator script
-l, --lod              <n>              Tag the Gaussians with LOD level n (n >= 0)
-m, --summary                           Print per-column statistics to stdout
-M, --morton-order                      Reorder Gaussians by Morton code (Z-order curve)
```

## 一般オプション

```none
-h, --help                              Show this help and exit
-v, --version                           Show version and exit
-q, --quiet                             Suppress non-error output
    --verbose                           Show debug-level diagnostics
    --mem                               Show memory usage in progress output
    --tty                               Interactive bar rendering (default on a TTY; --no-tty to disable)
-w, --overwrite                         Overwrite output file if it exists
```

## GPUオプション

SOG圧縮および GPU ボクセル化（`--filter-cluster`、`--filter-floaters`、`.voxel.json` 出力）で使用されます。

```none
-L, --list-gpus                         List available GPU adapters and exit
-g, --gpu              <n|cpu>          Device for GPU operations: GPU adapter index | 'cpu'
                                          ('cpu' disables GPU and is incompatible with
                                          GPU-only features like --filter-cluster)
```

## SOG圧縮オプション {#sog-compression-options}

`.sog`、`meta.json`、`lod-meta.json`、または `.html` の出力を書き込む際に適用されます。

```none
-i, --iterations       <n>              Iterations for SH compression (more=better). Default: 10
```

## SPZ出力オプション

`.spz` の出力を書き込む際に適用されます。

```none
    --spz-version      <3|4>            The SPZ format version to write. Default: 4
```

## HTMLビューア出力オプション

`.html` の出力を書き込む際に適用されます。

```none
-E, --viewer-settings  <settings.json>  HTML viewer settings JSON file
-U, --unbundled                         Generate unbundled HTML viewer with separate files
```

:::note

`-E` オプションにデータを渡す方法の詳細については、[SuperSplat Viewer Settings Schema](https://github.com/playcanvas/supersplat-viewer?tab=readme-ov-file#settings-schema) を参照してください。

:::

## LCC入力オプション

`.lcc` ファイルを読み取る際に適用されます。

```none
-O, --lod-select       <n,n,...>        Comma-separated LOD levels to read from LCC input
```

## LOD出力オプション

`lod-meta.json`（マルチLODストリーミングSOGバンドル）を書き込む際に適用されます。

```none
-C, --lod-chunk-count  <n>              Approximate number of Gaussians per LOD chunk in K. Default: 512
-X, --lod-chunk-extent <n>              Approximate size of an LOD chunk in world units (m). Default: 16
```

## ボクセル出力オプション

`.voxel.json`（コリジョン検出用のスパースボクセルオクツリー）を書き込む際に適用されます。各ステップの詳細とチューニングについては、[コリジョンメッシュ](/user-manual/splat-transform/collision)ガイドを参照してください。

```none
    --voxel-params     [size,opacity]   Voxel size and opacity threshold. Default: 0.05,0.1
    --voxel-external-fill [size]        Seal exterior voxels via boundary flood fill (interior scenes).
                                          [size] (world units) is the dilation distance applied
                                          before the flood fill to bridge small wall gaps.
                                          --seed-pos is used to verify the volume is enclosed at
                                          the seed; the fill is skipped if the seed is reachable
                                          from outside.
                                          Default size: 1.6
    --voxel-floor-fill [size]           Fill each column upward from bottom until hitting solid (exterior scenes).
                                          Optional size (world units): only patch XZ areas surrounded by floor
                                          within 2*size; large empty exterior areas are left alone.
                                          Default size: 1.6
    --voxel-carve      [h,r]            Carve navigable space using capsule flood fill from seed.
                                          Default: height=1.6, radius=0.2
    --seed-pos         <x,y,z>          Seed position for voxel fill/carve and --filter-cluster.
                                          Default: 0,0,0
-K, --collision-mesh   [smooth|faces]   Generate collision mesh (.collision.glb). Default: smooth
```

## 画像出力オプション

`.webp`（GPUラスタライザでレンダリングされたロスレスWebP）を書き込む際に適用されます。

```none
    --camera           <x,y,z>          Camera position in world space. Default: 2,1,-2
    --look-at          <x,y,z>          Camera target point. Default: 0,0,0
    --up               <x,y,z>          World up vector. Default: 0,1,0
    --fov              <degrees>        Vertical field of view in degrees. Default: 60
    --resolution       <WxH>            Output resolution, e.g. 1920x1080. Default: 1280x720
    --near             <n>              Near clip distance. Default: 0.2 (matches reference 3DGS)
    --background       <r,g,b[,a]>      Background color in [0,1]. Default: 0,0,0,1
```

## 使用例

### フォーマット変換

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

# スタンドアロンHTMLビューアに変換（バンドル版、単一ファイル）
splat-transform input.ply output.html

# 非バンドル版HTMLビューアに変換（CSS、JS、SOGファイルを分離）
splat-transform -U input.ply output.html

# カスタム設定でHTMLビューアに変換
splat-transform -E settings.json input.ply output.html

# スプレッドシート分析用にCSVをエクスポート
splat-transform scene.ply data.csv
```

### 変換

```bash
# スケールと平行移動
splat-transform bunny.ply -s 0.5 -t 0,0,10 bunny_scaled.ply

# Y軸を中心に90度回転
splat-transform input.ply -r 0,90,0 output.ply

# 複数の変換を連結
splat-transform input.ply -s 2 -t 1,0,0 -r 0,0,45 output.ply
```

### フィルタリング

```bash
# NaN と Inf を含むエントリを削除
splat-transform input.ply --filter-nan output.ply

# 不透明度の値でフィルタリング (不透明度 > 0.5 のスプラットのみを保持)
splat-transform input.ply -V opacity,gt,0.5 output.ply

# 2より高い球面調和バンドを削除
splat-transform input.ply --filter-harmonics 2 output.ply

# プログレッシブなペアワイズマージで 50000 スプラットに単純化
splat-transform input.ply --decimate 50000 output.ply

# 元のスプラット数の 25% に単純化
splat-transform input.ply -F 25% output.ply
```

### シーンのマージ

```bash
# 異なる変換で複数のファイルを結合
splat-transform -w cloudA.ply -r 0,90,0 cloudB.ply -s 2 merged.compressed.ply

# 結合結果に最終的な変換を適用
splat-transform input1.ply input2.ply output.ply -t 0,0,10 -s 0.5
```

### 統計サマリー

データ分析やテスト検証のためにカラムごとの統計情報を生成します：

```bash
# サマリーを出力してから出力ファイルを書き込み
splat-transform input.ply --summary output.ply

# ファイルを書き込まずにサマリーを出力（出力を破棄）
splat-transform input.ply -m null

# 変換前後でサマリーを出力
splat-transform input.ply --summary -s 0.5 --summary output.ply
```

サマリーには、データの各カラムについて min, max, median, mean, stdDev, nanCount, infCount が含まれます。

### ジェネレーター (Beta)

ジェネレータースクリプトは Gaussian splat データを手続き的に合成します。詳細については、GitHubリポジトリの[ジェネレータースクリプトの例](https://github.com/playcanvas/splat-transform/tree/main/generators)を参照してください。

```bash
splat-transform gen-grid.mjs -p width=10,height=10,scale=10,color=0.1 scenes/grid.ply -w
```

### ボクセルパイプライン（コリジョン）

ボクセルフォーマットは、コリジョン検出用のスパースボクセルオクツリー（`.voxel.json` + `.voxel.bin`）を格納します。`-K` を渡すと、ボクセルグリッドから派生した `.collision.glb` メッシュも出力されます。推奨パイプライン：

```bash
splat-transform input.ply \
    --filter-cluster --seed-pos x,y,z \
    [--voxel-external-fill | --voxel-floor-fill] [--voxel-carve] \
    [-K [smooth|faces]] \
    output.voxel.json
```

各オプションのステップバイステップの解説（図付き）および室内/屋外の完全なレシピは、[コリジョンメッシュ](/user-manual/splat-transform/collision)ガイドを参照してください。

### 画像レンダリング

指定したカメラビューからスプラットシーンをロスレスWebP画像にレンダリングします。レンダリングは GPU で実行されます。

```bash
# デフォルトの 1280x720 でレンダリング
splat-transform input.ply view.webp

# カスタムカメラと解像度
splat-transform input.ply view.webp \
    --camera 2,1,-2 --look-at 0,0,0 \
    --fov 50 --resolution 1920x1080

# 透明な背景
splat-transform input.ply view.webp --background 0,0,0,0
```

### SOG圧縮用デバイス選択

SOGフォーマットに圧縮する際、どのデバイス（GPUまたはCPU）で圧縮を行うかを制御できます：

```bash
# 利用可能なGPUアダプタを一覧表示
splat-transform --list-gpus

# WebGPUに自動的に最適なGPUを選択させる（デフォルト動作）
splat-transform input.ply output.sog

# インデックスでGPUアダプタを明示的に選択
splat-transform -g 0 input.ply output.sog  # 最初にリストされたアダプタを使用
splat-transform -g 1 input.ply output.sog  # 2番目にリストされたアダプタを使用

# 代わりにCPUを使用して圧縮（非常に遅いが常に利用可能）
splat-transform -g cpu input.ply output.sog
```

:::note

`-g` が指定されていない場合、WebGPUは自動的に利用可能な最適なGPUを選択します。`-L` を使用して、インデックスと名前を含む利用可能なアダプタを一覧表示できます。アダプタの順序と可用性は、システムとGPUドライバに依存します。特定のアダプタを選択するには `-g <index>` を、CPU計算を強制するには `-g cpu` を使用します。

:::

:::warning

CPU圧縮はGPU圧縮よりも大幅に遅くなる可能性があります（多くの場合5〜10倍遅い）。GPUドライバが利用できないか問題がある場合にのみCPUモードを使用してください。

:::

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

### LOD形式の生成 {#generating-lod-format}

LOD (Level of Detail) 形式は、大きなガウシアンスプラットシーンの効率的なストリーミングとレンダリングを可能にします。このツールは、事前に生成された複数のLODファイルを入力として受け取り、プログレッシブダウンロードのためにオクツリー構造を持つ最適化されたストリーミング形式を生成します。

**注:** このツールはLODレベル自体を作成しません — 段階的にガウシアンが少なくなる複数のLODファイルを提供する必要があります（LOD 0 = 最高詳細、数字が大きいほど詳細度が低い）。

:::warning 出力ファイル名の要件

出力ファイル名がフォーマットを決定します。これらは**任意の名前ではありません**：

- **`lod-meta.json`** — LODストリーミング形式を生成（プログレッシブローディング用のオクツリー構造を持つ複数のSOGチャンク）
- **`meta.json`** — 非バンドル版SOG形式を生成（単一のSOGファイル、ストリーミングなし）

出力ファイル名は正確に `lod-meta.json` または `meta.json` である必要があります。変更できるのはその前のディレクトリパスのみです。例：`output/lod-meta.json`、`my-scene/lod-meta.json`。

:::

```bash
# 複数の入力ファイルからLODストリーミング形式を生成
# 各入力ファイルは異なる詳細レベルを表します（LOD 0は最高品質）
splat-transform \
  lod0.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  lod3.ply -l 3 \
  output/lod-meta.json \
  --filter-nan \
  --filter-harmonics 0

# より良いパフォーマンスのためにカスタムチャンク設定でLODを生成
splat-transform \
  -C 1024 \
  -X 32 \
  lod0.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  output/lod-meta.json \
  --filter-nan

# 非常に大きなシーンの場合、Node.jsのメモリ割り当てを増やす
node --max-old-space-size=32000 node_modules/.bin/splat-transform \
  lod0.ply -l 0 \
  lod1.ply -l 1 \
  lod2.ply -l 2 \
  lod3.ply -l 3 \
  output/lod-meta.json \
  --filter-nan \
  --filter-harmonics 0

# LCCファイルから直接LODストリーミング形式を生成
# (LCCファイルには複数のLODレベルが既に含まれています)
splat-transform scene.lcc output/lod-meta.json
```

**ヒント:**

- `--filter-nan`を使用して、処理前に無効なガウシアンを削除
- 色の詳細がそれほど重要でない場合は、`--filter-harmonics 0`を使用してファイルサイズを削減
- `-C`を使用して、スプラットを含む生成されるSOGファイルの数を制御
- `-X`を使用して各ノードのサイズを制御。非常に大きなシーンの場合は増やして、管理するノードの数が膨大になるのを避ける
- 非常に大きなシーンの場合は、Nodeの`--max-old-space-size`フラグを使用してより多くのメモリを割り当てる

## ヘルプの取得

```bash
# 一般的なヘルプ
splat-transform --help

# バージョン情報を取得
splat-transform --version
```

問題、機能要求、または貢献については、[GitHubリポジトリ](https://github.com/playcanvas/splat-transform)を参照してください。プロジェクトはコミュニティからのバグ報告とプルリクエストを歓迎しています。

## ライブラリの使用

SplatTransformは、Gaussian splatデータの読み取り、処理、書き込みのためのプログラマティックAPIを公開しています。

### 基本的なインポート

```typescript
import {
    readFile,
    writeFile,
    getInputFormat,
    getOutputFormat,
    DataTable,
    processDataTable
} from '@playcanvas/splat-transform';
```

### 主要なエクスポート

| エクスポート          | 説明                                                                       |
| --------------------- | -------------------------------------------------------------------------- |
| `readFile`            | さまざまなフォーマットからスプラットデータを読み取り                       |
| `writeFile`           | さまざまなフォーマットにスプラットデータを書き込み                         |
| `getInputFormat`      | ファイル名から入力フォーマットを検出                                       |
| `getOutputFormat`     | ファイル名から出力フォーマットを検出                                       |
| `DataTable`, `Column` | スプラットデータのコアデータ構造                                           |
| `combine`             | 複数の`DataTable`を1つにマージ                                             |
| `convertToSpace`      | `DataTable` を座標空間間で変換                                             |
| `processDataTable`    | 一連の処理アクションを適用                                                 |
| `computeSummary`      | データの統計サマリーを生成                                                 |
| `sortMortonOrder`     | 空間局所性のためにMortonコードでインデックスをソート                       |
| `sortByVisibility`    | フィルタリング用の可視性スコアでインデックスをソート                       |
| `writeVoxel`          | スパースボクセルオクツリーファイルを書き込み                               |
| `writeImage`          | カメラビューをロスレスWebP画像にレンダリング（GPUが必要）                  |
| `renderSplats`        | 生のRGBAバイトバッファを返す低レベルレンダラー                             |

### ファイルシステム抽象化

ライブラリは最大限の柔軟性のために抽象ファイルシステムインターフェースを使用します：

**読み取り:**

- `UrlReadFileSystem` - URLからの読み取り（ブラウザ/Node.js）
- `MemoryReadFileSystem` - インメモリバッファからの読み取り
- `ZipReadFileSystem` - ZIPアーカイブからの読み取り

**書き込み:**

- `MemoryFileSystem` - インメモリバッファへの書き込み
- `ZipFileSystem` - ZIPアーカイブへの書き込み

### 例: 読み取りと処理

```typescript
import { Vec3 } from 'playcanvas';
import {
    readFile,
    writeFile,
    getInputFormat,
    getOutputFormat,
    processDataTable,
    UrlReadFileSystem,
    MemoryFileSystem
} from '@playcanvas/splat-transform';

// URLからPLYファイルを読み取り
const fileSystem = new UrlReadFileSystem();
const inputFormat = getInputFormat('scene.ply');

const dataTables = await readFile({
    filename: 'https://example.com/scene.ply',
    inputFormat,
    options: { iterations: 10 },
    params: [],
    fileSystem
});

// 変換を適用
const processed = processDataTable(dataTables[0], [
    { kind: 'scale', value: 0.5 },
    { kind: 'translate', value: new Vec3(0, 1, 0) },
    { kind: 'filterNaN' }
]);

// インメモリバッファに書き込み
const memFs = new MemoryFileSystem();
const outputFormat = getOutputFormat('output.ply', {});

await writeFile({
    filename: 'output.ply',
    outputFormat,
    dataTable: processed,
    options: {}
}, memFs);

// 出力データを取得
const outputBuffer = memFs.files.get('output.ply');
```

### 処理アクション

`processDataTable` 関数はアクションの配列を受け取ります：

```typescript
type ProcessAction =
    | { kind: 'translate'; value: Vec3 }
    | { kind: 'rotate'; value: Vec3 }       // 度単位のオイラー角
    | { kind: 'scale'; value: number }
    | { kind: 'filterNaN' }
    | { kind: 'filterByValue'; columnName: string; comparator: Comparator; value: number }
    | { kind: 'filterBands'; value: 0 | 1 | 2 | 3 }
    | { kind: 'filterBox'; min: Vec3; max: Vec3 }
    | { kind: 'filterSphere'; center: Vec3; radius: number }
    | { kind: 'filterFloaters'; voxelResolution?: number; opacityCutoff?: number; minContribution?: number } // GPU
    | { kind: 'filterCluster'; voxelResolution?: number; seed?: Vec3; opacityCutoff?: number; minContribution?: number } // GPU
    | { kind: 'decimate'; count: number | null; percent: number | null }
    | { kind: 'param'; name: string; value: string }
    | { kind: 'lod'; value: number }
    | { kind: 'summary' }
    | { kind: 'mortonOrder' };

type Comparator = 'lt' | 'lte' | 'gt' | 'gte' | 'eq' | 'neq';
```

:::note

`filterFloaters` と `filterCluster` は GPU デバイスが必要です — `processDataTable` の `ProcessOptions` 引数を介して `createDevice` を渡してください。

:::

### カスタムロギング

環境に合わせてロガーを設定します：

```typescript
import { logger } from '@playcanvas/splat-transform';

logger.setLogger({
    log: console.log,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
    progress: (text) => process.stdout.write(text),
    output: console.log
});

logger.setQuiet(true); // エラー以外の出力を抑制
```

---
title: SplatTransform
description: "SplatTransformのCLIとライブラリ：スプラット形式の相互変換、データの変換とフィルタ、シーンのマージ、ストリーミングLODの生成、コリジョン用のボクセル化、画像レンダリングを行います。"
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

🔄 **幅広いフォーマットサポート** — 読み取り：PLY、Compressed PLY、SOG、Streamed SOG、SPZ、SPLAT、KSPLAT、LCC、LCC2。書き込み：PLY、Compressed PLY、SOG、Streamed SOG、SPZ、GLB、CSV、HTMLビューア、Voxel、WebP画像  
🛠️ **強力な変換機能** — スプラットを正確に平行移動、回転、拡大縮小  
🧹 **スマートフィルタリング** — NaN/Inf の除去、値・ボックス・球・球面調和バンド・フローター寄与によるフィルタリング、シード点周辺の連結クラスタのみを保持  
📐 **デシメーションと並べ替え** — 1億以上のガウシアンにスケールするメモリ制限付きのマージベースデシメーションによる単純化と、空間局所性のためのMortonコードによる並べ替え  
🧱 **コリジョン生成** — シーンをスパースオクツリーにボクセル化し、ランタイム物理エンジン用の`.collision.glb`メッシュを出力  
🖼️ **画像レンダリング** — 設定可能なカメラビューからシーンをロスレスWebPにレンダリング（パノラマ、デフォーカス、モーションブラー対応）  
📊 **統計分析** — データ分析、検証、公開ゲーティングのためのカラムごとの統計情報と構造メタデータ（`--stats`、`--info`）  
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

## ガイド

- [Streamed SOGの生成](/user-manual/splat-transform/streamed-sog) — 単一のPLYからマルチLODのStreamed SOGを構築します。
- [LODストリーミング](/user-manual/gaussian-splatting/building/lod-streaming) — Streamed SOG出力をPlayCanvasアプリで読み込み、レンダリングします。
- [コリジョンメッシュ生成](/user-manual/splat-transform/collision) — スプラットシーンからボクセル/コリジョンデータを生成します。
- [Docker バックエンド](/user-manual/splat-transform/docker) — バックエンドでsplat-transformを実行します（GPU/Vulkanのセットアップを含む）。
- [ライブラリの使用](/user-manual/splat-transform/library) — Node.jsまたはブラウザからsplat-transformをプログラムで利用します。完全なTypeDocリファレンスは [api.playcanvas.com/splat-transform](https://api.playcanvas.com/splat-transform/) にあります。

## フォーマット仕様

| フォーマット | 説明 |
| ------ | ----------- |
| [PLY](/user-manual/gaussian-splatting/formats/ply) | ソース、編集、交換用の業界標準の非圧縮フォーマット |
| [SOG](/user-manual/gaussian-splatting/formats/sog) | Web配信用の超圧縮フォーマット（`meta.json` + WebPテクスチャ、バンドル版または非バンドル版） |
| [Streamed SOG](/user-manual/gaussian-splatting/formats/streamed-sog) | 非常に大きなシーンをストリーミングするためのマルチLODチャンク化SOG（`lod-meta.json`） |
| [Voxel](/user-manual/splat-transform/voxel-format) | コリジョン検出用のスパースボクセルオクツリー（`.voxel.json` / `.voxel.bin`） |

## CLIの使い方

SplatTransform の一般的な構文は次のとおりです：

```bash
splat-transform [GLOBAL] input [ACTIONS] ... output [ACTIONS]
```

**重要なポイント：**

- 入力ファイルが作業セットになり、ACTIONS が順番に適用されます
- 最後のファイルが出力で、その後のアクションは最終結果を変更します
- ファイル出力を破棄するには出力として `null` を使用します（`--stats` と併用すると分析専用の実行に便利）

## サポートされているフォーマット

SplatTransform はファイル拡張子からフォーマットを検出します：

| フォーマット      | 入力 | 出力 | 説明                                                                                                                                              |
| ----------------- | ---- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.ply`            | ✅   | ✅   | 標準PLYフォーマット                                                                                                                               |
| `.sog`            | ✅   | ✅   | バンドル版超圧縮フォーマット（推奨）                                                                                                              |
| `meta.json`       | ✅   | ✅   | 非バンドル版超圧縮フォーマット（`.webp`テクスチャを伴う）。出力ファイル名は**必ず** `meta.json` である必要があります                              |
| `lod-meta.json`   | ✅   | ✅   | マルチLOD [Streamed SOG](/user-manual/gaussian-splatting/formats/streamed-sog) バンドル（LODごとの`.sog`チャンクを伴う）。ファイル名は**必ず** `lod-meta.json` である必要があります |
| `.compressed.ply` | ✅   | ✅   | 圧縮PLYフォーマット（読み取り時に自動検出され展開）                                                                                               |
| `.spz`            | ✅   | ✅   | 圧縮スプラットフォーマット（Niantic フォーマット、v2–4）                                                                                          |
| `.lcc`            | ✅   | ❌   | LCCファイルフォーマット（XGRIDS）                                                                                                                 |
| `.lcc2`           | ✅   | ❌   | LCC2ファイルフォーマット（XGRIDS、オクツリー）                                                                                                    |
| `.ksplat`         | ✅   | ❌   | 圧縮スプラットフォーマット（mkkellogg フォーマット）                                                                                              |
| `.splat`          | ✅   | ❌   | 圧縮スプラットフォーマット（antimatter15 フォーマット）                                                                                           |
| `.mjs`            | ✅   | ❌   | mjs スクリプトを使用してシーンを生成（Beta）                                                                                                      |
| `.glb`            | ❌   | ✅   | [KHR_gaussian_splatting](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_gaussian_splatting) 拡張機能付きバイナリ glTF。PlayCanvasエンジンで[直接読み込み可能](/user-manual/gaussian-splatting/formats/glb) |
| `.csv`            | ❌   | ✅   | コンマ区切り値スプレッドシート                                                                                                                    |
| `.html`           | ❌   | ✅   | SOGベースのHTMLビューアアプリ（単一ページまたは非バンドル版）                                                                                     |
| `.voxel.json`     | ❌   | ✅   | コリジョン検出用のスパースボクセルオクツリー。[コリジョンメッシュ](/user-manual/splat-transform/collision)ガイドを参照。出力ファイル名は `.voxel.json` で終わる必要があります（接頭辞は任意、例：`room.voxel.json`） |
| `.webp`           | ❌   | ✅   | GPUラスタライザでカメラビューからレンダリングされたロスレスWebP画像                                                                              |
| `null`            | ❌   | ✅   | 出力を破棄（`--stats` と併用して分析専用の実行に便利）                                                                                            |

## アクション {#actions}

アクションは指定された順序で実行され、繰り返し使用できます。アクションは任意の入力または出力ファイルの後に配置できます：

```none
-t, --translate        <x,y,z>          Translate Gaussians by (x, y, z)
-r, --rotate           <x,y,z>          Rotate Gaussians by Euler angles (x, y, z), in degrees
-s, --scale            <factor>         Uniformly scale Gaussians by factor
-H, --filter-harmonics <0|1|2|3>        Remove spherical harmonic bands > n
-N, --filter-nan                        Remove Gaussians with NaN values, most Inf values, or a
                                          zero-norm (unrenderable) rotation quaternion;
                                          retains +Infinity in opacity and -Infinity in scale_*
-B, --filter-box       <x,y,z,X,Y,Z>    Remove Gaussians outside box (min, max corners)
-S, --filter-sphere    <x,y,z,radius>   Remove Gaussians outside sphere (center, radius)
-V, --filter-value     <name,cmp,value> Keep Gaussians where <name> <cmp> <value>
                                          cmp ∈ {lt,lte,gt,gte,eq,neq}
                                          opacity, scale_*, f_dc_* use transformed values
                                          (linear opacity 0-1, linear scale, linear color 0-1).
                                          Append _raw for raw PLY values (e.g. opacity_raw).
-d, --decimate         <n|n%>           Simplify to n Gaussians via merge-based decimation
                                          Use n% to keep a percentage of Gaussians.
                                          Memory-bounded and streaming: scales to scenes of 100M+
                                          Gaussians. Must be the final action, and the output must
                                          be .ply (write a decimated PLY first, then convert in a
                                          second invocation). Deep targets on huge scenes spill
                                          temporary files to --scratch-dir (default: the output
                                          file's directory).
    --scratch-dir      <path>           Directory for decimation spill files
-F, --filter-floaters  [size,op,min]    Remove Gaussians not contributing to any solid voxel.
                                          Evaluates each Gaussian at occupied voxel centers.
                                          Default: size=0.05, opacity=0.1, min=0.004 (1/255).
                                          Bare flag (no value) uses all defaults.
-C, --filter-cluster   [res,op,min]     Keep only the connected cluster at --seed-pos.
                                          GPU-voxelizes at coarse resolution (res world units/voxel).
                                          Default: res=1.0, opacity=0.999, min=0.1.
                                          Bare flag (no value) uses all defaults.
-p, --params           <key=val,...>    Pass parameters to .mjs generator script
-l, --tag-lod          <n>              Tag the Gaussians with LOD level n (n >= 0, or -1 for environment)
    --stats            [text|json]      Print file info, per-column statistics and the fill/overdraw ratio to stdout. Default: text
    --info             [text|json]      Print structural metadata (format, per-LOD counts, extra columns) to stdout. Default: text
-m, --morton-order                      Reorder Gaussians by Morton code (Z-order curve)
```

## 一般オプション

```none
-h, --help                              Show this help and exit
-v, --version                           Show version and exit
-q, --quiet                             Suppress non-error output
    --verbose                           Show debug-level diagnostics
    --memory                            Show peak memory in progress output
    --tty                               Interactive bar rendering (default on a TTY; --no-tty to disable)
-w, --overwrite                         Overwrite output file if it exists
```

## GPUオプション

SOG圧縮および GPU ボクセル化（`--filter-cluster`、`--filter-floaters`、`.voxel.json` 出力）で使用されます。

```none
    --list-gpus                         List available GPU adapters and exit
-g, --gpu              <n|cpu>          Device for GPU operations: GPU adapter index | 'cpu'
                                          ('cpu' disables GPU and is incompatible with
                                          GPU-only features like --filter-cluster)
```

## SOG圧縮オプション {#sog-compression-options}

`.sog`、`meta.json`、`lod-meta.json`、または `.html` の出力を書き込む際に適用されます。

```none
-i, --sh-iterations    <n>              Iterations for SH compression (more=better). Default: 10
    --max-workers      <n>              Worker threads for SOG encoding (0 = inline/serial). Default: 4
```

## SPZ出力オプション

`.spz` の出力を書き込む際に適用されます。

```none
    --spz-version      <3|4>            The SPZ format version to write. Default: 4
```

## HTMLビューア出力オプション

`.html` の出力を書き込む際に適用されます。

```none
    --viewer-settings  <settings.json>  HTML viewer settings JSON file
    --unbundled                         Generate unbundled HTML viewer with separate files
```

:::note

`--viewer-settings` オプションにデータを渡す方法の詳細については、[SuperSplat Viewer Settings Schema](https://github.com/playcanvas/supersplat-viewer?tab=readme-ov-file#settings-schema) を参照してください。

:::

## LOD入力オプション

`lod-meta.json`、`.lcc`、`.lcc2` ファイルを読み取る際に適用されます。

```none
-L, --select-lod       <n,n,...>        Comma-separated LOD levels to read from streamed SOG / LCC / LCC2 input
```

## LOD出力オプション

`lod-meta.json`（[Streamed SOG](/user-manual/gaussian-splatting/formats/streamed-sog)出力）を書き込む際に適用されます。

```none
    --lod-chunk-count  <n>              Approximate number of Gaussians per LOD chunk in K. Default: 512
    --lod-chunk-extent <n>              Approximate size of an LOD chunk in world units (m). Default: 16
```

エンドツーエンドの手順については、[Streamed SOGの生成](/user-manual/splat-transform/streamed-sog)を参照してください。

## ボクセル出力オプション

`.voxel.json`（コリジョン検出用のスパースボクセルオクツリー）を書き込む際に適用されます。各ステップの詳細とチューニングについては、[コリジョンメッシュ](/user-manual/splat-transform/collision)ガイドを参照してください。

```none
    --voxel-size       <n>              Voxel size for .voxel.json. Default: 0.05
    --voxel-opacity    <n>              Voxel opacity threshold for .voxel.json. Default: 0.1
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
    --collision-mesh   [smooth|faces]   Generate collision mesh (.collision.glb). Default: smooth
```

## 画像出力オプション

`.webp`（GPUラスタライザでレンダリングされたロスレスWebP）を書き込む際に適用されます。

```none
    --projection       <pinhole|equirect>  Camera projection. Default: pinhole.
                                        equirect = 360°×180° panorama from --camera-pos; --camera-fov must be
                                        omitted; --resolution must be 2:1 (default 2048x1024).
    --camera-pos       <x,y,z>          Camera position in world space. Default: 2,1,-2
    --camera-target    <x,y,z>          Camera target point. Default: 0,0,0
    --camera-up        <x,y,z>          World up vector. Default: 0,1,0
    --camera-fov       <degrees>        Vertical field of view in degrees. Default: 60. Rejected with --projection equirect.
    --resolution       <WxH>            Output resolution, e.g. 1920x1080. Default: 1280x720 (pinhole) or 2048x1024 (equirect)
    --camera-near      <n>              Near clip distance. Default: 0.2 (matches reference 3DGS)
    --background       <r,g,b[,a]>      Background color in [0,1]. Default: 0,0,0,1
    --f-stop           <N>              Aperture as a photographic f-stop (e.g. 2.8, 5.6, 11). Enables defocus blur;
                                        smaller = more blur. Pinhole only. Default: disabled (no defocus).
    --focus-distance   <n>              Camera-space Z of the focus plane (world units). Default: distance to --camera-target.
                                        Pinhole only; only meaningful with --f-stop.
    --sensor-size      <n>              Vertical sensor height in world units. Gives --f-stop a physical meaning.
                                        Default: 0.024 (35mm full-frame, world units = meters). Scale to your world:
                                        world unit = decimeter → 0.24, world unit = millimeter → 24.
    --camera-pos-end   <x,y,z>          End camera position. When set, enables camera motion blur: the renderer
                                        averages sub-frames with the camera interpolated from --camera-pos (shutter open)
                                        to --camera-pos-end (shutter close). Default: disabled (no motion blur).
    --camera-target-end <x,y,z>         End camera target. Default: same as --camera-target. Only with --camera-pos-end.
    --camera-up-end    <x,y,z>          End up vector. Default: same as --camera-up. Only with --camera-pos-end.
    --shutter          <0..1>           Fraction of the start→end segment integrated, centered on the midpoint
                                        (1.0 = full motion; 0.5 = 180° shutter). Default: 1. Only with --camera-pos-end.
    --motion-samples   <n>              Sub-frames to accumulate for motion blur. Cost is N× a single render.
                                        Default: 16. Only with --camera-pos-end.
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
splat-transform --unbundled input.ply output.html

# カスタム設定でHTMLビューアに変換
splat-transform --viewer-settings settings.json input.ply output.html

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

# マージベースのデシメーションで 50000 スプラットに単純化
splat-transform input.ply --decimate 50000 output.ply

# 元のスプラット数の 25% に単純化
splat-transform input.ply -d 25% output.ply
```

### シーンのマージ

```bash
# 異なる変換で複数のファイルを結合
splat-transform -w cloudA.ply -r 0,90,0 cloudB.ply -s 2 merged.compressed.ply

# 結合結果に最終的な変換を適用
splat-transform input1.ply input2.ply output.ply -t 0,0,10 -s 0.5
```

### 統計情報

データ分析やテスト検証のためにカラムごとの統計情報を生成します：

```bash
# 統計情報を出力してから出力ファイルを書き込み
splat-transform input.ply --stats output.ply

# ファイルを書き込まずに統計情報を出力（出力を破棄）
splat-transform input.ply --stats null

# スクリプト処理用にJSONとして統計情報を出力
splat-transform input.ply --stats json null

# 変換前後で統計情報を出力
splat-transform input.ply --stats -s 0.5 --stats output.ply
```

出力はファイル情報ブロック（`gaussian` 判定を含む — スプラットデータではない読み取り可能なコンテナ、例えば通常のポイントクラウドPLYの場合は `false`）から始まり、続いて各カラムの min、max、median、mean、stdDev、nanCount、infCount とヒストグラムが、LODごとに1つのテーブルとして出力されます。各LODは `fillRatio` も報告します。これはシーンの頑健な（p1–p99）断面積に対するスプラットの合計フットプリント面積で、おおよそ平均オーバードローレイヤー数に相当します。健全なシーンは1〜数百程度のスコアになりますが、フィルでGPUを圧倒するような退化した、または悪意のあるシーンは桁違いに高いスコアになるため、この値は自動的な公開ゲーティングに適しています。スケールが `+Infinity` の場合は比率が無限大になり、JSONでは `null` としてシリアライズされます — これは不合格として扱ってください。JSON形式は同じ情報フィールドに加えて、LODごとのカラム型 `stats` 配列を含みます。統計は単一のストリーミングパスで計算されます。median は1024ビンのヒストグラムから近似され（誤差はカラムの範囲の約1/1000以内）、その他のフィールドはすべて正確な値です。

### ジェネレーター (Beta)

ジェネレータースクリプトは Gaussian splat データを手続き的に合成します。詳細については、GitHubリポジトリの[ジェネレータースクリプトの例](https://github.com/playcanvas/splat-transform/tree/main/generators)を参照してください。

```bash
splat-transform gen-grid.mjs -p width=10,height=10,scale=10,color=0.1 scenes/grid.ply -w
```

### ボクセルパイプライン（コリジョン）

ボクセルフォーマットは、コリジョン検出用のスパースボクセルオクツリー（`.voxel.json` + `.voxel.bin`）を格納します。`--collision-mesh` を渡すと、ボクセルグリッドから派生した `.collision.glb` メッシュも出力されます。推奨パイプライン：

```bash
splat-transform input.ply \
    --filter-cluster --seed-pos x,y,z \
    [--voxel-external-fill | --voxel-floor-fill] [--voxel-carve] \
    [--collision-mesh [smooth|faces]] \
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
    --camera-pos 2,1,-2 --camera-target 0,0,0 \
    --camera-fov 50 --resolution 1920x1080

# 透明な背景
splat-transform input.ply view.webp --background 0,0,0,0

# デフォーカスブラー（--camera-target に焦点、f/2.8 の絞り）
splat-transform input.ply view.webp --f-stop 2.8

# 明示的な焦点距離と、より小さいワールドスケールでのデフォーカス
splat-transform input.ply view.webp \
    --f-stop 2.8 --focus-distance 3 --sensor-size 0.1

# カメラ位置からの360°正距円筒図法パノラマ
splat-transform input.ply pano.webp \
    --projection equirect --camera-pos 0,1,0 --camera-target 0,1,1

# カメラモーションブラー（シャッター中に開始ポーズから終了ポーズへドリー移動）
splat-transform input.ply view.webp \
    --camera-pos 2,1,-2 --camera-pos-end 3,1,-2 \
    --motion-samples 16 --shutter 1
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

`-g` が指定されていない場合、WebGPUは自動的に利用可能な最適なGPUを選択します。`--list-gpus` を使用して、インデックスと名前を含む利用可能なアダプタを一覧表示できます。アダプタの順序と可用性は、システムとGPUドライバに依存します。特定のアダプタを選択するには `-g <index>` を、CPU計算を強制するには `-g cpu` を使用します。

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

### Streamed SOGの生成 {#generating-lod-format}

[Streamed SOG](/user-manual/gaussian-splatting/formats/streamed-sog)形式は、非常に大きなシーンをプログレッシブに読み込むために、シーンの複数のLODレベルを空間チャンクにパッケージ化します。完全な手順 — `--tag-lod` による入力のタグ付け、`--decimate` によるLODレベルの生成、チャンク設定のチューニング、Streamed SOGの読み戻し — は専用ページにあります：

**[Streamed SOGの生成 →](/user-manual/splat-transform/streamed-sog)**

## ヘルプの取得

```bash
# 一般的なヘルプ
splat-transform --help

# バージョン情報を取得
splat-transform --version
```

問題、機能要求、または貢献については、[GitHubリポジトリ](https://github.com/playcanvas/splat-transform)を参照してください。プロジェクトはコミュニティからのバグ報告とプルリクエストを歓迎しています。

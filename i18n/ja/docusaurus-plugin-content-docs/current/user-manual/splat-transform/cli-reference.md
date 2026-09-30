---
title: CLIリファレンス
description: "splat-transformのすべてのコマンドラインオプション：コマンド構文、サポートされているフォーマット、アクション、フォーマットごとのオプション、GPUが必要な機能。"
toc_max_heading_level: 4
---

このページでは、[SplatTransform](/user-manual/splat-transform/) のすべてのコマンドラインオプションを、`splat-transform --help` の表示と同じグループ分けで掲載しています。実際の使用例については、[概要](/user-manual/splat-transform/#examples)と各タスクのガイド（[Streamed SOGの生成](/user-manual/splat-transform/streamed-sog)、[コリジョンメッシュ生成](/user-manual/splat-transform/collision)、[画像のレンダリング](/user-manual/splat-transform/image-rendering)）を参照してください。

## コマンド構文 {#command-syntax}

```bash
splat-transform [GLOBAL] input [ACTIONS] ... output [ACTIONS]
```

- 入力ファイルが作業セットになり、ACTIONS が順番に適用されます
- 最後のファイルが出力で、その後のアクションは最終結果を変更します
- ファイル出力を破棄するには出力として `null` を使用します（`--stats` と併用すると分析専用の実行に便利）
- 入力ファイル名には `http(s)://` URLも指定でき、必要に応じてダウンロードされます（`.mjs` ジェネレーターはローカルファイルである必要があります）

## サポートされているフォーマット {#supported-formats}

SplatTransform はファイル拡張子からフォーマットを検出します：

| フォーマット      | 入力 | 出力 | 説明                                                                                                                                              |
| ----------------- | ---- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.ply`            | ✅   | ✅   | 標準[PLY](/user-manual/gaussian-splatting/formats/ply)フォーマット                                                                                |
| `.sog`            | ✅   | ✅   | バンドル版超圧縮[SOG](/user-manual/gaussian-splatting/formats/sog)フォーマット（推奨）                                                            |
| `meta.json`       | ✅   | ✅   | 非バンドル版超圧縮フォーマット（`.webp`テクスチャを伴う）。出力ファイル名は**必ず** `meta.json` である必要があります                              |
| `lod-meta.json`   | ✅   | ✅   | マルチLOD [Streamed SOG](/user-manual/gaussian-splatting/formats/streamed-sog) バンドル（LODごとの`.sog`チャンクを伴う）。ファイル名は**必ず** `lod-meta.json` である必要があります |
| `.compressed.ply` | ✅   | ✅   | 圧縮PLYフォーマット（読み取り時に自動検出され展開）                                                                                               |
| `.spz`            | ✅   | ✅   | 圧縮[SPZ](/user-manual/gaussian-splatting/formats/spz)スプラットフォーマット（Niantic フォーマット、v2–4）                                        |
| `.lcc`            | ✅   | ❌   | LCCファイルフォーマット（XGRIDS）                                                                                                                 |
| `.lcc2`           | ✅   | ❌   | LCC2ファイルフォーマット（XGRIDS、オクツリー）                                                                                                    |
| `.ksplat`         | ✅   | ❌   | 圧縮スプラットフォーマット（mkkellogg フォーマット）                                                                                              |
| `.splat`          | ✅   | ❌   | 圧縮スプラットフォーマット（antimatter15 フォーマット）                                                                                           |
| `.mjs`            | ✅   | ❌   | mjs スクリプトを使用してシーンを生成（Beta）                                                                                                      |
| `.glb`            | ❌   | ✅   | [KHR_gaussian_splatting](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_gaussian_splatting) 拡張機能付きバイナリ glTF。PlayCanvasエンジンで[直接読み込み可能](/user-manual/gaussian-splatting/formats/glb) |
| `.csv`            | ❌   | ✅   | コンマ区切り値スプレッドシート                                                                                                                    |
| `.html`           | ❌   | ✅   | SOGベースのHTMLビューアアプリ（単一ページまたは非バンドル版）                                                                                     |
| `.voxel.json`     | ❌   | ✅   | コリジョン検出用の[スパースボクセルオクツリー](/user-manual/splat-transform/voxel-format)。[コリジョンメッシュ](/user-manual/splat-transform/collision)ガイドを参照。出力ファイル名は `.voxel.json` で終わる必要があります（接頭辞は任意、例：`room.voxel.json`） |
| `.webp`           | ❌   | ✅   | GPUラスタライザでカメラビューからレンダリングされたロスレスWebP画像。[画像のレンダリング](/user-manual/splat-transform/image-rendering)ガイドを参照 |
| `null`            | ❌   | ✅   | 出力を破棄（`--stats` と併用して分析専用の実行に便利）                                                                                            |

### アンチエイリアスおよび2DGSシーン {#antialiased-and-2dgs-scenes}

アンチエイリアス（mip-splatting方式のスクリーンスペースフィルタ）付きで学習されたシーンや、2Dガウシアンサーフェル（2DGS）として学習されたシーンは読み取り時にタグ付けされ、出力フォーマットが保持できる場合はそのタグが維持されます。`--info` はこれを `model` として報告します。

- **読み取り時**：PLYヘッダーコメント（Brushの `comment SplatRenderMode: default | mip | 2dgs` またはPostshotの `comment antialiased 0 | 1`。複数ある場合は最後のものが優先）、SPZのアンチエイリアスヘッダービット、またはSOG `meta.json` の `model` エントリから読み取ります。`scale_0` と `scale_1` はあるが `scale_2` がないPLYは、コメントに関係なく2DGSとして読み取られ、欠けているカラムは厚さゼロのスケールで補われるため、パイプラインの残りの部分には影響しません。
- **書き込み時**：`.ply` と `.compressed.ply` には `comment SplatRenderMode: mip | 2dgs`（読み取った形式にかかわらずBrushの表記）が、`.sog` と `meta.json` には `"model": "antialiased" | "2dgs"` が書き込まれます。`.spz` はアンチエイリアスビットを設定し、2DGSを表現できないことを警告します。2DGSのPLY出力では `scale_2` カラムが再び削除されます。その他の出力フォーマットにはタグを記録する場所がないため、タグは警告なしに破棄されます。
- **マージ時**：タグが一致しない入力を結合すると警告が出され、結果はタグなしで書き込まれます。

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
-d, --decimate         <n|n%>           Simplify to n Gaussians via merge-based decimation,
                                          removing at a uniform rate everywhere.
                                          Use n% to keep a percentage of Gaussians.
                                          Lower memory, and better at depth on uniformly-sized
                                          Gaussians: uniform texture, single objects, snow.
    --decimate-adaptive <n|n%>          Simplify, allocating removal by local error instead.
                                          Much better on mixed-scale content such as skies,
                                          at higher memory cost.
                                          Both are memory-bounded and streaming: they scale to
                                          scenes of 100M+ Gaussians. Either must be the final
                                          action, and the output must be .ply (write a decimated
                                          PLY first, then convert in a second invocation).
    --scratch-dir      <path>           Directory for intermediate levels when a deep decimation
                                          target exceeds memory. Nothing is written without it.
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

## CLIオプション {#cli-options}

これらのオプションはスプラットデータを操作するのではなく、実行全体を設定します。ほとんどのグループは、特定のフォーマットを読み書きする場合にのみ適用されます。

### 一般オプション {#general-options}

```none
-h, --help                              Show this help and exit
-v, --version                           Show version and exit
-q, --quiet                             Suppress non-error output
    --verbose                           Show debug-level diagnostics
    --memory                            Show peak memory in progress output
    --tty                               Interactive bar rendering (default on a TTY; --no-tty to disable)
-w, --overwrite                         Overwrite output file if it exists
    --webp-effort      <0-9>            Lossless WebP compression effort for image, SOG, HTML and LOD output.
                                          Higher tries harder to reduce size. Default: libwebp's default
                                          lossless settings.
```

### GPUオプション {#gpu-options}

GPU処理に使用するデバイスを選択します。GPU上で実行される処理については、下記の[GPUが必要な機能](#which-features-need-a-gpu)を参照してください。

```none
    --list-gpus                         List available GPU adapters and exit
-g, --gpu              <n|cpu>          Device for GPU operations: GPU adapter index | 'cpu'
                                          ('cpu' disables GPU and is incompatible with
                                          GPU-only features like --filter-cluster)
    --gpu-backend      <name>           Force the WebGPU backend: vulkan | d3d12 | metal.
                                          Default: the platform default (e.g. vulkan works around
                                          Dawn D3D12 bugs on Windows)
```

#### GPUが必要な機能 {#which-features-need-a-gpu}

GPU処理はすべてWebGPUを経由します。次の機能はGPUなしでは実行できません：

- `--filter-cluster` と `--filter-floaters`。
- `.voxel.json` 出力と `--collision-mesh`。
- `--camera-track` のフレームシーケンスを含む `.webp` 画像出力。

次の機能はデフォルトでGPUを使用しますが、`-g cpu` を指定するとCPUでも実行できます：

- `--decimate` と `--decimate-adaptive`。
- SOG出力（`.sog`、`meta.json`、`lod-meta.json`、`.html`）。GPUを使用するのは球面調和係数のk-meansクラスタリングのステップだけなので、SHバンドを持たない入力（例えば `.splat` ファイルや、`--filter-harmonics 0` を経由したもの）は完全にCPUで書き込まれます。SHバンドを持つ入力も `-g cpu` で動作しますが、SHクラスタリングはGPUなしでは多くの場合5〜10倍遅くなります。

#### デバイスの選択 {#selecting-a-device}

```bash
# 利用可能なGPUアダプタを一覧表示
splat-transform --list-gpus

# WebGPUに自動的に最適なGPUを選択させる（デフォルト動作）
splat-transform input.ply output.sog

# インデックスでGPUアダプタを明示的に選択
splat-transform -g 0 input.ply output.sog  # 最初にリストされたアダプタを使用
splat-transform -g 1 input.ply output.sog  # 2番目にリストされたアダプタを使用

# 代わりにCPUを使用（SH圧縮は非常に遅くなるが常に利用可能）
splat-transform -g cpu input.ply output.sog

# Vulkanバックエンドを強制（例：WindowsでのDawn D3D12のバグを回避）
splat-transform --gpu-backend vulkan input.ply output.sog
```

`-g` が指定されていない場合、WebGPUは自動的に利用可能な最適なGPUを選択します。`--list-gpus` を使用して、インデックスと名前を含む利用可能なアダプタを一覧表示できます。アダプタの順序と可用性は、システムとGPUドライバに依存します。`--gpu-backend` は `--list-gpus` にも適用され、その場合はそのバックエンドのアダプタのみが一覧表示されます。

NVIDIA GPUを搭載したサーバーでsplat-transformを実行する方法については、[Docker バックエンド](/user-manual/splat-transform/docker)ガイドを参照してください。

### SOG圧縮オプション {#sog-compression-options}

`.sog`、`meta.json`、`lod-meta.json`、または `.html` の出力を書き込む際に適用されます。

```none
-i, --sh-iterations    <n>              Iterations for SH compression (more=better). Default: 10
    --max-workers      <n>              Worker threads for SOG and image-sequence encoding (0 = inline/serial). Default: 4
```

### SPZ出力オプション {#spz-output-options}

`.spz` の出力を書き込む際に適用されます。

```none
    --spz-version      <3|4>            The SPZ format version to write. Default: 4
```

### HTMLビューア出力オプション {#html-viewer-output-options}

`.html` の出力を書き込む際に適用されます。

```none
    --viewer-settings  <settings.json>  HTML viewer settings JSON file
    --unbundled                         Generate unbundled HTML viewer with separate files
```

:::note

`--viewer-settings` オプションにデータを渡す方法の詳細については、[SuperSplat Viewer Settings Schema](https://github.com/playcanvas/supersplat-viewer?tab=readme-ov-file#settings-schema) を参照してください。設定はページを書き込む前に検証されるため、無効なファイルを指定すると、何も表示されないビューアを生成する代わりに実行が失敗します。

:::

### LOD入力オプション {#lod-input-options}

`lod-meta.json`、`.lcc`、`.lcc2` ファイルを読み取る際に適用されます。

```none
-L, --select-lod       <n,n,...>        Comma-separated LOD levels to read from streamed SOG / LCC / LCC2 input
```

### LOD出力オプション {#lod-output-options}

`lod-meta.json`（[Streamed SOG](/user-manual/gaussian-splatting/formats/streamed-sog)出力）を書き込む際に適用されます。

```none
    --lod-chunk-count  <n>              Approximate number of Gaussians per LOD chunk in K. Default: 512
    --lod-chunk-extent <n>              Approximate size of an LOD chunk in world units (m). Default: 16
    --lod-chunk-min    <n>              Gaussians in K below which a chunk is not split for extent. Default: 8
```

チャンクは、`--lod-chunk-count` を超えるガウシアンを含む場合、または `--lod-chunk-extent` より広く、かつ `--lod-chunk-min` を超えるガウシアンを含む場合に分割されます。この最小値により、空や遠景などの疎な領域が何千もの空に近いチャンクに分割されるのを防ぎます。最小値を下回る領域は、どれほど広くても1つのチャンクのままです。密な領域には影響しません。

エンドツーエンドの手順については、[Streamed SOGの生成](/user-manual/splat-transform/streamed-sog)を参照してください。

### ボクセル出力オプション {#voxel-output-options}

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

### 画像出力オプション {#image-output-options}

`.webp`（GPUラスタライザでレンダリングされたロスレスWebP）を書き込む際に適用されます。各効果の使用例については、[画像のレンダリング](/user-manual/splat-transform/image-rendering)ガイドを参照してください。

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
    --dof-samples      <n>              Aperture samples per instant with --f-stop. Default: 32. More samples reduce
                                        sampling artifacts at greater cost; multiplies --motion-samples when combined.
    --sensor-size      <n>              Vertical sensor height in world units. Gives --f-stop a physical meaning.
                                        Default: 0.024 (35mm full-frame, world units = meters). Scale to your world:
                                        world unit = decimeter → 0.24, world unit = millimeter → 24.
    --camera-pos-end   <x,y,z>          End camera position. When set, enables camera motion blur: the camera moves
                                        from --camera-pos (shutter open) to --camera-pos-end (shutter close) and the
                                        frame averages renders at instants across the shutter. Default: disabled.
    --camera-target-end <x,y,z>         End camera target. Default: same as --camera-target. Only with --camera-pos-end.
    --camera-up-end    <x,y,z>          End up vector. Default: same as --camera-up. Only with --camera-pos-end.
    --shutter          <0..1>           Fraction of the start→end segment averaged, centered on its midpoint. Default: 0.5.
                                        With --camera-track, fraction of the frame interval averaged around each frame.
                                        Default for tracks: off. 1.0 = full interval; 0.5 = 180° shutter.
    --motion-samples   <n>              Renders averaged per motion-blurred frame, at evenly spaced instants across
                                        the shutter. Cost is N× a single render; too few show as discrete copies
                                        where the motion between instants exceeds a couple of pixels. Default: 16.
    --camera-track     <path>           Render a camera animation as a frame sequence: a SuperSplat editor project
                                        (.ssproj directory or its document.json), a viewer settings.json with
                                        animTracks, or a JSON { frameRate, frames: [{ position, target, fov, up }] }.
                                        Frames are written as <name>.NNNN.webp. Replaces --camera-pos/--camera-target;
                                        the track's target is the defocus focus point. A frame's up vector tilts the
                                        camera; frames without one use --camera-up. With --shutter, each frame is
                                        motion-blurred over that fraction of the frame interval.
    --frames           <a[-b]>          Inclusive frame range of the track to render. Default: all frames.
```

## 関連項目 {#see-also}

- [Splat ファイル形式](/user-manual/gaussian-splatting/formats/) — PLY、SOG、Streamed SOG、GLB、SPZ フォーマットの仕様。
- [ボクセルフォーマット](/user-manual/splat-transform/voxel-format) — `.voxel.json` / `.voxel.bin` 出力の仕様。
- [ライブラリの使用](/user-manual/splat-transform/library) — 同じ操作をJavaScriptから実行します。

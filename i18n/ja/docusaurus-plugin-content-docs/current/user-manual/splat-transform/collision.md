---
title: コリジョンメッシュ生成
description: "splat-transform で Gaussian splat からスパースボクセルオクツリーとコリジョンメッシュを生成します。"
---

このガイドでは、[splat-transform](/user-manual/splat-transform/) を使用して Gaussian splat シーンからコリジョンデータを生成する方法を説明します。**ボクセル生成**（スパースボクセルオクツリー、`.voxel.json` + `.voxel.bin`）と、ランタイムコリジョン検出に適した**メッシュ生成**（`.collision.glb`）の両方をカバーします。

CLI ではなく SuperSplat の Web UI を介してボクセルコリジョンをアップロードまたは生成する方法については、[Studio → コリジョン](/user-manual/supersplat/studio/collision) を参照してください。

## 概要

同じボクセル化パスから2つの出力が生成されます：

- **`.voxel.json` / `.voxel.bin`** — レイキャストおよびブロードフェーズのコリジョンクエリ用のスパースボクセルオクツリー (SVO)。これはランタイムコリジョン検出のために [SuperSplat ビューア](/user-manual/supersplat/viewer/) で使用されるフォーマットです。ディスク上の構造は[ボクセルフォーマット](/user-manual/splat-transform/voxel-format)仕様で規定されています。
- **`.collision.glb`** — ボクセルグリッドから構築された三角形メッシュ（`--collision-mesh` を渡した場合のみ）。

典型的なパイプラインは4つのステージで構成され、後者の2つはシーンタイプに応じて任意です：

```none
input splat ──► filter-cluster ──► voxelize ──► fill ──► carve ──► [collision mesh]
```

## ステップ 1: `--filter-cluster` でシーンを分離

スプラットには、関心のあるシーンから離れた場所にある散在するフローターや切り離されたジオメトリが含まれていることがよくあります。`--filter-cluster` は粗い解像度で入力を GPU ボクセル化し、`--seed-pos` を含む連結成分のみを保持します。

```bash
splat-transform input.ply --filter-cluster --seed-pos 0,1,0 output.voxel.json
```

| 入力 | クラスタフィルタ結果 |
| --- | --- |
| ![original](/img/user-manual/splat-transform/input.webp) | ![filtered](/img/user-manual/splat-transform/filter-cluster.webp) |

:::tip 単独での使用

`--filter-cluster` は汎用フィルタであり、ボクセル出力なしでシーンの注目領域だけを抽出するためにそれ自体で使用できます。`.ply` や `.sog` などのスプラットフォーマットに直接パイプできます：

```bash
splat-transform input.ply --filter-cluster --seed-pos 0,1,0 cluster.ply
```

:::

### クラスタオプション

```none
-C, --filter-cluster [res,op,min]
```

| パラメータ | デフォルト | 説明 |
| --- | --- | --- |
| `res` | `1.0` | 粗いクラスタリンググリッドのボクセルサイズ（ワールド単位）。大きい = 高速、ギャップに寛容。 |
| `op` | `0.999` | ボクセルが固体と見なされる不透明度のしきい値。 |
| `min` | `0.1` | スプラットを保持するためにクラスタボクセル中心で必要なガウシアンの最小寄与。 |

## ステップ 2: ボクセル化

ボクセル化は出力ファイル名の拡張子によって暗黙的に有効になります：出力パスが `.voxel.json` で終わると、splat-transform はシーンをスパースボクセルグリッドにボクセル化します。これは「生の」ボクセル出力 — このガイドの後続のすべてのステップはこれの上に重ねられます。

```bash
splat-transform input.ply output.voxel.json
```

![voxelized-raw: bare voxel grid produced by the voxelization pass](/img/user-manual/splat-transform/voxels.webp)

### ボクセルオプション

```none
--voxel-size <n>
--voxel-opacity <n>
```

| フラグ | デフォルト | 説明 |
| --- | --- | --- |
| `--voxel-size` | `0.05` | ワールド単位のボクセルエッジ長。小さい = 高忠実度、ファイルが大きい、フィルが遅い。 |
| `--voxel-opacity` | `0.1` | ボクセルを固体としてマークするために必要な最小スプラット不透明度。 |

## ステップ 3: シェルの密閉

ボクセル化後、表面は通常、穴のある薄いシェルです。フィルはそれらの穴を閉じて、次のステップ（カービング）がフラッドできる水密ボリュームを得ます。2つの補完的なオプションが利用可能です — 1つは室内/密閉シーン用、もう1つは屋外/地面のあるシーン用です。これらは通常組み合わせて使用しません。

### 部屋 — `--voxel-external-fill`

部屋のスキャン用で、カービングがフラッドできる閉じた内部ボリュームが必要な場合。（フラグ名は内部で何をするかを反映しています：*外部*の空隙をフラッドフィルし、*内部*をカービング可能領域として残します。）このパスは：

1. 壁の小さな穴を埋めるために、固体グリッドを `[size]` ワールド単位（内部的にボクセルの半幅に変換）で膨張させます。
2. 境界ボックス境界から内側に向かって空の空間をフラッドフィルします — 外側から到達可能なすべてのボクセルは外部としてマークされます。
3. 外部領域を出力で固体としてマークし、囲まれた内部のみをカービング用の空の空間として残します。

`--seed-pos` はサニティチェックとして使用されます：シードが外部から到達可能になる（つまり、ボリュームが実際にシードで囲まれていない）場合、フィルはスキップされ、元のグリッドが返されます。

```bash
splat-transform input.ply output.voxel.json --voxel-external-fill --seed-pos 0,1,0
```

<!-- TODO: media — external-fill の前後の断面図（upstream の guides/images/external-fill.png が欠落しています）。 -->

```none
--voxel-external-fill [size]
```

| パラメータ | デフォルト | 説明 |
| --- | --- | --- |
| `size` | `1.6` | 外部をフラッドフィルする前に小さな壁の隙間を密閉するために使用される膨張距離（ワールド単位）。フィルが漏れるノイズのある穴が壁にある場合は増やします。 |

### 屋外シーン — `--voxel-floor-fill`

屋外のスキャン、地形、または地面のあるオブジェクト用。このパスは、境界ボックスの下から各 XZ カラムを上方向に歩き、固体ボクセルに当たるまで、その下のすべてを固体としてマークします。これにより、スキャンが表面のみを捉えていた場合でも、地面ボリュームが生成されます。

```bash
splat-transform input.ply output.voxel.json --voxel-floor-fill
```

![floor-fill: cross-section of terrain before/after, showing solid mass below the surface](/img/user-manual/splat-transform/filled.webp)

```none
--voxel-floor-fill [size]
```

| パラメータ | デフォルト | 説明 |
| --- | --- | --- |
| `size` | `1.6` | パッチング対象を、半径 `2*size` 内が床で囲まれている XZ カラムに制限します。大きな空の外部領域はそのまま残されるため、誤って空をフィルすることはありません。 |

### 選択

| シーンタイプ           | フィル                  |
| ---------------------- | ----------------------- |
| 部屋                   | `--voxel-external-fill` |
| 屋外シーン             | `--voxel-floor-fill`    |
| 空間内の単一オブジェクト | （両方スキップ）        |

## ステップ 4: ナビゲート可能な空間のカービング（`--voxel-carve`）

`--seed-pos` からカプセルボリュームをフラッドフィルし、カプセルが到達できるボクセルを*ナビゲート可能*としてマークします。シェルが密閉された後（ステップ 3）、カービングはランタイムで使用される実際の歩行可能領域を生成します。カービングは不要な詳細を削除し、よりスムーズなランタイムコリジョンとより小さなファイルになります。

```bash
splat-transform input.ply output.voxel.json --voxel-carve --seed-pos 0,1,0
```

| 元 | カービング後 |
| --- | --- |
| ![original](/img/user-manual/splat-transform/voxels.webp) | ![carved](/img/user-manual/splat-transform/carved.webp) |

カプセルはシード位置にフィットしなければなりません。カービングで何も出力されない場合、シードが固体ジオメトリの中にあるか、カプセルが大きすぎてフィットしない可能性があります。

### カービングオプション

```none
--voxel-carve [h,r]
```

| パラメータ | デフォルト | 説明 |
| --- | --- | --- |
| `h` | `1.6` | カプセルの高さ（ワールド単位）、おおよそエージェントの高さ。`0` でカービング無効。 |
| `r` | `0.2` | カプセルの半径（ワールド単位）、おおよそエージェントの半径。 |

## ステップ 5: コリジョンメッシュの生成（`--collision-mesh`）

```none
--collision-mesh [smooth|faces]
```

| パラメータ | デフォルト | 説明 |
| --- | --- | --- |
| shape | `smooth` | `smooth` = 同一平面マージを伴うマーチングキューブメッシュ（三角形数が少なく、自然な輪郭）。`faces` = 水密の軸並列ボクセル面（三角形数は多いが、ボクセルボリュームに正確に一致）。 |

| ボクセル | スムースメッシュ | フェイスメッシュ |
| --- | --- | --- |
| ![voxels](/img/user-manual/splat-transform/collision-voxels.webp) | ![smooth](/img/user-manual/splat-transform/smooth-mesh.webp) | ![faces](/img/user-manual/splat-transform/faces-mesh.webp) |

### `smooth`（デフォルト）

ボクセル表面にフィットされたスムージング済みメッシュ。三角形数が少なく、より自然な輪郭で、キャラクターコリジョンに適しています。

### `faces`

露出したボクセル面から構築された水密メッシュ — すべての面はボクセルグリッドに対して軸並列です。三角形数は多いが、ボクセルボリュームに正確に一致します。コリジョンがボクセルデータに対するレイキャストと一致しなければならない場合に役立ちます。

## リファレンス: `--seed-pos`

`--seed-pos` は、パイプラインのいくつかのステージで共有される入力です：

- `--filter-cluster` — このポイントを含む連結成分を選びます。
- `--voxel-external-fill` — サニティチェック；シードが外部から到達可能になる場合、フィルはスキップされます。
- `--voxel-carve` — カプセルのフラッド起点。

| フラグ | パラメータ | デフォルト | 説明 |
| --- | --- | --- | --- |
| `--seed-pos` | `x,y,z` | `0,0,0` | `--filter-cluster`、`--voxel-external-fill`、`--voxel-carve` で使用されるワールド空間のシードポイント。 |

## 完全な例

### 室内のスキャン

```bash
splat-transform room.ply \
    --filter-cluster --seed-pos 0,1,0 \
    room.voxel.json --voxel-external-fill --voxel-carve --collision-mesh
```

### 屋外地形

```bash
splat-transform terrain.ply \
    --filter-cluster --seed-pos 0,0,0 \
    terrain.voxel.json --voxel-floor-fill --collision-mesh
```

### 高忠実度のボクセルフェイスメッシュ

```bash
splat-transform input.ply \
    output.voxel.json --voxel-size 0.025 --collision-mesh faces
```

## トラブルシューティング

- **カービングが何も出力しない。** `--seed-pos` が固体ジオメトリの中にあるか、カプセル（`h,r`）がシードにフィットしない。シードを移動するかカプセルを縮小してください。
- **`--voxel-external-fill` が壁を通り抜ける。** その `size` を増やすか、`--voxel-opacity` を下げて薄い壁を固体としてマークします。
- **カービングが隣の部屋に漏れる。** 壁が薄すぎるか隙間があります。より高い解像度のために `--voxel-size` を下げるか、`--voxel-external-fill` のサイズを増やしてください。
- **コリジョンメッシュが密すぎる。** `--collision-mesh smooth`（デフォルト）を使用するか、`--voxel-size` を大きくしてください。
- **`--filter-cluster` が間違ったクラスタを選択する。** `--seed-pos` を希望するクラスタ内に移動するか、その `res` を増やして意図的なギャップを橋渡しします。

## 関連項目

- [ボクセルフォーマット](/user-manual/splat-transform/voxel-format) — `.voxel.json` / `.voxel.bin` 出力のディスク上のフォーマット。
- [splat-transform CLI リファレンス](/user-manual/splat-transform/) — ボクセル出力オプションを含む完全なオプションリファレンス。
- [Docker バックエンド](/user-manual/splat-transform/docker) — コンテナで GPU 専用のボクセル/コリジョン機能を実行する方法。
- [Studio → コリジョン](/user-manual/supersplat/studio/collision) — SuperSplat の Web UI を介してボクセルコリジョンをアップロードまたは生成する方法。

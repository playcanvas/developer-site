---
title: SOGフォーマット (バージョン2)
description: "SOGバージョン2の仕様：WebPテクスチャ、meta.jsonの構成、量子化、bundledとunbundledのファイルです。"
sidebar_label: SOG v2
---

**SOG (Spatially Ordered Gaussians)** は、3D Gaussian Splatデータのコンパクトなコンテナです。量子化（本質的に非可逆）による高い圧縮を実現し、通常、同等のPLYファイルよりも**約15～20倍小さい**ファイルを生成します。

**[SplatTransform](https://github.com/playcanvas/splat-transform)** を使用してSOGファイルを作成し、**[PlayCanvas Viewer](https://playcanvas.com/viewer)** でプレビューできます。

このドキュメントはSOG**バージョン2**の仕様です。現行のバージョンは[バージョン3](./sog.md)です。バージョン2は引き続きすべてのPlayCanvasツールで読み込むことができ、バージョン3より前のビューア向けに書き出すこともできます。

## 1. ファイルセット {#1-file-set}

SOGデータセットは、画像セットとメタデータファイルで構成されます。

| ファイル             | 目的                                | チャンネル (8ビット) |
| -------------------- | ----------------------------------- | -------------------- |
| `meta.json`          | シーンのメタデータとファイル名      | —                    |
| `means_l.webp`       | 位置 – 下位8ビット (RGB)            | R,G,B                |
| `means_u.webp`       | 位置 – 上位8ビット (RGB)            | R,G,B                |
| `scales.webp`        | コードブックによる軸ごとのサイズ    | R,G,B                |
| `quats.webp`         | 向き – 圧縮されたクォータニオン     | R,G,B,A              |
| `sh0.webp`           | 基本色 (DC) + 不透明度              | R,G,B,A              |
| `shN_centroids.webp` | SHパレット係数 (オプション)         | R,G,B                |
| `shN_labels.webp`    | SHパレットへのインデックス (オプション) | R,G              |

:::note[画像フォーマット]

* デフォルトでは、量子化された値を正確に保持するために、画像は**ロスレスWebP**に**すべきです**。
* `meta.json` 内の各プロパティは自身のファイル名を指定するため、他の8ビットRGBA対応フォーマットを使用**してもかまいません**。
* これらのアセットに非可逆エンコーディングを使用しないでください。非可逆圧縮は値を破壊し、目に見える/構造的なアーティファクトを生成する可能性があります。

:::

### 1.1 画像の寸法とインデックス {#11-image-dimensions--indexing}

すべてのGaussianごとのプロパティは共存しています。すべてのプロパティ画像（shN_centroidsを除く）における同じピクセル (x, y) は、同じGaussianに属します。

* ピクセルは**行優先**で配置され、原点は**左上**です。
* 画像の幅を `W`、高さを `H` とすると、アドレス指定可能なGaussianの数は `W*H` です。
* `meta.count` は `<= W*H` と**しなければなりません**。末尾の余ったピクセルは無視されます。

**インデックスの計算 (0から始まる):**

* インデックスからピクセルへ:
  `x = i % W`, `y = floor(i / W)`
* ピクセルからインデックスへ:
  `i = x + y * W`

### 1.2 座標系 {#12-coordinate-system}

SOGは、3DGS PLYファイルと同じ座標系でGaussianを格納します。右手系で+yが上のワールド（PlayCanvasなど）にシーンを配置するには、シーンのトランスフォームとしてz軸周りに180°回転させます。つまり `(x, y, z) → (−x, −y, z)` です。これは[バージョン3](./sog.md#12-coordinate-system)と同じです。

### 1.3 バンドル版 {#13-bundled-variant}

バンドルされたSOGは、上記のファイルをZIP化したものです。リーダーは以下のいずれかのレイアウトを許容**すべきです**。

* **複数ファイルディレクトリ** (オーサリング時に推奨)
* アーカイブのルートに同じファイルを含む**単一アーカイブ** (例: `scene.sog`)

リーダーは、複数ファイル版と全く同じように、ファイルを解凍してから `meta.json` を使用して解決**しなければなりません**。

---

## 2. `meta.json` {#2-metajson}

```ts
interface Meta {
  version: 2;              // ファイルフォーマットのバージョン (整数)
  asset?: {                // オプションのツール/バージョンメタデータ
    generator?: string;    // 例: "splat-transform v1.2.3"
  };
  count: number;           // ガウス分布の数 (画像のW*H以下)
  model?: "antialiased" | "2dgs"; // オプション。シーンの学習方法。通常のガウス分布の場合は省略

  means: {
    // *対数変換された*位置をデコードするための範囲 (3.1節参照)。
    mins: [number, number, number];   // nx,ny,nzの最小値 (対数領域)
    maxs: [number, number, number];   // nx,ny,nzの最大値 (対数領域)
    files: ["means_l.webp", "means_u.webp"];
  };

  scales: {
    codebook: number[];    // 256個の浮動小数点数 (対数領域); 3.3節参照
    files: ["scales.webp"];
  };

  quats: {
    files: ["quats.webp"]; // 3.2節
  };

  sh0: {
    codebook: number[];    // 256個の浮動小数点数; ガンマ空間色のDC係数 (3.4節)
    files: ["sh0.webp"];
  };

  // 高次SHが存在する場合のみ提示:
  shN?: {
    count: number;         // パレットサイズ (最大65536)
    bands: number;         // SHバンドの数 (1..3)。DC (=バンド0) はsh0に格納されます。
    codebook: number[];    // 256個の浮動小数点数; すべてのAC係数で共有 (3.5節)
    files: [
      "shN_centroids.webp",// ピクセルとしてのAC係数パレット (3.5節)
      "shN_labels.webp"    // Gaussianごとのパレットインデックス (0..count-1)
    ];
  };
}
```

:::note

* scalesコードブックは対数空間の値を含みます。線形のサイズを得るには `exp()` を適用しなければなりません（3.3節）。sh0コードブックはガンマ空間のDC係数を含みます。shNコードブックはガンマ空間のAC係数を含みます。
* 画像データは、生の8ビット整数として処理**しなければなりません**（ガンマ変換なし）。
* 特に記載がない限り、言及されていないチャンネルは無視されます。
* `files`配列内のファイル名は任意ですが、順序は重要です。

:::

---

## 3. プロパティのエンコーディング {#3-property-encodings}

### 3.1 位置 {#31-positions}

> `means_l.webp`, `means_u.webp` (RGB、軸ごとに16ビット)

各軸は2つの画像にまたがって**16ビット**に量子化されます。

```ts
// 軸ごとの16ビット正規化値 (0..65535)
const qx = (means_u.r << 8) | means_l.r;
const qy = (means_u.g << 8) | means_l.g;
const qz = (means_u.b << 8) | means_l.b;

// メタデータからの軸ごとの範囲を使用して、*対数領域*のnx,ny,nzに逆量子化する:
const nx = lerp(meta.means.mins[0], meta.means.maxs[0], qx / 65535);
const ny = lerp(meta.means.mins[1], meta.means.maxs[1], qy / 65535);
const nz = lerp(meta.means.mins[2], meta.means.maxs[2], qz / 65535);

// エンコード時に使用された対称対数変換を元に戻す:
const unlog = (n: number) => Math.sign(n) * (Math.exp(Math.abs(n)) - 1);

const p = {
  x: unlog(nx),
  y: unlog(ny),
  z: unlog(nz),
};
```

### 3.2 向き {#32-orientation}

> `quats.webp` (RGBA、26ビット “smallest-three”)

クォータニオンは、標準的な*smallest-three*スキームを使用して、**3×8ビットコンポーネント + 2ビットモード**（合計**26ビット**）でエンコードされます。

クォータニオンのコンポーネントは、全体を通して **(w, x, y, z)** の順序です。

* **R,G,B** は、保持される3つの（符号付き）コンポーネントを **(w, x, y, z)** の順序で格納し、`[-√2/2, +√2/2]` に一様に量子化されます。エンコーダーは、切り捨てではなく最も近いレベルへ四捨五入**すべきです**。
* **A** は、範囲**252..255**の**モード**を格納します。モードは `A - 252` ∈ {0,1,2,3} であり、4つのコンポーネント（**(w, x, y, z)** の順）のうち**絶対値が最も大きかった**（そのためストリームから省略され、再構築される）ものを識別します。モード 0 = w、1 = x、2 = y、3 = z です。
* `norm = Math.SQRT2` (つまり √2) とします。

```ts
// 格納された3つのコンポーネントを逆量子化する:
const toComp = (c: number) => (c / 255 - 0.5) * 2.0 / Math.SQRT2;

const a = toComp(quats.r);
const b = toComp(quats.g);
const c = toComp(quats.b);

const mode = quats.a - 252; // 0..3 → 省略されたコンポーネントはそれぞれ w, x, y, z

// ||q|| = 1 となるように省略されたコンポーネントを再構築し、w.l.o.g. で省略されたものが非負になるようにする
const t = a*a + b*b + c*c;
const d = Math.sqrt(Math.max(0, 1 - t));

// モードに従ってコンポーネントを配置する; q の順序は [w, x, y, z]
let q: [number, number, number, number];
switch (mode) {
    case 0: q = [d, a, b, c]; break; // 省略されたのはw
    case 1: q = [a, d, b, c]; break; // 省略されたのはx
    case 2: q = [a, b, d, c]; break; // 省略されたのはy
    case 3: q = [a, b, c, d]; break; // 省略されたのはz
    default: throw new Error("Invalid quaternion mode");
}
```

#### 有効性の制約 {#validity-constraints}

* `quats.a` は**252, 253, 254, 255**のいずれかと**しなければなりません**。他の値は予約されています。

### 3.3 スケール {#33-scales}

> `scales.webp` (コードブックによるRGB)

軸ごとのサイズは**コードブックのインデックス**です。コードブックは**対数領域**の値を格納するため、デコードには指数関数が必要です。

```ts
const sx = Math.exp(meta.scales.codebook[scales.r]); // r,g,b は 0..255
const sy = Math.exp(meta.scales.codebook[scales.g]);
const sz = Math.exp(meta.scales.codebook[scales.b]);
```

解釈（例えば、主軸の標準偏差と全範囲）は、ソースのトレーニング設定に従います。デコード後（`exp` 適用後）の値は**シーン単位**です。

### 3.4 基本色 + 不透明度 (DC) {#34-base-color--opacity-dc}

> `sh0.webp` (RGBA)

`sh0` は、色チャンネルごとの**DC (l=0)** SH係数と**アルファ値**を保持します。

* **R,G,B** は、`sh0.codebook` への0..255のインデックスです。
* **A** は `[0,1]` の範囲の**不透明度**です（つまり `sh0.a / 255`）。エンコーダーは、切り捨てではなく最も近いレベルへ四捨五入**すべきです**。

DC係数を**ガンマ空間RGB**色に変換するには:

```ts
// SH_C0 = Y_0^0 = 1 / (2 * sqrt(pi))
const SH_C0 = 0.28209479177387814;

const r = 0.5 + meta.sh0.codebook[sh0.r] * SH_C0;
const g = 0.5 + meta.sh0.codebook[sh0.g] * SH_C0;
const b = 0.5 + meta.sh0.codebook[sh0.b] * SH_C0;
const a = sh0.a / 255;
```

### 3.5 高次SH (オプション) {#35-higher-order-sh-optional}

> `shN_centroids.webp`, `shN_labels.webp`

存在する場合、高次 (AC) SH係数はパレットを介して格納されます。

* `shN.count` ∈ **\[1,64k]** はエントリの数です。
* `shN.bands` ∈ **\[1,3]** はエントリあたりのバンド数です。

#### セントロイド (パレット) {#centroids-palette}

* `shN_centroids.webp` はSH係数パレットを格納するRGB画像です。
* 常に1行あたり64エントリがあります。エントリは左上を原点として行優先でパックされます。

テクスチャ幅はバンドの数に依存します。

| バンド | 係数 | テクスチャ幅 (ピクセル) |
|---|---|---|
| 1 | 3 | 64 * 3 = 192 |
| 2 | 8 | 64 * 8 = 512 |
| 3 | 15 | 64 * 15 = 960 |

球面調和関数エントリnおよび係数cのピクセル位置を計算する:

```ts
const coeffs = [3, 8, 15];
const u = (n % 64) * coeffs[bands - 1] + c;
const v = Math.floor(n / 64);
```

#### ラベル {#labels}

* `shN_labels.webp` は、Gaussianごとに範囲 (0..count-1) の**16ビットインデックス**を格納します。

```ts
const index = shN_labels.r + (shN_labels.g << 8);
```

#### デコード {#decoding}

各セントロイドピクセルの**R,G,B**チャンネルは、共有の `shN.codebook` への**コードブックインデックス** (0..255) です。3つのチャンネルは、SH係数の3つの色チャンネルに対応します。

1つのGaussianのAC SH係数一式をデコードするには:

```ts
const coeffs = [3, 8, 15];
const shCoeffs = coeffs[meta.shN.bands - 1];        // 色チャンネルあたりの係数の数
const codebook = meta.shN.codebook;                  // 256個の共有浮動小数点数エントリ

// 1. このGaussianのパレットエントリを調べる
const label = shN_labels.r + (shN_labels.g << 8);

// 2. 係数ごとに、セントロイドピクセルからRGBを読み取り、コードブックで変換する
for (let c = 0; c < shCoeffs; c++) {
    const u = (label % 64) * shCoeffs + c;
    const v = Math.floor(label / 64);

    // shN_centroids.webp のピクセル (u, v)
    const r = centroidsPixel(u, v).r;
    const g = centroidsPixel(u, v).g;
    const b = centroidsPixel(u, v).b;

    sh_channel0[c] = codebook[r];  // 色チャンネル0のSH AC係数
    sh_channel1[c] = codebook[g];  // 色チャンネル1のSH AC係数
    sh_channel2[c] = codebook[b];  // 色チャンネル2のSH AC係数
}
```

SHの基底、係数の順序、評価は、バンド1～3について[バージョン3](./sog.md#351-basis-and-evaluation)と同じです。

---

## 4. `meta.json`の例 {#4-example-metajson}

```json
{
  "version": 2,
  "asset": { "generator": "splat-transform v1.2.3" },
  "count": 187543,
  "model": "antialiased",
  "means": {
    "mins": [-2.10, -1.75, -2.40],
    "maxs": [ 2.05,  2.25,  1.90],
    "files": ["means_l.webp", "means_u.webp"]
  },
  "scales": {
    "codebook": [/* 256個の浮動小数点数 */],
    "files": ["scales.webp"]
  },
  "quats": { "files": ["quats.webp"] },
  "sh0": {
    "codebook": [/* 256個の浮動小数点数 */],
    "files": ["sh0.webp"]
  },
  "shN": {
    "count": 65536,
    "bands": 3,
    "codebook": [/* 256個の浮動小数点数 */],
    "files": ["shN_centroids.webp", "shN_labels.webp"]
  }
}
```

---

## 5. バージョン管理と互換性 {#5-versioning--compatibility}

* リーダーは `version` を確認**しなければなりません**。このドキュメントは**バージョン2**を記述しています。現行のバージョンについては[バージョン3](./sog.md)を参照してください。
* 将来のバージョンで追加のオプションプロパティが現れる可能性があります。リーダーは認識できないフィールドを無視**すべきです**。

---

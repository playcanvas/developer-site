---
title: SOGフォーマット
sidebar_label: SOG
description: "SOG（Spatially Ordered Gaussians）の仕様（バージョン2と3）：WebPテクスチャ、meta.jsonの構成、量子化、ブラインドデータ、bundledとunbundledのファイルです。"
---

**SOG (Spatially Ordered Gaussians)** は、3D Gaussian Splatデータのコンパクトなコンテナです。量子化（本質的に非可逆）による高い圧縮を実現し、通常、同等のPLYファイルよりも**約15～20倍小さい**ファイルを生成します。

**[SplatTransform](https://github.com/playcanvas/splat-transform)** を使用してSOGファイルを作成し、**[PlayCanvas Viewer](https://playcanvas.com/viewer)** でプレビューできます。

このドキュメントはフォーマット仕様です。**バージョン2**と**バージョン3**を記述します。どちらのバージョンも現行のものです。リーダーは両方をサポート**すべきです**。`meta.json` の `version` フィールドで区別します。

## バージョンの違い

フォーマットの大部分は共通です。バージョンによって異なる箇所には、以下の各節で **v2** と **v3** の印を付けています。

| | バージョン2 | バージョン3 |
| --- | --- | --- |
| [向き](#32-orientation) | `quats.webp`：smallest-threeクォータニオン、26ビット | 指数写像、24ビット。`means_l.webp`、`means_u.webp`、`scales.webp` のアルファチャンネルに格納。`quats.webp` はなし |
| [不透明度](#34-base-color--opacity-dc) | `sh0.a / 255`、0..1 | `(sh0.a / 204)²`、0..1.5625 |
| [SHバンド](#35-higher-order-sh-optional) | 1..3 | 1..4 |
| [SHパレットのラベル](#labels) | 16ビット (R,G)、最大65,536エントリ | 24ビット (R,G,B)、最大16,777,216エントリ |
| [ブラインドデータ](#36-blind-data-v3-only-optional) | — | `blind_N.webp` 画像に格納する、オプションのGaussianごとのアプリケーションデータ |

## 1. ファイルセット

SOGデータセットは、画像セットとメタデータファイルで構成されます。

| ファイル                 | 目的                                         | チャンネル (8ビット)          |
| -------------------- | -------------------------------------------- | --------------------------- |
| `meta.json`          | シーンのメタデータとファイル名                   | —                           |
| `means_l.webp`       | 位置 – 下位8ビット (RGB)                        | R,G,B (v2) · R,G,B,A (v3)   |
| `means_u.webp`       | 位置 – 上位8ビット (RGB)                        | R,G,B (v2) · R,G,B,A (v3)   |
| `scales.webp`        | コードブックによる軸ごとのサイズ                  | R,G,B (v2) · R,G,B,A (v3)   |
| `quats.webp`         | 向き – 圧縮されたクォータニオン (v2のみ)           | R,G,B,A                     |
| `sh0.webp`           | 基本色 (DC) + 不透明度                          | R,G,B,A                     |
| `shN_centroids.webp` | SHパレット係数 (オプション)                      | R,G,B                       |
| `shN_labels.webp`    | SHパレットへのインデックス (オプション)            | R,G (v2) · R,G,B (v3)       |
| `blind_N.webp`       | ブラインドデータ (オプション、v3のみ)              | R,G,B,A                     |

バージョン3では、`means_l.webp`、`means_u.webp`、`scales.webp` のアルファチャンネルに[向き](#32-orientation)が格納されます。

:::note[画像フォーマット]

* デフォルトでは、量子化された値を正確に保持するために、画像は**ロスレスWebP**である**べきです**。
* `meta.json` 内の各プロパティは自身のファイル名を指定するため、他の8ビットRGBA対応フォーマットも使用**できます**。
* これらのアセットに非可逆エンコーディングを使用しないでください。非可逆圧縮は値を破壊し、目に見える/構造的なアーティファクトを生成する可能性があります。
* アルファチャンネルがデータを持つ画像では、エンコーダーはアルファが0のピクセルのRGB値を保持**しなければなりません**（WebPエンコーダーの `exact` オプション）。ブラインドデータの画像は、意味のあるRGBとともにアルファに0を持つことがあります。

:::

### 1.1 画像の寸法とインデックス

すべてのGaussianごとのプロパティは共存しています。すべてのプロパティ画像（shN_centroidsを除く）における同じピクセル (x, y) は、同じGaussianに属します。

* ピクセルは**行優先**で配置され、原点は**左上**です。
* 画像の幅を `W`、高さを `H` とすると、アドレス指定可能なGaussianの数は `W*H` です。
* `meta.count` は `<= W*H` でなければ**なりません**。末尾の余ったピクセルは無視されます。

**インデックスの計算 (0から始まる):**

* インデックスからピクセルへ:
  `x = i % W`, `y = floor(i / W)`
* ピクセルからインデックスへ:
  `i = x + y * W`

### 1.2 座標系

右手系:

* **x:** 右
* **y:** 上
* **z:** 後ろ（つまり、カメラが −z を向く慣例では −z が「前」）

### 1.3 バンドル版

バンドルされたSOGは、上記のファイルをZIP化したものです。リーダーは以下のいずれかのレイアウトを許容**すべきです**。

* **複数ファイルディレクトリ** (オーサリング時に推奨)
* アーカイブのルートに同じファイルを含む**単一アーカイブ** (例: `scene.sog`)

リーダーは、複数ファイル版と全く同じように、`meta.json` を使用してファイルを解凍し、解決**しなければなりません**。

---

## 2. `meta.json`

```ts
interface Meta {
  version: 2 | 3;          // ファイルフォーマットのバージョン (整数)
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

  // v2のみ。バージョン3では向きをmeansとscalesの画像に格納します (3.2節):
  quats?: {
    files: ["quats.webp"]; // 3.2節
  };

  sh0: {
    codebook: number[];    // 256個の浮動小数点数; ガンマ空間色のDC係数 (3.4節)
    files: ["sh0.webp"];
  };

  // v3のみ、オプション。不透明度が1を超えるGaussianがある場合に存在 (3.4節):
  opacity?: {
    max: number;           // 格納されている最大の不透明度 (最大1.5625)
  };

  // 高次SHが存在する場合のみ提示:
  shN?: {
    count: number;         // パレットサイズ: 最大65536 (v2)、最大16777216 (v3)
    bands: number;         // SHバンドの数: 1..3 (v2)、1..4 (v3)。DC (=バンド0) はsh0に格納されます。
    codebook: number[];    // 256個の浮動小数点数; すべてのAC係数で共有 (3.5節)
    files: [
      "shN_centroids.webp",// ピクセルとしてのAC係数パレット (3.5節)
      "shN_labels.webp"    // Gaussianごとのパレットインデックス (0..count-1)
    ];
  };

  // v3のみ、オプション。Gaussianごとのアプリケーションデータ、画像ごとに1エントリ (3.6節):
  blind?: {
    files: [string];       // 1つのRGBA画像。例: "blind_0.webp"
    fields: {
      name: string;        // すべてのブラインド画像を通して一意
      type: "u8" | "u16" | "u24" | "u32" | "f16" | "f32" | "unorm8" | "unorm16";
      range?: [number, number]; // unorm8 / unorm16のみ。デフォルトは [0, 1]
    }[];
  }[];
}
```

:::note

* scalesコードブックは対数空間の値を含みます。線形のサイズを得るには `exp()` を適用しなければなりません（[スケール](#33-scales)参照）。sh0コードブックはガンマ空間のDC係数を、shNコードブックはガンマ空間のAC係数を含みます。
* 画像データは、生の8ビット整数として扱われなければ**なりません**（ガンマ変換なし）。
* 特に記載がない限り、言及されていないチャンネルは無視されます。
* `files`配列内のファイル名は任意ですが、順序は重要です。

:::

---

## 3. プロパティのエンコーディング

### 3.1 位置

> `means_l.webp`, `means_u.webp` (RGB, 16-bit per axis)

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

両方の画像のアルファチャンネルは、バージョン2では使用されず、バージョン3では[向き](#32-orientation)のバイトを格納します。

### 3.2 向き {#32-orientation}

クォータニオンのコンポーネントは、全体を通して **(w, x, y, z)** の順序です。

#### バージョン2：smallest-three

> `quats.webp` (RGBA, 26-bit “smallest-three”)

クォータニオンは、標準的な*smallest-three*スキームを使用して、**3×8ビットコンポーネント + 2ビットモード**（合計**26ビット**）でエンコードされます。

* **R,G,B** は、保持される3つの（符号付き）コンポーネントを **(w, x, y, z)** の順序で格納し、`[-√2/2, +√2/2]` に一様に量子化されます。
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
    default: throw new Error("Invalid quaternion mode"); // 無効なクォータニオンモード
}
```

`quats.a` は**252, 253, 254, 255**のいずれかでなければ**なりません**。他の値は予約されています。

#### バージョン3：指数写像

> `means_l.a`, `means_u.a`, `scales.a` (24ビット、各1バイト)

回転は**指数写像**として格納されます。これは単位球内のベクトル `p` で、その向きが回転軸、長さが回転角をπで割った値です。各成分は1バイトで、恒等回転を正確に格納できる格子上に量子化されます。

```ts
const p = [
    (means_l.a - 128) / 127,
    (means_u.a - 128) / 127,
    (scales.a - 128) / 127
];

const len = Math.hypot(p[0], p[1], p[2]);
const t = len * Math.PI / 2;                           // 回転角の半分
const k = len > 1e-6 ? Math.sin(t) / len : Math.PI / 2;

const q = [Math.cos(t), p[0] * k, p[1] * k, p[2] * k]; // [w, x, y, z]
```

エンコードでは、`w >= 0` になるよう必要に応じてクォータニオンの符号を反転し、`v = (x, y, z)` として `p = (2 / π) · atan2(|v|, w) · v / |v|` を、成分ごとに `round(p * 127 + 128)` として格納します。`|p| <= 1` なので、すべてのバイトは1以上です。恒等回転は `(128, 128, 128)` として格納されます。

### 3.3 スケール {#33-scales}

> `scales.webp` (RGB via codebook)

軸ごとのサイズは**コードブックのインデックス**です。コードブックは**対数領域**の値を格納するため、デコードには指数関数が必要です。

```ts
const sx = Math.exp(meta.scales.codebook[scales.r]); // r,g,b は 0..255
const sy = Math.exp(meta.scales.codebook[scales.g]);
const sz = Math.exp(meta.scales.codebook[scales.b]);
```

解釈（例えば、主軸の標準偏差と全範囲）は、ソースのトレーニング設定に従います。デコード後（`exp` 適用後）の値は**シーン単位**です。

アルファチャンネルは、バージョン2では使用されず、バージョン3では[向き](#32-orientation)のバイトを格納します。

### 3.4 基本色 + 不透明度 (DC) {#34-base-color--opacity-dc}

> `sh0.webp` (RGBA)

`sh0` は、色チャンネルごとの**DC (l=0)** SH係数と**アルファ値**を保持します。

* **R,G,B** は、`sh0.codebook` への0..255のインデックスです。
* **A** は**不透明度**で、バージョンごとにエンコードが異なります（以下参照）。

DC係数を**ガンマ空間RGB**色に変換するには:

```ts
// SH_C0 = Y_0^0 = 1 / (2 * sqrt(pi))
const SH_C0 = 0.28209479177387814;

const r = 0.5 + meta.sh0.codebook[sh0.r] * SH_C0;
const g = 0.5 + meta.sh0.codebook[sh0.g] * SH_C0;
const b = 0.5 + meta.sh0.codebook[sh0.b] * SH_C0;
```

#### バージョン2：線形の不透明度

不透明度は `[0, 1]` の範囲です。

```ts
const a = sh0.a / 255;
```

#### バージョン3：二乗の不透明度

不透明度はその平方根として格納されます。これにより、重なり合う半透明のスプラットを構成する低い不透明度で細かな段階が得られます。バイト値204がちょうど1で、それより上のバイト値は範囲を `(255 / 204)² = 1.5625` まで広げます。

```ts
const a = (sh0.a / 204) ** 2;   // 0..1.5625
```

エンコードでは `round(204 * sqrt(a))` を255でクランプして格納します。

1を超える不透明度は、例えば粗い詳細レベルを作成する際にGaussianを統合することで生じます。統合されたGaussianは、不透明度1の単一のGaussianでは覆いきれない範囲を覆います。この追加の被覆を描画できないレンダラーは、不透明度を1にクランプ**すべきです**。不透明度が1を超えるものがある場合、ライターは `meta.opacity.max` にその最大値を設定**すべきです**。

### 3.5 高次SH (オプション) {#35-higher-order-sh-optional}

> `shN_centroids.webp`, `shN_labels.webp`

存在する場合、高次 (AC) SH係数はパレットを介して格納されます。

* `shN.count` はエントリの数です。バージョン2では1..65,536、バージョン3では1..16,777,216です。
* `shN.bands` はエントリあたりのバンド数です。バージョン2では1..3、バージョン3では1..4です。

#### セントロイド (パレット)

* `shN_centroids.webp` はSH係数パレットを格納するRGB画像です。
* 常に1行あたり64エントリがあります。エントリは左上を原点として行優先でパックされるため、画像は `ceil(count / 64)` 行になります。ライターは、対象とするデバイスのテクスチャサイズの制限内に行数を収める**べきです**。

テクスチャ幅はバンドの数に依存します。

| バンド | 係数 | テクスチャ幅 (ピクセル) |
|---|---|---|
| 1 | 3 | 64 * 3 = 192 |
| 2 | 8 | 64 * 8 = 512 |
| 3 | 15 | 64 * 15 = 960 |
| 4 (v3のみ) | 24 | 64 * 24 = 1536 |

球面調和関数エントリnおよび係数cのピクセル位置を計算する:

```ts
const coeffs = [3, 8, 15, 24];
const u = (n % 64) * coeffs[bands - 1] + c;
const v = Math.floor(n / 64);
```

#### ラベル {#labels}

`shN_labels.webp` は、Gaussianごとのパレットインデックス (0..count-1) を格納します。

```ts
// v2: 16ビットインデックス
const index = shN_labels.r + (shN_labels.g << 8);

// v3: 24ビットインデックス
const index = shN_labels.r + (shN_labels.g << 8) + (shN_labels.b << 16);
```

#### デコード

各セントロイドピクセルの**R,G,B**チャンネルは、共有の `shN.codebook` への**コードブックインデックス** (0..255) です。3つのチャンネルは、SH係数の3つの色チャンネルに対応します。

1つのGaussianのAC SH係数一式をデコードするには:

```ts
const coeffs = [3, 8, 15, 24];
const shCoeffs = coeffs[meta.shN.bands - 1];        // 色チャンネルあたりの係数の数
const codebook = meta.shN.codebook;                  // 256個の共有浮動小数点数エントリ

// 1. このGaussianのパレットエントリを調べる (ラベル参照: v3ではBバイトを加える)
const label = shN_labels.r + (shN_labels.g << 8) + (meta.version >= 3 ? shN_labels.b << 16 : 0);

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

### 3.6 ブラインドデータ (v3のみ、オプション) {#36-blind-data-v3-only-optional}

> `blind_N.webp` (RGBA)、`meta.blind` のエントリごとに1画像

ブラインドデータは、フォーマットが格納するものの解釈はしない、Gaussianごとのデータです。各フィールドの意味はアプリケーションが定義します。例えば、Gaussianがシーンのどの部分に属するかを示すタグです。リーダーは、使用しないブラインドデータを無視**すべきです**。

`meta.blind` の各エントリは1つのRGBA画像で、他のGaussianごとの画像と同じ寸法とピクセル配置を持ちます。その `fields` は、列挙された順にRから始めてピクセルのバイトにパックされ、各フィールドはその型のバイト数を占めます。1つの画像に格納できるフィールドは最大4バイトです。それ以上のデータには画像を追加します。複数バイトの値はリトルエンディアンで、最下位バイトが最初のチャンネルに入ります。

| 型 | バイト数 | 値 |
| --- | --- | --- |
| `u8`, `u16`, `u24`, `u32` | 1, 2, 3, 4 | 符号なし整数 |
| `f16`, `f32` | 2, 4 | IEEE 754 半精度 / 単精度浮動小数点数 |
| `unorm8`, `unorm16` | 1, 2 | `min + code / (2^bits − 1) * (max − min)`。`[min, max]` は `range` から（デフォルトは `[0, 1]`） |

```ts
const BYTES = { u8: 1, u16: 2, u24: 3, u32: 4, f16: 2, f32: 4, unorm8: 1, unorm16: 2 };

// pixel = エントリの画像におけるこのGaussianの [r, g, b, a]
let offset = 0;
for (const field of meta.blind[t].fields) {
    const bytes = BYTES[field.type];
    let code = 0;
    for (let k = 0; k < bytes; k++) {
        code += pixel[offset + k] * 2 ** (8 * k);
    }
    offset += bytes;

    // u8..u32: 値は `code`
    // f16 / f32: 値はビットパターン `code` の浮動小数点数
    // unorm8 / unorm16:
    const [min, max] = field.range ?? [0, 1];
    const value = min + code / (2 ** (8 * bytes) - 1) * (max - min);
}
```

フィールド名は、すべてのブラインド画像を通して一意でなければ**なりません**。エンジンがフィールドを名前でシェーダーに公開することがあるため、有効な識別子（英字、数字、`_`）となる名前を使用してください。

PlayCanvasでは、スプラットをワークバッファにコピーする際にシェーダーがブラインドフィールドを読み取ります。[SOGブラインドデータの読み取り](/user-manual/gaussian-splatting/rendering-architecture/work-buffer-format#reading-sog-blind-data)を参照してください。

---

## 4. `meta.json`の例

バージョン2のファイル:

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

1を超える不透明度、4番目のSHバンド、2つのフィールドを持つブラインドデータ画像1枚を含むバージョン3のファイル:

```json
{
  "version": 3,
  "asset": { "generator": "splat-transform v1.2.3" },
  "count": 187543,
  "means": {
    "mins": [-2.10, -1.75, -2.40],
    "maxs": [ 2.05,  2.25,  1.90],
    "files": ["means_l.webp", "means_u.webp"]
  },
  "scales": {
    "codebook": [/* 256個の浮動小数点数 */],
    "files": ["scales.webp"]
  },
  "sh0": {
    "codebook": [/* 256個の浮動小数点数 */],
    "files": ["sh0.webp"]
  },
  "opacity": { "max": 1.42 },
  "shN": {
    "count": 131072,
    "bands": 4,
    "codebook": [/* 256個の浮動小数点数 */],
    "files": ["shN_centroids.webp", "shN_labels.webp"]
  },
  "blind": [
    {
      "files": ["blind_0.webp"],
      "fields": [
        { "name": "logo", "type": "u8" },
        { "name": "edge", "type": "unorm8", "range": [0, 1.5] }
      ]
    }
  ]
}
```

---

## 5. バージョン管理と互換性

* リーダーは `version` を確認**しなければなりません**。このドキュメントは**バージョン2**と**バージョン3**を記述しており、リーダーは両方をサポート**すべきです**。
* バージョン2のみをサポートするリーダーは、バージョン3のファイルを読み取れません。そのようなリーダーで読み込む必要があるファイルはバージョン2で書き出してください。バージョン2には、4番目のSHバンド、65,536エントリを超えるパレット、1を超える不透明度、ブラインドデータがありません。
* `version` フィールドのないファイルはレガシーのバージョン1のレイアウトで、このドキュメントでは扱いません。
* 将来のバージョンで追加のオプションプロパティが現れる可能性があります。リーダーは認識できないフィールドを無視**すべきです**。

---

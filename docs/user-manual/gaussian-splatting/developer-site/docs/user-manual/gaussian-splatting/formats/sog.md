---
title: SOGフォーマット
sidebar_label: SOG
---

**SOG (Spatially Ordered Gaussians)** は、3D Gaussian Splatデータのコンパクトなコンテナです。これは、量子化（設計上は非可逆）による高い圧縮を実現し、通常、同等のPLYファイルよりも**約15～20倍小さい**ファイルサイズになります。

**[SplatTransform](https://github.com/playcanvas/splat-transform)** でSOGファイルを作成し、**[PlayCanvas Viewer](https://playcanvas.com/viewer)** でプレビューできます。

このドキュメントは、フォーマット仕様です。

## 1. ファイルセット

SOGデータセットは、画像セットとメタデータファイルで構成されます。

| ファイル                 | 目的                             | チャンネル（8ビット） |
| -------------------- | ----------------------------------- | ---------------- |
| `meta.json`          | シーンのメタデータとファイル名        | —                |
| `means_l.webp`       | 位置 – 下位8ビット (RGB)      | R,G,B            |
| `means_u.webp`       | 位置 – 上位8ビット (RGB)      | R,G,B            |
| `quats.webp`         | 向き – 圧縮されたクォータニオン | R,G,B,A          |
| `scales.webp`        | コードブックによる軸ごとのサイズ         | R,G,B            |
| `sh0.webp`           | 基本色 (DC) + 不透明度           | R,G,B,A          |
| `shN_labels.webp`    | SHパレットへのインデックス（オプション）  | R,G              |
| `shN_centroids.webp` | SHパレット係数（オプション）  | RGBA             |

:::note[画像フォーマット]

* デフォルトでは、量子化された値を正確に保持するために、画像は**ロスレスWebP**である**べきです**。
* `meta.json` 内の各プロパティがそのファイル名を指定するため、他の8ビットRGBA対応フォーマットも使用**できます**。
* 非可逆圧縮は値を破損させ、視覚的/構造的なアーティファクトを生成する可能性があるため、これらのアセットには非可逆エンコーディングを使用しないでください。

:::

### 1.1 画像の寸法とインデックス付け

すべてのGaussianごとのプロパティは共存しています。すべてのプロパティ画像（`shN_centroids`を除く）の同じピクセル (x, y) は、同じGaussianに属します。

* ピクセルは**行優先**で配置され、原点は**左上**です。
* 画像の幅が `W`、高さが `H` の場合、アドレス指定可能なGaussianの数は `W*H` です。
* `meta.count` は `<= W*H` で**なければなりません**。末尾のピクセルは無視されます。

**インデックス計算（ゼロベース）：**

* インデックスからピクセルへ：
  `x = i % W`, `y = floor(i / W)`
* ピクセルからインデックスへ：
  `i = x + y * W`

### 1.2 座標系

右手系：

* **x:** 右
* **y:** 上
* **z:** 奥 (つまり、カメラが-z方向を見ている慣例では、-zが「前方」)

### 1.3 バンドルされたバリアント

バンドルされたSOGは、上記のファイルをZIP圧縮したものです。リーダーは以下のいずれかのレイアウトを**受け入れるべきです**。

* **マルチファイルディレクトリ**（オーサリング時に推奨）
* **単一アーカイブ**（例：`scene.sog`）。アーカイブのルートに同じファイルが含まれる。

リーダーは、マルチファイルバージョンとまったく同じように、`meta.json` を使用してファイルを解凍し解決**なければなりません**。

---

## 2. `meta.json`

```ts
interface Meta {
  version: 2;              // ファイルフォーマットのバージョン（整数）
  count: number;           // ガウスの数（画像のW*H以下）
  antialias: boolean;      // シーンがアンチエイリアシングで学習された場合に真

  means: {
    // *対数変換された*位置をデコードするための範囲（§3.1を参照）。
    mins: [number, number, number];   // nx,ny,nzの最小値（対数ドメイン）
    maxs: [number, number, number];   // nx,ny,nzの最大値（対数ドメイン）
    files: ["means_l.webp", "means_u.webp"];
  };

  scales: {
    codebook: number[];    // 256個の浮動小数点数；§3.3を参照
    files: ["scales.webp"];
  };

  quats: {
    files: ["quats.webp"]; // §3.2
  };

  sh0: {
    codebook: number[];    // 256個の浮動小数点数；量子化されたDCをリニアカラーにマッピングする（§3.4）
    files: ["sh0.webp"];
  };

  // 高次SHが存在する場合にのみ表示：
  shN?: {
    count: number;         // パレットサイズ（最大65536）
    bands: number;         // SHバンドの数（1..3）。DC（＝バンド1）はsh0に格納される。
    codebook: number[];    // 256個の浮動小数点数；すべてのAC係数で共有される（§3.5）
    files: [
      "shN_labels.webp",   // ガウスごとのパレットインデックス（0..count-1）
      "shN_centroids.webp" // AC係数のパレットをピクセルとして（§3.5）
    ];
  };
}
```

:::note

* すべてのコードブックには、sRGBではなくリニア空間の値が含まれています。
* 画像データは、生の8ビット整数として扱われる**必要があります**（ガンマ変換なし）。
* 特に明記されていない限り、言及されていないチャンネルは無視されます。

:::

---

## 3. プロパティエンコーディング

### 3.1 位置

> `means_l.webp`、`means_u.webp` (RGB、軸ごとに16ビット)

各軸は、2つの画像にまたがって**16ビット**に量子化されます。

```ts
// 軸ごとの16ビット正規化値（0..65535）
const qx = (means_u.r << 8) | means_l.r;
const qy = (means_u.g << 8) | means_l.g;
const qz = (means_u.b << 8) | means_l.b;

// メタデータからの軸ごとの範囲を使用して、*対数ドメイン*のnx,ny,nzに逆量子化する：
const nx = lerp(meta.means.mins[0], meta.means.maxs[0], qx / 65535);
const ny = lerp(meta.means.mins[1], meta.means.maxs[1], qy / 65535);
const nz = lerp(meta.means.mins[2], meta.means.maxs[2], qz / 65535);

// エンコード時に使用された対称対数変換を元に戻す：
const unlog = (n: number) => Math.sign(n) * (Math.exp(Math.abs(n)) - 1);

const p = {
  x: unlog(nx),
  y: unlog(ny),
  z: unlog(nz),
};
```

### 3.2 向き

> `quats.webp` (RGBA、26ビットの「smallest-three」)

クォータニオンは、標準の*smallest-three*スキームを使用して、**3×8ビットコンポーネント + 2ビットモード**（合計**26ビット**）でエンコードされます。

* **R,G,B** は、保持される3つの（符号付き）コンポーネントを格納し、`[-√2/2, +√2/2]` に均一に量子化されます。
* **A** は、**252..255** の範囲で**モード**を格納します。モードは `A - 252` ∈ {0,1,2,3} であり、4つのコンポーネントのうち、どのコンポーネントが**絶対値で最大**であったか（したがってストリームから省略され、再構築される）を識別します。
* `norm = Math.SQRT2` （つまり √2）とします。

```ts
// 格納された3つのコンポーネントを逆量子化する：
const toComp = (c: number) => (c / 255 - 0.5) * 2.0 / Math.SQRT2;

const a = toComp(quats.r);
const b = toComp(quats.g);
const c = toComp(quats.b);

const mode = quats.a - 252; // 0..3 (R,G,B,A は4つのコンポーネントのいずれか)

// ||q|| = 1 となるように省略されたコンポーネントを再構築し、一般性を失うことなく省略されたコンポーネントは非負である
const t = a*a + b*b + c*c;
const d = Math.sqrt(Math.max(0, 1 - t));

// モードに従ってコンポーネントを配置する
let q: [number, number, number, number];
switch (mode) {
    case 0: q = [d, a, b, c]; break; // 省略されたコンポーネント = x
    case 1: q = [a, d, b, c]; break; // 省略されたコンポーネント = y
    case 2: q = [a, b, d, c]; break; // 省略されたコンポーネント = z
    case 3: q = [a, b, c, d]; break; // 省略されたコンポーネント = w
    default: throw new Error("Invalid quaternion mode"); // 無効なクォータニオンモード
}
```

#### 有効性制約

* `quats.a` は **252, 253, 254, 255** の範囲で**なければなりません**。その他の値は予約されています。

### 3.3 スケール

> `scales.webp` (コードブック経由のRGB)

軸ごとのサイズは**コードブックインデックス**です。

```ts
const sx = meta.scales.codebook[scales.r]; // 0..255
const sy = meta.scales.codebook[scales.g];
const sz = meta.scales.codebook[scales.b];
```

解釈（例：主軸標準偏差 vs. 全範囲）は、ソースのトレーニング設定に従います。値は**シーン単位**です。

### 3.4 基本色 + 不透明度 (DC)

> `sh0.webp` (RGBA)

`sh0` は、色チャンネルごとの**DC (l=0)** SH係数と**アルファ**を保持します。

* **R,G,B** は `sh0.codebook` への 0..255 のインデックスです（リニアドメイン）。
* **A** は `[0,1]` の**不透明度**です（つまり、`sh0.a / 255`）。

DC係数を**リニアRGB**貢献に変換するには：

```ts
// SH_C0 = Y_0^0 = 1 / (2 * sqrt(pi))
const SH_C0 = 0.28209479177387814;

const r = 0.5 + meta.sh0.codebook[sh0.r] * SH_C0;
const g = 0.5 + meta.sh0.codebook[sh0.g] * SH_C0;
const b = 0.5 + meta.sh0.codebook[sh0.b] * SH_C0;
const a = sh0.a / 255;
```

> **色空間。** 値は**リニア**です。sRGBに出力する場合は、シェーディング/コンポジット後に通常の変換を適用してください。

### 3.5 高次SH（オプション）

> `shN_labels.webp`、`shN_centroids.webp`

存在する場合、高次（AC）SH係数はパレットを介して格納されます。

* `shN.count` ∈ **\[1,64k]** エントリ数。
* `shN.bands` ∈ **\[1,3]** エントリごとのバンド数。

#### ラベル

* `shN_labels.webp` は、Gaussianごとに範囲 (0..count-1) の**16ビットインデックス**を格納します。

```ts
const index = shN_labels.r + (shN_labels.g << 8);
```

#### セントロイド（パレット）

* `shN_centroids.webp` は、SH係数パレットを格納するRGB画像です。
* 常に1行あたり64エントリあります。エントリは行優先で、原点は左上です。

テクスチャ幅はバンド数に依存します。

| バンド | 係数 | テクスチャ幅（ピクセル） |
|---|---|---|
| 1 | 3 | 64 * 3 = 96 |
| 2 | 8 | 64 * 8 = 512 |
| 3 | 15 | 64 * 15 = 960 |

球面調和関数エントリnおよび係数cのピクセル位置を計算する：

```ts
const coeffs = [3, 8, 15];
const u = (n % 64) * coeffs[bands] + c;
const v = Math.floor(n / 64);
```

---

## 4. `meta.json` の例

```json
{
  "version": 2,
  "count": 187543,
  "antialias": true,
  "means": {
    "mins": [-2.10, -1.75, -2.40],
    "maxs": [ 2.05,  2.25,  1.90],
    "files": ["means_l.webp", "means_u.webp"]
  },
  "scales": {
    "codebook": [/* 256 floats */],
    "files": ["scales.webp"]
  },
  "quats": { "files": ["quats.webp"] },
  "sh0": {
    "codebook": [/* 256 floats */],
    "files": ["sh0.webp"]
  },
  "shN": {
    "count": 128,
    "bands": 3,
    "codebook": [/* 256 floats */],
    "files": ["shN_labels.webp", "shN_centroids.webp"]
  }
}
```

---

## 5. バージョン管理と互換性

* リーダーは `version` をチェック**しなければなりません**。このドキュメントは**バージョン2**について説明しています。
* 将来のバージョンでは追加のオプションプロパティが出現する可能性があります。リーダーは認識できないフィールドを**無視すべきです**。

---

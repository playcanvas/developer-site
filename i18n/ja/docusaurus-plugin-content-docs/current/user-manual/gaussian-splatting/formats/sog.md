---
title: SOGフォーマット
description: "SOG（Spatially Ordered Gaussians）の仕様：WebPテクスチャ、meta.jsonの構成、量子化、bundledとunbundledのファイルです。"
sidebar_label: SOG
---

**SOG (Spatially Ordered Gaussians)** は、3D Gaussian Splatデータのコンパクトなコンテナです。量子化（本質的に非可逆）による高い圧縮を実現し、通常、同等のPLYファイルよりも**約15～20倍小さい**ファイルを生成します。

**[SplatTransform](https://github.com/playcanvas/splat-transform)** を使用してSOGファイルを作成し、**[PlayCanvas Viewer](https://playcanvas.com/viewer)** でプレビューできます。

このドキュメントはフォーマット仕様です。**バージョン3**について記述します。以前のバージョンは[SOGバージョン2](./sog-v2.md)で規定されており、8節に変更点をまとめています。

## 1. ファイルセット {#1-file-set}

SOGデータセットは、画像セットとメタデータファイルで構成されます。

| ファイル                 | 目的                                                  | チャンネル (8ビット) |
| -------------------- | ----------------------------------------------------- | ---------------- |
| `meta.json`          | シーンのメタデータとファイル名                           | —                |
| `means_l.webp`       | 位置 – 下位8ビット (RGB) + 回転バイト0 (A)               | R,G,B,A          |
| `means_u.webp`       | 位置 – 上位8ビット (RGB) + 回転バイト1 (A)               | R,G,B,A          |
| `scales.webp`        | コードブックによる軸ごとのサイズ (RGB) + 回転バイト2 (A)   | R,G,B,A          |
| `sh0.webp`           | 基本色 (DC) + 不透明度                                  | R,G,B,A          |
| `shN_centroids.webp` | SHパレット係数 (オプション)                              | R,G,B            |
| `shN_labels.webp`    | SHパレットへのインデックス (オプション)                    | R,G,B            |
| `blind_<i>.webp`     | Gaussianごとのブラインドデータ、ブラインドテクスチャごとに1ファイル (オプション) | R,G,B,A のうち1～4 |

:::note[画像フォーマット]

* デフォルトでは、量子化された値を正確に保持するために、画像は**ロスレスWebP**に**すべきです**。
* `meta.json` 内の各プロパティは自身のファイル名を指定するため、他の8ビットRGBA対応フォーマットを使用**してもかまいません**。
* これらのアセットに非可逆エンコーディングを使用しないでください。非可逆圧縮は値を破壊し、目に見える/構造的なアーティファクトを生成する可能性があります。
* 多くのロスレスWebPエンコーダーは、保持するよう指定しない限り（libwebpの `exact` オプション）、完全に透明なピクセル（alpha = 0）のRGB値を破棄します。回転バイトが0になることはありません（3.2節）が、フィールドがAバイトを使用するブラインドテクスチャ（3.7節）はアルファ0を含むことがあるため、アルファが0でもRGBを保持するようにエンコード**しなければなりません**。

:::

### 1.1 画像の寸法とインデックス {#11-image-dimensions--indexing}

すべてのGaussianごとのプロパティは共存しています。すべてのプロパティ画像（shN_centroidsを除く）における同じピクセル (x, y) は、同じGaussianに属します。

* ピクセルは**行優先**で配置され、原点は**左上**です。
* 画像の幅を `W`、高さを `H` とすると、アドレス指定可能なGaussianの数は `W*H` です。
* `meta.count` は `<= W*H` **でなければなりません**。末尾の余ったピクセルは無視されます。

**インデックスの計算 (0から始まる):**

* インデックスからピクセルへ:
  `x = i % W`, `y = floor(i / W)`
* ピクセルからインデックスへ:
  `i = x + y * W`

### 1.2 座標系 {#12-coordinate-system}

SOGは3DGSのPLYファイルと同じ座標系でGaussianを格納するため、位置、回転、SH係数は学習されたとおりに格納されます。

右手系で+yが上のワールド（例えばPlayCanvasでは −z が前方）にシーンを配置するには、シーンをz軸周りに180°回転させます。つまり `(x, y, z) → (−x, −y, z)` です。この回転はシーン全体に適用してください（例えば、シーンを保持するノードのトランスフォームとして）。回転とSH係数はファイルの座標系で定義されています（3.5.1節）。

### 1.3 バンドル版 {#13-bundled-variant}

バンドルされたSOGは、上記のファイルをZIP化したものです。リーダーは以下のいずれかのレイアウトを許容**すべきです**。

* **複数ファイルディレクトリ** (オーサリング時に推奨)
* アーカイブのルートに同じファイルを含む**単一アーカイブ** (例: `scene.sog`)

リーダーは、ZIPを解凍した後、複数ファイル版と全く同じように `meta.json` を使用してファイルを解決**しなければなりません**。

---

## 2. `meta.json` {#2-metajson}

```ts
interface Meta {
  version: 3;              // ファイルフォーマットのバージョン (整数)
  asset?: {                // オプションのツール/バージョンメタデータ
    generator?: string;    // 例: "splat-transform v1.2.3"
  };
  count: number;           // ガウス分布の数 (画像のW*H以下)
  model?: "antialiased" | "2dgs"; // オプション。シーンの学習方法 (3.8節)。通常のガウス分布の場合は省略

  means: {
    // *対数変換された*位置をデコードするための範囲 (3.1節参照)。
    mins: [number, number, number];   // nx,ny,nzの最小値 (対数領域)
    maxs: [number, number, number];   // nx,ny,nzの最大値 (対数領域)
    files: ["means_l.webp", "means_u.webp"]; // アルファチャンネル: 回転バイト0と1 (3.2節)
  };

  scales: {
    codebook: number[];    // 256個の浮動小数点数 (対数領域); 3.3節参照
    files: ["scales.webp"]; // アルファチャンネル: 回転バイト2 (3.2節)
  };

  sh0: {
    codebook: number[];    // 256個の浮動小数点数; ガンマ空間色のDC係数 (3.4節)
    files: ["sh0.webp"];   // アルファチャンネル: 不透明度バイト (3.4節)
  };

  // 不透明度が1を超えるGaussianがある場合のみ存在 (3.6節):
  opacity?: {
    max: number;           // 格納されている最大の不透明度。(1, 1.5625] の範囲
  };

  // 高次SHが存在する場合のみ存在:
  shN?: {
    count: number;         // パレットサイズ (最大16777216、3.5節)
    bands: number;         // SHバンドの数 (1..4)。DC (=バンド0) はsh0に格納されます。
    codebook: number[];    // 256個の浮動小数点数; すべてのAC係数で共有 (3.5節)
    files: [
      "shN_centroids.webp",// ピクセルとしてのAC係数パレット (3.5節)
      "shN_labels.webp"    // Gaussianごとのパレットインデックス (0..count-1)
    ];
  };

  // シーンがブラインドデータを持つ場合のみ存在: ブラインドテクスチャごとに1エントリ (3.7節)
  blind?: {
    files: [string];       // 例: "blind_0.webp"
    fields: {              // テクセルのバイト (R, G, B, A) に順にパックされる
      name: string;        // アプリケーション定義の名前。例: 元のPLYの列
      type: "u8" | "u16" | "u24" | "u32" | "f16" | "f32" | "unorm8" | "unorm16";
      range?: [number, number]; // unorm型のみ: コード0と最大コードが対応する値 (デフォルトは [0, 1])
    }[];
  }[];

  extras?: any;            // アプリケーション定義のJSON (4節)
  comments?: string[];     // 作成元による自由形式のコメント (5節)
}
```

:::note

* scalesコードブックは対数空間の値を含み、線形のサイズを得るには `exp()` を適用しなければなりません（3.3節）。sh0コードブックはガンマ空間のDC係数を含みます。shNコードブックはガンマ空間のAC係数を含みます。
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

両方の画像のアルファチャンネルは回転バイトを格納します（3.2節）。

### 3.2 向き {#32-orientation}

> `means_l.a`, `means_u.a`, `scales.a` (24ビットの指数写像)

クォータニオンのコンポーネントは、全体を通して **(w, x, y, z)** の順序です。

回転は単位球内の点 `p` として格納されます。これはクォータニオンの**指数写像**を、半回転（180°）が単位球面上に来るようにスケーリングしたもので、各成分は1バイトです。

* `means_l.a` は `p.x` を、`means_u.a` は `p.y` を、`scales.a` は `p.z` を格納します。
* 各バイト `b` は `(b − 128) / 127` に対応します。この格子はちょうど0に段階を持つため、恒等回転（バイト値128, 128, 128）は正確に表現されます。

```ts
const px = (means_l.a - 128) / 127;
const py = (means_u.a - 128) / 127;
const pz = (scales.a - 128) / 127;

const r = Math.hypot(px, py, pz);        // 0..1
const theta = (Math.PI / 2) * r;         // 回転角の半分
const k = r > 0 ? Math.sin(theta) / r : 0;

const q = [Math.cos(theta), px * k, py * k, pz * k]; // [w, x, y, z]、単位長
```

エンコード（参考）: `q` を正規化し、`w < 0` の場合は符号を反転し（`q` と `−q` は同じ回転です）、次のようにします。

```ts
const v = Math.hypot(x, y, z);
const k = v > 0 ? Math.atan2(v, w) / v / (Math.PI / 2) : 2 / Math.PI;
const toByte = (c: number) => Math.max(0, Math.min(255, Math.round(c * k * 127 + 128)));
// means_l.a = toByte(x), means_u.a = toByte(y), scales.a = toByte(z)
```

`|p| <= 1` であるため、エンコードされたバイトはすべて1以上となり、これらのアルファチャンネルが完全に透明になることはありません。デコードは常に単位クォータニオンを生成するため、`|p| > 1` となるバイトの組み合わせ（準拠したエンコーダーが生成することはありません）も有効な回転にデコードされます。

一様ランダムな回転に対して、このエンコーディングの最大誤差は約1.2°、RMS誤差は約0.6°です。

### 3.3 スケール {#33-scales}

> `scales.webp` (コードブックによるRGB)

軸ごとのサイズは**コードブックのインデックス**です。コードブックは**対数領域**の値を格納するため、デコードには指数関数が必要です。

```ts
const sx = Math.exp(meta.scales.codebook[scales.r]); // r,g,b は 0..255
const sy = Math.exp(meta.scales.codebook[scales.g]);
const sz = Math.exp(meta.scales.codebook[scales.b]);
```

解釈（例えば、主軸の標準偏差と全範囲）は、ソースのトレーニング設定に従います。デコード後（`exp` 適用後）の値は**シーン単位**です。

アルファチャンネルは回転バイトを格納します（3.2節）。

### 3.4 基本色 + 不透明度 (DC) {#34-base-color--opacity-dc}

> `sh0.webp` (RGBA)

`sh0` は、色チャンネルごとの**DC (l=0)** SH係数と**不透明度**を保持します。

* **R,G,B** は、`sh0.codebook` への0..255のインデックスです。
* **A** は不透明度バイトです。1を超える不透明度の値も許容されます（3.6節）。

DC係数を**ガンマ空間RGB**色に変換するには:

```ts
// SH_C0 = Y_0^0 = 1 / (2 * sqrt(pi))
const SH_C0 = 0.28209479177387814;

const r = 0.5 + meta.sh0.codebook[sh0.r] * SH_C0;
const g = 0.5 + meta.sh0.codebook[sh0.g] * SH_C0;
const b = 0.5 + meta.sh0.codebook[sh0.b] * SH_C0;
const a = (sh0.a / 204) ** 2;   // 線形の不透明度、0..1.5625
```

不透明度バイトは不透明度の平方根を格納し、`A = (b / 204)²` となります。平方根により、重なり合う半透明のレイヤーを構成する低い不透明度で細かな段階が得られます。バイト値204はちょうど `A = 1` で、学習済みシーンの飽和したGaussianはこの値になります。バイト値205～255は1を超える不透明度を表し、最大で `(255 / 204)² = 1.5625` です。

エンコード（参考）: `b = min(255, round(204 * sqrt(A)))` とし、`A <= 0` は0として格納します。1.5625を超える不透明度はクランプされます。

#### 3.4.1 色空間 {#341-color-space}

デコードされた色（DCと高次SH）は**sRGB**、つまりRec.709原色を用いたsRGB伝達関数であり、これは3DGSの学習が生成するものです。これはglTFの[`KHR_gaussian_splatting`](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_gaussian_splatting/README.md)における `srgb_rec709_display` に相当します。

色はディスプレイ基準（display-referred）です。シーンのライティング、露出、トーンマッピングは適用されません。ブレンドはsRGBで行われ、出力の色空間への変換はブレンドの後に行われます。

### 3.5 高次SH (オプション) {#35-higher-order-sh-optional}

> `shN_centroids.webp`, `shN_labels.webp`

存在する場合、高次 (AC) SH係数はパレットを介して格納されます。

* `shN.count` ∈ **\[1,2^24]** エントリの数。
* `shN.bands` ∈ **\[1,4]** エントリあたりのバンド数。

パレット画像は `ceil(count / 64)` 行であるため、リーダーは自身の最大テクスチャサイズによる制限を受けます。ライターは `count` ≤ 262144（4096行、すべてのWebGL2デバイスがサポートするサイズ）を維持**すべきです**。

#### セントロイド (パレット) {#centroids-palette}

* `shN_centroids.webp` はSH係数パレットを格納するRGB画像です。
* 常に1行あたり64エントリがあります。エントリは左上を原点として行優先でパックされます。

テクスチャ幅はバンドの数に依存します。

| バンド | 係数 | テクスチャ幅 (ピクセル) |
|---|---|---|
| 1 | 3 | 64 * 3 = 192 |
| 2 | 8 | 64 * 8 = 512 |
| 3 | 15 | 64 * 15 = 960 |
| 4 | 24 | 64 * 24 = 1536 |

球面調和関数エントリnおよび係数cのピクセル位置を計算する:

```ts
const coeffs = [3, 8, 15, 24];
const u = (n % 64) * coeffs[bands - 1] + c;
const v = Math.floor(n / 64);
```

#### ラベル {#labels}

* `shN_labels.webp` は、Gaussianごとに範囲 (0..count-1) の**24ビットインデックス**を格納します。

```ts
const index = shN_labels.r + (shN_labels.g << 8) + (shN_labels.b << 16);
```

#### デコード {#decoding}

各セントロイドピクセルの**R,G,B**チャンネルは、共有の `shN.codebook` への**コードブックインデックス** (0..255) です。3つのチャンネルは、SH係数の3つの色チャンネルに対応します。

1つのGaussianのAC SH係数一式をデコードするには:

```ts
const coeffs = [3, 8, 15, 24];
const shCoeffs = coeffs[meta.shN.bands - 1];        // 色チャンネルあたりの係数の数
const codebook = meta.shN.codebook;                  // 256個の共有浮動小数点数エントリ

// 1. このGaussianのパレットエントリを調べる
const label = shN_labels.r + (shN_labels.g << 8) + (shN_labels.b << 16);

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

#### 3.5.1 基底と評価 {#351-basis-and-evaluation}

各色チャンネル内で、係数はバンド順に並びます。バンド1の3個の係数、次にバンド2の5個、バンド3の7個、バンド4の9個です。

係数は、3DGSのリファレンス実装とgsplatで使用されている、Condon–Shortley位相を含む実SH基底を使用します。バンド1～3は `KHR_gaussian_splatting`（Appendix A）と一致し、バンド4はgsplatのものです。色は、カメラからGaussianの中心への単位ベクトル `d` をファイルの座標系（1.2節）で表したものを用いて評価されます。

```ts
const [x, y, z] = d;                        // normalize(center - cameraPosition)
const xx = x * x, yy = y * y, zz = z * z;
const xy = x * y, yz = y * z, xz = x * z;

const basis = [
    // バンド1
    -0.4886025119029199 * y,
     0.4886025119029199 * z,
    -0.4886025119029199 * x,
    // バンド2
     1.0925484305920792 * xy,
    -1.0925484305920792 * yz,
     0.31539156525252005 * (2 * zz - xx - yy),
    -1.0925484305920792 * xz,
     0.5462742152960396 * (xx - yy),
    // バンド3
    -0.5900435899266435 * y * (3 * xx - yy),
     2.890611442640554 * xy * z,
    -0.4570457994644658 * y * (4 * zz - xx - yy),
     0.3731763325901154 * z * (2 * zz - 3 * xx - 3 * yy),
    -0.4570457994644658 * x * (4 * zz - xx - yy),
     1.445305721320277 * z * (xx - yy),
    -0.5900435899266435 * x * (xx - 3 * yy),
    // バンド4
     2.5033429417967046 * xy * (xx - yy),
    -1.7701307697799304 * yz * (3 * xx - yy),
     0.9461746957575601 * xy * (7 * zz - 1),
    -0.6690465435572892 * yz * (7 * zz - 3),
     0.10578554691520431 * (zz * (35 * zz - 30) + 3),
    -0.6690465435572892 * xz * (7 * zz - 3),
     0.47308734787878004 * (xx - yy) * (7 * zz - 1),
    -1.7701307697799304 * xz * (xx - 3 * yy),
     0.6258357354491761 * (xx * (xx - 3 * yy) - yy * (3 * xx - yy)),
];

// 色チャンネルcごと。dcは3.4節、sh_channelは上記のもの
let color = 0.5 + 0.28209479177387814 * dc[c];
for (let k = 0; k < shCoeffs; k++) color += basis[k] * sh_channel[c][k];
color = Math.max(0, color);
```

レンダラーは、精度と引き換えに速度を得るために、ファイルに格納されているよりも少ないバンドを評価してもかまいません。シーンが回転している場合は、評価前に `d` をファイルの座標系に回転させる（上記のとおり）か、係数をバンドごとに回転させてください。

### 3.6 1を超える不透明度 {#36-opacity-above-1}

デシメーターが複数のGaussianを1つに統合する場合、統合されたGaussianは、不透明度1の標準的なGaussianが持てるよりも多くの総不透明度（「質量」）を持つ必要があることがよくあります。SOGはこれを `A > 1`（最大1.5625、3.4節）の不透明度として格納します。`meta.opacity.max` は、不透明度が1を超えるGaussianがある場合に限り存在し、その値は1より大きくなります。そのため、リーダーは画像を走査せずに判別できます。

フォーマットは `A` を、不透明度1の標準的なGaussianに対するそのGaussianの総質量としてのみ定義します。その質量をどのように描画するかはレンダリング上の選択です。プロファイルに関する情報はファイルに一切格納されないため、レンダラーは既存のファイルに影響を与えることなくプロファイルを変更・調整できます。

`A <= 1` のGaussianは標準的なGaussianとしてレンダリングされます。`A > 1` の場合、推奨されるプロファイル（PlayCanvasとSplatTransformで使用）は、Gaussianのフットプリントとピークアルファ1を維持し、**不透明なコア**を追加します。フットプリントの内側の割合 `u0` は完全に不透明で、Gaussianの通常の減衰は残りの部分に引き伸ばされます。`u0` は、プロファイルが標準的なGaussianのちょうど `A` 倍の質量を描画するように求められます。Gaussianを `c` σで打ち切り、カットオフでアルファが0になるように `f = exp(−c² / 2)` を減算するレンダラーの場合:

```ts
// レンダラーごと: カットオフc (σ単位) に対する定数
const f = Math.exp(-c * c / 2);
const g0 = Math.sqrt(Math.PI / 2) / c * erf(c / Math.SQRT2) - f;   // erf: 誤差関数
const g1 = (1 - f) / (c * c) - f / 2;
const qa = (1 - f) / 2 - g0 + g1;
const r0 = (g0 - 2 * g1) / (2 * qa);
const q = g1 / qa;

// Gaussianごと: カットオフに対する割合としてのコア半径 (A <= 1 の場合は0)
const t = Math.min(Math.max(A - 1, 0), 0.5625);
const u0 = Math.sqrt(r0 * r0 + q * t) - r0;
const peak = Math.min(A, 1);

// フラグメントごと。r = 中心からのマハラノビス距離 (σ単位)
const s = Math.max(0, r - u0 * c) / (1 - u0);
const alpha = peak * Math.max(0, Math.exp(-0.5 * s * s) - f);
```

* フットプリント、カリング、カットオフは標準的なGaussianのものと同じであるため、レンダラーの境界は変わりません。`A = 1` では `u0 = 0` となり、プロファイルは標準的なGaussianになります。
* アルファを `1 / (1 − f)` で再スケーリングするレンダラーも同じ定数を使用します。PlayCanvasエンジンは `c = 2√2` で打ち切り、`r0 = 0.53839315`、`q = 0.62504992`（`u0 <= 0.2625`）となります。SplatTransformのレンダラーは `c = 3` で打ち切ります（`u0 <= 0.24`）。

1を超える不透明度をサポートしないレンダラーは、`A` を1にクランプ**しなければなりません**。その場合、シーンは1を超える不透明度が格納される以前と同じようにレンダリングされます。

PLYに変換する際、ツールは、いずれかのガウシアンの不透明度が1を超える場合は `opacity` の代わりに `A` そのものをfloatプロパティ `opacity_linear` として出力し、それ以外の場合は標準の `opacity` ロジットを出力**すべきです**。つまり、PLYはどちらか一方のみを持ち、両方を持つことはありません。`opacity_linear` を見つけたリーダーは、`opacity` も存在する場合でも、それを不透明度として使用**しなければなりません**。`opacity_linear` を認識しないツールはこのようなPLYを読み取れません。変換ツールは、代わりに `A` を1にクランプして標準のロジットを出力するオプションを提供**してもかまいません**。

### 3.7 ブラインドデータ (オプション) {#37-blind-data-optional}

> `blind_<i>.webp` (ブラインドテクスチャごとに1ファイル、それぞれGaussianあたり1～4バイト)

ブラインドデータは、Gaussianごとのアプリケーション定義データです（例えば、オブジェクトID、セグメントラベル、重みなど）。レンダラーはこれを解釈しませんが、シェーダーに公開することがあります。

`meta.blind` の各エントリは1つのRGBA8テクスチャを記述します。その `fields` は、テクスチャのGaussianあたり4バイト (R, G, B, A) に**順にパック**されます。最初のフィールドはバイト0 (R) から始まり、後続の各フィールドは前のフィールドが終わった位置から始まります。各フィールドはその `type` が必要とするバイト数を占め、リトルエンディアン（最下位バイトが先）で格納されます。

| `type` | バイト数 | 値 |
|--------|-------|-------|
| `u8`, `u16`, `u24`, `u32` | 1, 2, 3, 4 | 符号なし整数 |
| `f16` | 2 | IEEE 754 半精度浮動小数点数のビット |
| `f32` | 4 | IEEE 754 単精度浮動小数点数のビット |
| `unorm8` | 1 | `min + (code / 255) * (max - min)`、`[min, max] = range` |
| `unorm16` | 2 | `min + (code / 65535) * (max - min)`、`[min, max] = range` |

* テクスチャのフィールドは、その4バイトに収まるように**しなければなりません**。
* `range` はunorm型にのみ適用され、デフォルトは `[0, 1]` です。ライターは `value` を `round((value - min) / (max - min) * 255)`（または `* 65535`）に量子化します。範囲外の値は格納できません。
* フィールド名は、すべてのブラインドテクスチャを通して一意に**しなければなりません**。また、シェーダー識別子に変換した後も一意かつ空でないように**しなければなりません**。この変換では、`A–Z`、`a–z`、`0–9`、`_` 以外の文字は `_` になり、連続する `_` は1つにまとめられ、先頭または末尾の `_` は削除されます。（PlayCanvasエンジンは、フィールド `name` を `getBlind_<identifier>()` としてシェーダーに公開し、`SOG_BLIND_<identifier>` を定義します。）
* PLYに変換する際、ツールは各名前をプロパティ名として使用**すべきです**。整数型には `uint` プロパティを、それ以外には `float` プロパティを使用します。
* 最後のフィールドより後のバイトは未使用です。ライターは、未使用のR、G、Bを0に、未使用のAを255に設定**すべきです**（画像が不透明のままになるように）。リーダーはそれらを無視**しなければなりません**。
* 各ブラインドテクスチャは、レンダラーがサンプリングするテクスチャが1つ増えることを意味します。ライターは、幅の狭いフィールドを共有テクスチャにパックして、ブラインドテクスチャを10個以下（すべてのWebGL2デバイスがバインドできる数）に制限**すべきです**。

```ts
// テクセル (u, v) のGaussianについて、テクスチャtのフィールドj
const bytesOf = { u8: 1, u16: 2, u24: 3, u32: 4, f16: 2, f32: 4, unorm8: 1, unorm16: 2 };
const fields = meta.blind[t].fields;
let offset = 0;
for (let k = 0; k < j; k++) offset += bytesOf[fields[k].type];

const px = blind[t].pixel(u, v);           // [r, g, b, a]
let code = 0;
for (let k = 0; k < bytesOf[fields[j].type]; k++) code |= px[offset + k] << (8 * k);
code >>>= 0;                               // 符号なし32ビット
```

1節で述べたとおり、フィールドがAバイトを使用するブラインドテクスチャはアルファ0のピクセルを含むことがあり、アルファが0でもRGBが保持されるようにエンコード**しなければなりません**。

PlayCanvasでは、スプラットをワークバッファにコピーする際にシェーダーがブラインドフィールドを読み取ります。[SOGブラインドデータの読み取り](/user-manual/gaussian-splatting/rendering-architecture/work-buffer-format#reading-sog-blind-data)を参照してください。

### 3.8 スプラットモデル {#38-splat-model}

`model` は、シーンがどのように学習されたかを記録し、それによってシーンをどのようにレンダリングしなければならないかが決まります。通常の3D Gaussianの場合は省略されます。

* `"antialiased"`: スクリーン空間のアンチエイリアスフィルター（Mip-Splattingの2Dフィルター）を用いて学習されたもの。レンダラーは、投影された各Gaussianに通常の0.3 px²の膨張の代わりにそのフィルターを適用し（2D共分散Σの対角成分に加算します）、フィルター適用前のGaussianの質量を描画するように、その不透明度を `sqrt(det Σ / det(Σ + filter))` でスケーリング**すべきです**。このスケーリングは、1を超える不透明度のプロファイル（3.6節）の前に適用してください。フィルターのサイズは格納されません。0.1 px²（Mip-Splattingの値で、Brush、LichtFeld Studio、Spirulaが使用）がPlayCanvasとSplatTransformのデフォルトで、どちらでも上書きできます。PlayCanvasがこれらのシーンをどのように検出してレンダリングするかについては、[アンチエイリアス](../building/anti-aliasing.md)を参照してください。
* `"2dgs"`: 2D Gaussian Splattingのサーフェル。3番目のスケールが厚さゼロの軸です。

---

## 4. エクストラ {#4-extras}

`extras` は `meta.json` のオプションのトップレベルプロパティで、glTFの `extras` と同じ考え方で**アプリケーション定義のJSON**を保持します。任意のJSON値にできますが、オブジェクトを推奨します。

* リーダーは `extras` の存在を要求**してはなりません**。また、`extras` をそのままアプリケーションに公開**すべきです**。
* SOGを変換または処理するツールは、`extras` を出力に保持**すべきです**。複数のシーンを結合するツールは、すべての入力が同一のextrasを持つ場合にのみ `extras` を保持**すべきです**。

---

## 5. コメント {#5-comments}

`comments` はオプションのトップレベル配列で、**作成元による自由形式のコメント**を保持します。例えば、シーンの変換元となったPLYのヘッダーの `comment` 行です（例: `"Postshot v1.1.69"` や `"postshot.color.eotf=sRGB"`）。

* コメントは情報提供を目的とします。リーダーは、コメントの存在を要求したり、コメントからレンダリングの動作を導き出したり**してはなりません**。シーンのレンダリング方法を変えるものには、それぞれ専用のプロパティがあります（例えば `model`）。
* ツールは変換時に `comments` を変更せずに保持し、PLYに変換する際にはPLYの `comment` 行として出力**すべきです**（コメント内の改行はスペースになります）。`model` のようにファイルが既に記録しているプロパティを繰り返すだけのコメントや、ツール自身のgenerator行を繰り返す必要はありません。
* コメントは解釈されないため、座標を記述するコメント（原点のオフセット、上方向の軸など）は、ツールがシーンを変換しても更新されません。
* 複数のシーンを結合するツールは、すべての入力が同一のコメントを持つ場合にのみ `comments` を保持**すべきです**。

---

## 6. `meta.json`の例 {#6-example-metajson}

```json
{
  "version": 3,
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
  "sh0": {
    "codebook": [/* 256個の浮動小数点数 */],
    "files": ["sh0.webp"]
  },
  "opacity": {
    "max": 1.5625
  },
  "shN": {
    "count": 65536,
    "bands": 3,
    "codebook": [/* 256個の浮動小数点数 */],
    "files": ["shN_centroids.webp", "shN_labels.webp"]
  },
  "blind": [
    {
      "files": ["blind_0.webp"],
      "fields": [
        { "name": "segment", "type": "u16" },
        { "name": "weight", "type": "unorm8" },
        { "name": "depth", "type": "unorm8", "range": [0.5, 40] }
      ]
    }
  ],
  "extras": { "capturedBy": "rig-04" },
  "comments": ["Postshot v1.1.69", "postshot.color.eotf=sRGB"]
}
```

---

## 7. バージョン管理と互換性 {#7-versioning--compatibility}

* リーダーは `version` を確認**しなければなりません**。このドキュメントは**バージョン3**を記述しており、[バージョン2](./sog-v2.md)は別途規定されています。リーダーはサポートしていないバージョンを拒否**すべきです**。
* 将来のバージョンで追加のオプションプロパティが現れる可能性があります。リーダーは認識できないフィールドを無視**すべきです**。
* バージョン3のファイルは、損失なしにバージョン2として格納することはできません。バージョン2を書き出す際、ツールは不透明度を1にクランプし、ブラインドデータを削除し、SHを3バンドに、SHパレットを65536エントリに削減して、それぞれについて警告**すべきです**。

---

## 8. バージョン2からの変更点 {#8-changes-from-version-2}

| 領域 | バージョン2 | バージョン3 |
|---|---|---|
| 回転 | `quats.webp`：26ビットのsmallest-three | `means_l`、`means_u`、`scales` のアルファチャンネルに格納する24ビットの指数写像（3.2節）。`quats.webp` と `meta.quats` は削除 |
| 不透明度 | `sh0.a / 255`、最大1 | `(sh0.a / 204)²`、最大1.5625。1を超える場合は `meta.opacity.max`（3.4節、3.6節） |
| SHバンド | 1–3 | 1–4（3.5節） |
| SHパレット | 最大65536エントリ、16ビットのラベル | 最大2^24エントリ、24ビットのラベル（3.5節） |
| ブラインドデータ | — | `meta.blind` で記述される、オプションのブラインドテクスチャ `blind_<i>.webp`（3.7節） |
| エクストラ | — | オプションの `extras`：アプリケーション定義のJSON（4節） |
| コメント | — | オプションの `comments`：作成元による自由形式のコメント（5節） |

それ以外（位置、スケール、DC色、SHパレットのレイアウト、インデックス、バンドル）は変更ありません。

---

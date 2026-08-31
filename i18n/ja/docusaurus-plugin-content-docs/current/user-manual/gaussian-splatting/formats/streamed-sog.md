---
title: Streamed SOGフォーマット
sidebar_label: Streamed SOG
description: "Streamed SOGの仕様：lod-meta.jsonの構成、空間ツリー、LODチャンク参照、環境スプラットです。"
---

**Streamed SOG** は、Gaussian Splatシーンを複数の詳細度（LOD）の空間チャンクに分割します。ビューアは空間ツリーを走査して、現在のカメラに対して読み込むチャンクと詳細度を決定します。これにより、非常に大きなシーン（数千万のGaussian）をプログレッシブに読み込み、インタラクティブ性を維持できます。

**[SplatTransform](https://github.com/playcanvas/splat-transform)** を使用してStreamed SOGデータセットを作成できます。手順については[Streamed SOGの生成](/user-manual/splat-transform/streamed-sog)を参照してください。個々のチャンクは標準の[SOG](./sog.md)データセットです。

このドキュメントはフォーマット仕様です。**バージョン1**について説明します。

## 1. ファイルセット

Streamed SOGデータセットは、単一のインデックスファイルとチャンクごとのサブディレクトリを含むディレクトリです。

```none
scene/
├── lod-meta.json        # インデックス: シーン情報 + 空間ツリー (本仕様)
├── 0_0/                 # LOD 0, チャンク0 — unbundled SOG (meta.json + .webpテクスチャ)
│   ├── meta.json
│   └── *.webp
├── 0_1/                 # LOD 0, チャンク1
├── 1_0/                 # LOD 1, チャンク0
├── …                    # {lod}_{chunk} ごとに1ディレクトリ
└── env/                 # オプションの環境スプラット — unbundled SOG
```

* インデックスファイルの名前は常に `lod-meta.json` です。ローダーはこのファイル名でフォーマットを識別します。
* 各チャンクは標準の **unbundled** な[SOG](./sog.md)データセット（`meta.json` とWebPテクスチャファイル）です。バンドルされた（単一アーカイブの）SOGチャンクはこのフォーマットには含まれません。
* `lod-meta.json` 内のすべてのパスは、`lod-meta.json` を含むディレクトリからの相対パスです。

:::note[チャンクの命名]

`{lod}_{chunk}/` というディレクトリ名はライターの慣例です。リーダーは命名パターンではなく、`filenames` 配列を通じてチャンクの場所を解決**しなければなりません**。

:::

---

## 2. `lod-meta.json`

```ts
interface LodMeta {
  version: 1;                  // ファイルフォーマットのバージョン (整数)
  asset?: {                    // オプションのツール/バージョンメタデータ
    generator?: string;        // 例: "splat-transform v2.5.2"
  };
  count: number;               // 全LODレベルにわたるGaussianの総数 (環境を除く)
  counts: number[];            // LODレベルごとのGaussian数; インデックス = LODレベル, 長さ = lodLevels
  lodLevels: number;           // LODレベルの数
  lodErrors?: boolean;         // trueの場合、すべてのリーフがレベルごとの `errors` を持つ
  environment?: string;        // 環境SOGのmeta.jsonへの相対パス; 存在しない場合は省略
  filenames: string[];         // チャンクSOGのmeta.jsonへの相対パス。インデックスで参照される
  tree: Node;                  // 空間ツリーのルート
}

interface Node {
  bound: {
    min: [number, number, number];   // AABBの最小値 [x, y, z]
    max: [number, number, number];   // AABBの最大値 [x, y, z]
  };
  children?: [Node, Node];     // 内部ノード: 常にちょうど2つの子ノード
  lods?: {
    [lodLevel: string]: {      // リーフノード: LODレベル → スプラット範囲のマップ
      file: number;            // filenamesへのインデックス
      offset: number;          // チャンク内の最初のスプラットのインデックス
      count: number;           // 連続するスプラットの数
    };
  };
  errors?: number[];           // リーフノード: レベルごとの近似誤差; インデックス = LODレベル
}
```

---

## 3. 空間ツリー

`tree` はシーンの二分空間分割です。すべてのノードは軸並行境界ボックス（AABB）を持ち、**内部ノード**（`children` を持つ。常にちょうど2つ）または**リーフノード**（`lods` を持つ）のいずれかです。両方を持つことはありません。

* リーフの `bound` は、割り当てられたすべてのGaussianの完全な広がりを囲みます。Gaussianの中心位置だけでなく、回転・スケールされた楕円体で拡張された範囲です。
* 内部ノードの `bound` は、子ノードのboundの和集合です。
* boundは、チャンクSOGファイルに格納されたスプラット位置と同じ座標系で表現されます。

### 3.1 LODレベル

LODレベル `0` が最高詳細度で、レベルが上がるほど粗くなります。リーフの `lods` オブジェクトのキーは、LODレベルの10進文字列表現（`"0"` … `"lodLevels - 1"`）です。キーが存在しない場合、そのリーフはそのレベルにスプラットを持ちません。

リーフのすべてのLODレベルは同じ空間領域をカバーします。ビューアは、例えばカメラからの距離に基づいて、リーフごとに1つのレベルを選択します。

### 3.2 チャンク参照

各 `lods` エントリは、1つのチャンク内の連続したスプラット範囲を指します。

* `file` はトップレベルの `filenames` 配列へのインデックスです。
* `offset` と `count` は、チャンクの格納順におけるスプラット `[offset, offset + count)` を選択します（バイトではなくスプラットインデックス）。チャンクのSOGテクスチャでは、格納順は行優先のピクセル順であり、スプラット `i` はピクセル `(i % W, floor(i / W))` に位置します。

チャンクファイルの内容は、それを参照するリーフ範囲を連結したものと正確に一致します。範囲は重複せず、チャンク全体をカバーします。各範囲内では、空間的局所性のためにスプラットはモートン順にソートされています。範囲の境界を越えた順序は保証されません。1つのチャンクには単一のLODレベルのスプラットのみが含まれます。

### 3.3 LOD誤差

トップレベルの `lodErrors` フラグが `true` の場合、すべてのリーフは `errors` 配列を持ちます。これは、各LODレベルが最高詳細度の表現からどれだけ逸脱しているかをLODレベルをインデックスとして表したものです。誤差は有限かつ非負で、レベルが上がるにつれて単調非減少であり、レベル `0` は通常 `0` です。意味を持つのは相対的な大小関係のみです。ビューアはこれを使って、どの領域がより細かいレベルから最も恩恵を受けるかを判断します（PlayCanvasエンジンは、スプラット1つあたりの誤差削減量に基づいてスプラット予算を割り当てます）。リーフが持たないレベルに対応するエントリは無視されます。

これらの値を書き出すツールには [SplatTransform](/user-manual/splat-transform) 3.3以降があります。リーダーは、`lodErrors: true` を持たないマニフェストを誤差データなしとして扱い、独自のヒューリスティック（例えば、レベルごとのスプラット数から誤差を導出するなど）にフォールバックする**べきです（SHOULD）**。

---

## 4. 環境

オプションの `environment` フィールドは、LOD/チャンクストリーミングの対象外のスプラット（通常は空などの遠景）を含む標準のunbundledな[SOG](./sog.md)データセットを指します。ビューアは、空間ツリーとは無関係に、環境を無条件に読み込んでレンダリング**すべきです**。

---

## 5. 精度

`lod-meta.json` 内の非整数値は、有効数字7桁（約32ビット浮動小数点精度）に量子化されます。

---

## 6. `lod-meta.json` の例

環境を持つ2レベルのシーンを、1つの内部ノードと2つのリーフに分割した例:

```json
{
  "version": 1,
  "asset": { "generator": "splat-transform v2.5.2" },
  "count": 1500000,
  "counts": [1000000, 500000],
  "lodLevels": 2,
  "lodErrors": true,
  "environment": "env/meta.json",
  "filenames": [
    "0_0/meta.json",
    "1_0/meta.json"
  ],
  "tree": {
    "bound": { "min": [-10, 0, -10], "max": [10, 5, 10] },
    "children": [
      {
        "bound": { "min": [-10, 0, -10], "max": [0.5, 5, 10] },
        "lods": {
          "0": { "file": 0, "offset": 0, "count": 600000 },
          "1": { "file": 1, "offset": 0, "count": 300000 }
        },
        "errors": [0, 0.8127411]
      },
      {
        "bound": { "min": [0.5, 0, -10], "max": [10, 4.5, 10] },
        "lods": {
          "0": { "file": 0, "offset": 600000, "count": 400000 },
          "1": { "file": 1, "offset": 300000, "count": 200000 }
        },
        "errors": [0, 1.244906]
      }
    ]
  }
}
```

---

## 7. バージョン管理と互換性

* この仕様に準拠するファイルは `version: 1` を持ちます。リーダーはより大きなメジャーバージョンのファイルを拒否**すべきです**。
* フォーマットがバージョン管理される前に生成されたファイルは、`version`、`asset`、`count`、`counts` を省略しており、`"environment": null` を含む場合があります。これらをサポートするリーダーは、`version` の欠落をプレリリースとして扱い、`environment: null` を環境なしとして扱う**べきです**。
* 未知のフィールドは無視される**べきです**。これにより、バージョンを上げずに小規模な追加的変更が可能になります。

---

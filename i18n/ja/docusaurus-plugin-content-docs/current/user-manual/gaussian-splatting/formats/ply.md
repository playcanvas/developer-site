---
title: PLY フォーマット
sidebar_label: PLY
---

[PLY](https://en.wikipedia.org/wiki/PLY_(file_format))（ポリゴンファイルフォーマット）は、3D Gaussian Splat データを保存するための標準的なファイルフォーマットです。PLY は 1990 年代から 3D メッシュデータを保存するフォーマットとして存在してきましたが、Gaussian Splatting での使用は、独自の特性と考慮事項を持つ特殊なアプリケーションを表しています。

## PLY フォーマットとは？

PLY は、スタンフォード大学によって 3D スキャナーデータを保存するために設計された、シンプルで柔軟なファイルフォーマットです。頂点、面、色、カスタムプロパティなど、さまざまな種類の 3D ジオメトリを保存できます。このフォーマットは、ASCII（人間が読めるテキスト）とバイナリエンコーディングの両方をサポートしています。

## ファイル構造

3D Gaussian Splat データを含む PLY ファイルは、主に以下の 3 つのセクションで構成されています。

### ヘッダー

```none
ply
format binary_little_endian 1.0
element vertex 500000
property float x
property float y
property float z
property float scale_0
property float scale_1
property float scale_2
property float rot_0
property float rot_1
property float rot_2
property float rot_3
property float opacity
property float f_dc_0
property float f_dc_1
property float f_dc_2
property float f_rest_0
property float f_rest_1
...
property float f_rest_44
end_header
```

### 要素の定義

ヘッダーは、要素（通常、個々の Gaussian Splat を表す頂点）の構造とプロパティを定義します。

### データセクション

実際のバイナリまたは ASCII データはヘッダーに続き、各要素のすべてのプロパティの値を含みます。

## 3DGS PLY は通常の PLY とどう異なるか

標準的な PLY ファイルは通常、位置や色のような基本的なプロパティを持つシンプルなメッシュジオメトリを保存します。3D Gaussian Splat PLY ファイルは根本的に異なります。

### 拡張プロパティ

3DGS PLY ファイルには、各 Gaussian Splat 用の特殊なプロパティが含まれています。

- **位置** (`x`、`y`、`z`)：Splat の中心の 3D 位置
- **スケール** (`scale_0`、`scale_1`、`scale_2`)：各軸に沿った Gaussian のサイズ
- **回転** (`rot_0`、`rot_1`、`rot_2`、`rot_3`)：Splat の向きを表す Quaternion
- **不透明度**：透明度/アルファ値
- **球面調和係数**：2つのプロパティセットを使用した、視点に依存する色のエンコーディング。
  - **直接色成分** (`f_dc_0`、`f_dc_1`、`f_dc_2`)：0次球面調和係数を表す基本色値（RGB）。これらは Splat の主要な色を定義します。
  - **高次係数** (`f_rest_0` から `f_rest_44`)：視線方向に基づいて色がどのように変化するかをエンコードする追加の球面調和係数。これら 45 個の係数は、高次バンドにわたって分布しています。
    - **1次**: 3 係数 × 3 カラーチャネル = 9 係数
    - **2次**: 5 係数 × 3 カラーチャネル = 15 係数
    - **3次**: 7 係数 × 3 カラーチャネル = 21 係数

### 従来のジオメトリなし

メッシュトポロジを定義する頂点と面を含む通常の PLY ファイルとは異なり、3DGS PLY ファイルは、接続情報のない点データのみを含みます。各「頂点」は独立した Gaussian Splat を表します。

### 膨大な点数

3DGS PLY ファイルは通常、数十万から数百万の点を含み、一般的なメッシュの頂点数をはるかに上回ります。

## ソースフォーマットとしての PLY

3DGS ワークフローにおける PLY ファイルは、画像の PSD ファイルやビデオ編集のプロジェクトファイルのように考えてください。

### 非圧縮かつ完全

- 品質劣化のない完全な精度データを含む
- すべての Gaussian Splat パラメータを元の形式で保持する
- 劣化なく再処理や最適化を可能にする

### アーカイブとバックアップ

- 3DGS キャプチャの長期保存に不可欠
- 改善されたアルゴリズムでの将来の再処理を可能にする
- 3D シーンの規範的なバージョンとして機能する

### 品質参照

- PLY ファイルを最高品質のリファレンスとして保持する
- 特定のユースケースのために PLY から圧縮フォーマットを生成する
- 品質比較のために常に元の PLY を保持する

## 交換フォーマットとしての PLY

PLY フォーマットは、3DGS エコシステムの共通語として機能します。

### ユニバーサルな互換性

- **トレーニングソフトウェア**：Brush、nerfstudio、Postshot
- **エディタ**：[SuperSplat Editor](../editing/supersplat/index.md)
- **コンバーター**：[SplatTransform](../editing/splat-transform.md)
- **ビューア**：[SuperSplat Viewer](https://github.com/playcanvas/supersplat-viewer)、[Model Viewer](https://github.com/playcanvas/model-viewer)

### クロスプラットフォームワークフロー

- 異なる 3DGS トレーニングパイプライン間でアセットを移動する
- ツールチェーンに関係なく、共同作業者とデータセットを共有する
- 異なる処理段階全体で一貫性を維持する

### 研究開発

- 学術研究や論文提出の標準フォーマット
- 異なる実装間での再現可能な結果を可能にする
- アルゴリズム開発と比較を促進する

## ランタイムの考慮事項

PLY はソースおよび交換目的には優れていますが、リアルタイムアプリケーションには重大な制限があります。

### ファイルサイズの問題

- **非圧縮**：データ圧縮がないため、巨大なファイルサイズになる
- **一般的なサイズ**：シーンあたり 50MB から数 GB に及ぶことがある
- **ネットワーク転送**：前処理なしではウェブ配信に非実用的
- **ストレージコスト**：クラウドストレージと CDN 配信には高価

### ロードパフォーマンス

- **パース時間**：テキストパース（ASCII PLY）は特に遅い
- **メモリ使用量**：ファイル全体をメモリにロードする必要がある
- **初期化**：プログレッシブローディングやストリーミング機能がない

:::tip

[SplatTransform](../editing/splat-transform.md) ツールを使用して、PLY をより効率的なランタイムフォーマットに変換してください。現在、最高の圧縮率と最速のロード時間を実現するために、Self-Organizing Gaussians（別名 SOGS）をお勧めしています。

:::

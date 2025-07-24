---
title: PLYフォーマット
sidebar_position: 3
---

[PLY](https://en.wikipedia.org/wiki/PLY_(file_format))（Polygon File Format）は、3D Gaussian Splatデータを保存するための標準ファイルフォーマットです。PLYは1990年代から3Dメッシュデータを保存するフォーマットとして存在していましたが、Gaussian Splattingにおけるその使用は、独自の特性と考慮事項を持つ特殊なアプリケーションを表しています。

## PLYフォーマットとは？

PLYは、スタンフォード大学が3Dスキャナーデータを保存するために元々設計した、シンプルで柔軟なファイルフォーマットです。頂点、面、色、カスタムプロパティなど、様々な種類の3Dジオメトリを保存できます。このフォーマットは、ASCII（人間が読めるテキスト）とバイナリエンコーディングの両方をサポートしています。

## ファイル構造

3D Gaussian Splatデータを含むPLYファイルは、主に以下の3つのセクションで構成されています。

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

ヘッダーは、要素（通常、個々のGaussian splatを表す頂点）の構造とプロパティを定義します。

### データセクション

実際のバイナリまたはASCIIデータはヘッダーに続き、各要素の各プロパティの値が含まれています。

## 3DGS PLYが通常のPLYとどう異なるか

標準的なPLYファイルは通常、位置や色などの基本的なプロパティを持つシンプルなメッシュジオメトリを保存します。3D Gaussian Splat PLYファイルは根本的に異なります。

### 拡張プロパティ

3DGS PLYファイルには、各Gaussian splatに特化したプロパティが含まれています。

-   **位置** (`x`, `y`, `z`): スプラット中心の3D位置
-   **スケール** (`scale_0`, `scale_1`, `scale_2`): 各軸に沿ったガウスのサイズ
-   **回転** (`rot_0`, `rot_1`, `rot_2`, `rot_3`): スプラットの向きを表すクォータニオン
-   **不透明度**: 透明度/アルファ値
-   **球面調和関数係数**: 2つのプロパティセットを使用した視点依存の色エンコーディング:
    -   **直接色成分** (`f_dc_0`, `f_dc_1`, `f_dc_2`): 0次球面調和関数係数を表す基本色値（RGB）。これらはスプラットの主色を定義します。
    -   **高次係数** (`f_rest_0` から `f_rest_44`): 視点方向に基づいて色がどのように変化するかをエンコードする追加の球面調和関数係数。これらの45個の係数は、高次バンドにわたって分布しています。
        -   **1次**: 3係数 × 3色チャンネル = 9係数
        -   **2次**: 5係数 × 3色チャンネル = 15係数
        -   **3次**: 7係数 × 3色チャンネル = 21係数

### 伝統的なジオメトリなし

メッシュトポロジーを定義する頂点と面を含む通常のPLYファイルとは異なり、3DGS PLYファイルには接続情報のない点データのみが含まれています。各「頂点」は独立したGaussian splatを表します。

### 大規模な点数

3DGS PLYファイルには通常、数十万から数百万の点が含まれており、一般的なメッシュの頂点数をはるかに超えます。

## ソースフォーマットとしてのPLY

3DGSワークフローにおけるPLYファイルを、画像のためのPSDファイルやビデオ編集のためのプロジェクトファイルのように考えてください。

### 非圧縮で完全

-   品質劣化のないフル精度データを含む
-   すべてのGaussian splatパラメータを元の形式で保持
-   劣化なしに再処理および最適化が可能

### アーカイブとバックアップ

-   3DGSキャプチャの長期保存に不可欠
-   改善されたアルゴリズムでの将来の再処理を可能にする
-   3Dシーンの正規バージョンとして機能

### 品質リファレンス

-   PLYファイルを最高品質のリファレンスとして維持する
-   特定のユースケースのためにPLYから圧縮フォーマットを生成する
-   品質比較のために常に元のPLYを保管する

## 交換フォーマットとしてのPLY

PLYフォーマットは、3DGSエコシステムの共通言語として機能します。

### 普遍的な互換性

-   **トレーニングソフトウェア**: Brush、nerfstudio、Postshot
-   **エディター**: [SuperSplat Editor](../editing/supersplat/index.md)
-   **コンバーター**: [SplatTransform](../editing/splat-transform.md)
-   **ビューアー**: [SuperSplat Viewer](https://github.com/playcanvas/supersplat-viewer)、[Model Viewer](https://github.com/playcanvas/model-viewer)

### クロスプラットフォームワークフロー

-   異なる3DGSトレーニングパイプライン間でアセットを移動
-   使用するツールチェーンに関係なく、共同作業者とデータセットを共有
-   異なる処理段階で一貫性を維持

### 研究開発

-   学術研究および論文提出のための標準フォーマット
-   異なる実装間での再現可能な結果を可能にする
-   アルゴリズムの開発と比較を促進する

## ランタイムに関する考慮事項

PLYはソースおよび交換目的には優れていますが、リアルタイムアプリケーションには重大な制限があります。

### ファイルサイズの課題

-   **非圧縮**: データ圧縮がないため、ファイルサイズが非常に大きくなる
-   **典型的なサイズ**: シーンあたり50MBから数GBになることもあります
-   **ネットワーク転送**: 前処理なしではWeb配信には非実用的
-   **ストレージコスト**: クラウドストレージやCDN配信には高価

### ロードパフォーマンス

-   **パース時間**: テキストパース（ASCII PLY）は特に遅い
-   **メモリ使用量**: ファイル全体をメモリにロードする必要がある
-   **初期化**: プログレッシブロードやストリーミング機能がない

:::tip

[SplatTransform](../editing/splat-transform.md)ツールを使用して、PLYファイルをより効率的なランタイムフォーマットに変換してください。現在、最高の圧縮率と最速のロード時間を実現するために、Self-Organizing Gaussians (AKA SOGS)を推奨しています。

:::

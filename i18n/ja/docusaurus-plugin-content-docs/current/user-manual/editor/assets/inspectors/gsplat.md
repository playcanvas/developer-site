---
title: GSplat
---

GSplatアセットには3D Gaussian Splatデータが含まれています。PlayCanvasは[PLY](/user-manual/gaussian-splatting/formats/ply)ファイル（Compressed PLYを含む）および[SOG](/user-manual/gaussian-splatting/formats/sog)ファイルからのGSplatデータのインポートをサポートしています。

:::tip
[SOG形式](/user-manual/gaussian-splatting/formats/sog)は効率的な圧縮により、ファイルサイズが小さく、読み込み時間が短縮されるため推奨されます。
:::

## Inspector

[アセットパネル](/user-manual/editor/interface/assets)でGSplatアセットを選択し、[インスペクター](/user-manual/editor/interface/inspector)で表示できます。

![GSplat Asset Inspector](/img/user-manual/editor/assets/inspectors/asset-inspector-gsplat.png)

## Properties

METAセクションには、GSplatデータの主要なプロパティがリストされています。

| Property | Description |
|----------|-------------|
| Format | ファイル形式：PLY（`binary_little_endian 1.0`）、Compressed PLY、またはSOG（読み取り専用）。 |
| Splats | PLYファイルに保存されているGaussianの総数（読み取り専用）。 |
| SH Bands | 視点依存カラーに使用される球面調和関数のバンド数（読み取り専用）。 |
| Bound Min | 3D空間におけるGaussian Splatデータの最小境界（読み取り専用）。 |
| Bound Max | 3D空間におけるGaussian Splatデータの最大境界（読み取り専用）。 |

:::tip
スクリプトでこのアセットを使用するには、[Asset Attributes](/user-manual/scripting/script-attributes/esm/#asset-attribute)を参照してください。
:::

---
title: GSplat
---

GSplatアセットには3D Gaussian Splatデータが含まれています。PlayCanvasは[PLY](https://en.wikipedia.org/wiki/PLY_(file_format))ファイルからのGSplatデータのインポートをサポートしています。

## アセットインスペクター {#asset-inspector}

[アセットパネル](/user-manual/editor/interface/assets)でGSplatアセットを選択し、[インスペクター](/user-manual/editor/interface/inspector)で表示できます。

![GSplat アセットインスペクター](/img/user-manual/assets/types/asset-inspector-gsplat.png)

METAセクションには、データの主要なプロパティがいくつかリストされています。

| プロパティ | 説明 |
| -------- | ----------- |
| フォーマット   | PLYは `ascii 1.0`、`binary_little_endian 1.0`、および `binary_big_endian 1.0` をサポートしています |
| Splats   | PLYファイルに保存されているGaussianの総数 |
| プロパティ | PLYファイルに保存されているGaussianごとのプロパティのリスト（`x`、`y`、`z`、`opacity`など） |

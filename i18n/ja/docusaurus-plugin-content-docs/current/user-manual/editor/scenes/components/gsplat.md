---
title: GSplat
description: PlayCanvas の GSplat Component は Entity から 3D Gaussian splat の Asset をレンダリングし、splat を表示するレンダーレイヤーを選びます。
---

GSplatコンポーネントは、エンティティが3Dガウシアンスプラットをレンダリングできるようにします。

![GSplat Component](pathname:///img/user-manual/editor/scenes/components/component-gsplat.png)

## プロパティ

| プロパティ名 | 説明 |
|----------|-------------|
| Asset    | このGSplatコンポーネントでレンダリングするGSplatアセット。GSplatコンポーネントには1つのGSplatアセットのみ割り当てることができます。 |
| Cast Shadows | 有効にすると、シャドウキャスティングが有効なライトに対してスプラットがシャドウを落とします。 |
| LOD Base Distance | 最初のLOD遷移（LOD 0からLOD 1）の距離。この距離より近いスプラットは最高品質のLODでレンダリングされ、以降の各LODレベルは段階的に大きい距離で遷移します（LOD Multiplierでスケーリングされます）。デフォルトは5です。 |
| LOD Multiplier | 連続するLOD距離しきい値間の幾何学的な乗数。値が小さいほど遠くまで高品質を維持し、値が大きいほど早く粗いLODに切り替わります。デフォルトは3です。 |
| Layers   | このエレメントをレンダリングする[レイヤー](/user-manual/graphics/layers)。 |

## 関連項目

- [ガウシアンスプラッティング](/user-manual/gaussian-splatting) - 3Dガウシアンスプラットについて詳しく学ぶ

## スクリプトインターフェース

[Scriptコンポーネント](script.md)を使用してGSplatコンポーネントのプロパティを制御できます。GSplatコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/GSplatComponent.html)です。

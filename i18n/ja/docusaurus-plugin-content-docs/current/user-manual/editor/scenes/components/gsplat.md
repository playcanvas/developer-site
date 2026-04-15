---
title: GSplat
description: PlayCanvas の GSplat Component は Entity から 3D Gaussian splat の Asset をレンダリングし、splat を表示するレンダーレイヤーを選びます。
---

GSplatコンポーネントは、エンティティが3Dガウシアンスプラットをレンダリングできるようにします。

![GSplat Component](/img/user-manual/editor/scenes/components/component-gsplat.png)

## プロパティ

| プロパティ名 | 説明 |
|----------|-------------|
| Asset    | このGSplatコンポーネントでレンダリングするGSplatアセット。GSplatコンポーネントには1つのGSplatアセットのみ割り当てることができます。 |
| Layers   | このエレメントをレンダリングする[レイヤー](/user-manual/graphics/layers)。 |

## 関連項目

- [ガウシアンスプラッティング](/user-manual/gaussian-splatting) - 3Dガウシアンスプラットについて詳しく学ぶ

## スクリプトインターフェース

[Scriptコンポーネント](script.md)を使用してGSplatコンポーネントのプロパティを制御できます。GSplatコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/GSplatComponent.html)です。

---
title: Model (Legacy)
---

:::warning

Modelコンポーネントは非推奨です。これは[Render](render.md)コンポーネントに置き換えられました。

:::

Modelコンポーネントを使用すると、エンティティにプリミティブシェイプまたはモデルアセットをレンダリングすることができます。

![Model Component](/img/user-manual/editor/scenes/components/component-model.png)

## プロパティ

| プロパティ名 | 説明 |
|---------------------------|-------------|
| Type                      | レンダリングされるモデルのタイプ。Asset、Box、Capsule、Cone、Cylinder、Plane、Sphereのいずれか。 |
| Model                     | Assetタイプのみ。このモデルコンポーネントでレンダリングされるモデルアセット。モデルコンポーネントごとに1つのモデルのみレンダリング可能。 |
| Material                  | プリミティブタイプのみ。プリミティブシェイプのレンダリングに使用されるマテリアルアセット。 |
| Cast Shadows              | 有効にすると、このコンポーネントでレンダリングされるモデルがシーン内の他のモデルに影を投影します。 |
| Cast Lightmap Shadows     | 有効にすると、このコンポーネントでレンダリングされるモデルがライトマップに影を投影します。 |
| Receive Shadows           | 有効にすると、このコンポーネントでレンダリングされるモデルがシーン内の他のモデルからの影を受け取ります。 |
| Static                    | モデルが決して移動しない場合、エンジンが特定の最適化を行うためのヒントとしてこのボックスをチェックします。 |
| Lightmapped               | 有効にすると、このモデルは動的ライトからの照明を受け取らず、ライトマップライトによって生成された照明を受け取ります。 |
| Lightmap Size Multiplier  | このモデルの計算されたライトマップサイズに適用される乗数。より高解像度のライトマップには値を増やします。Lightmappedが有効な場合のみ表示されます。 |
| Custom AABB               | 有効にすると、自動計算されたものではなく、可視性カリング用のカスタム軸平行境界ボックスを指定できます。 |
| AABB Center               | カスタム境界ボックスの中心位置。Custom AABBが有効な場合のみ表示されます。 |
| AABB Half Extents         | カスタム境界ボックスの半径（半幅、半高さ、半奥行き）。Custom AABBが有効な場合のみ表示されます。 |
| Batch Group               | このモデルが属するバッチグループ。バッチングについては[こちら](/user-manual/graphics/advanced-rendering/batching)を参照してください。 |
| Layers                    | このモデルをレンダリングするレイヤー。 |

## 関連項目

- [Renderコンポーネント](render.md) - このコンポーネントの推奨される代替

## スクリプトインターフェース

[Scriptコンポーネント](script.md)を使用してModelコンポーネントのプロパティを制御できます。Modelコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/ModelComponent.html)です。

## マテリアルのカスタマイズ

モデルのマテリアルをカスタマイズする方法については、[こちら](/user-manual/editor/assets/inspectors/material/#assigning-materials)を参照してください。

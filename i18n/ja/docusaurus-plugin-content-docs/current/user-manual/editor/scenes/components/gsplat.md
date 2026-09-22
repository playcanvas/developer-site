---
title: GSplat
description: PlayCanvas の GSplat Component は Entity から 3D Gaussian splat の Asset をレンダリングし、splat を表示するレンダーレイヤーを選びます。
---

GSplatコンポーネントは、エンティティが3Dガウシアンスプラットをレンダリングできるようにします。

![GSplat Component](/img/user-manual/editor/scenes/components/component-gsplat.png)

<video autoPlay muted loop controls src='/video/editor-gsplat-lod-controls.mp4' style={{width: '100%', height: 'auto'}} />

*このページのスプラットシーン: Trogir, Croatia by tosolini、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。*

## プロパティ

| プロパティ名 | 説明 |
|----------|-------------|
| Asset    | このGSplatコンポーネントでレンダリングするGSplatアセット。GSplatコンポーネントには1つのGSplatアセットのみ割り当てることができます。 |
| Cast Shadows | 有効にすると、シャドウキャスティングが有効なライトに対してスプラットがシャドウを落とします。 |
| LOD Range Min | このガウシアンスプラットのレンダリングに使用する最小のLODレベル。整数、最小値は0。 |
| LOD Range Max | このガウシアンスプラットのレンダリングに使用する最大のLODレベル。整数、最小値は0。 |
| LOD Falloff | グローバルなスプラット予算の範囲内で、カメラ付近にどれだけ強く詳細を集中させるかを制御します。0では詳細が均等に分散されます。範囲は0から8。 |
| Layers   | このエレメントをレンダリングする[レイヤー](/user-manual/graphics/layers)。 |

:::note

**LOD Rangeは、ストリーミングされるSOGオクツリーにのみ効果があります。** LODレベルはアセットが実際に持つレベル数にクランプされ、単一の `.sog` ファイルや `.ply` ファイルは1レベルしかありません。フィールドは表示されたままですが、変更しても何も起こりません。

:::

<video autoPlay muted loop controls src='/video/editor-gsplat-lod-launch.mp4' style={{width: '100%', height: 'auto'}} />

これらのLOD設定が働く前提となるグローバルなスプラット予算を含め、シーン全体のガウシアンスプラットの動作は[レンダリング設定](/user-manual/editor/interface/settings/rendering#gaussian-splatting)で設定します。

## 関連項目

- [ガウシアンスプラッティング](/user-manual/gaussian-splatting) - 3Dガウシアンスプラットについて詳しく学ぶ
- [レンダリング設定](/user-manual/editor/interface/settings/rendering#gaussian-splatting) - シーン全体のガウシアンスプラット設定

## スクリプトインターフェース

[Scriptコンポーネント](script.md)を使用してGSplatコンポーネントのプロパティを制御できます。GSplatコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/GSplatComponent.html)です。

---
title: GSplat
description: PlayCanvas の GSplat Component は Entity から 3D Gaussian splat の Asset をレンダリングし、splat を表示するレンダーレイヤーを選びます。
---

GSplatコンポーネントは、エンティティが3Dガウシアンスプラットをレンダリングできるようにします。

![インスペクターのGSplatコンポーネント。Asset、Cast Shadows、LOD、Layersの各フィールドがあります](/img/user-manual/editor/scenes/components/component-gsplat.webp)

## プロパティ {#properties}

| プロパティ名 | 説明 |
|----------|-------------|
| Asset    | このGSplatコンポーネントでレンダリングする[GSplatアセット](/user-manual/editor/assets/inspectors/gsplat/)。GSplatコンポーネントには1つのGSplatアセットのみ割り当てることができます。 |
| Cast Shadows | 有効にすると、シャドウキャスティングが有効なライトに対してスプラットがシャドウを落とします。 |
| LOD Range Min | このガウシアンスプラットのレンダリングに使用する最小のLODレベル。整数、最小値は0。 |
| LOD Range Max | このガウシアンスプラットのレンダリングに使用する最大のLODレベル。整数、最小値は0。 |
| LOD Base Distance | スプラットがLOD 0からLOD 1に切り替わる、カメラからの距離（ワールド単位）。これより近いと、最高の詳細度でレンダリングされます。最小値は0.1、デフォルトは5。 |
| LOD Multiplier | 各LODの切り替え距離が、1つ前の切り替え距離の何倍になるか。LOD *n* は、基本距離に倍率の *n* − 1 乗を掛けた距離から始まります。値を大きくすると、カメラから離れても細かい詳細が保たれますが、メモリの使用量が増えます。最小値は1.2、デフォルトは3。 |
| Layers   | このエレメントをレンダリングする[レイヤー](/user-manual/graphics/layers)。 |

LODの距離はカメラの視野角に応じて補正されます。視野角が広いとスプラットが画面上で小さく見えるため、より早く粗いレベルに切り替わります。

:::note

**LODのフィールドは、ストリーミングされるSOGオクツリーにのみ効果があります。** LODレベルはアセットが実際に持つレベル数にクランプされ、単一の `.sog` ファイルや `.ply` ファイルは1レベルしかありません。フィールドは表示されたままですが、変更しても何も起こりません。

:::

<video autoPlay muted loop controls src='/video/editor-gsplat-lod-launch.mp4' style={{width: '100%', height: 'auto'}} />

*スプラットシーン: Trogir, Croatia by tosolini、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。*

これらのLOD設定が働く前提となるグローバルなスプラット予算を含め、シーン全体のガウシアンスプラットの動作は[レンダリング設定](/user-manual/editor/interface/settings/rendering#gaussian-splatting)で設定します。そこにある **Splat Budget Mode** によって、LODの距離の役割が決まります。

- **Target**（デフォルト）: カメラの位置にかかわらず、スプラット予算を使い切るまで詳細度が上がります。LODの距離は、距離に応じた詳細度の下がり方と、スプラット間での詳細度の配分だけを決めます。
- **Limit**: LODの距離が詳細度を決め、予算は収まるように詳細度を下げるときだけ使われます。

## 関連項目 {#see-also}

- [GSplatアセット](/user-manual/editor/assets/inspectors/gsplat/) - コンポーネントがレンダリングするスプラットデータと、インポートできるファイル形式
- [ガウシアンスプラッティング](/user-manual/gaussian-splatting) - 3Dガウシアンスプラットについて詳しく学ぶ
- [レンダリング設定](/user-manual/editor/interface/settings/rendering#gaussian-splatting) - シーン全体のガウシアンスプラット設定

## スクリプトインターフェース {#scripting-interface}

[Scriptコンポーネント](script.md)を使用してGSplatコンポーネントのプロパティを制御できます。GSplatコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/GSplatComponent.html)です。

---
title: Light
---

Lightコンポーネントは、エンティティに動的な光源をアタッチします。「Type」プロパティは、アタッチされる光源の種類と利用可能な他のプロパティを決定します。

#### Directional

![Light Component (Directional)](/img/user-manual/editor/scenes/components/component-light-directional.png)

#### Omni

![Light Component (Omni)](/img/user-manual/editor/scenes/components/component-light-omni.png)

#### Spot

![Light Component (Spot)](/img/user-manual/editor/scenes/components/component-light-spot.png)

## プロパティ

| プロパティ名 | 説明 |
|-----------------------|-------------|
| Type                  | ライトのタイプ。オプション：Directional（均一な方向）、Spot（ポイントからの円錐）、Omni（ポイントから全方向）。 |
| Color                 | 発光される光の色。 |
| Intensity             | 光の強度。光の色のスカラー値として機能します。範囲は0から32。 |
| Range                 | OmniとSpotのみ。光源からの寄与がゼロになる距離。 |
| Falloff Mode          | OmniとSpotのみ。光が位置から減衰する速度を制御します。オプション：Linear、Inverse Squared。 |
| Inner Cone Angle      | Spotのみ。光が減衰し始めるスポットライト方向からの角度（度）。 |
| Outer Cone Angle      | Spotのみ。光がゼロになるスポットライト方向からの角度（度）。 |
| Shape                 | エリアライティング用の光源の形状。オプション：Punctual、Rectangle、Disk、Sphere。レンダー設定でエリアライトが有効な場合のみ使用可能。 |

## ライトマッププロパティ

| プロパティ名 | 説明 |
|-----------------------|-------------|
| Static                | 最適化のためにこのライトを静的としてマークします。 |
| Bake Lightmap         | このライトからのライトマップベイクを有効にします。 |
| Bake Direction        | ベイクされたライトマップに方向情報を含めます。 |
| Bake Samples          | ライトマップをベイクする際に使用するサンプル数。範囲は1から255。 |
| Bake Area             | ソフトシャドウをベイクするための拡散角度。範囲は0から180度。 |
| Affect Lightmapped    | 有効にすると、このライトは実行時にライトマップされたオブジェクトに影響します。 |
| Affect Dynamic        | 有効にすると、このライトはライトマップされていない（動的な）オブジェクトに影響します。 |
| Affect Specularity    | Directionalのみ。有効にすると、このライトはマテリアルのスペキュラ反射に寄与します。 |

## シャドウプロパティ

| プロパティ名 | 説明 |
|-----------------------|-------------|
| Cast Shadows          | 有効にすると、ライトはシャドウキャスティングモデルに影を投影させます。 |
| Shadow Update Mode    | シャドウマップが更新されるタイミング。オプション：Once（一度だけ生成）、Realtime（毎フレーム更新）。 |
| Resolution            | シャドウマップの解像度。オプションは16x16から4096x4096まで。高い値はパフォーマンスコストと引き換えにより正確な影を生成します。 |
| Cascades              | Directionalのみ。シャドウカスケードの数。オプション：1、2、3、4。より多くのカスケードは異なる距離でより良いシャドウ品質を提供します。 |
| Cascade Distribution  | Directionalのみ。シャドウカスケードの分布を制御します。範囲は0から1。Cascadesが1より大きい場合のみ表示されます。 |
| Distance              | 影が見えなくなるカメラからの最大距離。 |
| Shadow Intensity      | 影の暗さ。範囲は0（影なし）から1（完全に暗い）。 |
| Shadow Type           | シャドウマッピングアルゴリズム。オプション：Shadow Map PCF 1x1、Shadow Map PCF 3x3、Shadow Map PCF 5x5、Variance Shadow Map (16bit)、Variance Shadow Map (32bit)。 |
| VSM Blur Mode         | VSMのみ。バリアンスシャドウマップのブラーアルゴリズム。オプション：Box、Gaussian。 |
| VSM Blur Size         | VSMのみ。ブラーカーネルのサイズ。範囲は1から25。 |
| VSM Bias              | VSMのみ。シャドウアーティファクトを軽減するためのバイアス値。 |
| Shadow Bias           | PCFのみ。シャドウアクネアーティファクトを軽減するためのバイアス値。 |
| Normal Offset Bias    | PCFのみ。ピーターパンニングアーティファクトを軽減するための法線方向オフセット。 |

## クッキープロパティ

| プロパティ名 | 説明 |
|-----------------------|-------------|
| Cookie                | OmniとSpotのみ。ライトから投影されるテクスチャアセット（Omniの場合はキューブマップ）。 |
| Cookie Intensity      | クッキーテクスチャの強度。範囲は0から1。 |
| Cookie Angle          | Spotのみ。クッキーテクスチャの回転角度（度）。 |
| Cookie Offset         | Spotのみ。クッキーテクスチャのUVオフセット。 |
| Cookie Scale          | Spotのみ。クッキーテクスチャのUVスケール。 |
| Cookie Falloff        | Spotのみ。有効にすると、スポットライトのフォールオフをクッキーに適用します。 |
| Cookie Channel        | クッキーに使用するテクスチャチャンネル。オプション：R、G、B、A、RGB。 |

## その他のプロパティ

| プロパティ名 | 説明 |
|-----------------------|-------------|
| Layers                | このライトが影響するレイヤー。 |

## 関連項目

- [物理ライティング](/user-manual/graphics/lighting/physical-lighting) - ライティング技術について学ぶ
- [ライトマッピング](/user-manual/graphics/lighting/lightmapping) - 静的ライティングのベイク

## スクリプトインターフェース

[Scriptコンポーネント](script.md)を使用してLightコンポーネントのプロパティを制御できます。Lightコンポーネントのスクリプトインターフェースは[こちら](https://api.playcanvas.com/engine/classes/LightComponent.html)です。

---
title: Material
---

マテリアルアセットは、レンダリング時のサーフェスの視覚的な外観を定義します。PlayCanvasは物理ベースレンダリング(PBR)を使用して、ライティングに正しく反応するリアルなマテリアルを作成します。マテリアルは、滑らかなプラスチックから粗い木材、光沢のある金属まで、幅広いサーフェスを表現できます。

## インスペクター

[アセットパネル](/user-manual/editor/interface/assets)でマテリアルアセットを選択し、[インスペクター](/user-manual/editor/interface/inspector)で表示できます。

![Material Inspector](/img/user-manual/editor/assets/inspectors/material/inspector.png)

マテリアルインスペクターは折りたたみ可能なセクションに分かれており、各セクションでマテリアルの外観の異なる側面を制御します。

## テクスチャトランスフォーム

すべてのテクスチャマップのUVオフセット、タイリング、回転を制御します。

![Texture Transform](/img/user-manual/editor/assets/inspectors/material/texture-transform.png)

| プロパティ | 説明 |
|----------|-------------|
| Apply To All Maps | 有効にすると、以下のオフセット、タイリング、回転の値がマテリアル内のすべてのテクスチャマップに適用されます。無効にすると、各マップに個別のトランスフォーム設定ができます。 |
| Offset | テクスチャマップに適用するUVオフセット (U, V)。 |
| Tiling | テクスチャマップに適用するUVスケール/タイリング (U, V)。 |
| Rotation | テクスチャマップに適用する回転角度(度)。 |

## アンビエント

マテリアルがアンビエントライティングとアンビエントオクルージョンにどのように反応するかを制御します。

![Ambient](/img/user-manual/editor/assets/inspectors/material/ambient.png)

| プロパティ | 説明 |
|----------|-------------|
| Ambient Occlusion | 事前にベイクされたアンビエントオクルージョンデータを含むテクスチャ。暗い領域はアンビエントライトを受けにくくなります。 |
| UV Channel | AOテクスチャのサンプリングに使用するUVセット (UV0 または UV1)。 |
| Color Channel | AO値を読み取るテクスチャチャンネル (R, G, B, または A)。 |
| Occlude Specular | AOがスペキュラー反射にどのように影響するかを制御: Off、Multiply、またはGloss Based。 |
| Vertex Color | テクスチャの代わりに頂点カラーをアンビエントオクルージョンに使用。 |
| Color | シーンのグローバルアンビエントカラーと乗算されるアンビエントティントカラー。 |
| Intensity | アンビエントオクルージョン効果の強度 (0-1)。 |

## ディフューズ

動的光源によって照らされたときのマテリアルの基本色を制御します。

![Diffuse](/img/user-manual/editor/assets/inspectors/material/diffuse.png)

| プロパティ | 説明 |
|----------|-------------|
| Diffuse | ピクセルごとの色を定義するディフューズ/アルベドテクスチャ。 |
| UV Channel | ディフューズテクスチャのサンプリングに使用するUVセット (UV0 または UV1)。 |
| Color Channel | 読み取るテクスチャチャンネル (R, G, B, A, または RGB)。 |
| Vertex Color | テクスチャの代わりに頂点カラーをディフューズに使用。 |
| Color | ディフューズカラー。テクスチャが設定されている場合、これがテクスチャをティントします。 |

## スペキュラー

マテリアルのスペキュラーハイライトと反射率を制御します。スペキュラーセクションは2つのワークフローをサポートしています: メタルネスとスペキュラー。

![Specular](/img/user-manual/editor/assets/inspectors/material/specular.png)

### 共通プロパティ

| プロパティ | 説明 |
|----------|-------------|
| Enable GGX Specular | ブラッシュドメタルなどのマテリアル用の異方性サポート付きGGXスペキュラーレスポンスを有効にします。 |
| Anisotropy | ピクセルごとの異方性方向を定義するテクスチャ (GGXが有効な場合に表示)。 |
| Anisotropy Intensity | 異方性効果の強度 (0-1)。 |
| Anisotropy Rotation | 異方性方向の回転角度(度)。 |
| Use Metalness | メタルネスワークフロー(PBR)とスペキュラーワークフロー(レガシー)を切り替えます。 |

### メタルネスワークフロー

Use Metalnessが有効な場合:

| プロパティ | 説明 |
|----------|-------------|
| Metalness | ピクセルごとのメタルネスを定義するテクスチャ。白 (1) は金属、黒 (0) は非金属。 |
| Vertex Color | テクスチャの代わりに頂点カラーをメタルネスに使用。 |
| Metalness | メタルネス係数 (0-1)。テクスチャがある場合は乗算されます。 |
| Use Specular Color and Factor | 非金属領域の追加スペキュラーカラー制御を有効にします。 |
| Specular | スペキュラーカラーテクスチャ (Use Specular Colorが有効な場合に表示)。 |
| Specularity Factor | ピクセルごとのスペキュラリティ係数用テクスチャ。 |

### スペキュラーワークフロー

Use Metalnessが無効な場合:

| プロパティ | 説明 |
|----------|-------------|
| Specular | ハイライトカラーを定義するスペキュラーカラーテクスチャ。 |
| Vertex Color | テクスチャの代わりに頂点カラーをスペキュラーに使用。 |
| Tint | 有効にすると、以下のカラーがスペキュラーテクスチャをティントします。 |
| Color | スペキュラーハイライトカラー。 |

### 光沢度

| プロパティ | 説明 |
|----------|-------------|
| Glossiness | ピクセルごとの光沢度/滑らかさを定義するテクスチャ。 |
| Vertex Color | テクスチャの代わりに頂点カラーを光沢度に使用。 |
| Glossiness | 光沢度/シャイニネス値 (0-100)。値が高いほど鋭い反射を作成します。 |
| Invert | グロスマップをラフネスマップとして扱います(値を反転)。 |

## エミッシブ

マテリアルサーフェスからの発光を制御します。

![Emissive](/img/user-manual/editor/assets/inspectors/material/emissive.png)

| プロパティ | 説明 |
|----------|-------------|
| Emissive | ピクセルごとの発光色を定義するテクスチャ。 |
| UV Channel | エミッシブテクスチャのサンプリングに使用するUVセット (UV0 または UV1)。 |
| Color Channel | 読み取るテクスチャチャンネル (R, G, B, A, または RGB)。 |
| Vertex Color | テクスチャの代わりに頂点カラーを発光に使用。 |
| Color | エミッシブカラー。テクスチャが設定されている場合、これがテクスチャをティントします。 |
| Intensity | エミッシブカラーの乗数。1以上の値でオーバーブライト/ブルーム効果を作成します。 |

## オパシティ

マテリアルの透明度とアルファテストを制御します。

![Opacity](/img/user-manual/editor/assets/inspectors/material/opacity.png)

| プロパティ | 説明 |
|----------|-------------|
| Blend Type | マテリアルが背景とどのようにブレンドされるか: None (不透明)、Alpha、Additive、Additive Alpha、Screen、Premultiplied Alpha、Multiply、Modulate 2x、Min、Max。 |
| Opacity | ピクセルごとの不透明度を定義するテクスチャ。 |
| UV Channel | オパシティテクスチャのサンプリングに使用するUVセット (UV0 または UV1)。 |
| Color Channel | 不透明度を読み取るテクスチャチャンネル (R, G, B, または A)。 |
| Vertex Color | テクスチャの代わりに頂点カラーを不透明度に使用。 |
| Intensity | 全体的な不透明度 (0-1)。0は完全に透明、1は完全に不透明。 |
| Alpha Test | アルファ値がこの閾値以下のピクセルは破棄されます (0-1)。 |
| Alpha To Coverage | 順序に依存しない透明性のためのアルファトゥカバレッジを有効にします (MSAAが必要)。 |
| Opacity Fades Specular | 有効にすると、不透明度はスペキュラー反射もフェードさせます。ガラスのようなマテリアルでは無効にします。 |
| Opacity Dither | 不透明度のディザリングパターン: None、Bayer 8、またはBlue Noise。 |
| Opacity Shadow Dither | シャドウ不透明度のディザリングパターン。 |
| Alpha Fade | Opacity Fades Specularが無効なマテリアルのフェード係数 (0-1)。 |

## ノーマル

ノーマルマッピングによるサーフェスディテールを制御します。

![Normals](/img/user-manual/editor/assets/inspectors/material/normals.png)

| プロパティ | 説明 |
|----------|-------------|
| Normals | ピクセルごとのサーフェス方向を定義するノーマルマップテクスチャ。 |
| UV Channel | ノーマルテクスチャのサンプリングに使用するUVセット (UV0 または UV1)。 |
| Bumpiness | ノーマルマップ効果の強度 (0-2)。0は効果なし、1は標準、2は誇張。 |

## 視差

高さマッピングを使用してサーフェスに深さの錯覚を追加します。ノーマルマップの設定が必要です。

![Parallax](/img/user-manual/editor/assets/inspectors/material/parallax.png)

| プロパティ | 説明 |
|----------|-------------|
| Heightmap | 高さマップテクスチャ。白は高い領域、黒は低い領域を表します。 |
| UV Channel | 高さテクスチャのサンプリングに使用するUVセット (UV0 または UV1)。 |
| Color Channel | 高さを読み取るテクスチャチャンネル (R, G, B, または A)。 |
| Strength | 視差効果の強度 (0-2)。 |

## クリアコート

透明なコーティング(カーペイントやラッカー仕上げの木材など)をシミュレートする二次スペキュラーレイヤーを追加します。

![Clear Coat](/img/user-manual/editor/assets/inspectors/material/clearcoat.png)

| プロパティ | 説明 |
|----------|-------------|
| Clear Coat Factor | クリアコートレイヤーの強度 (0-1)。0に設定すると無効になります。 |
| Clear Coat | ピクセルごとのクリアコート強度を定義するテクスチャ。 |
| UV Channel | クリアコートテクスチャのサンプリングに使用するUVセット (UV0 または UV1)。 |
| Vertex Color | 頂点カラーをクリアコート強度に使用。 |
| Vertex Color Channel | 使用する頂点カラーチャンネル (R, G, B, または A)。 |
| Clear Coat Gloss | ピクセルごとのクリアコート光沢度を定義するテクスチャ。 |
| Glossiness | クリアコートレイヤーの滑らかさ (0-1)。 |
| Invert | グロスマップをラフネスマップとして扱います。 |
| Clear Coat Normals | クリアコートレイヤー用のノーマルマップ (オレンジピール効果など)。 |
| Bumpiness | クリアコートノーマルマップの強度 (0-2)。 |

## シーン

布地や類似のマテリアル用のソフトでベルベットのような反射を追加します。

![Sheen](/img/user-manual/editor/assets/inspectors/material/sheen.png)

| プロパティ | 説明 |
|----------|-------------|
| Use Sheen | シーンスペキュラー効果を有効にします。 |
| Sheen | ピクセルごとのシーンカラーを定義するテクスチャ。 |
| UV Channel | シーンテクスチャのサンプリングに使用するUVセット (UV0 または UV1)。 |
| Vertex Color | 頂点カラーをシーンに使用。 |
| Color | シーンティントカラー。 |
| Sheen Glossiness | ピクセルごとのシーン光沢度を定義するテクスチャ。 |
| Glossiness | シーン効果の滑らかさ (0-1)。 |
| Invert | グロスマップをラフネスマップとして扱います。 |

## 屈折

ガラスや水などの透明なマテリアルを通過する光の屈折を制御します。

![Refraction](/img/user-manual/editor/assets/inspectors/material/refraction.png)

| プロパティ | 説明 |
|----------|-------------|
| Dynamic Refractions | グラブパスを使用したリアルタイム屈折を有効にします。 |
| Refraction | ピクセルごとの屈折強度を定義するテクスチャ。 |
| UV Channel | 屈折テクスチャのサンプリングに使用するUVセット (UV0 または UV1)。 |
| Vertex Color | 頂点カラーを屈折強度に使用。 |
| Refraction | マテリアルを通過する光の量 (0-1)。 |
| Index Of Refraction | 光の歪みを制御。1.0 / IORとして表されます。一般的な値: ガラス ~0.67、水 ~0.75。 |
| Dispersion | 色収差(色分離)の強度。0は分散なし。 |
| Thickness | ピクセルごとのマテリアル厚さを定義するテクスチャ。 |
| Scale | 厚さの乗数。光の吸収量に影響します。 |
| Attenuation | マテリアルボリュームを通過する光の吸収色。 |
| Attenuation Distance | 光が完全に吸収される距離。 |

## イリデッセンス

シャボン玉、油膜、甲虫の殻などに見られる虹色の色変化を作成します。

![Iridescence](/img/user-manual/editor/assets/inspectors/material/iridescence.png)

| プロパティ | 説明 |
|----------|-------------|
| Use Iridescence | イリデッセント回折効果を有効にします。 |
| Iridescence | ピクセルごとのイリデッセンス強度を定義するテクスチャ。 |
| UV Channel | イリデッセンステクスチャのサンプリングに使用するUVセット (UV0 または UV1)。 |
| Iridescence | イリデッセンス効果の強度 (0-1)。 |
| Iridescence Thickness | ピクセルごとの薄膜厚さを定義するテクスチャ。 |
| Thickness Minimum | 薄膜の最小厚さ(ナノメートル単位)。 |
| Thickness Maximum | 薄膜の最大厚さ(ナノメートル単位)。 |
| Index of Refraction | 薄膜レイヤーの屈折率。 |

## 環境

キューブマップまたはスフィアマップを使用した環境反射を制御します。

![Environment](/img/user-manual/editor/assets/inspectors/material/environment.png)

| プロパティ | 説明 |
|----------|-------------|
| Sphere Map | 環境反射用のスフィアマップテクスチャ (Cube Mapと相互排他)。 |
| Cube Map | 環境反射用のキューブマップテクスチャ。設定されていない場合、シーンのスカイボックスが使用されます。 |
| Reflectivity | 環境反射の可視性 (0-1)。 |
| Projection | キューブマップ投影モード: NormalまたはBox。 |
| Center | ボックス投影の中心点 (X, Y, Z)。 |
| Half Extents | ボックス投影ボリュームの半分のサイズ (W, H, D)。 |

## ライトマップ

ライトマップテクスチャから事前ベイクされたライティングを適用します。

![Lightmap](/img/user-manual/editor/assets/inspectors/material/lightmap.png)

| プロパティ | 説明 |
|----------|-------------|
| Lightmap | 事前ベイクされたディフューズライティングを含むライトマップテクスチャ。 |
| UV Channel | ライトマップのサンプリングに使用するUVセット (通常、ユニークなUVにはUV1)。 |
| Color Channel | 読み取るテクスチャチャンネル (R, G, B, A, または RGB)。 |
| Vertex Color | テクスチャの代わりに頂点カラーをライトマップデータに使用。 |

## その他

追加のレンダー状態制御。

![Other](/img/user-manual/editor/assets/inspectors/material/other.png)

| プロパティ | 説明 |
|----------|-------------|
| Depth Test | 有効にすると、深度テストをパスした場合のみピクセルがレンダリングされます(前に何もない場合)。 |
| Depth Write | 有効にすると、マテリアルは深度バッファに書き込みます。 |
| Cull Mode | カリングする面: None (両面レンダリング)、Back Faces (デフォルト)、またはFront Faces。 |
| Use Fog | このマテリアルにシーンのフォグ設定を適用。 |
| Use Lighting | このマテリアルに動的ライティングを適用。 |
| Use Skybox | 環境反射にシーンのスカイボックスを使用。 |
| Use Tonemap | このマテリアルにトーンマッピングを適用。 |
| Vertex Color Gamma | 頂点カラーをガンマ空間 (sRGB) 値として解釈。 |

:::tip
スクリプトでこのアセットを使用するには、[Asset Attributes](/user-manual/scripting/script-attributes/esm/#asset-attribute)を参照してください。プログラムによるマテリアル作成については、[StandardMaterial API](https://api.playcanvas.com/engine/classes/StandardMaterial.html)を参照してください。
:::

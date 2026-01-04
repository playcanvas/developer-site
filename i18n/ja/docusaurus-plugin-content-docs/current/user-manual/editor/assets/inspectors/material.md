---
title: Material
---

3Dモデルのすべての表面は、マテリアルを使用してレンダリングされます。マテリアルは、色、光沢、凹凸など、表面の特性を定義します。

PlayCanvasでは、マテリアルはプロパティをまとめたアセットタイプです。デフォルトでは、物理的なマテリアルを表します。これにより、滑らかなプラスチックから粗い木材、傷だらけの金属まで、さまざまな種類の視覚効果を作成するために使用できる基本的なプロパティが公開されます。

以前のフォンマテリアルタイプもサポートしています。

## マテリアルのインポート {#importing-materials}

PlayCanvasに3Dモデル(例:FBXまたはCOLLADA)ファイルをアップロードすると、マテリアルが自動的にインポートされます。マテリアルは、3Dモデリングツール内に存在するプロパティと同じプロパティで生成されます。埋め込みメディア(FBXのみ)を使用してアップロードする場合は、関連するすべてのテクスチャマップが自動的に設定されます。

## 新しいマテリアルの作成 {#creating-new-materials}

PlayCanvas Editorインターフェイスから直接新しいマテリアルを作成できます。

![Create Material](/img/user-manual/assets/materials/create-asset-menu.jpg)

これにより、新しいマテリアルアセットが作成され、画面の右側にマテリアルインスペクターが開きます。

## マテリアルの選択 {#selecting-a-material}

![Model Inspector](/img/user-manual/assets/materials/model-inspector-simple.jpg)

マテリアルを編集するには、まず選択する必要があります。これにより、マテリアルインスペクターが表示されます。

マテリアルをアセットパネルで選択することもできます。また、モデルインスペクターやModel Componentからもマテリアルを選択できます。

マテリアルのプレビューアイコンをクリックすると、マテリアルインスペクターに移動します。

## マテリアルの割り当て {#assigning-materials}

![Model Component](/img/user-manual/assets/materials/model.png)

Modelアセットのどこにどのマテリアルを割り当てるかを変更することができます。また、Model Componentを持つ特定のEntityのマテリアルをカスタマイズすることもできます。

Model Componentを持つEntityを選択すると、2つのボタンが表示されます - アセットマテリアルとEntityマテリアル。

![Model Inspector Free Slot](/img/user-manual/assets/materials/model-inspector-free-slot.jpg)

Asset Materialsをクリックすると、Modelアセットが選択されます。アセットパネルからもModelアセットを選択できます。モデルインスペクターには、モデルのメッシュと各々に割り当てられたマテリアルが表示されます。Xボタンを使用してマテリアルをクリアでき、空きスロットをクリックして新しいマテリアルを割り当てることができます。

アセットパネルからマテリアルアセットをドラッグアンドドロップして、マテリアルスロットにドロップすることもできます。

エンティティマテリアルをクリックすると、まずカスタマイズするメッシュインスタンスを選択するよう求められます。

![Select Mesh Instance](/img/user-manual/assets/materials/select.png)

メッシュインスタンスを選択した後、Model Componentに新しいマテリアルピッカーが表示されます。

![Selected Mesh Instance](/img/user-manual/assets/materials/selected.png)

その後、この特定のエンティティに別のマテリアルを選択できます。

![Select Different Material](/img/user-manual/assets/materials/overridden.png)

## マテリアルの編集 {#editing-a-material}

![Material Inspector](/img/user-manual/assets/materials/material-inspector.jpg)

マテリアルを選択した後、そのプロパティを編集できます。

## マテリアルマップ  {#material-maps}

![Material Map Slot](/img/user-manual/assets/materials/material-map-slot.jpg)

マテリアルの編集には、上記ページで詳細に説明されているさまざまなスロットにテクスチャマップを作成および割り当てることが多く含まれます。

ほとんどのテクスチャマップスロットで利用可能ないくつかのオプションがあります。

### Textureアセット {#texture-asset}

最初にTextureアセットをアップロードしてください。PlayCanvasはTextureアセットを作成します。これらをマテリアルのスロットに割り当てることができます。

### ColorまたはTint Color {#color-or-tint-color}

いくつかのマップスロットは、テクスチャマップがなくても単色にすることができます。また、テクスチャが割り当てられている場合は、tint colorをサポートするスロットもあります。tint colorが有効になっている場合、tint colorは、テクスチャマップスロットの色に乗算されます。

### Channel {#channel}

一部のマップでは、単一のグレースケール値、つまり0.0 -> 1.0が必要です。この場合、使用するテクスチャのチャンネルを選択できます。 **RGB** は、すべての3つのチャンネルを使用することを意味します。**R**、 **G**、または **B** は、赤、緑、または青チャンネルのみが使用されることを意味します。

### Offset & Tiling

<img loading="lazy" src="/img/user-manual/assets/types/material/offset-tiling.jpg" width="300" />

| プロパティ名          | 説明 |
|-------------------|-------------|
| Apply to all Maps | オフセットとタイリングの値を個々のマップに適用するには、これをチェックを外します。 |
| Offset            | このマテリアルで参照される最初のUVチャネルに適用するUおよびVのオフセット。 |
| Tiling            | このマテリアルで参照される最初のUVチャネルに適用されるUおよびVのスケール。 |

### Ambient

Ambientプロパティは、マテリアルが周囲光でどのように表示されるかを決定します。

<img loading="lazy" src="/img/user-manual/assets/types/material/ambient.jpg" width="300" />

| プロパティ名   | 説明 |
|------------|-------------|
| Tint       | マテリアルカラーとシーンのグローバルのAmbientカラーを掛け合わせるには、これをチェックします。 |
| Color      | シーンのグローバルのAmbientカラーを乗算するtintカラーです。 |
| AO Texture | プリベイクされたAmbient Occlusionを含むAmbient Occlusionマップです。 |

### ディフューズ (Diffuse)

Diffuseプロパティは、マテリアルがシーン内の動的な光源から放射される拡散光をどのように反射するかを定義します。

<img loading="lazy" src="/img/user-manual/assets/types/material/diffuse.jpg" width="300" />

| プロパティ名   | 説明 |
|------------|-------------|
| テクスチャ (Texture)    | ピクセルごとのDiffuseマテリアルカラーを指定するDiffuseマップです。Diffuseマップが設定されていない場合、Diffuseカラーが代わりに使用されます。 |
| Tint       | チェックを入れると、マテリアルのDiffuseマップをDiffuseカラーで調節できます。 |
| Color      | Diffuseマップが設定されていない場合、これがマテリアルのDiffuseカラーとなります。Diffuseマップが設定されており、tintが有効になっている場合には、この設定された色でマテリアルのDiffuseマップを調整できます。 |

### スペキュラーマップ (Specular)

Specularプロパティは、Specularハイライト（光沢）の色を定義します。

<img loading="lazy" src="/img/user-manual/assets/types/material/specular.jpg" width="300" />

| プロパティ名      | 説明 |
|---------------|-------------|
| Use Metalness | SpecularとMetalnessのワークフローを切り替えます。 |
| Specular Map  | ピクセルごとのSpecularカラーを指定するSpecularマップです。Specularマップが設定されていない場合、Specularカラーが代わりに使用されます。 |
| Tint          | チェックを入れると、マテリアルのSpecularマップをSpecularカラーで調節できます。 |
| Color         | Specularマップが設定されていない場合、マテリアルのSpecularカラーになります。Speculaマップが設定され、tintが有効になっている場合には、この設定された色でマテリアルのSpecularマップを調整できます。 |
| Metalness Map | [Metalnessを使用する場合のみ]このマップは、ピクセルあたりのMetalness値を指定します。1の値はメタル（金属）であり、0の値はノンメタル（非金属）です。 |
| Gloss Map     | ピクセルごとのShininess値を指定するGlossマップです。GlossマップはShininessプロパティによって調整されます。 |
| 光沢度 (Glossiness)    | 表面の滑らかさを決定する値です。Shininessの値が小さい場合、表面は荒く、鏡面反射のハイライトは広範囲にわたります。Shininessの値が大きい場合、表面は滑らかで、より集中した鏡面反射のハイライトが現れます（表面が磨かれて光沢が出るという意味）。 |

### エミッシブ (Emissive)

Emissiveプロパティは、マテリアルの発光を制御します。（反射する光とは異なります）

<img loading="lazy" src="/img/user-manual/assets/types/material/emissive.jpg" width="300" />

| プロパティ名   | 説明 |
|------------|-------------|
| テクスチャ (Texture)    | ピクセルごとのEmissiveカラーを指定するEmissiveマップです。Emissiveマップが設定されていない場合、Emissiveカラーが代わりに使用されます。 |
| Tint       | チェックを入れると、マテリアルのEmissiveマップをEmissiveカラーで調節できます。 |
| Color      | Emissiveマップが設定されていない場合、これはマテリアルのEmissiveカラーとなります。Emissiveマップが設定され、tintが有効になっている場合、この設定された色でマテリアルのEmissiveマップを調整できます。 |
| インテンシティ (Intensity)  | 特に明るいEmissiveマテリアルに対してさらに明るい効果を加えることができるEmissiveカラーの乗数です。 |

### Opacity

Opacityは、透明度のレベルを設定します。

<img loading="lazy" src="/img/user-manual/assets/types/material/opacity.jpg" width="300" />

| プロパティ名   | 説明 |
|------------|-------------|
| テクスチャ (Texture)    | ピクセルごとの不透明度を指定するOpacityマップです。Opacityマップは、'Amount'プロパティによって調整できます。 |
| インテンシティ (Intensity)  | マテリアルの不透明度です。これは 0（完全に透明）から 1（完全に不透明）の値です。デフォルトは1です。 |

### Normals

Normalマップを指定するためにこれを使用します（これらは凹凸性を決定します - PlayCanvasでは、HeightマップではなくNormalマップを使用する必要があります）。

<img loading="lazy" src="/img/user-manual/assets/types/material/normals.jpg" width="300" />

| プロパティ名   | 説明 |
|------------|-------------|
| Bumpiness  | 適用されるNormalマップの強度です。これは 0（Normalマップの影響がない）から 2（Normalマップは大きく影響）の値です。デフォルトは1です。 |
| テクスチャ (Texture)    | ピクセルごとの表面のNormalを指定するNormalマップです。Normalマップは 'Bumpiness' プロパティで調整できます。 |

### Parallax

Parallaxマップは、表面に視差を与えることでNormalマップにさらなるリアルな感覚を加えます。Parallaxオプションは、マテリアルにNormalマップを設定した場合にのみ有効になります。

<img loading="lazy" src="/img/user-manual/assets/types/material/parallax.jpg" width="300" />

| プロパティ名    | 説明 |
|-------------|-------------|
| Height Map  | ピクセルごとのParallax効果を指定するHeightマップ。白は最高の高さで、黒はゼロです。  |
| Strength    | Parallax効果の強度（0から2の間の値、デフォルトは1） |

### 環境マップ (Environment)

Environmentプロパティは、マテリアルが環境をどのように反射するかを決定します。

<img loading="lazy" src="/img/user-manual/assets/types/material/environment.jpg" width="300" />

| プロパティ名            | 説明 |
|---------------------|-------------|
| Sphere Map          | 環境反射を近似するSphere Mapテクスチャアセット。Sphere Mapが設定されている場合、Cube Mapプロパティは非表示になります（これらのプロパティは相互に排他的です）。 |
| Cube Map            | 環境反射を近似するCube Mapテクスチャアセット（Sphereマップよりも高い精度）です。Cube Mapが設定されている場合、Sphere Mapプロパティは非表示になります（これらのプロパティは相互に排他的だからです）。 |
| Reflectivity        | マテリアルから反射される光の部分を決定する要素。この値はデフォルトで1（全反射）になります。 |
| Refraction          | マテリアルを通過する光の部分を決定する要素。 |
| Index of Refraction | マテリアルを通過する光の歪みの量を決定します。 |

### Light Map

Light Mapには事前にベイクされたDiffuse Lightingが含まれています。Light Mapの使用は、実行時に行われる動的なライトの計算を事前に計算できるため、最適化と考えられます。

<img loading="lazy" src="/img/user-manual/assets/types/material/lightmap.jpg" width="300" />

| プロパティ名   | 説明 |
|------------|-------------|
| テクスチャ (Texture)    | プリベイクされたDiffuse Lightingを含むLight Mapテクスチャです。Light Mapを使用するには、2つのUVセットを持つメッシュにマテリアルを適用する必要があります。Light Mapは2番目のUVセットを使用します。 |

### その他のレンダリング状態

その他のレンダリング状態を使用して、マテリアルでメッシュをレンダリングする方法を追加で制御できます。

<img loading="lazy" src="/img/user-manual/assets/types/material/other.jpg" width="300" />

| プロパティ名        | 説明 |
|-----------------|-------------|
| Depth Test      | チェックされている場合、マテリアルを持つメッシュがレンダリングされるとき、ピクセルごとにチェックが行われ、ピクセルがエンジンのDepth Testに合格するかどうかが決定されます。デフォルトでは、ピクセルは既にDepthバッファにあるものと同じかそれ以下のz深度を持たなければなりません。つまり、メッシュはそれが前に何もない場合にのみ表示されます。チェックが外されている場合、メッシュはDepthバッファにすでにあるものに関係なくレンダリングされます。デフォルトではオンです。 |
| Depth Write     | チェックされた場合、マテリアルを含むメッシュがレンダリングされると、その深度情報はDepthバッファーに書き込まれます。これにより、後続のメッシュがレンダリングされると、このマテリアルでレンダリングされたメッシュに対してDepthテストされます。デフォルトはオンです。 |
| Cull            | オプションは次のとおりです。<ul> <li>None: 前面と背面の両方がレンダリングされます。</li> <li>Front Faces: 前面がレンダリングされ、背面はレンダリングされません。</li> <li>Back Faces: 背面がレンダリングされ、前面はレンダリングされません。これがデフォルトです。</li> </ul> PlayCanvasでは、反時計回りの頂点の巻き方が前面の三角形を指定すると規定しています。背面のカリングは、背面のピクセルが頻繁に上書きされる（凸メッシュの場合）ため、パフォーマンス向上に役立つことが多いです。 |
| Blend Type      | オプションは次のとおりです。<ul> <li>None: メッシュは不透明です。これがデフォルトです。</li> <li>Normal: メッシュは透明で、ステンドグラスのようです。</li> <li>Additive: メッシュの色がフレームバッファにすでにレンダリングされているものに加えられます。</li> <li>Pre-multiply: Normal'ブレンドと同様ですが、このマテリアルでレンダリングされるメッシュの色がすでにそのアルファ値で調整されていると想定されます。</li><li>Multiply: レンダリング時に、メッシュの色がフレームバッファにすでにレンダリングされたものと乗算されます。</li></ul> |
| Shadow Sampling | オプションは: <ul><li>Hard</li><li>PCF 3x3</li></ul>  |

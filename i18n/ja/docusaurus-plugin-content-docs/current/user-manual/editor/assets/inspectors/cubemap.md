---
title: Cubemap
---

キューブマップ (Cubemap) はTextureアセットの一種で、1つのキューブのそれぞれの面を表す6つのTextureアセットから構成されます。通常は以下の2つの用途があります。

1. キューブマップは、シーンのスカイボックスを定義することができます。スカイボックスには、遠くにある風景の画像が含まれます。例えば、丘や山、空などです。
2. キューブマップは、任意のマテリアルに反射を追加することができます。シーン内の光沢のあるクロムのボールベアリングを想像してみてください。そのボールは周囲のシーンを反射します。オープンな環境では、通常、シーンのスカイボックスキューブマップを反射オブジェクトのマテリアルのキューブマップとして設定します。

<div className="iframe-container">
    <iframe src="https://playcanv.as/b/xp7v1oFB/" title="Cubemap" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

## キューブマップテクスチャのインポート

キューブマップは、6つのTextureアセットを必要とするアセットです。したがって、新しいキューブマップアセットを完全に設定するには、まず6つの画像をプロジェクトにインポートする必要があります。これを行うには、シンプルにファイルシステムから6つの画像をアセットパネルにドラッグするか、アセットパネルのアップロードオプションを選択します。アップロードおよび処理が完了すると、画像はアセットパネルに表示され、キューブマップアセットに割り当てる準備ができた状態になります。

## キューブマップの作成

PlayCanvasエディターのインターフェイスから新しいキューブマップアセットを直接作成することができます。アセットパネルの「Create Asset」メニューを使用してください。

![Cubemap Creation](/img/user-manual/assets/cubemaps/cubemap-create.png)

これにより、新しいキューブマップアセットが作成され、画面の右側にキューブマップエディターが開きます。

## キューブマップの選択

キューブマップを選択して編集するには、アセットパネルで選択します。これを行う最も簡単な方法は、キューブマップフィルタを選択して選択オプションを絞り込むことです。キューブマップは十字形のサムネイルで識別されます。

![Cubemap Thumbnails](/img/user-manual/assets/cubemaps/cubemap-thumbnails.png)

キューブマップが選択されると、エディタの右側にインスペクタパネルが読み込まれます。

## Cubemapプロパティ

キューブマップが選択されたら、そのプロパティを編集できます。

![Cubemap Properties](/img/user-manual/assets/cubemaps/cubemap-properties.png)

### フィルタリング (Filtering)

この設定は、キューブマップのピクセルが拡大される際にどのように補間されるかを決定します。拡大とは、テクセルとスクリーンピクセルの比率が1未満の場合のことです。視覚的には、Linearが最も良い結果を提供し、次にNearestが続きます。

### 異方性 (Anisotropy)

Anisotropyは、カメラのビューベクトルがテクスチャの表面とより近く一致する場合に、テクスチャサンプリングの品質を制御するための1から16の値です。

## テクスチャの割り当て

![Cubemap Preview](/img/user-manual/assets/cubemaps/cubemap-preview.png)

キューブマップのプレビューパネルでは、キューブマップの六つの面が十字の形に展開されて表示されます。展開されたダンボール箱のようなイメージです。キューブマップを構築するには、単にアセットパネルからテクスチャアセットをプレビューパネルの各面のスロットにドラッグ＆ドロップします。また、キューブマップの面のスロットを選択し、アセットパネルからTextureアセットを選択することもできます。

Cubemapの面は以下の条件を満たす必要があります。

- 正方形(幅と高さの解像度が同じ)
- 次数の2の累乗である(1x1、2x2、4x4、8x8、16x16、32x32など)
- すべての面は同じ解像度である必要がある

エディタは、テクスチャを各面にインテリジェントに自動割り当てする方法を推測しようとします。これは、最初の面をスロットにドラッグする際に行われ、キューブマップの面の一般的な命名規則に一致するように試みます。例えば、以下のようなものです。

- negx、posx、negy、posy、negz、posz
- left、right、top|up、bottom|down、front|forward、back|backward
- 0-5|1-6

一致するテクスチャセットの例は次の通りです。

- face_posx.jpg
- face_negx.jpg
- face_posy.jpg
- face_negy.jpg
- face_posz.jpg
- face_negz.jpg

## イメージベースドライティング(IBL)

このテクニックは、Environmentマップ(例えばCubeMap)を使用して、物理ベースのアンビエントライト (Ambient Light)とマテリアルの反射をシミュレートすることができます。IBLに関する詳細は[こちら](/user-manual/graphics/physical-rendering/image-based-lighting/)をご覧ください。

## マテリアルにキューブマップを割り当てる

デフォルトのPhongと物理マテリアルにはどちらも反射プロパティがあります。Environmentプロパティを展開すると、次のようになります。

![Cubemap Material](/img/user-manual/assets/cubemaps/cubemap-material.png)

空のスロットをクリックしてキューブマップを選択するか、アセットパネルからCubemapアセットをドラッグアンドドロップしてCubemapスロットに配置することができます。

:::note

物理マテリアルは、割り当てられていて事前にフィルタ処理されたシーンのスカイボックスをデフォルトのEnvironmentマップとして使用します。

:::

## EquirectangularまたはOctahedral HDRIsをキューブマップに変換する方法は以下の通りです

環境テクスチャ (Environment Texture) は、しばしば正距円筒図法 (equirectangular) または正八面体 (Octahedral) の形式で提供されます([例えばPoly Haven](https://polyhaven.com/hdris))など、これらのテクスチャをPlayCanvasで使用する前に、キューブマップに変換する必要があります。

これは、ブラウザで利用可能な[PlayCanvasテクスチャツール](https://playcanvas.com/texture-tool)を使用して行うことができます。

1. 環境テクスチャのHDRバージョンをダウンロードし、PlayCanvasテクスチャツールの 'Add Files'  ボタンを押してファイルを読み込みます。
2. 左側にロードしたテクスチャを選択します。
3. 「Reproject」セクションで、ソースをテクスチャのフォーマットに変更します。
4. フォーマットを「キューブ」に変更します。
5. エンコーディングを次のように設定します。
    - 「HDR」にエクスポートする場合は「rgbe」
    - 「PNG」にエクスポートする場合は「rgbm」
6. 各テクスチャの解像度を設定します。幅512は、品質とファイルサイズのバランスがとれた良い選択肢です。
7. 'Reproject' ボタンを押して、キューブマップに変換します。
8. 'Export to PNG' または 'Export to HDR' を押して、6つの個別のキューブマップフェイステクスチャをダウンロードしてPlayCanvasにアップロードする準備を整えます。

![PlayCanvas Texture Tool](/img/user-manual/assets/cubemaps/playcanvas-texture-tool-convert.png)

他のキューブマップへの変換を行うことができるツールには以下があります。

- Mateusz Wisniowski's [HDRI-to-CubeMap tool](https://matheowis.github.io/HDRI-to-CubeMap/) (browser)
- [cmftStudio](https://github.com/dariomanesku/cmftStudio) (desktop) with [guide](https://jamie-white.com/webgl/equirectangular-hdr-image-to-face-list/)

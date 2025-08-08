---
title: ライトマッピング
---

[![PlayCanvas Lightmapping](/img/user-manual/graphics/lighting/lightmapping/playcanvas-lightmapping-scene.jpg)][13]
*The lighting in this scene is implemented using Lightmap and AO textures and Box Projected IBL (reflections)*

上の画像の結果を得るためにこれらのテクニックを使用する[最終シーン][13]と[プロジェクト][14]へのリンクです：外部HDRライトマップ(このページで説明します)、[アンビエントオクルージョン][12]、HDR Cubemapは、[Image Based Lighting][11]技法を使用したBox Projectionで適用され、現実的な反射を実現します。

## 概要 {#overview}

ライトマップ生成は静的シーンの照明情報を事前に計算し、多くの場合マテリアルに適用されるテクスチャに格納する処理です。これはライトソースや形状の多くが静的または環境に使用されている場合にシーンを照らす効率的な方法です。

PlayCanvasでは、シーン内でライトマップを使用する２つの方法を提供しています：サードパーティツールを使用した**外部ライトマップ生成**と、アプリケーションが実行している間または読み込み中にエンジンによって自動的に生成される[**ランタイムライトマッピング**][0]です。

このページでは、外部ツールからライトマップをレンダリングする際の詳細とベストプラクティスについて説明します。

## 外部ライトマップの生成 {#external-lightmap-generation}

多くの3Dコンテンツツールには、ライトマップテクスチャを生成するための方法があります。たとえば、3DS Max、Maya、Blender、また、他のツールにはすべて、テクスチャにライトマップをベイクする方法があります。ライトマップ生成にオフラインツールを使用する利点は、グローバルイルミネーション、バウンスライティング、ソフトシャドウ、アンビエントオクルージョンなどの洗練された照明の計算ができるということです。主要な欠点は、3Dツール内でシーンを完全に描写する必要があるということです。PlayCanvasシーンがエディタ内に沢山のインスタンスを配置している場合、ライトマップツールの中にこれを再作成する必要があります。

外部ツールを使用してライトマップを作成したら、通常のテクスチャアセットとしてアップロードをして標準のPhysical Materialのライトマップスロットを使用してマテリアルに添加することができます。

## ツール {#tools}

このページでは、3ds MaxとVRayを使用してライトマップを生成しますが、他の同様のモデリングツールでも同じ機能を実現できます。

## ガンマ補正 (Gamma Correction) {#gamma-correction}

ライトマップまたはキューブマップをレンダリングするときは、カラーカーブが２度ガンマ補正の影響を受けないように、線形スペースでレンダリングする必要があります。PlayCanvas Engineはリアルタイムレンダリング中にガンマ補正を適用します。

3ds Maxでは、このオプション(ガンマ/ LUT補正を有効にする)を無効にする必要があります。これは、環境設定(カスタマイズ > 環境設定)で確認できます：

![3ds Max > Preferences > Linear Space](/img/user-manual/graphics/lighting/lightmapping/3ds-max-preferences.png)

次に、カラーマッピングが更新されていることを確認します。レンダリング設定(F10、またはレンダリングからテクスチャウィンドウ)にあります。出力はクランプや後処理されるべきではありません(Modeオプション)。Linear Multiplyは線形色空間に使用します。
以下は、どのオプションをどの値に設定するかのスクリーンショットです。Defaultボタンをクリックして設定をExpertに展開します。

![3D's Max > Render Settings](/img/user-manual/graphics/lighting/lightmapping/3ds-max-render-settings-color-mapping.png)

## UV マッピング {#uv-mapping}

ジオメトリにライトマップテクスチャを適用するには、最初にアンラップする必要があります。 ライトマップに適したUVを得るのに役立ついくつかのプラクティスがあります。

### シンプルなジオメトリ {#simple-geometry}

ジオメトリの面積は小さい方が良いです。三角形の面積を最小限に抑え、見えない三角形を削除してください。面積が大きくなると、ライトマップの詳細を減らし、より大きなテクスチャを必要とし、時には複数のアセットを必要とします。

![Lighmapping Tips: Simple Geometry](/img/user-manual/graphics/lighting/lightmapping/uv-geometry.jpg)

### 一貫したテクセルサイズ {#consistent-texel-size}

同じジオメトリ内の他のテクセルと比較して、UVのテクセルを伸ばさずに一定に保ちます。これは、ライトマップテクスチャのディテールレベルがシーン内で一貫していることを保証するためです。テクスチャサイズのバリエーションは、ビジュアルおよび最適化の判断に応じてジオメトリを近づけたり、遠く離した場合に適用することができます。

![Lighmapping Tips: UV Consistent Texel Size](/img/user-manual/graphics/lighting/lightmapping/uv-consistency.jpg)

### 重ならないUV {#non-overlapping-uv}

UVの三角形は重なり合わないようにして、各ピクセルがジオメトリ上の3D空間内で独特の位置を持ち、独自の照明情報を適切に格納するべきです。ライトマップのUV空間はクランプされます。つまり、UVは0.0〜1.0の間に含まれ、外側には出ません。

![Lighmapping Tips: Non-overlapping UV](/img/user-manual/graphics/lighting/lightmapping/uv-overlapping.jpg)

## その他のヒント {#other-tips}

ライトマップの良い結果を得るには、レンダリング時にレンダリングがカメラの視点ではなく、光の伝播に関連するデータのみに基づいていることを確認してください。

1. マテリアルの **ノーマルマップを無効にする**  - マイクロサーフェスのディテールは、ライトマップのテクスチャに関連するには小さすぎます。
2. マテリアルの **Reflectionを0**に、**Gloss Mapsを無効** に設定する - 反射はレンダリングの問題に繋がり、視覚的なアーティファクトが発生する可能性があります。一般的に、ライトマップは拡散照明のみを含む必要があり、反射率はランタイム技術を使用して実装する必要があります。
3. 非常に暗い材料は光をあまり反射せず、グローバルイルミネーションのプラスにならず、 **良い結果を生みません** 。
4. Render To Textureウィンドウ(下記参照)で、 **Padding** をより大きな値に設定します。
5. **ライトはジオメトリの後ろからリークすることがある** ので、それを防ぐためにブロッキングジオメトリを追加します。

![Lighmapping Light Leaking](/img/user-manual/graphics/lighting/lightmapping/lightmapping-light-leak.jpg)

## テクスチャにレンダリング {#render-to-texture}

モデリングツールから照明データを取得するには、ライトデータをテクスチャにレンダリングします。 解像度とフォーマットを指定することができます。

3ds Maxでは、これはRender To Textureウィンドウを使用して行います。Paddingをより大きな値に設定する必要がある場合、2番目のUVチャンネルを選択、レンダラに応じて出力プロファイル。 以下のスクリーンショットでは`VRayRawTotalLightingMap`を使用します。

![Render To Texture: PlayCanvas Lightmapping](/img/user-manual/graphics/lighting/lightmapping/3ds-max-render-to-texture-window.png)

## ノイズ {#noise}

状況によってはレンダリングの品質と時間に応じて、出力の照明データが完全ではなく、ノイズに悩まされる可能性があります。これは、テクスチャの端をぼかすことなく面の部分を滑らかにするよう、ぼかしを画像に適用することで簡単に解決できます。Photoshopでは、これはSurface Blurフィルタを使用して行います。

![Lightmapping: Photoshop > Surface Blur](/img/user-manual/graphics/lighting/lightmapping/lightmapping-surface-blur.jpg)

## エディタにアップロード {#upload-to-editor}

これで２つ目のUVチャンネル(UV1)とHDRライトマップテクスチャを使用したジオメトリができたので、それらをPlayCanvasシーンにアップロードしてマテリアルを設定します。これは、ファイルをドラッグアンドドロップするか、アセットパネルのアップロードボタンを使用して行います。ジオメトリをアップロードすると、自動的にマテリアルが生成されます。ライトマップがレンダリングされる各マテリアルに、ライトマップテクスチャを設定する必要があります。必要なすべてのマテリアルを選択し、ドラッグアンドドロップをするか、Lightmapスロットのライトマップテクスチャを選択します。

![PlayCanvas Editor: Material Lightmap Texture Slot](/img/user-manual/graphics/lighting/lightmapping/lightmapping-material-slot.png)

## 最後に {#final-remarks}

ガンマ補正、トーンマッピング、露出 は、シーンに必要な特徴と色を加えることのできる良い設定です。

上記のテクニックを使った[例][13]や、[プロジェクト][14]を使うことができます。

[0]: /user-manual/graphics/lighting/runtime-lightmaps/
[11]: /user-manual/graphics/physical-rendering/image-based-lighting/
[12]: /user-manual/graphics/lighting/ambient-occlusion/
[13]: https://playcanv.as/p/zdkARz26/
[14]: https://playcanvas.com/project/446587/overview/archviz-example

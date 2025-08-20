---
title: PlayCanvas用の3Dモデル作成
---

PlayCanvasではアートやアニメーションの構築は、ほとんど全ての利用可能な3Dモデリングプログラムを使用して行うことができます。例：Blender、SketchUp、Autodesk 3D Studio Max、Autodesk Maya。

PlayCanvasは、オープンソースのglTFバイナリ（GLB）形式を介して、コンテンツを最も正確にインポートするように設計されています。したがって、一般的に、モデリングアプリケーションがGLBをサポートしていれば、PlayCanvasもサポートします。

GLBのインポートでは、以下のglTF機能がサポートされ、非常に高速なシーン作成が可能です。

- ノードヒエラルキー (Node hierarchy)
- スタンダードマテリアル (Standard material)
- マテリアル拡張 (Ratified material extensions)
- アニメーションスケルトンとスキニングデータ (Animated skeletons and skinning data)
- モーフターゲット (Morph targets)
- カメラ (Cameras)
- Draco圧縮モデル (Draco compressed models)
- 点光源サポート (Punctual light support)

そのため、PlayCanvasを対象とする場合、特別なアートツールプラグインを使用する必要はなく、従う必要のあるPlayCanvas固有のワークフローはありません。

![GLBインポートの例](/img/user-manual/assets/models/building/glb-import.gif)  
*Loïc NorgeotによるモデルとGeoffrey Marchalによる蚊のスキャンは、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)ライセンスに基づき[Sketchfab](https://sketchfab.com/3d-models/real-time-refraction-demo-mosquito-in-amber-37233d6ed84844fea1ebe88069ea58d1)から提供されています*

PlayCanvasは、FBXファイルのインポートもサポートしており、これはより一般的な相互運用形式の1つです。ただし、FBXのマテリアルはGLTFのマテリアルよりも忠実にはインポートされず、インポート後に編集が必要な場合があります。

最適な体験と最高の互換性のために、可能な限りGLBを使用することをお勧めします。

検討すべき一部のモデリングおよびアニメーションプログラムは以下のとおりです。

- 無料: Blender \*, Wings3D, Voidworld, SketchUp, Sculptris, Daz Studio\*
- 有料(低価格) : 3D-Coat, NVIL, Hexagon
- 有料(高価格): ZBrush, Autodesk 3D Studio Max \*, Autodesk Maya \*, Luxology Modo \*

\* *このプログラムはアニメーションも作成できます*

テクスチャの生成にお勧めのプログラム：

- 無料: Blender, Pixexix Free, xNormal, MaPZone, GIMP, Krita desktop, MyPaint
- 有料: Substance Designer (Substance Painter や Bitmap2Materialも含む), Photoshop, Quixel NDO and DDO, CrazyBump, Pixexix Pro, Clip Studio Paint/Manga Studio, SERIF DrawPlus/PhotoPlus

モデリングについて上記に記載されているプログラムの多くはテクスチャペイントを可能にします。より多くのオプションをご希望の場合、この[外部wiki](http://wiki.polycount.com/wiki/Tools)ページをご確認ください。一部には古い情報もありますのでご注意ください。

## メッシュ作成に関する一般的な注意点

どのようなモデリングアプリケーションを使っているかにかかわらず、PlayCanvasで使用する3Dシーンを作成する際に注意しておくべきことがいくつかあります。

- メッシュは256のボーンにまでスキンすることができます。
- NURBSメッシュはPlayCanvasネイティブフォーマットへの変換時に三角形に変換されます。

---

## Blender

![Blender Logo](/img/user-manual/assets/models/building/blender-logo.jpg)

[Blender](https://www.blender.org/)は素晴らしいフリーの3Dモデリングツールで、PlayCanvas用の3Dアセットを作るために最適です。

BlenderはGLB、FBX、COLLADAにエクスポートすることができますが、ビルトインエクスポータにはいくつかの制限があります。

### **マップタイプ**

Blender 2.71において、マテリアルのDiffuseマップとNormalマップの両方がFBXファイルにエクスポートされます。他のマップタイプがエクスポートされなかった場合は、マテリアルエディタ内でこれらのマップを設定する必要があります。

### **テクスチャの埋め込み**

埋め込みテクスチャによってインポートが簡単になります。

BlenderのCOLLADAエクスポーターはテクスチャをモデルファイルに埋め込む機能がありません。

Blenderの2.71リリースでは、複数の埋め込みテクスチャを直接Blenderからエクスポートできるようになりました。まず、オブジェクトがBlender内で正しくレンダリングされていることを確認してください。FBXにエクスポートする際に、'Path Mode'をCopyに設定し、'Embed Textures'ボックスをチェックしてください。

あるいは、[Autodesk FBX Converter](https://www.autodesk.com/developer-network/platform-technologies/fbx-converter-archives)を使ってBlenderからエクスポートしたファイルをメディアを埋め込んだファイルに変換することもできます。FBX Converterでファイルを開き、_Embedded Media_チェックボックスをチェックしてセーブしなおしてください。

:::warning

注意：Blender 2.71のFBXエクスポートによって、BlenderでEmissiveプロパティが設定されていないにもかかわらずEmissiveが生成される問題があるようです。これはPlayCanvasエンジンの問題ではありません。これを回避するには、Blender内から、マテリアルのDiffuseカラー設定を0に変更するか（プロパティエディターの'Material'タブの下）、PlayCanvasエディター内でEmissiveを単純に減らすだけです。

:::

### **アニメーション**

Blender 2.71の場合：

blendファイル内に含まれるアニメーションは、デフォルトのfbxエクスポータ設定でエクスポートされ、PlayCanvasアセットのインポートパイプラインと互換性があります。同じモデルの複数のアニメーションを含めるには、複数のfbxファイルをアップロードする必要があります。メモリを節約するためには、エクスポート前にブレンドファイルからモデルやテクスチャを削除するか、fbxエクスポータ設定でアーマチュアのみをエクスポートするか、プロジェクトダッシュボードのアセットページで重複する'モデル'ターゲットアセットを削除するか (アセットページのドロップダウンメニューで'target'を選択してターゲットアセットを表示) することができます。

### **Blenderの使い方を学ぶには**

Blenderの使い方については様々な資料がweb上にあります。私達は以下の二つをおすすめします:

- [Blender Cookie](https://cgcookie.com/learn-blender)
- [Blender Guru](https://www.blenderguru.com/)

---

## Autodesk 3D Studio Max

### Max Materials

3D Studio Maxでは、標準マテリアルを使用するか、マルチ/サブオブジェクト マテリアルを使用してください。ただし、参照しているマテリアルが標準マテリアルである必要があります。以下のスクリーンショットでハイライト表示されている箇所は、PlayCanvasにエクスポートする際に利用される設定です。

![Max material editor](/img/user-manual/assets/models/building/max-material-editor.jpg)

### 対応しているマップスロット

PlayCanvasでは、エクスポート時に一部の3DS Maxのマテリアルマップタイプを解釈します。なお、マップは3DS Maxがサポートしている任意の形式であることができますが、マップがウェブ形式（つまりJPEG、GIF、またはPNG）でない場合は、エクスポート時にこれらの形式に変換されます。

#### Diffuseカラー

このスロットにBitmapマップを割り当てると、PlayCanvasのマテリアルでDiffuseマッピングが有効になります。これにより、マテリアル上で設定されているDiffuseカラー（カラーピッカーを介して）が実質的に上書きされます。Diffuseマップにアルファチャネルがある場合、それはPlayCanvasランタイムでのピクセルごとのアルファ値として使用されます。

さらに、DiffuseカラースロットにRGB Multiplyマップを割り当てることも可能です。これにより、ライトマッピングが有効になります。ここでは、Map 1がDiffuseマップであり、Map 2がLight Mapです。

#### Specularカラー

このスロットにBitmapマップを割り当てると、PlayCanvasのマテリアルでスペキュラマッピングが有効になります。これにより、マテリアル上で設定されているSpecularカラー（カラーピッカーを介して）が実質的に上書きされます。これにより、表面のスペキュラ領域をマスクすることや、異なる領域でスペキュラハイライトに異なる色を付けることが可能です。Specularマップにアルファチャンネルがある場合、ピクセルごとのShininessを設定するために使用されます。

#### Specularレベル

このスロットにBitmapマップを割り当てると、マテリアルのSpecularカラーのピクセルごとの減衰が有効になります。これにより、マテリアルに設定されているSpecularレベルが実質的に上書きされます。

#### 光沢度 (Glossiness)

このスロットにBitmapマップを割り当てると、マテリアルのピクセルごとのGlossinessが有効になります。これにより、マテリアルに設定されているGlossinessが実質的に上書きされます。

#### 自己発光 (Self-Illumination)

このスロットにBitmapマップを割り当てると、PlayCanvasのマテリアルでエミッシブマッピングが有効になります。Emissiveマップは完全なRGB（グレースケールに制限されない）であり、基本的には表面のライティングの結果に追加されます。したがって、Emissiveマップの黒いピクセルはピクセルの値に何も追加しません。他の値はピクセルの輝度を増加させます。

#### Opacity

このスロットにBitmapマップを割り当てると、PlayCanvasのマテリアルで透明度マッピングが有効になります。透明度マップの黒いピクセルは完全に透明であり、白いピクセルは完全に不透明です。灰色のピクセルはいくつかの中間のアルファ値に対応します。

もしマテリアルにOpacityマップがある場合、それはDiffuseマップのアルファチャンネルに設定されているアルファ値を上書きします。Opacityマップスロットを使用する場合は、Diffuseマップのアルファチャンネルよりも効率が低くなります。なぜなら、PlayCanvasランタイムでは1つではなく2つのテクスチャが生成され、デフォルトのシェーダーが少し追加の処理を行わなければならないからです。ただし、パフォーマンスに問題がなく、Opacityマップを使用するのが便利な場合は、この機能がサポートされています。

#### Bump

このスロットにNormal Bumpマップを割り当てると、ノーマルマッピングが有効になります。ただし、デフォルトでは、Bumpスロットの 'Amount' 値は30に設定されていますが、PlayCanvasではこの値を無視し、100と設定されたかのように扱います。そのため、レンダリング結果をリアルタイムのレンダリングにより近づけるために、Maxでもこの値を100に設定することを推奨します。

Normalマップを作成する方法には異なる方法がありますが、主な2つの方法は緑成分の形式が異なります。たとえば、デフォルトでは、3DS Maxはレンガの壁のためのNormalマップが以下のように表示されることを期待します。

![Normal map](/img/user-manual/assets/models/building/wall-norm.jpg)

テクスチャのNormalマップの緑成分（または各NormalのY成分）を反転する必要があります。Photoshopでファイルを読み込み、緑チャンネルを選択し、Ctrl+Iを押してチャンネルを反転すると、以下のようになります。

![Normal map with Y component flipped](/img/user-manual/assets/models/building/wall-norm-yflip.jpg)

これでライティングの一貫性をPlayCanvas上で保つことができます。

割り当てたNormalマップがアルファチャンネルを持つ場合、それはアルファチャンネルをHeightマップとして扱うParallaxマップとして扱われます。Heightマップの明るい部分は暗い部分よりも'高い'ものとして扱われます。

#### Reflection

このスロットにBitmapマップを割り当てると、PlayCanvasのマテリアルでSphereマッピングが有効になります。Bitmapは次のようなものになります。

![Sphere map](/img/user-manual/assets/models/building/mountains-sphere.jpg)

Sphereマップはコストのかからない、もっとも信頼性の低いリフレクションマッピングの手法です。多くの場合では表面に魅力的な光沢を与えるために十分です。

---

## Autodesk Maya

### Maya Materials

Mayaでは、標準的なマテリアルタイプであるlambert、blinn、およびphongを使用するべきです。以下のスクリーンショットのハイライトされた領域は、PlayCanvasへのエクスポート時に利用されるマテリアル設定を示しています。

![Maya material editor](/img/user-manual/assets/models/building/maya-material-editor.jpg)

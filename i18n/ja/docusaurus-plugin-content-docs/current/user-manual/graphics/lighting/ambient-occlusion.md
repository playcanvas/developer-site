---
title: アンビエントオクルージョン(AO)
---

アンビエントオクルージョンは、環境によるオクルージョンに基づいて、どれくらいの光が表面に到達するかを予測する技法です。

PlayCanvasでは、アンビエントライティングは拡散とスペキュラの両方のAOマップで乗算されます。

![Ambient Occlusion comparison: without/with](/img/user-manual/graphics/lighting/lightmapping/model-ao-comparison.jpg)  
*Left: without AO; Right: with Global AO*

AOマップは、異なるスケールの場合があります。例えば、モデルの異なる部分の大きなシャドーイング効果を伴う表面の裂け目またはワールドスケールのAOを示すテクスチャ詳細AO。スケールの大きいAOは、より多くのエフェクトをもたらし、通常はUV1のライトマップと一致し、より重要です。

## レンダリンググローバルAO

AOのレンダリングは、一般的な3Dモデリングとarchvizツールを使用して行うことができます。 [Lightmapping Section][0]に記述されているLightmapのレンダリングと事実上同じです。

特別なマテリアルがすべてのジオメトリに適用され、それによってAOのように見えるように塗りつぶされるため、いくつかの小さな違いがあり、テクスチャへのレンダリング中に異なる設定が行われます。

VRayを使用した3D's Maxでは、**VRayDirt**タイプと**Ambient Occlusion**モードのマテリアルを作成することで行います。ここで**radius**は望ましい結果を得るために変更できます。

![3D's Max: Ambient Occlusion VRay Material](/img/user-manual/graphics/lighting/lightmapping/3ds-max-ao-rendering.png)

このマテリアルは、アンビエントオクルージョンマップ内にあるすべての静的ジオメトリに適用する必要があります。3D's Maxでは個々のオブジェクトに手動で適用するか、**Override mtl**プロパティを使用してVRay Render Settingsを使用して行うことができます。このようにして、個々のマテリアルは保存され便利です。

![3D's Max VRay Render Settings: Override mtl](/img/user-manual/graphics/lighting/lightmapping/3ds-max-vray-override-mtl.png)

次に、このデータをテクスチャに取り込む必要があります。3D's Maxでは、[Render To Texture][3]を使用して行います。ライトマッピングレンダリング時と同じですが、**出力**オプションは**VRayCompleteMap**を使用する必要があります。

AO Textureは非常に詳細な情報を格納する必要はなく、視覚的にはテクスチャ圧縮アーティファクトの悪影響はあまりありません。そのため、JPEGは経済的で適切な形式です。

## エディタにアップロード

Editorでテクスチャをアップロードし、マテリアルのAmbient Occlusionスロットに適用するだけです。

![Editor Ambient Occlusion Map](/img/user-manual/graphics/lighting/lightmapping/editor-ao-map.png)

## 例

上で説明したグローバルアンビエントオクルージョンを使用する[例][6]やその[project][7]をご確認ください。

[![PlayCanvas Lightmapping](/img/user-manual/graphics/lighting/lightmapping/playcanvas-lightmapping-scene.jpg)][6]  
*The lighting in this scene is implemented using Lightmap and AO textures and Box Projected IBL (reflections)*

[0]: /user-manual/graphics/lighting/lightmapping/
[3]: /user-manual/graphics/lighting/lightmapping#render-to-texture
[6]: https://playcanv.as/p/zdkARz26/
[7]: https://playcanvas.com/project/446587/overview/archviz-example

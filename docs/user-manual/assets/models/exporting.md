---
title: Exporting Assets
---

PlayCanvas can import 3D content in the following formats: glTF binary (GLB), FBX, OBJ, 3DS and COLLADA (DAE). We strongly recommend you use GLB as it's an open source industry standard and very well supported in the Editor.

![GLB Import Example](/img/user-manual/assets/models/building/glb-import.gif)  
*Model by Loïc Norgeot and mosquito scan by Geoffrey Marchal for [Sketchfab](https://sketchfab.com/3d-models/real-time-refraction-demo-mosquito-in-amber-37233d6ed84844fea1ebe88069ea58d1) licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)*

If GLB is not available, then please use FBX as it is a robust and well tested interchange industry format.

## General export tips

* Only export what you need from your scene. For example, if your scene contains a red car and a blue car but you only want to import the red car, export only the red car. Your modeling application should have an 'Export Selected' or similar option.

## Tips for Exporting to GLB

* Set the format to glTF Binary (GLB).
* Ensure that materials and images are set to be exported and embedded in the GLB. Otherwise, you must upload all scene textures separately and relink all textures to materials and re-configure the materials parameters.

## Tips for Exporting to FBX

* Ensure you have the latest available FBX exporter for your modelling application installed.
* Select the 'Embed Media' option in the FBX exporter panel. This packages the scene's textures in the exported FBX. This preserves material to textures links during import into PlayCanvas. Otherwise, you must upload all scene textures separately and relink all textures to materials.
* Select the 'Binary' file format option in the FBX exporter panel. This reduces FBX file size considerably.

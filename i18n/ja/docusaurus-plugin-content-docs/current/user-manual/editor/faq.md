---
title: よくある質問
---



## コンポーネントを追加するには?

エンティティに**コンポーネント**を追加するには、エンティティを選択して、**インスペクター**で **Add Component** をクリックするか、エンティティを右クリックし、Add Component コンテキストメニューからコンポーネントを選択してください。

[詳細を見る](/user-manual/editor/scenes/components/)

## スクリプトを追加するには?

<img src="https://playcanvas.com/static-assets/instructions/add-new-script.gif" />

JavaScriptを使用してエンティティの動作を制御できます。 エンティティを選択し、スクリプトコンポーネントを追加し、新しいスクリプトアセットを作成してください。

[Learn more](/user-manual/editor/scripting/managing-scripts/)

## 背景色を変更するには?

シーンの背景色を変更するには、シーンのカメラの Clear Color プロパティを更新する必要があります。

または、シーンに[スカイボックス](/user-manual/editor/assets/inspectors/cubemap/)を追加することもできます。

[詳細を見る](/user-manual/editor/scenes/components/camera/)

## モデルのマテリアルを変更するには?

<img src="https://playcanvas.com/static-assets/instructions/change_material.gif" />

3Dモデルのすべての表面は、**マテリアル**を使用してレンダリングされます。マテリアルは、表面の色、光沢、凹凸などのプロパティを定義します。

新しいマテリアルを作成し、それをモデルにドラッグ&ドロップするか、既存のマテリアルを選択してインスペクターでプロパティを編集することができます。

[詳細を見る](/user-manual/editor/assets/inspectors/material/)

## キューブマップを作成するには?

<img src="https://playcanvas.com/static-assets/instructions/new_cubemap.gif" />

キューブマップは、6つのテクスチャアセットから構成される特殊なタイプのテクスチャアセットです。各テクスチャは、キューブの各面を表します。

キューブマップを作成するには、アセットパネルの**<span class="pc-icon">&#57632;</span> Add**ボタンをクリックして**New Cubemap**を選択し、キューブマップインスペクターに6つのテクスチャをドラッグします。物理ベースのレンダリングを活用するには、6つのテクスチャを設定した後に**Prefilter**をクリックする必要があります。

[詳細を見る](/user-manual/editor/assets/inspectors/cubemap/)

## エンティティを作成するには?

<img src="https://playcanvas.com/static-assets/instructions/new_entity.gif" />

ヒエラルキーパネルの<span class="pc-icon">&#57632;</span> Addボタンをクリックするか、エンティティを右クリックして**New Entity**メニュー項目を使用することで、新しいエンティティを作成できます。

## ライトを作成するには?

エンティティに**Light**コンポーネントを追加することで、ライトを作成できます。また、エンティティを右クリックしてNew Entity / Directional Lightを選択して、新しい方向性ライトを作成することもできます。

[詳細を見る](/user-manual/editor/scenes/components/light/)

## マテリアルを作成するには?

3Dモデルのすべての表面は、**マテリアル**を使用してレンダリングされます。マテリアルは、表面の色、光沢、凹凸などのプロパティを定義します。

マテリアルを作成するには、アセットパネルの**<span class="pc-icon">&#57632;</span> Add**ボタンをクリックして、**New Material**を選択します。

[詳細を見る](/user-manual/editor/assets/inspectors/material/)

## 新しいシェーダを作成するには?

アセットパネルから新しいシェーダアセットを作成できます。**Add Asset -> Shader**をクリックしてください。

[チュートリアルを見る](http://developer.playcanvas.com/tutorials/custom-shaders/)

## ボックスや球体のような形状を作成するには?

<img src="https://playcanvas.com/static-assets/instructions/new_box.gif" />

エンティティに**Render Component**を追加し、そのタイプを望む形状に変更することで、ボックス、球体などの原始的な形状を追加できます。

他の形状についても同様に、エンティティを右クリックしてNew Entity/Boxを選択することができます。

[詳細を見る](/user-manual/editor/scenes/components/render/)

## スカイボックスを作成するには?

シーンにスカイボックスを作成するには、まず[Cubemapアセット](/user-manual/editor/assets/inspectors/cubemap/)を作成する必要があります。その後、Cubemapを3Dビューポートにドラッグアンドドロップするか、Scene Settingsに移動してSkyboxフィールドにCubemapをドラッグします。

[詳細を見る](/user-manual/editor/interface/settings/rendering/)

## アセットを削除するには?

アセットを選択し、**Delete**を押すか、右クリックしてDeleteを選択します。

## エンティティを削除するには?

エンティティを選択し、**Delete**を押すか、ヒエラルキーパネルの<span class="pc-icon">&#57636;</span> Deleteボタンをクリックするか、エンティティを右クリックしてコンテキストメニューからDeleteを選択することで、エンティティを削除できます。

## エンティティを複製するには?

ヒエラルキーパネルの<span class="pc-icon">&#57638;</span> Duplicateボタンを使用するか、**Ctrl+D**を押してエンティティを複製できます。

また、エンティティをコピーして貼り付けることもできます。コピーするには**Ctrl + C**、貼り付けるには**Ctrl + V**を押します。

## アニメーションを再生するには?

3Dモデルのアニメーションを再生するには、 [モデルコンポーネント](/user-manual/editor/scenes/components/model/)と[アニメーションコンポーネント](/user-manual/editor/scenes/components/animation/)を持つエンティティを作成します。 **モデルコンポーネント**がモデルをレンダリングして、 **アニメーションコンポーネント**がアニメーションを再生します。

モデルをレンダリングするには、モデルコンポーネントのAssetフィールドにモデルアセットをドラッグします。アニメーションを再生するには、アニメーションコンポーネントのAssetフィールドにアニメーションアセットをドラッグします。

## サウンドを再生するにはどうすればよいですか?

サウンドを再生するには、Entityに[Sound component](/user-manual/editor/scenes/components/sound/)を追加する必要があります。その後、[Audio assets](/user-manual/editor/assets/inspectors/audio/) を再生するスロットを作成することができます。スロットを追加して、オーディオアセットをアセットフィールドにドラッグアンドドロップします。サウンドを聞くためには、[AudioListener component](/user-manual/editor/scenes/components/audiolistener/)をEntityに追加する必要があります。通常はカメラEntityに追加します。

オーディオアセットは、コンピュータからAssetsパネルにオーディオファイルをドラッグアンドドロップすることで作成できます。

[チュートリアルを見る](/tutorials/basic-audio/)

## コンポーネントを削除するにはどうすればよいですか?

<img src="https://playcanvas.com/static-assets/instructions/remove_component.jpg" />

コンポーネントを削除するには、Entityを選択して、Inspectorのコンポーネントのタイトルの横にある**<span class="pc-icon">&#57636;</span> Delete** ボタンをクリックします。

## 3Dモデルをレンダリングするには?

<img src="https://playcanvas.com/static-assets/instructions/new_model.gif" />

3Dモデルをレンダリングするには、エンティティに**Modelコンポーネント**を追加し、アセットフィールドに**Modelアセット**をドラッグ＆ドロップする必要があります。または、アセットパネルからモデルアセットを3Dビューポートにドラッグ＆ドロップすることもできます。

[詳細を見る](/user-manual/editor/scenes/components/model/)

## Entityを移動/回転/拡大縮小するにはどうすればよいですか?

<img src="https://playcanvas.com/static-assets/instructions/transform.gif" />

Entityを移動するには、それを選択して、**<span class="pc-icon">&#57617;</span> Translate tool**を使用して移動します。回転させるには、**<span class="pc-icon">&#57619;</span> Rotate tool**を使用し、拡大縮小するには、**<span class="pc-icon">&#57618;</span> Scale tool**を使用します。

Translate / Rotate / Scaleツールを切り替えるには、それぞれ1/2/3を押します。

## アセットをアップロードするには?

アセットをアップロードするには、コンピュータからファイルをAssetsパネルにドラッグアンドドロップするだけです。ファイルはサーバーで処理され、Assetsパネルにすぐに表示されます。

[詳細を見る](/user-manual/editor/assets/importing/)

## 物理を使用するには?

Entityに物理特性を与えるには、 [Collision component](/user-manual/editor/scenes/components/collision/) と [RigidBody component](/user-manual/editor/scenes/components/rigidbody/) を追加する必要があります。Collision componentはEntityに物理的な形状を与え、RigidBody componentはEntityを物理エンジンでシミュレーションします。

デフォルトの [gravity](/user-manual/editor/interface/settings/physics/) を変更することができます。

[チュートリアルを見る](/tutorials/collision-and-triggers/)

## リアルタイムシャドウを使用するには?

リアルタイムシャドウは、**Cast Shadows**が有効になっている各光源に対してレンダリングされます。シャドウを有効にするには、Lightコンポーネントを持つEntityを選択して、Cast Shadowsを有効にします。また、シーン内の任意のModelコンポーネントでもCast Shadowsを有効にする必要があります。

[詳細を見る](/user-manual/graphics/lighting/shadows/)

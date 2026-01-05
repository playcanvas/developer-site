---
title: マテリアルの基本設定
tags: [materials,basics]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/186/KM6GIE-image-75.jpg"
---

マテリアルは、3Dモデルの表面の外観を定義するものです。最も単純な場合、マテリアルはポリゴンの色を設定します。最も複雑な場合、マテリアルは海の表面やガラスを通過する光の振る舞いなどをシミュレートすることができます。

このチュートリアルでは、マテリアルの作成方法、プリミティブ形状への割り当て、およびマテリアルのプロパティの編集方法について説明します。まず、新しい空のシーンを作成してください。

## ステップ1 - シーンにキューブを追加

シーンのルートエンティティを選択します。初期の名前は "Root" と呼ばれます。属性エディタで、エンティティの名前を "Material Tutorial" のような意味のある名前に変更します。

ヒエラルキーパネルで 'New Entity'-> 'Box' メニューを選択します。これにより、ヒエラルキーに新しいボックスエンティティが作成されます。

![New Box](/img/tutorials/beginner/basic-materials/new-box.jpg)

## ステップ2 - 新しいマテリアルを作成

PlayCanvasエディターのインターフェースから直接新しいマテリアルを作成します。アセットパネルで+ボタンを使用して、新しいアセットメニューを開き、マテリアルを選択します。

![Add Material](/img/tutorials/beginner/basic-materials/new-material.jpg)

これにより、新しいマテリアルアセットが作成され、画面の右側にマテリアルエディタが表示されます。マテリアルエディタで、マテリアルの名前を「Box Material」と変更してください。

## ステップ3 - キューブにマテリアルを割り当てる

エディタで新しいキューブを作成すると、マテリアルが割り当てられず、デフォルトのプレーンなマテリアルが使用されます。シーン内のモデルに新しいマテリアルを割り当てるには、単純にアセットパネルからモデルをビューポートにドラッグして、割り当てたいモデルの上にドロップします。

## ステップ4 - マテリアルの色を変更する

マテリアルの色を変更するには、マテリアルの *Diffuse* プロパティを編集する必要があります。

マテリアルを選択するには、アセットパネルでそれをクリックするか、ボックスを選択したときにプロパティインスペクターから選択します。

![Diffuse Color](/img/tutorials/beginner/basic-materials/diffuse-panel.jpg)

マテリアルエディタの右パネルで、Diffuse設定パネルを展開してください。カラープロパティをクリックして、マテリアルのDiffuseカラーを編集します。

## ボーナス - マテリアルにテクスチャを追加する

マテリアルの色を変更することは良いスタートですが、フラットな色だけでは詳細な表現が必要になることがあります。そのために、テクスチャマップが役立ちます。

こちらからサンプルのテクスチャをダウンロードして保存してください。

![Sample Diffuse Map](/img/tutorials/beginner/basic-materials/proto_orange.png)

![Sample Normal Map](/img/tutorials/beginner/basic-materials/proto_gray_n.png)

その後、エディタにドラッグしてファイルをアップロードします。

アップロードすると、マテリアルのテクスチャスロットにそれらを割り当てる時が来ました。前述のようにマテリアルを選択して、Diffuseセクションを開きます。アセットパネルから `proto_orange` テクスチャを空の拡散スロットにドラッグします。次にNormalsセクションを開き、 `proto_gray_n` テクスチャをNormalマップスロットにドラッグします。

以下のようなものが表示されます。

![Cube](/img/tutorials/beginner/basic-materials/diffuse_normal_cube.jpg)

テクスチャがキューブに巻き付けられる方法を変更するには、 **Tiling** および **Offset** プロパティを変更してみてください。

マテリアルを設定するのにさらに深い知識が必要な場合は、ユーザーマニュアルの[物理マテリアル](/user-manual/graphics/physical-rendering/physical-materials/)セクションを参照してください。

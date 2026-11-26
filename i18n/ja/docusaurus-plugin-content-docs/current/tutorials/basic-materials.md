---
title: マテリアルの基本設定
tags: [materials,basics]
thumb: /img/tutorials/basic-materials/thumbnail.webp
description: マテリアルを作成してメッシュに割り当て、プリミティブで色と物理ベースシェーディングを段階的に調整します。
---

マテリアルは、3Dモデルの表面の外観を定義するものです。最も単純な場合、マテリアルは表面の色を設定します。最も複雑な場合は、海面や、ガラスを通過する光の振る舞いをシミュレートすることもできます。

このチュートリアルでは、マテリアルを作成してボックスに割り当て、色を変更し、最後にテクスチャを追加します。どのシーンでも進められますが、**Blank Project** キットから作成した新しいプロジェクトで始めるのがおすすめです。

## ステップ1 - シーンにボックスを追加する

[Hierarchy](/user-manual/editor/interface/hierarchy)（ヒエラルキー）パネルで **+**（エンティティを追加）ボタンをクリックし、**3D** > **Box** を選択します。

![3D > Box がハイライトされたエンティティ追加メニュー](/img/tutorials/basic-materials/add-box.webp)

これにより、ボックスを描画する[Renderコンポーネント](/user-manual/editor/scenes/components/render)を持つ、Box という名前の新しいエンティティが作成されます。Blank Project のようにシーンにすでにボックスがある場合は、そのボックスを使っても構いません。

## ステップ2 - マテリアルを作成する

[Assets](/user-manual/editor/assets/asset-panel)（アセット）パネルで **+**（アセットを追加）ボタンをクリックし、**Material** を選択します。

![Material がハイライトされたアセット追加メニュー](/img/tutorials/basic-materials/add-material.webp)

New Material という名前の新しいマテリアルがアセットパネルに表示されます。それを選択して[Inspector](/user-manual/editor/interface/inspector)（インスペクター）にプロパティを表示し、**Name** を `Box Material` に変更します。

## ステップ3 - ボックスにマテリアルを割り当てる

マテリアルを割り当てるまで、新しいボックスはプレーンなデフォルトマテリアルで描画されます。マテリアルを割り当てるには、アセットパネルから[Viewport](/user-manual/editor/interface/viewport)（ビューポート）にドラッグし、ボックスの上にドロップします。

インスペクターで割り当てることもできます。ボックスを選択し、Renderコンポーネントの一番下にある **Materials** を見つけます。マテリアルを **Material #0** スロットにドラッグするか、スロットの鉛筆アイコンをクリックしてからアセットパネルでマテリアルをクリックします。

![Box Material が割り当てられた Render コンポーネントの Materials プロパティ](/img/tutorials/basic-materials/assign-material.webp)

新しいマテリアルは白なので、この時点ではボックスの見た目は変わりません。

## ステップ4 - マテリアルの色を変更する

アセットパネルで Box Material を選択します。インスペクターで **Diffuse** セクションを展開し、**Color** のスウォッチをクリックしてカラーピッカーを開きます。色を選ぶか、`2979FF` のような16進数の値を入力します。

![カラーピッカーを開いたマテリアルの Diffuse セクションと、青くなったボックス](/img/tutorials/basic-materials/diffuse-color.webp)

マテリアルを編集すると、ビューポートのボックスもすぐに更新されます。同じマテリアルを使用する他のメッシュも同様に更新されます。

## ボーナス - マテリアルにテクスチャを追加する

マテリアルの色を変更するのは良いスタートですが、すぐに単色以上のディテールが欲しくなるでしょう。そこで役立つのがテクスチャマップです。

次の2つのサンプルテクスチャをダウンロードして保存してください。

![Sample Diffuse Map](/img/tutorials/basic-materials/proto_orange.webp)

![Sample Normal Map](/img/tutorials/basic-materials/proto_gray_n.webp)

次に、ファイルをアセットパネルにドラッグして、プロジェクトに[アップロード](/user-manual/editor/assets/importing)します。

アップロードできたら、マテリアルのテクスチャスロットに割り当てます。

1. Box Material を選択し、**Diffuse** セクションを展開します。アセットパネルから `proto_orange.png` を空の **Diffuse** スロットにドラッグします。
2. ディフューズの **Color** はテクスチャに色を乗算するため、白（`FFFFFF`）に戻して、テクスチャ本来の色が見えるようにします。
3. **Normals** セクションを展開し、`proto_gray_n.png` を空の **Normals** スロットにドラッグします。

![ディフューズマップと法線マップを割り当てたボックス](/img/tutorials/basic-materials/textured-box.webp)

法線マップは色ではなく表面の向きを格納するため、sRGBとして扱ってはいけません。アセットパネルで `proto_gray_n.png` を選択し、インスペクターで **sRGB** のチェックを外します。チェックを外すまで、エディターのコンソールに警告が表示されます。

![sRGB のチェックを外したインスペクターの Texture セクション](/img/tutorials/basic-materials/normal-map-srgb.webp)

マテリアルの **Texture Transform** セクションにある **Offset** と **Tiling** を変更して、テクスチャがボックスに巻き付けられる方法を変えてみてください。

マテリアルの設定についてさらに詳しく知るには、[物理マテリアル](/user-manual/graphics/physical-rendering/physical-materials/)と[マテリアルインスペクター](/user-manual/editor/assets/inspectors/material/)のリファレンスを参照してください。

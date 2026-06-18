---
title: 最初のモデルとアニメーションのインポート方法
tags: [animation,basics]
thumb: /img/tutorials/importing-first-model-and-animation/thumbnail.jpg
description: リグ付きキャラクターをインポートし、Animation Component を設定し、パッケージされたサンプル Asset のクリップを再生します。
---

<div className="iframe-container">
    <iframe src="https://www.youtube.com/embed/r0LYQw7laRA" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## 概要

このチュートリアルでは、最初のアニメーションモデルをプロジェクトに追加する方法を説明します。

![](pathname:///img/tutorials/importing-first-model-and-animation/preview.gif)

## サンプルアセットの入手

[Kenney Animated Characters アセットパック](https://www.kenney.nl/assets/animated-characters-1)を使用します。

![](pathname:///img/tutorials/importing-first-model-and-animation/kenney-site.jpg)

ダウンロードして解凍したら、内容を確認しましょう。

モデルとアニメーションのファイルを分離しているため、使いやすいです。

![](pathname:///img/tutorials/importing-first-model-and-animation/asset-pack-contents.png)

## モデルのFBXファイルのインポート

まずはモデルファイルに注目しましょう。

モデルフォルダを開き、FBXファイルをプロジェクトアセットパネルにドラッグします。

すると、ファイルがプロジェクトにインポートされ、PlayCanvasエディターがマテリアル (Material) 、コンテナ (Container) 、レンダー(Render) アセット、そして最も重要なテンプレート (Template) アセットを作成します。

![](pathname:///img/tutorials/importing-first-model-and-animation/importing-model-fbx.gif)

既存のプロジェクトにFBXをインポートする場合は、Project Settings -> Asset Importで以下の設定を確認してください。

![](pathname:///img/tutorials/importing-first-model-and-animation/asset-tasks-settings.png)

## モデルテンプレートをシーンに追加

テンプレートアセットは、完全なEntityヒエラルキーを含み、モデルをシーンに追加するために使用されます。

次のように複数の方法でできます。

選択したEntityの子として、3Dビューポートにドラッグするだけです。

![](pathname:///img/tutorials/importing-first-model-and-animation/template-add-scene-view.gif)

Entityのヒエラルキービューにドラッグすると、そのEntityの子として追加されます。

![](pathname:///img/tutorials/importing-first-model-and-animation/template-add-on-entity.gif)

ヒエラルキービューの空白領域にドラッグすると、シーンで最上位のEntityの子に追加されます。

![](pathname:///img/tutorials/importing-first-model-and-animation/template-add-scene-hierarchy-area.gif)

最後に、Entityを右クリックしてテンプレートのコンテキストメニューオプションを選択します。

![](pathname:///img/tutorials/importing-first-model-and-animation/template-add-context-menu.gif)

シーンに追加されたので、テクスチャがないことが分かります。今回の場合、FBXにテクスチャが埋め込まれておらず、別途用意されています。

もしFBXに埋め込まれていた場合は、インポートプロセスがテクスチャアセットを作成し、適切なマテリアルに割り当てます。

ここでは、テクスチャアセットが作成され、テクスチャが割り当てられたマテリアルを確認できます。

![](pathname:///img/tutorials/importing-first-model-and-animation/embedded-textures-fbx-example.png)

## テクスチャをモデルに追加

さて、Kenney Characterへ戻りましょう。skinフォルダからテクスチャを1つアップロードし、モデルのマテリアルに適用しましょう。

![](pathname:///img/tutorials/importing-first-model-and-animation/importing-texture.gif)

テクスチャアセットをマテリアルスロットにドラッグすることで、これを行うことができます。

![](pathname:///img/tutorials/importing-first-model-and-animation/texture-to-material.gif)

または、マテリアルスロットの 'Edit' ボタンを使用し、アセットパネルでそれを見つけることもできます。

![](pathname:///img/tutorials/importing-first-model-and-animation/material-pick-texture.gif)

素晴らしい！これでシーンに完全にテクスチャが施されたモデルがあり、アニメーションの準備が整いました。

## アニメーション付きのFBXのインポート

先ほど述べたように、アニメーションは別のFBXファイルにありますので、ランニングアニメーションをエディタにインポートしましょう。

![](pathname:///img/tutorials/importing-first-model-and-animation/importing-animation-fbx.gif)

これにより、アニメーションを含むいくつかのアセットが作成されます。必要なのはそれだけなので、他の作成されたアセットは削除しても構いません。

![](pathname:///img/tutorials/importing-first-model-and-animation/delete-animation-files.png)

ここから、アセットパネルとインスペクターでそれを選択することでアニメーションをプレビューすることができます。また、アニメーションを適用するプレビューアセットを選択する必要もあります。この場合、先にインポートしたモデルFBXのために作成されたテンプレートアセットになります。

![](pathname:///img/tutorials/importing-first-model-and-animation/animation-preview.gif)

## モデルのアニメーション

キャラクターにアニメーションを追加するために、エンティティのAnimコンポーネントを使用し、さらにAnim State Graphアセットを作成する必要があります。

Anim State Graphアセットは、アセットパネルで右クリックし、'New Asset'  -> 'Anim State Graph' を選択することで作成されます。

![](pathname:///img/tutorials/importing-first-model-and-animation/create-anim-state-graph.gif)

グラフアセットには複数のステートがあり、各ステートにはアニメーションが割り当てられることがあります。ステート間のフローは、条件付きのトランジションによって制御されます。

![](pathname:///img/tutorials/importing-first-model-and-animation/anim-state-graph.png)

このチュートリアルでは、単一のステートと単一のアニメーションに焦点を当てます。アニメーションに関する詳細なドキュメントやチュートリアルは  [こちら](/user-manual/animation/)で確認できます。

モデルにグラフを追加するためには、シーン内のテンプレートエンティティインスタンスを選択し、インスペクターにてAnimコンポーネントを追加します。

Animコンポーネントでは、Anim State Graphアセットを割り当て、グラフ内のステートがコンポーネントに表示されます。ここで、アニメーションアセットをステートに割り当ててプロジェクトを起動することができます。

![](pathname:///img/tutorials/importing-first-model-and-animation/add-anim-component.gif)

![](pathname:///img/tutorials/importing-first-model-and-animation/add-animation-to-anim.gif)

以上です！最初のモデルとループアニメーションをPlayCanvasに正常にインポートしました！

![](pathname:///img/tutorials/importing-first-model-and-animation/preview.gif)

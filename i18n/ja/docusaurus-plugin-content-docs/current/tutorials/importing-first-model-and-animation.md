---
title: 最初のモデルとアニメーションのインポート方法
tags: [animation,basics]
thumb: /img/tutorials/importing-first-model-and-animation/thumbnail.jpg
description: リグ付きキャラクターをインポートし、Animation Component を設定し、パッケージされたサンプル Asset のクリップを再生します。
---

import StepVideo from '@site/src/components/StepVideo';

<div className="iframe-container">
    <iframe src="https://www.youtube.com/embed/r0LYQw7laRA" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## 概要

このチュートリアルでは、最初のアニメーションモデルをプロジェクトに追加する方法を説明します。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/preview.mp4" poster="/img/tutorials/importing-first-model-and-animation/preview.webp" width={932} height={480} />

## サンプルアセットの入手

[Kenney Animated Characters アセットパック](https://www.kenney.nl/assets/animated-characters-1)を使用します。

![](/img/tutorials/importing-first-model-and-animation/kenney-site.jpg)

ダウンロードして解凍したら、内容を確認しましょう。

モデルとアニメーションのファイルを分離しているため、使いやすいです。

![](/img/tutorials/importing-first-model-and-animation/asset-pack-contents.png)

## モデルのFBXファイルのインポート

まずはモデルファイルに注目しましょう。

モデルフォルダを開き、FBXファイルをプロジェクトアセットパネルにドラッグします。

すると、ファイルがプロジェクトにインポートされ、PlayCanvasエディターがマテリアル (Material) 、コンテナ (Container) 、レンダー(Render) アセット、そして最も重要なテンプレート (Template) アセットを作成します。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/importing-model-fbx.mp4" poster="/img/tutorials/importing-first-model-and-animation/importing-model-fbx.webp" width={1019} height={480} />

既存のプロジェクトにFBXをインポートする場合は、Project Settings -> Asset Importで以下の設定を確認してください。

![](/img/tutorials/importing-first-model-and-animation/asset-tasks-settings.png)

## モデルテンプレートをシーンに追加

テンプレートアセットは、完全なEntityヒエラルキーを含み、モデルをシーンに追加するために使用されます。

次のように複数の方法でできます。

選択したEntityの子として、3Dビューポートにドラッグするだけです。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/template-add-scene-view.mp4" poster="/img/tutorials/importing-first-model-and-animation/template-add-scene-view.webp" width={934} height={480} />

Entityのヒエラルキービューにドラッグすると、そのEntityの子として追加されます。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/template-add-on-entity.mp4" poster="/img/tutorials/importing-first-model-and-animation/template-add-on-entity.webp" width={934} height={480} />

ヒエラルキービューの空白領域にドラッグすると、シーンで最上位のEntityの子に追加されます。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/template-add-scene-hierarchy-area.mp4" poster="/img/tutorials/importing-first-model-and-animation/template-add-scene-hierarchy-area.webp" width={934} height={480} />

最後に、Entityを右クリックしてテンプレートのコンテキストメニューオプションを選択します。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/template-add-context-menu.mp4" poster="/img/tutorials/importing-first-model-and-animation/template-add-context-menu.webp" width={934} height={480} />

シーンに追加されたので、テクスチャがないことが分かります。今回の場合、FBXにテクスチャが埋め込まれておらず、別途用意されています。

もしFBXに埋め込まれていた場合は、インポートプロセスがテクスチャアセットを作成し、適切なマテリアルに割り当てます。

ここでは、テクスチャアセットが作成され、テクスチャが割り当てられたマテリアルを確認できます。

![](/img/tutorials/importing-first-model-and-animation/embedded-textures-fbx-example.png)

## テクスチャをモデルに追加

さて、Kenney Characterへ戻りましょう。skinフォルダからテクスチャを1つアップロードし、モデルのマテリアルに適用しましょう。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/importing-texture.mp4" poster="/img/tutorials/importing-first-model-and-animation/importing-texture.webp" width={830} height={480} />

テクスチャアセットをマテリアルスロットにドラッグすることで、これを行うことができます。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/texture-to-material.mp4" poster="/img/tutorials/importing-first-model-and-animation/texture-to-material.webp" width={932} height={480} />

または、マテリアルスロットの 'Edit' ボタンを使用し、アセットパネルでそれを見つけることもできます。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/material-pick-texture.mp4" poster="/img/tutorials/importing-first-model-and-animation/material-pick-texture.webp" width={932} height={480} />

素晴らしい！これでシーンに完全にテクスチャが施されたモデルがあり、アニメーションの準備が整いました。

## アニメーション付きのFBXのインポート

先ほど述べたように、アニメーションは別のFBXファイルにありますので、ランニングアニメーションをエディタにインポートしましょう。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/importing-animation-fbx.mp4" poster="/img/tutorials/importing-first-model-and-animation/importing-animation-fbx.webp" width={807} height={480} />

これにより、アニメーションを含むいくつかのアセットが作成されます。必要なのはそれだけなので、他の作成されたアセットは削除しても構いません。

![](/img/tutorials/importing-first-model-and-animation/delete-animation-files.png)

ここから、アセットパネルとインスペクターでそれを選択することでアニメーションをプレビューすることができます。また、アニメーションを適用するプレビューアセットを選択する必要もあります。この場合、先にインポートしたモデルFBXのために作成されたテンプレートアセットになります。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/animation-preview.mp4" poster="/img/tutorials/importing-first-model-and-animation/animation-preview.webp" width={935} height={480} />

## モデルのアニメーション

キャラクターにアニメーションを追加するために、エンティティのAnimコンポーネントを使用し、さらにAnim State Graphアセットを作成する必要があります。

Anim State Graphアセットは、アセットパネルで右クリックし、'New Asset'  -> 'Anim State Graph' を選択することで作成されます。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/create-anim-state-graph.mp4" poster="/img/tutorials/importing-first-model-and-animation/create-anim-state-graph.webp" width={935} height={480} />

グラフアセットには複数のステートがあり、各ステートにはアニメーションが割り当てられることがあります。ステート間のフローは、条件付きのトランジションによって制御されます。

![](/img/tutorials/importing-first-model-and-animation/anim-state-graph.png)

このチュートリアルでは、単一のステートと単一のアニメーションに焦点を当てます。アニメーションに関する詳細なドキュメントやチュートリアルは  [こちら](/user-manual/animation/)で確認できます。

モデルにグラフを追加するためには、シーン内のテンプレートエンティティインスタンスを選択し、インスペクターにてAnimコンポーネントを追加します。

Animコンポーネントでは、Anim State Graphアセットを割り当て、グラフ内のステートがコンポーネントに表示されます。ここで、アニメーションアセットをステートに割り当ててプロジェクトを起動することができます。

<StepVideo src="/video/tutorials/importing-first-model-and-animation/add-anim-component.mp4" poster="/img/tutorials/importing-first-model-and-animation/add-anim-component.webp" width={935} height={480} />

<StepVideo src="/video/tutorials/importing-first-model-and-animation/add-animation-to-anim.mp4" poster="/img/tutorials/importing-first-model-and-animation/add-animation-to-anim.webp" width={935} height={480} />

以上です！最初のモデルとループアニメーションをPlayCanvasに正常にインポートしました！

<StepVideo src="/video/tutorials/importing-first-model-and-animation/preview.mp4" poster="/img/tutorials/importing-first-model-and-animation/preview.webp" width={932} height={480} />

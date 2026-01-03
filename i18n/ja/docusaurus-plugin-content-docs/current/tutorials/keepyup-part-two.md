---
title: シンプルなゲームの作成 - パート2
tags: [games]
thumb: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406050/LIJTDO-image-75.jpg"
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/KH37bnOk/?overlay=false" title="Making a Simple Game - Part 2" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*[完成されたプロジェクトはこちら][16]です。先に[その1][1]を読んでください。*

## マテリアルの設定

このゲームのグラフィクスは非常に単純なものですので、たくさんの設定をしなければいけないということはありません。ボール、背景とオーバーレイについて設定を行います。

### マテリアルとは?

マテリアルとはPlayCanvasでのアセットのひとつで、3Dモデルがスクリーン上に描画される時、それがどのように見えるべきかを決めるものです。マテリアルは物体表面の色を決め、また同時に物体表面が光にどのように反応するかも決めます。例えば、マテリアルの設定によっては物体は金属のように滑らかになったり、ゴムのようにざらざらとしたものになります。PlayCanvasは物理的マテリアルという組み込みの機能をもっており、マテリアルの用途の9割ほどをカバーします。あなたが上級者になったら、自分のマテリアルを、GLSLシェーダ言語を用いて自分で書くこともできます。

### キューブマップ (Cubemap)

マテリアルについて話し始める前に、キューブマップの設定をします。キューブマップとは、立方体のそれぞれの面に貼られた6枚のテクスチャからなるアセットです。これはシーンの遠方にある背景として処理されます。PlayCanvasの物理的マテリアルは、キューブマップを画像ベースのライティングに使用することができます。このライティングは、キューブマップの色をシーン内のマテリアルを照らす明かりとして使います。例えば、このゲームのシーンでは、キューブマップは青い空と緑の草の地面です。そのため、ゲーム内のぼーるは上からは青い光で、下からは緑の光で照らされます。[詳しくはドキュメントを参照してください][7]。

![Cubemap](/img/tutorials/beginner/keepyup-part-two/cubemap-preview.jpg)

キューブマップを設定するには、まずキューブマップアセットをNew Assetメニューから作成し、キューブマップの面に6枚のテクスチャを割り当てます。キューブマップの6面全てにテクスチャを割り当てたら、"Prefilter"ボタンをクリックしてください。**プレフィルタリングはキューブマップを正しく動作させるために必要な準備です。**

## Footballマテリアル

![Football](/img/tutorials/beginner/keepyup-part-two/ball-material.jpg)

サッカーボールは[PlayCanvasアセットライブラリ][2]からインポートした3Dモデルです。footballマテリアルはすでに設定済みですが、いくつか単純な調整が必要になるかもしれません。サッカーボールに使われているそれぞれのテクスチャを確認してみましょう。

### ディフューズ (Diffuse)

![Diffuse](/img/tutorials/beginner/keepyup-part-two/ball-diffuse.jpg)

Diffuseマップは表面の色を決めます。このゲームでは黒と白のサッカーボールのパターンになっています。

### 環境マップ (Environment)

![Environment](/img/tutorials/beginner/keepyup-part-two/ball-env.jpg)

スペキュラマップの効果を説明するために必要なため、環境マップの説明を簡単にここでしておきます。環境マップの設定をしたい場合は、キューブマップをマテリアルのスロットにドラッグしてください。

### スペキュラーマップ (Specular)

![Specular](/img/tutorials/beginner/keepyup-part-two/ball-spec.jpg)

specular（鏡面）セクションはマテリアルがどのように照明と相互作用するかを決定します。specularには、「Metalnessワークフロー」と「Specularワークフロー」の2つの「ワークフロー」があります。詳細は[ドキュメント][6]をご確認ください。サッカーボールではMetalnessを使用しているので、「Use Metalness」チェックボックスをオンにしてください。サッカーボールは金属製でないので、metalnessスライダーを0になるようスライドさせます。次に、光沢スライダーを使用してマテリアルの滑らかさを設定します。ボールが滑らか過ぎず、ちょうど良い光沢になるよう約半分の位置に設定します。

### 法線 (Normal)

![Normal](/img/tutorials/beginner/keepyup-part-two/ball-normal.jpg)

最終に適用するテクスチャマップはnormal（法線）マップです。normalマップは、モデルにディテールを加えるために使用します。この場合、サッカーボールの繋ぎ目がジオメトリでモデル化されていませんが(滑らかな球体)、normalマップではモデル化されています。つまり、ボールは繋ぎ目があるかのように点灯しますが、余分なポリゴンのオーバーヘッドはありません。

## Backdropマテリアル

![Backdrop](/img/tutorials/beginner/keepyup-part-two/backdrop-material.jpg)

Backdropマテリアルはより単純です。テキスチャーマップは一つのみです。

### エミッシブ (Emissive)

![Emissive](/img/tutorials/beginner/keepyup-part-two/backdrop-emissive.jpg)

Emissiveマップは、表面の色を設定して、まるでその色の光を発光しているかのように見せます。つまり、シーン内の照明はEmissiveの表面の明るさに影響を与えません。Emissiveマテリアルはシーン内の他のオブジェクトには影響しませんが、実際に光は発光されません。

この場合、静的なシーンなので背景が点灯されないようにします。そのためには、Emissiveマップを使用します。

## オーバーレイマテリアル

![Overlay](/img/tutorials/beginner/keepyup-part-two/overlay-material.jpg)

オーバーレイ素材は、背景より簡単です。この場合、Emissiveプロパティの色を設定しています。

![Emissive](/img/tutorials/beginner/keepyup-part-two/overlay-emissive.jpg)

[その3][15]に進む。

[1]: /tutorials/keepyup-part-one/
[2]: https://store.playcanvas.com/
[6]: /user-manual/graphics/physical-rendering/physical-materials/
[7]: /user-manual/editor/assets/inspectors/cubemap/
[15]: /tutorials/keepyup-part-three/
[16]: https://playcanvas.com/project/406050

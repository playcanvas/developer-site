---
title: 物理マテリアル
---

PlayCanvasの物理ベースレンダリングを使用するには、物理マテリアルの構成方法を理解し、さまざまなパラメータを変更するとどのような効果があるかを理解する必要があります。

このセクションでは、マテリアルの最も有用なプロパティについて説明し、ライブデモでそれらを変更するとマテリアルの外観がどのように変化するかを確認できます。

ではまず最初に、キューブマップのワークフローについて説明します。

## イメージベースドライティング(IBL)

Editorに入りマテリアルを作成しても、マテリアルが下のサンプルと異なる理由を説明するために [IBL] [6] から始めます。**HDRでプレフィルタリングされたCubeMapを使用した物理的マテリアルは素晴らしいです！**

## メタリック (Metalness) とスペキュラ (Specular) ワークフロー

![Workflows](/img/user-manual/graphics/physical-rendering/specular-metalness-workflows.png)

PBRは、アセットまたはワークフローの作成に2つの異なる方法をよく使われます。2つのワークフローは同等で同じ結果を提供します。どちらを選択するかは、好み次第です。PlayCanvasでは、通常、メタリックフローを選択します。単一チャンネルのMetalnessマップが作成しやすく、通常はより効率的であるためです。

**Metalness**ワークフローでは、メタリックか非メタリックかを決定するメタリック値またはメタリックマップを設定します。通常、これは単純なバイナリ選択で、金属は1、非金属は0です。ほとんど2つの値の間に値が必要なことはありません。

**Specular**ワークフローでは、反射光の色と強度を決定するスペキュラ値またはスペキュラマップを設定します。

[Marmoset Toolbag blog](https://marmoset.co/posts/pbr-texture-conversion/)にこの二つの方法の違いがわかりやすく説明されています。

それではマテリアル設定に進んでいきましょう。

## マテリアルのプロパティとマップ

### ディフューズ (Diffuse)

Diffuseカラーはマテリアルのベースとなるカラーです。これはRGBカラー値です。クリーンで純粋な（金属、プラスチック）物質では、これは定数値である場合がありますが、Diffuseマップテクスチャとして指定することもできます。注：Diffuseマップにライトの詳細（シャドウやハイライト）を含めることは通常避けるべきです。これは他のマップで適用できます。

Diffuseカラーは **アルベド** や **ベースカラー** と呼ばれることもあります。

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/Q28EwTwQ/?color" title="Physical Materials - Diffuse" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

インターネット上を探すと、拡散色/アルベドの値と素材の対応表をすぐに見つけることができます。

![Metals](/img/user-manual/graphics/physical-rendering/metals.jpg)

| マテリアル (Material) | RGB                                      |
|----------|------------------------------------------|
| Gold     | (1.000, 0.766, 0.336) or [255, 195, 86]  |
| Silver   | (0.972, 0.960, 0.915) or [248, 245, 233] |
| Copper   | (0.955, 0.637, 0.538) or [244, 162, 137] |

### Metalness

金属質の値は、**金属質**を使ったマテリアル設定の方法の一部です。金属質は0から1の間の値を取り、そのマテリアルが金属か(1)、あるいは非金属か(0)を決定します。

:::note

金属質の値はほぼいつでも0か1かのいずれかを設定します。この間の値を設定する必要があることはまれです。

:::

また、金属質マップを使うと、マテリアルの特定の部分を金属に、特定の部分を非金属に設定することができます。

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/Q28EwTwQ/?metal" title="Physical Materials - Metalness" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

### 光沢度 (Glossiness)

光沢度 (Glossiness) は **Metalness** と **Specular** を使う方法の両方で使われ、マテリアルの表面がどのくらいなめらかかを定義します。光沢度はマテリアルの表面で反射する光がぼやけるか鋭いか、あるいはSpecularハイライトが広いか狭いかに影響します。光沢度は0から100の間の値か、あるいはGlossinessマップとして与えることができます。

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/Q28EwTwQ/?gloss" title="Physical Materials - Glossiness" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

いくつかの物理ベースレンダリングシステムでは、光沢度という用語の代わりに**粗さ (Roughness)**という用語を使います。粗さは光沢度の反対の意味です。光沢度と粗さを変換する際には、単純にその値を反転してください。

光沢度と粗さは、**microsurface値**という用語で呼ばれることもあります。

### All together

物理的マテリアルの仕組みでは、**拡散**、**金属質**、**光沢度**が重要な役割を果たします。下のデモを使って色々な組み合わせを試してみてください。

マテリアルの見た目をさらに良くするために、アンビエントオクルージョン、発光、透明度、法線マップとハイトマップといった様々なプロパティを使うことができます。

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/Q28EwTwQ/" title="Physical Materials - All" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

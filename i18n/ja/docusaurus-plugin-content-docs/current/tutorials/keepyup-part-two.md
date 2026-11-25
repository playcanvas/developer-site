---
title: "シンプルなゲームの作成 - パート2: ライティングとマテリアル"
description: Keepy Upを完成時の見た目に仕上げます。空の画像をイメージベースドライティングに変え、影を追加し、カメラのトーンマッピングを設定して、サッカーボールのマテリアルにつやを出します。
tags: [games]
thumb: /img/tutorials/keepyup-part-two/thumbnail.webp
---

[パート1](/tutorials/keepyup-part-one/)では、スタジアムとボールを配置しました。このパートでは、それらを照らします。1枚の空の画像が、背景にも、あらゆる方向からの光源にもなります。ボールには、見栄えのするつやのある仕上げを加えます。

:::info[はじめる前に]

パート1で作ったプロジェクトが必要です。自分の作業と比べるには、[完成したプロジェクト](https://playcanvas.com/project/1660780/overview/keepy-up)を開いてください。

:::

## 1. 空からキューブマップを作る {#make-a-cubemap-from-the-sky}

**Textures** フォルダーには、緑のフィールドの上に広がる空のパノラマ画像 `stadium-sky.png` が入っています。PlayCanvasは、このような空を[キューブマップ](/user-manual/editor/assets/inspectors/cubemap/)として使います。キューブマップは、シーンを取り囲む6枚の正方形の画像です。

1. アセットパネルで **Textures** を開き、`stadium-sky.png` を右クリックします。
2. **Create Cubemap** を選択します。エディターが6枚の面テクスチャと、`stadium-sky_cubemap` というキューブマップを追加します。
3. キューブマップを選択します。インスペクターで **Prefiltering** を見つけ、**PREFILTER CUBEMAP** を選択します。

![キューブマップのインスペクター](/img/tutorials/keepyup-part-two/cubemap.webp)

プリフィルタリングは、空をぼかしたコピーを作ります。粗い表面はぼやけた空を映し、磨かれた表面はくっきりした空を映すので、エンジンにはその両方が必要です。これを[イメージベースドライティング](/user-manual/graphics/physical-rendering/image-based-lighting/)と呼びます。

## 2. スカイボックスを設定する {#set-the-skybox}

1. ツールバーの一番下にある歯車アイコンを選択して **Settings** を開き、**Rendering** を展開します。
2. アセットパネルから `stadium-sky_cubemap` を **Skybox** スロットにドラッグします。

![Rendering設定のSkyboxスロット](/img/tutorials/keepyup-part-two/skybox.webp)

ビューポートに空が表示され、シーン内のすべてがその空に照らされます。上からは青、下からは緑の光です。

## 3. トーンマッピングを選ぶ {#choose-the-tone-mapping}

トーンマッピングは、レンダリングされた画像の明るい値を、画面が表示できる範囲にどう収めるかを決めます。これはカメラごとのプロパティです。

1. **Camera** を選択します。
2. Cameraコンポーネントで、**Tonemapping** を **Neutral** に設定します。

![CameraコンポーネントのTonemapping設定](/img/tutorials/keepyup-part-two/tonemapping.webp)

**Neutral** は、選んだ色に近い色を保つので、このゲームの明るくシンプルな見た目に合います。他のオプションも試して、それぞれが画像をどう変えるか見てみてください。

## 4. 影を落とす {#cast-shadows}

ピッチに落ちる影は、ボールがどこにあるかをプレイヤーに伝えます。

1. **Light** を選択します。
2. Lightコンポーネントで、**Cast Shadows** をオンにします。
3. **Resolution** を `2048 x 2048`、**Cascades** を `2`、**Distance** を `420` に設定します。
4. **Shadow Bias** を `0.3`、**Normal Offset Bias** を `0.2` に設定します。

![Lightコンポーネントの影の設定](/img/tutorials/keepyup-part-two/shadows.webp)

**Distance** は、カメラからどこまで影を描画するかです。スタジアムは大きいので、この値も大きくする必要があります。**Cascades** は、その距離をいくつかの範囲に分け、それぞれにシャドウマップを割り当てます。これにより、ボールの影がくっきり保たれます。2つのバイアス値は、このスケールで表面が自分自身に影を落とすのを防ぎます。

## 5. ボールを磨く {#polish-the-ball}

サッカーボールは3つの[マテリアル](/user-manual/graphics/physical-rendering/physical-materials/)を使っています。白いパネル用の `Ball Light`、黒いパネル用の `Ball Dark`、その間の溝用の `Ball Seam` です。これらは **Models** > **Football** にあります。

1. `Ball Light` を選択し、インスペクターで **Clearcoat** を展開します。
2. **Clear Coat Factor** を `0.4` に、**Clear Coat Gloss** を `0.85` に設定します。
3. `Ball Dark` にも同じ設定をします。

![マテリアルインスペクターのClearcoatセクション](/img/tutorials/keepyup-part-two/clearcoat.webp)

クリアコートは、ニスのように、マテリアルの上に薄いつやのある層を加えます。これでボールに空が映り込むようになります。

マテリアルを開いているついでに、他のセクションも見てみましょう。

- **Diffuse** はベースの色を設定します。`Ball Light` と `Ball Dark` の **Color** を変えると、ボールを自分のチームの色にできます。
- **Specular** には **Metalness** と **Gloss** があり、表面がどれだけ鏡のようになるかを決めます。

**Models** > **Stadium** にあるスタジアムのマテリアルでは、さらに3つの手法を見ることができます。`Crowd` は、**Diffuse** スロットのテクスチャから色を取ります。`Boards` は同じテクスチャを **Emissive** にも使っているので、広告ボードが画面のように光ります。`Net` は **Opacity** が1未満で **Blend Type** が **Alpha** になっており、ゴールネットが透けて見えます。

## 進み具合を確認する {#check-your-progress}

もう一度ゲームを **Launch** します。

![パート2終了時のゲーム: 青空の下の、ライティングされたスタジアム](/img/tutorials/keepyup-part-two/result.webp)

シーンは完成時の見た目になりましたが、まだ1枚の絵のままです。[パート3: ボールを動かす](/tutorials/keepyup-part-three/)では、これを遊べるものに変えるスクリプトを書きます。

---
title: "シンプルなゲームの作成 - パート1: シーンのセットアップ"
description: PlayCanvasエディターで、タップして遊ぶサッカーゲーム「Keepy Up」を作り始めます。スタータープロジェクトをフォークし、スタジアムとボールを配置して、カメラとライトを設定します。
tags: [games]
thumb: /img/tutorials/keepyup-part-one/thumbnail.webp
---

この全6パートのシリーズでは、サッカーボールをタップして空中に保ち続ける小さなゲーム **Keepy Up** を作ります。各パートの終わりには実際に動かせるものができあがり、最後には完成したゲームをウェブに公開します。

これが完成したゲームです。ボールをタップまたはクリックすると始まります。

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/qWhjnAAp/" title="Keepy Up、このシリーズで作るゲーム" loading="lazy" allow="fullscreen" allowFullScreen></iframe>
</div>

シリーズの内容は次のとおりです。

1. **シーンのセットアップ**（このパート）: プロジェクト、スタジアム、ボール、カメラ、ライト。
2. [ライティングとマテリアル](/tutorials/keepyup-part-two/): シーンを照らす空、影、そしてつやのあるボール。
3. [ボールを動かす](/tutorials/keepyup-part-three/): 最初の2つのスクリプト。
4. [ゲームの流れとスコア](/tutorials/keepyup-part-four/): ゲームスクリプトと画面上のスコア。
5. [メニュー画面とゲームオーバー画面](/tutorials/keepyup-part-five/): 残りのユーザーインターフェース。
6. [サウンド、パーティクル、公開](/tutorials/keepyup-part-six/): 仕上げをして、ゲームをオンラインに公開します。

:::info[はじめる前に]

- 無料の[PlayCanvasアカウント](https://login.playcanvas.com/signup)とデスクトップブラウザが必要です。
- エディターを使ったことがない場合は、先に[初めてのアプリ](/user-manual/editor/getting-started/your-first-app/)を進めてください。15分ほどで、このシリーズで使うパネルの使い方を学べます。
- 自分の作業と比べたいときは、いつでも[完成したプロジェクト](https://playcanvas.com/project/1660780/overview/keepy-up)を見ることができます。

:::

## 1. スタータープロジェクトをフォークする {#fork-the-starter-project}

ゲームに使うモデル、テクスチャ、サウンド、フォントは、スタータープロジェクトに用意されています。これを[フォーク](/user-manual/editor/projects/creating/#fork-an-existing-project)すると、自分用のコピーができます。

1. [Keepy Up Starter](https://playcanvas.com/project/1660810/overview/keepy-up-starter) プロジェクトを開き、**Fork Project** を選択します。
2. コピーに `Keepy Up` という名前を付けて、**Fork project** を選択します。
3. コピーの準備ができたら、**Open project** を選択します。エディターが新しいタブで開きます。

[Assets](/user-manual/editor/assets/asset-panel/)（アセット）パネルに、使える素材が表示されます。

![6つのフォルダーがあるスタータープロジェクトのアセットパネル](/img/tutorials/keepyup-part-one/assets.webp)

| フォルダー | 内容 |
| --- | --- |
| **Models** | サッカーボールとスタジアム |
| **Textures** | 空の画像とパーティクルの画像 |
| **UI** | ボールの周りに描くリング |
| **Sounds** | キック音、ゲームオーバー音、音楽のループ |
| **Fonts** | スコアとタイトルに使うフォント |
| **Scripts** | 空です。スクリプトは自分で書きます |

Game という名前のシーンには、Camera と Light だけが入っています。

## 2. 画面をくっきりさせる {#sharpen-the-picture}

スマートフォンや多くのノートパソコンの画面は、CSSピクセル1つに対して複数の物理ピクセルを持っています。PlayCanvasアプリはデフォルトではこれを無視するため、そうした画面ではぼやけて見えます。

1. ツールバーの一番下にある歯車アイコンを選択して、[Inspector](/user-manual/editor/interface/inspector/)（インスペクター）にプロジェクトの **Settings** を開きます。
2. **Rendering** を展開し、セクションの下のほうにある **Device Pixel Ratio** をオンにします。

新しいプロジェクトは、最初からブラウザのウィンドウ全体に表示され、その解像度に合わせるようになっているので、ここで変更するものは他にありません。

## 3. スタジアムを追加する {#add-the-stadium}

モデルをインポートすると、エディターはそのモデルの[テンプレート](/user-manual/editor/templates/)を作成します。テンプレートは、シーンにドロップできるできあがったエンティティです。

1. アセットパネルで **Models** > **Stadium** を開きます。
2. `stadium` テンプレートを探します。このフォルダーには、ほぼ同じ名前のアセットが4つあります。テンプレートは、ひし形のアイコンが付いているものです。見えない場合は下にスクロールします。
3. テンプレートを[Hierarchy](/user-manual/editor/interface/hierarchy/)（ヒエラルキー）パネルにドラッグし、**Root** の上にドロップします。
4. 新しいエンティティを選択したまま、インスペクターで **Name** を `Stadium` に変更します。

![アセットパネルの stadium テンプレート。隣に2つの stadium.glb アセット、上に Stadium レンダーアセットがある](/img/tutorials/keepyup-part-one/template.webp)

**Position** は `0`, `0`, `0` のままにします。スタジアムは、ピッチがこの点より7ユニット下になるように作られているので、ゲームのカメラはおよそ胸の高さになります。

スタジアム全体を見るには、ポインターを[Viewport](/user-manual/editor/interface/viewport/)（ビューポート）の上に移動して、<kbd>F</kbd>キーを押します。

![ビューポートでスタジアムを選択したエディター](/img/tutorials/keepyup-part-one/scene.webp)

## 4. サッカーボールを追加する {#add-the-football}

1. **Models** > **Football** を開き、同じひし形のアイコンが付いた `football` テンプレートを **Root** にドラッグします。
2. エンティティの名前を `Football` に変更します。
3. **Position** を `0`, `0.7`, `0` に、**Scale** を `1.2`, `1.2`, `1.2` に設定します。

![位置とスケールを設定した Football エンティティのインスペクター](/img/tutorials/keepyup-part-one/football.webp)

インスペクターの一番上のパネルは、このエンティティがテンプレートのインスタンスであることを示し、変更した値をオーバーライドとして数えます。このプロジェクトでは無視して構いません。

## 5. カメラを向ける {#aim-the-camera}

このゲームは真横から見る形で遊びます。カメラはボールをまっすぐ見ます。

1. ヒエラルキーで **Camera** を選択します。
2. **Position** を `0`, `0`, `12.4` に、**Rotation** を `0`, `0`, `0` に設定します。
3. [Cameraコンポーネント](/user-manual/editor/scenes/components/camera/)で、**Field Of View** を `45`、**Near Clip** を `0.5`、**Far Clip** を `2000` に設定します。

![Camera エンティティのインスペクター](/img/tutorials/keepyup-part-one/camera.webp)

**Near Clip** と **Far Clip** は、カメラが描画する距離の範囲を決めます。この範囲なら、スタジアム全体が余裕を持って収まります。

## 6. ライトを回す {#turn-the-light}

ディレクショナルライトは太陽のように働きます。意味を持つのは回転だけで、位置は関係ありません。

1. ヒエラルキーで **Light** を選択します。
2. **Rotation** を `45`, `-40`, `0` に設定して、カメラの後ろ、左側から照らすようにします。
3. [Lightコンポーネント](/user-manual/editor/scenes/components/light/)で、**Intensity** を `1.6` に、**Color** を `FFF7E6` のような少し暖かい白に設定します。

![Light エンティティのインスペクター](/img/tutorials/keepyup-part-one/light.webp)

## 進み具合を確認する {#check-your-progress}

ビューポートの右上にある **Launch** を選択します。ゲームが新しいタブで開き、次のように見えるはずです。

![パート1終了時のゲーム: スタジアムの前にあるボールと、何もない暗い空](/img/tutorials/keepyup-part-one/result.webp)

ボールはゴールの前に浮かんでいて、まだ何も動きません。空が暗いのはシーンに空がないからで、ボールが平坦に見えるのは、光が一方向からしか当たっていないからです。

どちらも[パート2: ライティングとマテリアル](/tutorials/keepyup-part-two/)で直します。

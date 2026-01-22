---
title: エディターの使用
---

[PlayCanvas Editor](/user-manual/editor) を使って、シンプルな Gaussian splat アプリケーションを段階的に構築しましょう。インタラクティブな3Dの猫のオモチャの Splat を回転させられるシーンを作成します。

:::tip

構築するプロジェクトは [こちら](https://playcanvas.com/project/1372123/overview/my-first-splat-app) から見つけることができます。ゼロから構築する代わりに、代わりに単に [フォーク](/user-manual/editor/projects/creating/#fork-an-existing-project) することもできます。または、以下の手順に従っていて行き詰まった場合に参照として使用してください。

:::

## ビデオウォークスルー

アプリを構築する完全なプロセスは、この短いビデオにあります。

<video autoPlay muted loop controls src='/video/my-first-splat-editor.mp4' style={{width: '100%', height: 'auto'}} />

以下は、ビデオで示されているアクションを、実行可能な一連の手順としてまとめたものです。

## 新しいプロジェクトの作成

まず、新しいPlayCanvasプロジェクトを作成しましょう。

1. [playcanvas.com](https://playcanvas.com) にアクセスし、アカウントにサインインします。
2. **NEW** をクリックして新しいプロジェクトを作成します。
3. **Blank Project** テンプレートを選択します。
4. 「My First Splat」のような名前を入力します。
5. **CREATE** をクリックしてプロジェクトを作成します。

PlayCanvasは新しいプロジェクトのダッシュボードに移動します。**EDITOR** ボタンをクリックすると、Editor が基本的なシーンとともに開きます。

## シーンの準備

プロジェクトにいくつかの小さな修正を加えて、始めましょう。

1. **HIERARCHY** パネルで、**Light**、**Box**、**Plane** の各エンティティを選択して削除します。
2. Viewport の **Settings** アイコン (歯車) をクリックします。
3. **INSPECTOR** パネルで、**SETTINGS → RENDERING** に移動します。
   * **x** アイコンをクリックして **Skybox** の設定を解除します (これによりデフォルトの青い空が削除されます)。
   * **Anti-Alias** と **Device Pixel Ratio** の両方のチェックを外します。

:::info パフォーマンス最適化

**Anti-Alias** と **Device Pixel Ratio** のチェックを外すことで、Gaussian splat レンダリングの主要なボトルネックであるフラグメント処理の負荷を軽減します。これにより、最適な splat レンダリングパフォーマンスを実現できます。詳細については、[パフォーマンス](../performance.md) ガイドをご覧ください。

:::

これで、HIERARCHY に Camera エンティティだけが残った、クリーンなダークグレーの Viewport が表示されるはずです。

## Splat アセットのアップロード

まず、猫のオモチャのSplatをローカルファイルシステムにダウンロードします: [`https://developer.playcanvas.com/assets/toy-cat.sog`](https://developer.playcanvas.com/assets/toy-cat.sog)

次に、ダウンロードした Splat をプロジェクトに追加しましょう。

1. **ASSETS** パネル (画面下部) で、**+** アイコンをクリックします。
2. ポップアップメニューから **Upload** を選択します。
3. ファイルを開くダイアログで、ダウンロードした `toy-cat.sog` を見つけて選択し、**Open** をクリックします。

Editor は `.sog` ファイルを処理し、**ASSETS** パネルに `gsplat` アセット (名前は `toy-cat.sog`) として表示します。

## Splat エンティティの作成

Splat を表示するためのエンティティを作成しましょう。

1. **ASSETS** パネルから `toy-cat.sog` アセットを Viewport にドラッグ＆ドロップします。

Editor は **HIERARCHY** パネルのルートの下に新しいエンティティを作成し、これで Viewport に猫のオモチャが表示されるはずです。

## Splat の位置調整

Splat が原点に中央揃えされていないので、そのトランスフォームを調整しましょう。

1. **HIERARCHY** パネルで、新しく作成した Splat エンティティを選択します。
2. **INSPECTOR** パネルで、**Position** を `X: 0, Y: -0.7, Z: 0` に設定します。

これで、原点に中央揃えされた猫のオモチャが表示されるはずです。

## カメラコントロールの追加

シーンをインタラクティブにするために、カメラエンティティにスクリプトを割り当てましょう。

1. このリンクを右クリックして **名前を付けてリンクを保存...** を選択します: [`camera-controls.mjs`](https://raw.githubusercontent.com/playcanvas/engine/main/scripts/esm/camera-controls.mjs)
2. **ASSETS** パネル (画面下部) で、**+** アイコンをクリックします。
3. ポップアップメニューから **Upload** を選択します。
4. ファイルを開くダイアログで、ダウンロードした `camera-controls.mjs` スクリプトを見つけて選択し、**Open** をクリックします。

次に、スクリプトをカメラにアタッチしましょう。

1. **HIERARCHY** パネルで、**Camera** エンティティを選択します。
2. **INSPECTOR** で、**ADD COMPONENT** をクリックし、**Script** を選択します。
3. **Script** コンポーネントで、**Add Script** ドロップダウンをクリックします。
4. リストから **cameraControls** を選択します。

これで、カメラコントロールスクリプトがアタッチされ、使用準備が整いました！

## シーンのテスト

次に、インタラクティブな Splat シーンをテストしましょう。

1. Viewport のツールバーにある **LAUNCH** ボタンをクリックしてプロジェクトを実行します。
2. ブラウザに猫のオモチャの Splat が表示されるはずです。
3. それを操作してみましょう。
   * **左マウドラッグ**: Splat の周りを回転
   * **マウスホイール**: ズームイン/ズームアウト

## 最終結果

おめでとうございます！PlayCanvas Editor を使ってインタラクティブな Gaussian splat アプリケーションを正常に作成しました。

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/N0FSHHVn/" title="My First Splat" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::tip 次のステップ

動作する Splat アプリができたので、次のことを試してみてください。

* 猫のオモチャの `.sog` ファイルを自分のものと交換する
* ユーザーインターフェースを追加する
* スクリプトでより複雑なインタラクションを構築する

:::

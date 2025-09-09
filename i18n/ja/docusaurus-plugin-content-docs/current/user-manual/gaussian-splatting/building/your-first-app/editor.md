---
title: エディタの使用
---

[PlayCanvas Editor](/user-manual/editor) を使用して、シンプルな Gaussian splat アプリケーションを段階的に構築しましょう。インタラクティブな3Dの猫のおもちゃのsplatを回転させることができるシーンを作成します。

:::tip

構築するプロジェクトは[こちら](https://playcanvas.com/project/1372123/overview/my-first-splat-app)で確認できます。一から構築する代わりに、[フォーク](/user-manual/editor/projects/creating/#fork-an-existing-project)して使用することもできます。または、以下の手順に従っている間に迷った場合の参考として使用してください。

:::

## ビデオウォークスルー

アプリを構築する完全なプロセスは、この短いビデオにあります。

<video autoPlay muted loop controls src='/video/my-first-splat-editor.mp4' style={{width: '100%', height: 'auto'}} />

以下に、ビデオで示されたアクションを、あなたが従うことができる一連のステップとして示します。

## 新しいプロジェクトの作成

まず、新しいPlayCanvasプロジェクトを作成しましょう。

1. [playcanvas.com](https://playcanvas.com) にアクセスし、アカウントにサインインします
2. **「NEW」** をクリックして新しいプロジェクトを作成します
3. **「Blank Project」** テンプレートを選択します
4. 「My First Splat App」のような名前を入力します
5. **「CREATE」** をクリックしてプロジェクトを作成します

新しいプロジェクトのダッシュボードに移動します。EDITORボタンをクリックすると、カメラ、ディレクショナルライト、キューブ、プレーンのみを含む空のシーンでエディタが開きます。

:::warning パフォーマンス最適化

最適なsplatレンダリングパフォーマンスのためには、アンチエイリアシングとデバイスピクセル比を無効にしてください。**設定** → **レンダリング** に移動し、**「Anti-Alias」** と **「Device Pixel Ratio」** の両方のチェックを外します。これにより、Gaussian splatレンダリングにおける主要なボトルネックであるフラグメント処理の負荷を軽減できます。詳細については、[パフォーマンス](../engine-features/performance.md) ガイドを参照してください。

:::

## Splatアセットのアップロード

まず、猫のおもちゃのsplatをローカルファイルシステムにダウンロードします。[`https://developer.playcanvas.com/assets/toy-cat.sog`](https://developer.playcanvas.com/assets/toy-cat.sog)

次に、ダウンロードしたsplatをプロジェクトに追加しましょう。

1. **ASSETS** パネル (画面下部) で、+ アイコンをクリックします
2. ポップアップメニューから **「アップロード」** を選択します
3. ファイルを開くダイアログで、`toy-cat.sog` を見つけて選択します

`.sog`ファイルは処理され、あなたのAssetsパネルに`gsplat`アセットとして表示されます。

## Splatエンティティの作成

splatを表示するためのエンティティを作成しましょう。

1. **HIERARCHY** パネル (左側) で、+ アイコンをクリックします
2. ポップアップメニューから **「Entity」** を選択して新しいエンティティを作成します
3. 新しいエンティティが選択された状態で、**INSPECTOR** パネル (右側) で「Toy Cat」に名前を変更します

## GSplatコンポーネントの追加

次に、Gaussian splatを表示するコンポーネントを追加します。

1. 「Toy Cat」エンティティが選択された状態で、**INSPECTOR** パネルを下にスクロールします
2. **「ADD COMPONENT」** をクリックします
3. コンポーネントリストから **「Gaussian Splat」** を選択します

GSplatコンポーネントがエンティティに追加されます。

## アセットの割り当て

アップロードしたsplatアセットをコンポーネントに接続しましょう。

1. GSplatコンポーネントのプロパティで、Asset属性の **アセットピッカー** (鉛筆アイコン) をクリックします
2. 先ほどアップロードした猫のおもちゃの`gsplat`アセットを選択します
3. splatがビューポートに表示されるはずです！

## Splatの配置

splatが正しく配置されていません。その変換を調整しましょう。

1. 「Toy Cat」エンティティがまだ選択された状態で、Inspectorの **ENTITY** ヘッダーセクションを確認します
2. **Position** を `0, -0.7, 0` に設定します (原点に中央揃えします)
3. **Rotation** を `0, 0, 180` に設定します (正しい向きに反転させます)

## カメラコントロールの追加

シーンをインタラクティブにするために、Asset Storeからカメラコントロールスクリプトをインポートしましょう。

1. **ASSETS** パネルで、**「ASSET STORE」** ボタンをクリックします
2. Asset Storeで、**SCRIPTS** でフィルタリングします
3. PlayCanvasによる **Orbit Camera** スクリプトを見つけて選択し、**IMPORT** をクリックします
4. `x` アイコン (右上) をクリックしてAsset Storeパネルを閉じます

スクリプトはプロジェクトのAssetsパネルに追加されます。

次に、スクリプトをカメラにアタッチしましょう。

1. Hierarchyで **「Camera」** エンティティを選択します
2. Inspectorで、**「ADD COMPONENT」** をクリックし、**「Script」** を選択します
3. Scriptコンポーネントで、**「スクリプトを追加」** ドロップダウンをクリックします
4. リストから **「orbitCamera」** を選択します (ドロップダウンに表示されているはずです)
5. リストから **「orbitCameraInputMouse」** を選択します
6. リストから **「orbitCameraInputTouch」** を選択します

カメラコントロールスクリプトがアタッチされ、使用準備ができました！

## シーンのテスト

次に、インタラクティブなsplatシーンをテストしましょう。

1. ビューポートのツールバーにある **「LAUNCH」** ボタンをクリックしてプロジェクトを実行します
2. ブラウザに猫のおもちゃのsplatが表示されるはずです
3. 操作してみてください。
    - **左マウスクリック＆ドラッグ**: splatの周りをオービット
    - **マウスホイール**: ズームイン、ズームアウト

## 最終結果

おめでとうございます！PlayCanvas Editor を使用して、インタラクティブな Gaussian splat アプリケーションを正常に作成できました。

<div className="iframe-container">
    <iframe src="https://playcanv.as/e/p/N0FSHHVn/" title="My First Splat" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

:::tip 次のステップ

動作するsplatアプリができたので、以下を試してみてください。

- 猫のおもちゃの`.sog`ファイルを自分のものと交換する
- ユーザーインターフェースを追加する
- スクリプトでより複雑なインタラクションを構築する

:::

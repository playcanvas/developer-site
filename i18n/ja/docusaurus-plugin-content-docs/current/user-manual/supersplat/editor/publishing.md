---
title: 公開
description: SuperSplat Editorからsuperspl.atへスプラットを公開して、Manageページに表示し、Studioで開けるようにします。
---

SuperSplat Editorからの公開では、編集したスプラットを[superspl.at](https://superspl.at)にアップロードします。アップロードされたスプラットは[Manageページ](/user-manual/supersplat/manage)に表示され、公開[シーンページ](/user-manual/supersplat/scene-page)が割り当てられ、[Studio](/user-manual/supersplat/studio/)で開いて視聴体験（カメラ、注釈、ポストエフェクト、スカイボックス、コリジョン）をキュレーションできます。

:::tip 2つの公開方法

Editorを使わずに公開することもできます。[superspl.atのホームページ](https://superspl.at)（または[Manageページ](/user-manual/supersplat/manage)）にあるオレンジ色の**Upload Splat**ボタンを押して、[Direct Upload](/user-manual/supersplat/upload)フローで完成済みのスプラットファイルを直接公開できます。どちらの経路でも同じ場所に到達し、その後のツールも共通です。

:::

superspl.atに公開する代わりに（または併用して）自前のサーバーで公開済みビューアをホストする方法については、[ビューアのセルフホスティング](/user-manual/supersplat/viewer/self-hosting)を参照してください。

![SuperSplat Website](/img/user-manual/supersplat/editor/supersplat-website.png)

## ログイン状態の確認

スプラットを公開するには、ログインしている必要があります。

始める前に、[PlayCanvasアカウントを作成し](/user-manual/account-management/user-accounts/account-creation)、[playcanvas.com](https://playcanvas.com)にログインしている必要があります。次に、[superspl.at](https://superspl.at)にも（右上にある「`Login`」ボタンから）ログインしてください。[superspl.at](https://superspl.at)のページの右上にあなたのアカウントアバターが表示されていることを確認して、ログイン状態を確かめてください。

## スプラットの公開

スプラットを公開するには：

1. `File`メニューを開きます。
2. `Publish`を選択します。
3. `Publish`ダイアログのオプションを記入します：

   ![Publish Settings](/img/user-manual/supersplat/editor/publish-settings.png)

   | オプション | 説明 |
   |--------|-------------|
   | **Publish to** | シーンの公開先を選択します。**New Scene**（デフォルト）を選択すると新しいURLで全く新しいシーンを公開し、またはドロップダウンから既存の公開済みシーンの1つを選択して上書きします |
   | **Title** | スプラット公開後にサムネイルの下に表示される短いタイトル |
   | **Description** | スプラットのビューアーページでスプラットの下に表示されるテキストの説明 |
   | **Listed** | チェックした場合、スプラットはSuperSplatウェブサイトの検索結果に表示されます。チェックしない場合、スプラットはリンクを持つ人のみが発見できます |
   | **Start Position** | ビューアーのカメラに使用する開始位置：<br/>• **Default**: ビューアーが最適な開始点を自動的に選択します<br/>• **Current Viewport**: SuperSplat Editorのビューポートで設定された現在のカメラ位置を使用します<br/>• **1st Camera Frame**: タイムラインの最初のフレームで定義された最初のカメラ位置を使用します |
   | **Animation** | ビューアーのカメラに適用するアニメーション：<br/>• **None**: アニメーションなし<br/>• **Track**: SuperSplat Editorのタイムラインで設定されたキーフレームを使用してカメラをアニメーション化します |
   | **Background** | ビューアーの背景色 |
   | **Field of View** | ビューアーのカメラの垂直視野角（度） |
   | **SH Bands** | 公開される圧縮済みPLYファイルに書き出される球面調和バンドの数 |

4. `Publish`を選択します。

:::note

公開プロセス中にスプラットをSOGフォーマットに圧縮するのに数分かかる場合がありますので、しばらくお待ちください！ ⏳

:::

公開プロセスが完了すると、公開されたスプラットのURLが記載されたモーダルダイアログが表示されます。それをコピーして、好きな相手と共有してください。

## 次のステップ

- 新しいスプラットは[Manageページ](/user-manual/supersplat/manage)に表示され、タイトル、説明、公開範囲、ダウンロード可否とライセンスを編集できます。
- [Studio](/user-manual/supersplat/studio/)で開いて、カメラ、注釈、ポストエフェクト、スカイボックス、コリジョンジオメトリを追加できます。
- 訪問者は公開[シーンページ](/user-manual/supersplat/scene-page)で表示、共有、埋め込み、いいね、コメント、（許可されていれば）ダウンロードを行えます。

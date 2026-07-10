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
   | **Publish To** | シーンの公開先を選択します。**New Scene**（デフォルト）を選択すると新しいURLで全く新しいシーンを公開し、またはドロップダウンから既存の公開済みシーンの1つを選択して上書きします |
   | **Title** | スプラット公開後にサムネイルの下に表示される短いタイトル |
   | **Description** | スプラットのビューアーページでスプラットの下に表示されるテキストの説明 |
   | **Background** | ビューアーの背景色。Editorの現在の背景色がデフォルトになります |
   | **Field of View** | ビューアーのカメラの垂直視野角（度）。Editorカメラの現在の設定がデフォルトになります |
   | **Animation** | 有効にすると、[タイムライン](timeline.md)で作成したカメラアニメーションがシーンにベイクされ、読み込み時に再生されます。タイムラインにキーフレームがある場合にのみ使用でき（その場合はデフォルトで有効）ます |
   | **Loop Mode** | 含まれたカメラアニメーションのビューアでの再生方法：<br/>• **None**: 1回再生して停止<br/>• **Repeat**: 連続してループ<br/>• **Ping Pong**: 順方向と逆方向の再生を繰り返し<br/>タイムラインのループトグルから初期化されます - ループ有効なら**Repeat**、無効なら**None** |
   | **Generate LODs** | 公開されたスプラットが段階的にストリーミングされるように、複数のレベルオブディテールを生成します。広い範囲に及ぶ100万スプラット以上のシーンでは自動的に有効になります。[ストリーミングとパフォーマンス](/user-manual/supersplat/streaming)を参照してください |

4. `Publish`を選択します。

公開されたシーンのカメラは、公開した瞬間のビューポートカメラのポーズから開始します。ダイアログを開く前に、お気に入りのビューでフレーミングしておきましょう。

:::note

新しいシーンは非公開（アンリスト）で公開されます - リンクを知っている人のみが発見できます。SuperSplatウェブサイトの検索結果にスプラットを表示させるには、公開後に[Manageページ](/user-manual/supersplat/manage)からリストに登録してください。

:::

:::note

公開プロセス中にスプラットをSOGフォーマットに圧縮するのに数分かかる場合がありますので、しばらくお待ちください！ ⏳

:::

公開プロセスが完了すると、公開されたスプラットのURLが記載されたモーダルダイアログが表示されます。それをコピーして、好きな相手と共有してください。

## 既存シーンへの再公開

**Publish To**を既存のシーンの1つに設定すると、URLを維持したままそのシーンが上書きされます。このモードでは、2つのトグルで何を置き換えるかを選択します：

| オプション | 説明 |
|--------|-------------|
| **Override Model** | シーンのスプラットモデルを、現在読み込まれているシーンで置き換えます |
| **Override Animation** | シーンのカメラアニメーションを、現在のタイムラインアニメーションで置き換えます |

公開するには、少なくともどちらか一方を有効にする必要があります。アニメーションのみを上書きすれば、スプラットデータ自体を再アップロード（および再圧縮）せずに、公開済みのカメラパスをすばやく更新できます。

## 次のステップ

- 新しいスプラットは[Manageページ](/user-manual/supersplat/manage)に表示され、タイトル、説明、公開範囲、ダウンロード可否とライセンスを編集できます。
- [Studio](/user-manual/supersplat/studio/)で開いて、カメラ、注釈、ポストエフェクト、スカイボックス、コリジョンジオメトリを追加できます。
- 訪問者は公開[シーンページ](/user-manual/supersplat/scene-page)で表示、共有、埋め込み、いいね、コメント、（許可されていれば）ダウンロードを行えます。

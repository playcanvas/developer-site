---
title: プロジェクトの公開方法
description: "PlayCanvas Editorのプロジェクトのビルドを作る方法です。Buildsパネル、playcanvas.comへの公開、どこでもホストできるビルドのダウンロード、ビルドの設定、ローディング画面、プレイアブル広告を扱います。"
---

Editorのプロジェクトを公開するには、**ビルド**を作ります。ビルドは選んだシーンのスナップショットで、単独で動くのに必要なものがすべて一緒にパッケージされます。ビルドを作った後にEditorで加えた変更は、新しいビルドを作るまでビルドに反映されません。

ビルドには2種類あります：

- **Publish:** ビルドを[PlayCanvasホスティング](playcanvas-hosting.md)に公開し、誰とでも共有できるplaycanv.asのリンクを手に入れます。設定は何も必要ありません。
- **Download:** ビルドをダウンロードして[自分でホストする](downloading.md)か、ゲームプラットフォーム、アプリストア、デスクトップアプリなど、[公開](/user-manual/publishing/)にあるほかの公開先に持っていきます。

## Buildsパネル {#the-builds-panel}

Buildsパネルを開くには、[ツールバー](../interface/toolbar.md)の**Publish / Download**ボタンを選択します。

![Buildsパネル](/img/user-manual/editor/getting-started/your-first-app/publish.webp)

- **Primary build**には、プロジェクトのリンクで再生されるビルドが、公開した後に表示されます。
- **Publish**と**Download**は、新しいビルドのフォームを開きます。
- **Build history**には、公開したビルドとダウンロードしたビルドが一覧表示されます。種類、形式、状態、ブランチ、作成した人で絞り込めます。ビルドを選ぶと詳細が表示され、**...**ボタンを選ぶと、ビルドの表示、削除、プライマリービルドへの設定ができます。

## ビルドを作る {#making-a-build}

公開とダウンロードは、同じフォームを使います：

1. **Build details**で、ビルドに**Title**を付けます。公開する場合は、ビルドのリンクを共有したときに表示される画像と**Description**、ビルドを区別するための**Version**と**Release Notes**も追加できます。
2. **Build settings**で、**Engine Version**と[ビルドオプション](#build-options)を選びます。ダウンロードする場合は、[ダウンロード形式](downloading.md#download-formats)も選びます。
3. **Scenes**で、含めるシーンを選びます。**プライマリーシーン**は、ビルドの開始時に読み込まれるシーンです。変更するには、別のシーンの横にあるアイコンを選択します。
4. フォームの下にある**Publish**または**Download**を選択します。

ビルドは作成中から**Build history**に表示され、状態にチェックマークが付くと準備完了です。

## ビルドオプション {#build-options}

| オプション | 機能 |
| --- | --- |
| **Concatenate Scripts** | スクリプトをより少ないファイルにまとめて、読み込みを速くします。クラシックスクリプトは1つのファイルにまとめられ、ESMスクリプトはエンジンと一緒にバンドルされます。[公開時のスクリプトの処理](../scripting/loading-order.md#publishing)を参照してください。既定でオンです。 |
| **Minify Scripts** | スクリプトの空白を取り除き、名前を短くして小さくします。**Concatenate Scripts**がオンのときに使えます。既定でオンです。 |
| **Generate Source Maps** | ソースマップを追加し、ビルドをデバッグするときにブラウザーの開発者ツールで元のコードを表示できるようにします。**Minify Scripts**がオンのときに使えます。 |
| **Optimize Scene Format** | シーンファイルのダウンロードを小さくします。[シーンフォーマットの最適化](/user-manual/optimization/optimizing-scene-format/)を参照してください。 |

npmのダウンロード形式ではスクリプトがソースファイルのまま残るので、これらのオプションは適用されません。

## このセクションの内容 {#in-this-section}

| ページ | 内容 |
| --- | --- |
| [PlayCanvasホスティング](playcanvas-hosting.md) | ビルドをplaycanv.asのリンクに公開し、プロジェクトのリンクで再生するビルドを選びます。 |
| [ビルドのダウンロード](downloading.md) | ビルドを静的Webサイトまたはnpmプロジェクトとしてダウンロードする方法と、それぞれの中身です。 |
| [ローディング画面](../interface/launch-page/loading-screen.md) | アセットの読み込み中にビルドが表示する画面を置き換えます。 |
| [プレイアブル広告](playable-ads/index.md) | プロジェクトをFacebookやSnapchat向けのインタラクティブな広告としてエクスポートします。 |

ダウンロードしたビルドをホストする方法、別のページに埋め込む方法、ゲームプラットフォームやアプリストアに公開する方法、デスクトップアプリにする方法は、PlayCanvasでのあらゆる作り方に共通する[公開](/user-manual/publishing/)を参照してください。

---
title: PlayCanvasホスティング
description: "PlayCanvas Editorのビルドをplaycanv.asに公開する方法です。ビルドの公開、プロジェクトのリンクとビルドのリンク、プライマリービルドの選択、ホストしたビルドの別のページへの埋め込みを扱います。"
---

import StepVideo from '@site/src/components/StepVideo';

アプリを共有する最も手軽な方法は、PlayCanvasホスティングに公開することです。公開から数秒で、どのデバイスでも動くplaycanv.asのリンクでアプリが公開され、設定は何も必要ありません。

## ビルドを公開する {#publishing-a-build}

プロジェクトには少なくとも1つのシーンが必要です。公開するには：

1. [ツールバー](../interface/toolbar.md)の**Publish / Download**ボタンを選択して、[Buildsパネル](index.md#the-builds-panel)を開きます。
2. **Publish**を選択します。
3. フォームに入力します。新しいビルドのタイトルにはプロジェクトの名前が入っていて、ほかの項目はすべて省略できます。各項目は[ビルドを作る](index.md#making-a-build)を参照してください。
4. フォームの下にある**Publish**を選択します。

<StepVideo src="/video/editor-first-app-publish.mp4" poster="/img/user-manual/editor/getting-started/your-first-app/publish.webp" label="ビルドを公開し、playcanv.as のリンクを手に入れる" />

新しいビルドは**Build history**に表示され、状態にチェックマークが付くと公開されています。

## アプリへのリンク {#links-to-your-app}

公開したビルドへのリンクには2種類あります：

- **プロジェクトのリンク**（`https://playcanv.as/p/gLOk3TQH/`など）は、常にプロジェクトの**プライマリービルド**を再生します。Buildsパネルの**Primary build**に表示され、[プロジェクトダッシュボード](../projects/dashboard.md#play)でプロジェクトの**Play**ボタンを選んでも開きます。新しいビルドを公開しても使い続けられるように、共有するのはこのリンクにしてください。
- **ビルドのリンク**は、特定のビルドを削除するまで再生します。**Build history**でビルドを選ぶと、そのリンクを表示してコピーできます。プレイヤーに届ける前にビルドをテストするのに使います。

## プライマリービルドを選ぶ {#choosing-the-primary-build}

最初に公開したビルドは、自動的にプライマリービルドになります。その後のビルドは、自分で選ぶまでプライマリービルドを置き換えないので、ビルドを公開し、ビルドのリンクでテストしてから、プレイヤーをそのビルドに切り替えられます。

ビルドをプライマリービルドにするには、**Build history**でそのビルドの**...**ボタンを選び、**Set Primary Build**を選択します。プロジェクトのリンクは、すぐにそのビルドを再生します。

## ホストしたビルドを埋め込む {#embedding-a-hosted-build}

プロジェクトのリンクでは、タイトル、作成者、共有ボタンのバーの下にアプリが表示されます。自分のサイトのiframeなどでアプリだけを表示するには、`https://playcanv.as/e/p/gLOk3TQH/`のように、ドメインの後に`/e`を付けます。iframeのコードと、ページからアプリにメッセージを送る方法は、[Webページへの埋め込み](/user-manual/publishing/embedding/)を参照してください。

ビルドを自分のサーバーでホストするには、[ダウンロード](downloading.md)してください。

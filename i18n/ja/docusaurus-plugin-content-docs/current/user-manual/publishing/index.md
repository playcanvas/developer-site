---
title: 公開
description: "Editor、Engine、React、Web ComponentsのPlayCanvasアプリをプレイヤーに届ける方法です。ビルドの作成、Webでのホスティング、ページへの埋め込み、ゲームプラットフォーム、Snapchat、モバイルアプリとデスクトップアプリを扱います。"
---

PlayCanvasのアプリはWebページです。`index.html`ファイルと、それが読み込むスクリプトやアセットでできています。アプリを公開するには、単独で動くファイル一式のフォルダーである**ビルド**を作り、プレイヤーが開ける場所に置きます。サーバーで動くものは何もないので、どのWebホストでもビルドを配信でき、ブラウザゲームのプラットフォームにホストしてもらうこともできます。

## ビルドを作る {#making-a-build}

ビルドの作り方は、アプリの作り方によって変わります：

- **Editor:** ビルドを[PlayCanvasホスティング](/user-manual/editor/publishing/playcanvas-hosting/)に公開して共有できるリンクを手に入れるか、静的Webサイトとして[ダウンロード](/user-manual/editor/publishing/downloading/)して他の場所でホストします。どちらも[Editorでの公開](/user-manual/editor/publishing/)で扱っています。
- **Engine、React、Web Components:** バンドラーの本番ビルドを実行します。[create-playcanvas](/user-manual/getting-started/start-with-create-playcanvas/)で作ったものを含め、Viteのプロジェクトでは`npm run build`が`dist`フォルダーにビルドを書き出します。
- **バンドラーを使わない場合:** Web Componentsの[開始](/user-manual/web-components/getting-started/)の例のように、`index.html`を含むフォルダーがそのままビルドになります。

## 公開先 {#where-to-publish}

| ページ | 内容 |
| --- | --- |
| [Webホスティング](web-hosting.md) | ビルドを自分のサーバーや静的ホスティングサービスに置く方法、ローカルでのテスト、コンテンツデリバリーネットワーク（CDN）からのアセット配信。 |
| [Webページへの埋め込み](embedding.md) | iframeでアプリを別のページの中に表示する方法と、ページとアプリの間でのメッセージのやり取り。 |
| [itch.io](itch-io.md) | ビルドのzipファイルからブラウザゲームをホストする、インディーゲームのマーケットプレイス。 |
| [CrazyGames](crazygames.md) | 広告収益を開発者に分配するブラウザゲームのプラットフォーム。動画広告、プレイヤーアカウント、クラウドセーブのSDKを備えています。 |
| [Wavedash](wavedash.md) | プレイヤーアカウント、リーダーボード、マルチプレイヤーロビーを備えたブラウザゲームのプラットフォーム。 |
| [heyVR](heyvr.md) | プレイヤーがVRヘッドセットなどのデバイスで開くWebXRゲームのプラットフォーム。 |
| [Snapchat Web Lens](snapchat-web-lenses.md) | ゲームをLensとしてSnapchatの中で動かす方法。 |
| [モバイルアプリ](mobile.md) | ビルドをネイティブアプリで包み、Apple App StoreやGoogle Playに出す方法。 |
| [デスクトップアプリ](desktop.md) | ビルドをWindows、macOS、Linuxのアプリとしてパッケージする方法。 |

Editorでは、プロジェクトをFacebookやSnapchat向けの[プレイアブル広告](/user-manual/editor/publishing/playable-ads/)としてエクスポートすることもできます。

## 公開する前に {#before-you-publish}

- **開発中のバージョンではなく、ビルドをテストする。** [ビルドをローカルで配信](web-hosting.md#testing-a-build-locally)し、プレイヤーが使うデバイスで開いてください。Editorの[起動ページ](/user-manual/editor/interface/launch-page/)は、デスクトップだけでなくスマートフォンやタブレットでも開けます。
- **ダウンロードを小さく保つ。** [テクスチャ圧縮](/user-manual/optimization/texture-compression/)などの[ロード時間の最適化](/user-manual/optimization/load-time/)は、スマートフォンで特に効きます。バンドラーを使うプロジェクトでは、[バンドルサイズとツリーシェイキング](/user-manual/engine/bundle-size/)で、アプリが使うエンジンの部分だけを含める方法を説明しています。
- **読み込み中は進み具合を表示する。** Editorのビルドは[ローディング画面](/user-manual/editor/interface/launch-page/loading-screen/)を表示し、独自のものに置き換えられます。

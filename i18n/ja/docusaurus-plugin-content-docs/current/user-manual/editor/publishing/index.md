---
title: プロジェクトの公開方法
description: "PlayCanvas Editorのアプリをプレイヤーに届ける方法です。ビルド、playcanvas.comや自分のサーバーでのホスティング、独自のローディング画面、プレイアブル広告、Snapchat Web Lens、モバイルとデスクトップのアプリを扱います。"
---

PlayCanvasのアプリはウェブページなので、ウェブページを表示できるものならどこでも動きます。公開するには**ビルド**を作ります。ビルドは選んだシーンのスナップショットで、単独で動くのに必要なものがすべて一緒にパッケージされます。ビルドを作った後にEditorで加えた変更は、新しいビルドを公開するまでビルドに反映されません。

## 公開先 {#where-to-publish}

| 公開先 | 方法 |
| --- | --- |
| [ウェブ](web/index.md) | [playcanvas.comでビルドをホスト](web/playcanvas-hosting.md)して共有できるリンクで公開するか、[ダウンロード](../projects/downloading.md)して[自分でホスト](web/self-hosting.md)します。 |
| [プレイアブル広告](playable-ads/index.md) | ビルドを[Facebook](playable-ads/fb-playable-ads.md)や[Snapchat](playable-ads/snapchat-playable-ads.md)向けのインタラクティブな広告としてエクスポートします。 |
| [Snapchat Web Lens](snapchat-web-lenses.md) | ビルドをWeb LensとしてSnapchatにアップロードします。 |
| [モバイルのアプリストア](mobile/index.md) | ビルドをネイティブのiOSアプリやAndroidアプリで包みます。 |
| [デスクトップ](desktop/index.md) | ビルドをWindows、macOS、Linuxのアプリとしてパッケージします。 |

どこで動く場合でも、ビルドはアセットの読み込み中に[ローディング画面](../interface/launch-page/loading-screen.md)を表示します。既定の画面は独自のものに置き換えられます。

## 公開する前に {#before-you-publish}

- **実際に動かす環境でテストする。** [起動ページ](../interface/launch-page/index.md)はデスクトップだけでなく、スマートフォンやタブレットでも開けます。
- **最初に読み込まれるものを確認する。** [プリロード](/user-manual/assets/preloading/)に設定したアセットはアプリの開始前に読み込まれるので、ローディング画面が表示される時間はそれらで決まります。
- **ダウンロードを小さく保つ。** [テクスチャ圧縮](/user-manual/optimization/texture-compression/)などの[ロード時間の最適化](/user-manual/optimization/load-time/)は、スマートフォンで特に効きます。プレイアブル広告には厳しいサイズ制限もあります。

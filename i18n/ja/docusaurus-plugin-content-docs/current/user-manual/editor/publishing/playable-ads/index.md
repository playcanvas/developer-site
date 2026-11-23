---
title: プレイアブル広告
description: "PlayCanvas Editorのプロジェクトを、広告ネットワークのアプリ内で動くインタラクティブな広告、プレイアブル広告としてエクスポートする方法です。FacebookとSnapchatの形式、サイズの目安、エクスポートツールを扱います。"
---

**プレイアブル広告**は、ゲームやアプリの小さなインタラクティブ版で、広告ネットワークのアプリの中で動きます。ユーザーはインストールする前に試せます。PlayCanvasのアプリはすでにウェブページで、すぐに起動するので、この形式に向いています。

Editorのプロジェクトからプレイアブル広告を作るには、GitHubにある公式のコマンドラインツール[PlayCanvas REST API Tools](https://github.com/playcanvas/playcanvas-rest-api-tools)を使います。このツールはプロジェクトのビルドをダウンロードし、各広告ネットワークが受け付ける形式にパッケージし直します。

このツールは、スクリプトがすべて[クラシックスクリプト](/user-manual/scripting/)のプロジェクトでのみ動作します。`__settings__.js`や`__start__.js`など、そうしたプロジェクトのビルドにしかないファイルを編集するためです。

| ネットワーク | 形式 |
| --- | --- |
| [Facebook](fb-playable-ads.md) | 2MBまでの単一のHTMLファイル、または5MBまでのZIPファイル（どちらも非圧縮）。 |
| [Snapchat](snapchat-playable-ads.md) | Mobile Rich Media Ad Interface Definitions（MRAID）2.0規格を使うHTMLファイルと、別フォルダーのアセット。 |

その他の広告ネットワークでも動く可能性はありますが、PlayCanvasチームはテストしていません。

いちばんの制約はサイズです。Facebook広告の予算のうち約1.2MBはEngineだけで使うので、残りに合わせてアセットを計画してください。各ネットワークのページにサイズのヒントとチェックリストがあり、アセットを小さくする方法は[デバッグと最適化](/user-manual/optimization/)で説明しています。

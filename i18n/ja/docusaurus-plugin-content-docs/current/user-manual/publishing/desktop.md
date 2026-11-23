---
title: デスクトップアプリ
description: "Editor、Engine、React、Web ComponentsのPlayCanvasアプリを、NW.jsやElectronでWindows、macOS、Linux向けのデスクトップアプリとしてパッケージする方法です。"
---

PlayCanvasのアプリは、デスクトップのブラウザーでそのまま動きます。ゲームストアなどから人々がWindows、macOS、Linuxにインストールするアプリとして出すには、ブラウザーエンジンとアプリを一緒にまとめるツールでパッケージします。

これを行う、広く使われているツールが2つあります：

- [NW.js](https://nwjs.io/)は、少ない設定でWebアプリをデスクトップアプリとして動かします。各OS向けの[アプリのパッケージと配布の方法](https://github.com/nwjs/nw.js/wiki/How-to-package-and-distribute-your-apps)は、そのドキュメントで説明しています。
- [Electron](https://www.electronjs.org/)も同じことを行い、アプリのネイティブ側をより細かく制御できます。アプリの作成、パッケージ、配布は、その[チュートリアル](https://www.electronjs.org/docs/latest/tutorial/tutorial-prerequisites)で説明しています。

どちらのツールでも：

1. アプリの[ビルドを作ります](index.md#making-a-build)。Editorのプロジェクトでは、**Static Website**形式で[ビルドをダウンロード](/user-manual/editor/publishing/downloading/)します。
2. ツールのドキュメントに従って、ビルドフォルダーをパッケージします。
3. 出荷する各OSで、パッケージしたアプリをテストします。

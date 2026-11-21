---
title: ウェブ
description: "PlayCanvas Editorのアプリをウェブで公開する方法です。PlayCanvasホスティング、ダウンロードしたビルドのセルフホスティング、CDNからのアセット配信、周囲のページとの通信、heyVRを扱います。"
---

PlayCanvasのアプリはウェブページなので、本来の居場所はウェブです。playcanvas.comには数ステップで公開できますし、ビルドをダウンロードして好きな場所でホストすることもできます。

## ホストする場所を選ぶ {#choosing-where-to-host}

- **いちばん手早い方法:** [PlayCanvasホスティング](playcanvas-hosting.md)では、共有や埋め込みができるplaycanvas.comのリンクにビルドを公開します。**プライマリビルド**のリンクは常に選んだビルドを再生するので、リンクを変えずにアプリを更新できます。
- **自分のサイトやドメインで:** [セルフホスティング](self-hosting.md)では、ホストされたビルドをiframeで自分のページに埋め込む方法と、ビルドをダウンロードして自分のサーバーに置く方法を説明しています。ダウンロード形式は[プロジェクトのダウンロード](../../projects/downloading.md)で説明しています。
- **バーチャルリアリティ（VR）ゲームなら:** [heyVR](hosting-heyvr.md)は、ウェブベースのVRゲームをヘッドセットなどのデバイスのプレイヤーに公開するためのプラットフォームです。

## このセクションの内容 {#in-this-section}

| ページ | 内容 |
| --- | --- |
| [PlayCanvasホスティング](playcanvas-hosting.md) | playcanvas.comにビルドを公開し、プライマリビルドを選びます。 |
| [セルフホスティング](self-hosting.md) | ホストされたビルドをiframeで埋め込むか、ダウンロードしたビルドを自分のサーバーに置きます。 |
| [プロジェクトのダウンロード](../../projects/downloading.md) | ビルドをダウンロードするときのstatic形式とnpm形式と、それぞれの中身。 |
| [初心者向けセルフホスティング](self-hosting-for-beginners.md) | サイトをホストしたことがない方向けの、ウェブホスティングのしくみ。 |
| [CDNを使用したホスティング](hosting-cdn.md) | セルフホストしたビルドのアセットを、コンテンツ配信ネットワーク（CDN）から配信します。 |
| [Webページとの通信](communicating-webpage.md) | アプリを囲むページとアプリ自身が互いに呼び出せるようにします。 |
| [heyVR.ioでのホスティング](hosting-heyvr.md) | ビルドをheyVRにアップロードし、オプションのSDKを使います。 |

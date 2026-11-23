---
title: 公開
description: "PlayCanvasのアプリをゲームプラットフォームで公開する方法です。Editor、Engine、React、Web Componentsそれぞれのプロジェクトの手順を扱います。"
---

PlayCanvasのアプリはウェブページなので、ウェブページを配信できるものならどこでもホストできます。このセクションでは、ゲームプラットフォームを扱います。ゲームプラットフォームはブラウザゲームをホストし、独自のSDKでプレイヤーアカウントやリーダーボードなどの機能を追加するサイトです。

各ページには、PlayCanvasでの作り方それぞれの手順があります。アップロードするものは、アプリの作り方によって変わります：

- **Editor:** Editorからダウンロードしたプロジェクトのビルドです。playcanvas.comでのホスティング、セルフホスティング、その他の公開先は[Editorでの公開](/user-manual/editor/publishing/)で扱っています。
- **Engine、React、Web Components:** バンドラーの本番ビルドです。たとえばViteのプロジェクトなら、`npm run build`が書き出す`dist`フォルダーです。バンドラーを使わない場合は、`index.html`を含むフォルダーをアップロードします。

## プラットフォーム {#platforms}

| プラットフォーム | 内容 |
| --- | --- |
| [Wavedash](wavedash.md) | `Wavedash.init()`でゲームを表示し、Wavedash CLIでビルドをアップロードして公開します。 |

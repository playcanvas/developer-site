---
title: セルフホスティング
---

独自のドメインでPlayCanvasアプリケーションを自己ホストする方法には、2つのオプションがあります。

1. [iframe][1]を使用してPlayCanvasでホスティングしたゲームを埋め込む。
2. Editorからゲームをダウンロードして自身のサイトにファイルをアップロード。

## iframe の埋め込み {#iframe-embedding}

[playcanvas.comに公開][2]すると、アプリケーションにURLが割り当てられます。アプリケーションを他のページに埋め込むには、単にこのURLを`src`プロパティの値としてiframeに含めるだけでよいです。

```html
<html>
    <head>
        <title>My Great Game</title>
    </head>
    <body>
        <iframe src="https://playcanv.as/p/PROJECT_ID/" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
    </body>
</html>
```

## 自身のサーバでセルフホスティング {#self-hosting-on-your-own-server}

PlayCanvasサーバから独立してゲームをホスティングするには、次を行います：

* プロジェクトに移行してEditorを開く。
* 左側のツールバーの<span class="pc-icon">&#57911;</span>ボタンをクリックするか左上メニューからPublishingをクリック。

![Publish Button](/img/user-manual/editor/publishing/toolbar-publish.png)

* Publishing Dialogが開きます。

![Publish](/img/user-manual/editor/publishing/dialog-publish.png)

* DOWNLOAD .ZIP ボタンをクリック

![Download](/img/user-manual/editor/publishing/dialog-publish-download.png)

* エクスポートするファイルの名前を入力してください。これは、作成される .zip ファイルの名前になります。
* 以下のリストからエクスポートに含めるシーンを選択してください。アクティブなバナーアイコンが付いているシーンが、アプリが起動されたときに最初にロードされるシーンになります。
* 「DOWNLOAD」ボタンをクリックして、デプロイ用に準備されたプロジェクトのzipファイルをダウンロードしてください。
* 以下の手順で、プロジェクトのzipファイルを展開し、任意の場所に保存します。そして、`index.html` ファイルを開くことでアプリケーションを起動できます。

## GitHub Pages での自己ホスティング {#self-hosting-on-github-pages}

PlayCanvasアプリケーションは静的コンテンツであるため、[Self-hosting on your own server](#self-hosting-on-your-own-server)と同じ手順で[GitHub Pages][12]を使用してアプリケーションをホストすることができます。

また、PlayCanvasが公開する一部のファイルはアンダースコアで始まるため、これらのファイルが無視されないように、GitHubリポジトリのルートディレクトリに`.nojekyll`という名前の追加ファイルを追加する必要があります。

GitHub Pagesドキュメントは、[`.nojekyll`][13]ファイルの使用に関する情報を提供しています。

## ダウンロードされたビルドを実行する {#running-a-downloaded-build}

`index.html`ファイルをブラウザで開いたり、`file://` URLからアプリケーションをロードすることはできません。 `http://` または `https://` を使用して`index.html` ファイルをロードするためには、ローカルのウェブサーバを使用する必要があります。

ウェブサーバを実行するためのオプションは多数あります。いくつかを紹介します：

* *初級:* [Python][6]をインストールし、アプリケーションのindex.htmlと同じフォルダから*python -m SimpleHTTPServer*コマンドを実行します。その後、ブラウザを `http://localhost:8000` に向けます。
* *中級:* [NPM][10]と[http-server][11]をグローバルにインストールします。アプリケーションのindex.htmlと同じフォルダから *http-server -p 8000 --cors -c-1* というコマンドを実行します。そして、ブラウザを `http://localhost:8000` に向けます。
* *中級:* [XAMPP][7]をインストールします。これは完全なPHP開発環境ですが、簡単に設定できるApacheサーバーが含まれています。
* *上級:* スタンドアロンサービスとして[Apache][8]または[nginx][9]をインストールします。

[1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
[2]: /user-manual/editor/publishing/web/playcanvas-hosting
[6]: https://www.python.org/
[7]: https://www.apachefriends.org/index.html
[8]: https://httpd.apache.org/
[9]: https://www.nginx.com/
[10]: https://www.npmjs.com/
[11]: https://www.npmjs.com/package/http-server
[12]: https://pages.github.com/
[13]: https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#static-site-generators

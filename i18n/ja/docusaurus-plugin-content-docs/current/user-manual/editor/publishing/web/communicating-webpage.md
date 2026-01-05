---
title: Webページとの通信
---

PlayCanvasとWebGLを使う最大の利点の一つは、アプリケーションと周囲のWebページとの間に直接的にやり取りできることです。このページでは、PlayCanvasアプリケーションとWebページまたはWebアプリケーションを接続する一般的な方法について説明します。

PlayCanvasアプリケーションが周囲のWebページと通信する方法には2つあります。1つ目は、ページ内のiframeにアプリケーションを埋め込む方法です。2つ目は、独自のHTMLページを提供し、PlayCanvasページを読み込む方法です。これら2つの方法には、Webページとアプリケーション間で通信するために異なる方法が必要です。

## APIの定義

両方のホスティング方法に共通することは、PlayCanvasアプリケーションでウェブページに公開する必要のある機能を考えることです。ボタンクリックやスライダーに基づいて何かの色を変更する必要があるかもしれません。または、アプリケーションにレンダリングされるテキスト入力を送信する必要があるかもしれません。公開する必要がある機能を事前に決定し、PlayCanvasアプリケーションに明示的なAPIまたは関数群を書いて、ウェブページから呼び出される唯一の関数を作成します。

次に、PlayCanvasアプリケーションでAPIまたは関数を公開する一例を示します。

```javascript
// method one: define a global function to set the score
window.setScore = function (score) {
    const app = pc.Application.getApplication();
    const entity = app.root.findByName("Score Keeper");
    entity.script.scoreKeeper.setScore(score);
}

var ScoreKeeper = pc.createScript("scoreKeeper");

ScoreKeeper.prototype.initialize = function (entity) {
    // method two: define an application event to set the score
    this.app.on("score:set", function (score) {
        this.setScore(score);
    }, this);
};

ScoreKeeper.prototype.setScore = function (score) {
    // do the score setting here.
};

// how to use the API:

// method one:
window.setScore(10);

// method two:
const app = pc.Application.getApplication();
app.fire("score:set", 10);

```

方法1は、アプリケーションにアクセスするために、ページ内のどこでも呼び出すことができるグローバルな関数を定義します。方法2は、ページから発射することができるアプリケーションイベントを定義します。アプリケーションはこのイベントをリッスンし、イベントに応じてアクションを実行します。どちらもアプリケーションでAPIを定義する有効な方法です。

### iframeに埋め込まれている場合

PlayCanvasアプリケーションをiframeに埋め込むことは、すばやく簡単にページにPlayCanvasコンテンツを取り込む方法です。また、最適化されたホスティングを利用できるため、すべてのPlayCanvasコンテンツを提供する必要がないことも意味します。ただし、欠点として、異なるページで実行されるため、ホスティングページからPlayCanvasアプリケーションのJavaScript関数を直接呼び出すことはできません。

親ページとiframe間で通信するには、[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)のJavaScript APIを使用して、ページとPlayCanvasアプリケーション間でデータを送信する必要があります。

ホストページでは、iframeレスのURLを使用してください。デフォルトのパブリッシュリンクには、ソーシャル共有バーを含めるためのiframeが組み込まれています。これは、[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)の問題が発生する可能性があるためです

iframeとソーシャル共有バーを含まないバージョンのビルドを取得するためには、URLの `https://playcanv.as` の後に`/e`を追加します。

```html
<iframe id="app-frame" src="https://playcanv.as/e/p/example/">
<script>
const iframe = document.getElementById("app-frame");
iframe.contentWindow.postMessage({
    score: 10,
}, "https://playcanv.as");
</script>
```

アプリケーションで次のようにします。

```javascript
window.addEventListener("message", function (event) {
    if (event.origin === "http://example.com") { // always check message came from your website
        const score = event.data.score;

        // call API method one:
        window.setScore(score);

        // call API method two:
        const app = pc.Application.getApplication();
        app.fire("score:set", score);
    }
}, false);
```

### 独自のHTMLを提供する

PlayCanvasアプリケーションをセルフホストする場合、これがアプリケーションを実行するために含まれるindex.htmlページです。

```html
<!doctype html>
<html>
<head>
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'>
    <meta charset='utf-8'>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title>Application Title</title>
    <script src="playcanvas-stable.min.js"></script>
    <script>
        SCENE_PATH = "12346.json";
        CONTEXT_OPTIONS = {
            'alpha': false,
            'preserveDrawingBuffer': false
        };
    </script>
</head>
<body>
    <script src="__start__.js"></script>
    <script src="__loading__.js"></script>
</body>
</html>
```

これをベースにしてWebページの修正を行い、必要な追加のコンテンツを追加できます。たとえば、ボタンを押したときにPlayCanvasアプリケーションと通信する場合、前述のAPIをスクリプトから直接呼び出すことができます。また、`postMessage`を使用する必要はありません。

ボタンの押下などでPlayCanvasアプリケーションと通信する場合、スクリプトから直接上で定義されたAPIを呼び出すことができます。`postMessage`を呼び出す必要はありません。

`__start__.js`がPlayCanvasアプリケーションを作成するので、その後に全てのカスタムコードを実行してください。多くのケースでは、全てのアセットの読み込みが終わり、アプリケーションが起動する前まで待つべきです。これを行うには`start`イベントに応答します。

以下に例を示します。

```html
<!doctype html>
<html>
<head>
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'>
    <meta charset='utf-8'>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title>Application Title</title>
    <script src="playcanvas-stable.min.js"></script>
    <script>
        SCENE_PATH = "12346.json";
        CONTEXT_OPTIONS = {
            'alpha': false,
            'preserveDrawingBuffer': false
        };
    </script>
</head>
<body>
    <script src="__start__.js"></script>
    <script src="__loading__.js"></script>
    <script>
    const app = pc.Application.getApplication();
    app.on("start", function () {
        // get the root of the scene.
        const hierarchy = app.root.children[0];

        // do other stuff here
    });
    </script>
</body>
</html>
```

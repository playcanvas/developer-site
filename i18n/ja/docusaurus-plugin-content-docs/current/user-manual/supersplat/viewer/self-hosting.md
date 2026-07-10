---
title: ビューアのセルフホスティング
description: "SuperSplat Editorからスプラットを自己完結型のHTMLビューアとしてエクスポートし、どこにでも — GitHub Pages、自前のウェブサーバー、単一ファイルとしての共有 — ホストできます。"
---

[SuperSplat Viewer](/user-manual/supersplat/viewer/)は[オープンソース](https://github.com/playcanvas/supersplat-viewer)であり、[superspl.at](https://superspl.at)に公開する代わりに（または併用して）スプラットコンテンツをセルフホストしたい場合は、[SuperSplat Editor](/user-manual/supersplat/editor/)から直接エクスポートできます。エクスポートされたビューアは、使いやすいカメラコントロールを備えた任意のモダンブラウザで動作し、WebXRをサポートするデバイスではARおよびVRの可視化にも対応しています。

## HTMLビューアのエクスポート

スプラットをHTMLビューアとしてエクスポートするには：

1. SuperSplat Editorで`File` > `Export`サブメニューを開きます。
2. `Viewer App…`を選択します。

:::note

ビューアのエクスポートには、**WebGPU**をサポートするブラウザが必要です。埋め込まれるスプラットデータのSOG圧縮がGPU上で実行されるためです。WebGPUのないブラウザでは、エクスポートは「This export requires WebGPU, which is not available in this browser. Please try a recent version of Chrome, Edge or Safari.」というエラーで失敗します。

:::

## エクスポートオプション

ビューアのエクスポートはいくつかのオプションで設定できます：

![Viewer Export](/img/user-manual/supersplat/viewer/viewer-export.png)

| オプション | 説明 |
|--------|-------------|
| **Export Type** | エクスポートされるビューアの形式を制御します：<br/>• **HTML**: スプラットがSOGに圧縮され、Base64エンコードされてファイルに直接埋め込まれた単一ページの`.html`ファイル。すべてが1つのファイルにまとめられているため非常に便利で、ファイルをダブルクリックするだけで`file://`プロトコルを使ってブラウザで動作します。ただし、Base64エンコードによりZIP Package形式よりも約30%大きくなり、ブラウザによって最大サイズに異なる制限があります（32MB未満であればどこでも読み込まれるはずですが、それ以上の場合は問題が発生する可能性があります）<br/>• **ZIP Package**: ビューアアプリ（`index.html`、`index.js`、`index.css`、`settings.json`）と、バンドルされたSOGファイル（`index.sog`）としてのスプラットデータを含むzipファイル。サイズが小さく、読み込みが速く、どこでも読み込まれることが保証されています。ただし、`http://`経由でのみ読み込まれるため、ローカルウェブサーバ（例：Nodeの[`serve`](https://www.npmjs.com/package/serve)やPythonの[`http.server`](https://docs.python.org/3/library/http.server.html)（`python -m http.server`））を実行する必要があります |
| **Animation** | 有効にすると、[タイムライン](/user-manual/supersplat/editor/timeline)で作成したカメラアニメーションが含まれ、ビューアの読み込み時に再生されます。タイムラインにキーフレームがある場合にのみ使用でき（その場合はデフォルトで有効）ます |
| **Loop Mode** | 含まれたカメラアニメーションの再生方法：<br/>• **None**: 1回再生して停止<br/>• **Repeat**（デフォルト）: 連続してループ<br/>• **Ping Pong**: 順方向と逆方向の再生を繰り返し |
| **Background** | ビューアの背景色。Editorの現在の背景色がデフォルトになります |
| **Field of View** | ビューアのカメラの垂直視野角（度）。Editorカメラの現在の設定がデフォルトになります |
| **SH Bands** | エクスポートされるスプラットデータに含める球面調和バンドの数 |

エクスポートされたビューアのカメラは、エクスポートした瞬間のビューポートカメラのポーズから開始します。エクスポートする前に、お気に入りのビューでフレーミングしておきましょう。

## HTMLビューアのウェブホスティング

エクスポート後、HTMLビューアファイルをどこかにホストしてアクセス可能にできます。簡単なオプションの1つはGitHub Pagesを使うことです：

1. [GitHub](https://github.com)で新しいリポジトリを作成します。
2. エクスポートしたHTMLファイルを追加します（ZIP Packageの場合は、zipを展開した中身 `index.html`、`index.sog`、`index.js`、`index.css`、`settings.json` を追加します）。
3. リポジトリの`Settings`ページにアクセスします。左側で`Pages`を選択します。`Source`が`Deploy from a branch`に設定されていることを確認し、`Branch`を`main`に設定して`Save`をクリックします。
4. ビューアが公開されるまでに数分かかります。URLは次の形式になります：

   `https://<github-username>.github.io/<repository-name>/<html-filename>`

## 関連項目

- [SuperSplat Viewerの概要](/user-manual/supersplat/viewer/) — オープンソースのビューアとは何か、いつ使うか
- [Embedding](/user-manual/supersplat/viewer/embedding) — `@playcanvas/supersplat-viewer` npmパッケージを自分のウェブアプリで使う
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — Studioが書き、Viewerが読むJSONコントラクト

---
title: ビューアのセルフホスティング
description: "SuperSplat Editorからスプラットを自己完結型のHTMLビューアとしてエクスポートし、どこにでも — GitHub Pages、自前のウェブサーバー、単一ファイルとしての共有 — ホストできます。"
---

[SuperSplat Viewer](/user-manual/supersplat/viewer/)は[オープンソース](https://github.com/playcanvas/supersplat-viewer)であり、[superspl.at](https://superspl.at)に公開する代わりに（または併用して）スプラットコンテンツをセルフホストしたい場合は、[SuperSplat Editor](/user-manual/supersplat/editor/)から直接エクスポートできます。エクスポートされたビューアは、使いやすいカメラコントロールを備えた任意のモダンブラウザで動作し、WebXRをサポートするデバイスではARおよびVRの可視化にも対応しています。

## HTMLビューアのエクスポート

スプラットをHTMLビューアとしてエクスポートするには：

1. SuperSplat Editorで`File` > `Export`サブメニューを開きます。
2. `Viewer App…`を選択します。

## エクスポートオプション

ビューアのエクスポートはいくつかのオプションで設定できます：

![Viewer Export](pathname:///img/user-manual/supersplat/viewer/viewer-export.png)

| オプション | 説明 |
|--------|-------------|
| **Export Type** | エクスポートされるビューアの形式を制御します：<br/>• **HTML**: スプラットがBase64エンコードされ、ファイルに直接埋め込まれた単一ページの`.html`ファイル。すべてが1つのファイルにまとめられているため非常に便利で、ファイルをダブルクリックするだけで`file://`プロトコルを使ってブラウザで動作します。ただし、Base64エンコードによりZIP Package形式よりも約30%大きくなり、ブラウザによって最大サイズに異なる制限があります（32MB未満であればどこでも読み込まれるはずですが、それ以上の場合は問題が発生する可能性があります）<br/>• **ZIP Package**: ビューアの`.html`ファイルと、スプラットを含む別の`.compressed.ply`ファイルを含むzipファイル。サイズが小さく、読み込みが速く、どこでも読み込まれることが保証されています。ただし、`http://`経由でのみ読み込まれるため、ローカルウェブサーバ（例：Nodeの[`serve`](https://www.npmjs.com/package/serve)やPythonの[`http.server`](https://docs.python.org/3/library/http.server.html)（`python -m http.server`））を実行する必要があります |
| **Start Position** | ビューアのカメラに使う開始位置：<br/>• **Default**: ビューアが最適な開始点を自動的に選択します<br/>• **Current Viewport**: SuperSplat Editorのビューポートで設定された現在のカメラ位置を使います<br/>• **1st Camera Frame**: タイムラインの最初のフレームで定義された最初のカメラ位置を使います |
| **Animation** | ビューアのカメラに適用するアニメーション：<br/>• **None**: アニメーションなし<br/>• **Track**: SuperSplat Editorのタイムラインで設定したキーフレームでカメラをアニメーションします |
| **Background** | ビューアの背景色 |
| **Field of View** | ビューアのカメラの垂直視野角（度） |
| **SH Bands** | 公開される圧縮済みPLYファイルに書き出される球面調和バンドの数 |

## HTMLビューアのウェブホスティング

エクスポート後、HTMLビューアファイルをどこかにホストしてアクセス可能にできます。簡単なオプションの1つはGitHub Pagesを使うことです：

1. [GitHub](https://github.com)で新しいリポジトリを作成します。
2. エクスポートしたHTMLファイル（ビューアをZIP Packageとしてエクスポートした場合は、`.compressed.ply`ファイルも）を追加します。
3. リポジトリの`Settings`ページにアクセスします。左側で`Pages`を選択します。`Source`が`Deploy from a branch`に設定されていることを確認し、`Branch`を`main`に設定して`Save`をクリックします。
4. ビューアが公開されるまでに数分かかります。URLは次の形式になります：

   `https://<github-username>.github.io/<repository-name>/<html-filename>`

## 関連項目

- [SuperSplat Viewerの概要](/user-manual/supersplat/viewer/) — オープンソースのビューアとは何か、いつ使うか
- [Embedding](/user-manual/supersplat/viewer/embedding) — `@playcanvas/supersplat-viewer` npmパッケージを自分のウェブアプリで使う
- [Experience Settings](/user-manual/supersplat/studio/experience-settings) — Studioが書き、Viewerが読むJSONコントラクト

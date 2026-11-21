---
title: モバイル
description: "PlayCanvas EditorのアプリをネイティブアプリでラップしてApple App StoreやGoogle Playに出す方法です。Apache Cordova、Median.co（旧GoNative）、自作のWebViewを扱います。"
---

PlayCanvasのアプリはもともとモバイルブラウザで動くので、スマートフォンに届けるいちばん簡単な方法はリンクです。Apple App StoreやGoogle Playなどのアプリストアに出すには、アプリを**WebView**（アプリの中のブラウザビュー）で表示するネイティブアプリで包みます。

WebViewにアプリを入れる方法は2つあります。

| 方法 | しくみ | オフラインで動くか |
| --- | --- | --- |
| [Apache Cordova](cordova.md) | [ダウンロードしたビルド](../../projects/downloading.md)をアプリの中にパッケージする、オープンソースのツールです。 | 動く |
| [Median.co（旧GoNative）](gonative.md) | アプリのウェブアドレスをもとにアプリを作る有料サービスです。 | 動かない（ホスト先から読み込む） |

1つのフルスクリーンWebViewだけでできたiOSアプリやAndroidアプリを自分で作り、ダウンロードしたビルドをアプリ自身のファイルから読み込むこともできます。

ストアに提出する前に、[起動ページ](../../interface/launch-page/index.md)で実機でテストし、[テクスチャ圧縮](/user-manual/optimization/texture-compression/)でダウンロードを小さく保ってください。

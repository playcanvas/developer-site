---
title: デバッグ
sidebar_position: 9
---

PlayCanvasのスクリプトを作成するためには、ブラウザの開発ツールにアクセスして使用する方法を知っていることが重要です。

Chrome、Firefoxや他のブラウザでは、ブラウザに直接組み込まれているDeveloper Toolがあります。通常、Mac上でALT-CMD-I、WindowsではF12キーを押すことでアクセスすることができます。またはブラウザのメニューを使用して開発者ツールにアクセスすることができます。

### スクリプトのデバッグ

スクリプトをデバッグするためには、Developer Tools (Chrome)でSourcesタブを選択します。Sourcesペインの左上隅にあるアイコンをクリックして 'navigator' を開きます。以下のようなものが表示されるはずです：

![Debugger][1]

Firefoxでは次のようになります：

![Firefox][2]

ナビゲータには、自身で書いたPlayCanvasスクリプトを含む、現在アクティブなタブで実行している全てのスクリプトがリストされます。ナビゲーターからスクリプトを探し、選択するとソースコードが開きます。これで、ブレイクポイントを設定してデバッグが行えます。

各ブラウザには、JavaScriptをデバッグする方法の手順が詳述されています。これらのドキュメントをお読みください：[Chrome][3], [Firefox][4], [Safari][5], [Edge / Internet Explorer][6]。

:::note

実行しているappがデバッガーのブレイクポイントで一時停止された場合、そのappを起動するのに使用される他のブラウザ内ウィンドウ／タブ (PlayCanvas Code EditorまたはEditorなどを含む) も一時停止される可能性があります。

:::

### モバイルデバイスでのデバッグ

Androidでは、デスクトップChromeブラウザのデベロッパーツールとUSBケーブルを介してモバイルChromeブラウザに接続することができます。[Google Developer documentation][7]には、セットアップの詳細な手順が記載されています。

iOSデバッグには、Macへのアクセスが必要であり、[Appleが必要な手順][8]を概説しています。

ChromeやSafariからWebビューに直接接続することができない状況（別のアプリ内のWebビューなど）や、Macにアクセスできない場合は、以下のライブラリとサービスをプロジェクトに追加することができます。

* [RemoteJS][9] - 開発者は、デスクトップブラウザでコンソール出力をリモートで表示し、JSをコンソールで実行することができ、非常に強力です。コンソール出力には遅延や遅延がある場合があります。
* [vConsole][10] または [Eruda][11] - ページに展開してコンソール出力、ネットワーク要求、ページの要素などを表示できるウィジェットDOMオブジェクトを追加します。

[1]: /images/user-manual/scripting/debugging/chrome-debugger.jpg
[2]: /images/user-manual/scripting/debugging/firefox-debugger.jpg
[3]: https://developer.chrome.com/docs/devtools/javascript/
[4]: https://developer.mozilla.org/en-US/docs/Tools/Debugger
[5]: https://developer.apple.com/safari/tools/
[6]: https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/javascript/reference
[7]: https://developer.chrome.com/docs/devtools/remote-debugging/
[8]: https://webkit.org/web-inspector/enabling-web-inspector/
[9]: https://remotejs.com/
[10]: https://github.com/Tencent/vConsole
[11]: https://github.com/liriliri/eruda

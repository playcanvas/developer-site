---
title: Facebook
---

[Facebook][1]から大勢のユーザにPlayCanvasゲームを公開することができます。PlayCanvasからFacebookにゲームを公開するのは簡単です。

## Facebookへの公開方法

**1.** PlayCanvasにゲームを公開します。(また、セルフホスティングされたゲームをFacebookに公開することもできます。以下のようなプロセスになります。)

**2.** [Facebook Developer Portal][2] からゲーム用に新しいFacebook Appを作成します。

**3.** 提案されたら、アプリケーションタイプとして**Facebook Canvas**を選択

![Facebook Canvas](/img/user-manual/editor/publishing/web/facebook/choose-platform.jpg)

**4.** Secure Canvas URLにはゲームの`playcanv.as` URLを入力します

![Secure Canvas](/img/user-manual/editor/publishing/web/facebook/secure-canvas-url.jpg)

**5.** アプリケーション設定セクションにウェブサイトURLを追加して、次のようになるようにします： `https://s3-eu-west-1.amazonaws.com/apps.playcanvas.com/[BUILD_HASH]/index.html` 。このURLを見つけるためには、`playcanv.as` のゲームリンク、例えば `https://playcanv.as/p/JtL2iqIH/` を取り、`p/`の前に`e/`を追加します。例えば `https://playcanv.as/e/p/JtL2iqIH/` とします。これはブラウザでリダイレクトします、このURLをウェブサイトURLに使用します。

![Website URL](/img/user-manual/editor/publishing/web/facebook/website-url.jpg)

:::note

PlayCanvasのゲームのホスティング方法、また、FacebookがAPIへのアクセスを許可するために実装するセキュリティ要件のため、ウェブサイトURLとしてこのURLを追加する必要があります。Secure Canvas URLのみの設定で済むよう、PlayCanvasで問題の解決に取り組んでいます。

:::

**6.** 最後に、ゲームに必要な画像やアイコンを全て設定します。

![Images](/img/user-manual/editor/publishing/web/facebook/icons.jpg)

**7.** SettingsページにリストされているApp URLからゲームの検証を行うことができます。

![App URL](/img/user-manual/editor/publishing/web/facebook/app-url.jpg)

[1]: https://facebook.com
[2]: https://developers.facebook.com/

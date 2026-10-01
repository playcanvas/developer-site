---
title: サードパーティのフレームワーク
description: "iPhoneのSafariなど、WebXRに対応していないブラウザでPlayCanvasを使ってARを実現するための、JavaScriptのトラッキングフレームワーク、ZapparのUniversal AR for PlayCanvas、ホスティング型プラットフォームの終了後にオープンソースになった8th Wallの現状を紹介します。"
---

WebXRのARは、すべてのブラウザで利用できるわけではありません。例えば、iPhoneとiPadのSafariはサポートしていません。サードパーティのフレームワークは、JavaScriptとWebAssemblyでカメラ画像をトラッキングすることで、そうしたブラウザにARをもたらし、トラッキングした結果を使ってPlayCanvasのカメラを動かします。また、顔のトラッキングなど、WebXRにはない種類のトラッキングも提供しています。

これらのフレームワークは独立した製品で、それぞれ独自のライセンスと利用条件があります。フレームワークはエンジンのXRサポートに追加されるものではなく、それに取って代わるものです。独自のカメラとトラッキングを実行するため、`app.xr`の機能はどれも適用されません。

## Zappar Universal AR {#zappar-universal-ar}

[ZapparのUniversal AR for PlayCanvas](https://zap.works/universal-ar/playcanvas/)は、iOS 11.3以降のSafari、Android版Chrome、その他ほとんどのモバイルブラウザで、画像、顔、ユーザーの周囲の世界（インスタントワールドトラッキング）をトラッキングします。エディターで使用できます。Zapparの[スタータープロジェクト](https://playcanvas.com/user/zappar)をフォークし、そのトラッキングテンプレートの1つをシーンにドラッグしてください。使い始めるには、Zapparの[ドキュメント](https://docs.zap.works/universal-ar/playcanvas/)を参照してください。

Universal ARのプロジェクトを公開するには、ZapWorksのプランが必要です。条件については、Zapparの[ライセンス](https://docs.zap.works/universal-ar/general/licensing/)と[料金](https://zap.works/pricing/)のページを参照してください。

## 8th Wall {#8th-wall}

8th Wallのホスティング型プラットフォームは、2026年2月28日に開発者向けの提供を終了しました。そこで公開されたプロジェクトは2027年2月28日まで動作し続けますが、編集はできなくなっています。8th Wallのトラッキングは現在、[8thwall.org](https://8thwall.org/)で無料で利用できます。フレームワークはMITライセンスのオープンソースで、ワールドトラッキングエンジンは独自のライセンスのバイナリとして提供されています。そのドキュメントには、`XR8.PlayCanvas` APIと、[8th WallのPlayCanvasアカウント](https://playcanvas.com/user/the8thwall)にあるスタータープロジェクトを使ったPlayCanvasとの統合が記載されていますが、これらはホスティング型プラットフォーム向けに作られたものです。新しいプロジェクトで使い始める前に、オープンソースプロジェクトの[ドキュメント](https://8thwall.org/docs/engine)で現在の状況を確認してください。

## 関連情報 {#see-also}

- [AR](/user-manual/xr/ar/) - エンジンによるWebXRのAR
- [プラットフォーム](/user-manual/xr/platforms/) - WebXRのARを利用できるブラウザ

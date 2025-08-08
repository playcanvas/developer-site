---
title: セーフエリア
---

モバイルデバイスがフルデバイススクリーンを持つ傾向にあるため、イヤースピーカーやフロントカメラ用のノッチやカットアウトがディスプレイに使用されるようになりました(iPhone Xの下を見てください)。

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/iphone-notch.png" />

(Image Original: Rafael Fernandez, Modified version:PlayCanvas, [CC BY-SA 4.0][cc-by-sa-40], via Wikimedia Commons)

開発中にノッチで隠れるかもしれないユーザーに必要な情報を考慮する必要があります。

例えば、次のスクリーンショットはデスクトップ上の開発ツールのモバイルビューでは問題ありません。

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/desktop-view.png" width="500" />

しかし、iPhone Xなどのモバイルデバイスで開くと、「Left」テキストはノッチの下にレンダリングされ、「Bottom」テキストはナビゲーションバーの下にレンダリングされます。

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/mobile-view-render-under-notch.png" width="500" />

## セーフエリア

開発者を支援するために、これらのデバイス上のブラウザでは、CSS内の[環境変数][env-mdn]をサポートしています。これは、ノッチやナビゲーションバーが占める領域内で要素を配置するための値を返すものです。これを「セーフエリア」と呼びます。

当社は、そのCSS値を取り、UIグループエレメントのマージンをリサイズすることでその値を適用する再利用可能なスクリプトを持つ[プロジェクト][safe-area-project]を提供しています。

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/mobile-view-safe-area.png" width="500" />

プロジェクト内のUIセットアップには、フルスクリーンのグループエレメントを持つエンティティ「Safe Area」があります。このエンティティには、デバイスのセーフエリア内に要素を適合させるためのロジックが含まれる「mobileSafeArea」というスクリプトが添付されています。

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/hierarchy-layout.png" width="420" />

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/safe-area-entity-setup.png" width="420" />

重要なUI要素は、セーフエリアエンティティの子エレメントとして配置され、それに相対的にアンカーされます。

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/hierarchy-essential-elements.png" width="420" />

開発を支援するために、デバイスを必要とせずにUIレイアウトのプレビューを表示するために、デバッグ設定を有効にすることができます。

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/debug-config.png" width="600" />

デバッグ設定は、起動タブでライブアップデートで編集できます。

<img loading="lazy" src="/img/user-manual/user-interface/safe-area/debug-config-runtime.gif" width="500" />

[env-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/env()
[safe-area-project]: https://playcanvas.com/project/828118/overview/mobile-ui-safe-areas
[cc-by-sa-40]: https://creativecommons.org/licenses/by-sa/4.0

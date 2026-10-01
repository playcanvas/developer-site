---
title: プラットフォーム
description: "PlayCanvasで作成したWebXRアプリケーションが動作する環境：ヘッドセット、スマートフォン、PC VRとそれぞれのブラウザ、VRとARのサポート、入力とAR機能、グラフィックスバックエンド、実行時の機能検出。"
---

WebXRは、ほとんどのヘッドセットのブラウザ、AndroidスマートフォンのChrome、そしてPC VRヘッドセットを接続したデスクトップブラウザで動作します。それぞれが提供する機能は異なり、ブラウザのリリースごとに変わります。そのため、デバイスで判断するのではなく、このセクションの各ページで示しているように、実行時に機能を検出してください。

## デバイスとブラウザ {#devices-and-browsers}

| プラットフォーム | ブラウザ | VR | AR | 入力 |
| --- | --- | :-: | :-: | --- |
| Meta Quest | Meta Quest Browser | ✅ | ✅ | コントローラー、手 |
| Android XRヘッドセット | Chrome | ✅ | ✅ | 手、コントローラー |
| Apple Vision Pro | Safari（visionOS 2以降） | ✅ | ❌ | 視線とピンチ、手 |
| Androidスマートフォン | Chrome（[ARCore対応デバイス](https://developers.google.com/ar/devices)） | | ✅ | 画面のタップ |
| PC VRヘッドセット | Windows上のChromeとEdge | ✅ | ❌ | コントローラー |
| iPhoneとiPad | Safari | ❌ | ❌ | |

スマートフォンはAR用、ヘッドセットはVRとAR用です。Picoなどの他のヘッドセットも、独自のブラウザでWebXRをサポートしています。iPhoneとiPadでのARについては、[サードパーティのフレームワーク](/user-manual/xr/ar/third-party-frameworks/)を参照してください。

## 機能 {#features}

各プラットフォームで利用できるAR機能は、ベンダーのドキュメントによると次のとおりです。

| 機能 | Meta Quest | Android XR | Androidスマートフォン |
| --- | :-: | :-: | :-: |
| [ヒットテスト](/user-manual/xr/ar/hit-testing/) | ✅ | ✅ | ✅ |
| [アンカー](/user-manual/xr/ar/anchors/) | ✅ | ✅ | ✅ |
| [永続アンカー](/user-manual/xr/ar/anchors/#persistence) | ✅ | | |
| [平面検出](/user-manual/xr/ar/plane-detection/) | ✅ | | フラグで有効化 |
| [メッシュ検出](/user-manual/xr/ar/mesh-detection/) | ✅ | | |
| [深度センシング](/user-manual/xr/ar/depth-sensing/) | ✅ | ✅ | ✅ |
| [ライト推定](/user-manual/xr/ar/light-estimation/) | | ✅ | ✅ |
| [カメラアクセス](/user-manual/xr/ar/camera-color/) | | | ✅ |
| [画像トラッキング](/user-manual/xr/ar/image-tracking/) | | | フラグで有効化 |
| [DOMオーバーレイ](/user-manual/xr/ar/dom-overlay/) | | | ✅ |

[ハンドトラッキング](/user-manual/xr/hand-tracking/)は、Meta Quest、Android XR、Apple Vision Proで利用できます。Apple Vision Proでは、セッションの開始時にユーザーに許可が求められます。また、ピンチは手とは別の、視線とピンチによる入力ソースとして届きます。[入力ソース](/user-manual/xr/input-sources/#hands-controllers-and-transient-input)を参照してください。

特定のデバイスに関する注意点は次のとおりです。

- **Meta Quest**は、Quest 3、3S、Proではパススルーで部屋をカラー表示し、Quest 2ではグレースケールで表示します。平面とメッシュは、ユーザーが設定した部屋から取得されます。また、手のひらをユーザーに向けたピンチなど、一部のハンドジェスチャーはシステムメニュー用にデバイスが予約しています。1つのサイトで永続化できるアンカーは最大8個です。
- **Android XR**ヘッドセットは、ユーザーの手を主な入力として使い、深度を目ごとに報告します。
- **Androidスマートフォン**では、Google Play開発者サービス（AR）が必要です。平面検出と画像トラッキングはChromeでは実験的な機能で、`chrome://flags/#webxr-incubations`フラグで有効にする必要があります。

## グラフィックスバックエンド {#graphics-backends}

すべてのWebXRブラウザは、WebGL 2でXRを表示できます。WebGPUで表示するには、ブラウザのWebXR/WebGPUバインディングである`XRGPUBinding`が必要です。visionOSのSafariはSafari 26.2以降でWebGPUを使ったWebXRをサポートしており、Chromeではフラグを有効にすると利用できます。このバインディングがないブラウザでは、エンジンはWebGPUデバイスでのXRを利用不可として報告します。[はじめに](/user-manual/xr/using-webxr/#setting-up)で示しているように、デバイスを作成する前に`pc.XrManager.isDeviceSupported()`でバックエンドを選択してください。

## 機能の検出 {#detecting-features}

- `app.xr.supported`はブラウザがWebXRを備えているかどうかを、`app.xr.isAvailable()`はあるセッションタイプを開始できるかどうかを表します。[セッション](/user-manual/xr/sessions/#checking-availability)を参照してください。
- `app.xr`の各部分の`supported`プロパティはブラウザが機能を実装しているかどうかを、`available`プロパティは実行中のセッションでその機能を使えるかどうかを表します。[セッションの機能](/user-manual/xr/sessions/#session-features)を参照してください。
- 入力ソースは追加・削除され、デバイスによっても異なります。それぞれの入力ソースは、持っているものに応じて扱ってください。[入力ソース](/user-manual/xr/input-sources/#hands-controllers-and-transient-input)を参照してください。

## 関連情報 {#see-also}

- [テストとデバッグ](/user-manual/xr/testing/) - デバイスでの実行とデバッグ、デバイスのエミュレート
- [Android XR向けのウェブ開発](https://developer.android.com/develop/xr/web) - Android XRでのWebXRに関するGoogleのガイド
- [Meta QuestでのWebXR](https://developers.meta.com/horizon/documentation/web/webxr-overview) - Meta Quest BrowserでのWebXRに関するMetaのガイド
- [Can I use WebXR](https://caniuse.com/webxr) - WebXR Device APIのブラウザサポート状況

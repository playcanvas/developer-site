---
title: プラットフォーム
description: "WebXRを通してPlayCanvasのXRアプリケーションを実行できるヘッドセット、スマートフォン、ブラウザ: VRとARのサポート、ハンドトラッキング、各デバイスのAR機能、WebGPUでのWebXR、WebXRがないデバイス。"
---

PlayCanvasのXRアプリケーションは、ブラウザがWebXRをサポートしていればどこでも動作します。どのセッションタイプと[機能](/user-manual/xr/#features)を使えるかはデバイスとそのブラウザによって異なり、ブラウザには頻繁に機能が追加されます。このページでは主なプラットフォームを、2026年11月時点で各メーカーがドキュメントに記載している内容に基づいて紹介します。一覧に頼るのではなく、[セッション](/user-manual/xr/sessions/#checking-availability)で説明しているように、必ずコードで利用可能かどうかを確認してください。

## デバイスとブラウザ {#devices-and-browsers}

| プラットフォーム | ブラウザ | VR | AR | ハンドトラッキング |
| --- | --- | --- | --- | --- |
| Meta Quest 3、3S、2、Pro | Meta Quest Browser | ✅ | ✅ | ✅ |
| Apple Vision Pro | Safari | ✅ | ❌ | ✅ |
| Samsung Galaxy XRなどのAndroid XRヘッドセット | Chrome | ✅ | ✅ | ✅ |
| Google Play Services for ARに対応したAndroidスマートフォンとタブレット | Chrome | ✅ | ✅ | ❌ |
| SteamVRやMeta Quest LinkなどのOpenXRランタイムを介したPC VRヘッドセット | WindowsのChromeとEdge | ✅ | ❌ | ✅ |
| Pico 4 Ultra | Pico Browser | ✅ | ✅ | ✅ |
| Magic Leap 2 | Magic Leapのブラウザ | ✅ | ✅ | ✅ |

Apple Vision Proでは、ユーザーの主な入力は視線とピンチです。ユーザーは対象を見て、ピンチしてセレクトします。各ピンチは、視線に沿ったレイを持つ一時的な入力ソースになります。Androidスマートフォンでは、VRはGoogle Cardboardなどのスマートフォンホルダー向けの分割画面表示になり、ARの入力は画面のタップです。[入力ソース](/user-manual/xr/input-sources/)を参照してください。

Magic LeapはMagic Leap 2の提供を終了しています。サポートは2027年末で終わりますが、その後もデバイスは引き続き動作するとしています。

## AR機能 {#ar-features}

各プラットフォームのメーカーがドキュメントに記載しているAR機能は次のとおりです。

| 機能 | Meta Quest | Android XR | Androidスマートフォン |
| --- | --- | --- | --- |
| [ヒットテスト](/user-manual/xr/ar/hit-testing/) | ✅ | ✅ | ✅ |
| [アンカー](/user-manual/xr/ar/anchors/) | ✅ | ✅ | ✅ |
| [永続アンカー](/user-manual/xr/ar/anchors/#persistence) | ✅ | ❌ | ❌ |
| [平面検出](/user-manual/xr/ar/plane-detection/) | ✅ | ✅ | ✅ |
| [メッシュ検出](/user-manual/xr/ar/mesh-detection/) | Quest 3と3S | フラグの有効化が必要 | ❌ |
| [深度センシング](/user-manual/xr/ar/depth-sensing/) | Quest 3と3S | ✅ | ✅ |
| [ライト推定](/user-manual/xr/ar/light-estimation/) | | ✅ | ✅ |
| [カメラアクセス](/user-manual/xr/ar/camera-color/) | ❌ | | ✅ |
| [DOMオーバーレイ](/user-manual/xr/ar/dom-overlay/) | | | ✅ |
| [画像トラッキング](/user-manual/xr/ar/image-tracking/) | | | フラグの有効化が必要 |

空欄は、そのプラットフォームのメーカーがドキュメントに記載していない機能です。Meta Questで開いたページは、WebXRを通してヘッドセットのカメラ画像を読み取ることができません。

Picoは、次期システムソフトウェアであるPICO OS 6について、ヒットテスト、アンカー、平面検出をドキュメントに記載しています。ただし、Pico 4 UltraはPICO OS 6を実行しません。Magic Leapは、Magic Leap 2についてヒットテスト、平面検出、カメラアクセスをドキュメントに記載しています。

## WebGPUでのWebXR {#webxr-with-webgpu}

グラフィックスデバイスにWebGPUを使用するアプリケーションは、WebGPUでのWebXRをサポートするブラウザでのみセッションを開始できます。

| ブラウザ | WebGPUでのWebXR |
| --- | --- |
| Meta Quest Browser | バージョン156以降 |
| Apple Vision ProのSafari | Safari 26.2以降 |
| WindowsとAndroidのChrome | `webxr-webgpu-binding`フラグの有効化が必要 |

それ以外の環境では、WebGL 2を使用してください。[グラフィックスデバイスの選択](/user-manual/xr/using-webxr/#choosing-a-graphics-device)を参照してください。

## WebXRがない環境 {#without-webxr}

iPhoneとiPadでは、Safariを含むすべてのブラウザにWebXRがないため、PlayCanvasアプリケーションはVRやARのセッションを開始できません。iOSでのARについては、[AR](/user-manual/xr/ar/)セクションを参照してください。MacのSafariとFirefoxにもWebXRはありません。

それでも、ページはこれらのデバイスで動作するようにしてください。[はじめに](/user-manual/xr/using-webxr/#your-first-vr-scene)の例のようにXRを開始するボタンを非表示にし、代わりに画面上でシーンを見られるようにします。

## 関連情報 {#see-also}

- [テストとデバッグ](/user-manual/xr/testing/) - デバイスでのテストと、デバイスなしでのテスト
- [Can I use WebXR](https://caniuse.com/webxr) - WebXR Device APIのブラウザサポート状況
- [Meta Quest Browser](https://developers.meta.com/horizon/documentation/web/)、[Android XR](https://developer.android.com/develop/xr/develop-with-webxr)、[Apple WebKit](https://webkit.org/blog/)、[Google ARCore](https://developers.google.com/ar/develop/webxr/requirements) - 各メーカーのWebXRドキュメントとリリースノート

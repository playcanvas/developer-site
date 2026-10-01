---
title: XR
description: "PlayCanvasのXRの概要：WebXRによる没入型のVRとAR、セッションがカメラを制御する仕組み、すべてのオーサリング環境で使える構成要素、利用できる機能、このセクションの構成。"
---

XRには、ユーザーに見えるものをシーンで置き換える仮想現実（VR）と、シーンを現実世界の中に配置する拡張現実（AR）があります。PlayCanvasのアプリケーションは、[WebXR](https://immersive-web.github.io/webxr/)を使って、Meta QuestやApple Vision Proなどのヘッドセット、Androidスマートフォン、PC VRヘッドセットのブラウザでこれらを実行します。ユーザーはリンクからアクセスでき、何もインストールする必要はありません。

![ヘッドセットの両目に映るVRシーン：2つのコントローラーが、グリッドの床の上に浮かぶ箱と球にレイを向けている](/img/user-manual/xr/index/hero.webp)

## XRの仕組み {#how-xr-works}

ユーザーがVRやARに入る操作をするまで、アプリケーションは他のアプリケーションと同じようにページ上にシーンを表示します。その操作によってWebXRセッションが始まり、表示がデバイスに引き渡されます。

- **デバイスがユーザーの頭をトラッキングします。** エンジンは毎フレーム、カメラを頭のポーズに合わせて動かします。設定するのはカメラエンティティのローカルの位置と回転なので、カメラは親エンティティである*カメラリグ*の中で動きます。リグを動かすと、ユーザーがシーンの中を移動します。
- **シーンはビューごとに1回描画されます。** ヘッドセットには目ごとにビューがあり、スマートフォンにはビューが1つあります。エンジンは、デバイスが要求する視野角と解像度で、カメラからすべてのビューをレンダリングします。
- **コントローラー、手、タップが入力ソースになります。** それぞれが、指し示すためのレイと、セレクトやスクイーズなどのアクションを持ちます。
- **ARでは現実世界が透けて見えます。** カメラは透明色でクリアされ、ヒットテストや平面検出などのAR機能によって、ユーザーの周囲の状況がわかります。

ブラウザがセッションを開始するのは、**Enter VR**ボタンのクリックなど、ユーザー操作に応答したときだけです。アプリケーションがセッションを終了するか、ユーザーがセッションから抜けるとセッションは終わり、ページに再びシーンが表示されます。

## 構成要素 {#building-blocks}

[XRマネージャー](https://api.playcanvas.com/engine/classes/XrManager.html)である`app.xr`は、デバイスがどの種類のセッションをサポートしているかを確認し、セッションを開始・終了し、入力ソースやAR機能へのアクセスを提供します。セッションは[カメラコンポーネント](https://api.playcanvas.com/engine/classes/CameraComponent.html)からレンダリングされ、セッションの開始と終了にはそのコンポーネントの`startXr()`メソッドと`endXr()`メソッドを使います。

エンジンには、よく使う処理を行うスクリプトも用意されています。これらはnpmパッケージの`scripts/esm/xr`フォルダーにあります。

| スクリプト | 役割 | ページ |
| --- | --- | --- |
| `XrSession` | アプリケーションイベントとEscapeキーに応じてセッションを開始・終了し、カメラリグを配置し、ARではカメラを透過させる | [はじめに](/user-manual/xr/using-webxr/) |
| `XrControllers` | デバイスがトラッキングしている各コントローラーと手のモデルを描画する | [コントローラー](/user-manual/xr/controllers/#controller-models) |
| `XrNavigation` | コントローラーと手で、カメラリグをテレポート、移動、回転させる | [ロコモーション](/user-manual/xr/locomotion/) |
| `XrManipulation` | ユーザーが両手でシーンをつかんで、移動、回転、拡大縮小できるようにする | [ロコモーション](/user-manual/xr/locomotion/#moving-the-world) |
| `XrMenu` | ユーザーの手のひらやコントローラーの上、またはユーザーの前にメニューを表示する | [XRのUI](/user-manual/user-interface/xr/#xr-menus) |

XRマネージャーとスクリプトは、エディター、エンジン直接、[PlayCanvas React](/user-manual/react/guide/xr/)、[Web Components](/user-manual/web-components/xr/)のどの方法で構築しても同じです。[はじめに](/user-manual/xr/using-webxr/)ではそれぞれの環境でXRをセットアップし、このセクションの残りのページでは、概念を一度説明した後、その適用方法を示します。

## 機能 {#features}

セッションで何ができるかは、デバイスとブラウザによって異なります。エンジンは一部の機能をすべてのセッションでリクエストし、それ以外の機能はセッションの開始時に指定した場合にリクエストします。`app.xr`の各部分が、セッションでその機能が得られたかどうかを示します。

| 機能 | 得られるもの | セッション | ページ |
| --- | --- | --- | --- |
| 入力ソース | コントローラー、手、視線、画面のタップと、それらのレイ、セレクト、スクイーズ | VR、AR | [入力ソース](/user-manual/xr/input-sources/) |
| コントローラー | コントローラーのポーズ、ボタン、サムスティック、ハプティクス、速度 | VR、AR | [コントローラー](/user-manual/xr/controllers/) |
| ハンドトラッキング | 片手あたり25個のジョイントのポーズ | VR、AR | [ハンドトラッキング](/user-manual/xr/hand-tracking/) |
| ヒットテスト | レイが現実世界の面と交わる位置 | AR | [ヒットテスト](/user-manual/xr/ar/hit-testing/) |
| アンカー | 現実世界に固定されたままの点。セッションをまたいで保持することもできる | AR | [アンカー](/user-manual/xr/ar/anchors/) |
| 平面検出 | 床、壁、テーブルなどの平らな面 | AR | [平面検出](/user-manual/xr/ar/plane-detection/) |
| メッシュ検出 | 部屋とその中にある物体の三角形メッシュ | AR | [メッシュ検出](/user-manual/xr/ar/mesh-detection/) |
| 深度センシング | 各ピクセルにおける現実世界までの距離 | AR | [深度センシング](/user-manual/xr/ar/depth-sensing/) |
| ライト推定 | 現実世界の光の方向、色、強さ | AR | [ライト推定](/user-manual/xr/ar/light-estimation/) |
| カメラアクセス | テクスチャとして得られる、デバイスのカメラの画像 | AR | [カメラアクセス](/user-manual/xr/ar/camera-color/) |
| 画像トラッキング | 現実世界にある印刷された画像のポーズ | AR | [画像トラッキング](/user-manual/xr/ar/image-tracking/) |
| DOMオーバーレイ | ハンドヘルドARに重ねるHTMLとCSS | AR | [DOMオーバーレイ](/user-manual/xr/ar/dom-overlay/) |

各デバイスとブラウザがサポートする機能の一覧は、[プラットフォーム](/user-manual/xr/platforms/)にあります。レイヤーなど、エンジンがラップしていないWebXRモジュールも、リクエストして直接使用できます。[セッション](/user-manual/xr/sessions/#other-webxr-features)を参照してください。

## このセクションの内容 {#in-this-section}

- [はじめに](/user-manual/xr/using-webxr/) - 動作要件、各環境でのXRのセットアップ、最初のVRシーン。
- [セッション](/user-manual/xr/sessions/) - セッションタイプ、参照空間、機能、カメラリグ、セッションの開始と終了。
- **入力**
  - [入力ソース](/user-manual/xr/input-sources/) - コントローラー、手、視線、タップのレイ、セレクト、スクイーズ。
  - [コントローラー](/user-manual/xr/controllers/) - コントローラーのモデル、ポーズ、ボタン、サムスティック、ハプティクス、速度。
  - [ハンドトラッキング](/user-manual/xr/hand-tracking/) - ジョイント、指、手のモデル、ジェスチャー。
  - [ポインティングとグラブ](/user-manual/xr/pointing-and-grabbing/) - オブジェクトのピッキング、つかむ操作と投げる操作、指で押す操作。
- [ロコモーション](/user-manual/xr/locomotion/) - テレポート、移動と回転、ワールドの移動、快適性。
- **AR**
  - [AR](/user-manual/xr/ar/) - ARセッションの開始、現実世界とカメラリグ、ハンドヘルドARとヘッドセットAR。
  - [ヒットテスト](/user-manual/xr/ar/hit-testing/) - レイに沿って現実世界の面を見つけ、そこにオブジェクトを配置する。
  - [アンカー](/user-manual/xr/ar/anchors/) - セッション内でもセッションをまたいでも、オブジェクトを現実世界の同じ場所に保つ。
  - [平面検出](/user-manual/xr/ar/plane-detection/) - 床、壁、テーブルなどの平らな面。
  - [メッシュ検出](/user-manual/xr/ar/mesh-detection/) - 部屋とその中にある物体のメッシュ。
  - [深度センシング](/user-manual/xr/ar/depth-sensing/) - 各ピクセルにおける現実世界の面までの距離。
  - [ライト推定](/user-manual/xr/ar/light-estimation/) - 仮想オブジェクトを周囲の部屋と同じようにライティングする。
  - [カメラアクセス](/user-manual/xr/ar/camera-color/) - デバイスのカメラの画像。
  - [画像トラッキング](/user-manual/xr/ar/image-tracking/) - 印刷された画像の追跡。
  - [DOMオーバーレイ](/user-manual/xr/ar/dom-overlay/) - ハンドヘルドARに重ねるHTMLのインターフェース。
  - [サードパーティのフレームワーク](/user-manual/xr/ar/third-party-frameworks/) - WebXRに対応していないブラウザでのAR。
- [パフォーマンス](/user-manual/xr/optimizing-webxr/) - 解像度、フォービエーション、フレームレート、レンダリングのコスト。
- [テストとデバッグ](/user-manual/xr/testing/) - エミュレーター、デバイスでの実行、リモートデバッグ。
- [プラットフォーム](/user-manual/xr/platforms/) - デバイスとブラウザ、それぞれがサポートする機能。
- [トラブルシューティング](/user-manual/xr/troubleshooting/) - よくある問題とその原因。

XRのインターフェースについては、ユーザーインターフェースのセクションの[XRのUI](/user-manual/user-interface/xr/)で扱っています。

## 関連情報 {#see-also}

- [XRのUI](/user-manual/user-interface/xr/) - パネル、ポインティングとセレクト、手、`XrMenu`スクリプト
- [PlayCanvas ReactでのXR](/user-manual/react/guide/xr/) - XRに関するReactのガイド
- [Web ComponentsのXRサポート](/user-manual/web-components/xr/) - XRに関するWeb Componentsのガイド
- [WebXR Hello World](/tutorials/webxr-hello-world/)、[WebXR VR Lab](/tutorials/webxr-vr-lab/)などのWebXRチュートリアル - 試しながら学べるエディターのプロジェクト
- [XrManager](https://api.playcanvas.com/engine/classes/XrManager.html) - `app.xr`のAPIリファレンス

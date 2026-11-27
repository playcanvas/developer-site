---
title: XR
description: "WebXRによるPlayCanvasのVRとARの概要: 没入型セッション、カメラリグ、ステレオビュー、XR入力の仕組み、エンジンのXRスクリプト、VRとARで利用可能な機能、このセクションの構成。"
---

XR（エクステンデッドリアリティ）は、仮想現実（VR）と拡張現実（AR）を包括する言葉です。VRではヘッドセットがユーザーの周囲の世界をシーンに置き換え、ARでは現実の世界の中にシーンが現れます。PlayCanvasアプリケーションは、没入型デバイス向けのWeb APIであるWebXRを通してXRで動作します。動作するのは、Meta QuestやApple Vision Proなどのヘッドセット、Androidスマートフォン、PC VRヘッドセットを接続したコンピューターのブラウザです。インストールは不要で、ユーザーはWebページを開いてボタンを選択するだけでXRを開始できます。

![VRヘッドセットの中の、左右の目それぞれに1枚ずつの画像。グリッドの床の上に色付きの図形があり、2つのコントローラーがそれらにレーザーのレイを向けている](/img/user-manual/xr/index/hero.webp)

XRの仕組みは、どの方法で構築しても同じです。エディター、エンジン直接、[PlayCanvas React](/user-manual/react/)、[Web Components](/user-manual/web-components/)のいずれでも変わりません。このセクションの各ページでは、概念を一度説明した後、環境によって違いがある箇所について、それぞれの環境での適用方法を示します。

## XRの仕組み {#how-xr-works}

XRアプリケーションは、最初はキャンバスに描画する普通のWebページです。その後、次のように動作します。

- **ユーザーがセッションを開始する。** ページ上のボタンがブラウザにVRまたはARの没入型セッションを要求し、デバイスが表示を引き継ぎます。ユーザーがセッションを終了すると、ページが再び表示されます。[セッション](/user-manual/xr/sessions/)を参照してください。
- **ヘッドセットがカメラを動かす。** エンジンは毎フレーム、セッションのカメラをユーザーの頭のポーズに合わせて移動します。このポーズは、カメラの親エンティティである**リグ**を基準にしたものです。ユーザーをシーン内で移動させるには、リグを動かします。[カメラとそのリグ](/user-manual/xr/sessions/#the-camera-and-its-rig)を参照してください。
- **シーンは目ごとに描画される。** ヘッドセットは、左右の目にそれぞれ別の画像を見せます。2つの画像は数センチメートル離れた位置から描画されるため、シーンに奥行きが生まれます。エンジンは1つのカメラから両方を描画します。ARのスマートフォンでは、ビューは1つだけです。
- **コントローラーと手は入力ソースになる。** それぞれが、シーンを指すレイと、トリガーを引く、ピンチするといったプライマリアクションを持ちます。[入力ソース](/user-manual/xr/input-sources/)を参照してください。
- **ARでは現実の世界が見える。** カメラは色ではなく透明でクリアされ、デバイスは自身が捉えた部屋の様子にシーンを重ねて合成します。ARセッションでは、部屋の中の面を見つけて、その上にコンテンツを配置することもできます。[AR](/user-manual/xr/ar/)を参照してください。

## 構成要素 {#building-blocks}

セッションの処理はエンジンのXRマネージャーが行い、エンジンに付属するスクリプト群が、その上にXRアプリケーションの一般的な動作を追加します。

| 構成要素 | 役割 |
| --- | --- |
| [`XrManager`](https://api.playcanvas.com/engine/classes/XrManager.html)（`app.xr`） | 利用可能なセッションタイプの確認、セッションの開始と終了、カメラの駆動を行い、入力とすべてのXR機能へのアクセスを提供します |
| [`CameraComponent#startXr`](https://api.playcanvas.com/engine/classes/CameraComponent.html#startxr)と`endXr` | カメラでセッションを開始、終了します |
| [`XrSession`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-session.mjs)スクリプト | アプリケーションイベントに応じてセッションを開始、終了し、セッションの開始時にリグを配置し、ARではカメラを透明にします。[セッション](/user-manual/xr/sessions/#with-the-xrsession-script)を参照してください |
| [`XrControllers`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-controllers.mjs)スクリプト | 各コントローラーと手のモデルを描画します。[はじめに](/user-manual/xr/using-webxr/#your-first-vr-scene)を参照してください |
| [`XrNavigation`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-navigation.mjs)スクリプト | テレポートとサムスティックでユーザーを移動させます |
| [`XrMenu`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-menu.mjs)スクリプト | ユーザーの手やコントローラーに表示するメニューです。[XRのUI](/user-manual/user-interface/xr/#xr-menus)を参照してください |
| [`XrManipulation`](https://github.com/playcanvas/engine/blob/main/scripts/esm/xr/xr-manipulation.mjs)スクリプト | ユーザーが両手でシーンをつかみ、移動、回転、拡大縮小できるようにします |

これらのスクリプトは、npmの`playcanvas`パッケージの`scripts/esm/xr/`と、エンジンの[GitHubリポジトリ](https://github.com/playcanvas/engine/tree/main/scripts/esm/xr)にあります。[はじめに](/user-manual/xr/using-webxr/)では、それぞれの環境でこれらのスクリプトをアプリケーションに追加します。

## 機能 {#features}

セッションで何ができるかは、デバイスとそのブラウザによって異なります。各機能は`app.xr`の一部で、それぞれに専用のページがあります。機能が利用可能かどうかはセッションの開始後に確認し、その機能がなくても続けられる手段をユーザーに用意してください。デバイスごとの機能については、[プラットフォーム](/user-manual/xr/platforms/)を参照してください。

| 機能 | VR | AR | 内容 |
| --- | --- | --- | --- |
| [入力ソース](/user-manual/xr/input-sources/) | ✅ | ✅ | コントローラー、手、視線、画面のタップと、それらのレイやボタン |
| [ハンドトラッキング](/user-manual/xr/hand-tracking/) | ✅ | ✅ | ユーザーの手の各ジョイントの位置 |
| [ヒットテスト](/user-manual/xr/ar/hit-testing/) | | ✅ | 現実の世界に向けてレイを投射し、その面にコンテンツを配置します |
| [アンカー](/user-manual/xr/ar/anchors/) | | ✅ | デバイスによる部屋の認識が向上しても、またセッションをまたいでも、コンテンツを現実の世界の同じ場所に保ちます |
| [平面検出](/user-manual/xr/ar/plane-detection/) | | ✅ | 部屋の床、壁、テーブルなどの平らな面 |
| [メッシュ検出](/user-manual/xr/ar/mesh-detection/) | | ✅ | メッシュで表した、部屋と家具の形状 |
| [深度センシング](/user-manual/xr/ar/depth-sensing/) | | ✅ | ピクセルごとの現実の世界までの距離。現実の物体の背後にコンテンツを隠すために使います |
| [ライト推定](/user-manual/xr/ar/light-estimation/) | | ✅ | 部屋の光の方向、色、強さ |
| [カメラアクセス](/user-manual/xr/ar/camera-color/) | | ✅ | テクスチャとして取得する、デバイスのカメラの画像 |
| [画像トラッキング](/user-manual/xr/ar/image-tracking/) | | ✅ | 用意した印刷画像の位置 |
| [DOMオーバーレイ](/user-manual/xr/ar/dom-overlay/) | | ✅ | スマートフォンのARの上に表示するHTML |

エンジンは、デバイスのフレームレートと固定フォービエーションへのアクセスも提供します。[パフォーマンス](/user-manual/xr/optimizing-webxr/)を参照してください。エンジンが対応していないWebXRの機能については、[WebXRの直接使用](/user-manual/xr/sessions/#using-webxr-directly)を参照してください。

## このセクションの内容 {#in-this-section}

- [はじめに](/user-manual/xr/using-webxr/) - 各環境でのXRのセットアップと、最初のVRシーン
- [セッション](/user-manual/xr/sessions/) - セッションタイプ、セッションの開始と終了、機能、参照空間、カメラリグ
- [入力ソース](/user-manual/xr/input-sources/) - コントローラー、手、視線、画面のタップ
- [ハンドトラッキング](/user-manual/xr/hand-tracking/) - ユーザーの手のジョイント
- [AR](/user-manual/xr/ar/) - ヒットテスト、アンカー、平面検出、メッシュ検出、深度センシングなど
- [パフォーマンス](/user-manual/xr/optimizing-webxr/) - 解像度、フレームレート、フォービエーション、各フレームを時間内に収める方法
- [テストとデバッグ](/user-manual/xr/testing/) - デスクトップブラウザでのヘッドセットのエミュレートと、デバイスでのテスト
- [プラットフォーム](/user-manual/xr/platforms/) - デバイスとブラウザ、それぞれの機能
- [トラブルシューティング](/user-manual/xr/troubleshooting/) - よくある問題とその原因

## 関連情報 {#see-also}

- [WebXR Hello World](/tutorials/webxr-hello-world/)とその他の[WebXRチュートリアル](/tutorials/?q=webxr) - エディターでXRアプリケーションを構築するチュートリアル
- [XRのUI](/user-manual/user-interface/xr/) - 没入型セッションでのパネル、ポインティング、メニュー
- [XRのサポート](/user-manual/web-components/xr/)と[PlayCanvas ReactでのXR](/user-manual/react/guide/xr/) - Web ComponentsとReactでのXR
- [XRのサンプル](https://playcanvas.com/examples/#/xr/vr-basic) - エンジンのXRサンプル

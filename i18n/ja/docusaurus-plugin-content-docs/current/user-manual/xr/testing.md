---
title: テストとデバッグ
description: "Immersive Web Emulator拡張機能やページ内のIWERランタイムを使ってヘッドセットなしでPlayCanvasのXRアプリケーションをテストし、HTTPSでヘッドセットやスマートフォンに配信し、リモートでデバッグし、実際のデバイスで確認すべき点を把握します。"
---

XRアプリケーションの大部分は、ヘッドセットなしで構築してテストできます。エミュレーターがデスクトップブラウザでデバイスの代わりを務めるため、セッションに入る、頭やコントローラーを動かす、ボタンを押す、仮想の部屋でARを試す、といったことができます。実際のデバイスでもテストしてください。快適性、読みやすさ、パフォーマンス、そしてそのデバイス固有の入力は、実機でしか確認できないためです。

## ヘッドセットなしでのテスト {#without-a-headset}

### Immersive Web Emulator {#the-immersive-web-emulator}

[Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik)は、Metaが提供するChromeとEdge向けのブラウザ拡張機能です。ブラウザのWebXRをエミュレートされたヘッドセットに置き換えるため、どのページでもVRやARに入れます。また、ページの上にヘッドセットを操作するコントロールを表示します。拡張機能をインストールしてアプリケーションを開き、アプリケーションのVRまたはARに入るボタンを選択してください。

エミュレートできるのは次のものです。

- **ヘッドセット。** マウスとキーボードで移動や回転ができ、Meta Quest 3など、エミュレートするデバイスを選べます。
- **コントローラー。** コントローラーを動かし、トリガー、グリップ、ボタン、サムスティックを押せます。
- **手。** コントローラーからトラッキングされた手に切り替えて、ピンチできます。
- **AR。** エミュレートされたデバイスに見せる部屋を選びます。これにより、ARセッションでその部屋に対して[ヒットテスト](/user-manual/xr/ar/hit-testing/)、[アンカー](/user-manual/xr/ar/anchors/)、[平面検出](/user-manual/xr/ar/plane-detection/)、[メッシュ検出](/user-manual/xr/ar/mesh-detection/)を使えるようになります。

ライト推定、カメラアクセス、画像トラッキング、DOMオーバーレイはエミュレートされません。ヘッドセットをコンピューターに接続している場合など、ブラウザ本来のWebXRを使いたいページでは、拡張機能をオフにしてください。

古い**WebXR API Emulator**拡張機能は使わないでください。メンテナンスされておらず、PlayCanvasとの互換性もありません。

### ページ内のエミュレーター {#the-emulator-in-your-page}

この拡張機能は[Immersive Web Emulation Runtime](https://github.com/meta-quest/immersive-web-emulation-runtime)（IWER）を基に作られており、IWERはnpmでも公開されています。アプリケーションの開発ビルドに追加すると、拡張機能なしで、どのブラウザでもヘッドセットをエミュレートできます。ヘッドレスブラウザで自動テストからXRに入るときにも、この方法を使います。

![デスクトップブラウザに表示したVRシーンと、その上に重ねたエミュレーターのコントロール。エミュレートされたコントローラー用のボタンとスライダーのパネルと、ヘッドセットから見たシーンが表示されている](/img/user-manual/xr/testing/iwer-devui.webp)

`iwer`と、上の図のコントロールを描画する`@iwer/devui`をインストールします。そして、エンジンをインポートする**前に**ランタイムを開始してください。エンジンは読み込み時にWebXRのクラスを探すためです。

```javascript
import { XRDevice, XRMesh, metaQuest3 } from 'iwer';
import { DevUI } from '@iwer/devui';

// ブラウザのWebXRをエミュレートされたMeta Quest 3に置き換え、そのコントロールを表示する
const xrDevice = new XRDevice(metaQuest3);
xrDevice.installRuntime({ forceInstall: true });
xrDevice.installDevUI(DevUI);

// エンジンはこのクラスでメッシュ検出の有無を判定するが、ランタイムはこのクラスをインストールしない
window.XRMesh ??= XRMesh;

// その後でエンジンをインポートし、通常どおりアプリケーションを作成する
const pc = await import('playcanvas');
```

`forceInstall`を指定すると、ブラウザ自身のWebXRがある場合はそれを置き換えます。指定しない場合、ランタイムはWebXRのないブラウザにだけインストールされます。

ARでは、`@iwer/sem`からランタイムのSynthetic Environment Moduleを追加し、その部屋の1つを読み込みます。

```javascript
import { SyntheticEnvironmentModule } from '@iwer/sem';

xrDevice.installSEM(SyntheticEnvironmentModule);
await xrDevice.sem.loadDefaultEnvironment('sunlit_living_room');
```

`xrDevice.sem.environments`で部屋の一覧を取得できます。エミュレートされたデバイスをコードから操作することもできます。`xrDevice.position`と`xrDevice.quaternion`を設定すると頭が動き、`xrDevice.controllers`にあるコントローラーを使うとボタンを押せます。[IWERのドキュメント](https://meta-quest.github.io/immersive-web-emulation-runtime/)を参照してください。

## デバイスでのテスト {#testing-on-a-device}

ヘッドセットやスマートフォンはネットワーク経由でアプリケーションを読み込みますが、WebXRを提供するのはセキュアコンテキストのページに対してだけです。`http://192.168.1.20:5173`のようなアドレスで動作する、コンピューター上の開発サーバーはセキュアコンテキストではありません。これを回避する一般的な方法は次のとおりです。

- **USBでポートフォワーディングする。** Meta QuestヘッドセットやAndroid XRヘッドセット、AndroidスマートフォンはAndroidで動作しているため、`adb`を使うと、コンピューターのポートをデバイス上の`localhost`として見せることができます。デバイスで開発者モードをオンにしてUSBケーブルで接続し、`adb reverse tcp:5173 tcp:5173`を実行します。その後、デバイスのブラウザで`http://localhost:5173`を開きます。
- **HTTPSで配信する。** デバイスが信頼する証明書を持つ開発サーバーを使うか、サーバーに公開のHTTPSアドレスを割り当てるトンネリングサービスを使います。
- **デプロイする。** 任意のHTTPSホストにビルドをアップロードします。[公開](/user-manual/publishing/)を参照してください。

エディターでは、[起動ページ](/user-manual/editor/interface/launch-page/#running-on-other-devices)がすでにHTTPSで配信されています。デバイスのブラウザでPlayCanvasアカウントにサインインし、そこで起動ページのURLを開いてください。PlayCanvasのホスティングで公開したビルドもHTTPSで配信されます。

### リモートデバッグ {#remote-debugging}

セッションの実行中、デバイスのディスプレイにはブラウザの開発者ツールではなくシーンが表示されます。コンソールを確認したり、ブレークポイントを設定したり、プロファイルを取ったりするには、コンピューターのブラウザをデバイスのブラウザに接続します。

| デバイス | 方法 |
| --- | --- |
| Meta Quest、Android XRヘッドセット、Androidスマートフォン | 開発者モードをオンにし、デバイスをUSBで接続します。コンピューターのChromeで`chrome://inspect`を開き、デバイスのタブの下にある**inspect**を選択します |
| Apple Vision Pro | Vision ProのSafariの設定で**Web Inspector**をオンにし、Macとペアリングします。その後、MacのSafariの**Develop**メニューから開きます |

セッションにどの機能が与えられたかを確認するには、セッションの開始後に`app.xr.session.enabledFeatures`をログに出力します。

## デバイスでテストすべきこと {#what-to-test-on-a-device}

エミュレーターはコードを実行できますが、アプリケーションの使い心地まではわかりません。サポートする各デバイスで、次の点を確認してください。

- **フレームレート。** ヘッドセットでは、リフレッシュレートに合わせて安定してフレームを出し続ける必要がありますが、デスクトップコンピューター上のエミュレーターではこれを確認できません。[パフォーマンス](/user-manual/xr/optimizing-webxr/)を参照してください。
- **快適性。** 移動や旋回など、頭を動かしていないのにユーザーの視界が動くものは、気分が悪くなる原因になります。XRに慣れていない人に試してもらってください。
- **スケールと読みやすさ。** オブジェクトが意図したサイズになっているか、配置した距離でテキストが読めるかを確認します。
- **入力。** デバイスにはそれぞれ独自のコントローラーがあるか、コントローラーがまったくありません。Meta Questにはコントローラーと手、Apple Vision Proには手と目、スマートフォンにはタッチスクリーンがあります。[入力ソース](/user-manual/xr/input-sources/)を参照してください。
- **離脱と復帰。** デバイスのシステムメニューを開く、ヘッドセットを外してからもう一度装着する、デバイス自身のコントロールからセッションを終了する、といった操作を試します。[表示状態](/user-manual/xr/sessions/#visibility)と[セッションの終了](/user-manual/xr/sessions/#ending-a-session)を参照してください。
- **権限。** ブラウザは、XR、カメラ、部屋のレイアウトを使用する許可をユーザーに求めることがあります。ユーザーが拒否した場合にアプリケーションがどう動作するかを確認してください。

## 関連情報 {#see-also}

- [はじめに](/user-manual/xr/using-webxr/) - エミュレーターで試せる最初のVRシーン
- [トラブルシューティング](/user-manual/xr/troubleshooting/) - よくある問題とその原因
- [プラットフォーム](/user-manual/xr/platforms/) - デバイスとブラウザ、それぞれの機能
- [デバッグ](/user-manual/debugging/) - XRアプリケーションでも使える、エンジンのデバッグツール

---
title: XR
---

![VRビュー](/img/user-manual/xr/vr-view.png)

PlayCanvasでは、新しいWebXR APIに基づき、および外部統合を通じて、さまざまなデバイス向けの[AR](/user-manual/xr/ar/)（拡張現実）および[VR](/user-manual/xr/vr/)（仮想現実）アプリケーションを作成できます。

## 機能

拡張機能を通じてWebXRは常に成長しており、さまざまなプラットフォームで新しいWebXRモジュールや既存のWebXRモジュールの実装が継続的に行われています。PlayCanvas Engineは統合の形でこれらのモジュールへのアクセスを提供するため、それらを扱いやすく、PlayCanvasのシステムとうまく連携します。

[現在サポートされているモジュールの一覧](/user-manual/xr/capabilities/)を確認できます。

## プラットフォーム

WebXRは新しいAPIであり、すべての主要なプラットフォームに徐々に展開されています。最新のサポート状況は[caniuse.com](https://caniuse.com/webxr)で確認できます。

さらに、[WebXR Polyfill](https://github.com/immersive-web/webxr-polyfill)を使用することでサポートを実現できます。

**モバイル**では、WebXRはAndroidでVRおよびARセッションタイプに対応しています。

**HMD**では、Meta QuestなどのデバイスでWebXRはVRおよびARセッションタイプに十分対応しています。Apple Vision Proは、Safariの設定で有効にすると、現在VRセッションタイプをサポートしています。

**デスクトップ**では、WebXRは現在ChromeとEdgeで動作し、デバイスはSteamVR、OpenXRなど、さまざまなネイティブAPIを介してリンクされます。これにより、デスクトップベースのVRデバイスの大部分がカバーされ、Meta QuestなどのデバイスをSteam Link経由で使用できるようになります。

## XRデバイスなしでWebXRをテストする

WebXRでの開発を開始するためにXRハードウェアは必要ありません。WebXR APIをエミュレートする[Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) Chrome拡張機能をインストールできます。これにより、ブラウザのDev Toolsを介してさまざまなヘッドマウントディスプレイとコントローラーをシミュレートできます。

:::danger

[WebXR API Emulator](https://chromewebstore.google.com/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje) Chrome拡張機能を使用しないでください。これはPlayCanvasと互換性がありません。これがアクティブな場合、PlayCanvasアプリケーションは例外をスローします。

:::

## WebXRの開始

XRセッションを開始するには、まずサポートと利用可能性を確認する必要があります。その後、ユーザーの操作に応じてセッションを開始できます。

```javascript
button.element.on('click', () => {
    // XRがサポートされ、VRが利用可能か確認します
    if (app.xr.supported && app.xr.isAvailable(pc.XRTYPE_VR)) {
        // カメラコンポーネントを提供してVRセッションを開始します
        app.xr.start(entity.camera, pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR);
    }
});
```

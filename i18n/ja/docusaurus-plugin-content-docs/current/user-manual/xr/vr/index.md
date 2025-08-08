---
title: VR
---

![VRビュー](/img/user-manual/xr/vr-view.png)

PlayCanvasもバーチャルリアリティ (VR) アプリケーションを作成できます。

## プラットフォーム

VR機能は様々なプラットフォームで利用可能です：デスクトップ (Chrome, Edge)、モバイル (Chrome, Samsung)、HMD (Apple Vision Pro, Meta, Magic Leap, Pico)。

:::warning

Apple Vision ProのWebKitの問題により、現在、プロジェクトのScene Settingsで`Anti-Alias`を無効にする必要があります。

:::

## WebXR VRの開始

VRセッションを開始するには、まずデバイスのサポートと利用可能性を確認する必要があります。その後、ボタンのクリックやその他の入力など、ユーザーのインタラクションによってVRセッションを開始できます：

```javascript
button.element.on('click', () => {
    // XRがサポートされ、VRが利用可能かを確認
    if (app.xr.supported && app.xr.isAvailable(pc.XRTYPE_VR)) {
        // カメラコンポーネントを使用してARを開始
        entity.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR);
    }
});
```

ユーザーが終了したら、次の呼び出しによってVRモードを終了できます：

```javascript
app.xr.end();
```

## スターターキット

PlayCanvasは、VRエクスペリエンスをより迅速に立ち上げるのに役立つ「VR Kit」プロジェクトを提供しています。新しいプロジェクトを作成する際、New Project dialogから「VR Kit」を選択するだけです。

---
title: VR
description: "PlayCanvasでのWebXRバーチャルリアリティ: 対応プラットフォーム、プロジェクト設定、VRセッションの開始、VR固有トピックへのリンクです。"
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「VR」について、次の要件を満たしてください: PlayCanvasでのWebXRバーチャルリアリティ: 対応プラットフォーム、プロジェクト設定、VRセッションの開始、VR固有トピックへのリンクであること 対応する XR セッションで実行し、記載された操作を試して、ランタイムログと観察結果を報告してください。

:::

![VRビュー](/img/user-manual/xr/vr-view.png)

PlayCanvasもバーチャルリアリティ (VR) アプリケーションを作成できます。

## プラットフォーム

VR機能は様々なプラットフォームで利用可能です：デスクトップ (Chrome, Edge)、モバイル (Chrome, Samsung)、HMD (Apple Vision Pro, Meta, Magic Leap, Pico)。

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

---
title: PlayCanvas で WebXR を使用する
---

## サポート

WebXR のブラウザサポートは（まだ）普遍的ではありません。以下のように確認できます：

```javascript
if (app.xr.supported) {
    // WebXR はサポートされています
}
```

## XR セッションの開始

XRセッションを開始するには、Camera Component のメソッド、またはアプリケーションの [XrManager](https://api.playcanvas.com/engine/classes/XrManager.html) を使用できます。XRセッションを開始するには、CameraComponent を指定し、XRセッションのタイプ、参照空間、および追加の引数を持つオプションのオブジェクトを提供する必要があります：

```javascript
app.xr.start(entity.camera, pc.XRTYPE_VR, pc.XRSPACE_LOCALFLOOR);
```

これは非同期操作であり、ボタンクリック、マウスクリック、タッチなどのユーザー操作でのみ開始できます：

```javascript
button.on('click', () => {
    // XRセッションを開始
});
```

セッションが開始されたことを知るには、`start` イベントを購読できます：

```javascript
app.xr.on('start', () => {
    // XRセッションが開始されました
});
```

セッションのタイプまたは参照空間は、特定のプラットフォームで利用できない場合があります。その場合、セッションの開始に失敗し、コールバックでエラーを提供し、XrManager で `error` イベントが発生します：

```javascript
entity.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_UNBOUNDED, {
    callback: (err) => {
        if (err) {
            // セッションの開始に失敗しました
        }
    }
});
```

## XR セッションの終了

XRの終了はさまざまな方法でトリガーできます。コードからXRの終了をトリガーできます：

```javascript
app.xr.end();
```

また、ユーザーはブラウザの戻るボタンのような外部プロセスを介してXRを終了する場合があります。[XrManager](https://api.playcanvas.com/engine/classes/XrManager.html) はセッションの `end` に関連するイベントを発火します：

```javascript
app.xr.on('end', () => {
    // XRセッションが終了しました
});
```

## セッションタイプ

各プラットフォームは、異なる種類のセッションをサポートできます。これらは次のとおりです：

- **VR** (Virtual Reality) - ある程度のビューアトラッキングを提供し、XR Device への排他的なアクセスを提供します。これは、アプリケーションが HTML canvas element ではなく、デバイスのフレームバッファにレンダリングされることを意味します。
- **AR** (Augmented Reality) - このタイプのセッションは XR Device への排他的なアクセスを提供し、コンテンツは現実世界にブレンドされることを意図しています。このモードでは、カメラのクリアカラーは透明である必要があります。

セッションタイプの可用性は、デバイスが接続されたり、デバイスの機能が有効になったりすることに基づいて、アプリケーションのライフタイム中に変化する可能性があります。セッションタイプが利用可能かどうかを確認するには、次のようにします：

```javascript
if (app.xr.isAvailable(pc.XRTYPE_VR)) {
    // VRは利用可能です
}
```

可用性変更イベントも購読できます：

```javascript
app.xr.on('available', (type, available) => {
    console.log('XR session', type, 'type is now', available ? 'available' : 'unavailable');
});

// または特定のセッションタイプ
app.xr.on('available:' + pc.XRTYPE_VR, (available) => {
    console.log('XR session VR type is now', available ? 'available' : 'unavailable');
});
```

## カメラの位置と向き

XRでプレゼンテーションを行う場合、カメラの位置と向きはXRセッションからのデータによって上書きされます。カメラにさらなる移動と回転を実装したい場合は、カメラの親エンティティを追加し、そのエンティティに操作を適用する必要があります。

![Camera Offset](/img/user-manual/xr/using-webxr/camera-offset.jpg)

異なるXRオブジェクト（入力ソース、トラッキングされたメッシュ、トラッキングされた平面、トラッキングされた画像など）の位置、向き、およびレイは、ワールド空間で提供されます。

## なぜ XR モードを自動的に有効にできないのですか？

WebXR への進入は、ブラウザによって*ユーザーアクション*によってトリガーされる必要があります。つまり、キー入力、マウスクリック、またはタッチイベントに応答する必要があります。そのため、ページを読み込むとすぐにXRに入る方法はありません。

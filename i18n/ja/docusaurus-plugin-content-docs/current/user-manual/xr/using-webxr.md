---
title: PlayCanvasでのWebXRの使用方法
sidebar_position: 1
---

## Checking for WebXR Support

WebXRのブラウザサポートはまだ全面的には実現されていません。以下のようにして確認できます。

```javascript
if (app.xr.supported) {
    //WebXRはサポートされています
}
```

## Starting an XR Session

The API for entering XR is on the Camera Component or [XrManager][2] on the Application. To start an XR session you should use the `startXr` method on a CameraComponent and provide the type of XR session, reference space, and optional object with additional arguments:

```javascript
entity.camera.startXr(pc.XRTYPE_VR、pc.XRSPACE_LOCALFLOOR);
```

It is an asynchronous operation and is only possible to start on a user interaction, such as a button click, mouse click, or touch. To know when a session is started, you can subscribe to the `start` event:

```javascript
app.xr.on('start', function () {
    // XRセッションが開始されました
});
```

セッションタイプや参照スペースが特定のプラットフォームで利用できない場合、セッションを開始できず、コールバックでエラーが提供され、XrManagerで`error` イベントが発生します。

```javascript
entity.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_UNBOUNDED, {
    callback: function(err) {
        if (err) {
            //セッション開始に失敗しました。
        }
    }
});
```

## Ending an XR Session

XRの終了はさまざまな方法でトリガーできます。コードからXRを終了することができます。

```javascript
app.xr.end();
```

Also, the user might exit XR via some external process like the back button in the browser. [XrManager][2] will fire events associated with the session `end`:

```javascript
app.xr.on('end', function () {
    // XRセッションが終了しました。
});
```

## XRの種類

それぞれのプラットフォームで、異なる種類のセッションがサポートされています。これらは以下の通りです。

 * **VR**(仮想現実)-一定レベルのビューアートラッキングを提供し、XRデバイスに独占アクセスを提供します。これは、アプリケーションがデバイスのフレームバッファにレンダリングされ、HTMLキャンバス要素にはレンダリングされないことを意味します。
 * **AR** (Augmented Reality) - This type of session provides exclusive access to the XR Device and content is meant to be blended with the real-world environment. In this mode, the camera's clear color should be transparent.

The availability of a session type can change during an application's lifetime, based on devices being plugged in or features on devices being enabled. To check if a session type is available do:

```javascript
if (app.xr.isAvailable(pc.XRTYPE_VR)) {
    // VRは利用可能です
}
```

You can subscribe to availability change events too:

```javascript
app.xr.on('available', function (type, available) {
    console.log('XR session', type, 'type is now', available ? 'available' : 'unavailable');
});

//または特定のセッションタイプ
app.xr.on('available:' + pc.XRTYPE_VR, function (available) {
    console.log('XR session VR type is now', available ? 'available' : 'unavailable');
});
```

## XR中のカメラの位置と向き

When you are presenting in XR, the position and orientation of the camera are overwritten by data from the XR session. If you want to implement additional movement and rotation of the camera, you should add a parent entity to your camera and apply your manipulations to that entity.

![Camera Offset][1]

Position, orientation and rays of different XR objects: input sources, tracked meshes, tracked planes, tracked images, and others, are provided in world space.

## なぜ自動的にXRモードを有効にできないのですか?

Entering WebXR is required by browsers to be triggered by a *user action*. That means that it must be in response to a key press, a mouse click or a touch event. For that reason, there is no way to enter XR immediately on loading a page.

## Experimental Features

The WebXR API is constantly evolving and additional APIs get released extending the XR feature set. While the engine is constantly updated with integrations for XR APIs, some of the features might come with delay. For developers willing to experiment with new features, it is possible to enable them by passing relevant `optionalFeatures` flags. 

:::warning

Accessing internal, undocumented APIs is subject to engine changes that are not guaranteed to be backwards compatible.

:::

Here is an example of enabling the experimental API for [WebXR Layers][3]:

```javascript
app.xr.start(cameraComponent, pc.XRTYPE_VR, pc.XRSPACE_LOCAL, {
    optionalFeatures: [ 'layers' ],
    callback: function(err) {
        if (err) {
            console.log(err);
            return;
        }

        if (app.xr.session.renderState.layers) {
            // get access to WebXR Layers
        }
    }
});
```

[1]: /images/user-manual/xr/using-webxr/camera-offset.jpg
[2]: https://api.playcanvas.com/classes/Engine.XrManager.html
[3]: https://immersive-web.github.io/layers/

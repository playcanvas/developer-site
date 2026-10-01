---
title: カメラアクセス
description: "PlayCanvasのARカメラアクセス: ARセッションでのカメラ画像のリクエスト、セッションがカメラ画像を利用できるかどうかの確認、各ビューのカラーテクスチャ、マテリアルやエフェクトでのカメラ画像の使用。"
---

カメラアクセスを使うと、デバイスのカメラが捉えた画像を、テクスチャとして毎フレームアプリケーションで受け取れます。仮想オブジェクトに映り込む部屋の反射、背後の景色を屈折させるガラス、画像処理など、現実世界に作用するエフェクトに使えます。

<EngineExample id="xr/ar-camera-color" title="AR Camera Color" />

## カメラアクセスのリクエスト {#requesting-camera-access}

カメラアクセスは、ARセッションを開始するときにリクエストします。ブラウザは、カメラを使用する許可をユーザーに求めます。

```javascript
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    cameraColor: true
});
```

ブラウザがエンジンのグラフィックスデバイスに画像を渡せる場合は`app.xr.views.supportedColor`が`true`になり、セッションがカメラアクセスを得ると`app.xr.views.availableColor`が`true`になります。カメラアクセスを提供しているのは主にスマートフォンです。Meta Quest Browserはカメラアクセスをサポートしていません。ただし、ページは[`getUserMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)でヘッドセットのカメラを通常の動画として読み取れます。この動画はビューと位置が揃っていません。

## カメラテクスチャ {#the-camera-texture}

セッションのビューは、セッションの開始時ではなく、最初の数フレームの間に現れます。各ビューの`textureColor`はそのビューのカメラ画像で、毎フレーム更新されます。カメラアクセスがない場合は`null`です。スマートフォンでは、ビューは1つです。

```javascript
app.xr.views.on('add', (view) => {
    if (!view.textureColor) return;

    // カメラ画像をマテリアルに表示する
    material.emissiveMap = view.textureColor;
    material.update();
});
```

テクスチャはカメラ画像と同じサイズのRGB画像で、ビューと位置が一致しています。つまり、テクスチャ上のある点のピクセルは、ビューの同じ点にカメラが捉えているものです。エンジンはセッションの終了時にビューのテクスチャを破棄するため、そのときに使用をやめてください。

```javascript
app.xr.on('end', () => {
    material.emissiveMap = null;
    material.update();
});
```

カメラ画像のコピーには毎フレーム時間がかかるため、カメラアクセスは使うときだけリクエストしてください。

## 関連情報 {#see-also}

- [深度センシング](/user-manual/xr/ar/depth-sensing/) - 各ピクセルにおける現実世界までの距離
- [AR](/user-manual/xr/ar/) - ARセッションの開始と機能のリクエスト
- [XrView](https://api.playcanvas.com/engine/classes/XrView.html) - ビューのAPIリファレンス

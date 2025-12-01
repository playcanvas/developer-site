---
title: カメラの色
---

ARでは、レンダリングされた画像は、パススルーデバイスタイプで再構築されたカメラテクスチャの上に投影されます。このテクスチャはアプリケーションからアクセスできます。

カメラの色へのアクセスを要求するには、セッションを以下の追加フラグ付きで開始する必要があります。

```javascript
app.xr.start(camera, pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    cameraColor: true
});
```

## サポート

システムがカメラの色をサポートしているかどうかを確認できます。

```javascript
if (app.xr.views.supportedColor) {
    // カメラの色へのアクセスがサポートされています
}

app.xr.on('start', () => {
    if (app.xr.views.availableColor) {
        // カメラの色テクスチャが利用可能です
    }
});
```

## テクスチャ

WebXRは、単眼デバイスと立体視デバイスの両方で動作します。これは、画面（単眼デバイス）または目（立体視デバイス）のいずれかを表すViewsのリストがあることを意味します。

Viewsはセッション開始時には利用できず、セッションの有効期間中に作成/削除される可能性があることに留意してください。

単眼デバイスの場合、そのビューとテクスチャにアクセスできます。

```javascript
app.xr.on('start', () => {
    app.xr.views.on('add', (view) => {
        if (view.eye === pc.XREYE_NONE) { // 単眼ビュー
            if (view.textureColor) {
                // カメラの色テクスチャが利用可能です
            }
        }
    });
});
```

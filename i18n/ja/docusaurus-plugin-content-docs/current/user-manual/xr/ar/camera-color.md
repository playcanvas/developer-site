---
title: カメラの色
description: PlayCanvasでARカメラのカラーテクスチャにアクセスし、パススルー合成、セッションオプション、実行時のサポート確認を行います。
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** 「カメラの色」について、次の要件を満たしてください: PlayCanvasでARカメラのカラーテクスチャにアクセスし、パススルー合成、セッションオプション、実行時のサポート確認を行います 対応する XR セッションで実行し、記載された操作を試して、ランタイムログと観察結果を報告してください。

:::

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

---
title: DOM Overlay
---

ARセッションでモノスクリーンディスプレイを使用する場合、UIには通常のHTMLとCSSを使用できます。このAPIは、ARアプリケーション画面上にDOM要素をオーバーレイする機能を提供します。

ARセッションを開始する前に、DOM Overlayのルートとして要素を提供する必要があります。

```javascript
app.xr.domOverlay.root = element;
app.xr.start(camera, pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR);
```

## サポート

DOM Overlayがサポートされているかどうかを確認できます。

```javascript
if (app.xr.domOverlay.supported) {
    // DOM Overlayはサポートされています
}

app.xr.on('start', () => {
    if (app.xr.domOverlay.available) {
        // DOM Overlayは利用可能です
    }
});
```

## イベント

通常のHTMLと同じように要素を操作できます。しかし、`input source`の`select`イベントはアプリケーション内で引き続き発生します。`input source`イベントがDOM要素を通過するのを防ぐには、それらをインターセプトできます。

```javascript
const buttons = app.xr.domOverlay.querySelectorAll('button');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('beforexrselect', (evt) => {
        evt.preventDefault();
    });
}
```

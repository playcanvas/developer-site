---
title: 画像トラッキング
description: "PlayCanvasのARでの画像トラッキングについて、セッション前に参照画像と現実世界での幅を指定する方法、トラッキングできる画像の確認、トラッキングされた画像のポーズへの追従、トラッキングを失ったときの対処、トラッキングしやすい画像の選び方を解説します。"
---

画像トラッキングは、ポスター、製品のパッケージ、カードなど、現実世界にある印刷された画像を追跡し、それぞれの位置と回転を提供します。画像にコンテンツを付けて、命を吹き込みましょう。

画像トラッキングは、実験的なWebXRモジュールです。Android版Chromeが実装していますが、`chrome://flags/#webxr-incubations`フラグを有効にする必要があります。そのため、一般公開するアプリケーションよりも、デバイスを自分で管理できるプロトタイプや展示に向いています。

## 画像の追加 {#adding-images}

トラッキングする画像は、それぞれの現実世界での幅（メートル単位）とともに、セッションの開始前に追加します。画像には、ブラウザがデコードできるあらゆる画像を、`HTMLImageElement`、`ImageBitmap`、キャンバス、`Blob`のいずれかとして渡せます。

```javascript
const image = new Image();
image.src = 'poster.jpg';
await image.decode();

// 幅40 cmのポスター
const poster = app.xr.imageTracking.add(image, 0.4);
```

`add()`は[`XrTrackedImage`](https://api.playcanvas.com/engine/classes/XrTrackedImage.html)を返します。ブラウザが画像トラッキングをサポートしていない場合や、セッションの実行中は`null`を返します。`app.xr.imageTracking.remove()`は画像を削除しますが、これもセッションとセッションの間にしか使えません。続いて、ARセッションの開始時に画像トラッキングを要求します。

```javascript
camera.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR, {
    imageTracking: true
});
```

## トラッキング可能な画像 {#trackable-images}

セッションが開始されると、デバイスは各画像を調べます。それが済むと`app.xr.imageTracking.available`が`true`になり、各画像の`trackable`プロパティが、デバイスがその画像をトラッキングできるかどうかを示します。画像が小さすぎる、特徴が少なすぎる、均一すぎるといった場合は、トラッキングできないことがあります。デバイスが画像をまったく処理できない場合、`app.xr.imageTracking`は`error`を発火します。

```javascript
app.xr.imageTracking.on('error', (err) => {
    console.warn(`Image tracking failed: ${err.message}`);
});
```

次の条件を満たす画像は、最もよくトラッキングされます。

- 300 × 300ピクセル以上であること。それより大きな画像でもトラッキングは向上せず、読み込みに時間がかかるだけです。
- 細部とコントラストが豊富で、大きな無地の部分や繰り返しパターンがないこと。
- 印刷された画像とよく一致していること。色は関係ないため、読み込みの速いグレースケールの画像を使えます。
- 正しい幅が指定されていること。デバイスは、この幅を使って画像までの距離を割り出します。

## 画像への追従 {#following-images}

画像は、デバイスがトラッキングを開始すると`tracked`を、停止すると`untracked`を発火し、その間は`tracking`が`true`になります。画像の`getPosition()`と`getRotation()`は、[トラッキング空間](/user-manual/xr/ar/#the-real-world-and-the-rig)における画像の中心のポーズを返します。トラッキングされている間は、毎フレームそれに追従させます。

```javascript
// ポスターの上に立つモデル。カメラリグの子にする
const model = new pc.Entity('model');
model.addComponent('render', { type: 'box' });
model.setLocalScale(0.1, 0.1, 0.1);
model.enabled = false;
rig.addChild(model);

poster.on('tracked', () => {
    model.enabled = true;
});
poster.on('untracked', () => {
    model.enabled = false;
});

app.on('update', () => {
    if (poster.tracking) {
        model.setLocalPosition(poster.getPosition());
        model.setLocalRotation(poster.getRotation());
    }
});
```

カメラが画像を捉えられない間も、デバイスは画像が動いていないと仮定して、最後に見えた位置で画像を報告し続けることがあります。このとき、画像の`emulated`プロパティは`true`です。ポスターのように固定された画像なら、エミュレートされた画像の上にコンテンツを残し、カードのように動かせる画像なら、コンテンツを非表示にしてください。

## 関連情報 {#see-also}

- [AR](/user-manual/xr/ar/) - ARセッションの開始と、カメラリグを基準にしたコンテンツの配置
- [WebXR: AR Image Tracking](/tutorials/webxr-ar-image-tracking/) - エディターのプロジェクト付きのチュートリアル
- [XrImageTracking](https://api.playcanvas.com/engine/classes/XrImageTracking.html) - `app.xr.imageTracking`のAPIリファレンス

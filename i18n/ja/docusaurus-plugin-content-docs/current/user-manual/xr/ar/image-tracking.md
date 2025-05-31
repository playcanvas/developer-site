---
title: 画像トラッキング
sidebar_position: 1
---

画像トラッキングは、提供された画像サンプルとその推定サイズを使用して、現実世界の画像を追跡する機能を提供します。基盤となるCVシステムは、画像の正確な位置と向き、および追跡ステータスを推定します。

## サポート

システムが画像トラッキングをサポートしているかを確認できます。

```javascript
if (app.xr.imageTracking.supported) {
    // 画像トラッキングはサポートされています
}

app.xr.on('start', () => {
    if (app.xr.imageTracking.available) {
        // 画像トラッキングはサポートされており、利用可能です
        // 画像が提供されなかった場合、まだfalseになる可能性があります
    }
});
```

## 画像

画像は、**セッションが開始する前に**、現実世界での幅（メートル単位）と共に提供されます。画像は、あらゆるウェブフレンドリーな形式で提供でき、現実世界の画像と可能な限り一致させる必要があります。

**解像度**は300x300ピクセル以上であるべきです。高解像度だからといって、トラッキング性能や信頼性が向上するわけでは**ありません**。

**色**は関係ありません。そのため、ダウンロードサイズを最適化するには、グレースケール画像が推奨されます。

**繰り返しパターン**や、あまりに多くの幾何学的特徴があると、トラッキングの信頼性が低下します。

## 追跡対象画像の追加/削除

追跡対象画像のリストは、XRセッションが実行されていない場合にのみ変更できます。

トラッキングリストに画像を追加する:

```javascript
// 幅20cm (0.2m) の画像
const trackedImage = app.xr.imageTracking.add(image, 0.2);
```

追跡対象画像を削除する:

```javascript
app.xr.imageTracking.remove(trackedImage);
```

追跡対象画像のリストには、次のようにアクセスできます。

```javascript
const trackedImages = app.xr.imageTracking.images;
for (let i = 0; i < trackedImages.length; i++) {
    const trackedImage = trackedImages[i];
}
```

## 位置と回転

追跡対象画像の位置と回転（ワールド空間内）は自動的に更新され、最新の情報には次のようにアクセスできます。

```javascript
const position = trackedImage.getPosition();
const rotation = trackedImage.getRotation();
```

## 信頼性

画像トラッキングは、カメラフィード上で動作するコンピュータビジョン技術を使用して実装されています。これは、ノイズ、不安定な照明、視野角、オクルージョン、モーションブラー、その他現実のさまざまな側面の影響を受けやすいです。基盤となるシステムは、そのトラッキング状態に関するいくつかの詳細を提供します。

そもそも画像がトラッキング可能かどうかを確認します。

```javascript
if (!trackedImage.trackable) {
    // 小さすぎるか、または基盤となるシステムが画像を解析できない可能性があります
}
```

セッション開始時、基盤となるシステムが一部の画像を使用できない場合、関連するエラーメッセージが渡されます。

```javascript
app.xr.imageTracking.on('error', (err) => {
    console.warn(err.message);
});
```

## トラッキング状態

現在、画像がアクティブに追跡されているかを確認できます。

```javascript
if (trackedImage.tracking) {
    // アクティブに追跡中
}
```

トラッキングが利用できなくなった場合、現実世界の画像が移動していないと仮定して、画像の位置と回転はエミュレートされます。

```javascript
if (trackedImage.emulated) {
    // 位置と回転はエミュレートされています
    // 以前に判明したトラッキング情報に基づいて
}
```

画像が追跡対象になったり、アクティブな追跡を失ったりしたときに知るために、イベントを購読することができます。

```javascript
trackedImage.on('tracked', () => {
    // 画像が現在アクティブに追跡されています
});

trackedImage.on('untracked', () => {
    // 画像はもはやアクティブに追跡されていません
});
```

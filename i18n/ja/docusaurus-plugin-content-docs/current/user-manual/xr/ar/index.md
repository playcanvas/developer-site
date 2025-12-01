---
title: AR
---

PlayCanvasは、WebXR APIを通じて、また人気のあるARフレームワークとの統合を通じて、モバイルおよびHMDデバイス向けの拡張現実（AR）アプリケーションを作成できます。

## プラットフォーム

AR機能は、Android Chrome Browser、Meta Quest Browser、Magic Leap Helio、Samsung Internet、Microsoft Edgeなど、多くのブラウザで利用できます。さらに、[8th Wall][3]や[Zappar][4]のようなフレームワークは、Safariを含むほとんどのモバイルブラウザでARコンテンツを体験することを可能にします。

:::note

上記のフレームワークは外部のものであり、それぞれのウェブサイトで個別のライセンスが提供されています。

:::

## WebXR ARの利用開始

PlayCanvasの組み込みARサポートを使用する場合、シーンのプライマリカメラのクリアカラーは、次のように透明である必要があります。

![Transparent Clear Color](/img/user-manual/xr/ar/transparent-clear-color.png)

ARセッションを開始するには、まずデバイスのサポートと利用可能性も確認する必要があります。その後、ボタンのクリックやその他の入力などのユーザー操作によって、ARセッションを開始できます。

```javascript
button.element.on('click', () => {
    // XRがサポートされ、ARが利用可能かを確認
    if (app.xr.supported && app.xr.isAvailable(pc.XRTYPE_AR)) {
        // カメラコンポーネントを使用してARを開始
        entity.camera.startXr(pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR);
    }
});
```

ユーザーが終了したら、次の呼び出しによってARセッションを終了できます。

```javascript
app.xr.end();
```

拡張現実は、レンダリングされたバッファをカメラフィードに合成するか、シースルーメガネにレンダリングされたバッファを特殊な投影をすることによって、現実世界と仮想画像を融合することを可能にします。通常、現実世界の環境に対する空間トラッキングとともに提供されます。

適切な参照空間: `pc.XRSPACE_LOCALFLOOR`。

## スターターキット

PlayCanvasは、あなたとあなたのAR体験をより迅速に立ち上げるのに役立ついくつかの「Starter Kit」プロジェクトを提供しています。新しいプロジェクトを作成する際に、ダイアログから最適なテンプレートを選択するだけです。

[3]: /user-manual/xr/ar/8th-wall-integration/
[4]: /user-manual/xr/ar/zappar-integration/

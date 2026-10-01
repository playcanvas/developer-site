---
title: ライト推定
description: "PlayCanvasのARライト推定: ARセッションでの推定の開始、推定された現実世界の主光源の方向、色、強度による仮想オブジェクトのライティング、環境光の球面調和関数。"
---

ARの仮想オブジェクトは、周りの部屋と同じように照らされているときに、最も自然になじんで見えます。ライト推定を使うと、部屋で最も強い光がどこから来ているか、その色と強度がわかります。また、周囲のあらゆる方向から届く光の推定値も得られます。

## 推定の開始 {#starting-estimation}

エンジンは、すべてのARセッションでライト推定をリクエストします。セッションの開始後、セッションが光を推定できる場合は`app.xr.lightEstimation.supported`が`true`になり、`start()`で推定を開始できます。

```javascript
app.xr.on('start', () => {
    if (app.xr.lightEstimation.supported) {
        app.xr.lightEstimation.start();
    }
});
```

最初の推定値は少し遅れて届きます。届くと`app.xr.lightEstimation.available`が`true`になり、`available`イベントが発火します。推定を開始できない場合は、`error`イベントが発火します。推定は、セッションが終了したとき、または`end()`を呼び出したときに停止します。

## ディレクショナルライト {#directional-light}

推定値の`rotation`、`color`、`intensity`は、部屋で最も強い光をディレクショナルライトとして表したものです。毎フレーム、これらを自分のディレクショナルライトに適用します。

```javascript
app.on('update', () => {
    const estimation = app.xr.lightEstimation;
    if (!estimation.available) return;

    sun.setRotation(estimation.rotation);
    sun.light.color = estimation.color;
    sun.light.intensity = estimation.intensity;
});
```

回転は、ディレクショナルライトのエンティティを実際の光が差す方向に向けます。そのため、このライトが落とす影は、実際の影と同じ方向に落ちます。強度は光の赤、緑、青の値のうち最も大きい値で、1を下回ることはありません。色は、それらの値を強度で割ったものです。推定値が利用可能になるまで、3つとも`null`です。

## 環境光 {#ambient-light}

`sphericalHarmonics`は、あらゆる方向から届く光の推定値で、27個の数値からなります。これは、9個のL2球面調和関数の係数それぞれの赤、緑、青の値で、[WebXR Lighting Estimation](https://immersive-web.github.io/lighting-estimation/#xrlightestimate-interface)仕様が定める順序で並んでいます。独自のシェーダーで、環境光によるライティングに使ってください。

エンジンはこれをマテリアルに適用しません。StandardMaterialの`ambientSH`プロパティは9個の係数を異なる順序で受け取るため、WebXRの値をそのまま代入することはできません。

仕様では反射用のキューブマップも定義されていますが、エンジンはこれを提供していません。

## 関連情報 {#see-also}

- [ライト](/user-manual/graphics/lighting/lights/) - ディレクショナルライトとそのプロパティ
- [シャドウ](/user-manual/graphics/lighting/shadows/) - 推定したライトによるシャドウ
- [XrLightEstimation](https://api.playcanvas.com/engine/classes/XrLightEstimation.html) - `app.xr.lightEstimation`のAPIリファレンス

---
title: 光の推定
---

ARでは、現実世界は複雑な照明や様々な環境を持つことがあります。より良い没入感と、現実世界と仮想世界を融合させるために、仮想オブジェクトは光の推定データ（以下のようなもの）に基づいてシェーディングされ、照らされます。

* **指向性ライト**（最も顕著なもの）、その回転、強度、色。
* **環境光**（L3球面調和関数形式）。
* **反射**（キューブマップ形式）([現在未統合](https://github.com/playcanvas/engine/issues/6070)）。

## サポート

システムが光の推定をサポートしているかどうかを確認できます。

```javascript
if (app.xr.lightEstimation.supportedColor) {
    // 光の推定へのアクセスがサポートされています
}

app.xr.lightEstimation.on('available', () => {
    // 光の推定が利用可能になります
});
```

## 指向性ライト

光の推定が提供する最も基本的な情報は、最も顕著な指向性ライトの回転、強度、色です。

```javascript
const lightEstimation = app.xr.lightEstimation;

// 光の推定が利用可能かを確認
if (lightEstimation.available) {
    // エンティティを回転
    entity.setRotation(lightEstimation.rotation());

    // ライトのパラメータを設定
    entity.light.intensity = lightEstimation.intensity;
    entity.light.color = lightEstimation.color;
}
```

## 環境光

環境は通常、単一の指向性ライトよりもはるかに複雑であるため、光の推定はL3 SH（球面調和関数）形式で環境光情報を提供します。

SHを使用するには、マテリアルにプリフィルタリングされたキューブマップが適用されているか（シーンのスカイボックスも機能します）、または定数環境シェーダーチャンク（`ambientConstantPS`）を更新する必要があります。

マテリアルごとにSHデータを設定できます。

```javascript
if (app.xr.lightEstimation.available) {
    material.setParameter('ambientSH[0]', app.xr.lightEstimation.sphericalHarmonics);
}
```

シーンにプリフィルタリングされたキューブマップやスカイボックスがない場合は、マテリアルチャンクを更新できます。

```javascript
material.chunks.ambientConstantPS = chunkCode;
material.update();
```

シェーダーチャンクコード：

```glsl
uniform vec3 ambientSH[9];

void addAmbient(vec3 worldNormal) {
    vec3 n = worldNormal;

    vec3 color =
        ambientSH[0] +
        ambientSH[1] * n.x +
        ambientSH[2] * n.y +
        ambientSH[3] * n.z +
        ambientSH[4] * n.x * n.z +
        ambientSH[5] * n.z * n.y +
        ambientSH[6] * n.y * n.x +
        ambientSH[7] * (3.0 * n.z * n.z - 1.0) +
        ambientSH[8] * (n.x * n.x - n.y * n.y);

    dDiffuseLight += color;
}
```

## 反射

WebXR Light Estimationは、環境反射の推定をキューブマップ形式で提供しますが、[現時点では](https://github.com/playcanvas/engine/issues/6070) PlayCanvas Engineには統合されていません。

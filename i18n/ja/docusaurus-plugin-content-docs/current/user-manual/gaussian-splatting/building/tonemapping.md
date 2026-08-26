---
title: トーンマッピングと露出
description: "カメラのトーンカーブ、シーンの露出、フォグが Gaussian スプラットにどう影響するか、そして Scene.gsplat.useTonemap と Scene.gsplat.useFog でスプラットを除外する方法。"
---

Gaussian スプラットは色を Gaussian ごとに保持しており、その色はそのまま使用されます。スプラットはライティングの影響を受けない（unlit）ため、ライト、環境光、環境マップはスプラットに一切影響しません。

しかし、**出力**の色は他のオブジェクトと同じように処理されます。スプラットのピクセルがフレームバッファに到達する前に、カメラのトーンカーブ、シーンの露出、そして有効な場合はフォグを通過します。つまり、シーンのライティングされたコンテンツをグレーディングするために [`Scene.exposure`](https://api.playcanvas.com/engine/classes/Scene.html#exposure) やカメラの [`toneMapping`](https://api.playcanvas.com/engine/classes/CameraComponent.html#tonemapping) を変更すると、スプラットの見た目も変わってしまいます。

キャプチャが既に最終的な明るさでグレーディングされている場合は、スプラットをこのパイプラインから除外できます。

## トーンマッピングと露出を無効にする

[`Scene.gsplat.useTonemap`](https://api.playcanvas.com/engine/classes/GSplatParams.html#usetonemap) を `false` に設定します：

```javascript
// カメラのトーンマッピングとシーンの露出に関係なく、スプラットは保持している色を維持します
app.scene.gsplat.useTonemap = false;
```

これにより、スプラットに対してのみトーンカーブと露出の乗算がスキップされます。シーン内の他のオブジェクトはこれまで通りそれらを使用するため、スプラットを固定したまま、メッシュ、ライト、空のグレーディングを続けられます。

主な用途：

- **グレーディング済みのキャプチャ**: キャプチャが既に最終的な見た目にカラーグレーディングされており、再度トーンマッピングするべきではない場合。
- **露出のアニメーション**: 昼夜サイクルや露出のランプなど、ライティングされたコンテンツを明るく・暗くする際に、スプラットを一緒に変化させたくない場合。
- **リファレンスとの一致**: 元のキャプチャや他のビューアーとレンダリング結果を比較する場合。トーンカーブによる差異は望ましくありません。

:::warning

トーンマッピングを無効にすると、スプラットはシーンの他の部分とトーン特性を共有しなくなります。明るい値がトーンカーブによってロールオフされなくなるため、圧縮されずにクリップします。また、トーンマッピングされたメッシュの隣にあるスプラットは見た目が不一致になることがあります。スプラットとライティングされたジオメトリが混在するシーンでは、通常はこれを有効のままにして、代わりにキャプチャ側を調整する方が良い結果になります。

:::

## フォグを無効にする

フォグには独自のスイッチ [`Scene.gsplat.useFog`](https://api.playcanvas.com/engine/classes/GSplatParams.html#usefog) があります：

```javascript
// スプラットはシーンとカメラのフォグ設定を無視します
app.scene.gsplat.useFog = false;
```

2 つのスイッチは互いに独立しています。`useTonemap` を `false` にしてフォグを有効のままにした場合も、スプラットにはフォグがかかります。フォグはリニア空間で適用され、その結果が出力の色空間にエンコードされます。異なるのは、トーンカーブと露出が適用されない点だけです。

## スプラットの色に影響する設定

| 設定 | スプラットへの適用 | 除外する方法 |
| --- | --- | --- |
| [`Scene.exposure`](https://api.playcanvas.com/engine/classes/Scene.html#exposure) | あり | `Scene.gsplat.useTonemap = false` |
| [`CameraComponent.toneMapping`](https://api.playcanvas.com/engine/classes/CameraComponent.html#tonemapping) | あり | `Scene.gsplat.useTonemap = false` |
| シーンまたはカメラのフォグ | あり | `Scene.gsplat.useFog = false` |
| 出力の色空間（ガンマエンコード） | あり | 選択不可 — レンダーターゲットによって決まります |
| ライト、環境光、環境マップ | なし | スプラットは unlit です。[リライティング](/user-manual/gaussian-splatting/building/relighting) を参照してください |

:::note

どちらのフラグも [`Scene.gsplat`](https://api.playcanvas.com/engine/classes/Scene.html#gsplat) に属するため、シーン内のすべてのスプラットに適用されます。個々のスプラットや特定の GSplat コンポーネントの色を変更したい場合は、[カスタムシェーダー](/user-manual/gaussian-splatting/building/custom-shaders) を使用してください。

:::

## 関連項目

- [Scene.gsplat API](https://api.playcanvas.com/engine/classes/Scene.html#gsplat)
- [GSplatParams API](https://api.playcanvas.com/engine/classes/GSplatParams.html)
- [リライティング](/user-manual/gaussian-splatting/building/relighting)
- [カスタムシェーダー](/user-manual/gaussian-splatting/building/custom-shaders)
